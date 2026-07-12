package com.morefun.smt.bridge

import com.morefun.smt.data.room.MoreFunDatabase
import com.morefun.smt.data.room.RoomSmtLocalStore
import com.morefun.smt.domain.error.InvalidProductionTransitionException
import com.morefun.smt.domain.error.StaleAvailabilityVersionException
import com.morefun.smt.domain.error.StaleOrderVersionException
import com.morefun.smt.domain.model.*
import com.morefun.smt.domain.usecase.CreateOrderUseCase
import com.morefun.smt.domain.usecase.RecordPaymentUseCase
import com.morefun.smt.domain.usecase.SetAvailabilityUseCase
import com.morefun.smt.domain.usecase.UpdateProductionStatusUseCase
import com.morefun.smt.recovery.RecoveryCoordinator
import com.morefun.smt.runtime.RuntimeStatusProvider
import org.json.JSONArray
import org.json.JSONObject

class IntentDispatcher(
    private val database: MoreFunDatabase,
    private val store: RoomSmtLocalStore,
    private val createOrder: CreateOrderUseCase,
    private val recordPayment: RecordPaymentUseCase,
    private val updateProductionStatus: UpdateProductionStatusUseCase,
    private val setAvailability: SetAvailabilityUseCase,
    private val recoveryCoordinator: RecoveryCoordinator,
    private val runtimeStatus: RuntimeStatusProvider
) {
    fun dispatch(rawJson: String): String = try {
        val input = JSONObject(rawJson)
        val requestId = input.optString("request_id")
        val action = input.optString("action")
        if (requestId.isBlank() || action.isBlank()) {
            error(requestId, "INVALID_INTENT", "request_id and action are required")
        } else {
            val payload = input.optJSONObject("payload") ?: JSONObject()
            when (action) {
                "GET_RUNTIME_STATUS" -> runtimeStatus.toJson(requestId)
                "LIST_ORDERS" -> listOrders(requestId, payload.optString("business_date"))
                "QUERY_ORDER" -> queryOrder(payload.optString("order_id"), requestId)
                "CREATE_ORDER" -> createOrder(requestId, payload)
                "RECORD_PAYMENT" -> recordPayment(requestId, payload)
                "UPDATE_PRODUCTION_STATUS" -> updateProductionStatus(requestId, payload)
                "LIST_AVAILABILITY" -> listAvailability(requestId)
                "SET_AVAILABILITY" -> setAvailability(requestId, payload)
                "REQUEST_RECOVERY" -> withRequestId(recoveryCoordinator.inspectAndSchedule().toJson(), requestId)
                else -> error(requestId, "HANDLER_NOT_REGISTERED", "action is not allow-listed")
            }
        }
    } catch (t: Throwable) {
        when (t) {
            is StaleOrderVersionException -> error("", "STALE_ORDER_VERSION", t.message ?: "order version is stale")
            is StaleAvailabilityVersionException -> error("", "STALE_AVAILABILITY_VERSION", t.message ?: "availability version is stale")
            is InvalidProductionTransitionException -> error("", "INVALID_PRODUCTION_TRANSITION", t.message ?: "invalid production transition")
            else -> error("", "INVALID_INTENT", t.message ?: "invalid intent")
        }
    }

    fun queryOrder(orderId: String, requestId: String = ""): String {
        if (orderId.isBlank()) return error(requestId, "ORDER_ID_REQUIRED", "order_id is required")
        val order = store.loadOrder(orderId)
            ?: return error(requestId, "ORDER_NOT_FOUND", "order not found")
        val latest = store.loadVersions(orderId).maxByOrNull { it.version }
        val payments = store.loadPayments(orderId)
        val jobs = database.printDao().listJobs(orderId)
        return JSONObject()
            .put("ok", true)
            .put("request_id", requestId)
            .put("order", orderJson(order))
            .put("items", latest?.items?.let(::itemsJson) ?: JSONArray())
            .put("payments", JSONArray().apply {
                payments.forEach {
                    put(JSONObject()
                        .put("payment_batch_id", it.paymentBatchId)
                        .put("amount_minor", it.amount.minor)
                        .put("method", it.method.name))
                }
            })
            .put("print_jobs", JSONArray().apply {
                jobs.forEach {
                    put(JSONObject()
                        .put("print_job_id", it.printJobId)
                        .put("kind", it.kind)
                        .put("status", it.status)
                        .put("route_key", it.routeKey))
                }
            })
            .toString()
    }

    private fun createOrder(requestId: String, payload: JSONObject): String {
        val command = CreateOrderCommand(
            idempotencyKey = payload.requireString("idempotency_key"),
            businessDate = payload.requireString("business_date"),
            source = enumValueOf(payload.requireString("source")),
            serviceType = enumValueOf(payload.requireString("service_type")),
            tableRef = payload.optString("table_ref").takeIf { it.isNotBlank() },
            guestCount = if (payload.has("guest_count")) payload.getInt("guest_count") else null,
            items = payload.requireArray("items").toOrderItems(),
            requestedPrintKinds = payload.optJSONArray("print_kinds").toPrintKinds()
        )
        val result = createOrder.execute(command)
        return JSONObject()
            .put("ok", true)
            .put("request_id", requestId)
            .put("formal", true)
            .put("order_id", result.orderId)
            .put("display_number", result.displayNumber)
            .put("sequence", result.sequence)
            .put("version", result.version)
            .put("total_minor", result.total.minor)
            .put("print_job_ids", JSONArray(result.printJobIds))
            .put("outbox_event_id", result.outboxEventId)
            .toString()
    }

    private fun recordPayment(requestId: String, payload: JSONObject): String {
        val result = recordPayment.execute(
            RecordPaymentCommand(
                idempotencyKey = payload.requireString("idempotency_key"),
                orderId = payload.requireString("order_id"),
                expectedOrderVersion = payload.requireInt("expected_order_version"),
                amount = Money(payload.requireLong("amount_minor")),
                method = enumValueOf(payload.requireString("method"))
            )
        )
        return JSONObject()
            .put("ok", true)
            .put("request_id", requestId)
            .put("formal", true)
            .put("order_id", result.orderId)
            .put("payment_batch_id", result.paymentBatchId)
            .put("amount_minor", result.amount.minor)
            .put("settled_total_minor", result.settledTotal.minor)
            .put("payment_status", result.paymentStatus.name)
            .put("outbox_event_id", result.outboxEventId)
            .toString()
    }

    private fun updateProductionStatus(requestId: String, payload: JSONObject): String {
        val result = updateProductionStatus.execute(
            UpdateProductionStatusCommand(
                idempotencyKey = payload.requireString("idempotency_key"),
                orderId = payload.requireString("order_id"),
                expectedOrderVersion = payload.requireInt("expected_order_version"),
                targetStatus = enumValueOf(payload.requireString("target_status"))
            )
        )
        return JSONObject()
            .put("ok", true)
            .put("request_id", requestId)
            .put("formal", true)
            .put("order_id", result.orderId)
            .put("order_version", result.orderVersion)
            .put("production_status", result.productionStatus.name)
            .put("outbox_event_id", result.outboxEventId)
            .toString()
    }

    private fun listAvailability(requestId: String): String = JSONObject()
        .put("ok", true)
        .put("request_id", requestId)
        .put("availability", JSONArray().apply {
            store.listAvailability().forEach { snapshot ->
                put(JSONObject()
                    .put("product_id", snapshot.productId)
                    .put("status", snapshot.status.name)
                    .put("reason", snapshot.reason ?: "")
                    .put("permanent_stop", snapshot.permanentStop)
                    .put("source_version", snapshot.sourceVersion))
            }
        })
        .toString()

    private fun setAvailability(requestId: String, payload: JSONObject): String {
        val result = setAvailability.execute(
            SetAvailabilityCommand(
                idempotencyKey = payload.requireString("idempotency_key"),
                productId = payload.requireString("product_id"),
                status = enumValueOf(payload.requireString("status")),
                reason = payload.optString("reason").takeIf { it.isNotBlank() },
                permanentStop = payload.optBoolean("permanent_stop", false),
                expectedSourceVersion = payload.optLong("expected_source_version", 0L)
            )
        )
        return JSONObject()
            .put("ok", true)
            .put("request_id", requestId)
            .put("formal", true)
            .put("product_id", result.productId)
            .put("status", result.status.name)
            .put("source_version", result.sourceVersion)
            .put("outbox_event_id", result.outboxEventId)
            .toString()
    }

    private fun listOrders(requestId: String, businessDate: String): String {
        if (!businessDate.matches(Regex("\\d{4}-\\d{2}-\\d{2}"))) {
            return error(requestId, "BUSINESS_DATE_REQUIRED", "business_date must be YYYY-MM-DD")
        }
        return JSONObject()
            .put("ok", true)
            .put("request_id", requestId)
            .put("orders", JSONArray().apply {
                store.listOrdersByBusinessDate(businessDate).forEach { put(orderJson(it)) }
            })
            .toString()
    }

    private fun orderJson(order: OrderSnapshot) = JSONObject()
        .put("order_id", order.orderId)
        .put("business_date", order.businessDate)
        .put("display_number", order.displayNumber)
        .put("sequence", order.sequence)
        .put("source", order.source.name)
        .put("service_type", order.serviceType.name)
        .put("table_ref", order.tableRef ?: "")
        .put("guest_count", order.guestCount ?: 0)
        .put("version", order.currentVersion)
        .put("total_minor", order.total.minor)
        .put("production_status", order.productionStatus.name)
        .put("payment_status", order.paymentStatus.name)
        .put("print_status", order.printStatus.name)
        .put("sync_status", order.syncStatus.name)

    private fun itemsJson(items: List<OrderItemInput>) = JSONArray().apply {
        items.forEach { item ->
            put(JSONObject()
                .put("product_id", item.productId)
                .put("display_name", item.displayName)
                .put("quantity", item.quantity)
                .put("unit_price_minor", item.unitPrice.minor)
                .put("line_total_minor", item.lineTotal().minor)
                .put("options", JSONArray().apply {
                    item.options.forEach { option ->
                        put(JSONObject()
                            .put("option_id", option.optionId)
                            .put("display_name", option.displayName)
                            .put("price_delta_minor", option.priceDelta.minor))
                    }
                }))
        }
    }

    private fun JSONArray.toOrderItems(): List<OrderItemInput> = (0 until length()).map { index ->
        val item = getJSONObject(index)
        OrderItemInput(
            productId = item.requireString("product_id"),
            displayName = item.requireString("display_name"),
            quantity = item.optInt("quantity", 1),
            unitPrice = Money(item.requireLong("unit_price_minor")),
            options = item.optJSONArray("options").toOptions()
        )
    }

    private fun JSONArray?.toOptions(): List<OrderOptionInput> = if (this == null) emptyList() else (0 until length()).map { index ->
        val option = getJSONObject(index)
        OrderOptionInput(
            option.requireString("option_id"),
            option.requireString("display_name"),
            PriceDelta(option.optLong("price_delta_minor", 0))
        )
    }

    private fun JSONArray?.toPrintKinds(): Set<PrintKind> = if (this == null) emptySet() else
        (0 until length()).map { enumValueOf<PrintKind>(getString(it)) }.toSet()

    private fun JSONObject.requireArray(key: String): JSONArray = optJSONArray(key)
        ?: throw IllegalArgumentException("$key is required")
    private fun JSONObject.requireString(key: String): String = optString(key).takeIf { it.isNotBlank() }
        ?: throw IllegalArgumentException("$key is required")
    private fun JSONObject.requireInt(key: String): Int = if (has(key)) getInt(key)
        else throw IllegalArgumentException("$key is required")
    private fun JSONObject.requireLong(key: String): Long = if (has(key)) getLong(key)
        else throw IllegalArgumentException("$key is required")

    private fun withRequestId(raw: String, requestId: String): String =
        JSONObject(raw).put("request_id", requestId).toString()

    private fun error(requestId: String, code: String, message: String): String = JSONObject()
        .put("ok", false)
        .put("request_id", requestId)
        .put("code", code)
        .put("message", message)
        .put("error", JSONObject().put("code", code).put("message", message).put("retryable", false))
        .toString()
}
