# Shared Core Mobile Profile

Status: CURRENT SHARED TECHNOLOGY
Updated: 2026-07-31 HKT

## Principle

A mobile operational surface is a profile of the shared application core, not a second business application.

## Shared authority

Register and Mobile must share:

- Domain and Data Model;
- Business Rules;
- Cart and Pricing;
- Checkout, Order and Payment semantics;
- Availability and Supply Runtime;
- Staff Session and Permission model;
- Sync, Queue, Recovery and Audit;
- Print Job Contract.

## Profile-owned concerns

Mobile may own only presentation and device-profile concerns:

- viewport composition;
- navigation density;
- touch target sizing;
- safe-area handling;
- compact workflow sequencing;
- mobile lifecycle and reconnect presentation;
- camera, QR or share-sheet integration where authorised.

It must not redefine business truth.

## Migration rule

Historical mobile behaviour is not copied automatically. It must pass:

```text
Inspect
→ Compare with current authority
→ Explicitly re-adopt
→ Implement in shared core / profile
→ Verify contract
→ Verify browser
→ Verify device
```

## Printing boundary

Mobile may create, inspect, retry or cancel a Print Job. Physical execution belongs to the SMT Android Host. API or queue success is not physical print success.

## Failure behaviour

Network failure must preserve local operational state and pending work where safe. Authentication revocation clears invalid credentials but must not silently destroy unrelated local state or queued operations.

## Anti-patterns

- second mobile Domain or API;
- duplicated pricing or availability calculation;
- standalone production deployment with divergent behaviour;
- direct physical-printer execution from browser/mobile UI;
- whole-page scaling used as adaptive architecture;
- treating historical screenshots or code as current authority.
