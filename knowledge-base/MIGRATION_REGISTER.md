# MoreFunOS Knowledge Migration Register

Status: GOVERNANCE BASELINE COMPLETE
Updated: 2026-07-31 HKT

## Purpose

逐份登記舊文件的分類、抽取結果及最終歸宿，防止遺漏、重複或舊文件重新搶佔 Authority。

## Status values

- `AUDITED`
- `EXTRACTED`
- `MIGRATED`
- `REDIRECT_READY`
- `ARCHIVE_READY`
- `KEEP_EVIDENCE`
- `REQUIRES_INDIVIDUAL_REVIEW`

## Canonical completed structure

- Global Master Authority
- Knowledge Base Current Status
- One Current Domain Authority per active domain
- One Engineering Log per domain
- One Shared Technology current truth per reusable mechanism
- Evidence and Archive outside the normal read order

## Port migration result

| Scope | Canonical authority | Entry state | Log state | Migration result |
|---|---|---|---|---|
| MoreFunOS | Master Knowledge Authority | `knowledge-base/00_INDEX.md` | Integrated `ENGINEERING_LOG.md` | MIGRATED |
| Admin | `CURRENT_DOMAIN_AUTHORITY.md` | README / AGENTS consolidated | `ENGINEERING_LOG.md` | MIGRATED |
| Customer | `CURRENT_DOMAIN_AUTHORITY.md` | README / AGENTS consolidated | `ENGINEERING_LOG.md` | MIGRATED |
| SMT | `CURRENT_DOMAIN_AUTHORITY.md` | README / AGENTS consolidated | `ENGINEERING_LOG.md` | MIGRATED |
| SMM | Retirement / migration authority only | README / AGENTS consolidated | migration `ENGINEERING_LOG.md` | MIGRATED; independent core superseded |

## Shared Technology extraction result

| Mechanism | Canonical file | Status |
|---|---|---|
| Adaptive application | `03_SHARED_TECH/ADAPTIVE_SYSTEM.md` | EXTRACTED |
| Protected runtime config / auth / recovery | `03_SHARED_TECH/PROTECTED_RUNTIME_AUTH_AND_RECOVERY.md` | EXTRACTED |
| Public runtime offline recovery | `03_SHARED_TECH/PUBLIC_RUNTIME_OFFLINE_RECOVERY.md` | EXTRACTED |
| Offline journal / queue recovery | `03_SHARED_TECH/OFFLINE_JOURNAL_QUEUE_RECOVERY.md` | EXTRACTED |
| Session token / durable login | `03_SHARED_TECH/SESSION_TOKEN_DURABLE_LOGIN_LIFECYCLE.md` | EXTRACTED |
| Android Host / Print / OTA | `03_SHARED_TECH/ANDROID_HOST_PRINT_AND_OTA_BOUNDARY.md` | EXTRACTED |
| Shared Core Mobile Profile | `03_SHARED_TECH/SHARED_CORE_MOBILE_PROFILE.md` | EXTRACTED |
| Low-cost targeted development | `03_SHARED_TECH/LOW_COST_TARGETED_DEVELOPMENT.md` | EXTRACTED |
| Shared Technology navigation | `03_SHARED_TECH/README.md` | MIGRATED |

## Conflict audit result

Canonical audit: `CROSS_PORT_CONFLICT_AUDIT.md`

Resolved:

- SMM independent core versus SMT Mobile Profile.
- Multiple Current / Master / Final files.
- Port-specific offline models being copied across surfaces.
- Authentication, connected-state and mutation-authorization ambiguity.
- Print Job versus actual hardware printing.
- Adaptive layout versus whole-page scale / second UI truth.
- Evidence-level inflation.
- Mutable branch / PR state inside stable Authority.

Status: `AUDITED / NO UNRESOLVED SAME-LEVEL AUTHORITY CONFLICT`.

## Redirect-ready families

| Scope | Family | Destination | Status |
|---|---|---|---|
| MoreFunOS | Must Read / legacy Current Registry entry files | `00_INDEX.md` / `CURRENT_STATUS.md` | REDIRECT_READY |
| Admin | old current-state / completion / handoff entry files | Admin Authority / Log | REDIRECT_READY after individual review |
| Customer | old authority-boundary and mutable entry files | Customer README / Authority / Log | REDIRECT_READY after individual review |
| SMT | Start Here / Context Min / old handoff entry files | SMT README / Authority / Log | REDIRECT_READY after individual review |
| SMM | any independent-core entry file | SMM retirement Authority; implementation points to SMT | REDIRECT_READY |

## Archive-ready families

- Completed plans, work packages and checklists.
- Milestone, completion, final, latest and handoff files after unique conclusions enter the Log.
- Old A/B/C/D/E line records.
- Superseded direct-merge and branch-integration records.
- V42 / SA2 / EG / Rebuild / 1920→1280 historical snapshots.
- Firebase Shadow Mode and Apps Script-primary histories.
- Independent SMM-core history.

Status: `ARCHIVE_READY`, but individual fresh-read remains mandatory.

## Evidence preserved

Do not delete or rewrite:

- Raw test outputs and verification scripts.
- Browser, device, hardware and store acceptance evidence.
- Release signatures, hashes, artifacts and rollback records.
- Detailed specifications still referenced by Current Authority.
- Any file with unreviewed unique content.

## Cleanup control

Canonical cleanup policy: `ARCHIVE_REDIRECT_MANIFEST.md`.

No blind bulk deletion is authorized. Physical redirect/archive conversion occurs incrementally when a legacy file is encountered and its unique content is verified as migrated.

## Runtime boundary

This register records documentation governance only. It does not claim runtime merge, deployment, device, printer, store or product acceptance.
