# MoreFunOS｜AI Execution Rules

Status: CURRENT EXECUTION PROTOCOL
Updated: 2026-07-31 HKT
Authority: `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`
Applies to: ChatGPT, Codex, Work, autonomous agents, human engineers and any tool acting on MoreFunOS repositories.

## 1. Purpose

本文件規範所有 AI／工程師點樣接手、執行、驗證、記錄及交付 MoreFunOS 工作。

本文件不重新定義產品 Architecture、Business Rule、Data Model、Runtime 或 Port Authority。若本文件與 Master Authority 或相關 Port Authority 衝突，以較高級 Authority 為準，並停止擅自推進衝突部分。

## 2. Mandatory fresh-read order

開始任何正式工作前，必須 Fresh Read：

1. `MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`
2. `knowledge-base/CURRENT_STATUS.md`
3. `knowledge-base/AI_EXECUTION_RULES.md`
4. 相關 repository 的 `README.md`
5. 相關 repository 的 `AGENTS.md`
6. 相關 repository 的 `CURRENT_DOMAIN_AUTHORITY.md`
7. 相關 repository 的 `ENGINEERING_LOG.md`
8. Active branch／PR／observed head
9. 需要時才讀 Shared Technology、Specification、Evidence 或 Archive

禁止以記憶、舊對話摘要、檔名、舊 branch 或過往版本代替 Fresh Read。

## 3. Authority resolution

遇到不同文件內容不一致時，必須按以下次序判定：

```text
Global Master Authority
→ Knowledge Base Current Status
→ Port Current Domain Authority
→ Adopted Shared Technology / Contract
→ Active branch / PR / observed source
→ Engineering Log
→ Specification
→ Evidence
→ Archive / historical reference
```

檔名包含 `CURRENT`、`MASTER`、`FINAL`、`LATEST`、`LOCK`、`HANDOFF` 或版本號，不會自動取得 Authority。

未能按照以上次序解決的真實規格衝突，必須標記 `AUTHORITY_CONFLICT`；不得自行選一邊、平均融合或以最佳實踐取代。

## 4. Scope lock

執行者只可處理已授權工作範圍。

不得：

- 擴散需求；
- 重寫未要求修改的端口；
- 順手更換 Architecture；
- 以重構名義改 Business Logic；
- 將個人最佳實踐提升為產品規則；
- 因發現舊文件而恢復舊方案；
- 建立平行 Current Authority。

可以在不改 Authority 的前提下處理：

- 明確 Bug fix；
- Readability／maintainability improvement；
- Performance improvement；
- Device compatibility；
- Targeted refactor；
- Verification／QA；
- Documentation／Log；
- 已採納規格的實作。

## 5. Permanent prohibitions

除非 Master Authority 明確批准 Architecture change，永遠禁止新增第二套：

- Runtime Core
- Business Rule Engine
- Domain Model
- Data Model
- Pricing
- Cart
- Checkout
- Order Core
- Payment Core
- Availability Core
- Authentication／Permission Core
- Firebase Authority
- Sync／Recovery Core
- Print Core
- Current Authority

特別禁止：

- 將 SMM 恢復成獨立 Core；
- Mobile 直接控制實體打印機；
- Service Worker 處理 protected write authority；
- 以整頁縮放建立第二套 UI truth；
- 將 Browser PASS 描述為 Device／Hardware／Store PASS；
- 將 Queue success 描述為實體打印 success；
- 保存或提交明文密碼、privileged credential 或 live secret。

## 6. Execution sequence

每次正式工作必須依序完成：

### Step 1｜Fresh Read
完成 Mandatory Fresh Read，確認 Authority、Current Gate、Active branch／PR／head。

### Step 2｜Scope statement
在工作記錄中清楚寫明：

- In scope
- Out of scope
- Authority source
- Runtime impact
- Required evidence level

### Step 3｜Source inspection
先讀取實際 source、tests、configs、active diff；不得只根據計劃、handoff 或描述施工。

### Step 4｜Implement minimally
以最小、可審核、可回滾變更完成工作。禁止補丁疊補丁、無限 `!important`、硬壓 z-index、無理由 hardcode 或複製第二套邏輯。

### Step 5｜Targeted verification
先運行與改動直接相關的最低成本驗證；再按風險擴大回歸範圍。CI 不作主要 debugger。

### Step 6｜Evidence classification
所有結果必須標示實際 Evidence Level：

```text
SOURCE_EXISTS
→ CONTRACT_PASS
→ BROWSER_PASS
→ DEVICE_PASS
→ HARDWARE_PASS
→ STORE_PASS
→ PRODUCT_LOCKED
```

只可聲稱已實際取得的最高級別。

### Step 7｜Update records
工作完成或狀態改變時：

- 歷史、根因、Commit、Evidence、剩餘風險 → 相關 `ENGINEERING_LOG.md`
- Current gate／active branch／PR／blocker／next action 改變 → `knowledge-base/CURRENT_STATUS.md`
- Authority／Architecture／Business Rule 改變 → 必須先獲 Authority approval，再更新相應 Authority
- Shared reusable mechanism 改變 → 更新唯一 Shared Technology 文件
- Legacy 文件分類改變 → 更新 `MIGRATION_REGISTER.md`

不得為同一 Milestone 新增 standalone `FINAL`、`LATEST`、`COMPLETE`、`HANDOFF`、`PROGRESS` 或 `PITFALL` 文件。

### Step 8｜Commit and traceability
每個可交付變更必須有清晰 Commit，並記錄：

- Repository
- Branch
- Commit SHA
- PR（如有）
- Changed scope
- Verification result
- Evidence boundary
- Rollback point

### Step 9｜Delivery
交付時必須清楚分開：

- 已完成
- 未完成
- 已驗證
- 未驗證
- Runtime impact
- Deployment／device／hardware／store 狀態
- 下一個真實 Gate

不得使用模糊的「應該完成」「大致可以」「已全面完成」掩蓋未驗證部分。

## 7. Recording rules

### Current Status
只記錄會改變的即時狀態：

- Current gate
- Active branch／PR／observed head
- Blockers
- Immediate next action

### Port Authority
只記錄穩定的端口責任、邊界、Source of Truth、永久禁止和已批准決策。

### Engineering Log
只追加：

- Dated progress
- Root cause
- Failed approach
- Successful method
- Commit／PR
- Verification
- Evidence boundary
- Rollback
- Remaining risk

### Shared Technology
完整共用機制只保留一份。端口文件只引用及說明採用邊界。

### Evidence
原始 Evidence 不得被摘要覆蓋、改寫或提升級別。

## 8. Failure handling

遇到失敗時必須：

1. 保留原始錯誤；
2. 分辨 source bug、config、environment、credential、network、device、hardware 或 external blocker；
3. 不把 network／5xx 誤報為 credential failure；
4. 不破壞 local state、pending queue 或 last-known-good；
5. 不用大量無關改動掩蓋單一 root cause；
6. 記錄 failed approach，避免下一個 AI 重複踩坑；
7. 保持可回滾。

## 9. Write safety

以下情況必須停止相關寫入並標記：

- Authority conflict
- 缺少必要 source
- 需要 live secret／privileged credential
- 不可逆資料遷移
- 高風險 production mutation
- Business Rule 未批准改動
- Evidence 不足但工作要求聲稱更高完成級別

停止衝突部分不代表停止整個任務；其餘可安全、可確定部分應繼續完成。

## 10. Autonomous execution boundary

在已授權範圍內，AI 可以自主推進到可驗收版本，不需逐步等待確認。

只有以下情況需要交由 Authority 決定：

- 真實 Architecture conflict
- Business Rule conflict
- 額外權限／credential
- 不可逆或高風險操作
- 兩個同級 Authority 無法解決的衝突

一般 implementation detail、targeted fix、documentation update、verification 和可回滾改進，不應反覆要求確認。

## 11. Definition of done

一項工作只有在以下條件全部滿足時，才可按其 Evidence Level 標記完成：

- Scope 已實作；
- Authority 未被破壞；
- Targeted verification 已通過；
- Required records 已更新；
- Commit／PR 可追溯；
- 未完成 Gate 已清楚列出；
- 沒有將低級 Evidence 誇大為高級 Evidence。

`SOURCE IMPLEMENTED`、`CONTRACT PASS`、`DEPLOYED`、`DEVICE ACCEPTED`、`HARDWARE ACCEPTED`、`STORE ACCEPTED` 和 `PRODUCT LOCKED` 是不同狀態，不得互相代替。

## 12. Enforcement

所有 repository 的 README／AGENTS 應指向本文件。

任何違反本規則產生的平行 Authority、第二 Runtime、重複 Business Logic 或證據誇大，均視為治理缺陷；後續 AI 必須先停止擴散，按 Canonical Authority 修正並在 Engineering Log 記錄根因。
