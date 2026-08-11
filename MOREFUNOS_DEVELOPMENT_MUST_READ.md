# MoreFunOS｜每次開發必讀

> 狀態：CURRENT／唯一開發入口
> 更新：2026-08-11 HKT
> 正式工程 Authority：`Pantonyeung/morefunos` → `main`

本文件只保留立即接手所需精華。GitHub＝正式工程 Authority；Google Drive＝結構化長期鏡像；Jade Note＝AI 導航。禁止建立第二套 Current／Handoff／Business Truth。

## 1. Fresh Read 次序
1. 本文件。
2. `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`。
3. 對應 repo `AGENTS.md`／PRIMARY STANDARD／Current Domain Authority。
4. active PR 最新 head＋Current Status／Current Handoff＋實際 tests／deploy／device／hardware evidence。
5. `MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`＋repo-specific Pitfall Mother／Targeted Failure Log。

禁止用 default branch、舊對話、Drive／Jade 摘要、PR 標題、Source Exists、單一 CI 或 HTTP 200 代替 Fresh Read。

## 2. 真相／證據優先序
安全／資料完整／不可逆交易風險 → Global Master Authority → repo AGENTS／PRIMARY STANDARD → Domain Highest Authority → Ownership／Decision／Current Lock → Current Registry／Implementation Status／Code Map／MFKG／Change Impact → Owner 最新明確決定 → Drive／Jade 補充。

Evidence：`SOURCE_EXISTS → CONTRACT_PASS → FULL_REGRESSION_PASS → DEPLOYED → BROWSER_PASS → DEVICE_PASS → HARDWARE_PASS → STORE_PASS → PRODUCTION_ACCEPTED`。不可跨級。

## 3. 永久架構鎖
- Admin：Published Business Policy／Catalog／Price／Channel／Print Business Policy／Staff／Audit／Rollback Authority。
- P-Line：Operational Coordination Runtime／MoreFunOS 靈魂／協調員；唔係中央 Business Approval Authority。
- Customer／SMT／SMT Mobile：喺 Published Policy＋Permission 內擁有 Endpoint Sovereignty；正式 mutation 必須由 Domain 再驗證。
- Worker／Backend：protected mutation／final validation／repricing／revision／idempotency／audit 正式入口。
- Runtime Store／Database、Native Host、Hardware Adapter、Reporting Mirror 都只可有一套正式責任來源；External SDK／Protocol 永遠只係可替換器官。
- UI／Design Center：Presentation／Interaction／Module Composition；不得創造 Business Contract／Truth。

永久禁止第二套 Firebase／Worker／Registry／Store／State／Pricing／Payment／Print／Reporting／Native Bridge／Business Truth；亦禁止 DOM scan、MutationObserver、polling、`location.reload()` 修復、client 直寫 protected truth、無 Native gap 就 Build APK。

## 4. Current Registry｜2026-08-11

### Project OS
- Repo：`Pantonyeung/morefunos`／`main`。
- 本文件係唯一每次開發必讀；長歷史留 commit history／Pitfalls／repo-specific logs。

### A-Line Legacy / Reference Domains
- Admin：`Pantonyeung/morefunos-admin`；最新仍見 Draft PR #22 `admin-preview-unified-menu-impl@077c62015f6f77f5f3d7b0c1f7adc052280db465`，證據只到 targeted source/contract，Deployment／Device pending。
- SMT／SMT Mobile：`Pantonyeung/morefunos-smt`；最新仍見 Draft PR #37 `agent/adaptive-pwa-window-contract-v1@82a76545003aeaaae4a1eb9f50e8992752d09916`，Source exists，Browser／PWA／Device pending。
- Customer：`Pantonyeung/morefun-ordering-web`；Draft PR #22 `feat/g1-customer-runtime-consumer-v1@859335138d089ca50b10928f274d5ad22e7ba6a1`，targeted contract pass，Deployment／Device pending。
- 舊 `morefunos-smm`：`SUPERSEDED AS INDEPENDENT CORE／MIGRATION SOURCE ONLY`。
- 以上舊線／舊 Source 由 Greenfield 邊界降級為 Historical／Requirement／Pitfall／Evidence Reference，唔可反向成為新 App Source dependency。

### Frozen B-Line
- Repo：`Pantonyeung/morefunos-platform-b`。
- PR #69／`feat/b12-ui-runtime-integration-matrix@e9f558d9b87e681dd1d70e1c6477ca36f3d51cbd`／Draft／Frozen。
- 禁止修改、force merge、overwrite。

### P-Line｜現行主線
- Repo：`Pantonyeung/morefunos-platform-b`。
- Active PR #73／`feat/p-line-fast-closure`／fresh head `6377dc2857f4add7c5c2c22212a363530fdd747b`／Draft。
- **唯一域內最高 Authority**：`docs/authority/CURRENT_MANDATORY_MORE_FUN_OS_P_LINE_MASTER_GOVERNANCE_EXECUTION_AND_EXTERNAL_FIRST_AUTHORITY_V1.1.md`。
- 舊 `CURRENT_MANDATORY_MORE_FUN_OS_P_LINE_GOVERNANCE_AND_ENDPOINT_SOVEREIGNTY_CHARTER_V1.0.md` 已被 V1.1 吸收並 SUPERSEDED。
- Greenfield Boundary：`docs/authority/CURRENT_MANDATORY_P_LINE_GREENFIELD_APP_REBUILD_BOUNDARY_V1.0.md`（正文 V1.1）。
- Current Handoff：`docs/handoffs/CURRENT_HANDOFF_MORE_FUN_OS_P_LINE_GREENFIELD_STORE_DAY_LIFECYCLE_2026-08-10.md`（正文已更新至 2026-08-11）。
- Repo Pitfall canonical：`docs/authority/CURRENT_MANDATORY_MOREFUNOS_PITFALL_MOTHER_FILE_V1.0.md`＋後續最低增量版本／carry-forward protocol。

#### Greenfield Current Decision
- 2026-08-10 下午較新 Owner Decision supersede 朝早「NO RESTART／繼續修舊 O5」路線。
- 新 App 只繼承 Rules、Owner Decisions、Driver×Key×Cargo×Handoff、Pitfalls、Evidence Boundary、External-First；舊 Source／Schema／Tests／Runtime 只作 Historical Reference。
- O1–O9／P0 保留作需求考古／Coverage／Acceptance 參考，唔再反推新 Source。
- 開發模式改為 **Owner-Review-First**：完整能力模組先展示真實店舖流程、人工彈性、異常／Fallback、輸入輸出、包含／不包含、External-First 候選；Owner 明確確認後先落 Contract／Source。

#### Current Greenfield evidence
- Task 1–7：已有歷史 GREEN baseline；唔等於 Owner Review 後新版本全部 PASS。
- Part 1 Store Lifecycle／Online Ordering Independence／Local-First：Owner 已確認＋Source 已更新。
- Part 1 新版本 **FULL REGRESSION／COMPATIBILITY EVIDENCE PENDING**。
- Task 5 Payment flexibility、Task 6 manual／policy Production Release 已知需要 Owner Review 後兼容校正。
- Task 8 Unified Physical Print Execution & Verification：**PAUSED**，禁止提早開發或以舊 O5 Physical Print Gate 冒充 Current。
- Store／Production：NOT PASS。

### Matrix UI｜平行 UI 工作域
- Repo：`Pantonyeung/morefun-osui-production`。
- PR #3／`agent/ui-p-line-only-authority-v1@868226f0ad3d803d1269bf8f6e41b4cc4489dd9b`／Draft；今日無 head 漂移。
- UI Repo只可做 Capability／Flow／Module／Surface／Prototype／Editor；不得反向創造新 P-Line Business Contract。

## 5. 唯一下一 Gate
**Owner 手動執行 `MoreFunOS P-Line｜唯一營運 Gate`：驗 Part 1 新 Contract＋Task 1–7 完整 Regression／Compatibility 全綠。**

未取得新 GREEN evidence 前：
- 不進 Part 2 實作；
- 不開 Task 8 Physical Print；
- 不宣稱 Greenfield Store／Production PASS；
- 不因舊 O5／B15 historical test／檔名失敗回頭修舊 Source。

## 6. 開發方法
`Authority-first → Owner review → Contract → External-First selection → isolate first fatal → minimal fix → targeted verification → affected regression → compatibility → clean integration → one final gate`

修改前 checkpoint／rollback。過期 branch／head／run／handoff 移 History；同一 Current 文件只可保留一套 branch／head／evidence／next step。

## 7. Change Impact 必查
任何改動先判斷會唔會影響：Store Lifecycle、Online Ordering、Local-First、Admin Publish、Customer Projection、Order／Pricing、Payment、Production Release、Availability、SMT／SMM Shared Core、Print、Native／Hardware、Offline／Recovery、Reporting、Close／Next-Day Reset。只重跑 affected scope＋必要 Compatibility；不可無理由重做全系統。

## 8. Pitfalls／Proven Solutions 索引
中央：`MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`。
P-Line Greenfield repo-specific：`docs/authority/CURRENT_MANDATORY_MOREFUNOS_PITFALL_MOTHER_FILE_V1.0.md`。

目前特別禁止重犯：舊 Authority／head 冒充 Current；舊 Source dependency 綁死 Greenfield；Payment Status 同 Production Release 綁死；能力模組過度碎片化；Runtime Contract PASS 冒充 Type／Compatibility／Device PASS；Local Store Operations 被 Internet／Customer Online Ordering 綁死；External SDK 反向成為 Business Truth。
