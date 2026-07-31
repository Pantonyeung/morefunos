# MoreFunOS｜統一開發守則

> Authority Level: A
> Status: CURRENT / HARD RULE
> Can Implement Directly: YES
> Superseded By: NONE
> Valid Scope: MoreFunOS 全系統
> 更新：2026-07-31 HKT

## 1. 開工前

必讀：Master Authority → AI Knowledge Index → Current Registry → 本文件 → 對應 repo `AGENTS.md`／Lock／Change Impact／active PR／head evidence。

未讀完，禁止修改、合拼、部署或宣稱完成。

## 2. 唯一施工流程

```text
單一問題
→ isolate exact failing unit
→ reproduce
→ 找第一個 fatal evidence
→ root cause
→ minimal fix
→ targeted verification
→ minimum affected regression
→ integration branch
→ one final low-cost gate
```

禁止：
- 一條 branch 混入多個無關問題。
- 反覆用完整 CI debug 單一問題。
- patch／override／大量 `!important`／Observer／DOM scan 壓住根因。
- 未有 evidence 就改 Architecture。
- 長期分叉直接硬 merge。

## 3. Authority 與資料真相

- Admin Published：產品、價格、選項、套餐、規則。
- Runtime Snapshot：售罄、暫停、等候時間、營業狀態。
- Cloudflare Worker：身份、授權、重計價、Idempotency、正式命令邊界。
- Order Authority：正式訂單狀態與唯一 Order ID。
- Google Sheet V2：ledger／reporting mirror，非即時真相。
- SMT Register＋Mobile：共用 Domain、State、Cart、Pricing、Order、Sync、Permission、Recovery。
- Android Host：打印、硬件、離線持久化、Native Bridge、OTA。

禁止第二套 Cart／Pricing／Order／Sync／Print Authority。

## 4. 身份與安全

- 角色只保留 `owner`／`staff`。
- Owner 使用 Firebase Auth。
- Staff 不建立 Firebase User；由 Admin 管理私有帳號，經 Worker 取得短期 Session。
- Staff／SMT／Mobile 不直接寫受保護 RTDB。
- 密碼只保存 salt＋versioned hash；以 `sessionVersion` 撤銷舊 Session。
- service account JSON、private key、password hash／salt、token、live credential 禁止進入 Repo、前端、Drive、Jade 或聊天。
- Firebase Rules 必須 default-deny、schema validate、最小權限；禁止為求通過而全開。

## 5. CI 與成本

- 問題分支預設 targeted test；文件更新不得觸發完整 CI。
- Integration branch 只跑最低成本 regression。
- Final Gate 只在正式 merge／release 前跑一次。
- 同一 PR 使用 `concurrency`＋`cancel-in-progress: true`。
- Browser／E2E／APK／Signing 預設手動或 Release Gate。
- Actions 受限時，用本機／Cloud Shell 提供可重現等價證據。
- GitHub Actions、Cloudflare Git Integration、Firebase Hosting 必須分開審核。

## 6. Evidence 分級

```text
CODE_EXISTS
→ CONTRACT_PASS
→ BROWSER_PASS
→ DEVICE_PASS
→ STORE_PASS
→ PRODUCT_LOCKED
```

禁止跨級宣稱。Source 存在不等於測試；測試不等於部署；部署不等於實機；實機不等於店舖驗收。

## 7. 分支與合拼

- 問題分支：單一問題、最小修改、獨立證據。
- Integration branch：只接收 isolated PASS。
- 正式 baseline：只接收 integration final gate。
- 有 fail／flaky／未確認 conflict 不得合拼。
- diverged branch 必須 clean integration／domain diff，不硬 merge。

## 8. UI／互動守則

- Component Authority 必須唯一。
- DOM、CSS、State、Runtime Write 邊界清楚。
- Adaptive 不等於整頁 Scale。
- 操作要即時 feedback、清楚 recovery path、touch target 安全。
- 高峰期每多一步都要有營運價值。
- Modal／Popover 必須阻擋背景誤觸；Source → Action → Result 要清楚。

## 9. POS／離線／打印

- 雙擊／Retry 必須 Idempotent，不可重複單。
- Offline queue 要 durable；reload／crash／背景切換後可恢復。
- Payment Status 與 Order Status 分離。
- Print Job failure 不可改寫 Order Truth；必須有 failed／retry／fallback。
- Mobile 只發 Print Command，Android Host 執行硬件打印。
- 未有紙張、中文、切紙、標籤、斷網／斷電實機證據，不可標 Print Closure。

## 10. 文件治理

- GitHub＝正式 Authority；Drive＝鏡像／Archive；Jade＝導航／Milestone。
- 新活躍文件必須標 Authority Level、Status、Scope、Evidence。
- V42EG、WORK01–03、Apps Script、舊 Sheet、舊 SMM 只可 Reference。
- 舊資料要重新採用，必須 Re-adoption Proposal。
- 每個 milestone 記錄 repo、branch、PR、head、根因、修改、測試、rollback、下一步。
