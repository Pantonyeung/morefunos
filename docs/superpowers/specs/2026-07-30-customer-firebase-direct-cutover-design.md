# Customer Firebase Direct Cutover Design

狀態：APPROVED / IMPLEMENTATION AUTHORITY
日期：2026-07-30 HKT

## 目標

將目前已由 Admin Tune 並確認的一套資料正式發佈到 Firebase Published，Customer 直接讀取同一套 Published／Runtime 資料，不建立第二套 Customer Menu Authority。

## 權威邊界

- Admin：Control Plane，負責修改、驗證及發佈。
- Firebase RTDB：Operational source of truth。
- `/admin/draft`：只供 Admin 編輯，Customer 禁止讀取。
- `/admin/published`：Customer 正式 Catalog／Pricing／Content 來源。
- `/runtime`：Customer 正式 Store Status／Holiday／Wait Time／Availability 來源。
- Google Sheet／Apps Script：保留為 Ledger／legacy fallback；不得覆蓋 Firebase Published。
- `order_api_enabled=false`：本次不啟用訂單 API。

## Cutover 模式

採用 Direct Cutover，但必須 Rollback-safe：

1. 建立 GitHub pre-cutover backup branch。
2. 保存 Customer 現有資料入口及設定快照。
3. 將已確認 Admin Draft 發佈為 Published；首次只有一套資料時，Published 等同目前已確認資料。
4. Customer Adapter 只讀 `/admin/published` 與 `/runtime`。
5. 啟動時驗證 snapshot shape、版本及必要欄位。
6. Firebase 讀取失敗、資料不完整或 Draft 路徑洩漏時，阻止套用並進入明確 degraded／rollback 狀態。
7. 保留 pre-cutover branch 作完整程式回滾點。

## Customer Adapter Contract

輸入：
- Published snapshot
- Runtime snapshot
- Active version／revision metadata

輸出：
- `catalog`
- `pricing`
- `content`
- `runtime.storeStatus`
- `runtime.holidays`
- `runtime.waitMinutes`
- `runtime.availability`
- `receipt.version`

禁止：
- 讀取 `/admin/draft`
- 將 Customer 狀態寫回 Admin Catalog
- 靜默接受 malformed snapshot
- 以 demo／seed 資料冒充 Firebase 正式資料

## 驗收

- Customer 顯示的 Product／Category／Option／Combo／Pricing／Content 與 Admin Published 一致。
- Runtime 變更可在 Customer 顯示。
- Draft 修改在未 Publish 前不影響 Customer。
- Customer 記錄 Published version receipt。
- Firebase 失敗時有明確錯誤，不顯示假同步。
- 現有 Customer 核心 UI／點餐邏輯不重構。
- 備份、Rollback、Current Handoff、Progress Log、Implementation Status 全部存在。
