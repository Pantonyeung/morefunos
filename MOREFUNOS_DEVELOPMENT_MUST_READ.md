# MoreFunOS｜每次開發必讀

> 狀態：CURRENT／唯一開發入口
> 更新：2026-08-09 HKT
> 正式 Authority：`Pantonyeung/morefunos` → `main`

本文件只保留立即接手所需精華。GitHub＝正式工程 Authority；Drive＝長期鏡像；Jade＝AI 導航。禁止建立第二套 Current。

## 1. Fresh Read 次序
1. 本文件。
2. `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`。
3. 對應 repo `AGENTS.md`／PRIMARY STANDARD／Current Domain Authority。
4. active PR 最新 head、Current Status／Current Handoff、diff、測試、部署及實機 evidence。
5. `MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`。

禁止用 default branch、舊對話、Drive／Jade 摘要、PR 標題或單一測試代替 Fresh Read。

## 2. 真相／證據
安全／資料完整／不可逆交易風險 → Master Authority → repo AGENTS／PRIMARY STANDARD → Ownership／Decision／Current Lock → Current Registry／Implementation Status／Code Map／MFKG／Change Impact → Owner 最新明確決定 → Drive／Jade 補充。

Evidence：`SOURCE_EXISTS → CONTRACT_PASS → FULL_REGRESSION_PASS → DEPLOYED → BROWSER_PASS → DEVICE_PASS → HARDWARE_PASS → STORE_PASS → PRODUCTION_ACCEPTED`。不可跨級。

## 3. 永久架構鎖
- Unified Menu Authority：`morefun/menu/v1/current`。
- Admin 擁有 Catalog／Published Config／Runtime Policy／Staff／Audit／Rollback Authority。
- Worker 係 protected mutation／repricing／revision／idempotency／audit 唯一入口。
- Firebase RTDB 係 Realtime Runtime／Order／Presence／Print Job Authority。
- SMT Register＋SMT Mobile 共用 Core；舊 `morefunos-smm` 只作 migration/history。
- Customer 只讀 Public Projection；正式 mutation 必須 availability gate。
- Android Host 負責硬件、離線、背景打印、診斷及打印結果。
- Google Sheet V2 只係 ledger/report/audit mirror。
- 模組 UI 只擁有 Experience／Presentation／Interaction；Business Truth 必須由 Runtime／Domain Contract 注入。

永久禁止第二 Store／State／Firebase／Worker／Payment／Print／Reporting／Native Bridge／Business Truth，亦禁止 DOM scan、MutationObserver、polling、`location.reload()` 修復及 client 直寫 protected RTDB。

## 4. Current Registry｜2026-08-09

### Project OS
- Repo：`Pantonyeung/morefunos`／`main`。
- 今日新增 Design Center Capability Map V1.0；只可作 UI capability map，唔改 Runtime Authority。

### A 線
- Admin：`Pantonyeung/morefunos-admin`。
- SMT／SMT Mobile：`Pantonyeung/morefunos-smt`。
- Customer：`Pantonyeung/morefun-ordering-web`。
- 舊 `morefunos-smm`：`SUPERSEDED AS INDEPENDENT CORE／MIGRATION SOURCE ONLY`。
- 今日未取得以上 A 線新 active evidence；任何施工前必須重新 fresh-read PR/head。

### Frozen B-Line
- PR #69／`feat/b12-ui-runtime-integration-matrix`／head `e9f558d9b87e681dd1d70e1c6477ca36f3d51cbd`／Draft。
- 禁止修改、force merge、overwrite。
- 可繼承已證明 baseline，但不得自動升格 P-Line 0.1.8 Device／Store evidence。

### P-Line｜現行 operational 主線
- Repo：`Pantonyeung/morefunos-platform-b`。
- Active：PR #73／`feat/p-line-fast-closure`／fresh head `e6024e620da1431443489a778b9b903b0150c6e0`／Draft。
- Current Authority：`docs/authority/CURRENT_MANDATORY_MORE_FUN_OS_P_LINE_CONSOLIDATED_AUTHORITY_V2.0.md`。
- Current Status：`knowledge-base/CURRENT_STATUS.md`；本次收口 commit `8ca8128ff49e74658c9286d69e2e5835943100ea`。
- Current Handoff：`docs/handoffs/CURRENT_HANDOFF_MORE_FUN_OS_P_LINE_FAST_CLOSURE_2026-08-07.md`；本次收口 commit `e6024e620da1431443489a778b9b903b0150c6e0`。

#### Current evidence
- P-Line 0.1.8 dependency reproducibility：CLOSED；tracked `pnpm-lock.yaml`＋frozen install。
- Reproducible Staging：**PASS**；GitHub Actions Run `31262524559` SUCCESS。
- Staging evidence只證明 Software Matrix＋Staging Candidate；**唔等於 Device／Operational／Store PASS**。
- P-Line UI Interface Freeze V1 final local contract closure：**38/38 test files、129/129 tests、Architecture Boundary、canonical runtime outputs PASS**。
- P-Line base目前唯一明確 deferred contract gap：`payment.refund`；禁止以 `void` 冒充 refund。
- Pre-Store Acceptance Preparation：**READY**。
- Operational最高：`PRE-STORE ACCEPTANCE PREPARATION READY`。
- **未完成**：P-Line 0.1.8 Device READY、O1–O9 live chain、10-order continuity、Recovery/Rollback、Store Acceptance、Production。

### Matrix UI｜平行 UI 工作域
- Repo：`Pantonyeung/morefun-osui-production`。
- Active Branch：`agent/ui-p-line-only-authority-v1`。
- Runtime Authority仍係 `morefunos-platform-b@feat/p-line-fast-closure`；UI 不得反向創造 Business Contract。
- `UI_INTERFACE_02_MATRIX_V0.1.json` 已形成 19 個 Capability Family，涵蓋 SMT／SMM／Admin／Customer／KDS／叫號副屏。
- Matrix 狀態係 `DRAFT_MATRIX_LOCK`；現有 `GAP／NEW_REQUIRED／REVIEW_NEW` 只係 UI→P-Line 集中 Backlog，未經 P-Line Contract 落地前禁止正式 wiring。
- 已排除：自家騎手／配送、採購、供應商、入庫、多倉調撥、多店總部深度、Payroll、Invoice。
- UI 下一 Gate：完成 19 組 Action／State／Permission／Interface 審核 → 去重成單一 P-Line Batch Interface Request。

## 5. 唯一 operational 優先事項
**返店後：`0.1.8 OTA Runtime Device READY → O1–O9 live operational chain → 10-order continuity → Recovery/Rollback → Store Acceptance`。**

唔需要 Build APK；OTA install成功亦唔等於 Device PASS。UI Matrix 可平行整理，但不得阻塞或覆蓋 operational closure。

## 6. 工作方法
`單一問題 → isolate → reproduce → 第一個 fatal evidence → root cause → minimal native-core fix → targeted verification → minimum regression → clean integration → one final gate`

修改前 checkpoint／rollback。過期 branch／head／run log 移 History；同一 Current 文件內禁止同時保留互相矛盾 evidence。

## 7. Pitfalls 索引
中央：`MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`。

今日特別禁止重犯：舊 head 冒充 current、Staging PASS 冒充 Device PASS、Current 文件上半部已 PASS但下半部仍寫 PENDING、UI Matrix candidate 被誤當 Runtime capability。