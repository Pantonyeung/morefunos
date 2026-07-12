package com.morefun.smt.bridge

import android.webkit.JavascriptInterface
import com.morefun.smt.cloud.CloudActionExecutor
import com.morefun.smt.recovery.RecoveryCoordinator
import org.json.JSONObject

class NativeBridge(
    private val dispatcher: IntentDispatcher,
    private val recoveryCoordinator: RecoveryCoordinator,
    private val cloudExecutor: CloudActionExecutor,
    private val cloudResultCallback: (requestId: String, resultJson: String) -> Unit
) {
    @JavascriptInterface
    fun getReleaseStatus(): String = JSONObject()
        .put("ok", true)
        .put("release", "0.3.0-operations")
        .put("authority", "SMT_LOCAL_SQLITE")
        .put("database", "ROOM_V2")
        .put("mode", "HYBRID_B")
        .toString()

    @JavascriptInterface
    fun requestRecovery(): String = recoveryCoordinator.inspectAndSchedule().toJson()

    @JavascriptInterface
    fun queryOrder(orderId: String): String = dispatcher.queryOrder(orderId)

    @JavascriptInterface
    fun submitIntent(json: String): String = dispatcher.dispatch(json)

    @JavascriptInterface
    fun submitAsyncIntent(json: String): String = cloudExecutor.submit(json, cloudResultCallback)
}
