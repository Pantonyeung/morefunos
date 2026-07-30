# Customer Firebase Direct Cutover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將 Customer 正式切換為直接讀取 Admin 發佈到 Firebase 的 Published／Runtime，同時保留完整備份、可回滾路徑及接手紀錄。

**Architecture:** Customer 新增單一 read-only Firebase adapter，將 `/admin/published` 與 `/runtime` 轉換成現有前台可用資料，不重寫 Customer UI／點餐邏輯。Cutover 前建立 GitHub 備份；讀取結果必須通過 shape／version 驗證，任何失敗不得套用假資料。

**Tech Stack:** Vanilla JavaScript ES modules、Firebase Web modular CDN／REST-compatible read、現有 static server、Node syntax／acceptance checks。

## Global Constraints

- Admin 係唯一 Control Plane。
- Firebase RTDB 係 Operational source of truth。
- Customer 只讀 `/admin/published` 與 `/runtime`，禁止讀 `/admin/draft`。
- 不建立第二套 Menu Authority。
- 不重構現有 Customer UI／點餐 Business Logic。
- `order_api_enabled=false` 保持不變。
- 所有修改必須有 pre-cutover backup、Rollback、Current Handoff、Progress Log。

---

### Task 1: Authority and backup lock

**Files:**
- Modify: `AGENTS.md`
- Create: `docs/CUSTOMER_FIREBASE_CUTOVER_CURRENT_STATE.md`
- Create: `docs/CUSTOMER_FIREBASE_CUTOVER_ROLLBACK.md`

**Interfaces:**
- Consumes: Admin Authority decision and backup branch `backup/customer-pre-firebase-cutover-20260730`.
- Produces: explicit Customer source-of-truth and rollback procedure.

- [ ] **Step 1: Update authority wording**

Replace the legacy Google Sheet source-of-truth statement with Firebase RTDB as operational authority, Google Sheet V2 as ledger／reporting mirror, and GitHub static data as emergency fallback only.

- [ ] **Step 2: Record immutable backup reference**

Record repository, branch, date, and restore command/reference in the rollback document.

- [ ] **Step 3: Commit**

```bash
git add AGENTS.md docs/CUSTOMER_FIREBASE_CUTOVER_CURRENT_STATE.md docs/CUSTOMER_FIREBASE_CUTOVER_ROLLBACK.md
git commit -m "docs: lock customer Firebase cutover authority and rollback"
```

### Task 2: Read-only Firebase Customer adapter

**Files:**
- Create: `customer-firebase-config.js`
- Create: `customer-firebase-adapter.js`
- Create: `tests/customer-firebase-adapter.test.mjs`

**Interfaces:**
- Consumes: public Firebase Web config and approved root path.
- Produces: `loadCustomerAuthority(): Promise<{ok:boolean,published?:object,runtime?:object,receipt?:object,error?:string}>`.

- [ ] **Step 1: Write failing contract tests**

Tests must assert:
- adapter requests only `/admin/published`, `/runtime`, and version metadata;
- any `/admin/draft` path is rejected;
- malformed Published or Runtime is rejected;
- valid snapshots produce a version receipt.

- [ ] **Step 2: Run tests and confirm failure**

```bash
node --test tests/customer-firebase-adapter.test.mjs
```

Expected: FAIL because adapter does not exist.

- [ ] **Step 3: Implement minimal read-only adapter**

Implement:

```js
export async function loadCustomerAuthority({ fetchImpl = fetch, config } = {})
```

with timeout, JSON validation, explicit source labels, and no write methods.

- [ ] **Step 4: Run tests and confirm pass**

```bash
node --test tests/customer-firebase-adapter.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add customer-firebase-config.js customer-firebase-adapter.js tests/customer-firebase-adapter.test.mjs
git commit -m "feat: add read-only Customer Firebase authority adapter"
```

### Task 3: Customer boot cutover

**Files:**
- Modify: `boot.js`
- Modify: `front-app.js`
- Modify: `front-menu-v21.js`
- Create: `customer-authority-store.js`
- Modify: `tools/front-acceptance-check.mjs`

**Interfaces:**
- Consumes: `loadCustomerAuthority()`.
- Produces: a single normalized Customer authority store used by existing render logic.

- [ ] **Step 1: Add failing acceptance assertions**

Assert boot loads Firebase authority before Customer render, Draft is never referenced, and errors produce an explicit degraded state rather than silently loading stale demo data.

- [ ] **Step 2: Run acceptance and confirm failure**

```bash
npm run acceptance:front
```

- [ ] **Step 3: Add normalized authority store**

Expose read-only selectors for catalog, pricing, content, runtime, and receipt while preserving existing UI function signatures.

- [ ] **Step 4: Wire boot sequence**

Boot order:

```text
load config → read Published／Runtime → validate → install authority store → render Customer
```

Do not import Admin modules into Customer.

- [ ] **Step 5: Run syntax and acceptance checks**

```bash
npm run check
npm run acceptance:front
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add boot.js front-app.js front-menu-v21.js customer-authority-store.js tools/front-acceptance-check.mjs
git commit -m "feat: cut Customer over to Firebase Published and Runtime"
```

### Task 4: Publish and runtime verification

**Files:**
- Create: `tools/customer-firebase-contract-check.mjs`
- Modify: `package.json`
- Modify: `docs/CUSTOMER_FIREBASE_CUTOVER_CURRENT_STATE.md`

**Interfaces:**
- Consumes: configured Firebase Published／Runtime endpoint.
- Produces: executable evidence that Customer cannot read Draft and can resolve Published version／Runtime.

- [ ] **Step 1: Add targeted contract checker**

The checker must fail when config is missing, Published is empty, Runtime is malformed, active version is absent, or any Draft endpoint is configured.

- [ ] **Step 2: Add script**

```json
"acceptance:customer-firebase": "node tools/customer-firebase-contract-check.mjs"
```

- [ ] **Step 3: Run targeted verification**

```bash
npm run acceptance:customer-firebase
```

- [ ] **Step 4: Record actual evidence**

Record endpoint root, active Published version, read timestamp, Runtime version, and result. Never mark PASS without executable evidence.

- [ ] **Step 5: Commit**

```bash
git add tools/customer-firebase-contract-check.mjs package.json docs/CUSTOMER_FIREBASE_CUTOVER_CURRENT_STATE.md
git commit -m "test: verify Customer Firebase Published and Runtime cutover"
```

### Task 5: Handoff and release gate

**Files:**
- Create: `docs/CUSTOMER_FIREBASE_CUTOVER_HANDOFF.md`
- Create: `docs/CUSTOMER_FIREBASE_CUTOVER_PROGRESS_LOG.md`
- Modify: `docs/CUSTOMER_FIREBASE_CUTOVER_CURRENT_STATE.md`

**Interfaces:**
- Consumes: all commits and test evidence.
- Produces: exact next-agent entry point and release／rollback status.

- [ ] **Step 1: Write handoff**

Include authority, branch, changed files, config location, test commands, unresolved risks, rollback branch, next task, and explicit `order_api_enabled=false`.

- [ ] **Step 2: Write chronological progress log**

Record each gate, commit, evidence status, and any blocked item.

- [ ] **Step 3: Final verification**

```bash
npm run check
npm run acceptance:front
npm run acceptance:customer-firebase
```

- [ ] **Step 4: Commit**

```bash
git add docs/CUSTOMER_FIREBASE_CUTOVER_HANDOFF.md docs/CUSTOMER_FIREBASE_CUTOVER_PROGRESS_LOG.md docs/CUSTOMER_FIREBASE_CUTOVER_CURRENT_STATE.md
git commit -m "docs: complete Customer Firebase cutover handoff"
```

## Self-review

- Spec coverage: backup, direct cutover, Published／Runtime separation, Draft isolation, version receipt, rollback, tests, handoff and progress log are covered.
- Placeholder scan: no TBD／TODO requirements remain.
- Type consistency: all tasks consume the same `loadCustomerAuthority()` contract and normalized authority store.
