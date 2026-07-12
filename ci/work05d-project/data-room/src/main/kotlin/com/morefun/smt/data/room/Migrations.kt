package com.morefun.smt.data.room

import androidx.room.migration.Migration
import androidx.sqlite.db.SupportSQLiteDatabase

object MoreFunMigrations {
    val MIGRATION_1_2 = object : Migration(1, 2) {
        override fun migrate(database: SupportSQLiteDatabase) {
            database.execSQL("ALTER TABLE orders ADD COLUMN tableRef TEXT")
            database.execSQL("ALTER TABLE orders ADD COLUMN guestCount INTEGER")
        }
    }
}
