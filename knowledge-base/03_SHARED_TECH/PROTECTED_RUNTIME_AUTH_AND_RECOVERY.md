# MoreFunOS｜Protected Runtime, Authentication and Recovery

> Status: CURRENT SHARED TECHNOLOGY  
> Source baseline: Admin WORK04 family  
> Applies to: Admin, SMT, SMM and any protected operational client

## Purpose

Define the reusable technical boundary for protected runtime configuration, authenticated access, RTDB connection state, remote hydration and recovery. Port-specific business rules remain in each port Authority.

## 1. Protected runtime configuration

- Repository source keeps an explicit placeholder boundary; live deployment values are not committed.
- Public Firebase client configuration is generated during protected deployment from environment variables.
- The deployment builder must pin the approved Firebase project, RTDB URL, root path and authentication mode.
- Private keys, service-account JSON and privileged credentials are forbidden in client repositories and deployment builders.
- A configured runtime target must reject unexpected project, database, root or unsafe authentication mode.

## 2. Authentication boundary

- Owner uses approved Firebase authentication and must be revalidated after restored browser sessions.
- Identity evaluation includes both approved identity and required role / claim.
- Unauthorized identity is rejected and signed out before protected application UI is mounted.
- Staff is not automatically a Firebase Authentication user; Staff access uses the approved short-lived Worker session model defined by the relevant Authority.
- Passwords and tokens must not enter application state, logs, audit records, GitHub, Drive, notes or long-term documentation.

## 3. Application bootstrap order

Protected applications follow:

```text
load runtime config
→ establish identity
→ validate role / claim
→ establish RTDB connected state
→ remote hydrate
→ mount protected application shell
```

The protected shell must not exist before identity validation and safe data initialization complete.

## 4. Connected-state semantics

`connected=true` requires both:

- a valid authenticated identity; and
- RTDB `.info/connected=true`.

The following states must remain distinguishable:

- configured
- auth-required
- authenticated
- connected
- offline
- timeout
- permission-denied
- error
- local-fallback

Do not collapse source configuration, authentication and network connectivity into one generic “connected” flag.

## 5. Atomic remote hydrate

Before remote state replaces active state:

1. validate the remote snapshot shape;
2. retain the current in-memory state;
3. generate a hydrate correlation ID;
4. create a named pre-hydrate recovery envelope;
5. apply the candidate only after validation and recovery preparation;
6. persist locally;
7. roll back the in-memory state when persistence fails.

Malformed remote state must be rejected explicitly. A failed hydrate must not leave a partially accepted remote state active.

## 6. Teardown and stale async protection

Sign-out, permission failure or bootstrap failure must:

- stop routing and protected event listeners;
- dispose Firebase Auth / RTDB observers;
- disconnect the remote repository;
- remove the protected application shell;
- invalidate stale asynchronous initialization attempts;
- retain only explicitly approved local recovery data.

A late async result must never remount a protected shell after sign-out.

## 7. Verification levels

Keep these claims separate:

- CODE EXISTS
- CONTRACT PASS
- TARGETED PASS
- REGRESSION PASS
- LIVE FIREBASE PASS
- BROWSER PASS
- DEVICE ACCEPTANCE
- MERGE READY
- PRODUCTION READY

Passing one level never implies the next.

## 8. Evidence and secret scanning

Verification should include:

- targeted contracts;
- minimum affected regression;
- syntax checks;
- scans for actual private-key material;
- scans for service-account JSON;
- scans for committed live API-key patterns;
- browser / device evidence where applicable.

Documentation wording containing terms such as `private_key` or `service_account` must not cause false-positive scans; scans should detect actual credential structures.

## 9. Port-specific exclusions

This shared document does not define:

- which products are available;
- order, payment or printing authority;
- Staff permissions for a specific command;
- Catalog / Runtime business semantics;
- Production rollout timing.

Those remain under central and port Authority.
