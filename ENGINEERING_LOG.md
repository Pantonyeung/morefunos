# MoreFunOS｜Integrated Engineering Log

> Status: APPEND-ONLY INTEGRATED LOG
> Authority: `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`
> Updated: 2026-07-31 HKT

## Purpose
This is the single integrated MoreFunOS log for cross-port progress, shared pitfalls, successful closure methods, architecture reconciliation, evidence boundaries and system-wide next actions.

Port-specific work is first recorded in that port's own `ENGINEERING_LOG.md`. Cross-port conclusions and closure evidence are summarized here. When a port cannot find a solution locally, read this file next. Reusable mechanisms belong in `shared-tech/`.

## Append-only rule
Append daily work at the end. Do not create separate integrated milestone, handoff, pitfall, success, progress or final-summary files. Periodic compaction may remove duplication and obsolete entries while preserving decisions, root causes, successful methods, evidence levels, rollback points, unresolved risks and commits.

---

## 2026-07-31｜Knowledge architecture consolidation

### Decision
1. Port layer: SMT, SMM, Admin and Customer each keep one Authority and one Engineering Log.
2. Integrated layer: MoreFunOS Master Authority plus this Integrated Engineering Log.
3. Shared technology layer: reusable technical standards under `shared-tech/`.

### Successful method
Resolve port issues locally first. Escalate here when no local answer exists, multiple ports are affected, or an end-to-end decision is required. Store reusable mechanisms in Shared Technology documents.

### Current status
- Global Master Authority established.
- Admin, Customer and SMT Authority plus Log established.
- SMM Port Authority plus Log established.
- Shared Technology Index established.
- Shared Adaptive System standard established.

---

## 2026-07-31｜Document type audit baseline

### Naming families found
Active Admin, Customer and SMT work currently contains at least 17 naming families:

1. AGENTS / Entry
2. README / Context
3. Authority
4. Authority Boundary
5. Master Control
6. Lock / Standard
7. Handoff
8. Milestone
9. Progress
10. Checkpoint
11. Implementation / Completion / Integration Log
12. Pitfalls / Blocker / Failure Protocol
13. Checklist
14. Plan
15. Specification / Design
16. QA / Verification / Acceptance
17. Deploy / Current State / Final / Latest

### Root cause
A new file was historically created for each checkpoint, handoff, success, failure and milestone. Several overlapping files then competed for authority.

### New permitted classes
All files must map to one of eight classes:

1. Entry
2. Authority
3. Engineering Log
4. Shared Technology
5. Contract / Decision / Lock
6. Evidence / Artifact
7. Plan / Specification
8. Archive / Reference

Milestone, Progress, Checkpoint, Handoff, Pitfall, Success, Failure, Completion Log, Current State, Latest, Final and Verification Summary are sections in the relevant Engineering Log unless they are immutable raw evidence.

### Governance and shared-tech records
- `governance/DOCUMENT_TAXONOMY.md` — commit `3ff4532cf3f54f84b8edf95abd42f6812a3af52d`
- `shared-tech/ADAPTIVE_SYSTEM.md` — commit `922590778b80955f8ca1b7906014006ec7608bbb`

### Next action
Classify each existing file by actual purpose. Merge unique current knowledge into Authority, Log or Shared Technology; keep raw proof as Evidence; convert duplicates to Redirect or Archive. Preserve unique decisions, root causes, rollback points and evidence boundaries.

---

## 2026-08-01｜Owner Directive：Fastest Safe Complete Closure

### Locked execution directive
- Objective is the fastest, safest and most complete real store closure, not maximum repository feature count.
- Every task starts with skeptical verification: repository source, tests, PR and documentation may look complete while deployment, cache, device, hardware or store operation is still broken.
- Required evidence ladder: `SOURCE_EXISTS → CONTRACT_PASS → FULL_REGRESSION_PASS → DEPLOYED → BROWSER_PASS → DEVICE_PASS → HARDWARE_PASS → STORE_PASS → PRODUCTION_ACCEPTED`.
- No evidence level may be skipped or inferred.
- Current sole priority remains F4 P0 Supply／Availability vertical slice. P1 Order, P2 Print and P3 Recovery may only expand after the previous gate passes.

### Failure protocol
1. Stop scope expansion.
2. Capture device, URL, build ID, branch, commit SHA, service worker version, time and exact reproduction steps.
3. Verify the tested device actually loaded the intended deployment commit.
4. Verify the mutation crossed Worker and reached the canonical Domain Authority.
5. Reproduce the smallest failing path and identify the first fatal evidence.
6. Fix only the native Core owner; no bridge, polling, DOM guard, reload or parallel state.
7. Re-run targeted tests, affected regression, deployment and device acceptance.
8. After three failed fixes, stop patching, return to known-good rollback and re-audit Authority, State owner, Contract and stale deployment interference.

### Current implementation work package
`P0-DEPLOY-IDENTITY-01`：make repository／branch／commit／build time／runtime version／service worker version visible and verifiable before F4 device acceptance.

### Evidence boundary
Directive recorded. Implementation starts from active Preview branches. No closure claim until deployment and device evidence exists.
