# MoreFunOS｜統一菜單 Authority 設計規格

日期：2026-08-01
狀態：DESIGN APPROVED / IMPLEMENTATION PENDING
Authority：MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md

## 1. 目標

全系統只存在一份正式菜單。Admin、SMT、SMM、Customer 只因權限及展示方式不同而有不同操作，不得各自維護產品、分類、價格、選項或供應狀態副本。

## 2. 唯一 Authority

唯一正式資料來源：Unified Menu Authority。

- Admin：完整管理權。
- SMT／SMM：讀取同一菜單，只可調整日常供應狀態及 operations 排序。
- Customer：只讀同一菜單的 customer presentation。
- localStorage／IndexedDB／SQLite：只作最近有效快取、離線營運及 Pending Queue，不得成為正式 Authority。

## 3. 權限

### Admin

可新增、修改、封存／刪除產品；管理價格、真實產品類型、選項、套餐、各端分類及排序、各端顯示、內部名稱、打印路由、報表歸類、供應狀態及批量操作。

### SMT／SMM

共用同一 operations presentation。可設定 available／soldout／paused、調整 operations 分類排序及產品排序。不可新增、刪除、改價或修改產品規則。SMM 完全跟隨 SMT，不建立第三套排序或第二套 Core。

### Customer

只讀 customer presentation，可瀏覽及提交落單意向。正式訂單只由 SMT 重新驗證後建立。

## 4. 統一產品模型

每款產品只得一個 canonical productId。

```text
Product
├─ core
│  ├─ productId
│  ├─ productType
│  ├─ internalName
│  ├─ customerName
│  ├─ price
│  ├─ optionRules
│  ├─ comboRules
│  ├─ reportClassification
│  └─ status
├─ presentation
│  ├─ customer
│  │  ├─ visible
│  │  ├─ categoryId
│  │  ├─ categoryOrder
│  │  └─ productOrder
│  └─ operations
│     ├─ visible
│     ├─ categoryId
│     ├─ categoryOrder
│     └─ productOrder
├─ internalDisplay
│  ├─ shortName
│  ├─ kitchenName
│  ├─ packingName
│  ├─ riceBallLabelName
│  └─ takeawayLabelName
├─ printRouting
│  ├─ productionTicket
│  │  ├─ enabled
│  │  ├─ printerId
│  │  └─ copies
│  ├─ packingTicket
│  │  ├─ enabled
│  │  ├─ printerId
│  │  └─ copies
│  ├─ riceBallLabel
│  │  ├─ enabled
│  │  ├─ printerId
│  │  └─ copies
│  └─ takeawayLabel
│     ├─ enabled
│     ├─ printerId
│     └─ copies
└─ audit
   ├─ updatedAt
   ├─ updatedBy
   └─ source
```

展示分類只影響畫面位置，不得改變產品商業規則。

## 5. 排序規則

- Customer：由 Admin 控制 customer 分類歸屬、分類排序及產品排序。
- SMT／SMM：共用 operations 分類歸屬、分類排序及產品排序；SMT 可作日常調整，SMM同步。
- 排序值由小至大；相同值以 canonical productId 穩定排序。

## 6. 供應狀態

每款產品只有一個正式狀態：available、soldout、paused、disabled。

Admin、SMT、SMM 所有 mutation 必須寫入同一產品記錄；Customer 只讀。不得再建立獨立 availability tree 作正式真相。

## 7. 離線

- 各端保存最近一次完整、有效、帶 version／checksum／updatedAt 的菜單。
- SMT 離線可繼續現場銷售；訂單及狀態變更進 Pending Queue，重連後同步。
- Customer 離線可瀏覽最近有效菜單並產生 WhatsApp 落單意向。
- 必須顯示：離線菜單只供參考，產品供應、價格及訂單內容，以店舖 SMT 最終確認為準。

## 8. 正式訂單

Customer／WhatsApp 只產生落單意向。SMT 必須重新驗證最新價格、供應、選項及套餐規則，確認後才建立正式訂單。

## 9. Admin 批量管理

第一階段必須支援：

1. 批量加入／移除／取代選項組。
2. 批量設定單選／多選、必選、最少及最多數量。
3. 批量設定製作單、打包單、飯團標籤、外賣標籤的啟用、打印機及張數。
4. 批量設定 customer／operations 分類、排序、顯示／隱藏。
5. 批量設定 available／soldout／paused。
6. 以一款產品為模板，選擇性複製指定設定到多款產品。

每次批量操作必須提供：影響數量、欄位差異預覽、二次確認、原子提交、失敗整批回滾、Audit、可撤銷上一批操作。

## 10. 今階段邊界

本階段完成：統一資料模型、唯一 Menu API、Admin 單品及批量管理、SMT／SMM 共用菜單及供應狀態、Customer 同一菜單及離線快取。

本階段不完成：打印版面設計、打印內容排序、實體打印執行、完整報表計算。

## 11. 遷移策略

1. 讀取現有 Admin Published、Customer Runtime、SMT Catalog、Availability 資料。
2. 以 canonical productId 建立一次性 migration mapping。
3. 產生 Unified Menu V1，完成 schema validation 及 checksum。
4. 先讓四端 read-only shadow compare。
5. 差異為零後切換讀取 Authority。
6. 最後切換 mutation；舊 tree 降級為只讀回滾來源。
7. 禁止雙寫長期存在。

## 12. 驗收

1. Admin 新增一款產品，四端讀到同一 productId。
2. Admin 修改價格／分類／排序，Customer 與 operations 各按自己的 presentation 顯示。
3. SMT 設售罄，Admin、SMM、Customer 讀到同一狀態。
4. Admin 恢復供應，三端同步恢復。
5. SMT 改 operations 排序，SMM同步，Customer不受影響。
6. Customer 改展示分類不改產品商業規則。
7. 離線顯示最近有效菜單；無效新資料不可覆蓋 Last Known Good。
8. Customer 離線提交只屬意向；SMT確認後才建立正式訂單。
9. 批量操作全成功或全回滾，不可半成功。
10. 全程不得使用 bridge、DOM 攔截、reload、第二套 State 或長期雙寫。
