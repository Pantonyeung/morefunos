# PROJECT BRIEF｜More Fun Mobile Ordering Web

## 1. Project Identity

Project Name：More Fun OS  
Brand：磨飯 More Fun  
Primary Use：手機點餐網站  
Business Type：夫妻店、小型餐飲、自取外賣為主  

## 2. Business Background

磨飯是一間以外賣為主的門店，核心產品線包括：

- 紫米飯團
- 紫米套餐
- 紫米沙律
- 便當
- 小食
- 飲品

網站不需要做成大型平台，而是要做成「夠用、快、容易維護」的自家點餐工具。

## 3. Product Goal

第一階段目標：

- 讓客人可以快速完成手機下單
- 讓店主可以用 Google Sheet 更新產品、價格、售罄狀態
- 訂單透過 WhatsApp 傳送到門店手機
- 不需要付費 API
- 不需要大型會員系統
- 不需要複雜 POS 串接

## 4. Target Users

### Customer

- 學生
- 上班族
- 家庭客
- 回訪熟客

### Store Operator

- 店主
- 太太
- 臨時工

## 5. First Version Scope

必須完成：

- 首頁
- 點單頁
- 商品分類
- 商品詳情
- 套餐選擇
- 加購與升級
- 購物車／記憶罐
- 結帳頁
- WhatsApp 訂單摘要
- Google Sheet 商品資料讀取
- 售罄控制

暫時不做：

- 線上付款
- 自家外送
- POS API 串接
- AI 推薦
- 倉庫管理
- 盤點
- 複雜會員積分兌換

## 6. Design Direction

整體風格：

- 輕日系
- 現代簡約
- MUJI / Apple 方向
- 簡潔但有品牌溫度
- 少顏色
- 少干擾
- 清楚引導成交

## 7. Technical Direction

建議方向：

- 前端：Next.js / React
- UI：Tailwind CSS
- Data：Google Sheet
- Order：WhatsApp URL / WhatsApp Business
- Deploy：Cloudflare Pages / Vercel / Netlify 其中一個
- Image：WebP，建議 800 × 800 px

## 8. Success Criteria

第一版成功標準：

- 客人可以在手機 1–2 分鐘內完成下單
- 店主可以自己改 Google Sheet 更新產品
- 售罄狀態可以快速控制
- WhatsApp 訂單摘要清楚
- Codex 可以根據文件繼續開發
