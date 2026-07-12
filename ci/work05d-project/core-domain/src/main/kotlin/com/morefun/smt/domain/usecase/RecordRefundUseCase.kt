package com.morefun.smt.domain.usecase

import com.morefun.smt.domain.error.OrderNotFoundException
import com.morefun.smt.domain.error.OverRefundException
import com.morefun.smt.domain.error.StaleOrderVersionException
import com.morefun.smt.domain.model.*
import com.morefun.smt.domain.port.SmtLocalStore

class RecordRefundUseCase(
    private val store: SmtLocalStore,
    private val ids: IdGenerator
) {
    fun execute(command: RecordRefundCommand): RefundRecorded = store.transaction {
        val replay = getIdempotentResult(command.idempotencyKey)
        if (replay != null) {
            require(replay is RefundRecorded) { "idempotency key belongs to another operation" }
            return@transaction replay
        }
        val order = loadOrder(command.orderId) ?: throw OrderNotFoundException(command.orderId)
        if (order.currentVersion != command.expectedOrderVersion) {
            throw StaleOrderVersionException(order.orderId, command.expectedOrderVersion, order.currentVersion)
        }
        val settled = loadPayments(order.orderId).fold(Money.ZERO) { sum, it -> sum + it.amount }
        val refundedBefore = loadRefunds(order.orderId).fold(Money.ZERO) { sum, it -> sum + it.amount }
        val refundable = settled.subtract(refundedBefore)
        if (command.amount.minor > refundable.minor) throw OverRefundException(command.amount.minor, refundable.minor)

        val batch = RefundBatchSnapshot(ids.next("refund"), order.orderId, command.amount, command.method)
        insertRefund(batch)
        val refundedAfter = refundedBefore + command.amount
        val net = settled.subtract(refundedAfter)
        val status = when {
            net.minor == 0L -> PaymentStatus.REFUNDED
            net.minor < order.total.minor -> PaymentStatus.REFUND_DUE
            else -> PaymentStatus.PAID
        }
        replaceOrder(order.copy(paymentStatus = status, syncStatus = SyncStatus.LOCAL_SAVED))
        val outbox = OutboxSnapshot(ids.next("evt"), order.orderId, order.currentVersion, "REFUND_RECORDED", SyncStatus.WAITING_SYNC)
        insertOutbox(outbox)
        val result = RefundRecorded(order.orderId, batch.refundBatchId, command.amount, refundedAfter, status, outbox.eventId)
        saveIdempotentResult(command.idempotencyKey, result)
        result
    }
}
