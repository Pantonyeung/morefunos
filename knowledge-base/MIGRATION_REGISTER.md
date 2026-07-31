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
| MoreFunOS | Master Authority：Current Development Registry | Current Status | MERGE_STATUS | EXTRACTED | 已建立 `knowledge-base/CURRENT_STATUS.md` |
| MoreFunOS | Master Authority：Immediate Next Priority | Current Status | MERGE_STATUS | EXTRACTED | 即時優先次序由 Current Status 維護 |
| MoreFunOS | `ENGINEERING_LOG.md` | Engineering Log | KEEP | AUDITED | 保留跨端口歷史、根因、成功方法、Evidence、commit 與下一步 |
| MoreFunOS | Master / Must Read / Registry legacy family | Entry / Authority / Status | MERGE_AUTHORITY | PENDING_AUDIT | 抽唯一內容後轉 Redirect 或 Archive |
| MoreFunOS | Handoff / Progress / Milestone / Checkpoint family | Engineering Log | MERGE_LOG | PENDING_AUDIT | 只保留唯一 dated history |
| MoreFunOS | Pitfall / Success / Failure Protocol family | Log / Shared Technology | EXTRACT_SHARED_TECH | PENDING_AUDIT | 事件歷史入 Log；跨端機制入 Shared Technology |
| MoreFunOS | Lock / Contract / Decision family | Authority / Contract | PENDING_AUDIT | PENDING_AUDIT | 有獨立引用價值先保留 |
| MoreFunOS | Test / Acceptance / Verification raw output | Evidence | KEEP_EVIDENCE | PENDING_AUDIT | 原始證據保持不可變 |
| MoreFunOS | Plan / Work Package / Checklist family | Plan / Specification | PENDING_AUDIT | PENDING_AUDIT | Active 期間保留，完成後抽結論封存 |
| Admin | `CURRENT_DOMAIN_AUTHORITY.md` | Authority | KEEP | AUDITED | Admin 唯一 CURRENT Authority |
| Admin | `ENGINEERING_LOG.md` | Engineering Log | KEEP | AUDITED | 唯一 append-only Admin 工程記錄 |
| Admin | `AGENTS.md` / `README.md` | Entry / Context | KEEP | MIGRATED | 已改為入口與穩定 repo context |
| Admin | WORK04 Current State / Implementation / Completion / Handoff / Plan Ready | Engineering Log | MERGE_LOG | AUDITED | 同一工作多文件，結論應併入單一 Log |
| Admin | WORK04A protected runtime config records | Shared Technology / Log | EXTRACT_SHARED_TECH | EXTRACTED | 固定 target、部署時注入、拒絕 privileged credentials |
| Admin | WORK04B Firebase auth / connected-state records | Shared Technology / Log | EXTRACT_SHARED_TECH | EXTRACTED | auth 與 RTDB connectivity 分離 |
| Admin | WORK04C atomic hydrate / recovery records | Shared Technology / Log | EXTRACT_SHARED_TECH | EXTRACTED | validation、recovery、rollback、correlation ID |
| Admin | WORK04D integration / no-Actions verification records | Engineering Log / Evidence | MERGE_LOG | AUDITED | integration history入 Log；測試保留 Evidence |
| Admin | WORK04E Owner Login family | Authority / Log / Archive | MERGE_AUTHORITY | AUDITED | 安全邊界入 Authority；歷史入 Log |
| Admin | `WORK04G_MOBILE_MENU_PREVIEW_ACCEPTANCE.md` | Evidence | KEEP_EVIDENCE | AUDITED | 人手驗收不成為 Authority |
| Admin | Targeted Failure / Low-Cost CI protocols | Shared Technology | EXTRACT_SHARED_TECH | EXTRACTED | 已中央化 |
| Customer | `README.md` / `AGENTS.md` | Entry | KEEP | MIGRATED | 已改為穩定入口，不再保存第二套 Authority |
| Customer | `CURRENT_DOMAIN_AUTHORITY.md` | Authority | KEEP | AUDITED | 唯一 Customer CURRENT Authority |
| Customer | `ENGINEERING_LOG.md` | Engineering Log | KEEP | AUDITED | 已整合 G1 Runtime、Offline、Shadow、PWA 與 backend 歷史 |
| Customer | G1-E / G1-F milestones and handoffs | Log / Evidence | MERGE_LOG | EXTRACTED | 結論入 Log；原檔保留 Evidence/Archive |
| Customer | Firebase Shadow Mode family | Historical | ARCHIVE | EXTRACTED | Apps Script live-source 狀態已被取代 |
| Customer | PR #21 PWA / viewport cleanup | Spec / Evidence | KEEP_EVIDENCE | AUDITED | 長期 PWA 邊界已抽取；未完成實作不成 Authority |
| Customer | WORK04–05 backend and Firebase-primary platform docs | Cross-system history | MERGE_LOG | EXTRACTED | 不再屬 Customer Domain Authority |
| Customer | G2 payment-proof decisions | Proposal | KEEP | AUDITED | Pending Authority Review，未採納 |
| Customer | Public Runtime / offline recovery mechanism | Shared Technology | EXTRACT_SHARED_TECH | EXTRACTED | 已建立 `PUBLIC_RUNTIME_OFFLINE_RECOVERY.md` |
| SMT | `README.md` / `AGENTS.md` | Entry | KEEP | MIGRATED | 已移除多份同級 Authority 入口 |
| SMT | `CURRENT_DOMAIN_AUTHORITY.md` | Authority | KEEP | AUDITED | 唯一 SMT CURRENT Authority |
| SMT | `ENGINEERING_LOG.md` | Engineering Log | KEEP | AUDITED | PR #30–#35 主要結論已合併 |
| SMT | Start Here / Context Min / old handoffs | Entry / Historical | REDIRECT + ARCHIVE | AUDITED | 待完成唯一內容核對後處理 |
| SMT | PR #30 Runtime + Offline Endurance | Log / Shared Technology / Evidence | MERGE_LOG + EXTRACT_SHARED_TECH | EXTRACTED | 已抽 Offline Journal/Queue Recovery；Browser evidence保留 |
| SMT | PR #34 Main Candidate | Log / Evidence | MERGE_LOG | EXTRACTED | Clean integration、Supply Runtime、Android/OTA、rollback 已入 Log |
| SMT | PR #35 Remembered Staff Login | Active Log / Shared Technology | MERGE_LOG + EXTRACT_SHARED_TECH | EXTRACTED | Durable login/session boundary已抽；device acceptance pending |
| SMT | PR #31/#32 Low-cost CI | Shared Technology / Log | EXTRACT_SHARED_TECH | EXTRACTED | 使用既有 Low-Cost Targeted Development 中央規則 |
| SMT | PR #26/#27 D/E lines | Historical / Evidence | ARCHIVE + KEEP_EVIDENCE | EXTRACTED | Android/Print/OTA 共用邊界已抽；舊分支不可重合併 |
| SMT | PR #33 direct merge comparison | Historical evidence | ARCHIVE | AUDITED | Clean integration 取代 direct merge |
| SMT | Android Host / Print / OTA boundary | Shared Technology | EXTRACT_SHARED_TECH | EXTRACTED | 已建立 `ANDROID_HOST_PRINT_AND_OTA_BOUNDARY.md` |
| SMT | Session / durable login lifecycle | Shared Technology | EXTRACT_SHARED_TECH | EXTRACTED | 已建立 `SESSION_TOKEN_DURABLE_LOGIN_LIFECYCLE.md` |
| SMT | Change Impact / QA / Success & Pitfalls | Log / Shared Technology / Evidence | MERGE_LOG + EXTRACT_SHARED_TECH | PENDING_AUDIT | 已抽主要 runtime/session/hardware 機制；剩餘 unique pitfalls 待審核 |
| SMM | Port Authority / Engineering Log | Authority / Log | KEEP | AUDITED | 已建立基本骨架，下一階段全面審核 |
| Shared | Adaptive System | Shared Technology | KEEP | AUDITED | 已建立 |
| Shared | Protected Runtime/Auth/Recovery | Shared Technology | KEEP | EXTRACTED | Admin 抽取完成 |
| Shared | Public Runtime Offline Recovery | Shared Technology | KEEP | EXTRACTED | Customer 抽取完成 |
| Shared | Offline Journal Queue Recovery | Shared Technology | KEEP | EXTRACTED | SMT 抽取完成 |
| Shared | Session Token Durable Login Lifecycle | Shared Technology | KEEP | EXTRACTED | SMT 抽取完成 |
| Shared | Android Host Print and OTA Boundary | Shared Technology | KEEP | EXTRACTED | SMT 抽取完成 |
| Shared | Low-Cost Targeted Development | Shared Technology | KEEP | EXTRACTED | Admin/SMT 共用 |

## Placement Rule

### Master Authority only
Port ownership, end-to-end closure, source-of-truth assignments, permanent prohibitions, gates, evidence meanings and authority hierarchy.

### Current Status only
Current gate, active branch/PR/head, blockers, unresolved items, immediate next action and migration progress.

### Engineering Log only
Historical progress, root causes, successful methods, rollback points, verification outcomes, evidence boundaries and traceability.

### Shared Technology only
Cross-port reusable mechanisms, technology principles and standard failure/recovery behavior.

## Safety Rule

未完成抽取與核對之前：

- 不刪除舊文件
- 不覆蓋原始 Evidence
- 不將歷史內容誤標為 Current
- 不因檔名新而假設內容最新
