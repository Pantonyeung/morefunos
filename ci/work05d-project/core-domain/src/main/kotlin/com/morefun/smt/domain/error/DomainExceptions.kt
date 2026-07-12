package com.morefun.smt.domain.error

class OrderNotFoundException(orderId: String) : IllegalArgumentException("order not found: $orderId")
class StaleOrderVersionException(orderId: String, expected: Int, actual: Int) :
    IllegalStateException("stale order version for $orderId: expected=$expected actual=$actual")
class OverRefundException(requested: Long, refundable: Long) :
    IllegalArgumentException("refund exceeds settled amount: requested=$requested refundable=$refundable")
class DayCloseAlreadyExistsException(businessDate: String) :
    IllegalStateException("day close already exists for $businessDate")
class InvalidProductionTransitionException(from: String, to: String) :
    IllegalStateException("invalid production transition: $from -> $to")
class StaleAvailabilityVersionException(productId: String, expected: Long, actual: Long) :
    IllegalStateException("stale availability version for $productId: expected=$expected actual=$actual")
