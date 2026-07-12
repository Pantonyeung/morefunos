package com.morefun.smt.domain.model

enum class OrderSource(val prefix: String) {
    CUSTOMER_WEB("W"), STORE_WALK_IN("M"), PHONE_WHATSAPP("T"), KEETA("K"), FOODPANDA("P"), RESERVATION("Y"), DINE_IN("D")
}

enum class ServiceType { TAKEAWAY, DINE_IN }
enum class ProductionStatus { PENDING, IN_PROGRESS, READY, COMPLETED, CANCELLED }
enum class PaymentStatus { UNPAID, VERIFYING, PARTIAL, PAID, DUE, REFUND_DUE, REFUNDED }
enum class PrintStatus { QUEUED, PRINTING, PARTIAL_SUCCESS, SUCCESS, FAILED }
enum class SyncStatus { LOCAL_SAVED, WAITING_SYNC, SYNCED, CONFLICT, MANUAL_REVIEW }
enum class PrintKind { RECEIPT, KITCHEN, PACKING, LABEL }

data class OrderOptionInput(
    val optionId: String,
    val displayName: String,
    val priceDelta: PriceDelta
)

data class OrderItemInput(
    val productId: String,
    val displayName: String,
    val quantity: Int,
    val unitPrice: Money,
    val options: List<OrderOptionInput> = emptyList()
) {
    init {
        require(productId.isNotBlank())
        require(displayName.isNotBlank())
        require(quantity > 0)
    }

    fun lineTotal(): Money {
        val optionDeltaMinor = options.sumOf { it.priceDelta.minor }
        val adjustedUnitMinor = Math.addExact(unitPrice.minor, optionDeltaMinor)
        require(adjustedUnitMinor >= 0) { "option adjustments cannot make item price negative" }
        return Money(adjustedUnitMinor) * quantity
    }
}

data class CreateOrderCommand(
    val idempotencyKey: String,
    val businessDate: String,
    val source: OrderSource,
    val serviceType: ServiceType,
    val tableRef: String? = null,
    val guestCount: Int? = null,
    val items: List<OrderItemInput>,
    val requestedPrintKinds: Set<PrintKind>
) {
    init {
        require(idempotencyKey.isNotBlank())
        require(businessDate.matches(Regex("\\d{4}-\\d{2}-\\d{2}")))
        require(items.isNotEmpty())
        if (serviceType == ServiceType.DINE_IN) {
            require(!tableRef.isNullOrBlank()) { "dine in order requires tableRef" }
            require((guestCount ?: 0) > 0) { "dine in order requires guestCount" }
        } else {
            require(tableRef.isNullOrBlank()) { "takeaway order cannot have tableRef" }
            require(guestCount == null) { "takeaway order cannot have guestCount" }
        }
    }
}

sealed interface OperationResult

data class CreatedOrder(
    val orderId: String,
    val displayNumber: String,
    val sequence: Int,
    val version: Int,
    val total: Money,
    val printJobIds: List<String>,
    val outboxEventId: String
) : OperationResult

data class OrderSnapshot(
    val orderId: String,
    val businessDate: String,
    val displayNumber: String,
    val sequence: Int,
    val source: OrderSource,
    val serviceType: ServiceType,
    val currentVersion: Int,
    val total: Money,
    val productionStatus: ProductionStatus,
    val paymentStatus: PaymentStatus,
    val printStatus: PrintStatus,
    val syncStatus: SyncStatus,
    val tableRef: String? = null,
    val guestCount: Int? = null
)

data class OrderVersionSnapshot(
    val versionId: String,
    val orderId: String,
    val version: Int,
    val items: List<OrderItemInput>,
    val total: Money,
    val reason: String
)

data class PrintJobSnapshot(
    val printJobId: String,
    val orderId: String,
    val orderVersion: Int,
    val kind: PrintKind,
    val status: PrintStatus
)

data class OutboxSnapshot(
    val eventId: String,
    val aggregateId: String,
    val aggregateVersion: Int,
    val eventType: String,
    val status: SyncStatus,
    val payloadJson: String = "{}"
)

interface IdGenerator { fun next(prefix: String): String }

data class UpdateOrderCommand(
    val idempotencyKey: String,
    val orderId: String,
    val expectedVersion: Int,
    val items: List<OrderItemInput>,
    val reason: String,
    val affectsProduction: Boolean,
    val requestedPrintKinds: Set<PrintKind>
) {
    init {
        require(idempotencyKey.isNotBlank())
        require(orderId.isNotBlank())
        require(expectedVersion > 0)
        require(items.isNotEmpty())
        require(reason.isNotBlank())
        if (!affectsProduction) require(requestedPrintKinds.isEmpty()) { "non-production updates cannot request production prints" }
    }
}

data class UpdatedOrder(
    val orderId: String,
    val displayNumber: String,
    val version: Int,
    val total: Money,
    val printJobIds: List<String>,
    val outboxEventId: String
) : OperationResult
