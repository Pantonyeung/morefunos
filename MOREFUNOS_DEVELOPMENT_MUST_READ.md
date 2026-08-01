# MoreFunOS｜每次開發必讀

> 狀態：CURRENT／唯一開發入口
> 更新：2026-08-01 HKT
> 正式 Authority：`Pantonyeung/morefunos` → `main`

本文件只保留立即施工所需精華；最高全域 Authority 仍為 `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`。其他 Master／Guide／Handoff／Drive／Jade 只可作補充或鏡像，不得建立第二套 Current。

## 1. 強制閱讀順序

1. 本文件。
2. `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`。
3. 對應 repo 最新 `AGENTS.md`／唯一 Current Domain Authority。
4. active PR 最新 head、diff、測試及部署／實機 evidence。
5. `MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`。

禁止以 default branch、舊對話、Drive 摘要、Jade checkpoint 或單一 PR 標題代替 fresh read。

## 2. 真相優先序

安全／資料完整／不可逆交易風險 → Master Authority → repo AGENTS／Primary Standard → Ownership／Decision／Current Lock → Current Registry／Implementation Status／Code Map／MFKG／Change Impact → 產品負責人最新明確決定 → Drive／Jade 歷史補充。

外部資料不得直接覆蓋 `LOCKED／CURRENT`；衝突標記 `GAP／CONFLICT／REQUIRES DECISION`。

## 3. 永久架構鎖

- Admin：Catalog、Published、Runtime Policy、Staff、Audit、Rollback Authority。
- Cloudflare Worker：唯一受保護 mutation、repricing、revision、idempotency、audit 入口。
- Firebase RTDB：Realtime Runtime／Order／Presence／Print Job Authority。
- SMT Register＋SMT Mobile 共用同一 Core；舊 `morefunos-smm` 只作 migration／history。
- Customer 只讀 Public Projection，並在 Product／Cart／Checkout／Reorder／Submit 執行 availability gate。
- Android Host 負責硬件、背景打印、診斷及打印結果。
- Google Sheet V2 只係 ledger／report／audit mirror，唔係 realtime truth。

禁止 bridge、第二套 state authority、DOM scan、capture-click guard、MutationObserver、polling、`location.reload()` 修復、client 直寫 protected RTDB、大量 CI／Actions 作開發試錯工具。

## 4. Current Registry｜2026-08-01 Fresh Read

### Project OS
- Repo：`Pantonyeung/morefunos`
- Branch：`main`
- Head：`5d3bd64e416b26a0326805ea65287eceea4e304b`
- Open knowledge PR：#4；只係文件治理骨架，未取代 `main` Authority。

### Admin
- Repo：`Pantonyeung/morefunos-admin`
- Active branch：`feat/admin-p0-full-connect-v1`
- PR：#1 Draft／Open
- Head：`53c7d8d99c399c1e0d12ca35847ca5d489e050a4`
- Evidence：Source implemented＋targeted contract；deployment／device acceptance pending。
- 注意：PR 現時不可直接合併；禁止誤寫為 Production PASS。

### SMT／SMT Mobile
- Repo：`Pantonyeung/morefunos-smt`
- Active branch：`smt-main-candidate-v1`
- PR：#34 Draft／Open／Mergeable
- Head：`16ed84e0f86ad05759565fff191b521fa94b1249`
- `/smm` shared entry：PR #36；唔係獨立 SMM Core。
- Evidence：targeted contracts PASS；full repo／browser／Android compile／printer／device pending。
- 最新治理：自動 APK foundation workflow 已停止；提交 `7902b1a81cfe372aaef9a65315ec32e8b26c951c`。

### Customer
- Repo：`Pantonyeung/morefun-ordering-web`
- Active branch：`feat/g1-customer-runtime-consumer-v1`
- PR：#22 Draft／Open
- Head：`3cb4c00a91dc8967bc841635d8f726da7db9669a`
- Evidence：targeted offline/runtime contracts PASS；165 commits／52 files 仍需 Authority reconciliation、preview、Safari／PWA device acceptance。
- 注意：PR 現時不可直接合併。

### 舊 SMM
- Repo：`Pantonyeung/morefunos-smm`
- 狀態：`SUPERSEDED AS INDEPENDENT CORE／MIGRATION SOURCE ONLY`。
- 最新 main：`f5f91bfd3984a35e236c1de8b15036551cd8aaf8`。

### Core Repo
- Repo：`Pantonyeung/morefunos-core`
- 狀態：空白；未有 commit。
- 禁止為整理而建立空架構、空 schema、空 docs 或大量 CI。

## 5. 唯一垂直優先事項

以 F4 作 Golden Product，完成 P0 Supply／Availability 真閉環：

`Admin／SMT／SMT Mobile mutation → Worker auth＋scope＋expectedRevision＋idempotency → Firebase Operational Availability → Shared SMT Store → Customer Product／Cart／Checkout／Submit Gate`

完成條件：售罄／恢復、offline queue、re-login、token revoke、revision conflict、duplicate retry，並取得 Browser＋iPhone＋Android Device evidence。未達 Device／Store evidence，不得稱閉環完成。

## 6. 工作與驗證方法

`單一問題 → isolate → reproduce → 第一個 fatal evidence → root cause → minimal native-core fix → targeted verification → minimum regression → clean integration → one final gate`

Evidence：`CODE EXISTS → CONTRACT PASS → BROWSER PASS → DEVICE PASS → STORE PASS → PRODUCTION ACCEPTED`。

修改前先建立 checkpoint／rollback；任何新增文件必須取代、合併或直接被施工使用。重複 Current Handoff、過期 branch/head、長篇 run log 移到 History／Engineering Log，不塞入本文件。

## 7. 目前未完成 Gate

- Admin Worker secrets／latest deployment／protected Runtime command staging acceptance。
- Customer 165-commit Authority reconciliation、preview、Safari／PWA device acceptance。
- SMT full latest-head regression、Android compile、printer contract、實機驗收。
- SMT→SMT Mobile→Customer availability propagation。
- Offline queue／re-login／token revoke／香港時間 05:00 acceptance。

## 8. 長期工程經驗

中央索引：`MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`。

特別禁止重犯：舊 WORK03／V42EG 當現役、default branch 當 latest、CI 當 debug loop、Software PASS 當 Device PASS、Cloudflare Git Integration 同 GitHub Actions 混為同一部署開關。