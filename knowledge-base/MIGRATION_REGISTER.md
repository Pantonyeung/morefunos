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
| MoreFunOS | `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md` | Authority | KEEP | AUDITED | 保留端口定義、閉環、Source of Truth、永久禁止、Gate、Evidence Level |
| MoreFunOS | Master Authority：Current Development Registry | Current Status | MERGE_STATUS | EXTRACTED | 屬易變 branch／PR／head／未完成事項；已建立 `knowledge-base/CURRENT_STATUS.md`，暫不刪原段落 |
| MoreFunOS | Master Authority：Immediate Next Priority | Current Status | MERGE_STATUS | EXTRACTED | 即時優先次序應由 Current Status 維護；Master 只保留治理規則 |
| MoreFunOS | `ENGINEERING_LOG.md` | Engineering Log | KEEP | AUDITED | 保留跨端口歷史、根因、成功方法、Evidence、commit 與下一步 |
| MoreFunOS | Master / Must Read / Registry legacy family | Entry / Authority / Status | MERGE_AUTHORITY | PENDING_AUDIT | 逐份抽唯一內容後轉 Redirect 或 Archive，不按檔名判權威 |
| MoreFunOS | Handoff / Progress / Milestone / Checkpoint family | Engineering Log | MERGE_LOG | PENDING_AUDIT | 只保留唯一 dated history |
| MoreFunOS | Pitfall / Success / Failure Protocol family | Log / Shared Technology | EXTRACT_SHARED_TECH | PENDING_AUDIT | 事件歷史入 Log；跨端可重用機制入 Shared Technology |
| MoreFunOS | Lock / Contract / Decision family | Authority / Contract | PENDING_AUDIT | PENDING_AUDIT | 有獨立引用價值先保留，否則併入 Authority |
| MoreFunOS | Test / Acceptance / Verification raw output | Evidence | KEEP_EVIDENCE | PENDING_AUDIT | 原始證據保持不可變，只在 Log 摘要 |
| MoreFunOS | Plan / Work Package / Checklist family | Plan / Specification | PENDING_AUDIT | PENDING_AUDIT | Active 期間保留，完成後抽結論並封存 |
| MoreFunOS | Final / Latest / Revised family | Depends on content | PENDING_AUDIT | PENDING_AUDIT | 名稱不構成 Authority |
| MoreFunOS | Document type audit baseline | Governance | MERGE_AUTHORITY | AUDITED | 已形成分類基線 |
| Admin | `CURRENT_DOMAIN_AUTHORITY.md` | Authority | KEEP | AUDITED | 已直接讀取；Admin 唯一 CURRENT Authority |
| Admin | `ENGINEERING_LOG.md` | Engineering Log | KEEP | AUDITED | 已直接讀取；唯一 append-only Admin 工程記錄 |
| Admin | `AGENTS.md` | Entry | PENDING_AUDIT | PENDING_AUDIT | 下一輪直接讀取，只保留 fresh-read 與執行入口 |
| Admin | `README.md` | Entry / Context | PENDING_AUDIT | PENDING_AUDIT | 下一輪直接讀取，應指向 Authority 而非複製規格 |
| Admin | WORK04 Current State / Implementation / Completion / Handoff / Plan Ready | Engineering Log | MERGE_LOG | AUDITED | 同一工作被拆成多份；唯一歷史應按日期併入 Admin Log，原檔後續 Redirect／Archive |
| Admin | WORK04A protected runtime config records | Shared Technology / Log | EXTRACT_SHARED_TECH | EXTRACTED | 固定 target、部署時注入、無 live values、拒絕 privileged credentials |
| Admin | WORK04B Firebase auth / connected-state records | Shared Technology / Log | EXTRACT_SHARED_TECH | EXTRACTED | auth 與 RTDB connectivity 分離；connected 需要 authenticated identity + `.info/connected` |
| Admin | WORK04C atomic hydrate / recovery records | Shared Technology / Log | EXTRACT_SHARED_TECH | EXTRACTED | remote validation、pre-hydrate recovery、rollback、correlation ID、malformed rejection |
| Admin | WORK04D integration / no-Actions verification records | Engineering Log / Evidence | MERGE_LOG | AUDITED | integration history入 Log；可重現測試與掃描結果保留 Evidence |
| Admin | WORK04E Owner Login design / plan / implementation / handoff | Authority / Log / Archive | MERGE_AUTHORITY | AUDITED | 最終安全邊界入 Authority；歷史入 Log；完成 Spec/Plan 轉 Archive |
| Admin | `WORK04G_MOBILE_MENU_PREVIEW_ACCEPTANCE.md` | Evidence | KEEP_EVIDENCE | AUDITED | 人手 iPhone／Preview 驗收屬不可變 Evidence，不成為 Authority |
| Admin | WORK04 CI blocker records | Engineering Log | MERGE_LOG | AUDITED | 保留外部 blocker 與 evidence boundary，原檔後續 Archive |
| Admin | Targeted Failure / Low-Cost CI protocols | Shared Technology | EXTRACT_SHARED_TECH | EXTRACTED | 跨端口可重用，應中央化後 Redirect |
| Admin | Executable tests / verification scripts | Evidence / Tooling | KEEP_EVIDENCE | AUDITED | 保留作可重現證據，不搬入 Authority |
| Customer | AGENTS / README | Entry | PENDING_AUDIT | PENDING_AUDIT | 保留前台讀取順序與邊界 |
| Customer | Plans / Specs / Tests | Plan / Evidence | PENDING_AUDIT | PENDING_AUDIT | 分離未完成規格與驗證結果 |
| SMT | Handoff / QA / Integration Log | Log / Evidence | PENDING_AUDIT | PENDING_AUDIT | 技術規則需抽去 Shared Technology |
| SMM | Port Authority / Engineering Log | Authority / Log | KEEP | AUDITED | 已建立基本骨架 |
| Shared | Adaptive System | Shared Technology | KEEP | AUDITED | 已建立首份共用技術文件 |

## MoreFunOS Core Placement Rule

### Master Authority only

- Port ownership and boundaries.
- End-to-end closure.
- Source-of-truth assignments.
- Permanent prohibitions.
- Gate definitions.
- Evidence-level meaning.
- Canonical authority hierarchy.

### Current Status only

- Current gate.
- Active branch / PR / observed head.
- Blockers and unresolved items.
- Immediate next action.
- Knowledge migration progress.

### Integrated Engineering Log only

- Historical progress and milestones.
- Root causes and pitfalls.
- Successful methods and rollback points.
- Verification outcome and evidence boundary.
- Commit / artifact traceability.
- Historical handoff details.

### Shared Technology only

- Cross-port reusable mechanisms.
- Technology principles independent of one milestone.
- Standard failure, recovery and compatibility behavior.

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
