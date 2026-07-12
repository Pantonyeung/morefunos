package com.morefun.smt.data.room

import com.morefun.smt.domain.model.*

data class EncodedOperationResult(val type: String, val payload: String)

object OperationResultCodec {
    fun encode(result: OperationResult): EncodedOperationResult = when (result) {
        is CreatedOrder -> EncodedOperationResult(
            "CreatedOrder",
            listOf(
                result.orderId,
                result.displayNumber,
                result.sequence.toString(),
                result.version.toString(),
                result.total.minor.toString(),
                result.printJobIds.joinToString(","),
                result.outboxEventId
            ).joinToString("|")
        )
        is UpdatedOrder -> EncodedOperationResult(
            "UpdatedOrder",
            listOf(
                result.orderId,
                result.displayNumber,
                result.version.toString(),
                result.total.minor.toString(),
                result.printJobIds.joinToString(","),
                result.outboxEventId
            ).joinToString("|")
        )
        is PaymentRecorded -> EncodedOperationResult(
            "PaymentRecorded",
            listOf(
                result.orderId,
                result.paymentBatchId,
                result.amount.minor.toString(),
                result.settledTotal.minor.toString(),
                result.paymentStatus.name,
                result.outboxEventId
            ).joinToString("|")
        )
        is RefundRecorded -> EncodedOperationResult(
            "RefundRecorded",
            listOf(
                result.orderId,
                result.refundBatchId,
                result.amount.minor.toString(),
                result.refundedTotal.minor.toString(),
                result.paymentStatus.name,
                result.outboxEventId
            ).joinToString("|")
        )
        is ProductionStatusUpdated -> EncodedOperationResult(
            "ProductionStatusUpdated",
            listOf(result.orderId, result.orderVersion.toString(), result.productionStatus.name, result.outboxEventId).joinToString("|")
        )
        is AvailabilityUpdated -> EncodedOperationResult(
            "AvailabilityUpdated",
            listOf(result.productId, result.status.name, result.sourceVersion.toString(), result.outboxEventId).joinToString("|")
        )
        is DayClosed -> EncodedOperationResult(
            "DayClosed",
            listOf(
                result.dayCloseId,
                result.businessDate,
                result.version.toString(),
                result.grossSales.minor.toString(),
                result.settledPayments.minor.toString(),
                result.refunds.minor.toString(),
                result.netCashMovement.minor.toString(),
                result.outboxEventId
            ).joinToString("|")
        )
    }

    fun decode(type: String, payload: String): OperationResult {
        val p = payload.split('|')
        return when (type) {
            "CreatedOrder" -> CreatedOrder(
                orderId = p.requireAt(0),
                displayNumber = p.requireAt(1),
                sequence = p.requireAt(2).toInt(),
                version = p.requireAt(3).toInt(),
                total = Money(p.requireAt(4).toLong()),
                printJobIds = p.requireAt(5).takeIf { it.isNotEmpty() }?.split(',').orEmpty(),
                outboxEventId = p.requireAt(6)
            )
            "UpdatedOrder" -> UpdatedOrder(
                orderId = p.requireAt(0),
                displayNumber = p.requireAt(1),
                version = p.requireAt(2).toInt(),
                total = Money(p.requireAt(3).toLong()),
                printJobIds = p.requireAt(4).takeIf { it.isNotEmpty() }?.split(',').orEmpty(),
                outboxEventId = p.requireAt(5)
            )
            "PaymentRecorded" -> PaymentRecorded(
                orderId = p.requireAt(0),
                paymentBatchId = p.requireAt(1),
                amount = Money(p.requireAt(2).toLong()),
                settledTotal = Money(p.requireAt(3).toLong()),
                paymentStatus = PaymentStatus.valueOf(p.requireAt(4)),
                outboxEventId = p.requireAt(5)
            )
            "RefundRecorded" -> RefundRecorded(
                orderId = p.requireAt(0),
                refundBatchId = p.requireAt(1),
                amount = Money(p.requireAt(2).toLong()),
                refundedTotal = Money(p.requireAt(3).toLong()),
                paymentStatus = PaymentStatus.valueOf(p.requireAt(4)),
                outboxEventId = p.requireAt(5)
            )
            "ProductionStatusUpdated" -> ProductionStatusUpdated(
                orderId = p.requireAt(0),
                orderVersion = p.requireAt(1).toInt(),
                productionStatus = ProductionStatus.valueOf(p.requireAt(2)),
                outboxEventId = p.requireAt(3)
            )
            "AvailabilityUpdated" -> AvailabilityUpdated(
                productId = p.requireAt(0),
                status = AvailabilityStatus.valueOf(p.requireAt(1)),
                sourceVersion = p.requireAt(2).toLong(),
                outboxEventId = p.requireAt(3)
            )
            "DayClosed" -> DayClosed(
                dayCloseId = p.requireAt(0),
                businessDate = p.requireAt(1),
                version = p.requireAt(2).toInt(),
                grossSales = Money(p.requireAt(3).toLong()),
                settledPayments = Money(p.requireAt(4).toLong()),
                refunds = Money(p.requireAt(5).toLong()),
                netCashMovement = Money(p.requireAt(6).toLong()),
                outboxEventId = p.requireAt(7)
            )
            else -> error("unsupported operation result type: $type")
        }
    }

    private fun List<String>.requireAt(index: Int): String =
        getOrNull(index) ?: error("invalid operation result payload")
}
