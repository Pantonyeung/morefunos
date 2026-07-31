# MoreFunOS G Stage Status｜2026-07-31 13:54 HKT

## Executive status

- G0.5：`CLOSED`
- G1：`91% / SOURCE IMPLEMENTED + TARGETED EVIDENCE / DEPLOYMENT & DEVICE PENDING`
- G2：`DECISION LOCKED / CROSS-PORT IMPLEMENTATION PENDING`
- G3：`NOT STARTED`
- G4：`PARTIAL FOUNDATION ONLY`
- G5：`SMT LOCAL FOUNDATION ONLY`
- G6：`DESIGN LOCKED / IMPLEMENTATION PENDING`
- G7：`PARTIAL SMT MODULES / INTEGRATION PENDING`
- G8：`NOT STARTED`
- G9：`NOT STARTED`

## 已確定的設計

1. Admin 是權威菜單及分發 Authority。
2. Admin 指定 SMT／SMM 可使用的菜單與 Customer 可見菜單。
3. SMT／SMM 只可對已授權產品執行售罄／停售／恢復。
4. Customer 只讀最新有效菜單；售罄／paused 不可加入、修改、結帳或提交。
5. Admin／SMT／SMM 可控制營業、等候、取餐 Runtime，但共用同一 Worker Authority。
6. Customer 斷線後可用最新有效本機菜單建立 WhatsApp 離線訂單；狀態為 `OFFLINE_UNCONFIRMED`。
7. 公司 WhatsApp：`85261123071`。
8. Customer 上傳付款截圖；SMT／SMM 沿用既有核款 UI；核款才接單。
9. 付款圖片存私有 Google Drive，Google Sheet 保存 ledger，最少 60 日。

## 未落地項目

- Admin distribution／assignment UI 與 API；
- Staff permission scope；
- Store／pickup multi-writer Runtime；
- Customer offline WhatsApp checkout；
- Customer proof upload；
- Private Drive storage；
- Google Sheet ledger adapter；
- SMT／SMM shared payment queue；
- 60-day retention job；
- cross-port deployment／device acceptance；
- Production operational acceptance。

## 判斷

### 設計係咪確定？

係。以上 Owner 決策已記錄為 `DECISION LOCKED`。

### 方案係咪已經落地？

未完全落地。現有只包括：

- G1 部分 source implementation；
- SMT 本機付款核對 UI／Domain；
- Customer offline menu foundation；
- Admin／SMT／SMM supply foundation；
- 文件及 Contract 層。

未完成跨端 Backend、部署、實機及 Production Gate，因此不得寫成已落地完成。

## 下一個唯一 Gate

先完成 G1 staging／device acceptance，再按 G3 → G4 → G5 → G6 執行 G2 已鎖定方案。
