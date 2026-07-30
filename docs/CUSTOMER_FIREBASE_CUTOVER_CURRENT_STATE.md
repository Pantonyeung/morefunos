# Customer Firebase Cutover｜Current State

Updated: 2026-07-30 HKT

## Branches

- Backup: `backup/customer-pre-firebase-cutover-20260730`
- Implementation: `customer-firebase-direct-cutover-v1`
- Base: `main`

## Authority

- Admin = Control Plane
- Firebase RTDB = Operational source of truth
- Customer reads `/admin/published` and authorized `/runtime`
- Customer must never read `/admin/draft`
- Google Sheet V2／Apps Script = ledger／reporting mirror or explicit legacy fallback
- `order_api_enabled=false`

## Completed

- Pre-cutover GitHub backup branch created.
- Isolated implementation branch created.
- Approved design committed.
- Detailed implementation plan committed.
- Customer repository authority rules updated.

## Current Gate

`FIREBASE PUBLIC WEB CONFIG + EXACT APPROVED RTDB ROOT + PUBLISHED SNAPSHOT EVIDENCE REQUIRED`

Direct Cutover must not continue by guessing project identifiers, paths, or snapshot content.

## Evidence Status

`BACKUP CREATED / DESIGN LOCKED / PLAN LOCKED / AUTHORITY UPDATED / FIREBASE ENDPOINT EVIDENCE PENDING / CUSTOMER NOT CUT OVER`
