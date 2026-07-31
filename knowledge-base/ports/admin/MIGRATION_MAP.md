# MoreFunOS Admin｜Documentation Migration Map

> Status: ACTIVE FIRST-PASS AUDIT
> Updated: 2026-07-31 HKT
> Source repo: `Pantonyeung/morefunos-admin`
> Active line reviewed: `feat/admin-p0-full-connect-v1` / PR #1

## Purpose

將 Admin 現有文件族群映射到 Knowledge Base V2 的唯一歸宿，防止 Authority、進度、Handoff、驗證及歷史文件互相競爭。

本輪只做抽取、分類及遷移決策；不刪除或覆蓋 Admin 舊文件。

## Audit Basis and Boundary

本輪已直接核對：

- `CURRENT_DOMAIN_AUTHORITY.md`
- `ENGINEERING_LOG.md`
- Admin PR #1 的 Current Work Log
- PR #5–#17 中可見的 WORK04 文件及實作證據

GitHub code search未能提供完整 repository 檔案清單，因此本文件是「已見證文件族群的第一輪審核」，不是對所有歷史檔案數量的最終聲明。

## Canonical Admin Files

| Source | Canonical category | Decision | Reason |
|---|---|---|---|
| `CURRENT_DOMAIN_AUTHORITY.md` | Authority | KEEP | Admin 唯一 CURRENT Domain Authority |
| `ENGINEERING_LOG.md` | Engineering Log | KEEP | Admin 唯一 append-only 工程記錄 |
| `AGENTS.md` | Entry | PENDING DIRECT AUDIT | 應只保留 fresh-read、branch、verification 入口 |
| `README.md` | Entry / Context | PENDING DIRECT AUDIT | 應降為簡短導航，不重複 Authority |

## WORK04 File-Family Decisions

| Source file / family | Unique value | Destination | Action after extraction |
|---|---|---|---|
| `WORK04_CURRENT_STATE.md` | 當時 branch、commit、Evidence Level、next task | Admin `ENGINEERING_LOG.md` | REDIRECT or ARCHIVE |
| `WORK04_IMPLEMENTATION_LOG.md` | runtime target guard 的 RED→GREEN、驗證邊界 | Admin `ENGINEERING_LOG.md` | ARCHIVE |
| `WORK04A_RUNTIME_CONFIG_IMPLEMENTATION_LOG.md` | protected runtime config、固定 Firebase target、安全邊界 | Shared Technology + Admin Log | ARCHIVE |
| `WORK04B_AUTH_CONNECTED_STATE_LOG.md` | existing-user auth、`auth-required`、authenticated + connected semantics | Shared Technology + Admin Log | ARCHIVE |
| `WORK04C_REMOTE_HYDRATE_IMPLEMENTATION_LOG.md` | hydrate 風險、驗證前不替換 active state | Shared Technology + Admin Log | ARCHIVE |
| `WORK04C_ATOMIC_HYDRATE_COMPLETION_LOG.md` | recovery envelope、rollback、correlation ID、malformed rejection | Shared Technology + Admin Log | ARCHIVE |
| `WORK04D_FIREBASE_STAGING_INTEGRATION_LOG.md` | A+B+C integration composition | Admin `ENGINEERING_LOG.md` | ARCHIVE |
| `WORK04D_NO_ACTION_VERIFICATION_LOG.md` | equivalent local verification、CI external blocker | Admin Log + Evidence | ARCHIVE after evidence link |
| `WORK04E_OWNER_LOGIN_IMPLEMENTATION_LOG.md` | Owner Auth Gate、claim、pre-shell boundary、test evidence | Admin Authority + Admin Log + Evidence | ARCHIVE after extraction |
| `WORK04E_EXECUTION_HANDOFF.md` | completed、blocked、next isolated problem | Admin `ENGINEERING_LOG.md` | REDIRECT or ARCHIVE |
| `WORK04E_PLAN_READY.md` | index to spec/plan/evidence and temporary status | Admin Log | ARCHIVE |
| `WORK04G_MOBILE_MENU_PREVIEW_ACCEPTANCE.md` | human iPhone acceptance with branch/commit/preview | Evidence | KEEP_EVIDENCE |
| `WORK04_TARGETED_CI_BLOCKER_20260729.md` | external runner/blocker diagnosis | Admin Log | ARCHIVE |
| `WORK04_TARGETED_FAILURE_AND_MERGE_PROTOCOL_V1.0.md` | reusable isolate→root cause→targeted verification protocol | Shared Technology | REDIRECT after central extraction |
| `MOREFUNOS_LOW_COST_CI_DEVELOPMENT_PROTOCOL_V1.0.md` | reusable low-cost CI policy | Shared Technology | REDIRECT to central protocol |
| `docs/superpowers/specs/*owner-browser-login*` | approved design and non-goals | Historical Plan / Reference | ARCHIVE after final constraints promoted |
| `docs/superpowers/plans/*owner-browser-login*` | implementation task sequence | Historical Plan / Reference | ARCHIVE after completion |

## Extracted Admin Current Truth

The following is supported by the current Admin Authority and active work evidence:

- Admin is the Control Plane for owner/staff identity, Draft, Runtime, Publish, Audit, Recovery and operational availability.
- Roles are limited to `owner` and `staff`.
- Owner uses Firebase Authentication.
- Staff is an Admin-managed private account and is not a Firebase Authentication user.
- Staff obtains a short-lived session through Cloudflare Worker.
- Staff, SMT and SMT Mobile must not directly write protected RTDB.
- Staff password records use salt plus versioned hash only.
- Availability authority path is `morefun/runtime/operations/v1/availability`.
- Availability values are `available | soldout | paused`.
- `soldout` expires at the next Hong Kong 05:00; `paused` does not auto-expire.
- Catalog publish must not overwrite live operational availability.
- Source implementation and targeted contract evidence exist, but latest deployment, cross-port staging, device and store acceptance remain separate gates.

## Shared Technology Candidates

The following mechanisms should not remain buried inside Admin WORK files:

1. **Targeted Failure and Low-Cost CI**
   - one problem per branch;
   - reproduce and root-cause before fix;
   - targeted verification before minimum regression;
   - one final integration gate;
   - documentation changes must not trigger full CI.

2. **Protected Firebase Runtime Configuration**
   - deployment-time runtime config generation;
   - approved project, RTDB and root pinning;
   - repository placeholder contains no live values;
   - privileged credentials are rejected.

3. **Authenticated Firebase Connected State**
   - authentication and RTDB connectivity are separate states;
   - `connected=true` requires authenticated identity plus `.info/connected=true`;
   - missing identity returns `auth-required`;
   - reads and writes are blocked without an authenticated user.

4. **Atomic Remote Hydrate and Recovery**
   - validate remote snapshot before active-state replacement;
   - preserve prior in-memory state;
   - create pre-hydrate recovery envelope;
   - rollback when local persistence fails;
   - expose correlation ID and malformed-snapshot result.

## Evidence Retention Rule

Keep immutable proof separately from rules:

- human browser/device acceptance;
- executable contracts and verification scripts;
- commit, PR, preview and deployment identifiers;
- raw test output or artifacts.

Evidence may prove a stated level only. Source or Contract PASS must not be promoted to Deployment, Device, Store or Production PASS.

## Next Admin Audit Pass

1. Directly read `AGENTS.md` and `README.md` from the active branch.
2. Audit the remaining docs families not exposed in PR #5–#17.
3. Append unique WORK04 development history to Admin `ENGINEERING_LOG.md` without copying full documents.
4. Create central Shared Technology documents for CI protocol, Firebase runtime/auth and hydrate/recovery.
5. Only after cross-checking unique content, convert old files to Redirect or Archive.
