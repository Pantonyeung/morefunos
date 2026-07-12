package com.morefun.smt.cloud

import org.json.JSONObject
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class CloudActionExecutor(
    private val manager: CloudSessionManager,
    private val executor: ExecutorService = Executors.newSingleThreadExecutor()
) {
    fun submit(rawJson: String, callback: (requestId: String, resultJson: String) -> Unit): String {
        val input = try { JSONObject(rawJson) } catch (_: Throwable) {
            return failure("", "INVALID_INTENT", "無法讀取操作內容")
        }
        val requestId = input.optString("request_id")
        val action = input.optString("action")
        val payload = input.optJSONObject("payload") ?: JSONObject()
        if (requestId.isBlank() || action.isBlank()) return failure(requestId, "INVALID_INTENT", "缺少 request_id 或 action")
        if (action !in ALLOWED_ACTIONS) return failure(requestId, "HANDLER_NOT_REGISTERED", "action is not allow-listed")
        executor.execute {
            val result = try {
                when (action) {
                    "CLOUD_HEALTH" -> manager.health()
                    "CLOUD_LOGIN" -> manager.login(payload)
                    "CLOUD_BOOTSTRAP" -> manager.bootstrap()
                    "CLOUD_SUBMISSION_LIST" -> manager.listSubmissions(payload)
                    "CLOUD_LOGOUT" -> manager.logout()
                    "CLOUD_SESSION_STATUS" -> manager.sessionStatus()
                    else -> failure(requestId, "HANDLER_NOT_REGISTERED", "action is not allow-listed")
                }
            } catch (t: CloudTransportException) {
                failure(requestId, "CLOUD_UNREACHABLE", "雲端暫時無法連接", true)
            } catch (t: Throwable) {
                failure(requestId, "CLOUD_OPERATION_FAILED", t.message ?: "雲端操作失敗")
            }
            callback(requestId, result)
        }
        return JSONObject().put("ok", true).put("request_id", requestId).put("accepted", true).toString()
    }

    fun shutdown() { executor.shutdownNow() }

    private fun failure(requestId: String, code: String, message: String, retryable: Boolean = false): String = JSONObject()
        .put("ok", false)
        .put("request_id", requestId)
        .put("error", JSONObject().put("code", code).put("message", message).put("retryable", retryable))
        .toString()

    private companion object {
        val ALLOWED_ACTIONS = setOf(
            "CLOUD_HEALTH",
            "CLOUD_LOGIN",
            "CLOUD_BOOTSTRAP",
            "CLOUD_SUBMISSION_LIST",
            "CLOUD_LOGOUT",
            "CLOUD_SESSION_STATUS"
        )
    }
}
