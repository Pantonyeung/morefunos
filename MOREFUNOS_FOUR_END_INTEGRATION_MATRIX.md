# More FunOS｜四端功能配對與最終整合矩陣 V1.0

> 狀態：CURRENT／INTEGRATION WORKING MATRIX
> 更新：2026-07-29
> Parent Authority：`MOREFUNOS_MASTER_CONTROL_AUTHORITY.md`
> Current Development Registry：`MOREFUNOS_CURRENT_DEVELOPMENT_REGISTRY.md`

## 1. 用途

本文件唔判定目前邊條 branch 最終勝出；只記錄每個功能暫時開發到邊、各端是否配對、缺咩 contract、缺咩證據，以及最後重新整合時要保留／重寫／淘汰邊一部分。

最終整合必須逐項完成：

`功能識別 → Authority確認 → 四端配對 → Contract對齊 → 衝突清理 → Clean Integration → CI／Browser／Device／Store驗收`

## 2. 狀態標記

- `DONE_CODE`：已有程式。
- `DONE_CONTRACT`：已有 contract test。
- `DONE_BROWSER`：Browser Gate通過。
- `PARTIAL`：只完成部分流程。
- `MISSING`：未實作。
- `CONFLICT`：多端／多 branch有平行真相。
- `LIVE_UNVERIFIED`：程式存在但未有真實服務或設備證據。
- `SUPERSEDED`：只作遷移來源。

## 3. 四端功能配對矩陣

| Domain／功能 | Admin | Customer | SMT Register | SMT Mobile | Android Host | Authority／Contract | 當前缺口 |
|---|---|---|---|---|---|---|---|
| Product／Catalog | PARTIAL | PARTIAL | PARTIAL | Shared Core目標 | N/A | Admin Published | schema／版本／consumer未統一 |
| Category | PARTIAL | PARTIAL | PARTIAL | Shared Core目標 | N/A | Admin Published | mapping需重新配對 |
| Option／Modifier | PARTIAL | PARTIAL | PARTIAL | Shared Core目標 | N/A | Admin Published | required／optional語義需對齊 |
| Combo／套餐 | PARTIAL | PARTIAL | PARTIAL | Shared Core目標 | N/A | Admin Published＋Pricing | branch間資料形狀待整理 |
| Pricing／優惠 | PARTIAL | PARTIAL | PARTIAL | Shared Core目標 | N/A | Server Price Authority | 後端重新計價未閉環 |
| Content／公告 | PARTIAL | PARTIAL | PARTIAL | Shared Core目標 | N/A | Admin Published | consumer adapter未統一 |
| Store Status／Wait Time | PARTIAL | PARTIAL | PARTIAL | Shared Core目標 | N/A | Runtime Snapshot | Firebase live未驗證 |
| Sold-out／Availability | PARTIAL | PARTIAL | PARTIAL | Shared Core目標 | N/A | Runtime Snapshot | 即時同步未閉環 |
| Draft／Publish | DONE_CODE／LIVE_UNVERIFIED | Read only目標 | Read only目標 | Read only目標 | N/A | Admin Release Domain | remote acknowledgement缺失 |
| Auth／Role | PARTIAL／LIVE_UNVERIFIED | Customer Auth另域 | Staff Role目標 | Staff Role目標 | Device identity目標 | Firebase Auth＋Rules | claims／部署／真登入未驗證 |
| Cart | N/A | PARTIAL | PARTIAL | Shared Core目標 | N/A | Shared Cart Domain | Customer／SMT唔應共用同一UI但要同contract |
| Required Flow | N/A | PARTIAL | PR #20 DONE_CODE | Shared Core目標 | N/A | Required Task Contract | 尚未整合入正式checkout |
| Checkout | N/A | PARTIAL | PARTIAL | Shared Core目標 | N/A | Checkout Contract | 四端資料形狀未統一 |
| Order Commit | N/A | PARTIAL | PARTIAL | Shared Core目標 | Host只執行 | Order API Authority | idempotency／派號／重新計價未閉環 |
| Incoming Queue | N/A | Submit only | PR #24 PARTIAL | Shared Core目標 | N/A | Order Intake Contract | Firebase／Order API未接通 |
| Recovery／Audit | Admin PARTIAL | PARTIAL | PR #23 PARTIAL | Shared Core目標 | PARTIAL | Audit／Journal Contract | 跨端receipt未統一 |
| Runtime／Offline | N/A | PWA PARTIAL | PR #30 DONE_BROWSER | Shared Core目標 | PARTIAL | Runtime Contract | Firebase adapter／device未驗證 |
| Printer Settings | PARTIAL | N/A | PR #17 DONE_CONTRACT | Command only目標 | PARTIAL | Print Job Contract | 真紙／中文／切紙／標籤未驗收 |
| APK OTA | N/A | N/A | N/A | N/A | PR #27 DONE_CODE | APK OTA Contract | signed release／device未驗證 |
| Runtime OTA | Admin Release目標 | N/A | Runtime consumer | Runtime consumer | PARTIAL | Runtime Envelope | production release未驗證 |
| Reporting／Sheet Mirror | PARTIAL | N/A | PARTIAL | PARTIAL | N/A | Audit＋Mirror | Order Authority未閉環前不可完成 |

## 4. 最終整合時固定處理方法

每一列必須分類為以下其中一種：

1. `KEEP`：保留現有 Authority實作。
2. `PORT`：由開發 branch受控搬入正式整合 branch。
3. `REWRITE`：保留需求／contract，重寫錯誤結構。
4. `MERGE_CONTRACT`：多個 branch能力合併到一個 shared contract。
5. `SUPERSEDE`：舊實作停止使用，只保留記錄。
6. `BLOCKED_LIVE`：等待 Firebase／API／Device／Store證據。

禁止直接將多條長期分叉 branch硬 merge成正式系統。

## 5. 當前整合優先次序

1. G1 Admin Firebase Publish真閉環。
2. G2 Published／Runtime Consumer Contract。
3. G3 Order Commit Authority。
4. G4 Print Closure。
5. G5 Store Acceptance。

## 6. 每次更新必須記錄

- Repo／branch／PR／head SHA。
- 功能目前狀態。
- Authority。
- 對應其他端口。
- Contract／CI／Browser／Device／Store證據。
- 衝突及淘汰候選。
- 下一個整合動作。
- More FunOS整體完成百分比。
