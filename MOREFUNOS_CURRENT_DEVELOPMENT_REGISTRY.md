# More FunOS｜Current Development Authority Registry

> 狀態：CURRENT / MUST READ WITH MASTER AUTHORITY
> 更新：2026-07-31 HKT
> 最高 Authority：`MOREFUNOS_MASTER_CONTROL_AUTHORITY.md`

## 0. 規則

只記錄真正 Current 嘅 repo／Domain branch、PR、head、Evidence Level 及未完成 Gate。`main` 只係 default branch；同一 repo 按 Domain 選 Authority。

## 1. Project OS｜G0.5 Closeout

- Repo：`Pantonyeung/morefunos`／`main`
- 狀態：`MOREFUNOS G0.5 CLOSEOUT CERTIFIED`
- 正式接手：`docs/MOREFUNOS_G0_5_TO_G1_HANDOFF_AND_PITFALLS_20260731.md`
- G1 Supply 接手：`docs/MOREFUNOS_G1_SMT_SMM_AVAILABILITY_CUSTOMER_OFFLINE_HANDOFF_20260731.md`
- Active workflow：manual-only／read-only；移除 push／PR／cron／bot writeback。
- SMT Cloudflare production branch：`main`；Preview branch auto deploy 已停。
- 舊 SMM Cloudflare Git integration：Disconnected；repo 歷史保留。
- Firebase Hosting／Functions／Firestore／Storage／Extensions：未啟用。
- Scheduler／Pub/Sub：`DEFERRED BY OWNER — NOT A G1 START BLOCKER`。

## 2. Admin｜G1 Firebase Publish＋Staff Auth＋Operational Availability

- Repo：`Pantonyeung/morefunos-admin`
- Branch：`feat/admin-p0-full-connect-v1`
- PR #1：Draft／Open／Mergeable
- Latest fresh-read head：`d353079a577b21a889a736c3298689d9d58dad5e`
- Historical heads只作歷史，禁止回復覆蓋目前 Staff／Availability／Customer Runtime 功能。
- Evidence：Source／Contract 多項完成；最新 head aligned test execution、Worker deployment、staging acceptance 未完整。
- Staff Auth Authority：`docs/WORK04_STAFF_AUTH_MASTER_DEVELOPMENT_CHECKLIST.md`。
- LOCK：角色只保留 owner／staff；Owner＝Firebase Auth；Staff＝Admin 私有帳號＋Cloudflare Worker短期 Session；Staff 不建立 Firebase User、不直接寫受保護 RTDB。
- Operational Availability：Staff source=`smt|smm` 可讀寫 `available|soldout|paused`；Firebase path=`morefun/runtime/operations/v1/availability`；Customer Runtime 疊加此狀態，Admin publish 不覆蓋營運售罄。
- HK 05:00：已加入凌晨前後 regression source；最新 branch source已保留修正，執行證據待補。
- 未完成：Worker secrets／latest deployment、protected Runtime command acceptance、跨端 staging acceptance、最新 head test execution。

## 3. Customer｜G2 Unified Consumer Adapter＋Latest-valid Offline Runtime

- Repo：`Pantonyeung/morefun-ordering-web`
- PR #21：Draft／Open／Mergeable=false，仍需 reconciliation。
- PR #21 head：`031e7a60b95e0413678b7da3439dca0abcad5c24`。
- Source branch：`feat/g1-customer-runtime-consumer-v1`；fresh compare 相對 main＝ahead 117／behind 0。
- Source implementation：Public Runtime consumer、Admin Customer presentation mapping、soldout／paused projection、IndexedDB＋localStorage latest／previous valid snapshot、offline status UI。
- Evidence：Runtime Preview 已曾顯示 live 144 products／12 categories；最新 offline／availability contracts已提交，但未取得同 current branch head 對齊的 execution output。
- 警告：未 reconciliation 前，PR #21、main、source branch均不得單獨稱最終 production Authority。
- PR #3 舊 SMT Android build 線已 `SUPERSEDED／READ ONLY／DO NOT MERGE`。

## 4. SMT Baseline／Main Candidate＋Shared Supply Runtime

- Repo：`Pantonyeung/morefunos-smt`
- Baseline：`smt-functional-completeness-v1`
- PR #30 已合併；Runtime／Offline Browser 81／81 PASS，只代表該舊 verified head Software＋Browser。
- Main Candidate：`smt-main-candidate-v1`／PR #34 Draft／Open／Mergeable
- Current fresh-read head：`bd8de413ed17cbc1196abed512ef009a7c5fb1fa`
- Supply source implementation：shared `shared/supply-runtime.js`、same-origin Staff API proxy、Shell Staff Session、offline pending queue、Register＋Mobile 同一 Soldout route。
- Targeted contracts：已提交，未執行／未對齊 report，因此不可標 Automated PASS。
- Deployment：Admin Worker／SMT Pages Functions latest deployment待驗。
- Cross-device：SMT→SMM→Customer staging／實機閉環待驗。
- Hardware：`DEFERRED — HARDWARE UNAVAILABLE`。

### 保留待 Domain Diff
- Printer：PR #17
- Required Flow：PR #20
- Recovery：PR #23
- Incoming Queue：PR #24

其餘已判定 superseded 的 SMT PR 保留歷史但已關閉，禁止重新合併回 Current Authority。

## 5. SMT Mobile／舊 SMM

- 舊 `morefunos-smm`：`SUPERSEDED AS INDEPENDENT CORE`。
- Current Authority：`morefunos-smt` Shared Core／Mobile Profile。
- Mobile Profile 售罄使用同一 `pages/soldout` Feature／Supply Domain，入口參數 `?profile=mobile`。
- 舊 SMM Cloudflare Git integration 已斷開；禁止重新連接舊獨立 SMM。
- Mobile profile real-device visual／touch acceptance：PENDING。

## 6. WORK03｜Historical Only

舊 Login／Push／Pull／Heartbeat／Fallback 已 `SUPERSEDED / DO NOT CONTINUE`。只作 migration／contract reference。

## 7. 當前 Gate

1. 執行並保存 Admin／SMT／Customer targeted test output，commit對齊 current head。
2. Admin Worker latest deployment＋Staff login／availability GET/PATCH acceptance。
3. SMT Main Candidate Pages Functions deployment。
4. SMT 設售罄 → SMM 收到 → Customer 不可下單；SMM 恢復 → SMT／Customer同步。
5. Customer斷線／invalid runtime保留 latest valid menu，空／半套資料不得覆蓋。
6. Customer branch reconciliation。
7. SMT #17／#20／#23／#24 按 Domain Diff clean integration。
8. 硬件恢復後 Main Candidate Hardware Acceptance。

## 8. Gap／Pitfalls

- Source implemented ≠ tests executed ≠ deployment ≠ device acceptance。
- Admin／SMT／Customer branches持續前移；每次開工必須 fresh-read。
- Customer Authority unresolved。
- Worker／RTDB staging evidence未完整。
- HK 05:00、keyed localStorage product ID、same-origin proxy、offline re-login均已記入 G1 Supply handoff。
- Admin cleanup debt：`temp-noop`、`temp-noop-2`、`temp-noop-3`、`temp-noop-4`、`temp-noop-5` 尚未刪除。
- Hardware unavailable。
- SMT MFKG／QA freshness必須以 current branch fresh-read為準。
