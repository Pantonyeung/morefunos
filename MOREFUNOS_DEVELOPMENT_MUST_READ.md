# MoreFunOS｜每次開發必讀

> 狀態：CURRENT／唯一開發入口
> 更新：2026-08-02 HKT
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

## 4. Current Registry｜2026-08-02 Fresh Read

### Project OS
- Repo：`Pantonyeung/morefunos`
- Branch：`main`
- Fresh head：`96f8c45fd704e2b38aff31070a869e0abdc13827`
- 最新鎖定：Unified Menu Authority design＋implementation plan。
- Knowledge PR #4：Draft；文件治理骨架，未取代 main Authority。

### A 線 Admin／Unified Menu
- Repo：`Pantonyeung/morefunos-admin`
- Active branch：`admin-preview-unified-menu-impl`
- Draft PR：#22／mergeable
- Fresh PR head：`077c62015f6f77f5f3d7b0c1f7adc052280db465`；Jade／部署紀錄另有較新施工 SHA，必須以 PR fresh read 再核對，禁止只抄 checkpoint。
- 已有：Canonical Product Schema、Menu API、Owner CRUD／migration、version／checksum／history、Customer-safe projection。
- Evidence：Source＋targeted tests；部分 Preview／初步實機回報存在，但完整 Browser／Device／Cross-port acceptance 未收口。
- 舊 PR #1 仍係歷史大分支，唔再係統一菜單最新施工入口。

### A 線 SMT／SMT Mobile
- Repo：`Pantonyeung/morefunos-smt`
- 現役施工已由舊 `smt-main-candidate-v1` 演進至 `smt-preview` 系列；每次必須 fresh-read branch head。
- 最新已記錄 Source：Unified Menu 消費、Shared Supply Runtime、SMM Mobile Profile、Service Worker cache 修正、SMT direct mutation。
- Evidence：部分裝置里程碑及 Source；offline queue、重新登入、printer、完整 device acceptance 未完成。
- 舊 PR #34／舊 head 只作歷史基線，唔可直接當最新施工真相。

### A 線 Customer
- Repo：`Pantonyeung/morefun-ordering-web`
- 現役施工已進入 `customer-preview`／Unified Menu consumer 路線；舊 `feat/g1-customer-runtime-consumer-v1` PR #22 只作演進基線。
- 已有 latest-valid／previous-valid cache、Public Projection、availability overlay。
- 未完成：Safari／PWA offline cold-start、所有 mutation gate、完整 device acceptance。

### Platform B｜隔離重建線
- Repo：`Pantonyeung/morefunos-platform-b`（Private）
- Branch：`agent/part0-monorepo-foundation`
- Draft PR：#1／mergeable
- Fresh PR head：`259d0f39c245abfcae4ae2353c1a022ede239860`
- 性質：完全隔離 B 線；不可覆蓋 A 線 Authority／Production。
- 已有：Monorepo foundation、F4 Supply contracts、Offline Runtime、Worker／OAuth foundation。
- 未完成：Firebase Menu Reader、Supply Repository、Staff Token Verifier、Runtime Factory、真實資源 binding、部署與端到端 evidence。

### 舊 SMM／Core
- `morefunos-smm`：`SUPERSEDED AS INDEPENDENT CORE／MIGRATION SOURCE ONLY`。
- `morefunos-core`：仍空白；禁止為整理而建立空架構、空 schema、空 docs 或大量 CI。

## 5. 現時唯一優先事項
先完成 **Unified Menu＋F4 Supply 真實閉環收口**，同時保持 A／B 線嚴格隔離：

`Admin menu／availability mutation → Worker auth＋revision＋idempotency → Firebase authority → SMT Register／Mobile shared store → Customer mutation gates`

完成條件：售罄／恢復／paused、offline queue、re-login、token revoke、revision conflict、duplicate retry、Safari／Android／printer／store evidence。未達對應 evidence，不得稱 Production 完成。

## 6. 工作方法
`單一問題 → isolate → reproduce → 第一個 fatal evidence → root cause → minimal native-core fix → targeted verification → minimum regression → clean integration → one final gate`

修改前建立 checkpoint／rollback。新增文件必須取代、合併或直接被施工使用；過期 branch／head／run log 移入 History。

## 7. 永久踩坑索引
中央：`MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`。

禁止重犯：舊 WORK03／V42EG 當現役、default branch 當 latest、UI filter 當資料保護、CI 當 debug loop、Cloudflare Git Integration 同 GitHub Actions 混為一談、Cache 舊版本誤判 Source、Software PASS 當 Device／Store PASS。