# MoreFunOS｜G0.5 Branch／Workflow／Runtime Authority Matrix

狀態：G0.5 CLOSEOUT CANDIDATE
更新：2026-07-30 16:28 HKT
最高規範 Repo：`Pantonyeung/morefunos`

## 1. Default Branch Baseline

| Repository | Default Branch | Default Branch Role |
|---|---|---|
| `Pantonyeung/morefunos` | `main` | Project OS／Authority／跨端規範 |
| `Pantonyeung/morefunos-admin` | `main` | Admin 穩定基線；不代表目前開發候選 |
| `Pantonyeung/morefunos-smt` | `main` | SMT 歷史穩定基線；不代表目前開發候選 |
| `Pantonyeung/morefunos-smm` | `main` | SMM 歷史／獨立基線；目前不作獨立核心 Authority |
| `Pantonyeung/morefun-ordering-web` | `main` | Customer 穩定基線；待候選線完成 reconciliation |

## 2. Active Development Authority

| Domain | Repository | Authority Branch／PR | Status | Merge Rule |
|---|---|---|---|---|
| Project OS | `Pantonyeung/morefunos` | `main` | ACTIVE AUTHORITY | 所有跨端規範、Authority、Gate 記錄以此為準 |
| Admin | `Pantonyeung/morefunos-admin` | `feat/admin-p0-full-connect-v1`／PR #1 | ACTIVE CANDIDATE | 未完成 staging／runtime gate 前禁止合併 production authority |
| SMT | `Pantonyeung/morefunos-smt` | `smt-main-candidate-v1`／PR #34 | PRIMARY CANDIDATE | 以 `smt-functional-completeness-v1` 為 base；完成手動 Gate 後才可晉升 |
| SMT Printer | `Pantonyeung/morefunos-smt` | `printer-transport-settings-v1`／PR #17 | RETAINED MODULE CANDIDATE | 只作 Printer module authority；不可反向覆蓋 SMT Runtime authority |
| SMT Required Flow | `Pantonyeung/morefunos-smt` | PR #20 | RETAINED MODULE CANDIDATE | 僅在 PR #34 未包含同等／更新實作時才可整合 |
| SMT Recovery | `Pantonyeung/morefunos-smt` | PR #23 | RETAINED MODULE CANDIDATE | 只作 Recovery domain reference／integration source |
| SMT Incoming Queue | `Pantonyeung/morefunos-smt` | `incoming-queue-domain-v1`／PR #24 | RETAINED MODULE CANDIDATE | 只作 Incoming Queue domain authority |
| Customer | `Pantonyeung/morefun-ordering-web` | PR #21 | RECONCILIATION REQUIRED | 未完成與現行 Customer lock 對齊前不可宣稱 Authority |
| SMM | `Pantonyeung/morefunos-smm` | none | SUPERSEDED AS INDEPENDENT CORE | SMM 應由 SMT domain／shared contract 衍生，不可另起衝突核心 |

## 3. Workflow Cost Authority

### Manual Only

以下 Workflow 只能使用 `workflow_dispatch`，不得恢復 `push`、`pull_request`、`schedule` 自動觸發，除非另有 Project OS Gate 文件批准：

- Admin `.github/workflows/ci.yml`
- Admin `.github/workflows/admin-validation-diagnostic.yml`
- Admin `.github/workflows/work04-firebase-targeted.yml`
- SMT Printer Module Contract
- SMT Incoming Queue Contract

### Permission Rule

- 預設：`contents: read`
- 禁止 Action bot 自動 commit／push 回 branch
- 禁止使用 result marker commit 觸發下一次 workflow
- Diagnostic／Contract Workflow 只可產生短期 artifact 或 log
- 部署 Workflow 必須獨立標示 environment、target、manual approval、rollback route

## 4. Runtime／Deploy Boundary

| Target | G0.5 Rule |
|---|---|
| Production Firebase | 未完成 staging 驗收前禁止由候選分支寫入 |
| Cloudflare Production | 不可由歷史分支／obsolete PR 自動部署 |
| APK／OTA | 只可由 SMT Primary Candidate 經 signed manifest、anti-replay、anti-downgrade、manual dry run 後執行 |
| Printer Runtime | Web／LAN／Native route 必須以 Printer contract 驗收；不可由 workflow 自動改 runtime source |
| Google Sheet | 作營運帳簿／報表副本；不可取代 Firebase Runtime Authority |

## 5. Branch Classification

### ACTIVE

- Project OS `morefunos/main`
- Admin PR #1
- SMT PR #34

### RETAINED／MODULE SOURCE

- SMT PR #17
- SMT PR #20
- SMT PR #23
- SMT PR #24
- Customer PR #21（待 reconciliation）

### SUPERSEDED／READ ONLY／DO NOT MERGE

SMT：#2、#3、#4、#5、#6、#7、#8、#16、#18、#21、#26、#27

Customer：#3

舊 WORK03／舊 WORK04 衝突線及其他未列入 Active Development Authority 的舊線，預設均不得重新成為 Authority。

## 6. G0.5 Exit Gate

G0.5 只有在以下條件有證據時才算完成：

1. Obsolete PR 已關閉或清楚標記 `SUPERSEDED / READ ONLY / DO NOT MERGE`。
2. 所有已知高成本 CI／Diagnostic／Contract Workflow 已轉 Manual Only。
3. 不存在 Action bot 自動 commit／push 迴圈。
4. Default Branch 與 Active Candidate Authority 已分開記錄。
5. SMT Primary Candidate、Admin Candidate、Customer Reconciliation 線已明確。
6. Production deploy／Firebase／APK OTA 不會由歷史線自動觸發。
7. 此 Matrix 已同步 Jade Note／Google Drive milestone record。

## 7. G1 Entry Rule

進入 G1 後：

- 新工作只可基於本 Matrix 的 Active Authority。
- 新 module 必須先聲明 upstream authority、integration target、manual test gate。
- 禁止由 obsolete branch copy 全量內容覆蓋 Active Candidate。
- 禁止重新建立 push-back CI marker、無限制 PR-trigger matrix、重複 deploy hook。
- 任何 Authority 變更必須先更新本文件，再執行 merge／deploy。
