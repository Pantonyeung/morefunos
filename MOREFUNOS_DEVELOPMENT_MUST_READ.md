# MoreFunOS｜每次開發必讀

> 狀態：CURRENT／唯一開發入口
> 更新：2026-08-07 HKT
> 正式 Authority：`Pantonyeung/morefunos` → `main`

本文件只保留立即接手所需精華。Drive／Jade／舊 Handoff 只可作鏡像或歷史，禁止建立第二套 Current。

## 1. Fresh Read 次序
1. 本文件。
2. `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`。
3. 對應 repo `AGENTS.md`／Primary Standard／Current Domain Authority。
4. active PR 最新 head、Current Status／Current Handoff、diff、測試、部署及實機 evidence。
5. `MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`。

禁止用 default branch、舊對話、Drive 摘要、Jade checkpoint、PR 標題或單一測試代替 Fresh Read。

## 2. 真相及證據優先序
安全／資料完整／不可逆交易風險 → Master Authority → repo AGENTS／Primary Standard → Ownership／Decision／Current Lock → Current Registry／Implementation Status／Code Map／MFKG／Change Impact → Owner 最新明確決定 → Drive／Jade 歷史補充。

外部資料不得直接覆蓋 `LOCKED／CURRENT`；衝突標記 `GAP／CONFLICT／REQUIRES DECISION`。

Evidence：`SOURCE_EXISTS → CONTRACT_PASS → FULL_REGRESSION_PASS → DEPLOYED → BROWSER_PASS → DEVICE_PASS → HARDWARE_PASS → STORE_PASS → PRODUCTION_ACCEPTED`。不可跨級聲稱完成。

## 3. 永久架構鎖
- Unified Menu Authority：`morefun/menu/v1/current`。
- Admin：Catalog、Published Config、Runtime Policy、Staff、Audit、Rollback Authority。
- Worker：唯一 protected mutation、repricing、revision、idempotency、audit 入口。
- Firebase RTDB：Realtime Runtime／Order／Presence／Print Job Authority。
- SMT Register＋SMT Mobile 共用 Core；舊 `morefunos-smm` 只作 migration／history。
- Customer 只讀 Public Projection；正式 mutation 必須 availability gate。
- Android Host 負責硬件、離線、背景打印、診斷及打印結果。
- Google Sheet V2 只係 ledger／report／audit mirror。
- 全端共用自適應 PWA；固定尺寸只係驗收 Profile，禁止第二 Render Path。
- 模組 UI 只擁有 Shell／Layout／Slot／Adaptive／Theme／Interaction；商業靈魂必須由 Runtime Manifest／Orchestrator／Canonical Store／Policy／Workflow／Host Adapter 注入。

禁止 bridge duplication、第二套 state/business truth、DOM scan、MutationObserver、polling、`location.reload()` 修復、client 直寫 protected RTDB，以及用大量 CI 作 debug loop。

## 4. Current Registry｜2026-08-07 Fresh Read

### Project OS
- Repo：`Pantonyeung/morefunos`／`main`。
- Knowledge PR #4、Design Authority PR #5：Draft；未取代 main Authority。

### A 線
- Admin：`Pantonyeung/morefunos-admin`；現有 Preview／Unified Menu 工作無今日新 commit evidence。
- SMT／SMT Mobile：`Pantonyeung/morefunos-smt`；今日無新 commit evidence。
- Customer：`Pantonyeung/morefun-ordering-web`；今日無新 commit evidence。
- 舊 `morefunos-smm`：`SUPERSEDED AS INDEPENDENT CORE／MIGRATION SOURCE ONLY`。
- A 線任何舊 branch／PR/head 必須現場 fresh-read，禁止沿用歷史摘要。

### Design Center
- 只可做 Runtime-neutral Mission Module UI／Adaptive Shell。
- 不可建立第二 Runtime／Business Authority；Production Adapter 必須等待正式 Runtime／Device／Contract frozen evidence。

### Platform B｜現行隔離主線
- Repo：`Pantonyeung/morefunos-platform-b`。
- Active：PR #69／`feat/b12-ui-runtime-integration-matrix`／fresh head `a323ce345d0fbe7cc3090eb584e74698a92786da`／Draft。
- Current Status 已收口至 2026-08-07；Current Handoff：`docs/handoffs/CURRENT_HANDOFF_MORE_FUN_OS_B_LINE_ADMIN_CONTROL_PLANE_FULL_OPERATION_CHAIN_AUDIT_2026-08-06.md`。
- B14 OTA install／persistence／offline boot：`DEVICE PASS`；HC2 `0.1.0-b14-hc2`；Stable Release `b14-stable-0.1.0-18414e095a49`。
- B15 Source Gate #19：PASS；Mandatory Preflight、workspace install、root typecheck、A04～A11 targeted tests、Worker build graph：PASS。
- Cloudflare Worker staging `/health`：PASS。
- Worker → Firebase `b-line-staging` Published Config runtime read：PASS。
- 禁止擴大宣稱：Firebase Rules Deployment、Staff Runtime、Payment Runtime、Print Hardware、Google Sheet Write、Hardware、Store、Operational、Production 仍未 PASS。

### Platform B 現時第一缺口
Cloudflare Pages `/acceptance/b11` 曾只顯示舊 loader。Root Cause 係 Staff PIN Harness 寫咗 `src/index.ts`，但 Pages 真正部署 `public/acceptance/b11/index.html`，無 build step 連接兩者，形成 Source／Deployed Artifact 分叉。

Source 已修：
- static route Staff PIN Harness：`b772cfd6fc5c4c18f3f9c7cab3da33ba4a0bc097`
- deployed-route contract test：`c91f05ae275e44bcb01a4b07d208bdcffe768c93`
- Evidence：`SOURCE FIXED／AUTO-DEPLOY RECHECK PENDING`

Staging Published Config v7 另發現 U+FFFD `�` 資料污染；Validate 已加 `CORRUPTED_UNICODE_REPLACEMENT_CHARACTER` 防線。未知權威正確中文字前禁止猜字覆寫。

## 5. 唯一優先事項
**B15-A12-02R：確認 Cloudflare Pages 最新部署 → Browser 重驗 `/acceptance/b11/` → Staff PIN Runtime 驗收 → Staff Audit 403／Session／Firebase evidence。PASS 後先繼續 Reporting／Rules／OTA Hardware。**

## 6. 工作方法
`單一問題 → isolate → reproduce → 第一個 fatal evidence → root cause → minimal native-core fix → targeted verification → minimum regression → clean integration → one final gate`

修改前建立 checkpoint／rollback。新增文件必須取代、合併或直接被施工使用；過期 branch／head／run log 移入 History。

## 7. 永久踩坑索引
中央：`MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`。

今日特別禁止重犯：Current Status 落後 Current Handoff、Source Harness 與 deployed artifact 分叉、平行 Workflow Authority、把 Source／Gate／HTTP 200 冒充 Runtime／Device／Hardware／Production PASS。
