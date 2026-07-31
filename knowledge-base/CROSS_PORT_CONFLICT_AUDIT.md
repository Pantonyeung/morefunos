# MoreFunOS Cross-Port Duplicate and Authority Conflict Audit

Status: COMPLETE BASELINE
Updated: 2026-07-31 HKT
Authority: `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`

## Scope

Compared documentation ownership across:

- MoreFunOS integrated repository
- Admin
- Customer
- SMT Register / Mobile shared core
- Superseded SMM repository
- Shared Technology

This audit governs documentation authority only. It does not claim runtime, deployment, device or store acceptance.

## Resolved conflicts

### 1. SMM independent core versus SMT Mobile Profile

**Conflict:** old SMM material can imply a separate Application, Runtime, Domain, deployment and printing core.

**Resolution:** SMM is superseded as an independent core. Mobile is a profile of the SMT shared core. The `morefunos-smm` repository is migration/evidence only.

**Canonical ownership:**

- Product boundary: SMT `CURRENT_DOMAIN_AUTHORITY.md`
- Migration boundary: SMM `CURRENT_DOMAIN_AUTHORITY.md`
- Reusable profile rules: `03_SHARED_TECH/SHARED_CORE_MOBILE_PROFILE.md`

### 2. Multiple Current / Master / Final documents

**Conflict:** filenames such as `CURRENT`, `MASTER`, `FINAL`, `LOCK`, `READY` were previously treated as authority without checking content or adoption status.

**Resolution:** filename does not grant authority. Each active domain has one `CURRENT_DOMAIN_AUTHORITY.md`; historical records and detailed specifications are supporting material only.

### 3. Offline semantics duplicated across ports

**Conflict:** Admin, Customer and SMT documents describe different offline and recovery needs, creating a risk of copying one surface's model into another.

**Resolution:**

- Protected operational configuration: `PROTECTED_RUNTIME_AUTH_AND_RECOVERY.md`
- Public read runtime: `PUBLIC_RUNTIME_OFFLINE_RECOVERY.md`
- Local-first operational journal/queue: `OFFLINE_JOURNAL_QUEUE_RECOVERY.md`

These are complementary, not interchangeable.

### 4. Authentication and connected-state ambiguity

**Conflict:** login success, authenticated identity, Firebase connectivity, session persistence and queue-flush authorization were sometimes treated as one state.

**Resolution:** credentials, session token, authenticated identity, transport connectivity and authorized mutation are separate states. Canonical reusable behavior is in `SESSION_TOKEN_DURABLE_LOGIN_LIFECYCLE.md` and `PROTECTED_RUNTIME_AUTH_AND_RECOVERY.md`.

### 5. Print Job versus actual printing

**Conflict:** queue/API success could be interpreted as physical printer success; Mobile could be interpreted as direct hardware controller.

**Resolution:** Mobile may create or manage a Print Job. Android Host owns physical execution. `job_created`, `queued`, `dispatched` and `printed` are distinct states. Canonical rule: `ANDROID_HOST_PRINT_AND_OTA_BOUNDARY.md`.

### 6. Adaptive layout versus scaled second UI

**Conflict:** old 1920→1280 material can imply whole-page scaling or independent device-specific UI truth.

**Resolution:** one Domain, Feature and Component truth; adaptive tokens and profiles alter available area, density and layout only. No second business or component authority.

### 7. Evidence-level inflation

**Conflict:** source existence, automated tests, browser matrices, screenshots and hardware/store acceptance were sometimes collapsed into “complete”.

**Resolution:** all repositories use:

`SOURCE_EXISTS → CONTRACT_PASS → BROWSER_PASS → DEVICE_PASS → HARDWARE_PASS → STORE_PASS → PRODUCT_LOCKED`

### 8. Current state duplicated inside stable authority

**Conflict:** branch, PR, commit, blocker and next-step details were embedded in stable Master/Authority documents.

**Resolution:**

- Stable ownership and permanent rules → Master / Domain Authority
- Active branch, PR, blocker and next gate → Current Status
- Dated progress and evidence → Engineering Log

## No unresolved authority conflict found

At this baseline, Admin, Customer, SMT and SMM documentation can be read without two same-level current authorities, provided the canonical read order is followed.

## Remaining non-authority risks

- Legacy documents still physically exist and may contain misleading titles.
- Some unique QA/pitfall details may still require extraction before deletion.
- Open runtime PRs and deployment/device acceptance remain separate engineering gates.

## Mandatory read order

1. Global Master Authority.
2. Knowledge Base Current Status.
3. Relevant Port Current Domain Authority.
4. Relevant Engineering Log.
5. Shared Technology only when the mechanism is needed.
6. Evidence or Archive only for traceability.
