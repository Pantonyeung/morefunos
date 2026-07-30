# Repository Instructions

- This repo is the official source for the MoreFun mobile ordering web app.
- Firebase Realtime Database is the operational source of truth for Customer business data.
- Admin is the Control Plane responsible for Draft／Validate／Publish and Runtime management.
- Customer may read only approved `/admin/published` data and authorized `/runtime` data.
- Google Sheet V2／Apps Script is a ledger／reporting mirror and legacy fallback; it must not overwrite Firebase Published authority.
- GitHub hardcode/static data is emergency fallback only and must never masquerade as synchronized production data.
- Never expose `ADMIN_API_SECRET`, service-account credentials, private keys, or privileged Firebase credentials in frontend code or frontend-readable files.
- Do not change business logic unless explicitly requested.
- `order_api_enabled=false` remains locked until the separate production order gate is approved.

## Workflow

For every task:

1. Inspect first.
2. Propose affected files.
3. Make minimal changes.
4. Run available tests/build.
5. Report changed files and risks.
6. Update Customer Current State／Handoff／Progress evidence after important authority or integration changes.

If Customer fallback data differs from Firebase Published, do not guess or silently merge. Stop the cutover, preserve both snapshots, and report the diff.

## Customer Authority Boundary

- Editable permanent configuration: `/admin/draft` — Admin only; Customer access forbidden.
- Approved permanent configuration: `/admin/published` — Customer read authority.
- Live operational state: `/runtime` — Customer read authority for store status, holidays, wait time and availability.
- Customer must never write Catalog／Pricing／Content authority back to Admin or Firebase.
- Customer must reject malformed, versionless, or incomplete authority snapshots instead of displaying false synchronization.

## Legacy Backend API

The existing Apps Script endpoint may remain available only for ledger／reporting or explicitly approved fallback flows. It is no longer the Customer production authority for Catalog／Pricing／Content／Runtime after the Firebase cutover.

Current known public legacy APIs:

- `navigation.get`
- `ui.theme.get`
- `store.hours.get`
