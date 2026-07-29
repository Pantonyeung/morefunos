# More FunOS｜Current Development Authority Registry

> 狀態：CURRENT / MUST READ WITH MASTER AUTHORITY
> 更新：2026-07-29 20:00 HKT
> 最高 Authority：`Pantonyeung/morefunos/main/MOREFUNOS_MASTER_CONTROL_AUTHORITY.md`

## 0. 規則

本文件只記錄各 repo／domain 當前真正開發中嘅 branch、PR、head SHA、證據層級及未完成 Gate。

`main` 只係 default branch，除非明確標示，唔可以當作最新開發 Authority。

同一 repo 可以同時有多條 domain branch；中央總控必須按 domain 選 Authority，禁止粗暴揀一條分支代表全部。

## 1. Admin

- Repo：`Pantonyeung/morefunos-admin`
- Current Development Branch：`feat/admin-p0-full-connect-v1`
- Active PR：`#1`（Draft／Open／Mergeable）
- Latest Head：`ebcca40b8f9d59475438f2dd6959308aa73a9689`
- Domain：Admin Control Plane／Catalog／Draft／Published／Runtime／Release／Audit／Firebase Staging
- Evidence：Code + Contract；Live Firebase 尚未驗證
- 當前 Gate：`G1 Admin Firebase Publish`
- 未完成：Live runtime config、Auth／Claims、Rules deployment、真實 Draft／Runtime／Publish／Audit／Recovery、Published Seed

## 2. Customer

- Repo：`Pantonyeung/morefun-ordering-web`
- 已知 Active Branch：`agent/customer-pwa-firebase-cleanup-v1`
- Active PR：`#21`（Draft／Open／目前 Mergeable=false）
- Branch Head：`031e7a60b95e0413678b7da3439dca0abcad5c24`
- Domain：Customer PWA／Firebase bootstrap／read-only adapter／Order Runtime boundary
- 注意：PR #21 最後更新較早；default branch 後續有多次手機 upload commits，所以 PR #21 只可視為已知開發線，未完成 fresh reconciliation 前不得當最終 Customer Authority。
- 當前 Gate：`G2 Unified Consumer Adapter`
- 未完成：與最新 Customer UI 基準對齊、統一 Published／Runtime Snapshot、正式 Order API、端到端 Browser／mobile acceptance

## 3. SMT Register／Shared Runtime

- Repo：`Pantonyeung/morefunos-smt`
- UI／Adaptive 完成基準 Branch：`smt-functional-completeness-v1`
- Runtime Integration Branch：`smt-adaptive-runtime-integration-v1`
- Active PR：`#30`（Ready for review／Open／最新 fresh-read Mergeable=true）
- Runtime Head：`2d5852e0da95872fa93a4cdcbd5b79cfdbfedc84`
- Evidence：Targeted 3／3 PASS；Full Browser Matrix 81／81 PASS；0 failure；0 flaky
- 邊界：只代表 Runtime／Offline software + Browser Gate；唔代表 Firebase／Device／Store PASS

## 4. SMT Mobile（原 SMM）

- 舊 Repo：`Pantonyeung/morefunos-smm`
- 舊 repo Active PR：無
- 最新 repo commits 主要係 migration／redirect docs；獨立 SMM core 已 superseded
- Current Development Authority：轉移到 `Pantonyeung/morefunos-smt` Shared Core／SMT Mobile Profile
- 禁止：以 `morefunos-smm/main` 當最新產品 Authority；禁止再建立第二套 Cart／Pricing／Checkout／Order／Sync
- 當前 Gate：`G2 Unified Consumer Adapter` + SMT Mobile Profile migration
- 未完成：手機 UI Profile 正式落入 SMT Shared Core、Browser／device acceptance、print-command-only flow

## 5. SMT Android Host／APK OTA

- D-line Frozen Baseline：`d-line-production-integration-v1`
- D-line PR：`#26`
- D-line Head：`0771e8d82b39485e30f8d8c21a1771311b70e452`
- E-line Current APK OTA Branch：`e-line-apk-ota-v1`
- E-line PR：`#27`（Open／Mergeable）
- E-line Head：`53351acee24e0d131319ca102cc51884a070e246`
- Evidence：Software／CI layer only
- 未完成：正式 signed production release run、Sunmi T2S／Android 11、內置打印、LAN、Label、Device Owner／安裝確認、斷網斷電 recovery 實機驗收

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

## 9. 當前整合原則

1. Admin work 一律以 `feat/admin-p0-full-connect-v1` fresh-read。
2. Customer 未完成 branch reconciliation 前，不得假設 `main` 或 PR #21 單獨代表最新完整狀態。
3. SMT 要按 domain 揀 branch；唔存在單一「最新 SMT branch」可以涵蓋 Runtime、APK、Printer、Required、Queue、Recovery。
4. SMM product development Authority 已轉移到 SMT Shared Core；舊 repo只作 migration source／redirect。
5. 每次 branch head、PR state、CI evidence 改變，必須更新本 Registry、Master Authority、Google Drive、Jade Note。

## 10. 今次踩坑

- 將 default branch 誤當 current development authority。
- 嘗試用 `main → main` 建 PR 更新中央 Authority，被 GitHub 正確拒絕 `No commits between main and main`。
- 只睇 open PR 會漏掉 default branch 後續 uploads；只睇 default branch亦會漏掉真正開發分支。

## 11. 下一步

1. 完成 Customer branch reconciliation，鎖定最新 UI／Runtime／Firebase真正基準。
2. G1 繼續以 Admin active branch推進 Live Firebase。
3. 建立跨 repo Gate dashboard，以 branch／PR／head／evidence level 做唯一狀態表。
