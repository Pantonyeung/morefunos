package com.morefun.smt.recovery

import android.content.Context
import androidx.work.Worker
import androidx.work.WorkerParameters
import com.morefun.smt.MoreFunSmtApplication

class PrintRecoveryWorker(
    appContext: Context,
    params: WorkerParameters
) : Worker(appContext, params) {
    override fun doWork(): Result {
        val app = applicationContext as MoreFunSmtApplication
        val pending = app.database.printDao().listRecoverableJobs()
        return if (pending.isEmpty()) Result.success() else Result.retry()
    }
}
