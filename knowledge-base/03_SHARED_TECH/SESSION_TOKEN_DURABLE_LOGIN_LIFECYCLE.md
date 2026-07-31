# Session Token × Durable Login Lifecycle

Status: SHARED TECHNOLOGY
Updated: 2026-07-31 HKT

## Purpose
Define the reusable authentication boundary for operational devices that must survive normal app closure or device restart without storing plaintext passwords.

## Required separation

- Credentials authenticate a user.
- A signed session token authorizes subsequent operations.
- Local shell identity supports UI restoration only.
- Operational state and pending queues must not be erased merely because a session expires.

## Durable-login rules

- Never store the user's plaintext password locally.
- Persist only the minimum shell identity and signed session material needed for restoration.
- Bind staff sessions to the intended surface/profile and device identity where required.
- On app restart, restore local shell state first, then validate the signed session remotely.
- Account disable, deletion, password reset or explicit session revocation must invalidate the durable session on the next successful authority check.
- A 401/403 response must clear invalid session material, but must preserve valid local operational data and pending queues.
- Network failure or server 5xx must not be interpreted as credential rejection.
- Remote-first login may use a local fallback only for a genuine network failure and only where explicitly authorized.
- A failed authenticated queue flush must not be reported as a successful login.

## Evidence boundary

Source contracts and unit tests do not prove restart, power-cycle, revocation or multi-device behavior. Those require browser/device/staging acceptance.

## Source extraction

Derived from SMT Main Candidate shared Supply Runtime and PR #35 remembered staff login work. Active implementation remains subject to full regression and device acceptance.