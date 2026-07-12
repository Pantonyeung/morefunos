package com.morefun.smt.cloud

import com.morefun.smt.data.room.AppSettingEntity
import com.morefun.smt.data.room.AvailabilitySnapshotEntity
import com.morefun.smt.data.room.MoreFunDatabase
import org.json.JSONArray
import org.json.JSONObject

class CloudSessionManager(
    private val client: CloudApiClient,
    private val store: SecureSessionStore,
    private val database: MoreFunDatabase,
    private val appVersion: String,
    private val nowEpochMs: () -> Long = { System.currentTimeMillis() }
) {
    fun health(): String = client.health().toString()

    fun login(payload: JSONObject): String {
        val username = payload.optString("username").trim()
        val password = payload.optString("password")
        val deviceId = payload.optString("device_id").trim()
        if (username.isBlank() || password.isBlank() || deviceId.isBlank()) {
            return failure("LOGIN_FIELDS_REQUIRED", "帳號、密碼及裝置 ID 必須填寫")
        }
        val response = client.post(
            action = "auth.login",
            deviceId = deviceId,
            appVersion = appVersion,
            payload = JSONObject().put("username", username).put("password", password)
        )
        if (!response.optBoolean("ok", false)) return response.toString()
        val result = response.getJSONObject("result")
        val permissionsJson = result.optJSONArray("permissions") ?: JSONArray()
        val session = CloudSession(
            sessionId = result.getString("session_id"),
            accessToken = result.getString("access_token"),
            accessExpiresAt = result.getString("access_expires_at"),
            refreshToken = result.getString("refresh_token"),
            refreshExpiresAt = result.getString("refresh_expires_at"),
            deviceId = deviceId,
            role = result.optString("role", "SMT"),
            permissions = (0 until permissionsJson.length()).map { permissionsJson.getString(it) }
        )
        store.save(session)
        val bootstrap = bootstrapObject()
        return JSONObject()
            .put("ok", bootstrap.optBoolean("ok", false))
            .put("login", JSONObject()
                .put("session_id", session.sessionId)
                .put("role", session.role)
                .put("permissions", JSONArray(session.permissions)))
            .put("bootstrap", bootstrap.optJSONObject("result"))
            .put("bootstrap_error", bootstrap.optJSONObject("error"))
            .toString()
    }

    fun bootstrap(): String = bootstrapObject().toString()

    fun listSubmissions(payload: JSONObject): String = authenticatedPost(
        "submission.list",
        JSONObject()
            .put("status", payload.optString("status", "PENDING"))
            .put("business_date", payload.optString("business_date"))
            .put("limit", payload.optInt("limit", 50))
            .put("cursor", payload.optString("cursor"))
    ).toString()

    fun sessionStatus(): String {
        val session = store.load()
        val cached = database.operationsDao().getSetting(BOOTSTRAP_CACHE_KEY)
        return JSONObject()
            .put("ok", true)
            .put("authenticated", session != null)
            .put("device_id", session?.deviceId ?: "")
            .put("role", session?.role ?: "")
            .put("permissions", JSONArray(session?.permissions ?: emptyList<String>()))
            .put("cached_bootstrap", cached?.settingValue?.let(::JSONObject))
            .toString()
    }

    fun logout(): String {
        clearSession()
        return JSONObject().put("ok", true).put("authenticated", false).toString()
    }

    fun clearSession() {
        store.clear()
    }

    private fun bootstrapObject(): JSONObject {
        val response = authenticatedPost("app.bootstrap", JSONObject())
        if (response.optBoolean("ok", false)) {
            val result = response.getJSONObject("result")
            cacheBootstrap(result)
            applyAvailabilityMirror(result.optJSONArray("availability_mirror") ?: JSONArray())
        }
        return response
    }

    private fun authenticatedPost(action: String, payload: JSONObject): JSONObject {
        var session = store.load() ?: return JSONObject(failure("LOGIN_REQUIRED", "請先登入"))
        var response = client.post(action, session.deviceId, appVersion, payload, session.accessToken)
        if (response.optJSONObject("error")?.optString("code") == "TOKEN_EXPIRED") {
            val refreshed = refresh(session)
            if (refreshed == null) {
                clearSession()
                return JSONObject(failure("LOGIN_REQUIRED", "登入已過期，請重新登入"))
            }
            session = refreshed
            response = client.post(action, session.deviceId, appVersion, payload, session.accessToken)
        }
        return response
    }

    private fun refresh(previous: CloudSession): CloudSession? {
        val response = client.post(
            action = "auth.refresh",
            deviceId = previous.deviceId,
            appVersion = appVersion,
            payload = JSONObject().put("refresh_token", previous.refreshToken)
        )
        if (!response.optBoolean("ok", false)) return null
        val result = response.getJSONObject("result")
        return previous.copy(
            sessionId = result.getString("session_id"),
            accessToken = result.getString("access_token"),
            accessExpiresAt = result.getString("access_expires_at"),
            refreshToken = result.getString("refresh_token"),
            refreshExpiresAt = result.getString("refresh_expires_at")
        ).also(store::save)
    }

    private fun cacheBootstrap(result: JSONObject) {
        database.operationsDao().upsertSetting(
            AppSettingEntity(BOOTSTRAP_CACHE_KEY, result.toString(), nowEpochMs())
        )
    }

    private fun applyAvailabilityMirror(rows: JSONArray) {
        for (index in 0 until rows.length()) {
            val row = rows.optJSONObject(index) ?: continue
            val productId = row.optString("product_id")
            if (productId.isBlank()) continue
            val rawStatus = row.optString("status", "AVAILABLE").uppercase()
            val status = if (rawStatus in setOf("SOLD_OUT", "UNAVAILABLE", "STOPPED")) "SOLD_OUT" else "AVAILABLE"
            database.operationsDao().upsertAvailability(
                AvailabilitySnapshotEntity(
                    productId = productId,
                    status = status,
                    reason = row.optString("reason").takeIf { it.isNotBlank() },
                    permanentStop = row.optBoolean("permanent_stop", false),
                    updatedAtEpochMs = nowEpochMs(),
                    sourceVersion = row.optLong("version_no", 1L).coerceAtLeast(1L)
                )
            )
        }
    }

    private fun failure(code: String, message: String): String = JSONObject()
        .put("ok", false)
        .put("error", JSONObject().put("code", code).put("message", message).put("retryable", false))
        .toString()

    private companion object { const val BOOTSTRAP_CACHE_KEY = "staff_bootstrap_json" }
}
