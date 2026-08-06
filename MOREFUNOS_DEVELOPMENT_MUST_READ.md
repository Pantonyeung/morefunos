# MoreFunOS｜每次開發必讀

> 狀態：CURRENT／唯一開發入口
> 更新：2026-08-06 HKT
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
- Customer 只讀 Public Projection；所有正式 mutation 必須 availability gate。
- Android Host 負責硬件、離線、背景打印、診斷及打印結果。
- Google Sheet V2 只係 ledger／report／audit mirror。
- 全端共用自適應 PWA 設計系統；固定尺寸只係驗收 Profile，禁止第二套 Render Path。

### 模組化 UI 軀幹鎖｜V1.2
- Current Mandatory：`morefunos-platform-b/knowledge-base/CURRENT_MANDATORY_MODULAR_UI_SHELL_STANDARD_V1.2.md`。
- Design Center 只擁有 Shell／Layout／Slot／Adaptive／Theme／Interaction；Capability Module 只擁有單一使命 UI。
- B 線或其他產品線透過 Runtime Manifest、Orchestrator、Canonical Store、Policy、Permission、Workflow、Host Adapter 注入商業靈魂。
- 正式路徑：`Product Line Runtime → Runtime Manifest → Module Registry → Shell Slots → Capability Modules → Domain Intent／Command → Canonical Result`。
- 現階段採用模組化單體前端；未達多團隊獨立部署條件前，禁止過早採用 Runtime Module Federation。
- 模組不得直寫 Firebase、直控 Printer／Android Host、保存第二 Business Truth 或互相私連。

禁止 bridge、第二套 state authority、DOM scan、MutationObserver、polling、`location.reload()` 修復、client 直寫 protected RTDB，以及用大量 CI 作 debug loop。

## 4. Current Registry｜2026-08-06 Fresh Read

### Project OS
- Repo：`Pantonyeung/morefunos`／`main`。
- Knowledge PR #4：Draft；未取代 main Authority。
- Design Authority PR #5：Draft；未取代 main Authority。

### A 線 Admin／Unified Menu
- Repo：`Pantonyeung/morefunos-admin`。
- Active：PR #22／`admin-preview-unified-menu-impl`／head `077c62015f6f77f5f3d7b0c1f7adc052280db465`。
- Evidence：Source＋targeted contract；部署／Browser／Device 未完成。

### A 線 SMT／SMT Mobile
- Repo：`Pantonyeung/morefunos-smt`。
- 供應 Runtime 延伸鏈：PR #34 → #35 → #36；最新已知 head `35a5283aa51d5ced8bd22b201bf4ac21e1227559`。
- Adaptive PWA：PR #37／head `82a76545003aeaaae4a1eb9f50e8992752d09916`／Draft。
- Browser／PWA／Device 未完成。

### A 線 Customer
- Repo：`Pantonyeung/morefun-ordering-web`。
- Draft PR #22／head `859335138d089ca50b10928f274d5ad22e7ba6a1`。
- Evidence：Source＋targeted contract；Preview／Safari／PWA／Device 未完成。

### Design Center
- Repo：`Pantonyeung/more-fun-disgen`／Draft PR #5。
- 可繼續做 Runtime-neutral Mission Module UI、1280×800、錯誤／離線／權限／返回／恢復。
- Production Adapter 暫停，直到 B 線 Device PASS＋Contract Stable＋Frozen Baseline。
- Design Center 不可成第二 Runtime／Business Authority。

### Platform B｜現行隔離主線
- Repo：`Pantonyeung/morefunos-platform-b`。
- Active PR：#69／`feat/b12-ui-runtime-integration-matrix`／fresh head `37be302cb156988af91df2264367da36828f0f53`／Draft。
- B11：`SOFTWARE RUNTIME CLOSED`。
- B12：四端 Adaptive UI／Runtime Matrix。
- B13：Android Host、SQLite、Offline／LAN、Bridge、Recovery、分拆 OTA。
- B14：Registry Worker、Stable Manifest、內容定址 Object、OTA Client、Audit／Rollback、Hardware Capability、Source Gate、Candidate Build。
- 固定 Hardware Candidate HC1：Source `421968e2e226a9b00f20cb80496c0c0f111a87ef`；APK／Artifact／SHA 已產出。
- Registry Deploy／Validate、Source Gate、Candidate APK Build：PASS。
- Device／Hardware：PENDING；Store／Production：NOT PASS。
- 最新 Mandatory UI Shell V1.2 commit：`b39a039318c76bbb5373b8ce9da27867d7e77447`。
- PR #69 累積大型變更並仍 Draft；不可強制合併，亦不可用 Build PASS 冒充真機 PASS。

### 舊 SMM／Core
- `morefunos-smm`：`SUPERSEDED AS INDEPENDENT CORE／MIGRATION SOURCE ONLY`。
- `morefunos-core`：空白；禁止為整理而建立空架構、空 schema、空 docs 或大量 CI。

## 5. 唯一優先事項
**固定 HC1，按 Device Acceptance Runbook Gate 1–9 真機驗收；第一個 FAIL 即停，只修第一個 Root Cause。Gate 1–7 全 PASS 先可稱 Device PASS；Gate 8–9 全 PASS 先可稱 Hardware PASS。**

Design Center 同步只做 Runtime-neutral Mission Module UI；禁止直接追逐 B 線內部實作或建立 Production Adapter。

## 6. 工作方法
`單一問題 → isolate → reproduce → 第一個 fatal evidence → root cause → minimal native-core fix → targeted verification → minimum regression → clean integration → one final gate`

修改前建立 checkpoint／rollback。新增文件必須取代、合併或直接被施工使用；過期 branch／head／run log 移入 History。

## 7. 永久踩坑索引
中央：`MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`。

今日禁止重犯：舊 Current 多份並存、PR head／main head 混淆、Source Gate 偷做 Build、私人 GitHub Raw 作 OTA、Node／Wrangler 版本不鎖、Health Check 循環自證、Build Artifact 冒充 Device／Hardware PASS。