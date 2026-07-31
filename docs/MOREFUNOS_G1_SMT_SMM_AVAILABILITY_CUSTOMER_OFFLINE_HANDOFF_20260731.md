# MoreFunOS｜G1 SMT／SMM 售罄＋Customer 離線菜單接手｜2026-07-31

> 更新：2026-07-31 10:17 HKT  
> 狀態：`SOURCE IMPLEMENTED / TARGETED CONTRACT PASS / DEPLOYMENT AND DEVICE ACCEPTANCE PENDING`  
> 原則：GitHub＝工程 Authority；Google Drive＝長期可讀鏡像；Jade Note＝AI 接手導航。三者同步，但 Drive／Jade 不得取代 GitHub。

## 1. 本次目標與結論

### SMT／SMM 同時控制產品供應狀態

已將售罄控制正式收口到 Current SMT Authority：

- SMT Register Profile：`source=smt`
- SMM Mobile Profile：`source=smm`
- 共用同一 `pages/soldout`、Supply Domain、Staff API、Firebase operational availability、Audit、Customer projection。
- 狀態：`available`／`soldout`／`paused`。
- `soldout`：香港時間下一個 05:00 自動失效。
- `paused`：不自動失效。
- Source Implementation 已完成；Targeted contracts 已執行通過。
- Cloudflare staging、跨裝置及 production acceptance 尚未完成。

### Customer 最新有效本機菜單

Customer 已具備：

- IndexedDB＋localStorage 雙 backend；
- `latest-valid`＋`previous-valid` 雙快照；
- 完整 Customer menu contract 驗證後先保存；
- invalid／empty／partial／mapping-invalid Runtime 不覆蓋最後有效版本；
- latest 損壞時回退 previous；
- `soldout`／`paused` 均禁止下單並保留狀態語意。

Source Implementation 及本機 Targeted Cache Contract 已通過；Safari／PWA offline cold-start device acceptance 尚未完成。

## 2. Current Authority

### Admin／Worker

- Repo：`Pantonyeung/morefunos-admin`
- Branch：`feat/admin-p0-full-connect-v1`
- Firebase operational truth：`morefun/runtime/operations/v1/availability`
- Audit：`morefun/runtime/operations/v1/availabilityAudit`
- API：
  - `POST /v1/staff/login`
  - `GET /v1/staff/availability`
  - `PATCH /v1/staff/availability`
  - `GET /v1/runtime/customer`
- 接手：`docs/milestones/G1-F-01-staff-availability-runtime.md`

### SMT／SMM

- Repo：`Pantonyeung/morefunos-smt`
- Branch：`smt-main-candidate-v1`
- PR：#34 Draft
- SMM：同一 SMT Application 的 Mobile Profile；舊 `morefunos-smm` 不得重新成為獨立 Core。
- 正確改碼前回滾點：
  - Branch：`backup/supply-runtime-pre-unified-20260731-v2`
  - Commit：`bd8de413ed17cbc1196abed512ef009a7c5fb1fa`
- 接手：`docs/ai-context/SMT_SHARED_SUPPLY_RUNTIME_HANDOFF_20260731.md`
- QA：`docs/qa/SMT_SHARED_SUPPLY_RUNTIME_VERIFICATION_20260731.md`

### Customer

- Repo：`Pantonyeung/morefun-ordering-web`
- Branch：`feat/g1-customer-runtime-consumer-v1`
- 接手：`docs/milestones/G1-F-02-customer-offline-menu-survival.md`
- 中央 Registry 仍要求 Customer authority reconciliation；未可直接標 production authority。

## 3. 正式資料流

```text
SMT Register／SMM Mobile
→ existing Soldout Page
→ writeJSON(SUPPLY_STORAGE_KEY)
→ morefun:critical-storage-written
→ Shell Supply Runtime pending queue
→ SMT same-origin Pages Function
→ Admin Worker Staff API
→ Firebase operational availability
→ Customer Public Runtime read-time overlay
→ Customer live runtime
   或 latest-valid／previous-valid offline snapshot
```

### 單一 Authority

| 決策 | Authority |
|---|---|
| 售罄操作 UI | `pages/soldout/page.js` |
| 本機供應狀態 | `SUPPLY_STORAGE_KEY` |
| Queue／Staff Session／跨端同步 | `shared/supply-runtime.js` |
| Shell 登入與離線 fallback | `shell-startup.js` |
| Server operational truth | Firebase availability path |
| Customer projection | Admin Worker Public Runtime overlay |
| Customer offline snapshot | `customerOfflineRuntimeStore.js` |

禁止：獨立 SMM Domain、MutationObserver 掃 DOM、`Storage.prototype` patch、Admin publish 覆蓋 operational availability、無效 Runtime 覆蓋最後有效 Customer 菜單。

## 4. 今次正式修正

### SMT／SMM Staff Session 與離線 Queue

- Persisted Staff Session 必須與目前 `source + deviceId` 完全一致。
- SMT token 不可由 SMM Mobile Profile 重用；反之亦然。
- 401／403：清除失效 token，但保留本機供應狀態＋pending queue，狀態改為 `session-required`。
- Network／5xx：保持 `offline-local`，不刪 Session／Queue。
- Staff Login 改為 remote-first。
- 只有真正網絡失敗，而且本機已有相同帳密時，才容許 offline fallback。
- 已解鎖 Shell 可重新登入，不重做開工現金。
- Login 200 後如舊 Queue PATCH 即時回 401／403，login 必須失敗，不能假裝 connected。

### Admin SMM mutation

新增獨立 contract 證明：

- `source=smm`
- `deviceId=SMM-01`
- 寫入同一 Firebase operational availability
- Audit 保存 SMM source／device／changes

### Customer

- `soldout` → `is_available=false`、`is_sold_out=true`
- `paused` → `is_available=false`、保留 `availability_status=paused`
- 不用產品名稱猜分類。
- 完整 categories／products／optionGroups／combos／pricing／Customer assignment contract 通過後先寫 cache。

## 5. 已執行 Targeted Evidence

> 以下是 isolated local targeted evidence；不是 Full Repository／Browser／Deployment／Device PASS。

| Gate | 結果 |
|---|---|
| Supply Runtime syntax | PASS |
| Shell Startup syntax | PASS |
| Supply Session Control syntax | PASS |
| SMT／SMM Supply Runtime | `6／6 PASS` |
| Shared Profile／same-origin wiring | `5／5 PASS` |
| Admin SMM availability mutation | PASS |
| Customer latest／previous cache | `4／4 PASS` |

### Full Suite 執行限制

曾嘗試在隔離 container clone 三個最新 branches 跑 full suites，但執行環境無法解析 `github.com`，clone 於 DNS 階段失敗。此限制已明確記錄；不得將 targeted PASS 擴大成 full PASS，也不得用 CI 作開發試錯替代本機根因驗證。

## 6. 踩坑與成功方案

### K1｜舊分支有功能，不代表 Current Authority 完成

**成功方案：**修改前 fresh-read Central Registry、AGENTS、Current PR head；只在 `smt-main-candidate-v1` 落正式實作。

### K2｜Keyed localStorage 會丟 Product ID

`{F4:{status:'soldout'}}` 若直接 `Object.values()` 會失去 F4。

**成功方案：**用 entries 正規化，將 key 注入 canonical `productId`。

### K3｜SMT／SMM 共用 storage 會錯用另一 Profile token

**成功方案：**Session 綁定 `source + deviceId`；不一致只清 token，不清 local supply／Queue。

### K4｜先查本機帳密會阻塞 Admin 新增 Staff

**成功方案：**remote-first；local credential 只作真正網絡失敗時的 offline fallback。

### K5｜401／403 不等於離線

**成功方案：**明確拒絕、清 token、保留 Queue、要求重新登入；network／5xx 才進 `offline-local`。

### K6｜Login 200 後 Queue Flush 仍可能撤銷 token

**成功方案：**加入 login-to-flush auth-race contract；PATCH 401／403 時 login 必須失敗，Queue 保留。

### K7｜安全上不可保存密碼

**成功方案：**首次離線只可本機開工；恢復網絡後由 Shell 明確重新登入，再 flush Queue。

### K8｜Admin publish 不可覆蓋現場售罄

**成功方案：**Catalog publish 與 operational availability 分離 Authority；Customer read-time overlay。

### K9｜Preview CORS／跨域脆弱

**成功方案：**SMT／Customer 均使用 same-origin Pages Function proxy；Worker 保留身份驗證。

### K10｜回滾 Branch 曾指向較早 head

**成功方案：**新建 `backup/supply-runtime-pre-unified-20260731-v2`，精確鎖定改碼前 Candidate head；舊 backup 名稱不得作正式回滾依據。

### K11｜Source／Targeted／Full／Deployment／Device／Production 不可混寫

**成功方案：**所有 checkpoint 固定分層記錄，未有該層證據就標 pending。

### K12｜執行容器無 GitHub DNS

**成功方案：**如實記錄 full suite 未執行；保留 targeted evidence，下一個有完整工作區的環境再跑 affected／full suites，禁止虛構結果。

## 7. 未完成 Gate

1. Full SMT Node regression latest head。
2. Full Admin tests latest head。
3. Full Customer Runtime tests latest head。
4. Admin Worker latest staging deployment。
5. SMT Pages Functions latest staging deployment。
6. Customer latest staging deployment。
7. SMT 設 F4 售罄 → SMM 15 秒內收到 → Customer 不可下單。
8. SMM 恢復 F4 → SMT／Customer 同步。
9. 斷網改 paused → Queue 保留 → 重連未登入不丟失 → 重新登入後 flush。
10. Token revoke 實測。
11. 香港時間 05:00 staging acceptance。
12. iPhone／Android Mobile Profile 操作與排版。
13. Customer Safari／PWA offline cold-start；latest 損壞回退 previous。
14. Customer branch reconciliation／production promotion。

## 8. 三方接手同步

### GitHub

- Central：本文件
- SMT：`docs/ai-context/SMT_SHARED_SUPPLY_RUNTIME_HANDOFF_20260731.md`
- SMT QA：`docs/qa/SMT_SHARED_SUPPLY_RUNTIME_VERIFICATION_20260731.md`
- Admin：`docs/milestones/G1-F-01-staff-availability-runtime.md`
- Customer：`docs/milestones/G1-F-02-customer-offline-menu-survival.md`

### Google Drive

- 文件：`MoreFunOS｜G1 SMT／SMM 售罄＋Customer 離線菜單接手｜2026-07-31`
- ID：`1HDzr3RlC-oCtfx8pvKKVt0kMb8bCwyYp6roB1DmyMPQ`
- 已追加 10:17 HKT Targeted Execution Update。

### Jade Note

- Note ID：`cbcae17d-8da5-4b2b-bd2c-1d87c996ddbe`
- 標題：`MoreFunOS｜G1 SMT／SMM 售罄＋Customer 離線菜單｜2026-07-31 Targeted PASS`
- 已更新為 pinned／high importance，包含 Current Authority、證據、踩坑及剩餘 Gate。

## 9. 下一步唯一優先

在有完整 repository workspace 的環境跑最新 head affected／full suites，然後部署 Admin＋SMT＋Customer staging，完成 SMT→SMM→Customer 真實雙向供應狀態閉環。

未完成 Deployment／Device Matrix 前，唯一正確狀態：

`SOURCE IMPLEMENTED / TARGETED CONTRACT PASS / DEPLOYMENT AND DEVICE ACCEPTANCE PENDING`
