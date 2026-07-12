package com.morefun.smt.data.room

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update

@Dao
interface OrderDao {
    @Insert(onConflict = OnConflictStrategy.ABORT) fun insertOrder(entity: OrderEntity)
    @Update fun updateOrder(entity: OrderEntity)
    @Query("SELECT * FROM orders WHERE orderId = :orderId LIMIT 1") fun getOrder(orderId: String): OrderEntity?
    @Query("SELECT * FROM orders WHERE businessDate = :businessDate ORDER BY sequence") fun listOrdersByDate(businessDate: String): List<OrderEntity>

    @Insert(onConflict = OnConflictStrategy.ABORT) fun insertVersion(entity: OrderVersionEntity)
    @Query("SELECT * FROM order_versions WHERE orderId = :orderId ORDER BY version") fun listVersions(orderId: String): List<OrderVersionEntity>
    @Query("SELECT * FROM order_versions WHERE orderId = :orderId AND version = :version LIMIT 1") fun getVersion(orderId: String, version: Int): OrderVersionEntity?

    @Insert(onConflict = OnConflictStrategy.ABORT) fun insertItems(entities: List<OrderItemEntity>)
    @Insert(onConflict = OnConflictStrategy.ABORT) fun insertOptions(entities: List<OrderItemOptionEntity>)
    @Query("SELECT * FROM order_items WHERE versionId = :versionId ORDER BY lineIndex") fun listItems(versionId: String): List<OrderItemEntity>
    @Query("SELECT * FROM order_item_options WHERE itemId = :itemId ORDER BY optionIndex") fun listOptions(itemId: String): List<OrderItemOptionEntity>
}

@Dao
interface SequenceDao {
    @Query("SELECT * FROM daily_sequences WHERE businessDate = :businessDate LIMIT 1") fun get(businessDate: String): DailySequenceEntity?
    @Insert(onConflict = OnConflictStrategy.ABORT) fun insert(entity: DailySequenceEntity)
    @Update fun update(entity: DailySequenceEntity)
}

@Dao
interface IdempotencyDao {
    @Query("SELECT * FROM idempotency_records WHERE idempotencyKey = :key LIMIT 1") fun get(key: String): IdempotencyRecordEntity?
    @Insert(onConflict = OnConflictStrategy.ABORT) fun insert(entity: IdempotencyRecordEntity)
}

@Dao
interface FinanceDao {
    @Insert(onConflict = OnConflictStrategy.ABORT) fun insertPayment(entity: PaymentBatchEntity)
    @Insert(onConflict = OnConflictStrategy.ABORT) fun insertPaymentEntries(entities: List<PaymentEntryEntity>)
    @Query("SELECT * FROM payment_batches WHERE orderId = :orderId ORDER BY createdAtEpochMs") fun listPayments(orderId: String): List<PaymentBatchEntity>
    @Insert(onConflict = OnConflictStrategy.ABORT) fun insertRefund(entity: RefundBatchEntity)
    @Query("SELECT * FROM refund_batches WHERE orderId = :orderId ORDER BY createdAtEpochMs") fun listRefunds(orderId: String): List<RefundBatchEntity>
}

@Dao
interface PrintDao {
    @Insert(onConflict = OnConflictStrategy.ABORT) fun insertJobs(entities: List<PrintJobEntity>)
    @Insert(onConflict = OnConflictStrategy.ABORT) fun insertAttempt(entity: PrintAttemptEntity)
    @Query("SELECT * FROM print_jobs WHERE status IN ('QUEUED','PRINTING','FAILED','PARTIAL_SUCCESS') ORDER BY createdAtEpochMs") fun listRecoverableJobs(): List<PrintJobEntity>
    @Query("SELECT * FROM print_jobs WHERE orderId = :orderId ORDER BY createdAtEpochMs") fun listJobs(orderId: String): List<PrintJobEntity>
    @Update fun updateJob(entity: PrintJobEntity)
}

@Dao
interface SyncDao {
    @Insert(onConflict = OnConflictStrategy.ABORT) fun insertOutbox(entity: OutboxEventEntity)
    @Query("SELECT * FROM outbox_events WHERE status IN ('WAITING_SYNC','CONFLICT','MANUAL_REVIEW') ORDER BY createdAtEpochMs LIMIT :limit") fun listPendingOutbox(limit: Int): List<OutboxEventEntity>
    @Update fun updateOutbox(entity: OutboxEventEntity)
    @Query("SELECT * FROM sync_cursors WHERE streamName = :stream LIMIT 1") fun getCursor(stream: String): SyncCursorEntity?
    @Insert(onConflict = OnConflictStrategy.REPLACE) fun upsertCursor(entity: SyncCursorEntity)
}

@Dao
interface OperationsDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE) fun upsertAvailability(entity: AvailabilitySnapshotEntity)
    @Query("SELECT * FROM availability_snapshots WHERE productId = :productId LIMIT 1") fun getAvailability(productId: String): AvailabilitySnapshotEntity?
    @Query("SELECT * FROM availability_snapshots ORDER BY productId") fun listAvailability(): List<AvailabilitySnapshotEntity>
    @Insert(onConflict = OnConflictStrategy.ABORT) fun insertSystemEvent(entity: SystemEventEntity)
    @Query("SELECT * FROM system_events WHERE resolvedAtEpochMs IS NULL ORDER BY severity, createdAtEpochMs") fun listOpenSystemEvents(): List<SystemEventEntity>
    @Update fun updateSystemEvent(entity: SystemEventEntity)
    @Query("SELECT * FROM day_closes WHERE businessDate = :businessDate ORDER BY version DESC LIMIT 1") fun getLatestDayClose(businessDate: String): DayCloseEntity?
    @Insert(onConflict = OnConflictStrategy.ABORT) fun insertDayClose(entity: DayCloseEntity)
    @Insert(onConflict = OnConflictStrategy.REPLACE) fun upsertSetting(entity: AppSettingEntity)
    @Query("SELECT * FROM app_settings WHERE settingKey = :key LIMIT 1") fun getSetting(key: String): AppSettingEntity?
    @Insert(onConflict = OnConflictStrategy.REPLACE) fun upsertDeviceState(entity: DeviceStateEntity)
    @Query("SELECT * FROM device_state WHERE deviceId = :deviceId LIMIT 1") fun getDeviceState(deviceId: String): DeviceStateEntity?
}
