package com.morefun.smt

import android.app.Application
import androidx.room.Room
import com.morefun.smt.cloud.CloudActionExecutor
import com.morefun.smt.cloud.CloudApiClient
import com.morefun.smt.cloud.CloudSessionManager
import com.morefun.smt.cloud.SecureSessionStore
import com.morefun.smt.data.room.MoreFunDatabase
import com.morefun.smt.data.room.MoreFunMigrations
import com.morefun.smt.data.room.RoomSmtLocalStore
import com.morefun.smt.domain.usecase.CreateOrderUseCase
import com.morefun.smt.domain.usecase.RecordPaymentUseCase
import com.morefun.smt.domain.usecase.SetAvailabilityUseCase
import com.morefun.smt.domain.usecase.UpdateProductionStatusUseCase
import com.morefun.smt.recovery.RecoveryCoordinator
import com.morefun.smt.runtime.RuntimeStatusProvider
import com.morefun.smt.runtime.UuidIdGenerator

class MoreFunSmtApplication : Application() {
    lateinit var database: MoreFunDatabase
        private set
    lateinit var localStore: RoomSmtLocalStore
        private set
    lateinit var createOrderUseCase: CreateOrderUseCase
        private set
    lateinit var recordPaymentUseCase: RecordPaymentUseCase
        private set
    lateinit var updateProductionStatusUseCase: UpdateProductionStatusUseCase
        private set
    lateinit var setAvailabilityUseCase: SetAvailabilityUseCase
        private set
    lateinit var recoveryCoordinator: RecoveryCoordinator
        private set
    lateinit var runtimeStatusProvider: RuntimeStatusProvider
        private set
    lateinit var cloudActionExecutor: CloudActionExecutor
        private set

    override fun onCreate() {
        super.onCreate()
        database = Room.databaseBuilder(
            applicationContext,
            MoreFunDatabase::class.java,
            "morefun-smt.db"
        ).addMigrations(MoreFunMigrations.MIGRATION_1_2).build()

        localStore = RoomSmtLocalStore(database)
        val ids = UuidIdGenerator()
        createOrderUseCase = CreateOrderUseCase(localStore, ids)
        recordPaymentUseCase = RecordPaymentUseCase(localStore, ids)
        updateProductionStatusUseCase = UpdateProductionStatusUseCase(localStore, ids)
        setAvailabilityUseCase = SetAvailabilityUseCase(localStore, ids)
        recoveryCoordinator = RecoveryCoordinator(applicationContext, database)
        runtimeStatusProvider = RuntimeStatusProvider(applicationContext, database)

        val sessionManager = CloudSessionManager(
            client = CloudApiClient(BuildConfig.STAFF_API_URL),
            store = SecureSessionStore(applicationContext),
            database = database,
            appVersion = BuildConfig.VERSION_NAME
        )
        cloudActionExecutor = CloudActionExecutor(sessionManager)
    }
}
