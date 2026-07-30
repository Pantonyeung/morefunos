# More FunOS｜Current Development Authority Registry

> 狀態：CURRENT / MUST READ WITH MASTER AUTHORITY
> 更新：2026-07-30 10:15 HKT
> 最高 Authority：`Pantonyeung/morefunos/main/MOREFUNOS_MASTER_CONTROL_AUTHORITY.md`
> 統一必讀：`Pantonyeung/morefunos/main/MOREFUNOS_DEVELOPMENT_MUST_READ.md`

## 0. 規則

本文件只記錄各 repo／domain 當前真正開發中嘅 branch、PR、head SHA、證據層級及未完成 Gate。

`main` 只係 default branch，除非明確標示，唔可以當作最新開發 Authority。

同一 repo 可以同時有多條 domain branch；中央總控必須按 domain 選 Authority，禁止粗暴揀一條分支代表全部。

## 1. Admin

- Repo：`Pantonyeung/morefunos-admin`
- Current Development Branch：`feat/admin-p0-full-connect-v1`
- Active PR：`#1`（Draft／Open／Mergeable）
- Latest fresh-read Head：`a4236c3d3314fd6557261dc34718c5ee778cfb83`
- Domain：Admin Control Plane／Catalog／Draft／Published／Runtime／Release／Audit／Firebase Staging
- Evidence：Code + Contract；Live Firebase 尚未驗證
- 當前 Gate：`G1 Admin Firebase Publish`
- 未完成：Live runtime config、Auth／Claims、Rules deployment、真實 Draft／Runtime／Publish／Audit／Recovery、Published Seed

## 2. Customer

- Repo：`Pantonyeung/morefun-ordering-web`
- 已知 Active Branch：`agent/customer-pwa-firebase-cleanup-v1`
- Active PR：`#21`（Draft／Open／Mergeable=false）
- Branch Head：`031e7a60b95e0413678b7da3439dca0abcad5c24`
- Domain：Customer PWA／Firebase bootstrap／read-only adapter／Order Runtime boundary
- 注意：PR #21 最後更新較早；default branch 後續有多次手機 upload commits，所以 PR #21 只可視為已知開發線，未完成 fresh reconciliation 前不得當最終 Customer Authority。
- 當前 Gate：`G2 Unified Consumer Adapter`
- 未完成：與最新 Customer UI 基準對齊、統一 Published／Runtime Snapshot、正式 Order API、端到端 Browser／mobile acceptance

## 3. SMT Register／Shared Runtime Baseline

- Repo：`Pantonyeung/morefunos-smt`
- UI／Adaptive＋Runtime／Offline Base：`smt-functional-completeness-v1`
- Runtime Integration PR：`#30` 已於 2026-07-29 合併
- Merge commit：`7e990adc7b8f7db3499b59c43636c1251603019b`
- Evidence：Targeted `3／3 PASS`；Full Browser Matrix `81／81 PASS`；0 failure；0 flaky
- 邊界：只代表 Runtime／Offline software + Browser Gate；唔代表 Firebase／Device／Store PASS

## 4. SMT Main Candidate｜最新整合線

- Candidate Branch：`smt-main-candidate-v1`
- Active PR：`#34`（Draft／Open／Mergeable）
- PR current Head：`4937ea2efb5c149644fb51287ab6a1adc919563c`
- Software Gate verified code Head：`9bad3a9c40d21a30b114824820ba3de8214a7b05`
- Domain：Runtime Authority＋APK OTA＋Package Installer＋Recovery＋Native Bridge＋SUNMI Native Print clean integration
- Software Evidence：Static Gate／Kotlin compile／Debug unit tests／contracts PASS
- Gate Run：`30505574564`；Job `90754516056`；Artifact `8745190934`
- Artifact digest：`sha256:9e17352b81049b9c67787f17d114e3ab9812d7c56af9820a0cb7dc6e81b35b1a`
- Hardware Evidence：`DEFERRED — HARDWARE UNAVAILABLE`
- 未完成：SUNMI 實體打印、Android Package Installer／APK OTA 實機、Production signing／release E2E、Device／Store acceptance
- 規則：PR #34 在硬件驗收前維持 Draft；Software PASS 不得寫成 Production PASS

## 5. SMT Mobile（原 SMM）

- 舊 Repo：`Pantonyeung/morefunos-smm`
- 舊 repo Active PR：無
- 最新 repo commits 主要係 migration／redirect docs；獨立 SMM core 已 superseded
- Current Development Authority：轉移到 `Pantonyeung/morefunos-smt` Shared Core／SMT Mobile Profile
- 禁止：以 `morefunos-smm/main` 當最新產品 Authority；禁止再建立第二套 Cart／Pricing／Checkout／Order／Sync
- 當前 Gate：`G2 Unified Consumer Adapter` + SMT Mobile Profile migration
- 未完成：手機 UI Profile 正式落入 SMT Shared Core、Browser／device acceptance、print-command-only flow

## 6. SMT Printer Domain

- Branch：`printer-transport-settings-v1`
- PR：`#17`（Draft／Open）
- Head：`f96619e36ccd4d418f99aab7952edd5d5ce9e095`
- Evidence：Contract PASS only
- 未完成：整合最新 baseline、Browser、Android Bridge、真實紙張／中文／切紙／Label／fallback device acceptance

## 7. SMT Required Flow

- Branch：`required-flow-task-model-v1`
- PR：`#20`（Draft／Open／Mergeable）
- Head：`f32ca27f21c79791461c8174fc0e9af9472979cb`
- Evidence：Domain／Contract only
- 未完成：Order Page UI、Checkout navigation、Browser、Device／Store acceptance

## 8. SMT Incoming Queue／Recovery

- Incoming Queue Branch：`incoming-queue-domain-v1`
- PR：`#24`（Draft／Open）
- Head：`2d5f675ba7243cfa6e5ee9addc6b88ff77b4e9c0`
- Recovery Branch：`order-recovery-audit-v1`
- PR：`#23`（Draft／Open）
- Head：`b342ff6c335cf1714fc52c9328ff272ff0b427e2`
- Evidence：Domain／Contract only
- 未完成：正式 UI／Order API／Audit backend／Browser／Device／Store acceptance

## 9. WORK03 Staff Sync

- Install：完成
- Health：完成
- API：`1.2.9`
- Sync：`0.2`
- Schema：`READY`
- Password mode：`SHA256_FAST`
- Auto Lock：關閉
- Staff Login：`TEST_WORK03_UNIFIED_LOGIN` 進行中
- 測試帳號：`morefun / morefun`
- Device：`dev-smt-main`
- Mode：`smt`
- 下一步：Session／Bootstrap
- 未開始：Push／Pull／Heartbeat／Fallback

## 10. 當前整合原則

1. Admin work 一律以 `feat/admin-p0-full-connect-v1` 最新 PR head fresh-read。
2. Customer 未完成 branch reconciliation 前，不得假設 `main` 或 PR #21 單獨代表最新完整狀態。
3. SMT Baseline 已包含 PR #30；最新整合候選係 PR #34，但 Candidate／Software Gate 不等於 Production Authority。
4. SMT 要按 domain 揀 branch；唔存在單一 branch 可以取代 Runtime、APK、Printer、Required、Queue、Recovery 各自 evidence。
5. SMM product development Authority 已轉移到 SMT Shared Core；舊 repo 只作 migration source／redirect。
6. 每次 branch head、PR state、CI evidence、Device／Store evidence 改變，必須更新本 Registry、Master Authority、Must Read、Google Drive、Jade Note。

## 11. 本輪實質更新

- Admin PR #1 head：`ebcca40…` → `a4236c3…`。
- SMT PR #30：由 Open 變成 `MERGED`，正式進入 `smt-functional-completeness-v1` baseline。
- 新增 SMT Main Candidate PR #34；Software Gate PASS，Hardware Deferred。
- 新增 WORK03 Staff Sync 當前狀態。
- 新增 canonical `MOREFUNOS_DEVELOPMENT_MUST_READ.md`。

舊狀態保留於 Git 歷史，唔可用舊 Registry snapshot 覆蓋本文件。

## 12. 下一步

1. G1 繼續以 Admin active branch 推進 Live Firebase Publish 真閉環。
2. 完成 Customer branch reconciliation，鎖定最新 UI／Runtime／Firebase真正基準。
3. WORK03 完成 Staff Login 後進 Session／Bootstrap。
4. 硬件恢復後另開 Main Candidate Hardware Acceptance；不得重跑已 PASS software full gate 作替代。
5. 建立跨 repo Gate dashboard，以 branch／PR／head／evidence level 做唯一狀態表。