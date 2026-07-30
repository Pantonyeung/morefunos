# More FunOS｜工程踩坑與已證明解法

> 狀態：CURRENT / PERMANENT ENGINEERING MEMORY
> 更新：2026-07-30 10:43 HKT
> Authority：`Pantonyeung/morefunos` → `main`
> 用途：保留跨 repo、高頻、可重用踩坑與成功方法。Repo 特定細節仍以各 repo `PITFALLS`／`SUCCESS_AND_PITFALLS`／`TARGETED_FAILURE_LOG` 為準。

## 1. 使用規則

每次開發前先查本文件及對應 repo pitfalls。相同問題只更新同一 Entry，不建立重複紀錄。

每條紀錄必須包含：現象、重現條件、第一個 fatal evidence、根因、無效／禁止重試方法、正確解法、targeted verification、適用範圍、回滾點及可直接引用步驟。

## P-001｜錯把 default branch 當最新 Authority

- **Domain**：Governance／GitHub
- **現象**：只讀 `main`，漏掉 active branch／PR；或只讀 open PR，漏掉 default branch 後續 uploads。
- **根因**：將 repo-level default branch 誤當 domain-level current development authority。
- **禁止重試**：用單一 branch 代表整個 SMT／Admin／Customer；只睇 commit message。
- **正確解法**：先讀 Master Authority＋Current Development Registry，再 fresh-read 對應 active branch／PR／head SHA；同一 repo 按 Domain 選 Authority。
- **驗證**：Registry 必須列 repo、branch、PR、head、Evidence Level、未完成 Gate。
- **直接引用步驟**：`Master → Registry → repo AGENTS → active PR/head → evidence`。

## P-002｜建立第二套 Authority／補丁壓住根因

- **Domain**：UI／Runtime／State／Build
- **現象**：改咗冇變、不同尺寸互相改壞、CSS／Observer／runtime patch 越疊越多。
- **根因**：同一 Property／State／Action 有多個 Owner；未查 DOM／selector／token／cache chain。
- **禁止重試**：大量 `!important`、高 specificity、MutationObserver、DOM scan、單尺寸永久 patch、第二套 Cart／Pricing／Checkout／Order／Print truth。
- **正確解法**：Authority-first；按 `DOM → Authority → selector chain → Adaptive Token → JS runtime write → asset cache → child build → Shell build → root loader → QA evidence` 排查。
- **驗證**：Ownership audit＋targeted contract＋minimum affected regression。
- **回滾**：回到最後一個單一 Authority commit。

## P-003｜用完整 CI 反覆 Debug 單一問題

- **Domain**：CI／QA／成本
- **現象**：同一 Fail／Timeout 反覆跑 full Browser／APK／E2E，成本高而根因不清。
- **根因**：未隔離 exact failing unit，將 Final Gate 當 Debug 工具。
- **禁止重試**：單一問題每次觸發完整 CI；文件更新觸發 full CI。
- **正確解法**：`isolate → reproduce → root cause → minimal fix → targeted verification → minimum regression → integration branch → one final gate`。
- **驗證**：isolated PASS 後先進 integration；同一 commit 有可重現證據不得無目的重跑。

## P-004｜測試／驗證腳本掃描自己造成假陽性

- **Domain**：Security scan／Static gate
- **現象**：forbidden-pattern／secret scan 永遠命中，甚至命中規格或 regex 本身。
- **第一個 fatal evidence**：log 顯示命中 scanner 自身或非 runtime 文件。
- **根因**：掃描範圍未限制到 candidate configuration／runtime source。
- **禁止重試**：刪除 forbidden checks；全 repo 無差別掃描再猜。
- **正確解法**：限定明確檔案／路徑／副檔名，保留檢查本身。
- **驗證**：targeted scan PASS＋minimum security regression。

## P-005｜假設 repo 有不存在的 Build 入口

- **Domain**：Android／Gradle／CI
- **現象**：`chmod gradlew` 或 compile step fail，但 Kotlin 根本未開始。
- **根因**：未 fresh-read repo build topology，假設存在 `android/gradlew`。
- **禁止重試**：為迎合 workflow 新建第二套 Gradle Wrapper／Build Authority。
- **正確解法**：沿用 production build pattern：setup Android／Gradle，使用 repo 真實入口，例如 `gradle -p android`。
- **驗證**：先確認第一個 fatal command，再跑 Kotlin compile＋unit tests。

## P-006｜Compile step failure 誤判成程式 failure

- **Domain**：CI diagnosis
- **現象**：workflow 顯示 compile step fail，就直接修改 Kotlin／JS。
- **根因**：未讀第一個 fatal log；真正錯誤可能係 command、path、環境或權限。
- **禁止重試**：未讀 log 就改 implementation。
- **正確解法**：只處理第一個 fatal evidence；修執行入口後重跑單一 step。

## P-007｜Connector／平台觀察限制誤當應用 Regression

- **Domain**：GitHub Actions／Connectors
- **現象**：push workflow 已觸發但 connector 無法取得 job／log；或 0-step／runner failure 被誤判成應用錯誤。
- **根因**：平台／connector visibility 或 runner infrastructure，未進 application steps。
- **禁止重試**：無限 rerun、猜 billing／permission／runner 根因、修改 Runtime。
- **正確解法**：用一次性可觀察 trigger／infra-smoke／本機或 Cloud Shell 等價驗證；取得 evidence 後移除臨時 trigger。
- **驗證**：明確分開 infrastructure evidence 與 application evidence。

## P-008｜Software PASS 誤寫成 Device／Production PASS

- **Domain**：Evidence governance
- **現象**：Static／Contract／Browser／Kotlin compile 通過，就聲稱打印、OTA、Firebase 或店舖可用。
- **根因**：Evidence Level 混淆。
- **禁止重試**：排隊打印當出紙成功；Build PASS 當實機 PASS；Browser PASS 當 Store PASS。
- **正確解法**：固定層級：`CODE_EXISTS → CONTRACT_PASS → BROWSER_PASS → DEVICE_PASS → STORE_PASS → PRODUCT_LOCKED`。
- **驗證**：每項完成聲明附 commit／run／artifact／device／store evidence。

## P-009｜長期分叉分支直接硬 Merge

- **Domain**：Integration
- **現象**：舊 E-line／module branch 長期 diverged，直接 merge 造成 Authority／Runtime 回退。
- **根因**：把 branch 當完整真相，而非功能來源。
- **禁止重試**：硬 merge diverged branch；一次性大型重寫。
- **正確解法**：以最新 baseline 建 clean integration branch，逐檔搬已證明功能；先 static contracts，再 compile／unit／minimum regression。
- **已證明案例**：SMT Main Candidate `smt-main-candidate-v1`。

## P-010｜舊接手流程繼續被當現役

- **Domain**：Handoff／Architecture migration
- **現象**：舊 WORK03 `TEST_WORK03_UNIFIED_LOGIN → Session／Bootstrap → Push／Pull → Heartbeat → Fallback` 仍出現在 Current Next Step。
- **根因**：舊接手摘要未跟最新 Authority 同步淘汰。
- **狀態**：`SUPERSEDED / DO NOT CONTINUE`。
- **現役替代**：Firebase Auth＋Firebase RTDB＋Cloudflare Worker＋Google Sheet V2 ledger。
- **正確解法**：將舊流程移到 Reference／Migration History；Current Registry、Must Read、Handoff 只保留現役架構。

## 2. 已證明成功方法

1. **Authority-first**：修改前先找唯一 Owner。
2. **Fresh-read before write**：唔依賴舊對話／摘要／commit message。
3. **Targeted Failure Protocol**：只修第一個真正根因。
4. **Contract-first**：先鎖資料／責任／輸入輸出，再接 UI／Device。
5. **Clean integration**：長期分叉只抽取已證明內容。
6. **Cache／Build chain verification**：一次核對 asset key、child build、shell、loader。
7. **Strangler migration**：新 Authority 自足後逐步刪舊 Authority。
8. **Single build authority**：沿用 production build pattern，禁止第二套 build system。
9. **Evidence separation**：Software、Browser、Device、Store、Product Lock 分開記錄。
10. **Checkpoint before cleanup**：Git commit／Drive revision／Jade checkpoint 後先 archive／刪除。

## 3. Repo 特定索引

- SMT：`docs/qa/SMT_ENGINEERING_SUCCESS_AND_PITFALLS_V1.0.md`、`docs/qa/SMT_TARGETED_FAILURE_LOG.md`、`SMT_CHANGE_IMPACT.md`。
- Admin：`docs/ADMIN_PITFALLS_LOG.md`、WORK04 targeted failure／merge protocol及各工作 log。
- Customer：以 Customer repo 最新 `AGENTS.md`／handoff／pitfalls 為準；Authority reconciliation 未完成。

## 4. 維護規則

- 新案例若屬既有 Pitfall，追加 evidence，不新增重複 Entry。
- Repo 特定詳細 log 完成遷移前不可刪除。
- Must Read 只保留本文件索引，不複製長篇踩坑。
- Drive／Jade 只作鏡像；GitHub 為正式 Authority。
