package com.morefun.smt.recovery

import android.content.Context
import androidx.work.ExistingWorkPolicy
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import com.morefun.smt.data.room.MoreFunDatabase
import org.json.JSONObject

class RecoveryCoordinator(
    context: Context,
    private val database: MoreFunDatabase,
    private val workManager: WorkManager = WorkManager.getInstance(context)
) {
    fun inspectAndSchedule(): RecoverySnapshot {
        val printJobs = database.printDao().listRecoverableJobs()
        val outbox = database.syncDao().listPendingOutbox(200)
        val events = database.operationsDao().listOpenSystemEvents()

        // Recovery never auto-reprints completed or uncertain jobs; the worker only inspects pending records.
        if (printJobs.isNotEmpty()) {
            workManager.enqueueUniqueWork(
                PRINT_RECOVERY_WORK,
                ExistingWorkPolicy.KEEP,
                OneTimeWorkRequestBuilder<PrintRecoveryWorker>().build()
            )
        }
        if (outbox.isNotEmpty()) {
            workManager.enqueueUniqueWork(
                SYNC_RECOVERY_WORK,
                ExistingWorkPolicy.KEEP,
                OneTimeWorkRequestBuilder<SyncRecoveryWorker>().build()
            )
        }
        return RecoverySnapshot(printJobs.size, outbox.size, events.size)
    }

    companion object {
        const val PRINT_RECOVERY_WORK = "morefun-print-recovery"
        const val SYNC_RECOVERY_WORK = "morefun-sync-recovery"
    }
}

data class RecoverySnapshot(
    val recoverablePrintJobs: Int,
    val pendingOutboxEvents: Int,
    val openSystemEvents: Int
) {
    fun toJson(): String = JSONObject()
        .put("ok", true)
        .put("recoverable_print_jobs", recoverablePrintJobs)
        .put("pending_outbox_events", pendingOutboxEvents)
        .put("open_system_events", openSystemEvents)
        .put("formal_result", false)
        .toString()
}
