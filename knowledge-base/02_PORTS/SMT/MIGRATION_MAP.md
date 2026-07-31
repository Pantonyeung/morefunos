# SMT Documentation Migration Map

Status: EXTRACTION IN PROGRESS
Updated: 2026-07-31 HKT
Source repository: `Pantonyeung/morefunos-smt`
Active line reviewed: `smt-main-candidate-v1` / PR #34

## Canonical files

| File | Category | Decision |
|---|---|---|
| `README.md` | Stable repository entry | KEEP; completed |
| `AGENTS.md` | AI / engineering entry | KEEP; completed |
| `CURRENT_DOMAIN_AUTHORITY.md` | SMT authority | KEEP; only CURRENT SMT authority |
| `ENGINEERING_LOG.md` | Engineering history | KEEP; only append-only current log |

## Current authority extracted

- Register and Mobile are two UI profiles of one SMT Shared Core.
- Old `morefunos-smm` is migration/history only and must not become a second core.
- SMT and Mobile share Supply Runtime, Staff API, availability, cart, pricing, order, sync, permission, audit and recovery models.
- Firebase RTDB is Operational Authority; protected writes go through Cloudflare Worker / Order API.
- Android Host owns physical hardware execution and reports hardware-level results.
- Mobile may create Print Job / Command but must not directly control a physical printer.
- Adaptive layout is not whole-page scaling and must not create a second UI truth.
- Browser/software evidence must not be promoted to device, hardware, store or product evidence.

## Document families

| Source family | Destination | Action | Status | Notes |
|---|---|---|---|---|
| `SMT_AI_START_HERE.md` / `SMT_CONTEXT_MIN.md` | Entry / Log | REDIRECT + MERGE_LOG | AUDITED | Dated status and duplicated authority; no longer current truth |
| Development Charter / MFKG / Adaptive Standard / Ownership Registry | Shared Technology / Specification | EXTRACT_SHARED_TECH + KEEP_SPEC | PARTIAL | Entry authority removed; unique specification extraction continues |
| `ORDER_PAGE_CURRENT_LOCK.md` and design-lock family | Product specification / Evidence | KEEP_SPEC | AUDITED | Current only where explicitly re-adopted by Domain Authority |
| Decision Ledger / Implementation Status / Code Map / Knowledge Graph | Index / Evidence / Tooling | KEEP_SUPPORTING | AUDITED | Supporting references, not parallel Authority |
| Change Impact / QA / Success & Pitfalls | Engineering Log / Shared Technology / Evidence | MERGE_LOG + EXTRACT_SHARED_TECH | PARTIAL | Runtime/offline/session/hardware mechanisms extracted; remaining unique pitfalls pending |
| PR #34 Main Candidate records | Engineering Log / Evidence | MERGE_LOG + KEEP_EVIDENCE | EXTRACTED | Clean integration decision, Supply Runtime, Android/OTA status and rollback recorded |
| PR #35 remembered staff login | Engineering Log / Active work | MERGE_LOG + KEEP_ACTIVE | EXTRACTED | Authority boundary and pending acceptance recorded |
| PR #30 Runtime + Offline Endurance | Engineering Log / Shared Technology / Evidence | MERGE_LOG + EXTRACT_SHARED_TECH | EXTRACTED | Browser 81/81 retained as evidence; device/store acceptance separate |
| PR #31/#32 low-cost CI controls | Shared Technology / Log | EXTRACT_SHARED_TECH | EXTRACTED | Central low-cost development document already exists; SMT history added to Log |
| PR #33 direct-merge comparison | Historical evidence | ARCHIVE | AUDITED | Replaced by clean integration |
| PR #26/#27 D/E lines | Historical / Hardware / OTA evidence | ARCHIVE + KEEP_EVIDENCE | EXTRACTED | Reusable Android/print/OTA boundary extracted; branches remain historical evidence |
| PR #28 Adaptive System record | Historical completion record | MERGE_LOG + ARCHIVE | AUDITED | Browser completion record, not current full product acceptance |
| PR #29 packaging-only backup | Backup evidence | KEEP_EVIDENCE | AUDITED | Do not merge |
| Old A/B/C/D/E line handoffs | Historical | MERGE_LOG + ARCHIVE | AUDITED | File name does not grant authority |
| Old rebuild / 1920→1280 / V42 / SA2 / EG | Legacy reference | ARCHIVE | AUDITED | Reference only unless explicitly re-adopted |
| Android / printer / OTA tests and artifacts | Evidence / Tooling | KEEP_EVIDENCE | AUDITED | Hardware acceptance remains separate |

## Shared Technology created

1. `OFFLINE_JOURNAL_QUEUE_RECOVERY.md`
   - local-first snapshot, journal, pending queue, acknowledgement and recovery boundaries.
2. `SESSION_TOKEN_DURABLE_LOGIN_LIFECYCLE.md`
   - credential/session separation, durable shell restoration, revoke handling and queue preservation.
3. `ANDROID_HOST_PRINT_AND_OTA_BOUNDARY.md`
   - web/native ownership, Print Job versus physical result and APK OTA safety.
4. Existing `LOW_COST_TARGETED_DEVELOPMENT.md`
   - targeted development verification and manual final CI gates.
5. Existing Adaptive System shared technology record.

## Entry-layer conflicts resolved

- README no longer points to multiple legacy central files or mutable status documents.
- AGENTS no longer defines multiple same-level primary authorities.
- `CURRENT_DOMAIN_AUTHORITY.md` is the only current SMT authority.
- Existing detailed standards remain specifications/supporting references, not parallel truth sources.

## Remaining SMT documentation work

- Extract unique Component Ownership and MFKG rules that are genuinely cross-port.
- Extract remaining non-duplicated QA pitfalls.
- Convert obsolete Start Here / Context / handoff files to redirect/archive only after completeness check.
- Preserve executable tests, artifacts and raw verification as immutable evidence.

## Safety boundary

- No SMT runtime, cart, pricing, order, supply, print or Android behavior changed.
- No legacy documents deleted.
- No PR merged or deployed.
- Archive and redirect actions remain deferred until unique content extraction is complete.
