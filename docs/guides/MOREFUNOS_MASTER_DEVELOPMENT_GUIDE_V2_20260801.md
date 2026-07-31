# MoreFunOS Master Development Guide V2.0

> Date: 2026-08-01 HKT  
> Status: CURRENT EXECUTION GUIDE  
> Full DOCX mirror: Google Drive file `1u020WfuMBHjLdU3MwxAP4_uuzPPsISwS`

## 1. Execution strategy

MoreFunOS must no longer progress by completing Admin, SMT, SMM, and Customer separately. Development must follow vertical operational slices:

1. P0 Supply / Availability
2. P1 Order Commit
3. P2 Print Closure
4. P3 Recovery / Store Acceptance

## 2. P0 single priority

Use F4 as the golden product and complete this path first:

```text
Admin / SMT / SMM mutation
→ Cloudflare Worker auth + scope + expectedRevision + idempotency
→ Firebase Operational Availability
→ SMT Register / Mobile Canonical Store
→ Customer Product / Cart / Checkout / Submit Domain Gate
```

P0 is complete only when Admin, SMT, or SMM can sell out and restore F4 with consistent state across all four surfaces, including offline queue, token revoke, reload, revision conflict, and duplicate retry tests.

## 3. Permanent authority boundaries

- Admin is the only Catalog, Published, Runtime Policy, Staff, Audit, and Rollback authority.
- Cloudflare Worker is the only protected mutation, repricing, revision, idempotency, and audit entry.
- Firebase RTDB is the realtime Runtime, Order, Presence, and Print Job authority.
- SMT Register and SMT Mobile share one Core. The independent SMM Core is superseded.
- Customer consumes only the Public Projection and validates availability inside Product, Cart, Checkout, Reorder, and Submit domains.
- Android Host owns hardware, background printing, diagnostics, and printer results.
- Google Sheet V2 is a ledger/report/audit mirror, never realtime truth.

## 4. Prohibited implementation patterns

- Bridge or second state authority
- DOM scan, capture-click guard, polling, or `location.reload()` repair
- Client direct writes to protected RTDB
- Independent SMM business logic
- Legacy Apps Script / WORK03 / V42EG as current implementation authority
- Treating source code existence as deployment or device acceptance

## 5. Milestones

| Milestone | Goal | Exit gate |
|---|---|---|
| M1 Supply Core | Four-surface sold-out / restore | Browser + iPhone + Android Device PASS |
| M2 SMM Mobile | Full Mobile Profile on Shared Core | Login, availability, queue, remote print command PASS |
| M3 Order Commit | One order path | Server repricing, idempotency, incoming queue PASS |
| M4 Print | Android Host print closure | printed / failed / retry / fallback Device PASS |
| M5 Store Acceptance | Real peak operation | Store SOP, rollback, production acceptance |

## 6. Evidence rule

```text
CODE EXISTS
→ CONTRACT PASS
→ BROWSER PASS
→ DEVICE PASS
→ STORE PASS
→ PRODUCTION ACCEPTED
```

No Device or Store evidence means the closed loop is not complete.

## 7. Current baseline at document creation

- Admin Staff numeric account management source fix: `9679715f9d57397e7b5e57017ae530819134c9fc`
- SMT full Catalog Authority source fix: `e5865c9fa8f2163d7b17b17d8990bf798d4791d8`
- Active execution branches: `admin-preview`, `smt-preview`, `customer-preview`
- Current unresolved gates: Customer availability propagation, SMT supply lifecycle, complete `/smm` mobile entry, then deployment and device acceptance.

Fresh-read the central Master Authority, integrated Engineering Log, repo AI entry, and current branch head before every implementation batch.