# MoreFunOS Unified Menu Authority Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將 Admin、SMT、SMM、Customer 由多份菜單／多份 availability 重構為一份統一菜單 Authority，不同端口只按權限讀寫指定欄位，並保留可靠離線快取及 Pending Queue。

**Architecture:** Firebase RTDB 只保存一份 canonical menu。產品核心、Customer presentation、Operations presentation、供應狀態、選項、打印路由及報表歸類全部屬同一 Product；Admin 擁有產品生命週期及批量管理，SMT／SMM 只可修改 operations 排序與供應狀態，Customer 只讀。各端 localStorage／IndexedDB 只作 Last Known Good 快取及離線 Queue，不可成為 Authority。

**Tech Stack:** Cloudflare Pages Functions／Worker、Firebase RTDB、原生 JavaScript、Admin Store／Router／Page Binder、SMT Shared Core、Customer Runtime Consumer、Node targeted tests。

## Global Constraints

- 全系統只可以存在一份正式菜單及一個 canonical Product ID。
- Admin：可新增、刪除、修改產品核心、選項、打印、報表、各端展示設定及供應狀態。
- SMT／SMM：只可修改 `status` 及 `presentation.operations`；SMM 完全跟隨 SMT。
- Customer：只讀 `presentation.customer.visible=true` 的產品；網站／WhatsApp 提交只屬落單意向。
- Customer、SMT、SMM 不得直接寫受保護 RTDB；所有 mutation 必須經 Worker command。
- 禁止 bridge、guard、DOM scan、global interception、reload、第二套 state 或多份菜單同步。
- 離線快取必須保存最近一次完整有效菜單、版本、checksum、updatedAt；無效新資料不得覆蓋 Last Known Good。
- 正式訂單只可由 SMT 重新驗證最新產品、價格、供應及選項後建立。
- 本計劃暫不實作打印版面、打印內容排序、實際硬件打印及完整報表引擎。

---

## File Structure

### Admin repo `Pantonyeung/morefunos-admin` / `admin-preview`
- `src/menu/unified-product-schema.js`：canonical Product normalization／validation。
- `src/menu/bulk-mutation-policy.js`：批量操作模式、差異預覽及原子 mutation contract。
- `src/integrations/admin-api.js`：Unified Menu owner API client。
- `worker/src/routes/unified-menu.js`：Owner CRUD、Publish、Batch mutation。
- `worker/src/routes/staff-menu-operations.js`：Staff supply／operations ordering command。
- `functions/v1/menu/current.js`：公共讀取。
- `functions/v1/admin/menu.js`：Owner 管理入口。
- `functions/v1/staff/menu-operations.js`：SMT／SMM mutation 入口。
- `src/pages/products/*`：單品及批量管理 UI。

### SMT repo `Pantonyeung/morefunos-smt` / `smt-preview`
- `shared/unified-menu-client.js`：讀取及 mutation API。
- `shared/unified-menu-store.js`：唯一 Shared Core Menu State。
- `shared/unified-menu-cache.js`：Last Known Good＋Queue。
- `pages/order/*`、`pages/soldout/*`、`smm/mobile-app.js`：只由 Shared Store render。

### Customer repo `Pantonyeung/morefun-ordering-web` / `customer-preview`
- `src/runtime/unified-menu-consumer.js`：公共菜單 consumer。
- `src/runtime/menu-cache.js`：Last Known Good。
- 原生 product／cart／reorder／checkout domain：由同一 `status` 驗證。
- WhatsApp intent builder：離線提交意向及免責提示。

---

### Task 1: Canonical Unified Product Schema

**Files:**
- Create: `morefunos-admin/src/menu/unified-product-schema.js`
- Test: `morefunos-admin/tests/unified-product-schema.test.mjs`

**Interfaces:**
- Produces: `normalizeUnifiedProduct(input)`, `validateUnifiedProduct(product)`, `sortPresentation(items, profile)`。

- [ ] **Step 1:** 寫 failing tests，覆蓋唯一 Product ID、core、兩套 presentation、status、options、print routing、reporting、audit。
- [ ] **Step 2:** 執行 `node --test tests/unified-product-schema.test.mjs`，確認 FAIL。
- [ ] **Step 3:** 實作 normalization：
  - `status`: `available | soldout | paused | disabled`
  - `presentation.customer`：`visible/categoryId/categoryOrder/productOrder`
  - `presentation.operations`：同一結構，供 SMT／SMM 共用
  - `printing`：`productionSlip/packingSlip/riceBallLabel/takeawayLabel`，每項含 `enabled/printerId/copies/displayName`
  - 名稱 fallback：專用名稱 → `internalShortName` → `customerName`
- [ ] **Step 4:** 執行測試，確認 PASS。
- [ ] **Step 5:** Commit：`feat(menu): define canonical unified product schema`。

### Task 2: Firebase Single Menu Authority and Read API

**Files:**
- Create: `worker/src/routes/unified-menu.js`
- Create: `functions/v1/menu/current.js`
- Test: `tests/unified-menu-route.test.mjs`

**Interfaces:**
- Firebase path: `morefun/menu/v1/current`
- Produces public `GET /v1/menu/current` response：`{ok, version, checksum, updatedAt, categories, products}`。

- [ ] **Step 1:** 寫 failing route tests：同一資料含 Customer 與 Operations presentation；公共 API 不洩漏 owner-only audit／成本敏感欄位。
- [ ] **Step 2:** 執行 targeted test，確認 FAIL。
- [ ] **Step 3:** 實作單一路徑 read；刪除 runtime 組合時對舊 published products＋availability map 的依賴。
- [ ] **Step 4:** 加 checksum、version、完整性驗證。
- [ ] **Step 5:** 執行測試，確認 PASS。
- [ ] **Step 6:** Commit：`feat(menu): add single menu authority read API`。

### Task 3: Owner CRUD and Publish Migration

**Files:**
- Modify: `worker/src/routes/unified-menu.js`
- Create: `functions/v1/admin/menu.js`
- Modify: `src/integrations/admin-api.js`
- Test: `tests/admin-unified-menu.test.mjs`

**Interfaces:**
- `GET/POST/PATCH/DELETE /v1/admin/menu`
- Only owner may create/delete/change core、options、printing、reporting、customer presentation。

- [ ] **Step 1:** 寫 failing owner permission／CRUD／audit tests。
- [ ] **Step 2:** 執行，確認 FAIL。
- [ ] **Step 3:** 實作 migration reader：由現有 Admin Published products 建立 canonical Product；只在完整驗證成功後原子寫入 `morefun/menu/v1/current`。
- [ ] **Step 4:** 加 rollback snapshot：`morefun/menu/v1/history/{version}`。
- [ ] **Step 5:** 執行測試，確認 PASS。
- [ ] **Step 6:** Commit：`feat(admin): manage unified menu authority`。

### Task 4: Admin Bulk Management Center

**Files:**
- Create: `src/menu/bulk-mutation-policy.js`
- Create/Modify: `src/pages/products/bulk-*`
- Modify: `worker/src/routes/unified-menu.js`
- Test: `tests/bulk-menu-mutation.test.mjs`

**Interfaces:**
- `POST /v1/admin/menu/batch`
- Request：`{productIds, operations, mode, expectedVersion}`
- Mode：`add | remove | replace | patch`

- [ ] **Step 1:** 寫 failing tests，覆蓋：選項加入／移除、打印開關／打印機／張數、分類／排序／顯示、供應狀態、模板複製。
- [ ] **Step 2:** 實作 mutation preview：回傳產品數、欄位差異、衝突、不可修改欄位。
- [ ] **Step 3:** 實作二次確認 token＋`expectedVersion` optimistic lock。
- [ ] **Step 4:** 實作 RTDB 原子整批寫入；任何一項失敗整批不寫。
- [ ] **Step 5:** 寫 audit 及上一批操作 rollback reference。
- [ ] **Step 6:** 執行測試，確認 PASS。
- [ ] **Step 7:** Commit：`feat(admin): add atomic bulk menu management`。

### Task 5: SMT／SMM Shared Menu Core

**Files:**
- Create: `shared/unified-menu-client.js`
- Create: `shared/unified-menu-store.js`
- Create: `shared/unified-menu-cache.js`
- Modify: `pages/order/page.js`
- Modify: `pages/soldout/page.js`
- Modify: `smm/mobile-app.js`
- Test: `tests/unified-menu-shared-core.test.mjs`

**Interfaces:**
- `loadUnifiedMenu()`、`setProductStatus(productId,status)`、`setOperationsPresentation(updates)`。

- [ ] **Step 1:** 寫 failing tests：SMT 與 SMM 必須讀同一 Store；不得存在第二份 catalog／availability。
- [ ] **Step 2:** 實作公共 API load＋Shared Store subscription。
- [ ] **Step 3:** 將售罄／恢復／暫停 mutation 改為 `PATCH /v1/staff/menu-operations`。
- [ ] **Step 4:** 點單頁、售罄頁、產品卡、購物車 validator 全部改讀同一 product.status。
- [ ] **Step 5:** SMM 使用同一 operations category／sort，不建立獨立排序。
- [ ] **Step 6:** 執行測試，確認 PASS。
- [ ] **Step 7:** Commit：`feat(smt): consume unified menu shared core`。

### Task 6: SMT Offline Last Known Good and Pending Queue

**Files:**
- Modify: `shared/unified-menu-cache.js`
- Test: `tests/unified-menu-offline.test.mjs`

**Interfaces:**
- Cache：`{version,checksum,updatedAt,products,categories}`
- Queue item：`{id,baseVersion,productId,operation,value,createdAt,staffNumber,deviceId}`。

- [ ] **Step 1:** 寫 failing tests：冷啟動離線、關閉重開、無效新包不可覆蓋、Queue 保留。
- [ ] **Step 2:** 實作完整包驗證後才替換 Last Known Good。
- [ ] **Step 3:** 實作重連 flush；伺服器回傳 version conflict 時停止並要求重新套用，不靜默覆蓋 Admin 新資料。
- [ ] **Step 4:** 執行測試，確認 PASS。
- [ ] **Step 5:** Commit：`feat(smt): add durable unified menu offline cache`。

### Task 7: Customer Unified Menu Consumer and Offline Intent

**Files:**
- Create/Modify: `src/runtime/unified-menu-consumer.js`
- Create/Modify: `src/runtime/menu-cache.js`
- Modify product／cart／reorder／checkout native domains
- Test: Customer targeted tests

**Interfaces:**
- Customer 只渲染 `presentation.customer.visible=true`。
- Offline WhatsApp intent 明確標示非正式訂單。

- [ ] **Step 1:** 寫 failing tests：分類／排序、售罄攔截六個入口、離線冷啟動、WhatsApp intent。
- [ ] **Step 2:** 改讀 `GET /v1/menu/current`，移除舊 Customer runtime product subset／availability merge。
- [ ] **Step 3:** 將 status 驗證寫入產品、購物車、重訂及最終提交 Domain。
- [ ] **Step 4:** 顯示離線提示、最近更新時間及文案：`離線菜單只供參考，產品供應、價格及訂單內容，以店舖 SMT 最終確認為準。`
- [ ] **Step 5:** WhatsApp 只建立 intent payload，不建立正式 Order ID。
- [ ] **Step 6:** 執行測試，確認 PASS。
- [ ] **Step 7:** Commit：`feat(customer): consume unified menu with offline intent`。

### Task 8: Migration, Cross-Port Acceptance and Rollback

**Files:**
- Add targeted integration scripts／evidence records
- Append each repo `ENGINEERING_LOG.md`

- [ ] **Step 1:** 在 staging 建立 rollback snapshot，同時記錄舊 Published products、availability、Customer runtime checksum。
- [ ] **Step 2:** 執行 dry-run migration，輸出產品總數、缺 canonical ID、分類、選項、打印設定缺口。
- [ ] **Step 3:** 遷移後驗證 Admin、SMT、SMM、Customer 讀到相同 Product ID 集合。
- [ ] **Step 4:** 實機測試：Admin 售罄→三端；SMT 恢復→Admin/SMM/Customer；Customer 分類排序不影響 Operations；SMT 排序只影響 SMT/SMM。
- [ ] **Step 5:** 離線測試：SMT 現場銷售＋Queue；Customer 冷啟動＋WhatsApp intent。
- [ ] **Step 6:** 寫入 deployment URL、commit SHA、version、checksum、測試產品、時間及結果。
- [ ] **Step 7:** 失敗時回滾到 history snapshot；不得回復多份 Authority。
- [ ] **Step 8:** Commit：`docs(g1): record unified menu acceptance evidence`。

## Self-Review Result

- Spec coverage：統一 Authority、權限、兩套 presentation、選項、打印路由、批量管理、離線、WhatsApp intent、SMT 正式訂單邊界全部有對應 Task。
- Placeholder scan：無 TBD／TODO／模糊「稍後處理」。
- Type consistency：所有端口使用同一 Product、status、presentation 欄位；SMM 無獨立排序。
- Scope boundary：打印版面／硬件執行／完整報表引擎明確排除。
