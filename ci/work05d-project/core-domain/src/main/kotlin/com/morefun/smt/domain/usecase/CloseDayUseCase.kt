package com.morefun.smt.domain.usecase

import com.morefun.smt.domain.error.DayCloseAlreadyExistsException
import com.morefun.smt.domain.model.*
import com.morefun.smt.domain.port.SmtLocalStore

class CloseDayUseCase(
    private val store: SmtLocalStore,
    private val ids: IdGenerator
) {
    fun execute(command: CloseDayCommand): DayClosed = store.transaction {
        val replay = getIdempotentResult(command.idempotencyKey)
        if (replay != null) {
            require(replay is DayClosed) { "idempotency key belongs to another operation" }
            return@transaction replay
        }
        if (loadDayClose(command.businessDate) != null) throw DayCloseAlreadyExistsException(command.businessDate)

        val orders = listOrdersByBusinessDate(command.businessDate).filter { it.productionStatus != ProductionStatus.CANCELLED }
        val gross = orders.fold(Money.ZERO) { sum, order -> sum + order.total }
        val settled = orders.flatMap { loadPayments(it.orderId) }.fold(Money.ZERO) { sum, p -> sum + p.amount }
        val refunded = orders.flatMap { loadRefunds(it.orderId) }.fold(Money.ZERO) { sum, r -> sum + r.amount }
        val net = settled.subtract(refunded)
        val close = DayCloseSnapshot(ids.next("close"), command.businessDate, 1, gross, settled, refunded, net)
        insertDayClose(close)
        val outbox = OutboxSnapshot(ids.next("evt"), close.dayCloseId, 1, "DAY_CLOSE_CREATED", SyncStatus.WAITING_SYNC)
        insertOutbox(outbox)
        val result = DayClosed(close.dayCloseId, close.businessDate, 1, gross, settled, refunded, net, outbox.eventId)
        saveIdempotentResult(command.idempotencyKey, result)
        result
    }
}
