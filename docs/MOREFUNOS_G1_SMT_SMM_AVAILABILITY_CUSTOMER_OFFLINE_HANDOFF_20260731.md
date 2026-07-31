# MoreFunOS｜G1 SMT／SMM 售罄＋Customer 離線菜單接手｜2026-07-31

> 狀態：CURRENT CHECKPOINT / SOURCE IMPLEMENTED / DEPLOYMENT AND DEVICE ACCEPTANCE PENDING  
> 時區：Hong Kong HKT  
> 原則：GitHub＝工程 Authority；Google Drive＝長期可讀鏡像；Jade Note＝AI 接手導航。三者必須同步，但 Jade／Drive 不得取代 GitHub。

## 1. 本次目標

1. SMT Register Profile 與 SMM Mobile Profile 都可以控制：
   - 今日售罄；
   - 暫停供應；
   - 恢復供應。
2. 兩個 Profile 共用同一套 Supply Domain、Staff Session、Firebase operational availability、Audit 及 Customer projection。
3. Customer 無法連接 Runtime 時，保留最近一份完整、有效、可驗證的本機菜單；無效／半套資料不得覆蓋最後有效快照。
4. 保存踩坑、成功方案、未完成 Gate，禁止把 Source、Test、Deployment、Device Acceptance 混為一談。

## 2. Current Authority

### Admin／Worker
- Repo：`Pantonyeung/morefunos-admin`
- Branch：`feat/admin-p0-full-connect-v1`
- PR：#1 Draft／Open
- Fresh-read PR head：`d353079a577b21a889a736c3298689d9d58dad5e`
- Staff availability source：`worker/src/routes/staff-availability.js`
- Worker routes：
  - `POST /v1/staff/login`
  - `GET /v1/staff/availability`
  - `PATCH /v1/staff/availability`
  - `GET /v1/runtime/customer`

### SMT／SMM
- Repo：`Pantonyeung/morefunos-smt`
- Current branch：`smt-main-candidate-v1`
- PR：#34 Draft／Open／Mergeable
- Verified source head at checkpoint：`4e4ca06e8d7afee364e751521932fe01052efe91`
- SMM 定位：SMT 同一 Application 嘅 Mobile Profile；舊 `morefunos-smm` 禁止重新成為獨立 Core。

### Customer
- Repo：`Pantonyeung/morefun-ordering-web`
- Source branch：`feat/g1-customer-runtime-consumer-v1`
- 相對 `main`：ahead 117／behind 0（2026-07-31 fresh compare）
- 注意：中央 Registry 仍標記 Customer Authority 需要 reconciliation；因此本分支只可標 Source implementation，未可直接標最終 Authority／production。

## 3. 正式資料流

```text
SMT Register / SMM Mobile
→ existing Soldout Page local state
→ morefun:critical-storage-written
→ Shell Supply Runtime
→ SMT same-origin Pages Function
→ Admin Worker Staff API
→ Firebase morefun/runtime/operations/v1/availability
→ Admin Customer Runtime overlay
→ Customer /v1/runtime/customer
→ Customer live runtime or latest-valid offline snapshot
```

### 單一 Authority
- 售罄操作 UI：`pages/soldout/page.js`
- 本機供應狀態：`SUPPLY_STORAGE_KEY`
- 跨端同步／Queue／Staff Session：`shared/supply-runtime.js`
- Server operational truth：Firebase `morefun/runtime/operations/v1/availability`
- Customer availability projection：Admin Worker `handleCustomerRuntime`
- Customer latest-valid cache：`customerOfflineRuntimeStore.js`＋`morefunPublicRuntime.js`

禁止：
- 獨立 SMM Domain；
- MutationObserver 掃 DOM；
- `Storage.prototype` patch；
- Admin publish 覆蓋營運售罄；
- 無效 Runtime 覆蓋最後有效 Customer 菜單。

## 4. 已實作

### Admin Worker
- Staff Session 驗證：account enabled、sessionVersion、source=`smt|smm`。
- 單項／批量 availability 更新。
- 狀態：`available|soldout|paused`，兼容 `sold_out` 等 alias。
- 產品 ID alias → canonical ID 映射，降低 SMT legacy code 與 Admin canonical ID 不一致風險。
- Audit：actor、source、device、timestamp、changes、correlation ID。
- 今日售罄按香港時間下一個 05:00 過期；paused 不自動恢復。
- Customer Runtime 將 operational availability 疊加到 published runtime。
- Admin publish／rollback 不直接覆寫 operational availability。

### SMT Register＋SMM Mobile Profile
- `shared/supply-runtime.js`：local-first、pending queue、Staff Session、flush、refresh、15 秒 polling。
- `functions/v1/staff/login.js`、`availability.js`：同源 proxy，避免 browser CORS 成為運行依賴。
- `shell-startup.js`：登入成功建立 Staff Session；網絡失敗但本機帳密正確時可本機開工。
- Shell status 顯示：供應同步／同步中／離線待同步／本機模式。
- `shared/supply-session-control.js`：網絡恢復後明確重新登入入口，不保存密碼。
- Register／Mobile 使用同一 `pages/soldout` route；Mobile 只改 Shell／Page composition，不建立第二套 Domain。
- `shared/supply-page-bridge.js`：Order／Soldout 收到 shared storage 變更後更新頁面。

### Customer latest-valid offline menu
- IndexedDB＋localStorage 雙持久化。
- 保存 latest＋previous valid snapshot。
- 驗證 envelope：schema、version、checksum、完整 published sections、產品分類／價格／section contract。
- Live timeout／network／invalid payload 時回退 latest valid snapshot。
- latest 損壞時可回 previous。
- invalid／partial runtime 拒絕寫入，不覆蓋 latest valid。
- Offline UI 清楚標示最近有效菜單、更新時間及 browse-only 限制。
- soldout 與 paused 都映射為 `is_available=false`，同時保留各自狀態語意。

## 5. Targeted tests 已提交

### Admin
- `worker/test/staff-availability.test.mjs`
- `worker/test/customer-availability-overlay.test.mjs`
- `worker/test/staff-availability-hk-cutoff.test.mjs`

### SMT
- `tests/shared-supply-runtime.test.mjs`
- `tests/shared-supply-runtime-integration.test.mjs`

### Customer
- `tests/customer-offline-runtime-store.test.mjs`
- `tests/customer-offline-shell.test.mjs`
- `tests/customer-availability-status-normalization.test.mjs`

> 本 checkpoint 已確認測試檔及 source 存在，但未取得與最新三個 branch head 對齊的執行輸出，因此不得寫成 Automated PASS。

## 6. 踩坑注意

### K1｜寫在舊分支不算完成
第一版 SMT／SMM 供應同步寫到已被取代的 `feat/smt-order-page-v1`。Current Registry 指定 `smt-main-candidate-v1` 才係 Current Authority。

**成功方案：**每次修改前 fresh-read Central Registry、AGENTS、PR head；功能必須遷入 Current Authority，再重新驗證。

### K2｜香港 05:00 時區 off-by-one
舊算法喺 00:00–04:59 HKT 會將過期時間推遲一日。

**成功方案：**先將 UTC timestamp 平移至香港本地時間，計算下一個 local 05:00，再減 UTC+8；加入凌晨前後兩個 regression case。

### K3｜Keyed localStorage 丟失產品 ID
本機格式係 `{F4:{status:'soldout'}}`；直接 `Object.values()` 會丟失 `F4`。

**成功方案：**正規化 object 時保留 entry key，必要時注入 `productId=key`。

### K4｜離線首次登入不能保存密碼
安全上禁止保存員工密碼；首次離線登入只能本機運行，網絡恢復後無法自動換取 Staff token。

**成功方案：**Shell 狀態提供明確重新登入入口；本機 Queue 保留，登入成功後再 flush。

### K5｜CORS／Preview origin 不應成為 POS 核心依賴
直接由 SMT browser 呼叫 Admin Worker會受 Preview origin／CORS 影響。

**成功方案：**SMT Pages Function 作同源 proxy；Worker 仍保留身份驗證，proxy 不保存 secret。

### K6｜Stale SHA／並行寫入
GitHub update 曾因同一路徑已被其他提交更新而返回 409。

**成功方案：**每次 update 前 fresh-fetch current blob SHA；保留並行新增嘅 alias／normalization 功能後再修改。

### K7｜GitHub same-repo PR metadata 422
對同 repo PR 設定 `maintainer_can_modify` 返回 422。

**成功方案：**同 repo PR 更新 metadata 時省略該欄位。

### K8｜誤建臨時 branches
Admin repo 誤建 `temp-noop`、`temp-noop-2`、`temp-noop-3`、`temp-noop-4`、`temp-noop-5`。目前 connector 無 delete-ref action，尚未清理。

**處理：**列為 cleanup debt；不得隱瞞或當作功能 branch。

### K9｜Source ≠ Test ≠ Deployment ≠ Device
Cloudflare build success、test file存在、source code存在，都不能代替跨裝置實際驗收。

## 7. 未完成 Gate

1. 執行並保存 Admin／SMT／Customer targeted test output，且 commit 必須對齊當前 head。
2. 部署 Admin Worker latest branch，驗證 Staff login／GET／PATCH availability。
3. 部署 SMT Main Candidate Pages Functions。
4. 實測 SMT 設 F4 售罄 → SMM 15 秒內看到 → Customer Runtime／前端不可下單。
5. 實測 SMM 恢復供應 → SMT／Customer 同步。
6. 斷網時 SMT／SMM 本機改動可見、Queue 保留；重連＋重新登入後 flush。
7. Customer 斷網／Runtime 500／invalid JSON／partial payload：仍顯示最近有效菜單；不得以空餐單覆蓋。
8. 00:00–04:59 HKT 今日售罄於同一營業日 05:00 恢復；05:00 後操作於翌日 05:00 恢復。
9. Mobile profile iPhone／Android 實機可操作性及觸控尺寸驗收。
10. Customer Authority reconciliation／正式 production promotion。

## 8. 回滾

- SMT：回到 PR #34 本次變更前 head，移除 supply runtime／proxy／mobile profile asset；本機 `SUPPLY_STORAGE_KEY` 保留，不刪營運資料。
- Admin：回到 HK cutoff／availability route 改動前 commit；Firebase operational availability path 不刪除。
- Customer：停用新 consumer build時保留 IndexedDB／localStorage snapshots，避免清除最後有效菜單。

## 9. 下一步唯一優先

先取得與最新 head 對齊的 targeted execution evidence，再做 Cloudflare雙端 staging與 SMT→SMM→Customer 實機閉環。未完成以上 Gate 前，狀態維持：

`SOURCE IMPLEMENTED / CONTRACTS COMMITTED / DEPLOYMENT AND DEVICE ACCEPTANCE PENDING`
