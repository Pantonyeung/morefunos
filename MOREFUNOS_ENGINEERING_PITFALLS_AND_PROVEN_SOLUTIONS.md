# More FunOS｜工程踩坑與已證明解法

> 狀態：CURRENT／永久工程記憶
> 更新：2026-08-09 HKT
> Authority：`Pantonyeung/morefunos` → `main`

## 使用規則
同一問題只更新同一 Entry。每條最少保留：現象、第一個 fatal evidence、根因、禁止重試、正解、驗證、適用範圍及回滾點。詳細案例留 repo-specific log；中央只保存跨端高頻經驗與索引。

## 高頻跨端 Pitfalls

### P-001｜Default branch／舊 Handoff 被當最新 Authority
- **現象**：只讀 `main` 漏 active PR；Drive／Jade 舊 Current 又覆蓋新狀態。
- **正解**：`Master → Must Read → repo AGENTS／Primary Standard → active PR 最新 head → Current Status／Handoff → evidence`。
- **2026-08-07 案例**：Platform B Current Handoff 已進入 B15-A12-02R，但 `knowledge-base/CURRENT_STATUS.md` 仍停 B15-A02；已同回合收口。
- **2026-08-09 案例**：同一 P-Line Current Status／Handoff 上半部已記錄 UI Interface Final Local Contract PASS，但下半部仍殘留 `FREEZE DRIFT GATE PENDING`；Drive／Jade 亦仍保存舊 Staging FAIL。第一個 fatal evidence係同一 Current 文件內證據層級互相矛盾。正解係 Fresh Read PR head＋最新 test/staging evidence後，壓縮同一 Current 文件並同步三方，禁止用新增第三份 Handoff 掩蓋漂移。

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

### P-022｜OTA Registry／Object 分開部署
- **現象**：Manifest 指向不存在或未同步 Object，Registry 表面健康但 Package 下載失敗。
- **第一個 fatal evidence**：Registry metadata 可讀，但內容定址 Object 回傳 404／SHA／Size 不符。
- **禁止**：只更新 Registry pointer、使用私人 GitHub Raw 當正式 Object Store。
- **正解**：Registry＋Object 同次部署；先驗 Object SHA／Size，再切 Active Pointer；失敗保持 Previous／Recovery。
- **驗證**：Deploy → Registry Validate → Object fetch → SHA／Size → Client staging → health → reload／rollback。

### P-023｜Source Gate 偷做 Build／Cache 無 Lockfile
- **現象**：輕量 Source Gate 因 setup-node cache／pnpm lockfile 或 Android build 失敗，造成無關成本及假阻塞。
- **根因**：驗證責任混合；Source Gate 同 Candidate Build 無分離。
- **正解**：Source Gate 禁止 Build；Hardware Candidate 只用手動、固定 source SHA 集中 Build。無 lockfile 時不可啟用依賴 cache。
- **回滾點**：固定已知 Candidate source／Artifact／SHA。

### P-024｜Node／Wrangler／Worker 入口未鎖
- **現象**：部署到錯 Worker、Node 20 與 Wrangler 不兼容、根目錄命令無 project。
- **第一個 fatal evidence**：Health 未顯示目標 Registry runtime，或 CLI 在 build 前已版本／project fatal。
- **禁止**：見到 workflow 紅色就修改 runtime code。
- **正解**：先核對 Worker 名、working directory、package script、Node 24、Wrangler 版本及 Token scope。

### P-025｜Health Check 循環自證／Build Artifact 冒充真機
- **現象**：Health endpoint 只回讀同一 Active Pointer；APK Build／Artifact／SHA PASS 被寫成 Device／Hardware PASS。
- **根因**：驗證由被測系統自己證明自己，缺少安裝、重啟、離線、Bridge、打印及實體結果。
- **正解**：按 Device Acceptance Runbook；第一個 FAIL 即停。
- **判定**：實機 Gate 全部完成先可升級 evidence。

### P-026｜模組化只拆 Component，仍共享隱藏狀態
- **現象**：表面有 Module，但模組互相調私有方法、直寫 Firebase／硬件、各自保存 Business Truth。
- **根因**：冇 Runtime Manifest、typed intent、Orchestrator 同 Canonical Projection 邊界。
- **正解**：`Runtime Manifest → Module Registry → Slot → Capability Module → typed intent → Orchestrator → Domain Command → Canonical Result`。
- **禁止**：無 Schema Global Event Bus、DOM／localStorage polling、每條產品線複製一套同名模組、用 Feature Flag 掩蓋 Contract 不兼容。

### P-027｜Source Harness 同真正 Deployed Artifact 分叉
- **Pitfall ID／Domain／日期**：P-027／Deployment＋UI Runtime／2026-08-07。
- **現象／重現**：Source `src/index.ts` 已有 Staff PIN Harness，但 Cloudflare Pages `/acceptance/b11` 仍只見舊 loader／redirect。
- **第一個 fatal evidence**：真正部署路徑 `public/acceptance/b11/index.html` 無新 Harness；package 無 build step 將 `src` 產生到 `public`。
- **根因**：Source Render Path 同 deployed static artifact 係兩條獨立路徑，測試只覆蓋 Source。
- **禁止重試**：只改 `src`、只睇 Typecheck／Vitest／HTTP 200、再加 redirect／loader 補丁。
- **正解／責任來源**：修改唯一實際部署 artifact，並將 deployed route 本身納入 contract test；Build／Deploy Authority 必須唯一。
- **驗證**：static contract → Cloudflare deploy → Browser 直接見 Harness → Runtime API acceptance。
- **適用／不適用**：適用任何 static output、PWA、Pages、bundled runtime；不適用有已證明 deterministic build pipeline 且 artifact 已驗 hash 嘅路徑。
- **回滾點**：部署前已知 static artifact commit；PR #69 禁止 force overwrite。
- **下次直接用**：先問「真正部署邊個目錄／檔案？」再驗 Source→Build→Artifact→Deploy 四段鏈。

### P-028｜Staging Published Config 污染字元被 Transport 問題誤導
- **Pitfall ID／Domain／日期**：P-028／Data Integrity＋Admin Publish／2026-08-07。
- **現象／重現**：Published Config v7 中文 label 出現 Unicode replacement character U+FFFD `�`。
- **第一個 fatal evidence**：Worker runtime read 可穩定重現污染值；Transport／Repository 只走 JSON／UTF-8，無轉碼邏輯。
- **根因**：既有 staging Published Config 已被污染，而非 Worker transport 即時轉碼。
- **禁止重試**：猜中文字直接覆寫、加 client fallback、將 `�` 靜默 replace 掉。
- **正解／責任來源**：Admin Validate 遞迴拒絕 U+FFFD；由真正內容 Authority 提供正確文字再重新 Publish。
- **驗證**：`CORRUPTED_UNICODE_REPLACEMENT_CHARACTER` targeted test → full gate → clean publish → runtime readback。
- **適用／不適用**：適用 Published Config／Catalog／Content；不適用已知 binary encoding 或非 UTF-8 protocol，該類要獨立診斷。
- **回滾點**：污染資料修正前保留現有 revision／audit，不作猜測性 mutation。
- **下次直接用**：先判斷「資料本身壞」定「傳輸轉碼壞」，用 raw readback＋repository path 對照。

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
11. OTA：Registry／Object 同次部署，內容定址驗證後原子切換，保留 Previous／Recovery。
12. Source Gate 無 Build；固定 Candidate 手動集中 Build，未證明 Native 缺口前禁止重 Build。
13. 模組化單體前端＋Runtime Manifest；未達真實多團隊獨立部署需求前禁止過早微前端。
14. Deployed-artifact-first verification：Source、Build output、真正部署目錄、Browser runtime 必須同一條鏈。
15. Data-integrity-first validation：污染資料先 fail closed，禁止 client 猜值修復。
16. Current-document consistency gate：同一份 Current 內 branch/head/evidence/next step 必須只出現一套現行答案；舊段落要移 History，唔可以留低互相矛盾嘅 PASS/PENDING。

## Repo 特定索引
- SMT：repo Engineering Success／Targeted Failure／Change Impact。
- Admin：`ADMIN_PITFALLS_LOG`、WORK04 logs、Staff Auth checklist。
- Customer：最新 AGENTS／handoff／pitfalls；Authority reconciliation 未完成。
- Platform B：B11–B15 handoff、Acceptance Registry、Runtime Runner、Offline／LAN／OTA／Hardware／B15 preflight logs。
- UI Production：Matrix authority／UI Interface registry／Owner review／P-Line batch interface backlog；候選能力不可冒充 Runtime truth。

## 維護規則
Repo 詳細 log 未遷移前不可刪；Must Read 只留索引；Drive 只作長期鏡像；Jade 只作導航／快速記憶。