# More FunOS｜工程踩坑與已證明解法

> 狀態：CURRENT / PERMANENT ENGINEERING MEMORY
> 更新：2026-07-31 HKT
> Authority：`Pantonyeung/morefunos` → `main`

## 1. 使用規則

每次開發前先查本文件及對應 repo pitfalls。相同問題只更新同一 Entry，不建立重複紀錄。

每條紀錄最少包含：現象、重現條件、第一個 fatal evidence、根因、無效／禁止重試方法、正確解法、驗證、適用範圍、回滾點及可直接引用步驟。

## P-001｜錯把 default branch 當最新 Authority

- **現象**：只讀 `main` 漏 active PR；只讀 open PR 又漏 default uploads。
- **根因**：repo default branch 被誤當 Domain current authority。
- **正解**：`Master → Registry → repo AGENTS → active PR/head → evidence`。

## P-002｜第二套 Authority／補丁壓根因

- **現象**：CSS／Observer／runtime patch 愈疊愈多，改咗冇變或互相破壞。
- **禁止**：大量 `!important`、MutationObserver、DOM scan、第二套 Cart／Pricing／Order／Print truth。
- **正解**：Authority-first；查 DOM、selector、token、runtime write、cache、build、loader、QA chain。

## P-003｜完整 CI 反覆 Debug 單一問題

- **根因**：未隔離 exact failing unit，將 Final Gate 當 Debug 工具。
- **正解**：`isolate → reproduce → root cause → minimal fix → targeted verification → minimum regression → integration → one final gate`。

## P-004｜Scanner 掃描自己造成假陽性

- **現象**：secret／forbidden scan 命中 regex、規格或 scanner 自身。
- **正解**：限制 candidate runtime path／file type，保留檢查本身。

## P-005｜假設不存在的 Build 入口

- **現象**：`chmod gradlew` fail，但 compile 未開始。
- **正解**：fresh-read build topology，沿用唯一 production build pattern，例如 `gradle -p android`。

## P-006｜Compile step failure 誤判程式 failure

- **正解**：先讀第一個 fatal log；先排 command／path／env／permission，未有 implementation evidence 禁止改程式。

## P-007｜Connector／平台限制誤當應用 Regression

- **現象**：0-step、runner、connector visibility 問題被當 Runtime fail。
- **正解**：分開 infrastructure evidence 同 application evidence；必要時本機／Cloud Shell targeted 驗證。

## P-008｜Software PASS 誤寫成 Device／Production PASS

- **正解**：`CODE_EXISTS → CONTRACT_PASS → BROWSER_PASS → DEVICE_PASS → STORE_PASS → PRODUCT_LOCKED`。

## P-009｜長期分叉分支直接硬 Merge

- **正解**：以最新 baseline 建 clean integration branch，只抽取已證明功能，再跑 targeted／minimum regression。

## P-010｜舊接手流程仍被當現役

- **案例**：WORK03 Login／Push／Pull／Heartbeat／Fallback。
- **處理**：`SUPERSEDED / DO NOT CONTINUE`；移到 Historical／Migration reference。

## P-011｜只改 GitHub Actions，誤以為已停止 Cloudflare 自動部署

- **Domain**：Deployment／Cost／Governance
- **現象**：Workflow 已改 manual-only，但 branch push 仍觸發 Cloudflare build／preview。
- **根因**：GitHub Actions trigger 與 Cloudflare Git Integration 係兩套獨立自動化 Authority。
- **禁止重試**：只改 `.github/workflows` 就宣稱部署成本已收口。
- **正解**：分開盤點 GitHub Actions、Cloudflare production branch、preview branch、deploy hook、Firebase Hosting。
- **驗證**：控制台證據＋一次無意外 run 觀察。

## P-012｜Repo 文件被誤當控制台設定證據

- **Domain**：GitHub／Cloudflare／Firebase governance
- **現象**：因 repo 有 workflow／rules 文件，就聲稱 Actions General、Ruleset、Cloudflare 或 Firebase 已完成。
- **根因**：Code evidence 無法證明 SaaS 控制台 live state。
- **正解**：Repo source同控制台證據分開；無法觀察標 `DEFERRED`，不可虛構 PASS。

## P-013｜Firebase Rules 只有 `.write`，缺少 `.validate`

- **Domain**：Security／Data integrity
- **風險**：具寫權限者仍可寫入錯誤 schema；printer／auditLogs 權限過闊。
- **正解**：先備份，再做完整 Rules version replacement；加入 schema validation、最小權限、append-only／immutable boundary，再做 runtime smoke test。
- **禁止**：為求通過而全開 Rules 或零碎 patch。

## P-014｜角色存在雙重 Authority

- **案例**：RTDB `staffProfiles.role` 與 Firebase Custom Claims `morefunRole` 同時決定權限。
- **風險**：兩邊不同步，造成越權或誤拒絕。
- **正解**：鎖定 Owner identity／claim Authority；Staff 不建立 Firebase Auth User，經 Worker short-lived session；資料角色只作必要 profile，不成第二授權真相。

## P-015｜私人 Repo Ruleset 存在但未必真正強制

- **Domain**：GitHub governance
- **現象**：建立 Ruleset 後誤以為 branch protection 已生效。
- **正解**：確認帳戶／repo plan 同實際 enforcement evidence；無強制效果時不可當 Gate，避免建立假安全感。

## P-016｜敏感資料因「後端需要」而流入文件或前端

- **風險資料**：service account JSON、private key、passwordHash、passwordSalt、token、live credential。
- **正解**：只在受信任 secrets／server runtime 保存；API response 必須移除 password material；Drive／Jade／聊天只記錄架構與狀態，不記錄 secret value。

## 2. 已證明成功方法

1. Authority-first。
2. Fresh-read before write。
3. Targeted Failure Protocol。
4. Contract-first。
5. Clean integration。
6. Cache／Build chain verification。
7. Strangler migration。
8. Single build authority。
9. Evidence separation。
10. Checkpoint before cleanup。
11. GitHub／Cloudflare／Firebase 分開審核。
12. Workflow manual-only／read-only；結果用 artifact。
13. Firebase Rules：備份 → 全量替換 → 發布 → runtime smoke test。
14. 無法驗證就標 Deferred，不虛構 PASS。

## 3. Repo 特定索引

- SMT：Engineering Success／Targeted Failure／Change Impact。
- Admin：`ADMIN_PITFALLS_LOG`、WORK04 targeted logs、Staff Auth Master Checklist。
- Customer：最新 `AGENTS.md`／handoff／pitfalls；Authority reconciliation 未完成。

## 4. 維護規則

新案例屬既有 Pitfall 就追加 evidence；Repo 詳細 log 未遷移前不可刪除；Must Read 只留索引；Drive／Jade 只作鏡像。
