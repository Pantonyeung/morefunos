package com.morefun.smt.runtime

import com.morefun.smt.domain.model.IdGenerator
import java.util.UUID

class UuidIdGenerator : IdGenerator {
    override fun next(prefix: String): String = "$prefix-${UUID.randomUUID()}"
}
