# MoreFunOS｜Master Knowledge Authority

> Authority Level：A／GLOBAL GOVERNANCE
> Status：CURRENT
> Updated：2026-08-10 HKT
> Canonical Repo：`Pantonyeung/morefunos` → `main`

本文件只保存**全系統不變治理、真相優先序、Current Registry 指向及跨域邊界**。域內細節必須 Fresh Read 對應 repo Current Authority／active PR 最新 head；禁止將本文件舊快照當作域內最新 source truth。

唯一每次開發入口：`MOREFUNOS_DEVELOPMENT_MUST_READ.md`。

## 1. 真相優先序
安全／資料完整／不可逆交易風險 → 本 Global Master Authority → repo `AGENTS.md`／PRIMARY STANDARD → Ownership／Decision Ledger／Current Lock → Current Development Registry／Implementation Status／Code Map／MFKG／Change Impact → Owner 最新明確決定 → Drive／Jade 補充。

域內 Current Authority 可以細化責任，但不可建立第二套全域 Business Truth、Firebase、Worker、Store、State、Payment、Print、Reporting 或 Native Bridge。

GitHub＝正式工程 Authority；Google Drive＝結構化長期鏡像；Jade Note＝AI 導航／快速檢索。三方衝突以 GitHub Fresh Read 為準。

## 2. Evidence Ladder
`SOURCE_EXISTS → CONTRACT_PASS → FULL_REGRESSION_PASS → DEPLOYED → BROWSER_PASS → DEVICE_PASS → HARDWARE_PASS → STORE_PASS → PRODUCTION_ACCEPTED`

禁止 Source／CI／HTTP 200／Preview／Deploy／OTA install 向上偷升 Evidence。

## 3. 全域正式責任
- **Admin**：Published Business Policy、Catalog、Product、Option、Combo、Price、Channel、Print Business Policy、Staff／Permission、Audit、Rollback。
- **P-Line**：Operational Coordination Runtime／MoreFunOS 靈魂／協調員；負責跨 Domain handoff、compatibility、recovery、operational chain acceptance，唔係中央 Business Approval Authority。
- **Customer**：Customer-safe projection、選餐、合法推薦／Upsell、Checkout Intent；正式 mutation 必須 server-side validation。
- **SMT Register＋SMT Mobile**：同一套 Store Operations Capability／Core；Surface 可按 Published Policy＋Permission 優化操作流程，唔建立第二 Business Domain。
- **Worker**：protected mutation、final validation、repricing、revision、idempotency、audit 正式入口。
- **Firebase RTDB**：Realtime Runtime／Order／Presence／Print Job Authority。
- **Android Host**：Native／Hardware Host Shell；硬件、離線、背景打印、診斷、Native Bridge。
- **Google Sheet V2**：ledger／report／audit mirror；唔係即時 Runtime Truth。
- **UI／Design Center**：Presentation／Interaction／Module Composition；不得反向創造 Runtime／Business Contract。

Surface 可以優化「如何完成」；不可改寫「甚麼合法」或「合法結果值多少」。Final Business Mutation 由相關 Domain 按 Published Policy／Permission／Current Operational State 重新驗證。

## 4. 永久禁止
- 第二套 Firebase／Worker／Registry／Store／State／Pricing／Order／Payment／Print／Reporting／Native Bridge／Business Truth。
- Customer／SMT／SMM client 直寫 protected RTDB 或自行成為 authoritative pricing／order truth。
- Google Sheet／Apps Script 成為 Runtime Authority。
- DOM scan、MutationObserver、global interception、polling、`location.reload()`、iframe／redirect wrapper 等補丁掩蓋根因。
- 固定尺寸建立第二套 UI／Store／Render Path；1920×1080、1280×800、手機／平板只係 Profile／Design Canvas。
- 因 Browser／Worker／OTA 問題 Build APK；只有 exact Native contract gap 經 Owner 批准先可改 Native。
- Secret／private key／password hash／salt／token 進 repo、前端、Drive、Jade 或聊天。

## 5. Current Registry｜2026-08-10

### Project OS
- Repo：`Pantonyeung/morefunos`／`main`。
- Unique Must Read：`MOREFUNOS_DEVELOPMENT_MUST_READ.md`。
- Engineering Memory：`MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`。

### A-Line repositories
- Admin：`Pantonyeung/morefunos-admin`。
- SMT／SMT Mobile：`Pantonyeung/morefunos-smt`。
- Customer：`Pantonyeung/morefun-ordering-web`。
- 舊 SMM：`Pantonyeung/morefunos-smm`＝`SUPERSEDED AS INDEPENDENT CORE／MIGRATION SOURCE ONLY`。
- A-Line 今日冇由本全域收口取得新 active evidence；任何施工必須 fresh-read repo PR／branch／head。

### Frozen B-Line
- Repo：`Pantonyeung/morefunos-platform-b`。
- PR #69／`feat/b12-ui-runtime-integration-matrix@e9f558d9b87e681dd1d70e1c6477ca36f3d51cbd`。
- Frozen；禁止修改／force merge／overwrite。

### P-Line｜Current Operational Mainline
- Repo：`Pantonyeung/morefunos-platform-b`。
- PR #73／`feat/p-line-fast-closure`／fresh head `53579274897e58beeeda5f0833d8037cf944b6e7`／Draft。
- **域內最高治理 Authority**：`docs/authority/CURRENT_MANDATORY_MORE_FUN_OS_P_LINE_GOVERNANCE_AND_ENDPOINT_SOVEREIGNTY_CHARTER_V1.0.md`。
- Current Status：`knowledge-base/CURRENT_STATUS.md`。
- Current Handoff：`docs/handoffs/CURRENT_HANDOFF_MORE_FUN_OS_P_LINE_FAST_CLOSURE_2026-08-07.md`。
- Consolidated Authority：`docs/authority/CURRENT_MANDATORY_MORE_FUN_OS_P_LINE_CONSOLIDATED_AUTHORITY_V2.0.md`。

Current evidence：
- `0.1.14` Device Runtime active：**OBSERVED**。
- O5 Backend Print State-Machine：**PASS**。
- O5 Physical Print：**OPEN**。
- O1–O9 Full Operational Chain：**OPEN**。
- 10-order Continuity：**OPEN**。
- Recovery／Rollback Store Acceptance：**OPEN**。
- Production：**NOT PASS**。

2026-08-10 Owner-confirmed governance已寫入同一 P-Line Highest Governance Authority，包括：
- Payment／risk-based Production Release／Refund／WhatsApp recovery／daily cash reconciliation；
- Print Business Policy／same-class failover／reprint-amendment／Ready timing；
- Completion／Pickup semantics／Customer Risk／immutable recovery／Live Reporting；
- Product／Category／Combo sales mix＋跨日／月／年等進度比較；
- **Live Availability-only／Daily Sold-out Reset／Manual Stop／Availability Group／No Inventory**。

詳細內容只以該域內 Highest Governance Authority 最新 branch/head 為準；本 Master 唔複製全文。

### Matrix UI｜Parallel UI Domain
- Repo：`Pantonyeung/morefun-osui-production`。
- PR #3／`agent/ui-p-line-only-authority-v1@868226f0ad3d803d1269bf8f6e41b4cc4489dd9b`／Draft。
- P-Line 仍係 Runtime／Business Contract Authority；UI 只做 Capability／Flow／Module／Surface／Prototype／Editor。
- `GAP／NEW_REQUIRED／REVIEW_NEW` 只係 backlog，唔等於 Runtime capability。

## 6. Operational Chain Identity
完整鏈以「Driver／Key／Cargo／Handoff／Next Driver／Recovery／Evidence」表達。P-Line 負責協調，唔係每段唯一 Driver。

所有正式 Order 最終只進一套 Order Truth；Payment、Print、Availability、Reporting、Shared Workspace 各自有單一責任來源。歷史完成事件不得 Silent Rewrite，只可追加 Recovery／Refund／Compensation／Adjustment Evidence。

## 7. Targeted Failure Protocol
`Authority-first → isolate → reproduce → first fatal evidence → root cause → minimal native-core fix → targeted verification → minimum regression → clean integration → one final gate`

CI 紅燈先分 Fail Layer；Deploy PASS ≠ Exact Runtime PASS；Health PASS ≠ Exact Contract PASS；Test file exists ≠ Test executed。

## 8. Change Impact
修改前必查：Admin Publish、Customer Projection、Order／Pricing、Payment、Availability、SMT／SMM Shared Core、Print Jobs、Native Host、Offline／Recovery、Reporting、Rollback。

只重跑 affected scope；禁止因治理文件更新、UI 改版或單一 Toolchain failure 無理由重跑／重建全系統。

## 9. Current Unique Next Gate
**P-Line O5 Physical Print：`fresh canonical Order → Receipt／Label Print Jobs → Claim／Execute → existing Native Host → 真實實體出紙 → exact confirmPrinted／hardware verification writeback`。**

成功前禁止 O5／Store／Production PASS；成功後先按 affected scope 推進 Kitchen／Production／Packing 真實 Print Policy 同後續 O1–O9。

## 10. History Policy
舊 G0／G1／G2、B7／B10／B11／B12／B14／B15 階段 Registry、舊 branch／PR／head／CI／QA／handoff 一律由 Git history、repo-specific history、Drive Archive、Jade archived notes追溯，唔再塞入本 Master 正文。

舊 LOCKED／CURRENT 決策不可消失；新決策以 `SUPERSEDED`／replacement relationship 保留追溯。工程踩坑集中 `MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md` 或 repo-specific canonical log。
