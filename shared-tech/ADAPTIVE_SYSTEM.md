# MoreFunOS｜Shared Adaptive System

> Status: CURRENT / SHARED TECHNOLOGY
> Updated: 2026-07-31 HKT
> Applies to: SMT, SMM, Admin and Customer

## Purpose
Provide one reusable adaptive-layout architecture across all ports without whole-page scaling, duplicated UI trees or patch stacking.

## Core principles
- Adaptive is structural reflow, not shrinking a fixed desktop canvas.
- One semantic component tree should serve supported viewports unless device capability truly requires a different host.
- Use layout tokens, container constraints, density profiles and component-level breakpoints.
- Preserve information hierarchy, touch targets, action priority and feedback across viewports.
- Port-specific UI may differ, but shared interaction and domain truth must not fork.

## Permanent prohibitions
- 1920-to-1280 whole-page scaling.
- Transform/zoom used as the primary responsive strategy.
- Repeated hardcoded overrides, excessive `!important`, z-index escalation or fixed-height masking.
- DOM scans, observers or runtime patches used to hide authority/layout defects.
- Maintaining separate business logic for desktop and mobile layouts.

## Recommended architecture
1. Shared semantic component and domain state.
2. Port profile tokens: viewport, density, touch target, navigation mode and safe area.
3. Component-owned responsive behavior.
4. Container queries or bounded media queries where appropriate.
5. Stable overflow rules and internal scrolling only at defined regions.
6. Visual and interaction acceptance per target device class.

## Evidence ladder
- Source structure review.
- Component contract tests.
- Browser matrix.
- Real viewport/device touch acceptance.
- Store-operation acceptance where relevant.

Browser screenshots alone do not prove touch, safe-area, keyboard, kiosk or hardware behavior.

## Promotion rule
Port-specific discoveries are first recorded in the relevant Engineering Log. A finding is promoted into this file only after it is proven reusable across more than one port or establishes a stable shared standard.
