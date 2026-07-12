package com.morefun.smt.domain.usecase

import com.morefun.smt.domain.error.InvalidProductionTransitionException
import com.morefun.smt.domain.error.OrderNotFoundException
import com.morefun.smt.domain.error.StaleOrderVersionException
import com.morefun.smt.domain.model.*
import com.morefun.smt.domain.port.SmtLocalStore

class UpdateProductionStatusUseCase(
    private val store: SmtLocalStore,
    private val ids: IdGenerator
) {
    fun execute(command: UpdateProductionStatusCommand): ProductionStatusUpdated = store.transaction {
        val replay = getIdempotentResult(command.idempotencyKey)
        if (replay != null) {
            require(replay is ProductionStatusUpdated) { "idempotency key belongs to another operation" }
            return@transaction replay
        }
        val order = loadOrder(command.orderId) ?: throw OrderNotFoundException(command.orderId)
        if (order.currentVersion != command.expectedOrderVersion) {
            throw StaleOrderVersionException(order.orderId, command.expectedOrderVersion, order.currentVersion)
        }
        if (!allowed(order.productionStatus, command.targetStatus)) {
            throw InvalidProductionTransitionException(order.productionStatus.name, command.targetStatus.name)
        }
        replaceOrder(order.copy(productionStatus = command.targetStatus, syncStatus = SyncStatus.LOCAL_SAVED))
        val outbox = OutboxSnapshot(
            eventId = ids.next("evt"),
            aggregateId = order.orderId,
            aggregateVersion = order.currentVersion,
            eventType = "ORDER_PRODUCTION_STATUS_UPDATED",
            status = SyncStatus.WAITING_SYNC,
            payloadJson = "{\"production_status\":\"${command.targetStatus.name}\"}"
        )
        insertOutbox(outbox)
        val result = ProductionStatusUpdated(order.orderId, order.currentVersion, command.targetStatus, outbox.eventId)
        saveIdempotentResult(command.idempotencyKey, result)
        result
    }

    private fun allowed(from: ProductionStatus, to: ProductionStatus): Boolean = when (from) {
        ProductionStatus.PENDING -> to == ProductionStatus.IN_PROGRESS || to == ProductionStatus.CANCELLED
        ProductionStatus.IN_PROGRESS -> to == ProductionStatus.READY || to == ProductionStatus.CANCELLED
        ProductionStatus.READY -> to == ProductionStatus.COMPLETED || to == ProductionStatus.CANCELLED
        ProductionStatus.COMPLETED, ProductionStatus.CANCELLED -> false
    }
}
