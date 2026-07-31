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
- Active workflow：manual-only／read-only；移除 push／PR／cron／bot writeback。
- SMT Cloudflare production branch：`main`；Preview branch auto deploy 已停。
- 舊 SMM Cloudflare Git integration：Disconnected；repo 歷史保留。
- Firebase Hosting／Functions／Firestore／Storage／Extensions：未啟用。
- Scheduler／Pub/Sub：`DEFERRED BY OWNER — NOT A G1 START BLOCKER`。

## 2. Admin｜G1 Firebase Publish＋Staff Auth

- Repo：`Pantonyeung/morefunos-admin`
- Branch：`feat/admin-p0-full-connect-v1`
- PR #1：Draft／Open／Mergeable
- Latest fresh-read head：`0b04d65e3666a87297434a63e6de0696b5b96c24`
- Historical heads：`2835ce268160c892f1582964ff608bc12371a754`、`a4236c3d3314fd6557261dc34718c5ee778cfb83`；只作歷史，禁止還原。
- Evidence：Source／Contract 多項完成；Automated execution、Worker deployment、staging acceptance 未完整。
- Staff Auth Authority：`docs/WORK04_STAFF_AUTH_MASTER_DEVELOPMENT_CHECKLIST.md`。
- LOCK：角色只保留 owner／staff；Owner＝Firebase Auth；Staff＝Admin 私有帳號＋Cloudflare Worker短期 Session；Staff 不建立 Firebase User、不直接寫受保護 RTDB。
- 未完成：Worker secrets／deployment、protected Runtime command、Admin Staff UI、SMT mobile integration、Customer projection、跨端 staging acceptance、Publish／Audit／Recovery 真閉環。

## 3. Customer｜G2 Unified Consumer Adapter

- Repo：`Pantonyeung/morefun-ordering-web`
- PR #21：Draft／Open／Mergeable=false
- Head：`031e7a60b95e0413678b7da3439dca0abcad5c24`
- PR #3 舊 SMT Android build 線已 `SUPERSEDED／READ ONLY／DO NOT MERGE`。
- 警告：PR #21 較舊，main 有後續 uploads；未 reconciliation 前兩邊都唔係最終 Authority。

## 4. SMT Baseline／Main Candidate

- Repo：`Pantonyeung/morefunos-smt`
- Baseline：`smt-functional-completeness-v1`
- PR #30 已合併；Runtime／Offline Browser 81／81 PASS，只代表 Software＋Browser。
- Main Candidate：`smt-main-candidate-v1`／PR #34 Draft／Open／Mergeable
- Current head：`28feab6b744684642f24fae8c91b0738bcc5d0fb`
- Software Gate verified head：`9bad3a9c40d21a30b114824820ba3de8214a7b05`
- Hardware：`DEFERRED — HARDWARE UNAVAILABLE`。

### 保留待 Domain Diff
- Printer：PR #17
- Required Flow：PR #20
- Recovery：PR #23
- Incoming Queue：PR #24

其餘已判定 superseded 的 SMT PR 保留歷史但已關閉，禁止重新合併回 Current Authority。

## 5. SMT Mobile／舊 SMM

- 舊 `morefunos-smm`：`SUPERSEDED AS INDEPENDENT CORE`。
- Current Authority：`morefunos-smt` Shared Core／mobile Profile。
- Cloudflare Git integration 已斷開；禁止重新連接舊獨立 SMM。

## 6. WORK03｜Historical Only

舊 Login／Push／Pull／Heartbeat／Fallback 已 `SUPERSEDED / DO NOT CONTINUE`。只作 migration／contract reference。

## 7. 當前 Gate

1. G1 Admin Firebase Publish＋Staff Auth／Worker staging closure。
2. Customer branch reconciliation。
3. SMT #17／#20／#23／#24 按 Domain Diff clean integration。
4. 硬件恢復後 Main Candidate Hardware Acceptance。

## 8. Gap

- Admin PR #1 持續前移；每次開工必須 fresh-read，禁止依賴舊 checkpoint head。
- Customer Authority unresolved。
- Worker／RTDB staging evidence 未完整。
- Hardware unavailable。
- SMT MFKG freshness 需 fresh-read。
