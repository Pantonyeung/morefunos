# Offline Journal × Queue Recovery

Status: SHARED TECHNOLOGY
Updated: 2026-07-31 HKT

## Purpose
Define the reusable local-first recovery model for MoreFunOS operational surfaces.

## Core model

```text
Authoritative remote state
+ validated local snapshot
+ append-only local journal
+ pending operation queue
+ acknowledgement / reconciliation
```

A network failure must not erase valid local operational state. A successful local enqueue is not the same as successful remote acknowledgement.

## Required boundaries

- Keep a last-known-good generation.
- Reject malformed or partial replacement state before it overwrites valid local data.
- Journal critical local writes before treating them as durable.
- Replay journal entries only through idempotent operations.
- Preserve pending entries through restart, offline periods and server 5xx conditions.
- Distinguish `queued`, `sent`, `acknowledged`, `rejected` and `manual-recovery-required`.
- Never silently discard an operation because authentication expired or connectivity changed.
- Expose export, retry and manual recovery paths for unresolved entries.

## Reconnect sequence

1. Restore the latest valid local snapshot.
2. Validate journal integrity.
3. Reconstruct pending operations.
4. Re-establish authentication and remote connectivity.
5. Flush operations in deterministic order.
6. Record acknowledgement or rejection.
7. Reconcile remote state without overwriting newer valid local work blindly.

## Evidence boundary

Unit and browser recovery tests prove software behavior only. Long-duration offline, abrupt power loss, storage pressure, device restart and store operation require separate device acceptance.

## Source extraction

Derived from SMT Runtime and Offline Endurance work, including PR #30 and the Main Candidate integration line. Source documents and tests remain evidence; this file is the reusable mechanism.