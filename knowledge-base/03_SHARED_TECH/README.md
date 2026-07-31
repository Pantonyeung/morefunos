# MoreFunOS Shared Technology

Status: CURRENT INDEX
Updated: 2026-07-31 HKT
Authority: `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`

## Purpose

呢個目錄係所有跨端口技術機制嘅唯一導航入口。端口 Authority 只定義自己採用邊項機制及端口邊界，不得複製完整 Shared Technology 規則。

## Canonical documents

| Domain | Canonical file | Applies to |
|---|---|---|
| Adaptive application | `ADAPTIVE_SYSTEM.md` | Admin / Customer / SMT Register / Mobile Profile |
| Protected runtime config, auth and recovery | `PROTECTED_RUNTIME_AUTH_AND_RECOVERY.md` | Admin and protected operational surfaces |
| Public runtime offline recovery | `PUBLIC_RUNTIME_OFFLINE_RECOVERY.md` | Customer and public read surfaces |
| Durable local journal and queue replay | `OFFLINE_JOURNAL_QUEUE_RECOVERY.md` | SMT shared runtime and any local-first operational client |
| Session token and durable login | `SESSION_TOKEN_DURABLE_LOGIN_LIFECYCLE.md` | Admin / SMT / Mobile authenticated shells |
| Android Host, printing and OTA | `ANDROID_HOST_PRINT_AND_OTA_BOUNDARY.md` | SMT Android Host / Mobile Print Job interaction |
| Shared Core Mobile Profile | `SHARED_CORE_MOBILE_PROFILE.md` | SMT mobile profile and superseded SMM migration |
| Low-cost targeted development | `LOW_COST_TARGETED_DEVELOPMENT.md` | All repositories and CI workflows |

## Ownership rules

### Shared Technology owns

- Reusable failure and recovery semantics.
- Cross-port authentication/session behavior.
- Offline persistence, journal and queue mechanisms.
- Device/host execution boundaries.
- Print Job versus actual hardware-result semantics.
- Adaptive-layout constraints.
- CI cost-control and evidence boundaries.

### Port Authority owns

- Whether and where the mechanism is adopted.
- Port-specific business rules and permissions.
- Port-specific UI composition.
- Current branch, PR, deployment and acceptance state.

### Engineering Log owns

- Dated implementation history.
- Failures, root causes, rollback points and evidence.
- Which version of a shared mechanism was integrated.

## Non-duplication rule

A shared mechanism may be summarized in a Port Authority, but the complete rule must remain here. When text conflicts:

1. Master Authority wins for ownership and permanent constraints.
2. Shared Technology wins for reusable mechanism semantics.
3. Port Authority wins for port-specific adoption and business behavior.
4. Engineering Log is historical evidence only.

## Evidence boundary

`SOURCE_EXISTS → CONTRACT_PASS → BROWSER_PASS → DEVICE_PASS → HARDWARE_PASS → STORE_PASS → PRODUCT_LOCKED`

No earlier level may be reported as a later level.
