# MoreFunOS Knowledge Base V2

Status: ACTIVE
Authority: MoreFunOS Master Control
Updated: 2026-07-31

## Purpose

呢份文件係 MoreFunOS 知識庫唯一導航入口。

任何 AI、工程師或接手者，先由本頁判斷應讀取邊一類文件；不得先掃描全部歷史文件。

## Read Order

1. `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`
2. `knowledge-base/CURRENT_STATUS.md`
3. 相關端口的 Current Authority
4. 相關端口的 Engineering Log
5. 需要時讀取 Shared Technology
6. 只有追溯歷史時才讀 Archive

## Canonical Structure

```text
knowledge-base/
├── 00_INDEX.md
├── CURRENT_STATUS.md
├── DOCUMENT_TAXONOMY.md
├── MIGRATION_REGISTER.md
├── ports/
│   ├── admin/
│   ├── customer/
│   ├── smt/
│   └── smm/
├── shared-technology/
├── business-rules/
├── architecture/
├── evidence/
└── archive/
```

## Port Knowledge Ownership

每個端口保留自己的：

- Current Authority
- Current Status
- Engineering Log
- 端口專屬 Contract / Decision / Evidence

端口文件解決唔到問題時，先提升到 MoreFunOS 整合層。

## Shared Knowledge Ownership

以下內容不得複製到四個端口：

- Adaptive System
- Offline Runtime
- Print Pipeline
- Sync / Recovery
- Authentication / Permission
- Data Contract
- Deployment / Rollback
- 其他可跨端口重用技術

共享技術只保留一份 Current Truth，各端口以引用方式使用。

## Non-Duplication Rule

同一項規則只可以有一個 Current Truth。

其他文件只可：

- 引用
- 紀錄實作歷史
- 保存驗證證據
- 標示已被取代

不得重新抄寫完整規則。

## Current Migration State

Knowledge Base V2 已開始建立。

詳細進度見：

- `knowledge-base/CURRENT_STATUS.md`
- `knowledge-base/MIGRATION_REGISTER.md`
