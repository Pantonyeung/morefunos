# MoreFunOS｜每次開發必讀

> 狀態：CURRENT／唯一開發入口
> 更新：2026-08-03 HKT
> 正式 Authority：`Pantonyeung/morefunos` → `main`

本文件只保留立即施工所需精華。最高全域 Authority 為 `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`；Drive／Jade／舊 Handoff 只可作鏡像或歷史，禁止建立第二套 Current。

## 1. Fresh Read 次序
1. 本文件。
2. `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`。
3. 對應 repo `AGENTS.md`／`CURRENT_DOMAIN_AUTHORITY.md`／Primary Standard。
4. active PR 最新 head、diff、測試、部署與實機 evidence。
5. `MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`。

禁止以 default branch、舊對話、Drive 摘要、Jade checkpoint、PR 標題或單一測試代替 fresh read。

## 2. 真相及證據優先序
安全／資料完整／不可逆交易風險 → Master Authority → repo AGENTS／Primary Standard → Ownership／Decision／Current Lock → Current Registry／Implementation Status／Code Map／MFKG／Change Impact → Owner 最新明確決定 → Drive／Jade 歷史補充。

外部資料不得直接覆蓋 `LOCKED／CURRENT`；衝突標記 `GAP／CONFLICT／REQUIRES DECISION`。

Evidence 固定：`SOURCE_EXISTS → CONTRACT_PASS → FULL_REGRESSION_PASS → DEPLOYED → BROWSER_PASS → DEVICE_PASS → HARDWARE_PASS → STORE_PASS → PRODUCTION_ACCEPTED`。不可跨級聲稱完成。

## 3. 永久架構鎖
- 一份 Unified Menu Authority：`morefun/menu/v1/current`。
- Admin：Catalog、Presentation、Runtime Policy、Staff、Audit、Rollback Authority。
- Worker：唯一 protected mutation、repricing、revision、idempotency、audit 入口。
- Firebase RTDB：Realtime Runtime／Order／Presence／Print Job Authority。
- SMT Register＋SMT Mobile 共用 Core；舊 `morefunos-smm` 只作 migration／history。
- Customer 只讀 Public Projection，並於 Product／Cart／Checkout／Reorder／Submit 執行 availability gate。
- Android Host 負責硬件、背景打印、診斷及打印結果。
- Google Sheet V2 只係 ledger／report／audit mirror。

禁止 bridge、第二套 state authority、DOM scan、capture-click guard、MutationObserver、polling、`location.reload()` 修復、client 直寫 protected RTDB，以及大量 CI／Actions 作 debug loop。

## 4. Current Registry｜2026-08-03 Fresh Read

### Project OS
- Repo：`Pantonyeung/morefunos`
- Branch：`main`
- Fresh head：`396221bc3ed29ce41bb86bff798309d111ad70f3`
- Knowledge PR #4：`knowledge-base-v2`／head `12d5c6ed302bbaaedf7f58b1f5c7d2d06cac5b1d`／Draft；只係文件治理骨架，未取代 main Authority。

### A 線 Admin／Unified Menu
- Repo：`Pantonyeung/morefunos-admin`
- Active branch：`admin-preview-unified-menu-impl`
- Draft PR #22／fresh head：`077c62015f6f77f5f3d7b0c1f7adc052280db465`
- Evidence：Canonical Product schema、Customer／operations presentation、shared status、targeted tests；部署／Browser／Device acceptance 未完成。
- PR #21 Build Identity、PR #20 Staff Management、PR #19 Diagnostics 仍係並行未合併工作，禁止誤當已進入 PR #22 或 Production。

### A 線 SMT／SMT Mobile
- Repo：`Pantonyeung/morefunos-smt`
- Runtime 基線：Draft PR #34 `smt-main-candidate-v1`／head `16ed84e0f86ad05759565fff191b521fa94b1249`
- Login 延伸：Draft PR #35 `fix/g1-smt-remember-staff-login-v1`／head `027d2249b2e780daa49199079589de0e0873df20`
- SMM 固定入口延伸：Draft PR #36 `feat/g1-staff-login-smm-path-v1`／head `35a5283aa51d5ced8bd22b201bf4ac21e1227559`
- 關係：#36 以 #35 為 base，#35 以 #34 為 base；不可將三者寫成三套獨立 Current。
- Evidence：Source＋targeted contract；Cloudflare staging、iPhone／Android、offline queue、token revoke、printer／hardware 未完整驗收。

### A 線 Customer
- Repo：`Pantonyeung/morefun-ordering-web`
- Draft PR #22：`feat/g1-customer-runtime-consumer-v1`
- Fresh head：`859335138d089ca50b10928f274d5ad22e7ba6a1`
- Evidence：Public Runtime、latest-valid／previous-valid offline cache、targeted contract；PR 仍不可合併，完整 diff reconciliation、Preview、Safari／PWA cold start、Device acceptance 未完成。

### Platform B｜隔離重建線
- Repo：`Pantonyeung/morefunos-platform-b`
- `main` fresh head：`f3c74fdfa840de74700bf639b7feb64ab3b6d3ba`；Gate B6 已完成並開啟 B7。
- Draft PR #26：shared Worker HTTP adapter／head `a06821d9de3e1130b7ef2305790fb13b52ec342a`。
- Draft PR #27：A 線 Customer UI 抽取到 B Runtime／head `359bcba6eb93330550b5539a287f0aa94ef54922`。
- Evidence：Source＋targeted contract；CI／Device pending。A 線只可作 UI donor，禁止帶入 A 線 Runtime、Firebase path、offline store 或 Apps Script Authority。

### 舊 SMM／Core
- `morefunos-smm`：`SUPERSEDED AS INDEPENDENT CORE／MIGRATION SOURCE ONLY`。
- `morefunos-core`：仍空白；禁止為整理而建立空架構、空 schema、空 docs 或大量 CI。

## 5. 現時唯一優先事項
A 線完成 **Unified Menu＋F4 Supply 真實閉環收口**；B 線只繼續 Gate B7 隔離垂直切片，不得覆蓋 A 線：

`Admin mutation → Worker auth＋revision＋idempotency → Firebase authority → SMT Register／Mobile shared store → Customer mutation gates`

完成條件：售罄／恢復／paused、offline queue、re-login、token revoke、revision conflict、duplicate retry、Safari／Android／printer／store evidence。未達對應 evidence，不得稱 Production 完成。

## 6. 工作方法
`單一問題 → isolate → reproduce → 第一個 fatal evidence → root cause → minimal native-core fix → targeted verification → minimum regression → clean integration → one final gate`

修改前建立 checkpoint／rollback。新增文件必須取代、合併或直接被施工使用；過期 branch／head／run log 移入 History。

## 7. 永久踩坑索引
中央：`MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`。

禁止重犯：舊 WORK03／V42EG 當現役、default branch 當 latest、PR 延伸鏈誤寫成多套 Authority、UI donor 帶入舊 Runtime Authority、CI 當 debug loop、Cloudflare Git Integration 同 GitHub Actions 混為一談、Cache 舊版本誤判 Source、Software PASS 當 Device／Store PASS。