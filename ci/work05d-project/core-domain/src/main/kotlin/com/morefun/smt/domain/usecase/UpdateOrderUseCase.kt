package com.morefun.smt.domain.usecase

import com.morefun.smt.domain.error.OrderNotFoundException
import com.morefun.smt.domain.error.StaleOrderVersionException
import com.morefun.smt.domain.model.*
import com.morefun.smt.domain.port.SmtLocalStore

class UpdateOrderUseCase(
    private val store: SmtLocalStore,
    private val ids: IdGenerator
) {
    fun execute(command: UpdateOrderCommand): UpdatedOrder = store.transaction {
        val replay = getIdempotentResult(command.idempotencyKey)
        if (replay != null) {
            require(replay is UpdatedOrder) { "idempotency key belongs to another operation" }
            return@transaction replay
        }

        val current = loadOrder(command.orderId) ?: throw OrderNotFoundException(command.orderId)
        if (current.currentVersion != command.expectedVersion) {
            throw StaleOrderVersionException(command.orderId, command.expectedVersion, current.currentVersion)
        }

        val nextVersion = current.currentVersion + 1
        val total = command.items.fold(Money.ZERO) { sum, item -> sum + item.lineTotal() }
        insertOrderVersion(
            OrderVersionSnapshot(
                versionId = ids.next("ver"),
                orderId = current.orderId,
                version = nextVersion,
                items = command.items,
                total = total,
                reason = command.reason
            )
        )

        val jobs = if (command.affectsProduction) {
            command.requestedPrintKinds.sortedBy { it.name }.map { kind ->
                PrintJobSnapshot(ids.next("print"), current.orderId, nextVersion, kind, PrintStatus.QUEUED)
            }
        } else emptyList()
        if (jobs.isNotEmpty()) insertPrintJobs(jobs)

        val updated = current.copy(
            currentVersion = nextVersion,
            total = total,
            paymentStatus = when {
                current.paymentStatus == PaymentStatus.PAID && total.minor > current.total.minor -> PaymentStatus.DUE
                current.paymentStatus == PaymentStatus.PAID && total.minor < current.total.minor -> PaymentStatus.REFUND_DUE
                else -> current.paymentStatus
            },
            printStatus = if (jobs.isEmpty()) current.printStatus else PrintStatus.QUEUED,
            syncStatus = SyncStatus.LOCAL_SAVED
        )
        replaceOrder(updated)

        val outbox = OutboxSnapshot(
            eventId = ids.next("evt"),
            aggregateId = current.orderId,
            aggregateVersion = nextVersion,
            eventType = "ORDER_UPDATED",
            status = SyncStatus.WAITING_SYNC
        )
        insertOutbox(outbox)

        val result = UpdatedOrder(current.orderId, current.displayNumber, nextVersion, total, jobs.map { it.printJobId }, outbox.eventId)
        saveIdempotentResult(command.idempotencyKey, result)
        result
    }
}
