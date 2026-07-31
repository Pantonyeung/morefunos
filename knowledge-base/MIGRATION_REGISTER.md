# MoreFunOS Knowledge Migration Register

Status: ACTIVE
Updated: 2026-07-31

## Purpose

逐份登記舊文件的分類、抽取結果及最終歸宿，防止遺漏或重複。

## Status Values

- `PENDING_AUDIT`
- `AUDITED`
- `EXTRACTED`
- `MIGRATED`
- `REDIRECTED`
- `ARCHIVED`

## Action Values

- `KEEP`
- `MERGE_AUTHORITY`
- `MERGE_STATUS`
- `MERGE_LOG`
- `EXTRACT_SHARED_TECH`
- `KEEP_EVIDENCE`
- `ARCHIVE`
- `REDIRECT`

## Migration Order

1. MoreFunOS integrated repository
2. Admin
3. Customer
4. SMT
5. SMM
6. Shared Technology consolidation
7. Cross-port duplicate check
8. Archive and redirect cleanup

## Register

| Scope | Source file / family | Canonical category | Action | Status | Notes |
|---|---|---|---|---|---|
| MoreFunOS | Master Authority | Authority | KEEP | AUDITED | 已存在，目前最高知識權威 |
| MoreFunOS | Engineering Log | Engineering Log | KEEP | AUDITED | Append-only |
| MoreFunOS | Document type audit baseline | Governance | MERGE_AUTHORITY | AUDITED | 已形成分類基線 |
| Admin | AGENTS / README | Entry | PENDING_AUDIT | PENDING_AUDIT | 抽取真正入口規則 |
| Admin | Progress / Milestone / Handoff / Pitfalls | Engineering Log | MERGE_LOG | PENDING_AUDIT | 去重後按日期合併 |
| Customer | AGENTS / README | Entry | PENDING_AUDIT | PENDING_AUDIT | 保留前台讀取順序與邊界 |
| Customer | Plans / Specs / Tests | Plan / Evidence | PENDING_AUDIT | PENDING_AUDIT | 分離未完成規格與驗證結果 |
| SMT | Handoff / QA / Integration Log | Log / Evidence | PENDING_AUDIT | PENDING_AUDIT | 技術規則需抽去 Shared Technology |
| SMM | Port Authority / Engineering Log | Authority / Log | KEEP | AUDITED | 已建立基本骨架 |
| Shared | Adaptive System | Shared Technology | KEEP | AUDITED | 已建立首份共用技術文件 |

## Mandatory Audit Output

每份來源文件完成審核後必須記錄：

- 唯一重點
- 重複內容
- Current / Historical 判定
- 應移到邊一份新文件
- 是否需要保留原檔
- Commit / Evidence

## Safety Rule

未完成抽取與核對之前：

- 不刪除舊文件
- 不覆蓋原始 Evidence
- 不將歷史內容誤標為 Current
- 不因檔名新而假設內容最新
