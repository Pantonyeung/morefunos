package com.morefun.smt.domain.model

@JvmInline
value class Money(val minor: Long) {
    init { require(minor >= 0) { "money cannot be negative" } }

    operator fun plus(other: Money): Money = Money(Math.addExact(minor, other.minor))
    operator fun times(quantity: Int): Money {
        require(quantity > 0) { "quantity must be positive" }
        return Money(Math.multiplyExact(minor, quantity.toLong()))
    }

    fun subtract(other: Money): Money {
        require(minor >= other.minor) { "money result cannot be negative" }
        return Money(minor - other.minor)
    }

    companion object { val ZERO = Money(0) }
}


@JvmInline
value class PriceDelta(val minor: Long)
