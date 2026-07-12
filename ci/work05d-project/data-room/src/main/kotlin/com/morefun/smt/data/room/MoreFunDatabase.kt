package com.morefun.smt.data.room

import androidx.room.Database
import androidx.room.RoomDatabase

@Database(
    entities = [
        OrderEntity::class,
        OrderVersionEntity::class,
        OrderItemEntity::class,
        OrderItemOptionEntity::class,
        IdempotencyRecordEntity::class,
        DailySequenceEntity::class,
        PaymentBatchEntity::class,
        PaymentEntryEntity::class,
        RefundBatchEntity::class,
        PrintJobEntity::class,
        PrintAttemptEntity::class,
        OutboxEventEntity::class,
        SyncCursorEntity::class,
        AvailabilitySnapshotEntity::class,
        SystemEventEntity::class,
        DayCloseEntity::class,
        AppSettingEntity::class,
        DeviceStateEntity::class
    ],
    version = 2,
    exportSchema = true
)
abstract class MoreFunDatabase : RoomDatabase() {
    abstract fun orderDao(): OrderDao
    abstract fun sequenceDao(): SequenceDao
    abstract fun idempotencyDao(): IdempotencyDao
    abstract fun financeDao(): FinanceDao
    abstract fun printDao(): PrintDao
    abstract fun syncDao(): SyncDao
    abstract fun operationsDao(): OperationsDao
}
