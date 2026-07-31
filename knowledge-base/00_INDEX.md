# MoreFunOS Knowledge Base V2

Status: CURRENT NAVIGATION
Authority: MoreFunOS Master Control
Updated: 2026-08-01 HKT

## Purpose

呢份文件係 MoreFunOS 知識庫唯一導航入口。

任何 AI、工程師或接手者，先由本頁判斷應讀取邊一類文件；不得先掃描全部歷史文件。

## Mandatory read order

1. `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`
2. `knowledge-base/CURRENT_STATUS.md`
3. `knowledge-base/ENGINEERING_CONSTITUTION.md` — **CURRENT / MANDATORY READ**
4. `knowledge-base/AI_EXECUTION_RULES.md`
5. 相關端口的 `README.md`／`AGENTS.md`
6. 相關端口的 `CURRENT_DOMAIN_AUTHORITY.md`
7. 相關端口 `ENGINEERING_LOG.md` 頂部 `CURRENT HANDOFF`
8. Active branch／PR／observed head／actual source／tests
9. 需要時讀 `knowledge-base/03_SHARED_TECH/README.md`
10. 需要追溯時先讀 Evidence／Archive

## Current and archive status

### Current mandatory engineering document

- `knowledge-base/ENGINEERING_CONSTITUTION.md`
- Status: `CURRENT / MANDATORY READ`
- Purpose: 現役工程制度、AI 行為、Progress、Handoff、Evidence、Native Core 規則

### Archived predecessor

- `knowledge-base/archive/DEVELOPMENT_MANDATORY_RULES_V1.2.md`
- Status: `ARCHIVED / NON-AUTHORITY`
- Purpose: 備份、歷史追溯、V1.2 → V2.0 遷移核對
- Prohibition: 不得作現役施工或 AI 必讀依據

Migration record:

- `knowledge-base/V1.2_TO_V2.0_MIGRATION_REPORT.md`

## Canonical structure

```text
knowledge-base/
├── 00_INDEX.md
├── CURRENT_STATUS.md
├── ENGINEERING_CONSTITUTION.md
├── AI_EXECUTION_RULES.md
├── DOCUMENT_TAXONOMY.md
├── MIGRATION_REGISTER.md
├── V1.2_TO_V2.0_MIGRATION_REPORT.md
├── CROSS_PORT_CONFLICT_AUDIT.md
├── ARCHIVE_REDIRECT_MANIFEST.md
├── 02_PORTS/
│   ├── ADMIN/
│   ├── CUSTOMER/
│   ├── SMT/
│   └── SMM/
├── 03_SHARED_TECH/
├── evidence/
└── archive/
    └── DEVELOPMENT_MANDATORY_RULES_V1.2.md
```

## Port ownership

每個現役端口只保留：

- 一份 Current Domain Authority
- 一份 Engineering Log
- 端口專屬 Specification／Contract／Evidence

SMM 例外：SMM repo 係退役 Migration Source；正式 Mobile Profile 屬 SMT Shared Core。

## Shared Technology ownership

以下內容只可喺 Shared Technology 保留完整 Current Truth：

- Adaptive System
- Protected Runtime / Auth / Recovery
- Public Runtime Offline Recovery
- Offline Journal / Queue Recovery
- Session Token / Durable Login
- Android Host / Print / OTA
- Shared Core Mobile Profile
- Low-Cost Targeted Development

端口只可引用或描述採用邊界，不得再抄完整規則。

## Non-duplication rule

同一項規則只可以有一個 Current Truth。

其他文件只可：

- 引用
- 紀錄實作歷史
- 保存驗證證據
- 保存詳細規格
- 標示已被取代

## Conflict and cleanup control

- 工程憲章：`knowledge-base/ENGINEERING_CONSTITUTION.md`
- AI 執行規則：`knowledge-base/AI_EXECUTION_RULES.md`
- 四端衝突基線：`knowledge-base/CROSS_PORT_CONFLICT_AUDIT.md`
- Archive／Redirect 規則：`knowledge-base/ARCHIVE_REDIRECT_MANIFEST.md`
- 逐項遷移狀態：`knowledge-base/MIGRATION_REGISTER.md`

## Evidence levels

`SOURCE_EXISTS → CONTRACT_PASS → BROWSER_PASS → DEVICE_PASS → HARDWARE_PASS → STORE_PASS → PRODUCT_LOCKED`

任何較低級 Evidence 不得被描述成較高級完成。
