# MoreFunOS｜Document Taxonomy and Consolidation Standard

> Status: CURRENT / GOVERNANCE STANDARD
> Updated: 2026-07-31 HKT
> Authority: `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`

## Purpose
Define the only permitted document classes across MoreFunOS so files are organized by actual use rather than inconsistent names.

## Permitted document classes

### 1. Entry
Examples: `AGENTS.md`, `README.md`, context-min files.
Purpose: tell an AI or engineer what to read and where to start.
Rule: no duplicated architecture, progress or technical truth. Redirect only.

### 2. Authority
Examples: Global Master Authority, port/domain Authority.
Purpose: current scope, locked decisions, source of truth, boundaries and next gate.
Rule: exactly one current Authority for each level or port.

### 3. Engineering Log
Purpose: append-only progress, pitfalls, successful methods, failures, evidence boundaries, rollback points and next actions.
Rule: one log for each port and one integrated MoreFunOS log.

### 4. Shared Technology
Examples: adaptive system, offline runtime, authentication/session, synchronization, printing, deployment and CI methods.
Purpose: stable reusable technical knowledge used by more than one port.
Rule: one current file per technical subject. Port-specific incidents stay in the port log.

### 5. Contract / Decision / Lock
Purpose: stable product or interface contract that must remain independently referenceable.
Rule: keep only when it defines a durable boundary consumed by code or multiple ports. Otherwise merge into Authority.

### 6. Evidence / Artifact
Examples: raw test output, browser matrix, screenshots, device reports, release manifests.
Purpose: immutable proof.
Rule: never becomes Authority. Store under evidence/artifacts and reference it from Engineering Log.

### 7. Plan / Specification
Purpose: temporary implementation design before execution.
Rule: after implementation, retain as reference or archive; current decisions must be promoted into Authority, Shared Technology or Contract.

### 8. Archive / Reference
Purpose: historical designs, superseded systems, old handoffs and migration sources.
Rule: cannot generate current implementation instructions without reconciliation and re-adoption.

## Names that are not standalone document classes
The following names describe log entries, not separate files:

- Milestone
- Progress
- Checkpoint
- Handoff
- Pitfall
- Success
- Failure
- Completion Log
- Current State
- Latest
- Final
- Verification Summary

These must be sections appended to the relevant `ENGINEERING_LOG.md` unless they are immutable raw evidence.

## Classification workflow
For every existing file:

1. Identify its actual purpose, not only its filename.
2. Assign one permitted class.
3. If it duplicates Authority or Log content, merge the unique information into the correct current file.
4. Replace the old file with a short Redirect or move it to Archive/Reference.
5. Preserve raw evidence and traceable commits.
6. Never delete a unique locked decision, root cause, rollback point or evidence boundary during compaction.

## Reading order

1. Port Authority.
2. Port Engineering Log.
3. MoreFunOS Master Authority and Integrated Engineering Log when the local source has no answer or multiple ports are involved.
4. Relevant Shared Technology document for reusable mechanisms.
5. Evidence, Contract, Plan or Archive only when referenced by the above current files.
