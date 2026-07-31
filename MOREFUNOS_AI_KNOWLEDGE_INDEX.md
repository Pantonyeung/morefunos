# MoreFunOS｜AI 知識庫總索引

> Authority Level: A
> Status: CURRENT
> Can Implement Directly: YES
> Superseded By: NONE
> Valid Scope: Pantonyeung/morefunos main and all active MoreFunOS repos
> Evidence Level: PRODUCT_LOCKED for governance only
> 更新：2026-07-31 HKT

## 0. 用途

本文件係所有 AI／Codex／工程接手者唯一導航入口。GitHub 係正式工程 Authority；Google Drive 係長期鏡像；Jade Note 係搜尋及接手導航。

任何開發前，先由本索引判斷要讀邊份文件，禁止由舊對話、舊版本包或檔名中的 LOCK／FINAL／CURRENT 自行推定權威。

## 1. 全部開發必讀順序

1. `MOREFUNOS_MASTER_CONTROL_AUTHORITY.md` — 全系統最高架構、四端定義、Source of Truth、Gate。
2. `MOREFUNOS_DEVELOPMENT_MUST_READ.md` — 所有硬規則、永久禁止、開工流程。
3. `MOREFUNOS_CURRENT_DEVELOPMENT_REGISTRY.md` — 最新 repo／branch／PR／head／Evidence／未完成 Gate。
4. `MOREFUNOS_DOCUMENT_AUTHORITY_CLASSIFICATION.md` — A–E 文件分級及舊資料降權。
5. `MOREFUNOS_DEVELOPMENT_GUARDRAILS.md` — 合併後的開發守則。
6. `MOREFUNOS_ENGINEERING_KNOWLEDGE_PACK.md` — 合併後的成功方法、踩坑、進度邊界。
7. 對應 repo 最新 `AGENTS.md`、PRIMARY STANDARD、Lock、Change Impact、Handoff、active PR／head evidence。

未讀完以上內容，禁止修改程式、建立新 CI、合拼或宣稱完成。

## 2. 按任務找文件

| 任務 | 必讀文件 |
|---|---|
| 判斷最高架構／端口責任 | Master Authority |
| 判斷目前做到邊、邊條 branch 有效 | Current Development Registry |
| 判斷某份舊文件可否直接施工 | Document Authority Classification |
| 開新功能／修錯／跑測試／合拼 | Development Guardrails |
| 查相同問題曾經點樣失敗／成功 | Engineering Knowledge Pack |
| Admin／Staff Auth／Firebase Publish | Registry → Admin `AGENTS.md` → Staff Auth Checklist／Current Handoff |
| SMT Register／Mobile／APK／打印 | Registry → SMT `AGENTS.md` → Main Candidate／Domain-specific evidence |
| Customer Runtime／離線菜單／下單 | Registry → Customer `AGENTS.md` → active branch reconciliation evidence |
| 舊 SMM | 只讀作 migration；現役 Authority 係 SMT Shared Core Mobile Profile |
| V42EG／WORK01–03／Apps Script／舊 Sheet | 只入 Archive／Reference；不可產生 Current Next Step |

## 3. Authority 分層

- **A｜Master Authority**：可直接指導全系統。
- **B｜Current Engineering**：只對指定 repo／domain／branch／PR／head 有效。
- **C｜Reference Only**：只抽取背景、舊 UI、商業規則、migration、Contract、測試案例。
- **D｜Engineering Knowledge**：保留根因、踩坑、成功方法、回滾及驗證模式。
- **E｜Historical／Audit**：只供追溯、備份、版本比較。

## 4. 已封存／降權範圍

以下全部預設 C 或 E：

- WORK01／WORK02／WORK03；`TEST_WORK03_UNIFIED_LOGIN`。
- Apps Script V1.2.x、舊 Staff Auth／Sync Runtime／gateway。
- 舊 Google Sheet 主資料庫、即時 Order Truth、派號及同步 Authority。
- V42／SA2／EG，包括 `分支 · V42EG 設計與開發.txt`。
- 舊 Customer root-five-file／版本快照。
- 舊 SMM independent core。
- 仍引用上述架構的舊四端整合包、Final Lock、接手主題包。

固定標籤：`REFERENCE ONLY / NON-AUTHORITY / DO NOT IMPLEMENT DIRECTLY / MUST RECONCILE WITH CURRENT AUTHORITY`。

## 5. 現役系統方向

- Admin Control Plane。
- Customer Experience。
- SMT Application：Register＋Mobile Shared Core。
- SMT Android Host／Hardware Plane。
- Firebase Auth＋Firebase RTDB＋Cloudflare Worker＋Google Sheet V2 ledger mirror。

Google Sheet／Apps Script 不再係現役 Runtime Authority；Staff／SMT／SMT Mobile 不直接寫受保護 RTDB。

## 6. Evidence 規則

`CODE_EXISTS → CONTRACT_PASS → BROWSER_PASS → DEVICE_PASS → STORE_PASS → PRODUCT_LOCKED`

任何 Source、文件或測試存在，都不可跨級聲稱已部署、實機通過或正式營運通過。

## 7. 維護規則

- Registry 只保存 Current 狀態；每次開工 fresh-read。
- Knowledge Pack 同一問題只保留一條 Entry，新增 evidence，不建立重複版本。
- Guardrails 只保存長期硬規則，不保存易過期 branch／SHA。
- 舊文件不刪除；移入 Archive／Reference，保留追溯。
- 每個重要 milestone 同步 GitHub、Google Drive、Jade Note。
