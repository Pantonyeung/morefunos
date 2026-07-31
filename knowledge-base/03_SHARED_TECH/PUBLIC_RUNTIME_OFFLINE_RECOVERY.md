# MoreFunOS Shared Technology｜Public Runtime and Offline Recovery

Status: CURRENT SHARED TECHNOLOGY
Updated: 2026-07-31 HKT
Initial source: Customer G1 Public Runtime consumer and offline-survival implementation records

## Purpose

Define the reusable contract for public runtime consumption, validation, refresh, offline persistence and safe recovery across Customer-facing or read-only operational surfaces.

This document defines mechanisms, not business ownership. Domain authority remains with the system that publishes the runtime data.

## Authority boundary

A consumer must never become the source of truth merely because it caches or displays runtime data.

The consumer may:

- request the approved public runtime endpoint;
- validate the received contract;
- project data into its own presentation model;
- retain previously validated snapshots for availability and offline use;
- show explicit stale/offline state.

The consumer must not:

- infer missing business fields from names, DOM text or UI layout;
- locally reprice authoritative totals;
- convert invalid or partial data into a new valid-looking snapshot;
- silently restore a retired legacy backend as fallback;
- expose protected runtime or administrative credentials.

## Read flow

```text
Public Runtime Authority
→ protected backend / gateway
→ same-origin public consumer endpoint
→ schema and semantic validation
→ presentation adapter
→ active runtime view
```

A same-origin consumer endpoint is preferred for browser surfaces because it centralizes origin policy, endpoint routing, error normalization and deployment configuration without exposing privileged secrets.

## Snapshot model

Maintain at least:

- `latestValid`: most recent completely validated snapshot;
- `previousValid`: prior completely validated snapshot retained for recovery;
- metadata such as version, fetched time, validation result and source endpoint.

Replacement sequence:

```text
fetch candidate
→ validate required structure and semantics
→ reject invalid / partial candidate
→ move latestValid to previousValid
→ persist new latestValid
→ activate new snapshot
```

Never overwrite valid snapshots before validation and persistence preparation succeed.

## Storage strategy

Where browser support permits, use layered persistence:

- IndexedDB as the primary durable structured store;
- localStorage as a small compatibility or emergency copy;
- in-memory state for the active session.

Storage layers are recovery mechanisms, not independent authorities.

## Recovery order

Recommended recovery sequence:

1. Valid live response.
2. Valid `latestValid` durable snapshot.
3. Valid `previousValid` snapshot when latest is corrupted or unreadable.
4. Explicit branded unavailable state when no valid runtime exists.

Do not render authoritative menu or operational data from unvalidated static placeholders.

## Invalid data handling

Reject a candidate when it is:

- structurally incomplete;
- missing required collections or identifiers;
- semantically inconsistent;
- unparseable or corrupted;
- from an unapproved source or contract version;
- unable to preserve mandatory distinctions such as separate availability states.

A rejected candidate must not modify `latestValid` or `previousValid`.

## Refresh behavior

A consumer may refresh on:

- a controlled interval while visible;
- browser `online` events;
- foreground / visibility restoration;
- explicit user retry.

Requirements:

- suspend or reduce unnecessary refresh while hidden;
- deduplicate concurrent requests;
- prevent refresh recursion caused by the consumer reacting to its own runtime event;
- retain the current valid view during transient failures;
- communicate stale/offline state without destroying usable cached content.

## Availability projection

Operational values must retain their domain meaning. For example:

- `available`: orderable;
- `soldout`: temporarily unavailable under the runtime expiry policy;
- `paused`: manually unavailable until restored.

A presentation may style these states differently, but must not merge them into one local business state when downstream behavior or audit meaning differs.

## PWA and service-worker boundary

A service worker may cache static application shell assets under an explicit versioning policy.

It must not accidentally cache or replay:

- privileged API responses;
- authentication/session secrets;
- non-idempotent write requests;
- stale authoritative runtime as though it were a fresh network response;
- Firebase or backend write traffic outside the approved strategy.

Offline runtime survival belongs to the validated snapshot store, not an uncontrolled generic HTTP cache.

## Evidence requirements

Report evidence levels independently:

- source implementation exists;
- targeted validation contract passes;
- cache corruption and fallback tests pass;
- browser online/offline behavior passes;
- PWA reload and cold-start pass;
- real device acceptance passes;
- live propagation from operational authority passes;
- production promotion passes.

No lower level implies the next.

## Reusable failure rules

- Network failure: preserve current valid snapshot and mark stale/offline.
- Partial response: reject without cache replacement.
- Corrupted latest cache: attempt previous-valid recovery.
- Both durable copies invalid: show explicit unavailable state.
- Source mismatch: report; do not guess or merge silently.
- Contract-version mismatch: reject or use an explicitly supported compatibility adapter.

## Initial extraction evidence

Derived from the Customer G1 implementation family that records:

- same-origin `/v1/runtime/customer` consumption;
- explicit category/name/price/sort/visibility contract;
- distinct soldout/paused projection;
- controlled interval, online and visibility refresh;
- latest-valid and previous-valid snapshots;
- IndexedDB and localStorage persistence;
- invalid/partial replacement rejection;
- corrupted-latest fallback to previous-valid.

The source implementation remains subject to its own deployment, browser, device and store acceptance gates.
