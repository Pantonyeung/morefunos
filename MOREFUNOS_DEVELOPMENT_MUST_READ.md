# MoreFunOS｜每次開發必讀

> 狀態：CURRENT／唯一開發入口
> 更新：2026-08-10 HKT
> 正式工程 Authority：`Pantonyeung/morefunos` → `main`

本文件只保留立即接手所需精華。GitHub＝正式工程 Authority；Google Drive＝結構化長期鏡像；Jade Note＝AI 導航。禁止建立第二套 Current／Handoff／Business Truth。

## 1. Fresh Read 次序
1. 本文件。
2. `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`。
3. 對應 repo `AGENTS.md`／PRIMARY STANDARD／Current Domain Authority。
4. active PR 最新 head、Current Status／Current Handoff、diff、tests、deploy、browser／device／hardware evidence。
5. `MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`。

禁止用 default branch、舊對話、Drive／Jade 摘要、PR 標題、Source Exists、單一 CI 或 HTTP 200 代替 Fresh Read。

## 2. 真相／證據優先序
安全／資料完整／不可逆交易風險 → Master Authority → repo AGENTS／PRIMARY STANDARD → Ownership／Decision／Current Lock → Current Registry／Implementation Status／Code Map／MFKG／Change Impact → Owner 最新明確決定 → Drive／Jade 補充。

Evidence：`SOURCE_EXISTS → CONTRACT_PASS → FULL_REGRESSION_PASS → DEPLOYED → BROWSER_PASS → DEVICE_PASS → HARDWARE_PASS → STORE_PASS → PRODUCTION_ACCEPTED`。不可跨級。

## 3. 永久架構鎖
- Admin：Published Business Policy／Catalog／Price／Channel／Print Business Policy／Staff／Audit／Rollback Authority。
- P-Line：Operational Coordination Runtime／MoreFunOS 靈魂／協調員；唔係中央 Business Approval Authority。
- Customer／SMT／SMM：喺 Published Policy＋Permission 內擁有 Endpoint Sovereignty；可以優化「點樣完成」，不可改寫「甚麼合法」或 authoritative price/result。
- Worker：protected mutation／server validation／repricing／revision／idempotency／audit 唯一正式入口。
- Firebase RTDB：Realtime Runtime／Order／Presence／Print Job Authority。
- SMT Register＋SMT Mobile 共用 Store Operations Core；舊 `morefunos-smm` 只作 migration/history。
- Android Host：Native／Hardware Host Shell；負責硬件、離線、背景打印、診斷、Native Bridge。
- Google Sheet V2：ledger/report/audit mirror，唔係 Runtime Truth。
- UI／Design Center：Presentation／Interaction／Module Composition；不得創造 Business Contract／Truth。

永久禁止第二 Firebase／Worker／Registry／Store／State／Pricing／Payment／Print／Reporting／Native Bridge／Business Truth，亦禁止 DOM scan、MutationObserver、polling、`location.reload()` 修復、client 直寫 protected RTDB、未證 Native gap 就 Build APK。

## 4. Current Registry｜2026-08-10

### Project OS
- Repo：`Pantonyeung/morefunos`／`main`。
- 本文件係唯一每次開發必讀；長歷史全部留 commit history／Pitfalls／repo-specific logs。

### A 線
- Admin：`Pantonyeung/morefunos-admin`。
- SMT／SMT Mobile：`Pantonyeung/morefunos-smt`。
- Customer：`Pantonyeung/morefun-ordering-web`。
- 舊 `morefunos-smm`：`SUPERSEDED AS INDEPENDENT CORE／MIGRATION SOURCE ONLY`。
- 今日未取得以上 A 線新 active evidence；施工前必須重新 fresh-read PR／branch／head。

### Frozen B-Line
- Repo：`Pantonyeung/morefunos-platform-b`。
- PR #69／`feat/b12-ui-runtime-integration-matrix`／frozen head `e9f558d9b87e681dd1d70e1c6477ca36f3d51cbd`。
- 禁止修改、force merge、overwrite；可引用已證 baseline，但不得自動升格成 P-Line Device／Store evidence。

### P-Line｜現行 operational 主線
- Repo：`Pantonyeung/morefunos-platform-b`。
- Active：PR #73／`feat/p-line-fast-closure`／fresh head `53579274897e58beeeda5f0833d8037cf944b6e7`／Draft。
- Highest Governance Authority：`docs/authority/CURRENT_MANDATORY_MORE_FUN_OS_P_LINE_GOVERNANCE_AND_ENDPOINT_SOVEREIGNTY_CHARTER_V1.0.md`。
- Consolidated Authority：`docs/authority/CURRENT_MANDATORY_MORE_FUN_OS_P_LINE_CONSOLIDATED_AUTHORITY_V2.0.md`。
- Current Status：`knowledge-base/CURRENT_STATUS.md`。
- Current Handoff：`docs/handoffs/CURRENT_HANDOFF_MORE_FUN_OS_P_LINE_FAST_CLOSURE_2026-08-07.md`。
- O5 Current Evidence：`docs/handoffs/MILESTONE_P_LINE_O5_PRINT_HARDWARE_OPEN_DEVICE_EVIDENCE_2026-08-09.md`。
- Release／OTA Pitfall Authority：`docs/authority/CURRENT_MANDATORY_MORE_FUN_OS_P_LINE_RELEASE_OTA_PITFALLS_AND_STARTUP_CHECKLIST_V1.0.md`。

#### Current evidence
- Runtime `0.1.14`：Owner 真機已見 O5 Printer Route Recovery UI；Device Runtime active observed。
- O5 Backend Print State-Machine：PASS，包括 deployed exact Print contract propagation、accepted Order、Receipt＋Label jobs、expired Claim recovery、Operations projection。
- O5 Physical Print：OPEN；未有 `Print Job → Native Host → 真實出紙 → confirmPrinted／verification writeback`，所以未可標 O5 Operational PASS。
- Historical hardware baseline：TCP/LAN physical print PASS、USB physical print PASS、SUNMI T2S built-in Owner-confirmed；Bluetooth DEFER／NON-BLOCKING。禁止重做已通硬件能力，只驗 operational wiring。
- O1–O9 Full Operational Chain：OPEN。
- 10-order Continuity：OPEN。
- Recovery／Rollback Store Acceptance：OPEN。
- Production：NOT PASS。

#### 2026-08-10 Owner-confirmed governance additions
- Payment／Production Release：有效 Store Staff 可做日常收款、Proof 核對、Split Payment、Refund；Production Release 按 Channel／Risk／Payment Context 決定，唔等於 Payment settled。
- Print：Admin 擁有 logical printer／product print policy；SMT／SMM 只做 local hardware binding／同 class failover。Reprint 同 Requeue／Order Amendment 必須分清。
- Completion：Completed＝Store Operationally Closed，唔冒充 Physical Pickup Evidence；歷史完成單只可追加 Recovery／Refund／Compensation／Remark Event。
- Reporting：Admin／Owner App 需 Live＋Historical Product／Category／Combo quantity、sales、ranking、mix，同跨日／月／年等進度比較；全部由正式 Order／Pricing／Payment Truth 派生。
- Availability：現階段明確 **No Inventory**；Live Availability 只回答「此刻賣唔賣得」。Daily Sold-out 下一 Business Day 自動恢復；Manual Stop 跨日保持。支援 Availability Group；紫米缺貨可批量停賣相關產品，但紫米沙律替代選項必須由 Customer／Staff 明確確認，禁止 Silent Replacement。

### Matrix UI｜平行 UI 工作域
- Repo：`Pantonyeung/morefun-osui-production`。
- Active PR #3／Branch `agent/ui-p-line-only-authority-v1`／head `868226f0ad3d803d1269bf8f6e41b4cc4489dd9b`／Draft。
- Runtime Authority仍係 P-Line；UI Repo只可做 Capability／Flow／Module／Surface／Prototype／Editor。
- 19個 Capability Family 已建立；`GAP／NEW_REQUIRED／REVIEW_NEW` 只係集中 backlog，唔等於 Runtime capability。
- 已排除：自家騎手／配送、採購、供應商、入庫、多倉調撥、多店總部深度、Payroll、Invoice；每日支出保留。

## 5. 唯一 operational 優先事項
**返店第一 Gate：`fresh canonical Order → Receipt／Label Print Jobs → Claim／Execute → existing Native Host → 真實實體出紙 → exact confirmPrinted／hardware verification writeback`。**

O5 真實出紙＋verification 完成前，禁止宣稱 O5／Store／Production PASS；亦禁止因 Browser／Worker／OTA 問題重做 APK。

UI Matrix 可平行開發，但不得阻塞、覆蓋或反向創造 P-Line Business Contract。

## 6. 開發方法
`Authority-first → single problem → isolate → reproduce → first fatal evidence → root cause → minimal native-core fix → targeted verification → minimum regression → clean integration → one final gate`

修改前 checkpoint／rollback。過期 branch／head／run／handoff 移 History；同一 Current 文件只可保留一套 branch／head／evidence／next step。

## 7. Change Impact 必查
任何改動先判斷會唔會影響：Admin Publish、Customer Projection、Order/Price Validation、Payment、Availability、SMT/SMM Shared Core、Print Jobs、Native Host、Offline、Reporting、Rollback。只重跑 affected scope；不可無理由全系統重做。

## 8. Pitfalls／Proven Solutions 索引
中央 canonical：`MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`。

目前特別禁止重犯：
- 舊 head／default branch 冒充 Current；
- Deploy／Health PASS 冒充 exact deployed contract；
- Test file exists 冒充 test executed；
- Software／Browser PASS 冒充 Device／Hardware／Store／Production PASS；
- Source Harness 同真正 deployed artifact 分叉；
- Availability alternative 做 Silent Replacement；
- UI Matrix candidate 冒充 Runtime capability。
