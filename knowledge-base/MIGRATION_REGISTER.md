# MoreFunOS Knowledge Migration Register

Status: ACTIVE
Updated: 2026-07-31

## Purpose

逐份登記舊文件的分類、抽取結果及最終歸宿，防止遺漏或重複。

## Completed port status

| Scope | Canonical files | Entry migration | Authority / Log | Shared Technology | Port audit |
|---|---|---|---|---|---|
| MoreFunOS | Master Authority / Current Status / Engineering Log | ACTIVE | ACTIVE | ACTIVE | IN PROGRESS |
| Admin | README / AGENTS / CURRENT_DOMAIN_AUTHORITY / ENGINEERING_LOG | MIGRATED | AUDITED | EXTRACTED | COMPLETE |
| Customer | README / AGENTS / CURRENT_DOMAIN_AUTHORITY / ENGINEERING_LOG | MIGRATED | AUDITED | EXTRACTED | COMPLETE |
| SMT | README / AGENTS / CURRENT_DOMAIN_AUTHORITY / ENGINEERING_LOG | MIGRATED | AUDITED | EXTRACTED | COMPLETE PORT AUDIT |
| SMM | README / AGENTS / CURRENT_DOMAIN_AUTHORITY / ENGINEERING_LOG | MIGRATED | AUDITED | EXTRACTED | COMPLETE |

## SMM completion record

| Source file / family | Canonical category | Action | Status | Notes |
|---|---|---|---|---|
| `README.md` | Migration-source entry | KEEP | MIGRATED | Reduced to stable entry; no duplicate current authority |
| `AGENTS.md` | AI / engineering entry | KEEP | MIGRATED | Directs all implementation to SMT shared core |
| `CURRENT_DOMAIN_AUTHORITY.md` | Repository authority | KEEP | AUDITED | Only current SMM repository authority |
| `ENGINEERING_LOG.md` | Migration log | KEEP | AUDITED | Only append-only historical and migration record |
| Independent SMM Application / Runtime | Historical | ARCHIVE | SUPERSEDED | Must not be revived as second core |
| Historical mobile UI / PWA / tests | Specification / Evidence | KEEP_EVIDENCE | AUDITED | Re-adopt only through current SMT authority |
| Mobile Profile shared-core rules | Shared Technology | EXTRACT_SHARED_TECH | EXTRACTED | `SHARED_CORE_MOBILE_PROFILE.md` |
| Direct mobile printer execution | Prohibited architecture | REJECT | SUPERSEDED | Android Host owns physical execution |
| Standalone SMM production deployment | Prohibited architecture | REJECT | SUPERSEDED | Formal implementation remains in `morefunos-smt` |

## Shared Technology inventory

- `ADAPTIVE_SYSTEM.md`
- `PROTECTED_RUNTIME_AUTH_AND_RECOVERY.md`
- `PUBLIC_RUNTIME_OFFLINE_RECOVERY.md`
- `OFFLINE_JOURNAL_QUEUE_RECOVERY.md`
- `SESSION_TOKEN_DURABLE_LOGIN_LIFECYCLE.md`
- `ANDROID_HOST_PRINT_AND_OTA_BOUNDARY.md`
- `LOW_COST_TARGETED_DEVELOPMENT.md`
- `SHARED_CORE_MOBILE_PROFILE.md`

## Remaining governance stages

1. Shared Technology consolidation and duplicate merging.
2. Cross-port duplicate and conflict audit.
3. Legacy archive and redirect cleanup.
4. Final Knowledge Base V2 index and closure verification.

## Placement rule

- Master Authority: permanent ownership, source-of-truth, prohibitions, gates and evidence meanings.
- Current Status: mutable branch, PR, blocker and next-action state.
- Engineering Log: dated history, root causes, verification boundaries and rollback points.
- Shared Technology: cross-port reusable mechanisms.
- Evidence: immutable test, deployment, browser, device, hardware and store proof.

## Safety rule

- Do not delete unreviewed historical evidence.
- Do not promote historical material to current authority by filename.
- Do not revive SMM as an independent core.
- Do not report source or browser evidence as device, hardware, store or product acceptance.
