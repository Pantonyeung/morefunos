plugins {
    alias(libs.plugins.android.application)
}

android {
    namespace = "com.morefun.smt"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.morefun.smt"
        minSdk = 23
        targetSdk = 36
        versionCode = 4
        versionName = "0.4.0"
        buildConfigField("String", "STAFF_API_URL", "\"https://script.google.com/macros/s/AKfycbyH69n9ky3ixhJrI5LaXB8WUXFNyt_2htjSoBrtyzpp-cdlfikrNYRUU1kkkzqGC5L1Vg/exec\"")
    }

    buildTypes {
        getByName("debug") {
            applicationIdSuffix = ".debug"
            versionNameSuffix = "-debug"
            isDebuggable = true
        }
    }

    buildFeatures {
        buildConfig = true
    }

    packaging {
        resources.excludes += setOf(
            "META-INF/AL2.0",
            "META-INF/LGPL2.1"
        )
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

dependencies {
    implementation(project(":core-domain"))
    implementation(project(":data-room"))
    implementation(libs.room.runtime)
    implementation(libs.work.runtime)
    implementation(libs.webkit)
}

base {
    archivesName.set("MoreFun-SMT-0.4.0-debug")
}
