package com.morefun.smt

import android.app.Activity
import android.os.Build
import android.os.Bundle
import android.view.View
import android.view.WindowManager
import android.webkit.RenderProcessGoneDetail
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewClientCompat
import com.morefun.smt.bridge.IntentDispatcher
import com.morefun.smt.bridge.NativeBridge
import org.json.JSONObject

class MainActivity : Activity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        enterImmersiveMode()

        val app = application as MoreFunSmtApplication
        val dispatcher = IntentDispatcher(
            database = app.database,
            store = app.localStore,
            createOrder = app.createOrderUseCase,
            recordPayment = app.recordPaymentUseCase,
            updateProductionStatus = app.updateProductionStatusUseCase,
            setAvailability = app.setAvailabilityUseCase,
            recoveryCoordinator = app.recoveryCoordinator,
            runtimeStatus = app.runtimeStatusProvider
        )
        val assetLoader = WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()

        WebView.setWebContentsDebuggingEnabled(BuildConfig.DEBUG)
        webView = WebView(this).apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.allowFileAccess = false
            settings.allowContentAccess = false
            settings.mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
            settings.javaScriptCanOpenWindowsAutomatically = false
            settings.setSupportMultipleWindows(false)
            settings.setSupportZoom(false)
            settings.builtInZoomControls = false
            settings.displayZoomControls = false
            settings.cacheMode = WebSettings.LOAD_DEFAULT
            settings.userAgentString = settings.userAgentString + " MoreFunSMT/0.3.0"
            webViewClient = object : WebViewClientCompat() {
                override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse? =
                    assetLoader.shouldInterceptRequest(request.url)

                override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean =
                    request.url.host != "appassets.androidplatform.net"

                override fun onRenderProcessGone(view: WebView, detail: RenderProcessGoneDetail): Boolean {
                    view.destroy()
                    recreate()
                    return true
                }
            }
        }
        val bridge = NativeBridge(
            dispatcher = dispatcher,
            recoveryCoordinator = app.recoveryCoordinator,
            cloudExecutor = app.cloudActionExecutor
        ) { requestId, resultJson ->
            webView.post {
                val script = "window.MoreFunApp&&window.MoreFunApp.onNativeResult&&window.MoreFunApp.onNativeResult(" +
                    JSONObject.quote(requestId) + "," + JSONObject.quote(resultJson) + ")"
                webView.evaluateJavascript(script, null)
            }
        }
        webView.addJavascriptInterface(bridge, "MoreFunNative")
        setContentView(webView)
        webView.loadUrl("https://appassets.androidplatform.net/assets/smt/index.html")
    }

    override fun onWindowFocusChanged(hasFocus: Boolean) {
        super.onWindowFocusChanged(hasFocus)
        if (hasFocus) enterImmersiveMode()
    }

    override fun onResume() {
        super.onResume()
        webView.evaluateJavascript(
            "window.MoreFunApp&&window.MoreFunApp.refreshRuntime&&window.MoreFunApp.refreshRuntime()",
            null
        )
    }

    override fun onBackPressed() {
        if (webView.canGoBack()) webView.goBack()
        else webView.evaluateJavascript(
            "window.MoreFunApp&&window.MoreFunApp.handleBack&&window.MoreFunApp.handleBack()",
            null
        )
    }

    override fun onDestroy() {
        webView.removeJavascriptInterface("MoreFunNative")
        webView.stopLoading()
        webView.webViewClient = WebViewClient()
        webView.destroy()
        super.onDestroy()
    }

    private fun enterImmersiveMode() {
        @Suppress("DEPRECATION")
        window.decorView.systemUiVisibility =
            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY or
                View.SYSTEM_UI_FLAG_FULLSCREEN or
                View.SYSTEM_UI_FLAG_HIDE_NAVIGATION or
                View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN or
                View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION or
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            window.attributes = window.attributes.apply {
                layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES
            }
        }
    }
}
