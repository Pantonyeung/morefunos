package com.morefun.smt.cloud

import android.content.Context
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import android.util.Base64
import org.json.JSONArray
import org.json.JSONObject
import java.security.KeyStore
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec

data class CloudSession(
    val sessionId: String,
    val accessToken: String,
    val accessExpiresAt: String,
    val refreshToken: String,
    val refreshExpiresAt: String,
    val deviceId: String,
    val role: String,
    val permissions: List<String>
)

class SecureSessionStore(context: Context) {
    private val preferences = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)

    fun save(session: CloudSession) {
        val clear = JSONObject()
            .put("sessionId", session.sessionId)
            .put("accessToken", session.accessToken)
            .put("accessExpiresAt", session.accessExpiresAt)
            .put("refreshToken", session.refreshToken)
            .put("refreshExpiresAt", session.refreshExpiresAt)
            .put("deviceId", session.deviceId)
            .put("role", session.role)
            .put("permissions", JSONArray(session.permissions))
            .toString()
        val cipher = Cipher.getInstance(TRANSFORMATION)
        cipher.init(Cipher.ENCRYPT_MODE, getOrCreateKey())
        val iv = Base64.encodeToString(cipher.iv, Base64.NO_WRAP)
        val ciphertext = Base64.encodeToString(cipher.doFinal(clear.toByteArray(Charsets.UTF_8)), Base64.NO_WRAP)
        preferences.edit().putString(SESSION_BLOB, "$iv:$ciphertext").apply()
    }

    fun load(): CloudSession? {
        val encoded = preferences.getString(SESSION_BLOB, null) ?: return null
        return try {
            val parts = encoded.split(':', limit = 2)
            if (parts.size != 2) return null
            val cipher = Cipher.getInstance(TRANSFORMATION)
            cipher.init(
                Cipher.DECRYPT_MODE,
                getOrCreateKey(),
                GCMParameterSpec(128, Base64.decode(parts[0], Base64.NO_WRAP))
            )
            val json = JSONObject(String(cipher.doFinal(Base64.decode(parts[1], Base64.NO_WRAP)), Charsets.UTF_8))
            val permissionsJson = json.optJSONArray("permissions") ?: JSONArray()
            val permissions = (0 until permissionsJson.length()).map { permissionsJson.getString(it) }
            CloudSession(
                sessionId = json.getString("sessionId"),
                accessToken = json.getString("accessToken"),
                accessExpiresAt = json.getString("accessExpiresAt"),
                refreshToken = json.getString("refreshToken"),
                refreshExpiresAt = json.getString("refreshExpiresAt"),
                deviceId = json.getString("deviceId"),
                role = json.optString("role", "SMT"),
                permissions = permissions
            )
        } catch (_: Throwable) {
            clear()
            null
        }
    }

    fun clear() {
        preferences.edit().remove(SESSION_BLOB).apply()
    }

    private fun getOrCreateKey(): SecretKey {
        val keyStore = KeyStore.getInstance(KEYSTORE).apply { load(null) }
        (keyStore.getKey(KEY_ALIAS, null) as? SecretKey)?.let { return it }
        val generator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, KEYSTORE)
        generator.init(
            KeyGenParameterSpec.Builder(
                KEY_ALIAS,
                KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT
            )
                .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
                .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                .setRandomizedEncryptionRequired(true)
                .build()
        )
        return generator.generateKey()
    }

    private companion object {
        const val PREFS = "morefun_smt_secure_session"
        const val SESSION_BLOB = "session_blob"
        const val KEYSTORE = "AndroidKeyStore"
        const val KEY_ALIAS = "morefun_smt_staff_session_v1"
        const val TRANSFORMATION = "AES/GCM/NoPadding"
    }
}
