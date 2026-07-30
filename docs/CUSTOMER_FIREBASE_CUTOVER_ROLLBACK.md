# Customer Firebase Direct Cutover｜Rollback

Updated: 2026-07-30 HKT

## Immutable pre-cutover reference

- Repository: `Pantonyeung/morefunos`
- Backup branch: `backup/customer-pre-firebase-cutover-20260730`
- Source branch at backup time: `main`
- Purpose: complete Customer code／configuration restore point before Firebase Direct Cutover.

## Rollback triggers

Rollback immediately when any of the following occurs:

- Customer cannot load valid Published data.
- Customer reads or exposes `/admin/draft`.
- Product／Category／Option／Combo／Pricing materially differs from the approved Admin Published snapshot.
- Runtime values are malformed or applied to the wrong UI responsibility.
- Firebase failure causes blank screen, false success, or demo data presented as synchronized production data.
- Published version receipt is missing or mismatched.

## Git rollback procedure

1. Stop deployment of `customer-firebase-direct-cutover-v1`.
2. Redeploy `backup/customer-pre-firebase-cutover-20260730` or reset the deployment branch to that ref.
3. Confirm legacy Customer boot and menu load.
4. Keep Firebase snapshots unchanged for forensic comparison; do not overwrite either side during rollback.
5. Record the failed gate in `docs/CUSTOMER_FIREBASE_CUTOVER_PROGRESS_LOG.md`.

## Data rollback boundary

Customer is read-only. A Customer code rollback must not alter Admin Draft／Published／Runtime. Any Firebase data rollback requires a separate Admin Release／Rollback action and explicit evidence.

## Locked safety state

- `order_api_enabled=false`
- no Customer authority writes
- no service account／private key in frontend
