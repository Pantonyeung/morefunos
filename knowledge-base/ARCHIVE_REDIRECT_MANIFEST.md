# MoreFunOS Archive and Redirect Manifest

Status: ACTIVE CLEANUP MANIFEST
Updated: 2026-07-31 HKT
Authority: `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`

## Purpose

Define how legacy documentation is retired without deleting unique knowledge or breaking traceability.

## Cleanup actions

### REDIRECT

Use when a legacy file is still a common entry point or external links may depend on it.

A redirected file must contain only:

- `Status: REDIRECTED / NON-AUTHORITY`
- Canonical replacement path
- One-sentence historical context
- Warning not to execute from the old file

### ARCHIVE

Use when the file is useful only for historical investigation, comparison, rollback evidence or completed-plan traceability.

Archived files must not appear in the normal read order.

### KEEP_EVIDENCE

Use for immutable or reproducible evidence:

- Test outputs
- Acceptance records
- Screenshots
- Artifacts
- Device/hardware results
- Signed release records

Evidence must not be rewritten into authority.

### KEEP_SPEC

Use only when a detailed specification remains independently useful and is explicitly referenced by Current Domain Authority.

## Approved redirect families

| Scope | Legacy family | Canonical destination |
|---|---|---|
| MoreFunOS | Must Read / Current Registry entry documents | `knowledge-base/00_INDEX.md` and `knowledge-base/CURRENT_STATUS.md` |
| Admin | old current-state / implementation / handoff entry docs | Admin `CURRENT_DOMAIN_AUTHORITY.md` and `ENGINEERING_LOG.md` |
| Customer | `MOREFUNOS_AUTHORITY_BOUNDARY.md` and old mutable entry docs | Customer `README.md`, `CURRENT_DOMAIN_AUTHORITY.md`, `ENGINEERING_LOG.md` |
| SMT | `SMT_AI_START_HERE.md`, `SMT_CONTEXT_MIN.md`, old handoff entry docs | SMT `README.md`, `CURRENT_DOMAIN_AUTHORITY.md`, `ENGINEERING_LOG.md` |
| SMM | any old independent-core entry | SMM `README.md` and `CURRENT_DOMAIN_AUTHORITY.md`; implementation destination is SMT |

## Approved archive families

- Completed work packages, implementation plans and checklists.
- Milestone, completion, final, latest and handoff files after unique conclusions enter the Engineering Log.
- Superseded branch-integration records.
- Old A/B/C/D/E line handoffs.
- V42 / SA2 / EG / Rebuild / 1920→1280 historical snapshots.
- Firebase Shadow Mode and Apps Script-primary histories superseded by current runtime authority.
- SMM independent-core implementation history.

## Files that must not be deleted during this cleanup gate

- Current Domain Authorities.
- Engineering Logs.
- Raw tests and verification scripts.
- Device, hardware and store acceptance evidence.
- Release signatures, hashes and rollback records.
- Detailed specifications still referenced by a Current Authority.
- Any file whose unique content has not been reviewed.

## Physical cleanup boundary

This manifest authorizes classification and future redirect/archive conversion. It does not authorize blind bulk deletion.

Before changing an individual legacy file:

1. Fresh-read its current content.
2. Confirm unique knowledge is already in Authority, Log, Shared Technology, Specification or Evidence.
3. Record the destination in `MIGRATION_REGISTER.md`.
4. Replace with redirect or move to archive while preserving Git history.
5. Do not alter Runtime code in the same cleanup commit.

## Completion definition

Archive/redirect cleanup is complete only when:

- Normal entry documents point only to canonical files.
- No legacy file is presented as same-level Current Authority.
- Every archived/redirected family has a registered destination.
- Evidence remains traceable.
- Runtime repositories remain behaviorally unchanged.
