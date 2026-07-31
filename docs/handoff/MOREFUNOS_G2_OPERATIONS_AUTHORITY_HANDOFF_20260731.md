# MoreFunOS｜G2 多端營運權限＋離線下單＋付款審批接手

> 時間：2026-07-31 12:50 HKT  
> 狀態：`REQUIREMENTS INTAKE LOCKED / DESIGN REVIEW REQUIRED / IMPLEMENTATION NOT STARTED`  
> 工程邊界：本文件記錄新需求與 Authority；不得將文件存在誤寫成程式、部署、Browser、Device 或 Production PASS。

## 1. Current Authority Fresh-read

| 端口 | Repo／Branch | Head | PR | 現況 |
|---|---|---|---|---|
| Admin | `Pantonyeung/morefunos-admin` / `feat/admin-p0-full-connect-v1` | `3343a2cb2c283725d18aede33f89bdcfc288072e` | #1 Draft | Public Runtime、Staff availability、Customer public projection 已有 Source；Deployment／Device pending |
| SMT／SMM | `Pantonyeung/morefunos-smt` / `smt-main-candidate-v1` | `5e9d17509448661123bef1e446099e65dcfda1b0` | #34 Draft | SMT Register＋SMM Mobile Profile 共用 Supply Runtime；Deployment／Device pending |
| Customer | `Pantonyeung/morefun-ordering-web` / `feat/g1-customer-runtime-consumer-v1` | `14860c64492a3a2545454927e2dcb90ac5f7ea43` | #22 Draft | Public Runtime read、latest／previous valid menu cache；Offline order／proof upload 未實作 |

## 2. 今次產品要求｜LOCKED INTAKE

### A. Admin 菜單 Authority

Admin 係唯一權威菜單／Catalog 管理端，負責：

- 建立、修改、停用產品、分類、Option、Combo、Pricing；
- 設定每個產品可分發到哪些渠道；
- 指定 SMT 可以使用的菜單；
- 指定 SMM 可以使用的菜單；
- 指定 Customer 可以顯示及下單的菜單；
- 發佈 Published Version；
- 管理渠道授權與回收授權；
- 保留完整版本、Audit、Rollback。

正式原則：

```text
Admin Draft
→ Validate
→ Published Internal Catalog
→ Channel Projection
   ├─ SMT Assigned Catalog
   ├─ SMM Assigned Catalog
   └─ Customer Public Catalog
```

Customer Public Catalog 不得包含內部／平台／Staff-only 資料。

### B. SMT／SMM 售罄 Authority

Admin 可授權 SMT／SMM 控制獲分發產品的 Runtime availability。

- SMT／SMM 只可控制 Admin 已授權給該端的產品；
- 可設：`available`／`soldout`／`paused`；
- Admin 本身亦可控制同一 Runtime；
- 所有寫入必須經 Worker 身份驗證、Scope 驗證、Server Revision、Audit；
- Customer 只能接受 Effective Runtime；
- 只要 Admin／SMT／SMM 任一已授權寫入令產品成為 `soldout` 或 `paused`，Customer 必須禁止該產品加入購物車、修改、結帳及提交。

禁止：Client 直接寫 Firebase、用畫面狀態反推 Authority、不同端各自保存一套最終真相。

### C. 取餐時間／營業時間

Admin、SMT、SMM 都可控制即時營運資料：

- 今日開店／休息；
- 臨時提早收舖／延遲開店；
- 營業時段；
- 預計等候分鐘；
- 最早取餐時間；
- 最遲可選取餐時間；
- 暫停接單；
- 對客原因／提示。

正式模型：

```text
Admin Published Schedule／Policy
+ Authorized Runtime Override from Admin／SMT／SMM
→ Server-calculated Effective Store／Pickup Runtime
→ Customer read-only display and validation
```

同時寫入時不得以裝置時鐘決勝；使用 Worker 接受次序、Server Revision、Idempotency、Audit。Admin 可設定 `runtimeLock` 暫時收回 SMT／SMM 對指定 Domain 的寫權。

### D. Customer 離線 WhatsApp 下單

Customer 斷網但已有完整有效菜單快照時：

- 仍可瀏覽最近有效菜單；
- 可建立本機購物車；
- 唔可假裝即時確認供應／營業狀態；
- 結帳改為生成 Offline Order Envelope；
- 透過 WhatsApp 發送到公司電話；
- WhatsApp 訊息必須包含：本機訂單 ID、快照版本／checksum／savedAt、產品與選項、估算金額、取餐偏好、客戶資料、`OFFLINE_UNCONFIRMED` 標記；
- 必須顯示「尚未接單，等待店舖 WhatsApp 確認」；
- WhatsApp 未能開啟時，提供複製訂單內容；
- 恢復網絡後不可自動把同一訂單再提交一次，除非完成 reconciliation／dedupe。

離線訂單不等於正式 Order Authority；SMT／SMM 接收並確認後先建立／配對正式訂單。

### E. 電子支付付款證明

Customer 增加「上傳付款證明」入口：

- 只適用 Admin 啟用的電子支付方法；
- Proof object 綁定 order ID、payment method、應付金額、客戶提交時間；
- 檔案必須經受保護 upload endpoint／private storage；
- Customer 不可直接取得其他訂單證明；
- 狀態：`not_required`／`pending_upload`／`pending_review`／`approved`／`rejected`／`resubmit_required`；
- SMT／SMM 可查看獲授權訂單的付款證明；
- SMT／SMM 人工核對收款方、金額、時間、重複圖片／交易資料後批准或拒絕；
- 批准後先可將電子支付訂單正式接單；
- Admin 可查 Audit、覆核及撤銷錯誤批准。

重要限制：付款截圖本身不能技術上證明銀行已完成結算。OCR／AI／圖片 hash 只可作輔助與重複檢查，最終 Authority 仍係 Staff 人工核對實際收款紀錄。

## 3. 權限矩陣

| 能力 | Admin | SMT | SMM | Customer |
|---|---:|---:|---:|---:|
| 編輯權威 Catalog Draft | ✅ | ❌ | ❌ | ❌ |
| Publish／Rollback Catalog | ✅ | ❌ | ❌ | ❌ |
| 指定渠道可見／可用產品 | ✅ | ❌ | ❌ | ❌ |
| 控制已授權產品 availability | ✅ | ✅ | ✅ | ❌ |
| 控制營業／取餐 Runtime | ✅ | ✅（需 Scope） | ✅（需 Scope） | ❌ |
| 讀取 Customer 最新有效菜單 | ✅ | ✅ | ✅ | ✅ Read-only |
| 建立正式訂單 | 系統／Admin | ✅ | ✅ | Online submit；Offline 先 WhatsApp pending |
| 上傳付款證明 | ❌ | ❌ | ❌ | ✅ |
| 批准／拒絕付款證明 | Override／Audit | ✅ | ✅ | ❌ |
| 修改 Audit | ❌（只可追加／標記） | ❌ | ❌ | ❌ |

## 4. 單一資料 Authority

| Domain | Authority |
|---|---|
| Catalog Draft／Published／Channel Assignment | Admin Catalog／Release Domain |
| Staff Permission Scope | Admin Identity／Permission Domain |
| Effective Availability | Worker-authorized Runtime Domain → Firebase operational state |
| Business Hours／Pickup Runtime | Worker-authorized Store Operations Domain |
| Customer Catalog | Server-side Customer Public Projection |
| Customer Offline Menu | latest-valid＋previous-valid verified cache |
| Official Order | Server Order Domain；Offline WhatsApp message 只係 intake |
| Payment Proof Object | Private object storage＋Payment Proof metadata |
| Payment Approval | Authorized SMT／SMM Staff action＋immutable Audit |

## 5. 必須分拆的四條 Workstream

本需求包含四個可獨立驗收的 Sub-project，禁止一次混成大補丁：

1. **G2-A｜Catalog Assignment＋Permission Scope**
2. **G2-B｜Store Hours／Pickup Runtime Multi-writer**
3. **G2-C｜Customer Offline WhatsApp Order Envelope**
4. **G2-D｜Payment Proof Upload＋SMT／SMM Approval**

每條線必須獨立完成 Design → Plan → Source → Targeted → Full → Deployment → Browser → Device → Production Gate。

## 6. Current Progress Boundary

### 已有 Source／Evidence

- Admin Public Runtime；
- Customer Public Projection；
- SMT／SMM shared availability source；
- Customer soldout／paused normalization；
- Customer latest-valid／previous-valid offline menu cache；
- 部分 targeted isolated tests。

### 今次新需求未開始

- 產品渠道 assignment enforcement；
- Admin 對 SMT／SMM 的細粒度 permission scope；
- 營業時間／取餐時間 multi-writer API；
- Offline WhatsApp Order Envelope；
- 公司 WhatsApp 目標號碼配置；
- Payment Proof upload／private storage；
- Proof review queue；
- Proof approval gating official order；
- Device／Production acceptance。

## 7. Legacy／Stale Warning

中央 `AGENTS.md` 仍然將 Google Sheet／Apps Script 寫成 source of truth，與 Current Admin Worker／Firebase Public Runtime 架構衝突。新工作不得引用該段作 Authority；後續須以獨立文件更新／取代，避免下一個 AI 重啟淘汰鏈路。

歷史 V42EG／Apps Script Staff Login 記錄只可作舊測試背景，不得推翻 Current Authority。

## 8. Open Decision

實作 G2-C 前必須確認：

- 公司 WhatsApp 正式接單電話（含香港區號／WhatsApp deep-link 格式）。

## 9. 下一步 Gate

1. 產品負責人審核本 Authority／Scope；
2. 確認公司 WhatsApp 號碼；
3. 分別建立 G2-A／B／C／D Design Spec；
4. 每份 Spec 審核後先寫 implementation plan；
5. 未經審核禁止直接落功能碼。
