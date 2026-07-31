# SMT Documentation Migration Map

Status: ACTIVE AUDIT
Updated: 2026-07-31 HKT
Source repository: `Pantonyeung/morefunos-smt`
Active line reviewed: `smt-main-candidate-v1` / PR #34

## Canonical files

| File | Category | Decision |
|---|---|---|
| `README.md` | Stable repository entry | KEEP |
| `AGENTS.md` | AI / engineering entry | KEEP |
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
| `SMT_AI_START_HERE.md` / `SMT_CONTEXT_MIN.md` | Entry / Log | REDIRECT + MERGE_LOG | AUDITED | Contains dated branch/status and duplicated authority; must not remain current truth |
| Development Charter / MFKG / Adaptive Standard / Ownership Registry | Shared Technology / Specification | EXTRACT_SHARED_TECH + KEEP_SPEC | PENDING_EXTRACTION | Preserve reusable engineering rules; Domain Authority remains canonical |
| `ORDER_PAGE_CURRENT_LOCK.md` and design-lock family | Product specification / Evidence | KEEP_SPEC | AUDITED | Current only where explicitly re-adopted by Domain Authority |
| Decision Ledger / Implementation Status / Code Map / Knowledge Graph | Index / Evidence / Tooling | KEEP_SUPPORTING | AUDITED | Do not treat as parallel Authority |
| Change Impact / QA / Success & Pitfalls | Engineering Log / Shared Technology / Evidence | MERGE_LOG + EXTRACT_SHARED_TECH | PENDING_EXTRACTION | Root causes and reusable mechanisms should be centralized |
| PR #34 Main Candidate records | Engineering Log / Evidence | MERGE_LOG + KEEP_EVIDENCE | AUDITED | Current integration line; deployment/device acceptance pending |
| PR #35 remembered staff login | Proposal / Active work | KEEP_ACTIVE | AUDITED | Source contracts exist; full/device/token revoke acceptance pending |
| PR #30 Runtime + Offline Endurance | Engineering Log / Shared Technology / Evidence | MERGE_LOG + EXTRACT_SHARED_TECH | AUDITED | Browser 81/81 evidence retained; real-device/store not complete |
| PR #31/#32 low-cost CI controls | Shared Technology / Log | EXTRACT_SHARED_TECH | AUDITED | Manual final gates and `[skip ci]` development discipline |
| PR #33 direct-merge comparison | Historical evidence | ARCHIVE | AUDITED | Replaced by clean integration |
| PR #26/#27 D/E lines | Historical / Hardware / OTA evidence | ARCHIVE + KEEP_EVIDENCE | AUDITED | Superseded by Main Candidate clean integration |
| PR #28 Adaptive System record | Historical completion record | MERGE_LOG + ARCHIVE | AUDITED | Browser completion record, not current full product acceptance |
| PR #29 packaging-only backup | Backup evidence | KEEP_EVIDENCE | AUDITED | Do not merge |
| Old A/B/C/D/E line handoffs | Historical | MERGE_LOG + ARCHIVE | AUDITED | File name does not grant authority |
| Old rebuild / 1920→1280 / V42 / SA2 / EG | Legacy reference | ARCHIVE | AUDITED | Reference only unless explicitly re-adopted |
| Android / printer / OTA tests and artifacts | Evidence / Tooling | KEEP_EVIDENCE | AUDITED | Hardware acceptance remains separate |

## Shared Technology extraction targets

1. Shared multi-profile application architecture.
2. Offline local-first queue, journal and last-known-good recovery.
3. Session token lifecycle, revoke handling and durable login boundary.
4. Android Host / Web Runtime hardware execution separation.
5. Print Job versus physical print result semantics.
6. APK OTA anti-replay, anti-downgrade and rollback health gates.
7. Low-cost targeted verification and manual final CI gates.
8. Evidence-level separation across source, contract, browser, device, hardware and store.

## Entry-layer conflicts resolved

- README no longer points to multiple legacy central files or mutable status documents.
- AGENTS no longer defines multiple same-level primary authorities.
- `CURRENT_DOMAIN_AUTHORITY.md` is now the only current SMT authority.
- Existing detailed standards remain specifications/supporting references, not parallel truth sources.

## Safety boundary

- No SMT runtime, cart, pricing, order, supply, print or Android behavior changed.
- No legacy documents deleted.
- No PR merged or deployed.
- Archive and redirect actions remain deferred until unique content extraction is complete.
