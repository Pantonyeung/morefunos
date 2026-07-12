package com.morefun.smt.domain.model

enum class AvailabilityStatus { AVAILABLE, SOLD_OUT }

data class UpdateProductionStatusCommand(
    val idempotencyKey: String,
    val orderId: String,
    val expectedOrderVersion: Int,
    val targetStatus: ProductionStatus
) {
    init {
        require(idempotencyKey.isNotBlank())
        require(orderId.isNotBlank())
        require(expectedOrderVersion > 0)
    }
}

data class ProductionStatusUpdated(
    val orderId: String,
    val orderVersion: Int,
    val productionStatus: ProductionStatus,
    val outboxEventId: String
) : OperationResult

data class AvailabilitySnapshot(
    val productId: String,
    val status: AvailabilityStatus,
    val reason: String?,
    val permanentStop: Boolean,
    val sourceVersion: Long
) {
    init {
        require(productId.isNotBlank())
        require(sourceVersion > 0)
    }
}

data class SetAvailabilityCommand(
    val idempotencyKey: String,
    val productId: String,
    val status: AvailabilityStatus,
    val reason: String?,
    val permanentStop: Boolean,
    val expectedSourceVersion: Long
) {
    init {
        require(idempotencyKey.isNotBlank())
        require(productId.isNotBlank())
        require(expectedSourceVersion >= 0)
        if (permanentStop) require(status == AvailabilityStatus.SOLD_OUT) {
            "permanent stop requires SOLD_OUT"
        }
    }
}

data class AvailabilityUpdated(
    val productId: String,
    val status: AvailabilityStatus,
    val sourceVersion: Long,
    val outboxEventId: String
) : OperationResult
