# More FunOS｜Current Development Authority Registry

> 狀態：CURRENT / MUST READ WITH MASTER AUTHORITY
> 更新：2026-07-30 10:43 HKT
> 最高 Authority：`MOREFUNOS_MASTER_CONTROL_AUTHORITY.md`
> 統一必讀：`MOREFUNOS_DEVELOPMENT_MUST_READ.md`

## 0. 規則

本文件只記錄真正 Current 嘅 repo／domain branch、PR、head、Evidence Level 及未完成 Gate。`main` 只係 default branch；同一 repo 必須按 Domain 選 Authority。

## 1. Admin｜G1 Firebase Publish

- Repo：`Pantonyeung/morefunos-admin`
- Branch：`feat/admin-p0-full-connect-v1`
- PR #1：Draft／Open／Mergeable
- Latest fresh-read head：`a4236c3d3314fd6557261dc34718c5ee778cfb83`
- Evidence：Code＋Contract；Live Firebase Publish 閉環未完成。
- 未完成：runtime config、Auth／Claims、Rules、Draft／Runtime／Publish／Audit／Recovery、Published Seed。
- 子工作 WORK04G Mobile Menu 已於其 integration branch完成 Human iPhone Preview 4／4 PASS，merge `9fe2935be47e262c16a08c7d0a494688bdbd7b07`；只代表該 UI flow，唔提升 G1 Evidence Level。

## 2. Customer｜G2 Unified Consumer Adapter

- Repo：`Pantonyeung/morefun-ordering-web`
- 已知 branch：`agent/customer-pwa-firebase-cleanup-v1`
- PR #21：Draft／Open／Mergeable=false
- Head：`031e7a60b95e0413678b7da3439dca0abcad5c24`
- 警告：PR 較舊，default branch 有後續 uploads；未 reconciliation 前，PR #21 或 main 都不得單獨當最終 Authority。
- 未完成：最新 UI／Runtime／Firebase reconciliation、Published／Runtime Consumer Adapter、Order API、Browser／mobile acceptance。

## 3. SMT Runtime／Offline Baseline

- Repo：`Pantonyeung/morefunos-smt`
- Base：`smt-functional-completeness-v1`
- PR #30 已合併；merge `7e990adc7b8f7db3499b59c43636c1251603019b`
- Evidence：Targeted 3／3；Browser 81／81；0 failure／0 flaky。
- 邊界：Software＋Browser only；不代表 Firebase／Device／Store。

## 4. SMT Main Candidate｜最新整合線

- Branch：`smt-main-candidate-v1`
- PR #34：Draft／Open／Mergeable
- PR head：`4937ea2efb5c149644fb51287ab6a1adc919563c`
- Software Gate verified head：`9bad3a9c40d21a30b114824820ba3de8214a7b05`
- Domain：Runtime Authority＋APK OTA＋Package Installer＋Recovery＋Native Bridge＋SUNMI Native Print clean integration。
- Evidence：Static／Kotlin compile／Debug unit tests／software contracts PASS。
- Run `30505574564`；Artifact `8745190934`；digest `sha256:9e17352b81049b9c67787f17d114e3ab9812d7c56af9820a0cb7dc6e81b35b1a`。
- Hardware：`DEFERRED — HARDWARE UNAVAILABLE`。
- 未完成：SUNMI print、Package Installer／APK OTA device、Production release E2E、Device／Store acceptance。

## 5. SMT Mobile

- 舊 `morefunos-smm`：`SUPERSEDED AS INDEPENDENT CORE`。
- Current Authority：`morefunos-smt` Shared Core／mobile Profile。
- 未完成：mobile UI Profile、Browser／Device acceptance、print-command-only flow。

## 6. SMT 獨立 Domain 線

- Printer：`printer-transport-settings-v1`／PR #17／head `f96619e36ccd4d418f99aab7952edd5d5ce9e095`／Contract PASS only。
- Required：`required-flow-task-model-v1`／PR #20／head `f32ca27f21c79791461c8174fc0e9af9472979cb`／Domain＋Contract only。
- Incoming Queue：`incoming-queue-domain-v1`／PR #24／head `2d5f675ba7243cfa6e5ee9addc6b88ff77b4e9c0`／Domain＋Contract only。
- Recovery：`order-recovery-audit-v1`／PR #23／head `b342ff6c335cf1714fc52c9328ff272ff0b427e2`／Domain＋Contract only。

未有 integration／Browser／Device／Store evidence，不得當整體 SMT 完成。

## 7. WORK03｜Historical／Reference Only

舊流程 `TEST_WORK03_UNIFIED_LOGIN → Session／Bootstrap → Push／Pull → Heartbeat → Fallback` 已：

`SUPERSEDED / DO NOT CONTINUE`

保留作 Staff Login／Session／Sync／Cursor／Idempotency／Heartbeat／Fallback／Apps Script migration contract reference。現役架構：Firebase Auth＋Firebase RTDB＋Cloudflare Worker＋Google Sheet V2 ledger。

## 8. 整合原則

1. Admin 工作 fresh-read PR #1 latest head及對應 WORK04 active branch。
2. Customer 未 reconciliation 前不假設 main 或 PR #21 係完整 Authority。
3. SMT baseline 已包含 PR #30；PR #34 係 Candidate，唔係 Production Authority。
4. SMT 按 Domain 選 branch；SMM Authority 已轉 SMT Shared Core。
5. branch／PR／head／Evidence／Device／Store 變動必須同步 Master、Must Read、Registry、Drive、Jade。
6. 舊 Current 狀態移入 Git history／Archive，不得重新覆蓋本文件。

## 9. Gap

- Customer Authority unresolved。
- Admin Live Firebase Publish 未閉環。
- Hardware unavailable。
- SMT MFKG freshness 需 fresh-read。

## 10. 下一步

1. G1 Admin Firebase Publish 真閉環。
2. Customer branch reconciliation。
3. 硬件恢復後另開 Main Candidate Hardware Acceptance。
4. 建立跨 repo Gate dashboard。
