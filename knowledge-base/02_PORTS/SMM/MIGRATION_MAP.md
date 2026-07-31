# SMM Documentation Migration Map

Status: COMPLETE PORT AUDIT
Updated: 2026-07-31 HKT
Source repository: `Pantonyeung/morefunos-smm`
Default branch reviewed: `main`

## Canonical repository files

| File | Category | Decision |
|---|---|---|
| `README.md` | Migration-source entry | KEEP |
| `AGENTS.md` | AI / engineering entry | KEEP |
| `CURRENT_DOMAIN_AUTHORITY.md` | Repository authority | KEEP; only current SMM repository authority |
| `ENGINEERING_LOG.md` | Migration history | KEEP; only append-only SMM migration log |

## Current authority extracted

- SMM is superseded as an independent application and runtime.
- The formal product is one SMT Application with `register` and `mobile` profiles.
- Mobile Profile implementation authority is `Pantonyeung/morefunos-smt`.
- Register and Mobile share Domain, Data Model, Business Rules, Cart, Pricing, Checkout, Order, Payment, Availability, Permission, Sync, Recovery, Audit and Print Job Contract.
- SMM repository content may only be used as migration source, historical evidence, UI reference, PWA lifecycle reference, reusable test source and pitfall reference.
- Mobile may create and manage Print Jobs but may not directly execute physical printing.
- Historical source does not become current until re-adopted, implemented and verified in SMT.

## Repository findings

- Default branch is `main`.
- No pull requests were found during the audit.
- Repository code search returned no matching WORK, handoff or QA records.
- README already declared the repository superseded, but depended on multiple legacy central authority filenames.
- `AGENTS.md`, `CURRENT_DOMAIN_AUTHORITY.md` and `ENGINEERING_LOG.md` did not exist and were created.

## Migration classification

| Source family | Destination | Action | Status | Notes |
|---|---|---|---|---|
| README authority and product placement | Current Domain Authority / Entry | MERGE_AUTHORITY + KEEP_ENTRY | MIGRATED | Duplicate authority removed from README |
| Historical mobile UI / interaction | SMT Mobile Profile specification / Evidence | KEEP_EVIDENCE + RE-ADOPT_IF_NEEDED | AUDITED | Not current by default |
| PWA / mobile lifecycle behaviour | Shared Technology / Evidence | EXTRACT_SHARED_TECH | EXTRACTED | General mobile-profile lifecycle rules centralized |
| Historical tests and device observations | Evidence | KEEP_EVIDENCE | AUDITED | Evidence level must remain explicit |
| Independent SMM core / deployment concept | Historical | ARCHIVE | SUPERSEDED | Must not be revived |
| Direct mobile printer control | Prohibited architecture | REJECT | SUPERSEDED | Android Host owns physical execution |
| Old branch / WORK / handoff / FINAL / LOCK records | Historical | ARCHIVE | AUDITED | None found by current search; commit history remains evidence |

## Completion boundary

SMM port documentation governance is complete. No runtime migration was performed in this audit. Any remaining code or historical behaviour is handled only when a specific SMT Mobile Profile task requires re-adoption.
