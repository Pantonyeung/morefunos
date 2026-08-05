# MoreFunOS｜每次開發必讀

> 狀態：CURRENT／唯一開發入口
> 更新：2026-08-05 HKT
> 正式 Authority：`Pantonyeung/morefunos` → `main`

本文件只保留立即接手所需精華。Drive／Jade／舊 Handoff 只可作鏡像或歷史，禁止建立第二套 Current。

## 1. Fresh Read 次序
1. 本文件。
2. `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`。
3. 對應 repo `AGENTS.md`／Primary Standard／Current Domain Authority。
4. active PR 最新 head、diff、測試、部署及實機 evidence。
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
- Customer 只讀 Public Projection，Product／Cart／Checkout／Reorder／Submit 必須 availability gate。
- Android Host 負責硬件、背景打印、診斷及打印結果。
- Google Sheet V2 只係 ledger／report／audit mirror。
- 全端共用自適應 PWA 設計系統；固定尺寸只係驗收 Profile，禁止第二套 Render Path。

禁止 bridge、第二套 state authority、DOM scan、MutationObserver、polling、`location.reload()` 修復、client 直寫 protected RTDB，以及用大量 CI 作 debug loop。

## 4. Current Registry｜2026-08-05 Fresh Read

### Project OS
- Repo：`Pantonyeung/morefunos`／`main`。
- Knowledge PR #4：Draft，文件治理骨架，未取代 main Authority。
- Design Authority PR #5：`agent/morefunos-design-authority-v1`／head `ee90220a27f535e4aead9e840d4a91bccaa7e387`／Draft。
- 今日 Pitfalls 收口 commit：`1d3a917d719da02ea38717d7061d3f0dd75e72e8`。

### A 線 Admin／Unified Menu
- Repo：`Pantonyeung/morefunos-admin`。
- Active：PR #22／`admin-preview-unified-menu-impl`／head `077c62015f6f77f5f3d7b0c1f7adc052280db465`。
- PR #19／#20／#21 仍係並行 Draft，未證明已進入 #22。
- Evidence：Source＋targeted contract；部署／Browser／Device 未完成。

### A 線 SMT／SMT Mobile
- Repo：`Pantonyeung/morefunos-smt`。
- 供應 Runtime 延伸鏈：PR #34 → #35 → #36；最新 head `35a5283aa51d5ced8bd22b201bf4ac21e1227559`。
- 新自適應 PWA Window Contract：PR #37／`agent/adaptive-pwa-window-contract-v1`／head `82a76545003aeaaae4a1eb9f50e8992752d09916`／Draft。
- PR #37 只達 Source；Portrait 解鎖、Shell／Order／Checkout CSS、Browser／PWA／Device 仍未完成。

### A 線 Customer
- Repo：`Pantonyeung/morefun-ordering-web`。
- Draft PR #22／`feat/g1-customer-runtime-consumer-v1`／head `859335138d089ca50b10928f274d5ad22e7ba6a1`。
- Evidence：Source＋targeted contract；完整 diff reconciliation、Preview、Safari／PWA cold start、Device 未完成。

### Design／UI 實驗線
- Repo：`Pantonyeung/more-fun-disgen`。
- SMT-101 目前只可視為 UI／Design Contract 工作；不可成 Runtime Authority。
- 最新 Jade evidence：點單本地 UI、Session State、Checkout 高峰版面已達 Source／Cloudflare Build；正式 Menu、Pricing、Payment、Order Mutation、Print、Hardware 仍 `RUNTIME_UNKNOWN`。
- UI 示範價格／產品／狀態不可寫回正式營運資料。

### Platform B｜現行隔離重建線
- Repo：`Pantonyeung/morefunos-platform-b`。
- `main`：`bcb4504c715c163a8387ebed691ca741ca0eb06e`。
- B11 Full Runtime Runner V2：PR #68 已合併；兩次完整 PASS，狀態 `SOFTWARE RUNTIME CLOSED`。
- 已證明：Customer 建單、Worker authoritative repricing、Published Config v6、Firebase persistence、SMT／SMM／Admin 同單、Tracking／Reload、Wrong Token Reject、Transport Recovery、Idempotency Replay、Stale Revision Reject、Snapshot、Audit。
- Active B12：PR #69／`feat/b12-ui-runtime-integration-matrix`／head `b22d69e860ee8dcbe0f2095f1ba33aa1f7e34f2`／Draft。
- B12 已有 Adaptive UI Profile、SMT／SMM Runtime UI、Offline／LAN source；Customer Runtime UI 部署驗證中，Admin 正式 Runtime 未完成。
- Hardware、APK、SQLite、LAN 全斷網、打印、主備 SMT 實機：`DEFERRED`；Store Ready：`NOT PASS`。

### 舊 SMM／Core
- `morefunos-smm`：`SUPERSEDED AS INDEPENDENT CORE／MIGRATION SOURCE ONLY`。
- `morefunos-core`：空白；禁止為整理而建立空架構、空 schema、空 docs 或大量 CI。

## 5. 唯一優先事項
**Platform B：完成 Customer Runtime UI CI／Deploy，之後建立最小 Admin Runtime Contract＋多裝置 UI，再做四端同單回歸。**

A 線保持隔離，未完成 Unified Menu＋F4 Supply 真實跨端驗收前，不得覆蓋 B 線或 Production。

## 6. 工作方法
`單一問題 → isolate → reproduce → 第一個 fatal evidence → root cause → minimal native-core fix → targeted verification → minimum regression → clean integration → one final gate`

修改前建立 checkpoint／rollback。新增文件必須取代、合併或直接被施工使用；過期 branch／head／run log 移入 History。

## 7. 永久踩坑索引
中央：`MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`。

今日禁止重犯：HTTP 200／Mock 冒充閉環、Display ID／Runtime ID 混淆、遺漏 configVersion、用 Public Projection 驗內部 Audit、非法 `ready→ready`、Offline Replay 次序錯誤、舊 Current Handoff 未封存。