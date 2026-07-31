# MoreFunOS｜G1 Internal Catalog／Customer Public Projection｜2026-07-31

> 狀態：`SOURCE IMPLEMENTED / TARGETED PROJECTION PASS / ROUTE＋PUBLISH CONTRACT COMMITTED / DEPLOYMENT PENDING`  
> 影響：Admin、SMT、SMM、Customer  
> 原則：Staff 可控制全部營運商品；Customer 只收到對客可見資料。

## 1. 問題

早期鏈路只係由 Customer adapter 過濾隱藏產品。呢個做法有兩個嚴重問題：

1. Public Runtime 原始 JSON 仍可能包含平台／現場專用／內部產品資料；UI 隱藏唔等於資料冇洩露。
2. 如果 Staff Availability 改用已清洗嘅 Customer Public Catalog 驗證，SMT／SMM 就無法控制 Customer 隱藏或平台產品售罄。

## 2. 正式 Authority 分離

```text
Admin Internal Published Catalog
→ Staff Availability canonical validation
→ SMT／SMM 控制全部營運產品

Customer Public Projection
→ Customer 可見分類、產品、選項、套餐、價格、內容、付款、設定
→ Customer 可見商品 availability／soldout
```

### Internal

- `morefun/admin/v1/published/current`
- Staff Catalog：`morefun/admin/v1/published/current/published/products`
- Operational Availability：`morefun/runtime/operations/v1/availability`

### Public

- `morefun/public/customer/v1/published`
- `morefun/public/customer/v1/runtime`
- `GET /v1/runtime/customer`

## 3. 實作

### Customer Public Projection

新增：`worker/src/customer-public-projection.js`

`projectCustomerPublished()`：

- 移除 Customer-hidden／平台／現場專用分類與產品；
- 移除 Staff-only option groups；
- 清除指向已知隱藏產品／分類／套餐嘅 references；
- 移除 internal／print／report／kitchen 名稱與 codes；
- 移除 cost、supplier、Staff／Admin notes；
- 移除 legacy IDs／legacy POS；
- 移除 connectors、secret、token、password、service account、legacy API；
- 移除非 Customer pricing channels；
- 過濾 hidden recommendations／payment methods。

`projectCustomerRuntime()`：

- 只輸出 Customer-visible product IDs 嘅 `availability`；
- 只輸出 Customer-visible product IDs 嘅 `soldout`；
- 防止隱藏產品 ID 經 Runtime 狀態洩露。

### Worker 雙重保護

- Publish／Rollback：Public Firebase 只寫 sanitized projection。
- Read-time：`GET /v1/runtime/customer` 再做一次 projection。
- 舊 Public snapshot 即使曾未清洗，經 API 讀取時仍會被過濾。

### Staff Availability

- 改讀 Internal Published Catalog。
- Legacy Public product path 只作舊資料 fallback。
- Customer visibility 唔再係 Staff 控制門檻。
- Availability 只改供應狀態，唔改 visibility。

## 4. Contracts

### 已實際執行

`worker/test/customer-public-projection.test.mjs` isolated Node：PASS。

已證明：

- 平台／隱藏產品無出現在公開輸出；
- Staff-only 選項無出現；
- 內部價格渠道、legacy URL、connectors 無出現；
- Customer 名稱、分類、價格、套餐、設定仍保留。

### 已提交，待完整 workspace 執行

- `worker/test/staff-availability-internal-product.test.mjs`
- `worker/test/customer-runtime-public-projection-route.test.mjs`
- `worker/test/customer-publish-authority-separation.test.mjs`
- 更新後 `worker/test/customer-public-projection.test.mjs`（包含 hidden availability ID）

Scripts：

- `test:staff-availability`
- `test:public-runtime`
- `test:contracts`
- `test:firebase`

## 5. 踩坑

1. **UI filter 唔係資料保護。** Browser 收到 JSON 就已經洩露。
2. **只清洗 products 唔夠。** Category、option、combo、pricing、content、payments、settings 都可能帶內部資料。
3. **只清洗 Published 唔夠。** Hidden product ID 仍可能經 availability／soldout 洩露。
4. **只清洗新 Publish 唔夠。** 舊 Public snapshot 仍可能未清洗。
5. **Staff 改讀 Public Catalog 會失去平台／現場商品控制。**
6. **過度過濾 references 會破壞非商品 component IDs。** 只刪除可確認屬於 hidden product/category/combo 嘅 references。
7. **Customer visibility 同 operational availability 必須正交。** 售罄唔可以令隱藏商品突然顯示。
8. **Contract committed 唔等於 Full PASS。** 完整 repo workspace 仍受目前 DNS 限制阻塞。

## 6. 成功方案

- Internal Published Catalog 做 Staff Authority。
- Customer Public Projection 做 Public Authority。
- Publish／Rollback 清洗＋Read-time 再清洗。
- Runtime availability 按 public product IDs 過濾。
- Customer adapter 繼續做 UI contract validation，但唔承擔資料保密責任。
- Staff／Customer 兩條鏈路共享 canonical product IDs，但共享唔代表暴露相同欄位。

## 7. Relevant Commits

Admin branch `feat/admin-p0-full-connect-v1`：

- `16ce852006bba134af589303051a113471e66111`
- `57e7bdb8ee335ba4897d6a5c974f83279e67ade8`
- `f1a4f1fe22fae1b9e53c2a8ae251ed20b37ca49b`
- `860c96bb9d6ad53038c0d2ff94cbf2a9356ebb22`
- `834c7ebd4dd2b1349aa9c2e9657bb483b169134c`
- `5138e8f65a1ca65038b30a0b924b3a354fb1067f`
- `79b01144f2e68f3c5d2585614bea12433a5a01d3`
- `f558c7004a8eece636c753e65e1e9cb637106ee5`
- `db62a71735f79b3a7ba139156d92d05d9aee66ab`
- `4cfed8362147e4bd43d47b6fbdceb68d0ec9b8cc`
- `bed7f48c24c7dd8fe35b5a78b618b7a9998f8070`

## 8. 未完成 Gate

1. 完整 workspace 執行 `test:staff-availability`。
2. 執行 `test:public-runtime`。
3. 執行 affected `test:contracts`／`test:firebase`。
4. Deploy latest Admin Worker／Pages Functions。
5. 重新 Admin Publish，物理清洗 Firebase Public snapshot。
6. Public Runtime JSON 檢查無 hidden category／product／availability IDs。
7. SMT／SMM 實際控制 Customer-hidden／平台產品，Customer 仍保持隱藏。
8. Customer-visible product soldout／paused 15 秒內更新並禁止下單。
9. HKT 05:00 staging acceptance。
10. Deployment／Device Gate 前不得標 Production PASS。
