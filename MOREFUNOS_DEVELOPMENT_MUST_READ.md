# More FunOS｜每次開發必讀／必須遵守

> 狀態：CURRENT / MUST READ BEFORE ANY DEVELOPMENT
> 更新：2026-07-30 18:42 HKT
> 正式 Authority：`Pantonyeung/morefunos` → `main`
> GitHub＝正式工程 Authority；Google Drive＝長期鏡像；Jade Note＝AI 接手導航。

## 1. 真相優先序

安全／資料完整／不可逆風險 → `MOREFUNOS_MASTER_CONTROL_AUTHORITY.md` → 本文件＋Current Registry＋Low Cost CI → repo `AGENTS.md`／PRIMARY STANDARD → Ownership／Decision／Current Lock／Change Impact → active branch／PR／head evidence → 最新產品明確決定 → Drive／Jade。

外部 Apple／Android／Web／OWASP／硬件資料只作校驗與 Gap，不直接覆蓋 LOCKED／CURRENT。

## 2. 每次開工必讀順序

1. `MOREFUNOS_MASTER_CONTROL_AUTHORITY.md`
2. `MOREFUNOS_DEVELOPMENT_MUST_READ.md`
3. `MOREFUNOS_CURRENT_DEVELOPMENT_REGISTRY.md`
4. `MOREFUNOS_LOW_COST_CI_DEVELOPMENT_PROTOCOL_V1.0.md`
5. `MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`
6. 對應 repo 最新 `AGENTS.md`
7. PRIMARY STANDARD／Ownership Registry／Decision Ledger／Current Lock
8. Change Impact／Pitfalls／Current Handoff／Context Min
9. active branch／PR／head 的 Status／Code Map／MFKG／QA evidence

未讀完，禁止修改、建立新 CI、合拼或宣稱完成。

## 3. 四端正式定義

- **Admin**：產品、價格、套餐、售罄、Draft／Published／Runtime、Firebase Auth／Role／Rules／Publish／Audit／Recovery Authority。
- **Customer**：只讀 Published／Runtime Snapshot；負責顧客 UI、會員、選餐、優惠及 Order API 提交；不得自行定價。
- **SMT Application**：`register`／`mobile` 共用 Domain、State、Cart、Pricing、Checkout、Order、Payment、Sync、Permission、Audit、Recovery、API Contract。
- **SMT Android Host**：Kiosk、WebView、Native Bridge、LAN／SUNMI／Label printing、Offline Queue、Recovery、Runtime／APK OTA、診斷及設備能力。
- 舊 `morefunos-smm`：`SUPERSEDED AS INDEPENDENT CORE`，只作遷移來源／歷史封存。

## 4. Current Development｜2026-07-30 18:42 HKT

### Admin｜G1
- Repo：`Pantonyeung/morefunos-admin`
- Branch：`feat/admin-p0-full-connect-v1`
- PR #1：Draft／Open／Mergeable
- 最新 fresh-read head：`2835ce268160c892f1582964ff608bc12371a754`
- Historical verified head：`a4236c3d3314fd6557261dc34718c5ee778cfb83`（已被現役 PR 後續授權 commits 取代；不得還原）
- Evidence：Code／Contract；Live Firebase Publish 閉環未完成。
- Authority reconciliation：Active PR 在 Registry snapshot 後持續接收授權實作 commits；中央 Authority 已於 2026-07-30 18:42 HKT 對齊實際 PR head。
- 最新補充：WORK04G Mobile Menu 已整合，merge commit `9fe2935be47e262c16a08c7d0a494688bdbd7b07`，只代表該 UI flow 4／4 Human Preview PASS，唔代表 G1 完成。

### Customer｜G2
- Repo：`Pantonyeung/morefun-ordering-web`
- 已知 PR #21／head `031e7a60b95e0413678b7da3439dca0abcad5c24`
- PR 較舊且 main 有後續 uploads；未 reconciliation 前，兩邊都唔係最終 Authority。

### SMT Runtime／Offline Baseline
- Base：`smt-functional-completeness-v1`
- PR #30 已合併；merge `7e990adc7b8f7db3499b59c43636c1251603019b`
- Evidence：Targeted 3／3＋Browser 81／81 PASS；只代表 Software／Browser。

### SMT Main Candidate
- Branch：`smt-main-candidate-v1`
- PR #34：Draft／Open／Mergeable
- PR head：`4937ea2efb5c149644fb51287ab6a1adc919563c`
- Software Gate verified head：`9bad3a9c40d21a30b114824820ba3de8214a7b05`
- Run `30505574564`／Artifact `8745190934`：Static／Kotlin compile／debug unit tests／software contracts PASS。
- `DEFERRED — HARDWARE UNAVAILABLE`：SUNMI 實體打印、Package Installer／APK OTA 實機、Production signing／release E2E。

### SMT 其他 Domain
Printer／Required／Incoming Queue／Recovery 仍只係 Domain／Contract evidence，未有完整 Browser／Device／Store evidence。

### WORK03
`TEST_WORK03_UNIFIED_LOGIN → Session／Bootstrap → Push／Pull → Heartbeat → Fallback` 已 `SUPERSEDED / DO NOT CONTINUE`。

現役替代：Firebase Auth＋Firebase RTDB＋Cloudflare Worker＋Google Sheet V2 ledger。舊 WORK03 只作 migration／contract reference。

## 5. 永久禁止

- default branch 代表所有 domain。
- 第二套 SMM／Cart／Pricing／Checkout／Order／Sync／Print truth。
- Customer／SMT 自行重新計價；Google Sheet 作即時 Order Truth。
- SMT Mobile 直接控實體打印機。
- Adaptive 當 Scale；單尺寸永久 patch。
- `!important`／override／Observer／DOM scan 掩蓋 Authority 根因。
- Software／Contract／Browser PASS 當 Device／Store／Production PASS。
- 文件更新觸發 full CI；單一問題反覆跑完整 CI。

## 6. Targeted Failure／低成本流程

`單一問題 → isolate → reproduce → root cause → minimal fix → targeted verification → minimum regression → integration branch → one final gate`

每條問題分支只處理一個問題或 Contract boundary；同一 commit 已有可重現 PASS，禁止無目的重跑。

## 7. Evidence Level

`CODE_EXISTS → CONTRACT_PASS → BROWSER_PASS → DEVICE_PASS → STORE_PASS → PRODUCT_LOCKED`

禁止跨級宣稱完成。

## 8. 開發前固定檢查

必須寫清：Gate／Domain／repo／branch／PR／head、唯一 Authority、可重現證據、影響端口、第二 Authority／cache／build key、不可逆風險、Targeted Test、回滾點、Evidence 目標、三方同步。

## 9. 已完成／未完成／延後

**已證明**：中央 Authority、Adaptive Browser 78／78、Runtime／Offline Browser 81／81、Main Candidate Software Gate、Targeted Failure／Low Cost CI。

**未完成**：Admin Live Firebase Publish、Customer reconciliation／Unified Consumer Adapter、正式 Order API／重計價／Idempotency／原子派號、Customer→SMT Intake、跨 repo Gate dashboard。

**Hardware Deferred**：SUNMI／LAN／Label 真實紙張、APK OTA 實機、Production release E2E、斷網／斷電／多日／多機／Store Acceptance。

## 10. Pitfalls／成功方法索引

中央：`MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`。

Repo 特定：SMT `SMT_ENGINEERING_SUCCESS_AND_PITFALLS`／`SMT_TARGETED_FAILURE_LOG`／`SMT_CHANGE_IMPACT`；Admin `ADMIN_PITFALLS_LOG` 及 WORK04 targeted logs；Customer 以最新 repo handoff／pitfalls 為準。

## 11. Gap／Conflict

- Customer Authority 未 reconciliation。
- SMT MFKG 曾落後 D-053／mobile／APK／Adaptive evidence；修改前必須 fresh-read。
- Hardware unavailable；禁止以 Software PASS 代替。

## 12. 下一步唯一優先事項

**G1 Admin Firebase Publish 真閉環**：以 Admin PR #1 最新 head，取得 Auth、Claims、Rules、Draft／Runtime／Publish／Audit／Recovery 真實 read/write evidence。
