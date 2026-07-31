# Customer Documentation Migration Map

Status: ACTIVE AUDIT
Updated: 2026-07-31 HKT
Source repository: `Pantonyeung/morefun-ordering-web`
Active line reviewed: `feat/g1-customer-runtime-consumer-v1` / PR #22

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

## Document families

| Source family | Canonical destination | Action | Status | Notes |
|---|---|---|---|---|
| G1 Public Runtime consumer and offline survival records | Customer Engineering Log / Evidence | MERGE_LOG + KEEP_EVIDENCE | AUDITED | Current source line; deployment/device acceptance still pending |
| `docs/milestones/G1-F-02-customer-offline-menu-survival.md` | Engineering Log / Evidence | MERGE_LOG | PENDING_EXTRACTION | Extract unique dated results, blockers and rollback; then archive/redirect |
| Firebase Shadow Mode design / plan / implementation | Archive / Engineering Log | ARCHIVE + MERGE_LOG | AUDITED | Historical transition state where Apps Script remained live source; not current authority |
| PWA and Firebase bootstrap cleanup PR #21 | Plan / Evidence | PENDING_AUDIT | PENDING_AUDIT | Separate durable PWA rules from unfinished branch-specific work |
| WORK04–WORK05 backend staging/finalization inside Customer repo | Architecture history / Archive | MERGE_LOG + ARCHIVE | AUDITED | Backend/API architecture is no longer Customer domain authority |
| Firebase-primary platform PR #17 | Cross-system architecture history | MERGE_LOG + EXTRACT_SHARED_TECH | AUDITED | Extract reusable isolation, attribution and safety rules; do not treat as Customer-only authority |
| Old V42 / SA2 / EG / root-five-file snapshots | Legacy reference | ARCHIVE | AUDITED | UI/history reference only unless explicitly re-adopted |
| Old Apps Script / Google Sheet Customer read records | Legacy reference | ARCHIVE | AUDITED | Superseded by Public Runtime read path |
| Runtime check, contract tests, cache corruption tests | Evidence / Tooling | KEEP_EVIDENCE | AUDITED | Preserve executable evidence; summary belongs in Engineering Log |
| Old branch / PR / QA / handoff / FINAL / LOCK / READY records | Historical reference | MERGE_LOG + ARCHIVE | AUDITED | File name does not grant current authority |

## Shared Technology extraction targets

1. Public Runtime consumer validation.
2. Latest-valid / previous-valid offline snapshot retention.
3. Multi-storage recovery using IndexedDB plus localStorage.
4. Invalid replacement rejection and corrupted-latest fallback.
5. Visibility / online / interval refresh without recursive event loops.
6. PWA cache boundary: never cache privileged API writes or Firebase authority data incorrectly.
7. Evidence-level separation for source, contract, browser, device and production acceptance.

## Entry-layer conflicts resolved

- README previously depended on multiple legacy central authority filenames; it now points to Knowledge Base V2 and local canonical files.
- AGENTS previously contained domain rules directly; it is now an entry document and defers to `CURRENT_DOMAIN_AUTHORITY.md`.
- `MOREFUNOS_AUTHORITY_BOUNDARY.md` duplicates the current authority boundary and should become a redirect after final extraction.

## Safety boundary

- No Customer runtime or business logic changed during this documentation audit.
- No legacy evidence deleted.
- No active PR merged.
- Archive and redirect actions remain deferred until extraction completeness is checked.
