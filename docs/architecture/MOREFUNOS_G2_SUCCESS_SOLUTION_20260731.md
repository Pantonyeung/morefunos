# MoreFunOS｜G2 成功方案｜2026-07-31

## 1. 推薦總架構

採用：**Admin-owned Catalog＋Worker-authorized Multi-writer Runtime＋Customer Read-only Projection**。

```text
Admin Catalog／Permission
├─ Internal Published Catalog
├─ SMT Assignment
├─ SMM Assignment
└─ Customer Public Projection

Admin／SMT／SMM Authorized Mutations
→ Cloudflare Worker
→ Permission Scope＋Revision＋Idempotency＋Audit
→ Firebase Operational Runtime
→ Customer Effective Runtime
```

### 不採用方案

1. **所有端直接寫Firebase**：權限、衝突、audit不足。
2. **只有Admin可改Runtime**：現場高峰操作太慢，失去SMT／SMM價值。
3. **每個端各自一份Runtime**：必然出現多個真相。

## 2. Catalog與Channel Assignment

建議每個產品使用明確assignment：

```json
{
  "productId": "F4",
  "channels": {
    "smt": { "visible": true, "orderable": true },
    "smm": { "visible": true, "orderable": true },
    "customer": { "visible": true, "orderable": true }
  }
}
```

Admin可設定：

- 是否分發；
- 是否可下單；
- 是否只可查看；
- 是否容許該端寫availability；
- 生效版本與回滾。

Server projection只輸出該端需要資料，不依賴Client自行filter保密。

## 3. Permission Scope

Staff Session claims只保存身份與session version；實際Scope每次由Server確認，避免舊token保留已撤銷權限。

建議Scope：

```text
catalog.read.smt
catalog.read.smm
availability.write.assigned
store_status.write
business_hours.write
pickup_runtime.write
payment_proof.review
order.accept
```

Admin可使用`runtimeLock`：

- domain：availability／store／pickup／payment；
- target：全部／產品／端口；
- mode：locked／delegated；
- reason／expiresAt；
- Audit。

## 4. Multi-writer Runtime Conflict

推薦：**Server Revision＋Optimistic Concurrency**。

每次mutation包含：

- `expectedRevision`；
- `idempotencyKey`；
- `source`；
- `deviceId`；
- `changes`。

Worker：

1. 驗證Staff Session；
2. 讀取最新Scope及runtimeLock；
3. 驗證產品assignment；
4. 比對expectedRevision；
5. 接受後產生Server Revision／acceptedAt；
6. 寫Firebase及Audit；
7. 回傳canonical effective state。

Revision衝突回409，Client refresh後讓使用者確認；不得靜默覆蓋。

## 5. Store Hours／Pickup Runtime

分兩層：

### Published Policy

- regular weekly hours；
- holidays；
- pickup slot rules；
- minimum preparation minutes；
- last order cutoff；
- customer messaging policy。

### Operational Override

- storeStatus；
- overrideOpenAt／overrideCloseAt；
- waitMinutes；
- earliestPickupAt；
- latestPickupAt；
- acceptingOrders；
- reason；
- revision／updatedBy／expiresAt。

Customer只取得Worker計算後的Effective Runtime，不自行合併規則。

## 6. Customer Offline WhatsApp Order

推薦Hybrid：**立即WhatsApp＋本機Stable Envelope＋不自動重提**。

Offline Order Envelope：

```json
{
  "localOrderId": "OFF-...",
  "state": "OFFLINE_UNCONFIRMED",
  "menuVersion": "...",
  "menuChecksum": "...",
  "menuSavedAt": "...",
  "items": [],
  "estimatedTotal": 0,
  "pickupPreference": {},
  "customer": {},
  "createdAt": "...",
  "whatsappHandoffAt": null
}
```

WhatsApp訊息使用清楚人類格式，同時包含短Order ID及版本資料。完成deep-link後只標`whatsapp_handoff_attempted`，不得標accepted。

網絡恢復後：

- 顯示「已經WhatsApp送出？」；
- 可由Staff在SMT／SMM用localOrderId建立／配對正式order；
- 若要Online resubmit，必須先明確取消WhatsApp intake或由Server dedupe。

## 7. Payment Proof

推薦：**Private Upload＋Manual Review＋Immutable Decision Audit**。

### Upload

1. Customer向Worker要求一次性upload ticket；
2. Worker驗證order及payment method；
3. 上傳private object；
4. Server建立proof metadata及receipt；
5. Customer收到receipt後才顯示`pending_review`。

### Metadata

- proofId；
- orderId；
- paymentMethod；
- expectedAmount；
- objectKey；
- contentType／size／sha256；
- submittedAt；
- status；
- reviewer／reviewedAt／reason；
- duplicateSignals；
- Audit。

### Review

SMT／SMM共用一個review queue：

- 顯示Order、應付金額、付款方式、證明圖、提交時間；
- Staff核對實際收款紀錄；
- `Approve`／`Reject`／`Request Resubmit`；
- 每次決定帶idempotency及Audit；
- 已批准後再修改需要Admin override及理由。

### Order Gate

```text
Electronic payment
→ proof pending_review
→ staff approved
→ paymentStatus=approved
→ order can transition to accepted
```

付款狀態與訂單狀態分開，避免不一致。

## 8. Offline Electronic Payment

Customer完全離線時無法向Server取得upload receipt。

成功方案：

- 仍顯示付款證明入口；
- 可本機選圖但狀態只係`local_pending_upload`；
- WhatsApp下單流程提示客戶在對話中附上付款截圖；
- 恢復網絡後可重新正式上傳；
- 未有Server receipt前不得顯示等待SMT／SMM審批。

## 9. 測試策略

### Contract

- channel assignment；
- permission scope／runtimeLock；
- revision conflict；
- effective hours／pickup；
- offline envelope deterministic format；
- proof access control；
- approval gate；
- hidden data leak prevention。

### Integration

- Admin assign F4→SMT／SMM／Customer；
- SMT soldout→SMM／Customer不可下單；
- SMM restore→全部同步；
- Admin lock→SMT mutation 403；
- SMT改waitMinutes→Customer更新；
- Offline WhatsApp→Staff reconcile；
- Proof upload→SMM approve→order accepted。

### Device

- SMT 1280×800／1920×1080；
- SMM iPhone／Android；
- Customer Safari／PWA；
- WhatsApp installed／not installed；
- Camera／Photos proof upload；
- network transition／duplicate prevention。

## 10. 回滾

- Catalog使用Published Version rollback；
- Runtime每次mutation有previous state及correlationId；
- Permission及runtimeLock可獨立回滾；
- Proof object不可覆寫，只可撤銷decision；
- Offline envelope保留本機但可標cancelled／reconciled；
- 每條Workstream獨立feature flag及部署。
