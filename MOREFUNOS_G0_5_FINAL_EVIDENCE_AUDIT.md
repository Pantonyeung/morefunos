# MoreFunOS｜G0.5 Final Evidence Audit

狀態：IN PROGRESS / EVIDENCE AUDIT
更新：2026-07-30 HKT

## 1. 審核範圍

本文件只記錄可由 GitHub Repository／PR／Workflow 檔案直接證實的內容。任何無法由目前 GitHub 連接器讀取的外部設定，均標示為 `EXTERNAL VERIFICATION REQUIRED`，不得推斷為已完成。

涵蓋 Repository：

- Pantonyeung/morefunos
- Pantonyeung/morefunos-admin
- Pantonyeung/morefunos-smt
- Pantonyeung/morefunos-smm
- Pantonyeung/morefun-ordering-web

## 2. Default Branch

五個 Repository 的 Default Branch 均已確認為：

- `main`

判定：PASS

注意：Default Branch 不等於 Active Development Authority。開發權限以 `MOREFUNOS_G0_5_AUTHORITY_MATRIX.md` 為準。

## 3. Admin Active Authority Workflow Evidence

Authority：

- Branch：`feat/admin-p0-full-connect-v1`
- PR：morefunos-admin #1

已核對 Workflow：

### `.github/workflows/admin-validation-diagnostic.yml`

- Trigger：`workflow_dispatch` only
- Permissions：`contents: read`
- Timeout：15 minutes
- Evidence output：GitHub artifact
- Bot commit／push：不存在
- Cron／push／pull_request：不存在

判定：PASS

### `.github/workflows/ci.yml`

- Trigger：`workflow_dispatch` only
- Permissions：`contents: read`
- Browser evidence：GitHub artifact
- Cron／push／pull_request：不存在
- Bot commit／push：不存在

判定：PASS

### `.github/workflows/work04-firebase-targeted.yml`

- Trigger：`workflow_dispatch` only
- Permissions：`contents: read`
- Timeout：8 minutes
- 只執行 Firebase staging／rules contract
- 無 deploy command
- 無 bot commit／push
- Cron／push／pull_request：不存在

判定：PASS

## 4. SMT Active Authority Workflow Evidence

Primary Candidate：

- Branch：`smt-main-candidate-v1`
- PR：morefunos-smt #34

### `.github/workflows/main-candidate-manual-gate.yml`

- Trigger：`workflow_dispatch` only
- Permissions：`contents: read`
- Concurrency：有
- Cancel in progress：有
- Timeout：25 minutes
- Evidence output：GitHub artifact
- Cron／push／pull_request：不存在
- Bot commit／push：不存在

判定：PASS

### Printer Module PR #17

Workflow：`.github/workflows/printer-module-contract.yml`

- Trigger：`workflow_dispatch` only
- Permissions：`contents: read`
- Concurrency：有
- Timeout：10 minutes
- Evidence output：GitHub artifact
- Cron／push／pull_request：不存在
- Bot commit／push：不存在

判定：PASS

### Incoming Queue PR #24

Workflow：`.github/workflows/incoming-queue-contract.yml`

- Trigger：`workflow_dispatch` only
- Permissions：`contents: read`
- Concurrency：有
- Timeout：8 minutes
- Cron／push／pull_request：不存在
- Bot commit／push：不存在

判定：PASS

### Required Flow PR #20

Changed files：

- `pages/order/required-flow-domain.js`
- `tests/required-flow-domain.test.mjs`

無 Workflow file。

判定：PASS

### Order Recovery PR #23

Changed files：

- `pages/orders/order-recovery-domain.js`
- `tests/order-recovery-domain.test.mjs`

無 Workflow file。

判定：PASS

## 5. Customer Active Candidate Evidence

PR：morefun-ordering-web #21

Changed files 共 24 個，未包含 `.github/workflows/*`。

判定：

- 本 PR 沒有新增 Workflow：PASS
- PR 目前 `mergeable: false`，仍需 reconciliation：BLOCKED / NOT READY TO MERGE

## 6. SMM Evidence

SMM 已由 Authority Matrix 定義為非獨立核心 Authority。

目前證據只可確認：

- Default Branch 為 `main`
- 不應作為 G1 獨立核心來源

以下仍需 Default Branch 完整 workflow inventory 才可簽署：

- `.github/workflows` 是否存在
- 是否有 schedule／push／pull_request trigger
- 是否有 deploy job

判定：EXTERNAL / DIRECTORY INVENTORY REQUIRED

## 7. Pull-request-triggered Run Evidence

針對目前已核對的主要 Authority commits，GitHub 連接器未回傳 pull-request-triggered workflow runs。

這項證據只能證明：

- 查詢範圍內未發現 PR-triggered run

不能證明：

- Repository 從未執行過任何 Action
- schedule／workflow_dispatch／push runs 不存在
- 歷史 workflow runs 已刪除

判定：PARTIAL PASS

## 8. 尚未能由 Repository 內容證實的外部設定

以下項目不得標記為 PASS，直到取得 GitHub／Cloudflare／Firebase 控制台證據：

### GitHub

- Branch Protection Rules
- Required Status Checks
- Rulesets
- Repository Actions permissions
- Enabled／Disabled workflow state
- Repository／Environment secrets
- Environment protection rules
- 歷史 scheduled runs
- 所有 Default Branch `.github/workflows` 目錄完整清單

### Cloudflare

- Pages Git integration
- Production branch
- Preview branch behavior
- Deploy hooks
- Workers routes
- API tokens
- Environment variables／secrets
- 最近部署來源

### Firebase

- Hosting／Functions／App Hosting GitHub integration
- Realtime Database rules deployment source
- Service accounts
- CI tokens／Workload Identity
- Extensions／scheduled functions
- 最近部署來源

判定：EXTERNAL VERIFICATION REQUIRED

## 9. Closeout 判定標準

只有同時符合以下條件，才可宣告：

`MoreFunOS G0.5 CLOSEOUT CERTIFIED`

1. Authority Matrix 已鎖定。
2. 所有 Active Authority workflow 均已核對。
3. 所有 Default Branch workflow 目錄已完整盤點。
4. 所有非必要 workflow 已停用或改為 manual-only。
5. 無 cron／push／pull_request 隱性自動執行。
6. 無 bot writeback／self-trigger loop。
7. Branch Protection／Ruleset 不再要求已移除的 status check。
8. Cloudflare／Firebase 無未知 deploy hook。
9. 外部部署來源與 Authority Matrix 一致。
10. 所有證據有日期、路徑、狀態及責任邊界。

## 10. 目前結論

已證實：

- Admin Active Authority 三個 Workflow 已處理完成。
- SMT Main Candidate、Printer Module、Incoming Queue Workflow 已處理完成。
- SMT PR #20、#23 沒有 Workflow。
- Customer PR #21 沒有新增 Workflow。
- 已核對 Workflow 均為 manual-only、read-only，且無 bot writeback。

未證實：

- 五個 Default Branch 的完整 Workflow inventory。
- GitHub Branch Protection／Rulesets／Environment／Secrets。
- Cloudflare／Firebase 控制台內的 Deploy Hook 與部署來源。

因此目前狀態為：

`G0.5 CLOSEOUT CANDIDATE — NOT YET CERTIFIED`
