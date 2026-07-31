# MoreFunOS｜工作報告｜2026-07-31 12:50 HKT

## 一、本輪已完成工作

1. Fresh-read Admin／SMT／Customer Current Authority、branch head、Draft PR。
2. 確認 Admin 係 Catalog／Release Control Plane。
3. 確認 SMT Register＋SMM Mobile Profile 共用同一 Supply Domain，舊獨立 SMM Core 不得復活。
4. 確認 Customer reads 已轉到 Worker→Firebase Public Runtime，Apps Script不得作read fallback。
5. 完成 Internal Published Catalog／Customer Public Projection分離 Source。
6. 完成 Customer availability server-side filtering方向：Customer-hidden產品與Staff audit欄位不得出現在Public Runtime。
7. 接收並拆解新增產品要求：
   - Admin分發渠道菜單及授權；
   - SMT／SMM／Admin共同控制售罄；
   - SMT／SMM／Admin共同控制營業及取餐時間；
   - Customer離線WhatsApp下單；
   - Customer付款證明上傳；
   - SMT／SMM核對付款後批准訂單。
8. 建立跨端接手文件及進度文件。

## 二、本輪沒有宣稱完成的工作

- 沒有實作G2新API／UI／Storage；
- 沒有部署Cloudflare latest builds；
- 沒有完成Full Repository tests；
- 沒有完成跨端Browser／Device／Production acceptance；
- 沒有配置公司WhatsApp電話；
- 沒有建立Payment Proof object storage；
- 沒有建立付款審批queue。

## 三、需求拆分

### Workstream A｜Catalog Assignment／Permission

輸入：Admin Published Internal Catalog。  
輸出：SMT Assigned、SMM Assigned、Customer Public。  
核心：Admin可授權／撤銷；端口不可越權。

### Workstream B｜Store Operations Runtime

輸入：Admin Published Schedule＋Authorized Runtime Writes。  
輸出：Effective business hours／store status／wait minutes／pickup windows。  
核心：Server revision、audit、runtime lock。

### Workstream C｜Offline WhatsApp Intake

輸入：Customer latest-valid cache＋本機cart。  
輸出：WhatsApp Offline Order Envelope。  
核心：未確認標記、避免雙單、恢復網絡後reconciliation。

### Workstream D｜Payment Proof／Order Approval

輸入：Customer proof upload＋order metadata。  
輸出：SMT／SMM approval／rejection＋payment audit。  
核心：Private storage、人工核對、approval gate。

## 四、權限原則

- Admin擁有Catalog與Permission Authority。
- SMT／SMM只控制Admin授權範圍。
- Admin／SMT／SMM Runtime寫入都經同一Worker。
- Customer永遠read-only讀取Effective Runtime。
- Availability不可改變channel visibility。
- Payment proof approval不可修改原始proof；只能新增review decision／audit。
- Offline WhatsApp訊息不是正式order，直到Staff確認或reconcile。

## 五、風險

1. Multi-writer若用client timestamp會出現錯序覆蓋。
2. Admin若把Published與Runtime混在同一release，發佈會覆蓋現場狀態。
3. Customer離線用舊菜單可能遇到售罄／休息；必須顯示未確認。
4. WhatsApp deep link成功不等於訊息已送達或店舖已接單。
5. 付款截圖可偽造；不可自動宣稱真實付款。
6. Proof圖片若公開URL或直接Firebase public path，會洩露客戶付款資料。
7. Offline order恢復網絡自動提交會造成重複訂單。
8. SMT與SMM各建一套review queue會造成雙批准／狀態分叉。

## 六、建議執行順序

1. G2-A Catalog Assignment＋Permission Scope；
2. G2-B Store／Pickup Runtime；
3. G2-C Offline WhatsApp Envelope；
4. G2-D Payment Proof；
5. 跨端Order reconciliation；
6. Browser／Device／Production acceptance。

原因：後三項全部依賴身份、Scope、產品assignment及正式Runtime資料模型。

## 七、需要產品負責人確認

- 公司WhatsApp正式接單號碼；
- 是否接受付款證明最終由Staff人工核對，而非AI自動判真；
- Admin runtimeLock是否需要按Domain／產品／端口三層設定。

本輪只問第一個必要問題；其餘在各Sub-project Design中逐項確認。
