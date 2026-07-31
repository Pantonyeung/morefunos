# MoreFunOS Knowledge Base V2

Status: CURRENT NAVIGATION
Authority: MoreFunOS Master Control
Updated: 2026-07-31 HKT

## Purpose

呢份文件係 MoreFunOS 知識庫唯一導航入口。

任何 AI、工程師或接手者，先由本頁判斷應讀取邊一類文件；不得先掃描全部歷史文件。

## Mandatory read order

1. `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`
2. `knowledge-base/CURRENT_STATUS.md`
3. `knowledge-base/AI_EXECUTION_RULES.md`
4. 相關端口的 `README.md`／`AGENTS.md`
5. 相關端口的 `CURRENT_DOMAIN_AUTHORITY.md`
6. 相關端口的 `ENGINEERING_LOG.md`
7. Active branch／PR／observed head
8. 需要時讀 `knowledge-base/03_SHARED_TECH/README.md`
9. 需要追溯時才讀 Evidence／Archive

## Canonical structure

```text
knowledge-base/
├── 00_INDEX.md
├── CURRENT_STATUS.md
├── AI_EXECUTION_RULES.md
├── DOCUMENT_TAXONOMY.md
├── MIGRATION_REGISTER.md
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

## Execution ownership

所有 AI、Codex、Work、agent 及工程師必須遵守：

- `knowledge-base/AI_EXECUTION_RULES.md`

該文件規範 Fresh Read、Scope Lock、Authority Resolution、驗證、Evidence Level、記錄、Commit、交付及 autonomous execution boundary。

## Non-duplication rule

同一項規則只可以有一個 Current Truth。

其他文件只可：

- 引用
- 紀錄實作歷史
- 保存驗證證據
- 保存詳細規格
- 標示已被取代

## Conflict and cleanup control

- AI 執行規則：`knowledge-base/AI_EXECUTION_RULES.md`
- 四端衝突基線：`knowledge-base/CROSS_PORT_CONFLICT_AUDIT.md`
- Archive／Redirect 規則：`knowledge-base/ARCHIVE_REDIRECT_MANIFEST.md`
- 逐項遷移狀態：`knowledge-base/MIGRATION_REGISTER.md`

## Evidence levels

`SOURCE_EXISTS → CONTRACT_PASS → BROWSER_PASS → DEVICE_PASS → HARDWARE_PASS → STORE_PASS → PRODUCT_LOCKED`

任何較低級 Evidence 不得被描述成較高級完成。
