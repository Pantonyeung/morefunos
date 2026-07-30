# More FunOS｜每次開發必讀／必須遵守

> 狀態：CURRENT / MUST READ BEFORE ANY DEVELOPMENT
> 更新：2026-07-30 10:15 HKT
> 正式 Authority：`Pantonyeung/morefunos` → `main`
> 本文件整合中央 Authority、Current Development Registry、各端正式規格、Change Impact、Decision／Handoff、Google Drive 長期文件與 Jade Note 接手索引。GitHub 係正式工程 Authority；Google Drive 係結構化長期文件／鏡像；Jade Note 係 AI 接手記憶／導航。

## 1. 最高 Authority 與真相優先序

1. 安全、資料完整、付款／訂單／打印等不可逆風險。
2. `MOREFUNOS_MASTER_CONTROL_AUTHORITY.md`。
3. 本文件＋`MOREFUNOS_CURRENT_DEVELOPMENT_REGISTRY.md`＋`MOREFUNOS_LOW_COST_CI_DEVELOPMENT_PROTOCOL_V1.0.md`。
4. 對應 repo 最新 `AGENTS.md`、PRIMARY STANDARD、Ownership Registry、Decision Ledger、Current Lock、Change Impact。
5. 對應 active branch／PR／head SHA 的 Implementation Status、Code Map、MFKG、QA／CI／Device evidence。
6. 產品負責人在目前工作中的最新明確決定，但不得默認推翻更高層 LOCKED／CURRENT。
7. Google Drive／Jade Note 歷史、摘要與補充資料。

外部 Apple／Android／Web／OWASP／硬件官方標準只用作校驗、Gap Analysis 及風險提示；不得直接覆蓋 More Fun LOCKED／CURRENT。

## 2. 四端正式定義

- **Admin Control Plane**：`Pantonyeung/morefunos-admin`。產品、價格、套餐、售罄、公告、Draft／Published／Runtime、Firebase Auth／Role／Rules／Publish／Audit／Recovery Authority。
- **Customer Experience**：`Pantonyeung/morefun-ordering-web`。只讀 Published／Runtime Snapshot，負責顧客 UI、會員、選餐、優惠及 Order API 提交；不得自行定價或成為 Order Authority。
- **SMT Application**：`Pantonyeung/morefunos-smt`。`register`／`mobile` 兩個 UI Profile，共用 Domain、State、Business Rule、Cart、Pricing、Checkout、Order、Payment、Sync、Permission、Audit、Recovery、API Contract。
- **SMT Android Host／Hardware Plane**：隸屬 SMT repo。負責 Kiosk、WebView、Native Bridge、LAN／SUNMI／Label printing、Offline Queue／SQLite／Recovery、Runtime／APK OTA、診斷及設備能力。
- `Pantonyeung/morefunos-smm` 已 `SUPERSEDED AS INDEPENDENT CORE`，只可作遷移來源／歷史封存。

## 3. 每次開工強制閱讀順序

1. `MOREFUNOS_MASTER_CONTROL_AUTHORITY.md`
2. `MOREFUNOS_DEVELOPMENT_MUST_READ.md`
3. `MOREFUNOS_CURRENT_DEVELOPMENT_REGISTRY.md`
4. `MOREFUNOS_LOW_COST_CI_DEVELOPMENT_PROTOCOL_V1.0.md`
5. 對應 repo 最新 `AGENTS.md`
6. 對應 PRIMARY STANDARD／Ownership Registry／Decision Ledger／Current Lock
7. 對應 Change Impact／Pitfalls／Current Handoff／Context Min
8. 對應 active branch／PR／head SHA 的 Implementation Status／Code Map／MFKG／QA evidence
9. 相關 Google Drive 長期文件及 Jade Note pinned 鏡像，只作補充／接手導航

未讀完，禁止修改程式、建立新 CI、合拼、宣稱完成或更新 LOCKED／CURRENT。

## 4. Current Development Authority｜2026-07-30 10:15 HKT

### Admin｜G1 Admin Firebase Publish
- Repo：`Pantonyeung/morefunos-admin`
- Branch：`feat/admin-p0-full-connect-v1`
- PR：`#1` Draft／Open／Mergeable
- 最新 fresh-read head：`a4236c3d3314fd6557261dc34718c5ee778cfb83`
- Evidence：Code／Contract；Live Firebase 未完成。
- 未完成：Auth／Claims、Rules deployment、真實 Draft／Runtime／Publish／Audit／Recovery、Published Seed。

### Customer｜G2 Unified Consumer Adapter
- Repo：`Pantonyeung/morefun-ordering-web`
- 已知 branch：`agent/customer-pwa-firebase-cleanup-v1`
- PR：`#21` Draft／Open／Mergeable=false
- Head：`031e7a60b95e0413678b7da3439dca0abcad5c24`
- 警告：PR 較舊，default branch 有後續手機 uploads；未 reconciliation 前，PR #21 或 main 都不得單獨當最終 Authority。

### SMT Runtime／Offline Baseline
- Repo：`Pantonyeung/morefunos-smt`
- Base：`smt-functional-completeness-v1`
- PR #30 已於 2026-07-29 合併。
- Merge commit：`7e990adc7b8f7db3499b59c43636c1251603019b`
- Evidence：Targeted 3／3 PASS；Full Browser Matrix 81／81 PASS；0 failure／0 flaky。
- 邊界：Runtime／Offline software＋Browser only；不代表 Firebase／Device／Store。

### SMT Main Candidate｜最新整合線
- Candidate：`smt-main-candidate-v1`
- Draft PR：`#34`，Open／Mergeable
- PR current head：`4937ea2efb5c149644fb51287ab6a1adc919563c`
- Software Gate verified code head：`9bad3a9c40d21a30b114824820ba3de8214a7b05`
- Gate：Run `30505574564`／Job `90754516056`／SUCCESS
- Artifact：`8745190934`；digest `sha256:9e17352b81049b9c67787f17d114e3ab9812d7c56af9820a0cb7dc6e81b35b1a`
- 已整合：Runtime／Offline Authority、APK OTA signed manifest、anti-replay／anti-downgrade、Package Installer coordinator、Boot／package-replaced／runtime-health recovery、Native Bridge OTA／diagnostics、Reflective SUNMI binding、NativePrintService／SunmiPrintDriver static integration。
- Evidence：Static／Kotlin compile／debug unit tests／software contracts PASS。
- **Hardware Deferred**：SUNMI 實體打印、Package Installer／APK OTA 實機安裝、Production signing／release E2E。狀態係 `DEFERRED — HARDWARE UNAVAILABLE`，唔係 Failed，亦唔係 Production PASS。
- PR #34 在硬件驗收前維持 Draft。

### SMT 其他獨立 Domain 線
- Printer：`printer-transport-settings-v1`／PR #17／Contract PASS only。
- Required Flow：`required-flow-task-model-v1`／PR #20／Domain＋Contract only。
- Incoming Queue：`incoming-queue-domain-v1`／PR #24／Domain＋Contract only。
- Recovery：`order-recovery-audit-v1`／PR #23／Domain＋Contract only。
- 未整合／未有 Browser／Device／Store evidence，不得當整體 SMT 完成。

### WORK03 Staff Sync
- Install：完成；Health：完成。
- API `1.2.9`；Sync `0.2`；Schema `READY`；Password `SHA256_FAST`；Auto Lock 關閉。
- Staff Login：`TEST_WORK03_UNIFIED_LOGIN` 進行中。
- 測試：`morefun / morefun`；裝置 `dev-smt-main`；模式 `smt`。
- 下一步：Session／Bootstrap。
- 未開始：Push／Pull／Heartbeat／Fallback。

## 5. 不可違反規則

- 禁止將 default branch 當作所有 domain 最新 Authority。
- 禁止建立第二套 SMM／Cart／Pricing／Checkout／Order／Sync／Print truth。
- 禁止 Customer／SMT 自行重新計價；正式產品／價格／規則來自 Admin Published。
- 禁止 Google Sheet 作即時 Order Truth、派號或重算價格。
- SMT Mobile 只建立／控制 Print Job，不直接連實體打印機。
- Adaptive ≠ Scale；禁止 1920→1280 整頁縮放或單尺寸永久 patch。
- 禁止 patch／override／大量 `!important`／MutationObserver／DOM scan 掩蓋 Authority／State 根因。
- Software／Contract／Browser PASS 不等於 Device／Hardware／Store／Production PASS。
- 有 failure／flaky、證據 commit 不對齊、或三方記錄過期時禁止宣稱完成。
- 文件／紀錄更新使用 `[skip ci]`；不得為文件更新觸發 full CI。

## 6. Targeted Failure／低成本 CI Protocol

固定流程：

`單一問題 → isolate exact failing unit → reproduce → root cause → minimal fix → targeted verification → minimum affected regression → integration branch → one low-cost final gate`

- 禁止完整 CI 反覆 debug 單一問題。
- 每條問題分支只處理一個問題或一個 Contract boundary。
- 開發分支優先本機／Cloud Shell／targeted script；Browser／E2E／APK／Signing 預設手動或 Release Gate。
- Integration branch 只整合 isolated PASS 修改。
- Final full gate 只在準備合拼正式基準／Release 前跑一次。
- 同一 commit 已有可重現 PASS evidence，不得無目的重跑。

## 7. 開發前固定檢查

每次工作必須先寫清：
1. 所屬 Gate／Domain／repo／active branch／PR／head。
2. 唯一 Composition／DOM／Visual／State／Domain／Token／Hardware Authority。
3. 問題可否穩定重現；根因證據係乜。
4. 影響 Customer／Admin／SMT Register／SMT Mobile／Android Host／API／Firebase／Print／Sync／Audit／Report 邊啲部分。
5. 有冇第二 Authority、legacy selector、Observer、override、cache、build key、舊 Runtime 覆蓋。
6. 有冇不可逆訂單／付款／打印／資料風險。
7. 應新增／更新邊個 Contract／Targeted Test／Change Impact／MFKG Node／Edge。
8. 回滾點、備份 branch／commit／artifact。
9. Evidence 目標：Code／Contract／Browser／Device／Store 邊一層。

## 8. Evidence Level

- `CODE_EXISTS`：程式存在。
- `CONTRACT_PASS`：Syntax／Unit／Domain／Contract 通過。
- `BROWSER_PASS`：指定 commit／矩陣 Browser Gate 通過。
- `DEVICE_PASS`：真實 iPad／T2／T2S／Android／打印機驗收。
- `STORE_PASS`：真實 Firebase／Order API／多機／斷網／跨日／高峰／日結閉環。
- `PRODUCT_LOCKED`：產品負責人最終確認。

禁止將較低層 evidence 寫成較高層完成。

## 9. 目前完成／未完成／延後

### 已完成或已證明
- 中央 Authority／四端 Source-of-Truth Map。
- SMT Adaptive Browser 78／78 PASS。
- Runtime／Offline Browser 81／81 PASS。
- SMT Main Candidate Software Gate PASS。
- 低成本 CI／Targeted Failure Protocol。

### 未完成
- Admin Live Firebase Auth／Rules／Publish／Recovery。
- Customer branch reconciliation＋Unified Published／Runtime Consumer Adapter。
- 正式 Order API／後端重新計價／Idempotency／原子派號。
- Customer → SMT 即時 Intake。
- WORK03 Session／Bootstrap／Push／Pull／Heartbeat／Fallback。
- 跨 repo Gate dashboard。

### Hardware Deferred
- SUNMI／LAN／Label 真實紙張、中文、切紙、fallback 驗收。
- Android Package Installer／APK OTA 實機。
- Production signing／release E2E。
- 斷網／斷電／多日／多機／Store Acceptance。

## 10. 回滾、備份及記錄

每次可驗證工作最少留下：Repo／branch／PR／head、問題、根因、修改範圍、targeted verification、minimum regression、CI 成本、merge／rollback 點、artifact digest、Evidence Level、三方同步狀態、下一步唯一事項。

舊決策不可靜默刪除；必須標 `SUPERSEDED`，保留來源、日期、版本及取代原因。

## 11. 三方同步規則

- GitHub：本文件係 canonical 必讀文件。
- Google Drive：建立／更新同名長期可讀鏡像，不得取代 GitHub。
- Jade Note：建立／更新同名 pinned 接手鏡像／Current State／Decision／Change Impact／Handoff。
- 三方內容衝突時，以 GitHub 最新正式文件為準。
- 只在 Authority、branch／PR／head、Evidence Level、LOCKED／CURRENT、Gap／Conflict／Handoff 有實質變動時更新；冇變化不得製造重複紀錄。

## 12. Gap／Conflict／Requires Decision

- **Registry stale**：中央 Registry 尚未反映 PR #30 已合併、PR #34 Main Candidate、Admin PR #1 新 head；本輪需同步修正。
- **Customer Authority unresolved**：PR #21 與 default branch 後續 uploads 未 reconciliation。
- **MFKG freshness**：SMT machine graph 曾落後最新 D-053／mobile Profile／APK／Adaptive evidence；修改 SMT 知識圖前必須 fresh-read 確認。
- **Hardware unavailable**：Main Candidate hardware items 延後，禁止以 Software PASS 代替。

## 13. 下一步唯一優先事項

系統 Gate 最高優先仍係 **G1 Admin Firebase Publish 真閉環**：以 `Pantonyeung/morefunos-admin` → `feat/admin-p0-full-connect-v1` → PR #1 最新 head fresh-read，逐項取得 Auth、Claims、Rules、Draft／Runtime／Publish／Audit／Recovery 的真實 Firebase read/write evidence。

SMT 硬件恢復前，不重跑已 PASS Main Candidate full Gate；下一個 SMT software-only工作必須選單一 Domain，以 isolated branch／targeted verification 推進。