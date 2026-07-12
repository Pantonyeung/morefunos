package com.morefun.smt.cloud

import org.json.JSONObject
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL
import java.nio.charset.StandardCharsets
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone
import java.util.UUID

class CloudTransportException(message: String, cause: Throwable? = null) : RuntimeException(message, cause)

class CloudApiClient(
    private val endpoint: String,
    private val deviceType: String = "SMT",
    private val connectionFactory: (String) -> HttpURLConnection = { URL(it).openConnection() as HttpURLConnection }
) {
    init {
        require(endpoint.startsWith("https://")) { "cloud endpoint must use https" }
    }

    fun health(): JSONObject = execute("GET", null)

    fun post(
        action: String,
        deviceId: String,
        appVersion: String,
        payload: JSONObject,
        accessToken: String? = null,
        idempotencyKey: String? = null,
        businessDate: String? = null
    ): JSONObject {
        require(action.isNotBlank())
        require(deviceId.isNotBlank())
        require(appVersion.isNotBlank())
        val request = JSONObject()
            .put("action", action)
            .put("request_id", "req-${UUID.randomUUID()}")
            .put("device_id", deviceId)
            .put("device_type", deviceType)
            .put("app_version", appVersion)
            .put("sent_at", nowIsoUtc())
            .put("payload", payload)
        if (!businessDate.isNullOrBlank()) request.put("business_date", businessDate)
        if (!idempotencyKey.isNullOrBlank()) request.put("idempotency_key", idempotencyKey)
        if (!accessToken.isNullOrBlank()) {
            request.put("auth", JSONObject().put("access_token", accessToken))
        }
        return execute("POST", request.toString())
    }

    private fun execute(method: String, body: String?): JSONObject {
        val connection = try {
            connectionFactory(endpoint)
        } catch (t: Throwable) {
            throw CloudTransportException("Unable to create cloud connection", t)
        }
        return try {
            connection.requestMethod = method
            connection.connectTimeout = 12_000
            connection.readTimeout = 20_000
            connection.instanceFollowRedirects = true
            connection.setRequestProperty("Accept", "application/json")
            if (body != null) {
                connection.doOutput = true
                connection.setRequestProperty("Content-Type", "application/json; charset=utf-8")
                connection.outputStream.use { it.write(body.toByteArray(StandardCharsets.UTF_8)) }
            }
            val status = connection.responseCode
            val stream = if (status in 200..299) connection.inputStream else connection.errorStream
            val text = if (stream == null) "" else BufferedReader(InputStreamReader(stream, StandardCharsets.UTF_8)).use { it.readText() }
            if (text.isBlank()) throw CloudTransportException("Cloud returned an empty response")
            JSONObject(text)
        } catch (t: CloudTransportException) {
            throw t
        } catch (t: Throwable) {
            throw CloudTransportException("Cloud request failed", t)
        } finally {
            connection.disconnect()
        }
    }

    private fun nowIsoUtc(): String = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US).apply {
        timeZone = TimeZone.getTimeZone("UTC")
    }.format(Date())
}
