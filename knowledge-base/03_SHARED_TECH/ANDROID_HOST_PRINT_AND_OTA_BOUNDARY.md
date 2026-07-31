# Android Host × Print Result × APK OTA Boundary

Status: SHARED TECHNOLOGY
Updated: 2026-07-31 HKT

## Purpose
Define the reusable boundary between web/application Runtime and native Android hardware execution.

## Ownership

### Application Runtime
- creates validated Print Job / Command intent;
- records business context, routing and retry policy;
- displays software-level queue state;
- must not claim physical output success before native acknowledgement.

### Android Host
- owns printer binding, transport and hardware execution;
- executes SUNMI, ESC/POS, TSPL or platform installer operations;
- reports hardware-level outcomes such as `printed`, `failed` and `retry`;
- owns package installer result recovery, boot recovery and package-replaced recovery.

## Print semantics

```text
job_created ≠ queued ≠ dispatched ≠ printed
```

- Queue success proves only software acceptance.
- Dispatch success proves only that a native command was issued.
- `printed` requires hardware-level acknowledgement where available.
- Reprint creates a new auditable print attempt; it must not rewrite the original result.
- Mobile profiles may request or create Print Jobs but must not directly control physical printers.

## APK OTA safety

- Release manifests must be signed or otherwise integrity-protected.
- Validate package name, version, certificate continuity and SHA-256 before installation.
- Reject replayed or downgraded releases unless an explicit recovery authority permits rollback.
- Preserve a known-good rollback point.
- After install, restore installer result state across app/process restart.
- Run a bounded Runtime health gate; automatically roll back or block promotion when the new Runtime fails the gate.
- Separate private staging, release approval and production promotion.

## Evidence boundary

Source contracts, Android compilation and simulated bridge tests do not prove physical printing, installer behavior or store reliability. Required acceptance includes real device, real printer, power-cycle, network interruption and recovery testing.

## Source extraction

Derived from SMT D/E-line evidence, PR #34 Main Candidate clean integration and Android/printing/OTA contracts. Superseded branches remain historical evidence and must not be merged back as current authority.