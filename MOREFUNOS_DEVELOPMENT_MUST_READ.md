# MoreFunOS｜每次開發必讀

> 狀態：CURRENT／唯一開發入口
> 更新：2026-08-08 HKT
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

## 4. Current Registry｜2026-08-08 Fresh Read

### Project OS
- Repo：`Pantonyeung/morefunos`／`main`。
- GitHub 仍係正式工程 Authority；Drive 只作長期鏡像；Jade 只作 AI 導航。

### A 線
- Admin：`Pantonyeung/morefunos-admin`；今日未見新 commit evidence。
- SMT／SMT Mobile：`Pantonyeung/morefunos-smt`；今日未見新 commit evidence。
- Customer：`Pantonyeung/morefun-ordering-web`；今日未見新 commit evidence。
- 舊 `morefunos-smm`：`SUPERSEDED AS INDEPENDENT CORE／MIGRATION SOURCE ONLY`。
- A 線任何施工前仍必須 fresh-read active PR/head；禁止沿用歷史摘要。

### Platform B Frozen Baseline
- PR #69／`feat/b12-ui-runtime-integration-matrix`／fresh head `e9f558d9b87e681dd1d70e1c6477ca36f3d51cbd`／Draft。
- P-Line 明確禁止修改、force merge、overwrite 或回寫 B-Line mutable namespace。
- 可重用 frozen evidence：B14 OTA install／persistence／offline boot = `DEVICE PASS`；Receipt／Label／Cash Drawer／USB／SUNMI T2s built-in = `PHYSICAL HARDWARE PASS`；Bluetooth = `DEFERRED／NON-BLOCKING`。

### P-Line｜現行快速閉環主線
- Repo：`Pantonyeung/morefunos-platform-b`。
- Active：PR #73／`feat/p-line-fast-closure`／fresh head `3c8399a26b0bdeb3d2642f047f17538eb2c83cbb`／Draft／禁止 merge 作驗證 Gate。
- Master Authority：`docs/authority/CURRENT_MANDATORY_MORE_FUN_OS_P_LINE_MASTER_AUTHORITY_V1.1.md`。
- CURRENT HANDOFF：`docs/handoffs/CURRENT_HANDOFF_MORE_FUN_OS_P_LINE_FAST_CLOSURE_2026-08-07.md`。
- `knowledge-base/CURRENT_STATUS.md` 仍保存較早 implementation head `b82b5da...`，比 PR #73 head 落後 52 commits；因此 **PR head＋最新 QA evidence 優先，Current Status 需下一次 repo 施工同步更新**。

#### 已形成 Contract evidence
- Canonical P-Line OTA Runtime Entry source 已落地。
- Operational Verification Run #4：targeted contract＋architecture boundary PASS。
- Run #5：targeted contract、Firebase transaction boundary、P-Line namespace isolation、Reporting lifecycle、architecture boundary全部 PASS。
- 但 branch 無 `pnpm-lock.yaml`，Run #5 用 `--no-frozen-lockfile`；所以只可標 `TARGETED CONTRACT PASS／AFFECTED REGRESSION PASS`，**不可標 Reproducible Release Evidence**。

#### Staging candidate 狀態
- Package candidate：`0.1.7`；manual-only P-Line staging workflow source 已建立。
- Run #2：`SAFE PREFLIGHT FAIL`，原因係 staging API URL 被錯誤要求做人手 Environment variable；未有任何 registry mutation。
- Fix：由 canonical Wrangler deployment 輸出解析 Worker URL，再以 `/health` 驗 `line=P／environment=staging／namespace=p-line-staging`。
- Run #3：`SAFE DEPLOY TOOLCHAIN FAIL`；Wrangler 4.118.x 要求 Node >=22，而 workflow 用 project Node 20.11.1；Cloudflare mutation 前 fail-fast。
- 產品 runtime Node baseline保持不變；deployment CLI toolchain 已分離，最新 PR head將 staging workflow標準化到 Node 24。
- **截至 fresh read：未有成功 staging deploy evidence；NOT STAGING PASS／NOT DEVICE PASS／NOT STORE PASS。**

### P-Line Design Center｜平行 UI 軀幹工作域
- Jade／Drive 今日有獨立 CURRENT 紀錄，branch 名：`feat/p-line-design-center-visual-editor-v1`。
- 已有 Owner iPhone 部分實機 evidence：Fixed Toolbar／Canvas Zoom Boundary PASS；Interaction Target Group／Geometry 等後續 Source 持續更新。
- 呢條線只可改 Design Center／Prototype UI；禁止修改 SMT101 Cart、P-Line Runtime、Business Truth、Payment、Print、Firebase、Hardware Authority。
- GitHub connector 今日未能把 Jade 記錄嘅最新 Design Center SHA 對應到已知 MoreFunOS repo，故標記 `GAP／REQUIRES REPO RESOLUTION`；不可用 Jade SHA 冒充 GitHub Authority。

## 5. 唯一優先事項
**P-Line 主線：只處理下一個 staging candidate 第一根因，取得一次成功 `P-Line Staging Candidate Deploy`；未有 STAGING PASS 前禁止 OTA／Device／Store 宣稱，亦禁止以 OTA 作 debugger。**

Design Center 係獨立 UI 工作域，不可阻塞或覆蓋 P-Line operational closure。

## 6. 工作方法
`單一問題 → isolate → reproduce → 第一個 fatal evidence → root cause → minimal native-core fix → targeted verification → minimum regression → clean integration → one final gate`

修改前建立 checkpoint／rollback。新增文件必須取代、合併或直接被施工使用；過期 branch／head／run log 移入 History。

## 7. 永久踩坑索引
中央：`MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`。

今日特別禁止重犯：把 PR／Current Status 舊 head 當最新、把 targeted regression 冒充 release evidence、把缺少 staging variable 當 runtime bug、為 Wrangler 升級產品 Node baseline、用 OTA／Device 作部署 debugger。