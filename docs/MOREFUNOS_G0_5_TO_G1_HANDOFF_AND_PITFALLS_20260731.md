# MoreFunOS｜G0.5 → G1 正式接手文件

版本：V1.0  
日期：2026-07-31 HKT  
狀態：APPROVED HANDOFF  
Authority：MoreFunOS Master Control

---

## 1. 文件目的

本文件供下一個 AI／工程人員接手 MoreFunOS 使用。它記錄：

- G0.5 已完成的清理與基建收尾
- 現時唯一 Authority
- GitHub Actions／Cloudflare／Firebase 的實際狀態
- 遇到的坑與成因
- 已驗證成功的處理方式
- 禁止重犯事項
- G1 的正確開始次序

不得把本文件視為重新設計授權。接手者只能在既定 Authority 內執行。

---

## 2. Current Authority

### Project OS

- Repository：`Pantonyeung/morefunos`
- Default branch：`main`
- Authority files：
  - `MOREFUNOS_G0_5_AUTHORITY_MATRIX.md`
  - `MOREFUNOS_G0_5_FINAL_EVIDENCE_AUDIT.md`
  - `MOREFUNOS_G0_5_CLOSEOUT_CERTIFICATE.md`
  - 本文件

### Admin

- Repository：`Pantonyeung/morefunos-admin`
- Active branch：`feat/admin-p0-full-connect-v1`
- Active PR：`#1`

### SMT

- Repository：`Pantonyeung/morefunos-smt`
- Main candidate branch：`smt-main-candidate-v1`
- Main candidate PR：`#34`
- 保留中的獨立模組 PR：
  - Printer Module：`#17`
  - Required Flow：`#20`
  - Order Recovery：`#23`
  - Incoming Queue：`#24`

### Customer

- Repository：`Pantonyeung/morefun-ordering-web`
- Candidate PR：`#21`
- 狀態：需要 reconciliation，不得直接假設可 merge

### SMM

- Repository：`Pantonyeung/morefunos-smm`
- 狀態：舊獨立核心已 superseded
- 不再作為 G1 獨立核心 Authority
- Cloudflare Git integration 已斷開

---

## 3. G0.5 已完成事項

### GitHub PR／Branch 清理

已關閉過時 SMT PR：`#2 #3 #4 #5 #6 #7 #8 #16 #18 #21 #26 #27`。

已關閉 Customer 舊 SMT Android PR：`#3`。

處理原則：

- `SUPERSEDED`
- `READ ONLY`
- `DO NOT MERGE`
- 保留歷史，不做破壞性刪除

### GitHub Actions 成本控制

已核對 Active Authority workflow，全部改為：

- `workflow_dispatch` only
- `permissions: contents: read`
- 無 `push`
- 無 `pull_request`
- 無 `schedule/cron`
- 無 bot commit／writeback
- 證據改用 artifact 保存

Admin：

- `.github/workflows/ci.yml`
- `.github/workflows/admin-validation-diagnostic.yml`
- `.github/workflows/work04-firebase-targeted.yml`

SMT：

- `.github/workflows/main-candidate-manual-gate.yml`
- `.github/workflows/printer-module-contract.yml`
- `.github/workflows/incoming-queue-contract.yml`

SMT PR `#20`、`#23` 沒有 workflow file。

### GitHub Repository Settings

已由控制台截圖確認多個 Repo：

- Workflow default permission：Read repository contents and packages
- GitHub Actions 不可自動建立／批准 PR
- Rulesets：未設定
- Classic branch protection：未設定
- 因此沒有舊 Required Status Check 卡住 merge

注意：沒有 branch protection 不等於理想長期治理，只代表 G0.5 沒有殘留舊 check blocker。G1 後期可另行設計，但不得在未盤點 workflow 名稱前直接加入。

### Cloudflare

SMT：

- Production branch：`main`
- Automatic production deployment：啟用
- Preview branches：`無（停用自動分支部署）`
- isolated module branch 不再自動建立 preview deployment

SMM：

- Git repository 已 Disconnect
- 保留歷史部署，不再因 Git push 自動 build／deploy

### Firebase

已確認：

- Realtime Database 已啟用
- Database：`morefunposos-default-rtdb`
- Region：`asia-southeast1`
- Authentication：Email／Password 已啟用
- Hosting：未啟用
- Functions：未啟用
- Firestore：未建立
- Storage：未啟用
- Extensions：未安裝
- Firebase Admin SDK service account：`firebase-adminsdk-fbsvc@morefunposos.iam.gserviceaccount.com`
- User-managed key：只有 1 把

RTDB Rules V2 已手動發布，核心加固包括：

- 根層 deny-by-default
- auditLogs append-only
- printer 角色限制至打印工作結果欄位
- presence 加入資料型別檢查
- staging staff 加入 active 檢查
- migration run 防重複建立及 schema validation

---

## 4. 遇到的坑

### 坑 1：只改 GitHub Actions，Cloudflare 仍會自動部署

現象：

- workflow 已改成 manual-only
- 但 Cloudflare Pages Git Integration 仍監聽 branch push
- SMT isolated module branch 被自動部署成 Preview
- superseded SMM 仍自動部署

成因：GitHub Actions trigger 與 Cloudflare Git Integration 是兩套獨立觸發系統。

成功方式：

- SMT 在 Cloudflare Branch Control 把 Preview branch 設為「無」
- SMM 直接 Disconnect Git repository
- 不要只看 `.github/workflows`

### 坑 2：Default branch 不等於 Development Authority

所有 Repo default branch 都是 `main`，但 Active Development Authority 可能是 PR branch。

成功方式：

- Authority 必須另寫矩陣
- 每次接手先讀 Authority Matrix
- 部署 branch、開發 branch、default branch 三者分開記錄

### 坑 3：控制台設定無法由 Repo 文件推斷

以下不能只靠程式碼判斷：

- Actions General permission
- Rulesets／Branch protection
- Cloudflare branch control
- Firebase Hosting／Functions 是否存在
- Service account key 數量

成功方式：

- 由 Owner 提供控制台截圖
- 每項以 PASS／BLOCKER／DEFERRED 記錄
- 不可用「應該」代替證據

### 坑 4：Firebase Admin SDK 範例不等於實際接入完成

`path/to/serviceAccountKey.json` 只是官方示例。它不能證明 key 已配置、Worker 已接入或安全完成。

成功方式：

- 不上傳 JSON key
- 只核對 service account 名稱、狀態、key 數量與日期
- key 不可放在前端或 GitHub

### 坑 5：RTDB Rules 有權限但缺少 schema validation

原 Rules 的多個 collection 只有 `.write`，缺少 `.validate`；printer 可寫整個 `printJobs`；audit log 可被覆寫。

成功方式：

- 根層 deny-by-default
- audit log append-only
- printer 使用欄位級 write
- presence／migration 加入型別與必要欄位驗證
- 發布前備份舊 Rules

### 坑 6：雙重角色 Authority

部分路徑使用 `staffProfiles/{uid}/role`，staging 路徑使用 `auth.token.morefunRole`。

風險：Custom Claim 更新有 token refresh 延遲；staff 被停用後舊 token 可能短暫有效。

處理：V2 先加入 active check。G1 應統一角色 Authority，不可長期維持兩套來源。

### 坑 7：私人 Repo Ruleset 提示容易誤判

GitHub 顯示私人個人 Repo ruleset 可能不被強制執行，除非升級到 Team organization。

成功方式：G0.5 不建立無效 ruleset；先完成 Authority 與 workflow 清理。日後如遷移 Organization 再正式建立保護規則。

---

## 5. 已證實有效的工作方式

1. 先建立 Authority Matrix，再處理 PR／branch。
2. 過時 PR 關閉但保留歷史，不刪 branch／commit 作為第一選擇。
3. 所有開發 workflow 先改 manual-only、read-only。
4. 結果以 artifact 保存，禁止 bot writeback。
5. GitHub、Cloudflare、Firebase 分開審核，不能互相推斷。
6. 外部控制台使用截圖作證據。
7. Firebase Rules 先備份、全量替換、發布後做 runtime smoke test。
8. 每個 milestone 同步 Jade Note、GitHub、Google Drive。
9. 無法驗證的項目明確標記 deferred，不得虛構 PASS。

---

## 6. G1 開始前禁止事項

- 禁止重新設計 MoreFunOS Architecture
- 禁止把 default branch 當成唯一 Authority
- 禁止恢復 push／PR／cron 自動 Actions
- 禁止重新連接 superseded SMM Cloudflare Git integration
- 禁止開啟 SMT 所有 branch Preview deployment
- 禁止把 Service Account JSON 放入 Repo、聊天或前端
- 禁止未測試就收緊 Rules 至令 Admin／SMT 無法運作
- 禁止直接 merge Customer PR #21
- 禁止把 Firebase Hosting 與 Cloudflare 同時設為同一前端的自動 deployment authority

---

## 7. G1 正確推進順序

1. Fresh Read：Master Authority、Development Must Read、Current Development Registry、Jade 最新 milestone、Active Repo current branch。
2. 驗證 RTDB Rules V2 runtime smoke test：
   - Admin login
   - SMT login
   - 讀取 businessRules
   - presence write
   - order create
   - printJob create／printer result update
3. Admin PR #1 完成 owner/staff auth、Firebase publish baseline。
4. SMT PR #34 作唯一 main candidate，逐一整合 #17／#20／#23／#24。
5. Customer PR #21 先 reconciliation，再決定保留內容。
6. SMM 只作 SMT mobile view／supporting surface，不恢復獨立核心。
7. 完成四端資料流：Admin publish → Firebase → SMT／SMM／Customer fresh read。
8. 完成店舖實際運行驗收：下單、接單、狀態、打印、失敗回復、離線／fallback。

---

## 8. 明確 Deferred 邊界

Owner 已批准暫時跳過未能提供的 Google Cloud 相關控制台證據，包括 Scheduler／Pub/Sub 等底層盤點。

這些項目不是已證實不存在，而是：

`DEFERRED BY OWNER — NOT A G1 START BLOCKER`

若 G1 引入 Functions、Scheduler、Pub/Sub、Cloud Run 或 Workload Identity，必須重新開啟審核。

---

## 9. 接手者第一句應確認

> 已 Fresh Read Authority。G0.5 基建清理完成；我不會重新設計 Architecture，不會恢復自動 Actions／Preview，不會把 superseded SMM 當獨立核心。下一步按 G1 Work Package 執行 RTDB V2 smoke test 與 Admin／SMT authority integration。
