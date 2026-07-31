# DEC-G2-20260731｜付款證明上傳、核對及 60 日保存

狀態：`DECISION LOCKED`
確認時間：2026-07-31 13:54 HKT
Owner 選擇：`A`

## 1. 已確認方案

1. Customer 上傳電子支付付款截圖。
2. SMT／SMM 使用現有已鎖定付款核對卡進行人工核對。
3. 付款證明圖片本體保存於受限制 Google Drive 資料夾。
4. Google Sheet 保存付款證明 ledger、訂單關聯、核對結果及 Audit。
5. 圖片最少保存 60 日。
6. 爭議、退款、核數調查中的圖片不得自動刪除。
7. 到期後刪除 Drive 圖片；Sheet 保留必要 Audit、核對結果及 `deleted_at`。

## 2. 不可取代的 SMT 既有流程

```text
待處理
→ 開始核對
→ 查看／放大付款證明
→ 保留待處理／資料有問題／核實成功
→ 核款成功後才確認接單
→ 運行中
→ 已完成
```

必須保留：

- 實際付款方式；
- 實際已付金額；
- 付款證明；
- WhatsApp QR／聯絡客戶；
- 問題快選及自訂問題；
- 是否通知客戶；
- 核對人、來源、裝置、時間、Audit。

## 3. 儲存責任

### Google Drive

- 私有檔案，不設公開連結。
- 檔名使用永久訂單 ID／proof ID，不使用客戶姓名或電話。
- 只允許 Backend service account／授權 SMT／SMM／Admin 取得短效預覽。

### Google Sheet

最低欄位：

- `proof_id`
- `order_id`
- `display_order_no`
- `business_date`
- `customer_channel`
- `payment_method_claimed`
- `payment_amount_claimed`
- `drive_file_id`
- `mime_type`
- `uploaded_at`
- `review_status`
- `reviewed_payment_method`
- `reviewed_amount`
- `reviewed_by`
- `reviewed_source`
- `reviewed_at`
- `issue_reason`
- `customer_notification_status`
- `retain_until`
- `retention_hold`
- `deleted_at`
- `audit_version`

## 4. 狀態

- `pending`
- `verified`
- `issue`
- `deleted_after_retention`

付款狀態與訂單狀態必須分開。圖片存在亦不等於付款真實；SMT／SMM 必須對照實際收款紀錄後才可標 `verified`。

## 5. 公司 WhatsApp

- 電話：`85261123071`
- Deep link：`https://wa.me/85261123071`

## 6. 安全規則

- 禁止公開 Drive URL。
- 禁止將圖片 Data URL／base64 長期寫入 Firebase、Google Sheet 或 Customer localStorage。
- Customer 只可讀取自己訂單的付款審核狀態，不可取得其他客人的 proof metadata。
- SMT／SMM 只可查看其 Staff permission scope 允許的訂單。
- 所有核對修改必須 server-side idempotency、revision 及 immutable audit。

## 7. 目前證據邊界

- SMT 本機付款核對 UI／Domain／Contract 已存在。
- Customer upload API、Drive adapter、Sheet adapter、跨端 queue、retention job、短效預覽及 Production deployment 尚未實作。

因此目前狀態係：

`DECISION LOCKED / SMT LOCAL FOUNDATION EXISTS / CROSS-PORT IMPLEMENTATION PENDING`

## 8. 相關 Authority

- Central governance：`docs/governance/MOREFUNOS_DECISION_RECORDING_AND_MULTI_REFERENCE_POLICY_V1.0.md`
- G Roadmap：`docs/roadmap/MOREFUNOS_G0_5_TO_G9_EXECUTION_ROADMAP_V1.0.md`
- SMT Current Authority：`Pantonyeung/morefunos-smt@smt-main-candidate-v1`
- Admin Current Authority：`Pantonyeung/morefunos-admin@feat/admin-p0-full-connect-v1`
- Customer Current Authority：`Pantonyeung/morefun-ordering-web@feat/g1-customer-runtime-consumer-v1`
