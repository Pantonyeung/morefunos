package com.morefun.smt.domain.port

import com.morefun.smt.domain.model.*

interface SmtLocalStore {
    fun <T> transaction(block: SmtLocalStore.() -> T): T
    fun getIdempotentResult(key: String): OperationResult?
    fun saveIdempotentResult(key: String, result: OperationResult)
    fun allocateSequence(businessDate: String): Int
    fun insertOrder(order: OrderSnapshot)
    fun insertOrderVersion(version: OrderVersionSnapshot)
    fun insertPrintJobs(jobs: List<PrintJobSnapshot>)
    fun insertOutbox(event: OutboxSnapshot)
    fun loadOrder(orderId: String): OrderSnapshot?
    fun loadVersions(orderId: String): List<OrderVersionSnapshot>
    fun replaceOrder(order: OrderSnapshot)
    fun insertPayment(payment: PaymentBatchSnapshot)
    fun loadPayments(orderId: String): List<PaymentBatchSnapshot>
    fun insertRefund(refund: RefundBatchSnapshot)
    fun loadRefunds(orderId: String): List<RefundBatchSnapshot>
    fun listOrdersByBusinessDate(businessDate: String): List<OrderSnapshot>
    fun loadDayClose(businessDate: String): DayCloseSnapshot?
    fun insertDayClose(dayClose: DayCloseSnapshot)
    fun loadAvailability(productId: String): AvailabilitySnapshot?
    fun listAvailability(): List<AvailabilitySnapshot>
    fun upsertAvailability(snapshot: AvailabilitySnapshot)
}
