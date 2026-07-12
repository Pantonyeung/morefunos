package com.morefun.smt.domain.usecase

import com.morefun.smt.domain.error.OrderNotFoundException
import com.morefun.smt.domain.error.StaleOrderVersionException
import com.morefun.smt.domain.model.*
import com.morefun.smt.domain.port.SmtLocalStore

class RecordPaymentUseCase(
    private val store: SmtLocalStore,
    private val ids: IdGenerator
) {
    fun execute(command: RecordPaymentCommand): PaymentRecorded = store.transaction {
        val replay = getIdempotentResult(command.idempotencyKey)
        if (replay != null) {
            require(replay is PaymentRecorded) { "idempotency key belongs to another operation" }
            return@transaction replay
        }
        val order = loadOrder(command.orderId) ?: throw OrderNotFoundException(command.orderId)
        if (order.currentVersion != command.expectedOrderVersion) {
            throw StaleOrderVersionException(order.orderId, command.expectedOrderVersion, order.currentVersion)
        }
        val settledBefore = loadPayments(order.orderId).fold(Money.ZERO) { sum, it -> sum + it.amount }
        val refunded = loadRefunds(order.orderId).fold(Money.ZERO) { sum, it -> sum + it.amount }
        val netSettled = settledBefore.subtract(refunded)
        val outstanding = order.total.subtract(netSettled)
        require(command.amount.minor <= outstanding.minor) { "payment exceeds outstanding amount" }

        val batch = PaymentBatchSnapshot(ids.next("pay"), order.orderId, command.amount, command.method)
        insertPayment(batch)
        val settledAfter = settledBefore + command.amount
        val netAfter = settledAfter.subtract(refunded)
        val status = when {
            netAfter.minor == 0L -> PaymentStatus.UNPAID
            netAfter.minor < order.total.minor -> PaymentStatus.PARTIAL
            else -> PaymentStatus.PAID
        }
        replaceOrder(order.copy(paymentStatus = status, syncStatus = SyncStatus.LOCAL_SAVED))
        val outbox = OutboxSnapshot(ids.next("evt"), order.orderId, order.currentVersion, "PAYMENT_RECORDED", SyncStatus.WAITING_SYNC)
        insertOutbox(outbox)
        val result = PaymentRecorded(order.orderId, batch.paymentBatchId, command.amount, settledAfter, status, outbox.eventId)
        saveIdempotentResult(command.idempotencyKey, result)
        result
    }
}
