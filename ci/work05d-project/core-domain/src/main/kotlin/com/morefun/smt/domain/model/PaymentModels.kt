package com.morefun.smt.domain.model

enum class PaymentMethod { CASH, PAYME, ALIPAY_HK, FPS, WECHAT_PAY, PLATFORM, OTHER }

data class RecordPaymentCommand(
    val idempotencyKey: String,
    val orderId: String,
    val expectedOrderVersion: Int,
    val amount: Money,
    val method: PaymentMethod
) {
    init {
        require(idempotencyKey.isNotBlank())
        require(orderId.isNotBlank())
        require(expectedOrderVersion > 0)
        require(amount.minor > 0)
    }
}

data class RecordRefundCommand(
    val idempotencyKey: String,
    val orderId: String,
    val expectedOrderVersion: Int,
    val amount: Money,
    val method: PaymentMethod
) {
    init {
        require(idempotencyKey.isNotBlank())
        require(orderId.isNotBlank())
        require(expectedOrderVersion > 0)
        require(amount.minor > 0)
    }
}

data class PaymentBatchSnapshot(
    val paymentBatchId: String,
    val orderId: String,
    val amount: Money,
    val method: PaymentMethod
)

data class RefundBatchSnapshot(
    val refundBatchId: String,
    val orderId: String,
    val amount: Money,
    val method: PaymentMethod
)

data class PaymentRecorded(
    val orderId: String,
    val paymentBatchId: String,
    val amount: Money,
    val settledTotal: Money,
    val paymentStatus: PaymentStatus,
    val outboxEventId: String
) : OperationResult

data class RefundRecorded(
    val orderId: String,
    val refundBatchId: String,
    val amount: Money,
    val refundedTotal: Money,
    val paymentStatus: PaymentStatus,
    val outboxEventId: String
) : OperationResult

data class CloseDayCommand(
    val idempotencyKey: String,
    val businessDate: String
) {
    init {
        require(idempotencyKey.isNotBlank())
        require(businessDate.matches(Regex("\\d{4}-\\d{2}-\\d{2}")))
    }
}

data class DayCloseSnapshot(
    val dayCloseId: String,
    val businessDate: String,
    val version: Int,
    val grossSales: Money,
    val settledPayments: Money,
    val refunds: Money,
    val netCashMovement: Money
)

data class DayClosed(
    val dayCloseId: String,
    val businessDate: String,
    val version: Int,
    val grossSales: Money,
    val settledPayments: Money,
    val refunds: Money,
    val netCashMovement: Money,
    val outboxEventId: String
) : OperationResult
