# More FunOS｜文件權威分級與舊資料降權總表

> 狀態：CURRENT / MANDATORY DOCUMENT GOVERNANCE
> 生效：2026-07-31 HKT
> Authority：`Pantonyeung/morefunos/main`
> 目的：防止 AI／工程人員把過渡期、測試期、舊架構或歷史設計文件誤當現行四端閉環指導文件。

## 1. 五級 Authority

### A｜MASTER AUTHORITY
唯一可以直接指導架構、產品、商業規則及跨端開發：
- `MOREFUNOS_MASTER_CONTROL_AUTHORITY.md`
- `MOREFUNOS_DEVELOPMENT_MUST_READ.md`
- `MOREFUNOS_CURRENT_DEVELOPMENT_REGISTRY.md`
- `MOREFUNOS_DOCUMENT_AUTHORITY_CLASSIFICATION.md`
- Current Decision Ledger／Current Lock／Ownership／PRIMARY STANDARD

### B｜CURRENT ENGINEERING
只對指定 repo／domain／branch／PR／head 有效：
- 最新 `AGENTS.md`
- Active branch／PR／head evidence
- Current Implementation Status／Code Map／MFKG／Change Impact／QA／Handoff
- 狀態改變後必須降為 Historical 或 Superseded

### C｜REFERENCE ONLY
可以抽取背景、舊商業規則、遷移思路、UI 素材、測試案例；不得直接指導新四端閉環施工。

固定標籤：
`REFERENCE ONLY / NON-AUTHORITY / DO NOT IMPLEMENT DIRECTLY / MUST RECONCILE WITH CURRENT AUTHORITY`

### D｜ENGINEERING KNOWLEDGE
永久保留嘅踩坑、根因、成功方法、回滾及驗證模式。可以引用處理方法，但不得用舊架構結論覆蓋 Current Authority。

### E｜HISTORICAL / AUDIT
只供追溯、稽核、備份、版本比較。不得列入 Must Read，不得建立 Current Next Step。

## 2. 已正式降權嘅文件與資料族

以下全部預設為 `C｜REFERENCE ONLY` 或 `E｜HISTORICAL`，除非最新 A／B 級文件逐項重新採納：

### WORK 01／WORK 02／WORK 03
- WORK01 Apps Script V1.2.8 Audit／Alignment
- WORK02 Staff／Sync API、Staging Google Sheet、Heartbeat／Fallback、Apps Script deployment 設計
- WORK03 Install／Health／Staff Login／Session／Bootstrap／Push／Pull／Heartbeat／Fallback
- `TEST_WORK03_UNIFIED_LOGIN`
- API `1.2.9`／Sync `0.2`／`SHA256_FAST` 舊 Staff Auth 流程

定位：`REFERENCE_ONLY / SUPERSEDED_ACTIVE_IMPLEMENTATION / DO NOT CONTINUE`

可保留內容：Contract、migration 對照、idempotency、cursor、fallback、舊問題紀錄。
不可保留為現役：登入流程、Staff Session Authority、Apps Script Staff Auth、Google Sheet Sync Runtime、Next Step。

### Google Sheet／Apps Script 舊架構
- 舊 Google Sheet 作主資料庫／即時 Order Truth／正式派號／同步 Authority 的文件
- Apps Script gateway／Staff Auth／Sync Runtime／Heartbeat／Fallback implementation 文件
- RC2／V1.2.x／WORK01–03 schema、deployment、fixture、migration package

現行定位：
- Firebase RTDB＝operational authority
- Cloudflare Worker＝驗證、重新計價、Idempotency、正式寫入及受保護命令邊界
- Google Sheet V2＝ledger／reporting／non-blocking mirror
- Apps Script＝舊 adapter／migration／reference；除非新 A 級決策重新啟用，否則唔係現役 Runtime Authority

### V42／SA2／EG／舊版本資料
包括但不限於：
- `分支 · V42EG 設計與開發.txt`
- V42EG／V42DY／V42XX／SA2／舊 Customer root-five-file 記錄
- 舊 QA 對話、測試快照、臨時 branch handoff

定位：`REFERENCE ONLY / VERSION SNAPSHOT / NOT CURRENT DESIGN AUTHORITY`

可以抽取：舊 UI 外觀、當時產品規則、問題現象、測試證據、踩坑。
不得直接採用：舊 branch、舊 API、舊登入、舊尺寸 Authority、舊 Next Step、舊完成宣稱。

特別聲明：`分支 · V42EG 設計與開發.txt` 只記錄當時 WORK03 Health／Staff Login 測試狀態；唔係完整 UI 規格、唔係四端閉環架構、唔係現役設計指令。

### 舊 SMM independent core
- `Pantonyeung/morefunos-smm`
- 所有把 SMM 當第二套 Application／Domain／Runtime／Cart／Pricing／Order／Sync Authority 嘅文件

定位：`SUPERSEDED / MIGRATION SOURCE / HISTORICAL REFERENCE`

現役 Authority：`morefunos-smt` Shared Core＋`register`／`mobile` Profiles。

### 舊四端整合包／新對話主題包
任何早期「四端原生整合」、「接手主題包」、「Final Lock Package」如仍引用 V42EG、WORK03、獨立 SMM、Apps Script Staff Sync、Google Sheet 主權威，整份文件不得直接當 Current Authority。

處理方式：
- 保留可重用產品／UI／打印／營運要求
- 架構、Authority、repo、branch、API、登入、同步、部署內容必須以 A／B 級重新 reconciliation

## 3. 文件 Header 強制格式

所有新建或仍活躍文件必須有：

```text
Authority Level: A | B | C | D | E
Status: CURRENT | REFERENCE ONLY | SUPERSEDED | HISTORICAL
Can Implement Directly: YES | NO
Superseded By: <canonical path or NONE>
Valid Scope: <repo/domain/branch/PR/head>
Evidence Level: CODE_EXISTS | CONTRACT_PASS | BROWSER_PASS | DEVICE_PASS | STORE_PASS | PRODUCT_LOCKED
```

缺少 Header 的舊文件一律預設 `C｜REFERENCE ONLY`，不得因標題含 `LOCK`、`FINAL`、`MUST READ`、`CURRENT` 就提升權威。

## 4. AI／Agent 強制閱讀規則

1. 先讀 Master／Must Read／Registry／本分類表。
2. 再讀對應 repo `AGENTS.md` 及 active branch evidence。
3. 遇到 WORK03、V42、SA2、EG、Apps Script、Google Sheet、舊 SMM，先當 Reference；禁止直接跟從。
4. 如 Reference 有值得沿用內容，建立 `Re-adoption Proposal`，逐項標明來源、現行衝突、採納理由、Change Impact、驗證及產品負責人決定。
5. Reference 不得產生 Current Next Step，不得覆蓋 LOCKED／CURRENT，不得宣稱完成。

## 5. 現行四端閉環唯一方向

- Admin Control Plane
- Customer Experience
- SMT Application：`register`＋`mobile` Shared Core
- SMT Android Host／Hardware Plane
- Firebase Auth／RTDB＋Cloudflare Worker＋Google Sheet V2 ledger mirror

所有舊文件只可協助補充需求、遷移及工程經驗；不可反向改寫以上現行架構。
