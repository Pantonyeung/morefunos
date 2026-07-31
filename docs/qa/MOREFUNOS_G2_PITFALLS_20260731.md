# MoreFunOS｜G2 跨端踩坑報告｜2026-07-31

## P1｜將 Admin 菜單權威與 Customer 公開資料混成同一份

**後果：**Customer 可能收到平台餐、現場專用產品、Staff-only options、成本、內部代碼或audit資料。  
**成功方案：**保留 Internal Published Catalog；由Server產生SMT／SMM assignment projection及Customer public projection。

## P2｜用 Customer 可見清單驗證 SMT／SMM 售罄

**後果：**平台／現場專用產品無法由店員售罄。  
**成功方案：**Staff validation讀Internal Catalog，再檢查該端assignment／permission scope；Customer visibility只影響公開投影。

## P3｜Availability 改變 Visibility

**後果：**隱藏產品因有售罄資料而意外出現在Customer。  
**成功方案：**Catalog visibility與Operational availability分離；availability只可改供應狀態。

## P4｜Admin／SMT／SMM各自直接寫Firebase

**後果：**無統一權限、衝突處理、revision、idempotency及audit。  
**成功方案：**全部mutation經Worker；Firebase只接受Server Authority。

## P5｜Multi-writer採用Client Timestamp Last-write-wins

**後果：**裝置時鐘不準、離線舊操作覆蓋新狀態。  
**成功方案：**Worker server revision＋acceptedAt；每次write帶expectedRevision／idempotency key，衝突回409再refresh。

## P6｜Published Schedule與Runtime Override混在一起

**後果：**Admin重新發佈菜單時覆蓋今日臨時休息／等候時間。  
**成功方案：**Published Policy與Operational Runtime分開path及Domain。

## P7｜Admin有權就等於SMT／SMM永遠有權

**後果：**無法臨時收回店員對營業時間、售罄或付款批准權。  
**成功方案：**Admin管理role＋scope＋runtimeLock；SMT／SMM每次mutation都重新驗證sessionVersion及scope。

## P8｜Customer離線菜單當成即時狀態

**後果：**客戶以為產品仍供應、店舖營業或可在指定時間取餐。  
**成功方案：**顯示snapshot savedAt；離線checkout標`OFFLINE_UNCONFIRMED`；只可WhatsApp等待確認。

## P9｜Offline WhatsApp後恢復網絡自動再提交

**後果：**同一訂單形成WhatsApp單＋online單。  
**成功方案：**Offline Order Envelope有stable localOrderId；記錄`whatsapp_handoff_at`；恢復網絡只提供人工reconcile，不自動submit。

## P10｜WhatsApp開啟成功當成店舖已收到

**後果：**客戶誤以為完成落單。  
**成功方案：**清楚顯示「尚未接單」；只有店舖回覆或Server reconciliation才可轉`accepted`。

## P11｜付款截圖當成真實付款證明

**後果：**偽造圖、舊圖、重複圖、錯金額仍被自動接受。  
**成功方案：**圖片只係proof submission；Staff對實際收款記錄人工核對。OCR、hash、重複偵測只作輔助。

## P12｜付款證明用公開URL

**後果：**客戶姓名、金額、付款帳戶資料外洩。  
**成功方案：**private object storage、短效signed URL、order-level authorization、存取audit。

## P13｜SMT與SMM建立兩套付款審批queue

**後果：**雙批准、互相覆蓋、狀態不同步。  
**成功方案：**單一Payment Review Domain；SMT／SMM只係不同profile／surface，共讀同一review record。

## P14｜Payment Approval與Order Acceptance混成不清楚狀態

**後果：**拒絕付款但訂單已進廚房，或付款已核對但訂單仍卡住。  
**成功方案：**分開`paymentStatus`與`orderStatus`；電子支付訂單必須滿足payment approved gate先可accept。

## P15｜Offline proof upload假裝成功

**後果：**本機圖片未上傳，但畫面顯示等待審核。  
**成功方案：**離線只保存local pending或提示直接在WhatsApp附圖；Server未回receipt前不得標`pending_review`。

## P16｜舊 Apps Script／Google Sheet文件重新成為Authority

**後果：**新AI把Customer reads、Staff login或runtime重新接回淘汰鏈路。  
**成功方案：**Current Worker／Firebase／Public Runtime文件列為CURRENT；舊文件標`SUPERSEDED／HISTORICAL ONLY`。

## P17｜只更新GitHub其中一個repo

**後果：**Admin、SMT、Customer對同一contract理解不同。  
**成功方案：**每個checkpoint同步Central、Admin、SMT、Customer、Drive、Jade；但GitHub仍係工程Authority。

## P18｜將Requirements／Source／Deployment／Device混寫

**後果：**未部署功能被誤認為可營運。  
**成功方案：**固定分層：Requirements → Design → Source → Targeted → Full → Deployment → Browser → Device → Production。
