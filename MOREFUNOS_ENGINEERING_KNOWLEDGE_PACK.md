# MoreFunOS｜工程知識合併包

> Authority Level: D
> Status: CURRENT / PERMANENT ENGINEERING MEMORY
> Can Implement Directly: NO — must reconcile with Master／Registry／repo evidence
> Superseded By: NONE
> Valid Scope: MoreFunOS 全系統
> 更新：2026-07-31 HKT

## 1. 目前真實方向

- 四端：Admin Control Plane、Customer Experience、SMT Register＋Mobile Shared Core、SMT Android Host。
- 後端：Firebase Auth＋Firebase RTDB＋Cloudflare Worker＋Google Sheet V2 ledger mirror。
- 舊獨立 SMM、WORK01–03、Apps Script Staff Auth／Sync Runtime、舊 Sheet 即時 Authority 已淘汰。
- 每次實際 branch／PR／head／Evidence 必須 fresh-read `MOREFUNOS_CURRENT_DEVELOPMENT_REGISTRY.md`。

## 2. 最新階段邊界

- G0.5 Authority／Workflow／部署成本治理：已 Closeout。
- G1：Admin Publish、Staff Auth、Worker Runtime、跨端 Availability／Consumer foundation；Source／Contract 有進度，最新 deployment／device／store acceptance 未完整。
- G2：多端權限、營業／取餐、離線 WhatsApp Order、付款證明及人工核對之決策已鎖；跨端完整實作未完成。
- G3–G9：Order commit、Print closure、全系統 staging、安全恢復、Production／Store acceptance 仍未完成。

禁止把文件、Source 或局部測試寫成已上線。

## 3. 已證明成功方法

1. Authority-first：Master → Registry → repo `AGENTS.md` → active PR/head → evidence。
2. Fresh-read before write：branch／head 會前移，不靠舊接手內容。
3. Targeted Failure：單一問題隔離、重現、第一個 fatal evidence、最小修正。
4. Contract-first：先固定資料模型、權限、idempotency、recovery，再做 UI。
5. Clean integration：長期分叉只抽取已證明功能，不硬 merge。
6. Single Authority：Cart／Pricing／Order／Sync／Print／Build 各自只有一個真相。
7. Evidence separation：Source、Contract、Browser、Device、Store 分開。
8. 平台分開審核：GitHub Actions、Cloudflare、Firebase 控制台狀態互不代替。
9. Firebase Rules：先備份 → 全量替換 → 發布 → runtime smoke test。
10. Checkpoint before cleanup：先留 commit／artifact／rollback，再封存舊線。
11. 無法驗證就標 `DEFERRED`，不可虛構 PASS。
12. 三方同步：GitHub Authority、Drive mirror／archive、Jade navigation／milestone。

## 4. 核心踩坑去重清單

### P-001｜Default branch 當 Current Authority
只讀 main 會漏 active PR；只讀 PR 會漏後續 upload。正解：Registry＋Domain Authority＋fresh head。

### P-002｜第二套 Authority／補丁壓根因
大量 `!important`、Observer、DOM scan、runtime override 會令維護失控。正解：找唯一 Component／State／Runtime Write Authority。

### P-003｜完整 CI 反覆 Debug
Final Gate 不是 Debug 工具。先 targeted，再 minimum regression，最後一次 low-cost gate。

### P-004｜Scanner 掃描自己
Secret／forbidden scanner 命中規格或 regex 自身。正解：限制 candidate runtime path／file type。

### P-005｜假設錯誤 Build 入口
例如 repo 無 `gradlew` 但先執行 chmod。正解：fresh-read build topology，沿唯一 production build path。

### P-006｜Compile step failure 誤判程式 failure
先讀第一個 fatal log；先排 command、path、env、permission，再決定是否改 code。

### P-007｜Connector／平台限制誤當 Regression
0-step、runner、visibility、quota 問題要同 application evidence 分開。

### P-008｜Software PASS 當 Device／Production PASS
固定 evidence chain：Code → Contract → Browser → Device → Store → Product Locked。

### P-009｜長期分叉直接硬 Merge
會重新帶入舊 authority／patch。正解：domain diff＋clean integration。

### P-010｜舊流程當現役
WORK03 Login／Push／Pull／Heartbeat／Fallback、Apps Script、舊 Sheet 已 superseded。

### P-011｜只改 Actions 就以為 Cloudflare 停止部署
兩套 trigger 必須分開盤點；亦要檢查 Firebase Hosting。

### P-012｜Repo 文件當控制台證據
Workflow／Rules 文件不能證明 SaaS live state；必須控制台或 runtime evidence。

### P-013｜Firebase Rules 有 write 無 validate
會容許錯 schema。必須 default-deny、schema validation、最小權限、append-only／immutable 邊界。

### P-014｜角色雙重 Authority
`staffProfiles.role` 與 Custom Claims 同時決定權限會衝突。Owner identity／claim 與 Staff Worker Session 必須清楚分工。

### P-015｜Ruleset 存在但未真正 enforce
私人 repo／方案限制可能令規則只係表面存在；需要實際 enforcement evidence。

### P-016｜敏感資料流入文件／前端
service account、private key、hash、salt、token 只可存在受信任 secrets／server runtime。

### P-017｜Offline WhatsApp 後自動 Online Submit
會雙單。Offline Envelope 必須 stable ID、dedupe、人工 reconciliation，恢復網絡不得自動再提交。

### P-018｜付款截圖當收款真相
圖片／OCR／hash 只可輔助；必須人工對實際收款記錄，Payment Status 與 Order Status 分離。

### P-019｜Availability 與 Visibility 混用
售罄／paused 只改 availability，不應改產品分發／可見權限。

### P-020｜打印失敗改寫 Order Truth
Print Job 只回 printed／failed／retry；Order Truth 不因 printer failure 消失或重複。

## 5. 舊資料保留價值

V42EG／Apps Script／Google Sheet／WORK03 可保留：
- 舊 UI 及產品規則來源。
- Login／Session／Sync Contract 對照。
- Cursor、Idempotency、Fallback、migration 測試案例。
- 問題現象、錯誤日誌、踩坑。

不得保留為現役：
- 架構、branch、API、登入／同步 Authority。
- Current Next Step。
- 完成／上線聲明。

## 6. 每次更新格式

同一問題只更新同一 Entry，記錄：
- 現象／重現條件。
- 第一個 fatal evidence。
- 根因。
- 禁止重試方法。
- 正確解法。
- Targeted／Regression／Device evidence。
- 適用範圍。
- rollback。
- commit／PR／artifact。

易過期 branch／SHA 只放 Current Registry 或 repo handoff，不長期複製到本文件。
