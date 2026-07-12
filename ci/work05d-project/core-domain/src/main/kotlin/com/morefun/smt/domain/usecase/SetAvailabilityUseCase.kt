package com.morefun.smt.domain.usecase

import com.morefun.smt.domain.error.StaleAvailabilityVersionException
import com.morefun.smt.domain.model.*
import com.morefun.smt.domain.port.SmtLocalStore

class SetAvailabilityUseCase(
    private val store: SmtLocalStore,
    private val ids: IdGenerator
) {
    fun execute(command: SetAvailabilityCommand): AvailabilityUpdated = store.transaction {
        val replay = getIdempotentResult(command.idempotencyKey)
        if (replay != null) {
            require(replay is AvailabilityUpdated) { "idempotency key belongs to another operation" }
            return@transaction replay
        }
        val current = loadAvailability(command.productId)
        val actualVersion = current?.sourceVersion ?: 0L
        if (actualVersion != command.expectedSourceVersion) {
            throw StaleAvailabilityVersionException(command.productId, command.expectedSourceVersion, actualVersion)
        }
        val nextVersion = actualVersion + 1
        upsertAvailability(
            AvailabilitySnapshot(
                productId = command.productId,
                status = command.status,
                reason = command.reason?.trim()?.takeIf { it.isNotEmpty() },
                permanentStop = command.permanentStop,
                sourceVersion = nextVersion
            )
        )
        val outbox = OutboxSnapshot(
            eventId = ids.next("evt"),
            aggregateId = command.productId,
            aggregateVersion = nextVersion.toInt(),
            eventType = "AVAILABILITY_UPDATED",
            status = SyncStatus.WAITING_SYNC,
            payloadJson = "{\"product_id\":\"${escape(command.productId)}\",\"status\":\"${command.status.name}\",\"permanent_stop\":${command.permanentStop},\"source_version\":$nextVersion}"
        )
        insertOutbox(outbox)
        val result = AvailabilityUpdated(command.productId, command.status, nextVersion, outbox.eventId)
        saveIdempotentResult(command.idempotencyKey, result)
        result
    }

    private fun escape(value: String): String = value.replace("\\", "\\\\").replace("\"", "\\\"")
}
