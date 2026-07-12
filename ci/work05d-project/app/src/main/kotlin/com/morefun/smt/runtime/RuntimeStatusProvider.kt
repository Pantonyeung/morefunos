package com.morefun.smt.runtime

import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import com.morefun.smt.data.room.MoreFunDatabase
import org.json.JSONObject

class RuntimeStatusProvider(
    context: Context,
    private val database: MoreFunDatabase
) {
    private val connectivity = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

    fun toJson(requestId: String? = null): String {
        val active = connectivity.activeNetwork
        val caps = active?.let(connectivity::getNetworkCapabilities)
        val online = caps?.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET) == true &&
            caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED)
        val printJobs = database.printDao().listRecoverableJobs().size
        val outbox = database.syncDao().listPendingOutbox(200).size
        val events = database.operationsDao().listOpenSystemEvents().size
        return JSONObject()
            .put("ok", true)
            .put("request_id", requestId)
            .put("release", "0.3.0-operations")
            .put("authority", "SMT_LOCAL_SQLITE")
            .put("database", if (database.isOpen) "ROOM_V2_READY" else "ROOM_CLOSED")
            .put("network", if (online) "ONLINE" else "OFFLINE_LOCAL")
            .put("recoverable_print_jobs", printJobs)
            .put("pending_outbox_events", outbox)
            .put("open_system_events", events)
            .put("formal_order_writes", true)
            .toString()
    }
}
