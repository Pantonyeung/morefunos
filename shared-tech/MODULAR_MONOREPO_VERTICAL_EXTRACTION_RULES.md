# MoreFunOS｜可拆式 Monorepo × 垂直抽取開發守則

> Status: CURRENT SHARED TECHNOLOGY RULE
> Branch: `rebuild/unified-menu-single-authority-v1`
> Scope: Admin／SMT Register／SMT Mobile（SMM）／Customer／Worker／Android Host

## 1. 決定

MoreFunOS 重建採用 Private Modular Monorepo。

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

## 2. 可拆性硬規則

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

## 3. 唯一菜單 Authority

唯一正式菜單：

```text
Firebase RTDB：morefun/menu/v1/current
```

Admin、SMT、SMM、Customer 不得各自維護正式菜單、正式 availability map、獨立產品副本或隱藏 fallback。

允許：

```text
Last Known Good Cache
Pending Mutation Queue
Test Fixture
Migration Input
Archive Evidence
```

以上全部不可成為 Authority。

## 4. 垂直抽取原則

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

## 5. 每 Part 必須交付

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
- 新 Monorepo 落點；
- Public API；
- Targeted Test；
- 受影響 Regression；
- Rollback Point；
- 未完成及下一 Part。

## 6. 禁止事項

- 禁止將舊 Repo 整包 copy 入新 Repo。
- 禁止先複製再話之後清理。
- 禁止 Bridge、DOM scan、capture click、polling、reload、hidden compatibility layer。
- 禁止 App 對 App 原始碼引用。
- 禁止 Customer 使用 Internal Catalog。
- 禁止 SMT／SMM 使用 Public Customer Projection 作內部菜單。
- 禁止以名稱猜 Product ID、分類、價格、狀態。
- 禁止 localStorage 成為正式菜單或售罄 Authority。
- 禁止未完成一條 Vertical Slice 就同時擴散下一個 Domain。

## 7. 將來拆 Repo 規則

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

## 8. 完成判定

Monorepo 重建完成唔等於所有檔案已搬。

完成標準係：

- 舊 Runtime 不再被新系統引用；
- 四端只讀同一 Unified Menu；
- Admin／SMT／SMM 供應 mutation 寫同一 Product.status；
- Customer 只讀安全投影；
- SMT Register／Mobile 共用同一 Core；
- Cross-port tests 可證明冇第二菜單／第二 Supply State；
- 每個 App 仍可獨立 Build、Deploy、Rollback；
- 每個 package 保持可獨立拆 Repo。
