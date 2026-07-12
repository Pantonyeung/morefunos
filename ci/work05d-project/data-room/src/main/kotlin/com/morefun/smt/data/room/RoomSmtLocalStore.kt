package com.morefun.smt.data.room

import com.morefun.smt.domain.model.*
import com.morefun.smt.domain.port.SmtLocalStore
import java.util.concurrent.Callable

class RoomSmtLocalStore(
    private val database: MoreFunDatabase,
    private val nowEpochMs: () -> Long = { System.currentTimeMillis() }
) : SmtLocalStore {
    private val orderDao get() = database.orderDao()
    private val sequenceDao get() = database.sequenceDao()
    private val idempotencyDao get() = database.idempotencyDao()
    private val financeDao get() = database.financeDao()
    private val printDao get() = database.printDao()
    private val syncDao get() = database.syncDao()
    private val operationsDao get() = database.operationsDao()

    override fun <T> transaction(block: SmtLocalStore.() -> T): T =
        database.runInTransaction(Callable { block(this) })

    override fun getIdempotentResult(key: String): OperationResult? =
        idempotencyDao.get(key)?.let { OperationResultCodec.decode(it.resultType, it.resultPayload) }

    override fun saveIdempotentResult(key: String, result: OperationResult) {
        val encoded = OperationResultCodec.encode(result)
        idempotencyDao.insert(
            IdempotencyRecordEntity(
                idempotencyKey = key,
                operationType = encoded.type,
                resultType = encoded.type,
                resultPayload = encoded.payload,
                createdAtEpochMs = nowEpochMs()
            )
        )
    }

    override fun allocateSequence(businessDate: String): Int {
        val current = sequenceDao.get(businessDate)
        val next = (current?.lastValue ?: 0) + 1
        val entity = DailySequenceEntity(businessDate, next, nowEpochMs())
        if (current == null) sequenceDao.insert(entity) else sequenceDao.update(entity)
        return next
    }

    override fun insertOrder(order: OrderSnapshot) {
        val now = nowEpochMs()
        orderDao.insertOrder(order.toEntity(now, now))
    }

    override fun insertOrderVersion(version: OrderVersionSnapshot) {
        val now = nowEpochMs()
        orderDao.insertVersion(
            OrderVersionEntity(
                versionId = version.versionId,
                orderId = version.orderId,
                version = version.version,
                totalMinor = version.total.minor,
                reason = version.reason,
                createdAtEpochMs = now
            )
        )
        val itemEntities = version.items.mapIndexed { index, item ->
            OrderItemEntity(
                itemId = "${version.versionId}:item:$index",
                versionId = version.versionId,
                lineIndex = index,
                productId = item.productId,
                displayName = item.displayName,
                quantity = item.quantity,
                unitPriceMinor = item.unitPrice.minor
            )
        }
        orderDao.insertItems(itemEntities)
        val optionEntities = version.items.flatMapIndexed { itemIndex, item ->
            val itemId = "${version.versionId}:item:$itemIndex"
            item.options.mapIndexed { optionIndex, option ->
                OrderItemOptionEntity(
                    rowId = "$itemId:option:$optionIndex",
                    itemId = itemId,
                    optionIndex = optionIndex,
                    optionId = option.optionId,
                    displayName = option.displayName,
                    priceDeltaMinor = option.priceDelta.minor
                )
            }
        }
        if (optionEntities.isNotEmpty()) orderDao.insertOptions(optionEntities)
    }

    override fun insertPrintJobs(jobs: List<PrintJobSnapshot>) {
        val now = nowEpochMs()
        printDao.insertJobs(jobs.map { job ->
            PrintJobEntity(
                printJobId = job.printJobId,
                orderId = job.orderId,
                orderVersion = job.orderVersion,
                kind = job.kind.name,
                routeKey = routeFor(job.kind),
                status = job.status.name,
                createdAtEpochMs = now,
                updatedAtEpochMs = now
            )
        })
    }

    override fun insertOutbox(event: OutboxSnapshot) {
        syncDao.insertOutbox(
            OutboxEventEntity(
                eventId = event.eventId,
                aggregateId = event.aggregateId,
                aggregateVersion = event.aggregateVersion,
                eventType = event.eventType,
                payloadJson = event.payloadJson,
                status = event.status.name,
                retryCount = 0,
                nextAttemptAtEpochMs = null,
                createdAtEpochMs = nowEpochMs()
            )
        )
    }

    override fun loadOrder(orderId: String): OrderSnapshot? = orderDao.getOrder(orderId)?.toSnapshot()

    override fun loadVersions(orderId: String): List<OrderVersionSnapshot> =
        orderDao.listVersions(orderId).map { version ->
            val items = orderDao.listItems(version.versionId).map { item ->
                OrderItemInput(
                    productId = item.productId,
                    displayName = item.displayName,
                    quantity = item.quantity,
                    unitPrice = Money(item.unitPriceMinor),
                    options = orderDao.listOptions(item.itemId).map { option ->
                        OrderOptionInput(option.optionId, option.displayName, PriceDelta(option.priceDeltaMinor))
                    }
                )
            }
            OrderVersionSnapshot(
                versionId = version.versionId,
                orderId = version.orderId,
                version = version.version,
                items = items,
                total = Money(version.totalMinor),
                reason = version.reason
            )
        }

    override fun replaceOrder(order: OrderSnapshot) {
        val current = orderDao.getOrder(order.orderId) ?: error("order not found: ${order.orderId}")
        orderDao.updateOrder(order.toEntity(current.createdAtEpochMs, nowEpochMs()))
    }

    override fun insertPayment(payment: PaymentBatchSnapshot) {
        val now = nowEpochMs()
        financeDao.insertPayment(
            PaymentBatchEntity(payment.paymentBatchId, payment.orderId, payment.amount.minor, payment.method.name, now)
        )
        financeDao.insertPaymentEntries(
            listOf(
                PaymentEntryEntity(
                    paymentEntryId = "${payment.paymentBatchId}:entry:0",
                    paymentBatchId = payment.paymentBatchId,
                    entryIndex = 0,
                    method = payment.method.name,
                    amountMinor = payment.amount.minor,
                    reference = null
                )
            )
        )
    }

    override fun loadPayments(orderId: String): List<PaymentBatchSnapshot> =
        financeDao.listPayments(orderId).map { PaymentBatchSnapshot(it.paymentBatchId, it.orderId, Money(it.amountMinor), PaymentMethod.valueOf(it.method)) }

    override fun insertRefund(refund: RefundBatchSnapshot) {
        financeDao.insertRefund(
            RefundBatchEntity(refund.refundBatchId, refund.orderId, refund.amount.minor, refund.method.name, nowEpochMs())
        )
    }

    override fun loadRefunds(orderId: String): List<RefundBatchSnapshot> =
        financeDao.listRefunds(orderId).map { RefundBatchSnapshot(it.refundBatchId, it.orderId, Money(it.amountMinor), PaymentMethod.valueOf(it.method)) }

    override fun listOrdersByBusinessDate(businessDate: String): List<OrderSnapshot> =
        orderDao.listOrdersByDate(businessDate).map { it.toSnapshot() }

    override fun loadDayClose(businessDate: String): DayCloseSnapshot? =
        operationsDao.getLatestDayClose(businessDate)?.let {
            DayCloseSnapshot(
                it.dayCloseId,
                it.businessDate,
                it.version,
                Money(it.grossSalesMinor),
                Money(it.settledPaymentsMinor),
                Money(it.refundsMinor),
                Money(it.netCashMovementMinor)
            )
        }

    override fun insertDayClose(dayClose: DayCloseSnapshot) {
        operationsDao.insertDayClose(
            DayCloseEntity(
                dayClose.dayCloseId,
                dayClose.businessDate,
                dayClose.version,
                dayClose.grossSales.minor,
                dayClose.settledPayments.minor,
                dayClose.refunds.minor,
                dayClose.netCashMovement.minor,
                nowEpochMs()
            )
        )
    }

    override fun loadAvailability(productId: String): AvailabilitySnapshot? =
        operationsDao.getAvailability(productId)?.toSnapshot()

    override fun listAvailability(): List<AvailabilitySnapshot> =
        operationsDao.listAvailability().map { it.toSnapshot() }

    override fun upsertAvailability(snapshot: AvailabilitySnapshot) {
        operationsDao.upsertAvailability(
            AvailabilitySnapshotEntity(
                productId = snapshot.productId,
                status = snapshot.status.name,
                reason = snapshot.reason,
                permanentStop = snapshot.permanentStop,
                updatedAtEpochMs = nowEpochMs(),
                sourceVersion = snapshot.sourceVersion
            )
        )
    }

    private fun AvailabilitySnapshotEntity.toSnapshot() = AvailabilitySnapshot(
        productId = productId,
        status = AvailabilityStatus.valueOf(status),
        reason = reason,
        permanentStop = permanentStop,
        sourceVersion = sourceVersion
    )

    private fun routeFor(kind: PrintKind): String = when (kind) {
        PrintKind.RECEIPT -> "SUNMI_INTERNAL"
        PrintKind.KITCHEN -> "XP_N160II_KITCHEN"
        PrintKind.PACKING -> "XP_N160II_PACKING"
        PrintKind.LABEL -> "LABEL_ROUTER"
    }

    private fun OrderSnapshot.toEntity(createdAt: Long, updatedAt: Long) = OrderEntity(
        orderId = orderId,
        businessDate = businessDate,
        displayNumber = displayNumber,
        sequence = sequence,
        source = source.name,
        serviceType = serviceType.name,
        currentVersion = currentVersion,
        totalMinor = total.minor,
        productionStatus = productionStatus.name,
        paymentStatus = paymentStatus.name,
        printStatus = printStatus.name,
        syncStatus = syncStatus.name,
        tableRef = tableRef,
        guestCount = guestCount,
        createdAtEpochMs = createdAt,
        updatedAtEpochMs = updatedAt
    )

    private fun OrderEntity.toSnapshot() = OrderSnapshot(
        orderId = orderId,
        businessDate = businessDate,
        displayNumber = displayNumber,
        sequence = sequence,
        source = OrderSource.valueOf(source),
        serviceType = ServiceType.valueOf(serviceType),
        currentVersion = currentVersion,
        total = Money(totalMinor),
        productionStatus = ProductionStatus.valueOf(productionStatus),
        paymentStatus = PaymentStatus.valueOf(paymentStatus),
        printStatus = PrintStatus.valueOf(printStatus),
        syncStatus = SyncStatus.valueOf(syncStatus),
        tableRef = tableRef,
        guestCount = guestCount
    )
}
