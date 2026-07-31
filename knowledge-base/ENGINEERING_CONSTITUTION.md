# MoreFunOS Engineering Constitution V2.0

Status: CURRENT / MANDATORY READ
Authority: MoreFunOS Master Control
Updated: 2026-08-01 HKT
Supersedes: `archive/DEVELOPMENT_MANDATORY_RULES_V1.2.md`

> 呢份文件係 MoreFunOS 唯一現役工程制度文件。所有 AI、Codex、agent 同工程師正式開工前必須閱讀。

## Mandatory read order

1. `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`
2. `knowledge-base/CURRENT_STATUS.md`
3. `knowledge-base/ENGINEERING_CONSTITUTION.md`
4. 相關 repo `README.md` / `AGENTS.md`
5. 相關 `CURRENT_DOMAIN_AUTHORITY.md`
6. `ENGINEERING_LOG.md` 頂部 `CURRENT HANDOFF`
7. Active branch / PR / observed head / source / tests

## Stable engineering rules

- 每個 Domain 只可有一個 Canonical Authority；唔存在一個包辦所有領域嘅單一 Truth Source。
- 正式修改必須融入唯一 Native Core / Domain / State / Store / Contract / Component Owner / Hardware Boundary。
- 禁止 Patch、Bridge、DOM hack、Polling、Reload、第二套 State、第二套 Runtime、第二套 SMM Core。
- 問題必須拆成單一 Root Cause，單獨重現、單獨修正、單獨驗證，再合拼成完整版本。
- 同一問題連續三次修正仍失敗，必須停止疊加代碼，重新審核 Authority / State Owner / Contract / Boundary。
- Offline / Recovery 必須跟隨所屬 Vertical Slice 分階段完成，唔可以全部延後。
- Evidence 必須分級：`SOURCE_EXISTS → CONTRACT_PASS → BROWSER_PASS → DEVICE_PASS → HARDWARE_PASS → STORE_PASS → PRODUCT_LOCKED`。
- Task、Gate、Port、MoreFunOS 進度必須分開；任何百分比都要有分母、權重、Evidence。
- `100% Task` 唔等於 `100% Gate`、`100% Port` 或 `100% MoreFunOS`。
- 禁止建立多份獨立 Handoff；接手內容只可放喺 `ENGINEERING_LOG.md` 頂部唯一 `CURRENT HANDOFF`。
- `CURRENT HANDOFF` 同 `LATEST PROGRESS MATRIX` 可覆寫；歷史根因、Evidence、Decision、Rollback 只追加到 `APPEND-ONLY HISTORY`。
- 交付不得只寫「完成」；必須列出完成、未完成、已驗證、未驗證、百分比、Evidence、風險、Rollback、下一 Gate。
- 技術債、知識債、Evidence Debt、Rollback Debt 必須主動記錄。
- CI 唔作主要 debugger；昂貴 build / matrix / hardware gate 預設 manual-only。
- Secret、Token、Private Key、Password Hash / Salt 禁止進 Repo、前端、Drive、Jade 或聊天。

## Context reset gate

假設當前對話即時消失，下一個 AI 只讀 `CURRENT_STATUS.md` 同 `CURRENT HANDOFF`，必須可以直接開工。否則不得標記已完成交付。

## Archive boundary

`Development Mandatory Rules V1.2` 已降級為 `ARCHIVED / NON-AUTHORITY`，只供備份、歷史追溯同遷移核對。禁止由 V1.2 直接產生施工指令。
