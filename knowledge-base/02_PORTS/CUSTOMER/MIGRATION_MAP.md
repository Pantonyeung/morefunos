# Customer Documentation Migration Map

Status: SECOND-PASS AUDITED
Updated: 2026-07-31 HKT
Source repository: `Pantonyeung/morefun-ordering-web`
Active line reviewed: `feat/g1-customer-runtime-consumer-v1` / PR #22
Secondary line reviewed: `agent/customer-pwa-firebase-cleanup-v1` / PR #21

## Canonical files

| File | Category | Decision |
|---|---|---|
| `README.md` | Entry / repository context | KEEP; stable summary only |
| `AGENTS.md` | AI / engineering entry | KEEP; navigation and execution discipline only |
| `CURRENT_DOMAIN_AUTHORITY.md` | Customer authority | KEEP; only CURRENT Customer authority |
| `ENGINEERING_LOG.md` | Engineering history | KEEP; only append-only progress, pitfall and evidence log |
| `MOREFUNOS_AUTHORITY_BOUNDARY.md` | Legacy boundary bridge | REDIRECT after unique content is confirmed migrated |

## Current authority extracted

- Customer is a customer-experience consumer, not Product, Pricing, Availability, Order, Auth, Sync or Print authority.
- Current read path is same-origin `GET /v1/runtime/customer`, backed by Cloudflare Worker and Firebase Public Runtime.
- Apps Script Customer reads are obsolete and must not return as fallback without explicit re-adoption.
- Category, price, sort, visibility and availability must come from the Public Runtime contract, not product-name guessing or DOM inference.
- `soldout` and `paused` remain distinct and both prevent ordering.
- Latest-valid and previous-valid snapshots support offline survival.
- Invalid, partial or corrupted Runtime must not overwrite valid cached data.
- Customer submits through formal Order API; backend retains repricing, idempotency and order-number authority.
- Add, cart mutation and reorder flows must re-check current supply state before accepting unavailable items.

## Document families

| Source family | Canonical destination | Action | Status | Notes |
|---|---|---|---|---|
| G1 Public Runtime consumer and offline survival records | Customer Engineering Log / Evidence | MERGE_LOG + KEEP_EVIDENCE | EXTRACTED | Current conclusions merged into Customer Log; deployment/device acceptance still pending |
| G1-E／G1-F milestone family in PR #22 | Engineering Log / Evidence / Archive | MERGE_LOG + ARCHIVE | EXTRACTED | Multiple milestone files no longer act as separate authorities |
| G1 plans/specs under `docs/superpowers/` | Archive / Evidence | ARCHIVE | AUDITED | Completed implementation plans/specs; preserve traceability, not current rules |
| G1 deploy note | Evidence | KEEP_EVIDENCE | AUDITED | Deployment-attempt evidence only; does not prove device or production acceptance |
| G2 offline WhatsApp/payment-proof decision files | Proposal / Pending Authority Review | KEEP_PROPOSAL | AUDITED | Located inside active PR but not automatically adopted Customer authority |
| Firebase Shadow Mode design / plan / implementation | Archive / Engineering Log | ARCHIVE + MERGE_LOG | EXTRACTED | Superseded transition state where Apps Script remained live source |
| PWA and Firebase bootstrap cleanup PR #21 | Historical branch / Shared Technology / Evidence | EXTRACT_SHARED_TECH + ARCHIVE | AUDITED | Durable PWA/cache/adaptive rules extracted; branch implementation remains unreconciled |
| WORK04–WORK05 backend staging/finalization inside Customer repo | Architecture history / Archive | MERGE_LOG + ARCHIVE | EXTRACTED | Backend/API architecture is not Customer domain authority |
| Firebase-primary platform PR #17 | Cross-system architecture history | MERGE_LOG + EXTRACT_SHARED_TECH | EXTRACTED | Reusable isolation, attribution and safety rules belong centrally |
| Old V42 / SA2 / EG / root-five-file snapshots | Legacy reference | ARCHIVE | AUDITED | UI/history reference only unless explicitly re-adopted |
| Old Apps Script / Google Sheet Customer read records | Legacy reference | ARCHIVE | AUDITED | Superseded by Public Runtime read path |
| Runtime check, contract tests, cache corruption tests | Evidence / Tooling | KEEP_EVIDENCE | AUDITED | Preserve executable evidence; summary belongs in Engineering Log |
| Old branch / PR / QA / handoff / FINAL / LOCK / READY records | Historical reference | MERGE_LOG + ARCHIVE | AUDITED | File name does not grant current authority |

## PR #22 file-family decision

### Keep as executable evidence
- `tests/customer-public-runtime-client.test.mjs`
- `tests/customer-runtime-adapter.test.mjs`
- `tests/customer-menu-presentation.test.mjs`
- `tests/customer-offline-runtime-store.test.mjs`
- `tests/customer-availability-status-normalization.test.mjs`
- live-supply add/reorder guard tests
- same-origin Runtime and SPA tests
- Apps Script retirement tests

### Retain then archive or redirect after final extraction
- `docs/milestones/G1-E-*`
- `docs/milestones/G1-F-*`
- G1 plan and specification files
- G1 deployment note

### Pending independent Authority review
- `G2-OFFLINE_WHATSAPP_PAYMENT_PROOF_INTAKE_20260731.md`
- `G2_PAYMENT_PROOF_OFFLINE_ORDER_DECISIONS_20260731.md`

These G2 files must not silently become implemented business policy through branch inclusion.

## PR #21 durable extraction

Reusable rules:
1. PWA metadata/installability must not alter business semantics.
2. Service Worker must not cache privileged writes, Firebase authority responses or unsafe non-GET traffic.
3. Viewport adaptation must not create a second Customer business-logic path.
4. Scroll effects and visual ending treatments remain presentation features, subordinate to usability and current Authority.

Branch-specific adapters and viewport fixes remain historical until reconciled with PR #22.

## Shared Technology extraction targets

1. Public Runtime consumer validation.
2. Latest-valid / previous-valid offline snapshot retention.
3. Multi-storage recovery using IndexedDB plus localStorage.
4. Invalid replacement rejection and corrupted-latest fallback.
5. Visibility / online / interval refresh without recursive event loops.
6. PWA cache boundary for API, Firebase and non-GET requests.
7. Live-supply mutation/reorder gate.
8. Evidence-level separation for source, contract, browser, device and production acceptance.
9. Cross-port repository and deployment isolation.

## Entry-layer conflicts resolved

- README previously depended on multiple legacy central authority filenames; it now points to Knowledge Base V2 and local canonical files.
- AGENTS previously contained domain rules directly; it is now an entry document and defers to `CURRENT_DOMAIN_AUTHORITY.md`.
- `MOREFUNOS_AUTHORITY_BOUNDARY.md` duplicates the current authority boundary and should become a redirect after final extraction.
- Milestone and plan files are explicitly prevented from becoming parallel current authorities.

## Safety boundary

- No Customer runtime or business logic changed during this documentation audit.
- No legacy evidence deleted.
- No active PR merged.
- G2 proposal content was not adopted.
- Archive and redirect actions remain deferred until extraction completeness is checked.
