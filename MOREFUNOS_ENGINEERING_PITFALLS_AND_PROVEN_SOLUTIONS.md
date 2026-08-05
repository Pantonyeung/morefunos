# More FunOS｜工程踩坑與已證明解法

> 狀態：CURRENT／永久工程記憶
> 更新：2026-08-05 HKT
> Authority：`Pantonyeung/morefunos` → `main`

## 使用規則
同一問題只更新同一 Entry。每條最少保留：現象、第一個 fatal evidence、根因、禁止重試、正解、驗證、適用範圍及回滾點。

## 高頻跨端 Pitfalls

### P-001｜Default branch／舊 Handoff 被當最新 Authority
- **現象**：只讀 `main` 漏 active PR；Drive／Jade 舊 Current 又覆蓋新狀態。
- **正解**：`Master → Must Read → repo AGENTS／Primary Standard → active PR 最新 head → evidence`。

### P-002｜第二套 Authority／補丁壓根因
- **禁止**：大量 `!important`、MutationObserver、DOM scan、第二套 Cart／Pricing／Order／Print truth。
- **正解**：先定位唯一資料、Render、Build、Cache、Loader Authority，再作最小修正。

### P-003｜完整 CI 反覆 Debug 單一問題
- **正解**：`isolate → reproduce → first fatal evidence → root cause → minimal fix → targeted verification → minimum regression → one final gate`。

### P-004｜Scanner／工具掃描自己造成假陽性
- **正解**：限制 runtime candidate path／file type；文件、測試及 scanner 自身不得當 secret evidence。

### P-005｜Build／環境錯誤誤判程式錯誤
- **正解**：先讀第一個 fatal log；先排 command、path、Node／Gradle／Wrangler 版本、權限及網絡，再改程式。

### P-006｜Connector／控制面不可見誤當 Runtime Regression
- **正解**：Infrastructure evidence、Application evidence、SaaS 控制台 evidence 分開；不可觀察就標 `DEFERRED`。

### P-007｜Software PASS 誤寫成 Device／Production PASS
- Evidence 固定：`SOURCE_EXISTS → CONTRACT_PASS → FULL_REGRESSION_PASS → DEPLOYED → BROWSER_PASS → DEVICE_PASS → HARDWARE_PASS → STORE_PASS → PRODUCTION_ACCEPTED`。

### P-008｜長期分叉直接硬 Merge
- **正解**：以最新 baseline 建 clean integration，只抽取已證明功能，再跑 targeted／minimum regression。

### P-009｜GitHub Actions 同 Cloudflare Git Integration 混為一談
- 兩者係獨立部署 Authority；改 Workflow 不等於停止 Cloudflare 自動 Build。

### P-010｜Code／Repo 文件被誤當控制台 live state
- Ruleset、Firebase Rules、Cloudflare 設定必須有控制台或實際 runtime evidence。

### P-011｜Firebase Rules 只有 write、缺少 validate
- **正解**：備份 → 全量版本替換 → schema validation／最小權限 → 發布 → runtime smoke test。

### P-012｜角色及身份雙重 Authority
- Owner：Firebase Auth＋locked claim；Staff：Worker short-lived session。資料 profile 不可成第二授權真相。

### P-013｜敏感資料流入前端／文件
- service account、private key、password material、token 只可留 secrets／server runtime；Drive／Jade／聊天只記架構及狀態。

### P-014｜固定尺寸被誤做獨立版面
- 1280×800、1920×1080、手機、平板只係驗收 Profile。
- 禁止整頁 Scale、Copy Page、iframe 尺寸分流、尺寸專用 Store 或第二 Render Path。

### P-015｜HTTP 200／Mock／Surface Runner 冒充業務閉環
- **案例**：四端頁面可開，不代表 Customer 建單、Worker repricing、Firebase persistence、SMT／SMM／Admin 同單已通。
- **正解**：用同一真實訂單跑完整 Runtime Runner；每個 mutation 帶 idempotency、revision、audit、reload、recovery evidence。

### P-016｜Display ID 同 Runtime ID 混淆
- **案例**：`f4_combo` 與 `prod_f4_combo`。
- **第一個 fatal evidence**：Pricing／Product lookup `PRICING_UNBOUND` 或找不到正式產品。
- **禁止**：未核實就加 fallback。
- **正解**：先讀 known-good Pricing Contract，核對 canonical productId、configVersion、published revision。

### P-017｜遺漏 configVersion／Revision
- **風險**：舊價格、舊配置或 stale mutation 被接受。
- **正解**：Order Snapshot、Quote、Mutation、Reload 全鏈保存並驗證 configVersion／revision；stale 必須拒絕。

### P-018｜錯用 Public Projection 驗內部 Snapshot／Audit
- Public Tracking 只含客戶可見投影；不可用嚟驗證內部 Audit／完整 Order Snapshot。
- 應按 projection scope 使用對應 authenticated API／evidence。

### P-019｜非法重送同一狀態 Transition
- **案例**：Active 清單同時含 accepted／preparing／ready，舊 UI 對所有項目送 `ready`，造成 `ready→ready`。
- **正解**：UI action 由當前 state machine 決定；相同狀態不可再次 mutation。

### P-020｜Offline Replay 驗證次序錯誤
- **錯誤次序**：Revision 先於 Idempotency，重播合法已完成命令會被 stale revision 擋住。
- **正確次序**：`Idempotency → Revision → Transition → Commit`。
- **驗證**：重播同 key 不重複寫入；真正 stale 新命令仍被拒絕。

### P-021｜舊 Current Handoff 未隨主線轉換封存
- **案例**：B11 已 `SOFTWARE RUNTIME CLOSED`，但 Drive／Jade 仍保留「下一步做 B11 Runner V2」嘅 Current 文件。
- **正解**：新 Gate 成為 Current 時，同回合將舊 Current 改 `HISTORICAL／SUPERSEDED` 或 archive，保留取代關係。

## 已證明成功方法
1. Authority-first／Fresh-read before write。
2. Targeted Failure Protocol／Clean integration。
3. Contract-first／Single build authority。
4. Cache-chain verification。
5. Strangler migration。
6. Software／Browser／Device／Hardware evidence separation。
7. Checkpoint before cleanup。
8. 固定尺寸只作 Profile；同一 Component／State／Render Path。
9. 真實 Full Runtime Runner：同一訂單、同一 Published Config、同一 Firebase Authority、跨四端驗證。
10. Offline replay 固定 `Idempotency → Revision → Transition → Commit`。

## Repo 特定索引
- SMT：repo Engineering Success／Targeted Failure／Change Impact。
- Admin：`ADMIN_PITFALLS_LOG`、WORK04 logs、Staff Auth checklist。
- Customer：最新 AGENTS／handoff／pitfalls；Authority reconciliation 未完成。
- Platform B：B11／B12 handoff、Acceptance Registry、Runtime Runner、Offline／LAN logs。

## 維護規則
Repo 詳細 log 未遷移前不可刪；Must Read 只留索引；Drive 只作長期鏡像；Jade 只作導航／快速記憶。