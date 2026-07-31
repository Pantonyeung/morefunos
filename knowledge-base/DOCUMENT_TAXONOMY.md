# MoreFunOS Document Taxonomy

Status: ACTIVE
Updated: 2026-07-31

## Objective

將現有文件歸納為有限、清晰、互不重複的類別。

## Canonical Categories

### 1. Entry

用途：告訴接手者由邊度開始讀。

保留類型：

- `00_INDEX.md`
- `AGENTS.md`
- 精簡 README

不得承載：完整規格、歷史紀錄、測試證據。

### 2. Authority

用途：保存目前有效、不可自行更改的 Current Truth。

包括：

- Master Authority
- Current Domain / Port Authority
- Boundary
- Lock
- Source of Truth

舊版本一律轉 Archive，不得並列為 Current。

### 3. Current Status

用途：五分鐘內理解目前做到邊、風險同下一步。

只包括：

- Current Gate
- Active branch / PR
- 已完成
- 未完成
- Blocker
- 下一步

不得寫長篇發展歷史。

### 4. Engineering Log

用途：Append-only 保存工程發展脈絡。

以下舊文件類型應合併入 Engineering Log：

- Progress
- Milestone
- Checkpoint
- Handoff
- Implementation Log
- Pitfalls
- Success Method
- Verification Summary
- Development Notes

標準條目：日期、修改、原因、結果、成功方法、踩坑、Evidence、Commit、下一步。

### 5. Shared Technology

用途：保存跨端口可重用的技術 Current Truth。

例如：

- Adaptive System
- Offline Runtime
- Print Pipeline
- Sync / Recovery
- Auth / Permission
- Data Contract
- Deployment / Rollback

不得埋藏喺端口 Engineering Log。

### 6. Contract / Decision / Lock

用途：保存需要被多個模組引用的正式約束。

例如：

- API Contract
- Data Model
- Runtime Contract
- Architecture Decision
- Naming / Directory Standard

當內容已完全併入 Authority，可保留 Redirect 或 Archive。

### 7. Evidence / Artifact

用途：保存驗證事實，不保存規則。

例如：

- Test result
- Acceptance report
- Browser / device evidence
- Screenshot index
- Regression report
- Production verification

### 8. Plan / Specification

用途：尚未完成或待執行的工作規格。

完成後：

- 有效結論提升到 Authority / Shared Technology
- 執行經過寫入 Engineering Log
- 原文件轉 Archive

### 9. Archive / Reference

用途：歷史追溯。

包括：

- 被取代 Authority
- 舊 Handoff
- 舊 Progress
- 舊 Work Package
- 舊 Milestone
- 已完成 Spec / Plan

Archive 不具有 Current Authority。

## Decision Rule

每份舊文件只能有一個主要歸宿：

- KEEP
- MERGE_AUTHORITY
- MERGE_STATUS
- MERGE_LOG
- EXTRACT_SHARED_TECH
- KEEP_EVIDENCE
- ARCHIVE
- REDIRECT

不得因方便而複製到多個位置。
