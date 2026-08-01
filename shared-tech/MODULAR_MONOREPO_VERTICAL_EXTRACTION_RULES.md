# MoreFunOS｜B 線實驗：可拆式 Monorepo × 垂直抽取開發守則

> Status: EXPERIMENTAL / NON-AUTHORITY / PARALLEL TRACK B
> Branch: `rebuild/unified-menu-single-authority-v1`
> Scope: 只適用於 B 線實驗 Monorepo；不得覆蓋、修改或取代現役 A 線工程憲章、Master Development Guide、Port Authority、Preview／Production 路線。

## 0. 雙線隔離決定

MoreFunOS 同時保留兩條互不影響嘅開發路線：

```text
A 線｜現役多 Repo 路線
- 繼續依照現行工程憲章、Master Development Guide、Port Authority 推進
- 保留現有 Admin／SMT／Customer Repo、部署、資料及驗收
- B 線不得反向修改、依賴或阻塞 A 線

B 線｜實驗 Monorepo 路線
- 使用全新獨立 Repo／分支／部署／Firebase namespace／環境變數
- 只抽取現有核心規則、Contract、UI 能力作參考
- 不直接修改 A 線 Runtime、Production、Preview、資料或分支
- 最後用同一驗收矩陣與 A 線比較成果
```

本文件只係 B 線實驗規則，唔係現役 Authority，亦唔會自動升級為正式路線。

## 1. 實驗決定

B 線採用 Private Modular Monorepo。

同一 Repo 只代表共同版本控制、共同 Contract、共同測試及共同施工；唔代表所有 App 混成一個 Monolith。

目標結構：

```text
apps/
  admin/
  smt/
  customer/
  android-host/
packages/
  product-schema/
  menu-domain/
  supply-domain/
  order-domain/
  print-contract/
  auth-client/
  api-client/
  shared-ui/
workers/
  api/
tests/
  cross-port/
```

SMT Register 同 SMT Mobile（SMM）係同一 `apps/smt` 嘅兩個 Profile，共用同一 Core，禁止建立第二套 SMM 商業邏輯。

## 2. B 線隔離硬規則

1. 禁止修改 A 線 Repo 現役分支、Preview、Production 或 Runtime 資料。
2. 禁止 B 線共用 A 線 Production Firebase path、Service Worker cache、Cloudflare Project 或 Secret。
3. B 線只可讀取 A 線 Source 作抽取參考；任何搬入內容必須重新審核、測試及標記來源。
4. A 線故障唔可要求 B 線暫停；B 線故障亦唔可影響 A 線營運。
5. B 線未通過同等 Store／Device／Regression 驗收前，不得取代 A 線。
6. 最終採用邊條路線只由 Owner 根據比較報告決定。

## 3. 可拆性硬規則

1. App 不可引用另一個 App。
2. App 只可引用 `packages/*`、正式 API Contract 同自身 UI。
3. `packages/*` 不可引用 `apps/*`。
4. Domain Core 不可讀 DOM、不可依賴頁面結構、不可保存 UI State。
5. Firebase／Cloudflare／Android／Printer 只可放在 Adapter／Infrastructure Boundary。
6. Adapter 不可保存第二套 Business Truth。
7. 每個 package 必須有清楚 public API；禁止深層路徑偷引用內部檔案。
8. 每個 package 必須可以獨立版本化、獨立測試、獨立抽出成 Repo。
9. 跨 App 共享資料只能經 Contract／Domain package／Worker API；禁止直接讀另一 App Store。
10. Secret、Token、Private Key、Service Account 永遠不可進 Repo 或前端。

## 4. B 線唯一菜單 Authority

B 線必須使用獨立實驗 namespace，例如：

```text
Firebase RTDB：experiments/monorepo-b/menu/v1/current
```

不得直接使用或覆寫 A 線正式 `morefun/menu/v1/current`。

B 線內部 Admin、SMT、SMM、Customer 不得各自維護正式菜單、正式 availability map、獨立產品副本或隱藏 fallback。

允許：

```text
Last Known Good Cache
Pending Mutation Queue
Test Fixture
Migration Input
Archive Evidence
```

以上全部不可成為 Authority。

## 5. 垂直抽取原則

禁止一次過搬晒所有舊程式。

每次只抽取一條可以由頭行到尾嘅 Vertical Slice：

```text
Authority
→ Contract
→ Worker mutation／read
→ Shared Domain
→ App Adapter
→ UI Render／Action
→ Cross-port Test
→ Deployment Evidence
```

第一條 Vertical Slice：Unified Menu＋Supply。

抽取次序：

1. Product Schema
2. Menu Domain
3. Worker Menu Read／Mutation
4. Staff Auth Client
5. Supply Domain＋Offline Queue
6. Admin Adapter／UI
7. SMT Register Profile
8. SMT Mobile Profile
9. Customer Projection／Gate
10. Cross-port Acceptance

每一 Part 完成後先進下一 Part。

## 6. 每 Part 必須交付

每次只可以聲稱實際證據：

```text
SOURCE_EXISTS
CONTRACT_PASS
BROWSER_PASS
DEVICE_PASS
HARDWARE_PASS
STORE_PASS
```

每 Part 必須列出：

- 抽取來源 Repo／Branch／Commit／檔案；
- 保留嘅商業規則；
- 拒絕帶入嘅 Patch／Fallback／第二 State；
- B 線 Monorepo 落點；
- Public API；
- Targeted Test；
- 受影響 Regression；
- Rollback Point；
- 未完成及下一 Part。

## 7. 禁止事項

- 禁止將舊 Repo 整包 copy 入新 Repo。
- 禁止先複製再話之後清理。
- 禁止 Bridge、DOM scan、capture click、polling、reload、hidden compatibility layer。
- 禁止 App 對 App 原始碼引用。
- 禁止 Customer 使用 Internal Catalog。
- 禁止 SMT／SMM 使用 Public Customer Projection 作內部菜單。
- 禁止以名稱猜 Product ID、分類、價格、狀態。
- 禁止 localStorage 成為正式菜單或售罄 Authority。
- 禁止未完成一條 Vertical Slice 就同時擴散下一個 Domain。
- 禁止 B 線部署到 A 線固定網址或覆寫 A 線 Cloudflare Project。
- 禁止 B 線 Migration 寫入 A 線正式資料。

## 8. 將來拆 Repo 規則

當需要拆 Repo 時：

```text
workspace package
→ versioned private package／獨立 domain repo
```

App 只需要由本地 workspace dependency 改為版本依賴，商業邏輯不得重寫。

符合以下條件先可拆：

1. package public API 穩定；
2. 無 app-to-app dependency；
3. package tests 可獨立執行；
4. API Contract 有版本；
5. release／rollback 機制清楚；
6. 有真實團隊、公開、權限或獨立發布需要。

## 9. A／B 線最終比較標準

兩條路線必須使用同一 Golden Product、同一測試矩陣及同一裝置驗收：

```text
1. 首次打通 Supply 閉環所需時間
2. Admin → SMT／SMM／Customer 同步穩定度
3. SMT／SMM → Admin／Customer mutation 成功率
4. Offline Queue／重連恢復
5. 新增產品欄位所需修改位置數量
6. Regression 數量與修復成本
7. 各 App 獨立 Build／Deploy／Rollback 能力
8. 將 Package 拆成獨立 Repo 嘅實際成本
9. Device／Store 高峰穩定性
10. 接手難度及 Context Reset 成功率
```

未完成同等 Evidence 前，不可宣稱 B 線優於 A 線。

## 10. 完成判定

B 線 Monorepo 實驗完成唔等於所有檔案已搬。

完成標準係：

- B 線完全唔引用 A 線 Runtime；
- B 線四端只讀同一實驗 Unified Menu；
- Admin／SMT／SMM 供應 mutation 寫同一 Product.status；
- Customer 只讀安全投影；
- SMT Register／Mobile 共用同一 Core；
- Cross-port tests 可證明冇第二菜單／第二 Supply State；
- 每個 App 仍可獨立 Build、Deploy、Rollback；
- 每個 package 保持可獨立拆 Repo；
- 完成與 A 線同條件比較報告；
- Owner 未正式決定前，A 線保持現役且不受影響。
