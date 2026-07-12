package com.morefun.smt.data.room

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.Index
import androidx.room.PrimaryKey

@Entity(
    tableName = "orders",
    indices = [
        Index(value = ["businessDate", "sequence"], unique = true),
        Index(value = ["displayNumber"]),
        Index(value = ["productionStatus"]),
        Index(value = ["paymentStatus"])
    ]
)
data class OrderEntity(
    @PrimaryKey val orderId: String,
    val businessDate: String,
    val displayNumber: String,
    val sequence: Int,
    val source: String,
    val serviceType: String,
    val currentVersion: Int,
    val totalMinor: Long,
    val productionStatus: String,
    val paymentStatus: String,
    val printStatus: String,
    val syncStatus: String,
    val tableRef: String?,
    val guestCount: Int?,
    val createdAtEpochMs: Long,
    val updatedAtEpochMs: Long
)

@Entity(
    tableName = "order_versions",
    foreignKeys = [ForeignKey(
        entity = OrderEntity::class,
        parentColumns = ["orderId"],
        childColumns = ["orderId"],
        onDelete = ForeignKey.RESTRICT
    )],
    indices = [Index(value = ["orderId", "version"], unique = true)]
)
data class OrderVersionEntity(
    @PrimaryKey val versionId: String,
    val orderId: String,
    val version: Int,
    val totalMinor: Long,
    val reason: String,
    val createdAtEpochMs: Long
)

@Entity(
    tableName = "order_items",
    foreignKeys = [ForeignKey(
        entity = OrderVersionEntity::class,
        parentColumns = ["versionId"],
        childColumns = ["versionId"],
        onDelete = ForeignKey.CASCADE
    )],
    indices = [Index(value = ["versionId", "lineIndex"], unique = true)]
)
data class OrderItemEntity(
    @PrimaryKey val itemId: String,
    val versionId: String,
    val lineIndex: Int,
    val productId: String,
    val displayName: String,
    val quantity: Int,
    val unitPriceMinor: Long
)

@Entity(
    tableName = "order_item_options",
    foreignKeys = [ForeignKey(
        entity = OrderItemEntity::class,
        parentColumns = ["itemId"],
        childColumns = ["itemId"],
        onDelete = ForeignKey.CASCADE
    )],
    indices = [Index(value = ["itemId", "optionIndex"], unique = true)]
)
data class OrderItemOptionEntity(
    @PrimaryKey val rowId: String,
    val itemId: String,
    val optionIndex: Int,
    val optionId: String,
    val displayName: String,
    val priceDeltaMinor: Long
)

@Entity(tableName = "idempotency_records", indices = [Index(value = ["operationType"])])
data class IdempotencyRecordEntity(
    @PrimaryKey val idempotencyKey: String,
    val operationType: String,
    val resultType: String,
    val resultPayload: String,
    val createdAtEpochMs: Long
)

@Entity(tableName = "daily_sequences")
data class DailySequenceEntity(
    @PrimaryKey val businessDate: String,
    val lastValue: Int,
    val updatedAtEpochMs: Long
)

@Entity(
    tableName = "payment_batches",
    foreignKeys = [ForeignKey(
        entity = OrderEntity::class,
        parentColumns = ["orderId"],
        childColumns = ["orderId"],
        onDelete = ForeignKey.RESTRICT
    )],
    indices = [Index(value = ["orderId"])]
)
data class PaymentBatchEntity(
    @PrimaryKey val paymentBatchId: String,
    val orderId: String,
    val amountMinor: Long,
    val method: String,
    val createdAtEpochMs: Long
)

@Entity(
    tableName = "payment_entries",
    foreignKeys = [ForeignKey(
        entity = PaymentBatchEntity::class,
        parentColumns = ["paymentBatchId"],
        childColumns = ["paymentBatchId"],
        onDelete = ForeignKey.CASCADE
    )],
    indices = [Index(value = ["paymentBatchId", "entryIndex"], unique = true)]
)
data class PaymentEntryEntity(
    @PrimaryKey val paymentEntryId: String,
    val paymentBatchId: String,
    val entryIndex: Int,
    val method: String,
    val amountMinor: Long,
    val reference: String?
)

@Entity(
    tableName = "refund_batches",
    foreignKeys = [ForeignKey(
        entity = OrderEntity::class,
        parentColumns = ["orderId"],
        childColumns = ["orderId"],
        onDelete = ForeignKey.RESTRICT
    )],
    indices = [Index(value = ["orderId"])]
)
data class RefundBatchEntity(
    @PrimaryKey val refundBatchId: String,
    val orderId: String,
    val amountMinor: Long,
    val method: String,
    val createdAtEpochMs: Long
)

@Entity(
    tableName = "print_jobs",
    foreignKeys = [ForeignKey(
        entity = OrderEntity::class,
        parentColumns = ["orderId"],
        childColumns = ["orderId"],
        onDelete = ForeignKey.RESTRICT
    )],
    indices = [Index(value = ["orderId", "orderVersion"]), Index(value = ["status"])]
)
data class PrintJobEntity(
    @PrimaryKey val printJobId: String,
    val orderId: String,
    val orderVersion: Int,
    val kind: String,
    val routeKey: String,
    val status: String,
    val createdAtEpochMs: Long,
    val updatedAtEpochMs: Long
)

@Entity(
    tableName = "print_attempts",
    foreignKeys = [ForeignKey(
        entity = PrintJobEntity::class,
        parentColumns = ["printJobId"],
        childColumns = ["printJobId"],
        onDelete = ForeignKey.CASCADE
    )],
    indices = [Index(value = ["printJobId", "attemptNumber"], unique = true)]
)
data class PrintAttemptEntity(
    @PrimaryKey val attemptId: String,
    val printJobId: String,
    val attemptNumber: Int,
    val startedAtEpochMs: Long,
    val finishedAtEpochMs: Long?,
    val result: String,
    val errorCode: String?
)

@Entity(tableName = "outbox_events", indices = [Index(value = ["status", "createdAtEpochMs"]), Index(value = ["aggregateId", "aggregateVersion"])])
data class OutboxEventEntity(
    @PrimaryKey val eventId: String,
    val aggregateId: String,
    val aggregateVersion: Int,
    val eventType: String,
    val payloadJson: String,
    val status: String,
    val retryCount: Int,
    val nextAttemptAtEpochMs: Long?,
    val createdAtEpochMs: Long
)

@Entity(tableName = "sync_cursors")
data class SyncCursorEntity(
    @PrimaryKey val streamName: String,
    val cursorValue: String,
    val updatedAtEpochMs: Long
)

@Entity(tableName = "availability_snapshots", indices = [Index(value = ["updatedAtEpochMs"])])
data class AvailabilitySnapshotEntity(
    @PrimaryKey val productId: String,
    val status: String,
    val reason: String?,
    val permanentStop: Boolean,
    val updatedAtEpochMs: Long,
    val sourceVersion: Long
)

@Entity(tableName = "system_events", indices = [Index(value = ["severity", "resolvedAtEpochMs"]), Index(value = ["createdAtEpochMs"])])
data class SystemEventEntity(
    @PrimaryKey val systemEventId: String,
    val severity: String,
    val eventType: String,
    val userMessage: String,
    val technicalCode: String,
    val relatedId: String?,
    val createdAtEpochMs: Long,
    val resolvedAtEpochMs: Long?
)

@Entity(tableName = "day_closes", indices = [Index(value = ["businessDate", "version"], unique = true)])
data class DayCloseEntity(
    @PrimaryKey val dayCloseId: String,
    val businessDate: String,
    val version: Int,
    val grossSalesMinor: Long,
    val settledPaymentsMinor: Long,
    val refundsMinor: Long,
    val netCashMovementMinor: Long,
    val createdAtEpochMs: Long
)

@Entity(tableName = "app_settings")
data class AppSettingEntity(
    @PrimaryKey val settingKey: String,
    val settingValue: String,
    val updatedAtEpochMs: Long
)

@Entity(tableName = "device_state")
data class DeviceStateEntity(
    @PrimaryKey val deviceId: String,
    val deviceType: String,
    val approvalStatus: String,
    val lastHeartbeatAtEpochMs: Long?,
    val lastSuccessfulSyncAtEpochMs: Long?,
    val appVersion: String,
    val updatedAtEpochMs: Long
)
