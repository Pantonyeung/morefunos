package com.morefun.smt.domain.usecase

import com.morefun.smt.domain.model.*
import com.morefun.smt.domain.port.SmtLocalStore

class CreateOrderUseCase(
    private val store: SmtLocalStore,
    private val ids: IdGenerator
) {
    fun execute(command: CreateOrderCommand): CreatedOrder = store.transaction {
        val replay = getIdempotentResult(command.idempotencyKey)
        if (replay != null) {
            require(replay is CreatedOrder) { "idempotency key belongs to another operation" }
            return@transaction replay
        }

        val total = command.items.fold(Money.ZERO) { sum, item -> sum + item.lineTotal() }
        val sequence = allocateSequence(command.businessDate)
        val displayNumber = command.source.prefix + sequence.toString().padStart(3, '0')
        val orderId = ids.next("ord")
        val version = 1

        insertOrder(
            OrderSnapshot(
                orderId = orderId,
                businessDate = command.businessDate,
                displayNumber = displayNumber,
                sequence = sequence,
                source = command.source,
                serviceType = command.serviceType,
                currentVersion = version,
                total = total,
                productionStatus = ProductionStatus.PENDING,
                paymentStatus = PaymentStatus.UNPAID,
                printStatus = if (command.requestedPrintKinds.isEmpty()) PrintStatus.SUCCESS else PrintStatus.QUEUED,
                syncStatus = SyncStatus.LOCAL_SAVED,
                tableRef = command.tableRef,
                guestCount = command.guestCount
            )
        )
        insertOrderVersion(
            OrderVersionSnapshot(
                versionId = ids.next("ver"),
                orderId = orderId,
                version = version,
                items = command.items,
                total = total,
                reason = "CREATE"
            )
        )

        val jobs = command.requestedPrintKinds.sortedBy { it.name }.map { kind ->
            PrintJobSnapshot(ids.next("print"), orderId, version, kind, PrintStatus.QUEUED)
        }
        insertPrintJobs(jobs)

        val outboxEvent = OutboxSnapshot(
            eventId = ids.next("evt"),
            aggregateId = orderId,
            aggregateVersion = version,
            eventType = "ORDER_CREATED",
            status = SyncStatus.WAITING_SYNC
        )
        insertOutbox(outboxEvent)

        val result = CreatedOrder(orderId, displayNumber, sequence, version, total, jobs.map { it.printJobId }, outboxEvent.eventId)
        saveIdempotentResult(command.idempotencyKey, result)
        result
    }
}
