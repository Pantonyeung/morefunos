# MoreFunOS｜Master Knowledge Authority

> Authority Level：A／GLOBAL GOVERNANCE
> Status：CURRENT
> Updated：2026-08-11 HKT
> Canonical Repo：`Pantonyeung/morefunos` → `main`

本文件只保存全系統治理、真相優先序、Current Registry 指向及跨域邊界。域內細節必須 Fresh Read active PR 最新 head＋Current Authority／Handoff；禁止將本文件快照當域內最新 Source Truth。

唯一每次開發入口：`MOREFUNOS_DEVELOPMENT_MUST_READ.md`。

## 1. 真相優先序
安全／資料完整／不可逆交易風險 → 本 Global Master → repo `AGENTS.md`／PRIMARY STANDARD → Domain Highest Authority → Ownership／Decision Ledger／Current Lock → Current Registry／Implementation Status／Code Map／MFKG／Change Impact → Owner 最新明確決定 → Drive／Jade 補充。

GitHub＝正式工程 Authority；Drive＝結構化長期鏡像；Jade＝AI 導航。三方衝突以 GitHub Fresh Read 為準。

## 2. Evidence Ladder
`SOURCE_EXISTS → CONTRACT_PASS → FULL_REGRESSION_PASS → DEPLOYED → BROWSER_PASS → DEVICE_PASS → HARDWARE_PASS → STORE_PASS → PRODUCTION_ACCEPTED`

禁止 Source／CI／HTTP 200／Preview／Deploy／OTA install 向上偷升 Evidence。

## 3. 全域責任邊界
- Admin：Published Business Policy、Catalog、Price、Channel、Print Business Policy、Staff／Permission、Audit、Rollback。
- P-Line：Operational Coordination Runtime／MoreFunOS 靈魂；負責 Driver×Key×Cargo×Handoff、Compatibility、Recovery、Result Propagation、完整營運鏈驗收；唔係中央 Business Approval Authority。
- Customer：Customer-safe projection、選餐、合法推薦、Checkout Intent；正式 mutation 必須 server-side validation。
- SMT Register＋SMT Mobile：同一 Store Operations Capability；Surface 可按 Published Policy＋Permission 優化流程，唔建立第二 Business Domain。
- Backend／Worker：protected mutation、final validation、repricing、revision、idempotency、audit 正式入口。
- Runtime Store／Database、Native Host、Hardware Adapter、Reporting Mirror 各自只可有一個正式責任來源。
- UI／Design Center：Presentation／Interaction／Module Composition；不得反向創造 Runtime／Business Contract。
- External SDK／Protocol／Open Source：只係可替換器官，必須經 Adapter／Anti-Corruption Boundary 接入，唔可以成為 MoreFunOS Business Truth。

## 4. 永久禁止
- 第二套 Firebase／Worker／Registry／Store／State／Pricing／Order／Payment／Print／Reporting／Native Bridge／Business Truth。
- Client 直寫 protected truth 或自行成為 authoritative pricing／order truth。
- Google Sheet／Apps Script 成為 Runtime Authority。
- DOM scan、MutationObserver、polling、`location.reload()`、iframe／redirect wrapper 掩蓋根因。
- 固定尺寸建立第二 UI／Store／Render Path。
- 因 Browser／Worker／舊 Test 問題無理由 Build APK。
- Secret／private key／password material／token 進 repo、Drive、Jade 或聊天。

## 5. Current Registry｜2026-08-11

### Project OS
- Repo：`Pantonyeung/morefunos`／`main`。
- Unique Must Read：`MOREFUNOS_DEVELOPMENT_MUST_READ.md`。
- Central Engineering Memory：`MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`。

### P-Line｜Current Product Mainline
- Repo：`Pantonyeung/morefunos-platform-b`。
- PR #73／`feat/p-line-fast-closure@6377dc2857f4add7c5c2c22212a363530fdd747b`／Draft。
- **Domain Single Highest Authority**：`docs/authority/CURRENT_MANDATORY_MORE_FUN_OS_P_LINE_MASTER_GOVERNANCE_EXECUTION_AND_EXTERNAL_FIRST_AUTHORITY_V1.1.md`。
- Greenfield Boundary：`docs/authority/CURRENT_MANDATORY_P_LINE_GREENFIELD_APP_REBUILD_BOUNDARY_V1.0.md`（正文 V1.1）。
- Current Handoff：`docs/handoffs/CURRENT_HANDOFF_MORE_FUN_OS_P_LINE_GREENFIELD_STORE_DAY_LIFECYCLE_2026-08-10.md`（正文 2026-08-11）。
- Repo Engineering Memory：`docs/authority/CURRENT_MANDATORY_MOREFUNOS_PITFALL_MOTHER_FILE_V1.0.md`＋carry-forward protocol。
- 舊 Governance Charter V1.0 已被 Master Governance V1.1 吸收並 `SUPERSEDED`。

#### Current Product Decision
2026-08-10 下午較新 Owner Decision正式取代朝早「NO RESTART／繼續舊 O5」施工語義：
- P-Line Greenfield 新 App 只繼承 Rules、Owner Decisions、Driver×Key×Cargo×Handoff、Pitfalls、Evidence Boundary、External-First。
- 舊 Source／Schema／Tests／Runtime只作 Historical／Requirement／Pitfall／Hardware Evidence Reference，唔構成新 App dependency。
- O1–O9／P0只作需求考古、Coverage、Acceptance 參考，唔反推新 Source。
- 每個完整能力模組採 `Owner-Review-First → Contract → External-First → Implementation → Regression／Compatibility`。

#### Current Evidence Boundary
- Task 1–7：歷史 GREEN baseline存在。
- Part 1 Store Lifecycle／Online Ordering Independence／Local-First：Owner已確認、Source已更新。
- Part 1 Owner Review 後完整 Regression／Compatibility：**PENDING**。
- Part 2–7 Owner Review：**OPEN**。
- Task 5 Payment flexibility、Task 6 manual／policy Production Release：已知需 compatibility adjustment。
- Task 8 Unified Physical Print Execution & Verification：**PAUSED**。
- Store／Production：**NOT PASS**。

### Frozen B-Line
- PR #69／`feat/b12-ui-runtime-integration-matrix@e9f558d9b87e681dd1d70e1c6477ca36f3d51cbd`／Draft／Frozen。
- 禁止修改、force merge、overwrite；只可作歷史 baseline／requirements reference。

### Legacy A-Line / Migration References
- Admin：`Pantonyeung/morefunos-admin`；Draft PR #22 `077c62015f6f77f5f3d7b0c1f7adc052280db465`，targeted source/contract only。
- SMT／SMT Mobile：`Pantonyeung/morefunos-smt`；Draft PR #37 `82a76545003aeaaae4a1eb9f50e8992752d09916`，Source only，Browser／Device pending。
- Customer：`Pantonyeung/morefun-ordering-web`；Draft PR #22 `859335138d089ca50b10928f274d5ad22e7ba6a1`，targeted contract only。
- 舊 `morefunos-smm`：`SUPERSEDED AS INDEPENDENT CORE／MIGRATION SOURCE ONLY`。
- Greenfield 生效後，上述 repo 不可自動變成新 App Source Authority。

### Matrix UI｜Parallel UI Domain
- Repo：`Pantonyeung/morefun-osui-production`。
- PR #3／`agent/ui-p-line-only-authority-v1@868226f0ad3d803d1269bf8f6e41b4cc4489dd9b`／Draft。
- UI只做 Capability／Flow／Module／Surface／Prototype／Editor；不得反向創造新 P-Line Business Contract。

## 6. Greenfield Development Invariant
新 App 第一責任係完整 Store Day Lifecycle：
`Open／Ready → Accept Order → Fulfil → Complete → Close → Persist／Reset → Next-Day Reopen`。

每個模組必須知道：Lifecycle位置、Driver、Key、Cargo、Handoff、Failure／Recovery、External Mature Candidate、Evidence Boundary。舊 filename／class／package／test 不可成為新 App Gate，除非有明確營運遷移需要。

## 7. Targeted Failure Protocol
`Authority-first → Owner review → Contract → External-First → isolate first fatal → root cause → minimal fix → targeted verification → affected regression → compatibility → clean integration → one final gate`

Deploy PASS ≠ Exact Runtime PASS；Health PASS ≠ Exact Contract PASS；Historical GREEN ≠ Owner Review後新版本 GREEN；Software PASS ≠ Device／Hardware／Store／Production PASS。

## 8. Current Unique Next Gate
**Owner 手動執行 `MoreFunOS P-Line｜唯一營運 Gate`，驗 Part 1 新 Contract＋Task 1–7 完整 Regression／Compatibility 全綠。**

成功前：不進 Part 2、不開 Task 8、不宣稱 Store／Production PASS；亦禁止因舊 O5／B15 historical failure 回頭重修舊 Source。

## 9. History Policy
舊 G／B／O5／B15 branch、PR、head、CI、QA、handoff、LOCKED／CURRENT 決策一律保留 replacement relationship；過期 Current 移 History／Archive／Superseded，唔塞入本 Master 正文。工程踩坑集中中央文件或 repo-specific Pitfall Mother／Targeted Failure Log。
