# MoreFunOS 決策登記與多方引用規則 V1.0

狀態：`CURRENT / HARD RULE`
確認時間：2026-07-31 13:54 HKT
適用範圍：Admin、SMT、SMM Mobile Profile、Customer、Worker、Firebase、Google Drive、Google Sheet、打印、APK／PWA、營運規則。

## 1. 目的

防止產品負責人已確認的方案只留在單一對話，導致下一個 AI、另一個分支或另一端口接手時遺失決策、重做設計或走回舊架構。

## 2. 強制紀錄原則

每一項由產品負責人確認的：

- 方案；
- 流程；
- 權限；
- 狀態機；
- 資料 Authority；
- UI／操作方式；
- 留存期；
- 電話、端口或營運設定；
- 改變、取代或撤銷的決策；

均必須建立可追溯 Decision Record，禁止只留在 ChatGPT 對話。

## 3. 最少四方同步

每個正式 checkpoint 必須同步：

1. **GitHub Central**：跨 repo 最高接手、決策、Roadmap、證據狀態。
2. **相關 App Repo**：本端責任、程式位置、測試、回滾、未完成 Gate。
3. **Google Drive**：方便人手查閱的接手鏡像／工作報告。
4. **Jade Note**：置頂導航、關鍵決策摘要、指向 GitHub／Drive Authority。

如涉及進行中的 PR，另須在 PR Conversation 加 checkpoint comment。

## 4. 交叉引用格式

每份文件必須列出：

- Decision ID；
- 日期及香港時間；
- Owner 原話／確認內容的準確摘要；
- Current Authority repo／branch／path；
- 相關 GitHub commit／PR；
- Google Drive 文件 ID；
- Jade Note ID；
- 影響端口；
- 實作狀態；
- 測試證據；
- 部署狀態；
- 實機狀態；
- 回滾點；
- 踩坑；
- 成功方案；
- 下一個唯一 Gate。

## 5. 證據層級不可混寫

固定使用以下六層：

1. `DECISION LOCKED`：產品決策已確認。
2. `SOURCE IMPLEMENTED`：程式已寫入 Current Authority 分支。
3. `TARGETED TEST PASS`：相關隔離／Contract test 通過。
4. `FULL REGRESSION PASS`：最新 branch head 完整回歸通過。
5. `DEPLOYED / DEVICE ACCEPTED`：Staging／裝置實測通過。
6. `PRODUCTION ACCEPTED`：真實營運閉環通過。

禁止將文件已寫、程式存在或單一測試通過寫成「已落地」。

## 6. Current Authority

- Admin：`Pantonyeung/morefunos-admin`／`feat/admin-p0-full-connect-v1`
- SMT＋SMM Mobile Profile：`Pantonyeung/morefunos-smt`／`smt-main-candidate-v1`
- Customer：`Pantonyeung/morefun-ordering-web`／`feat/g1-customer-runtime-consumer-v1`
- Central Registry：`Pantonyeung/morefunos`／`main`

舊 Apps Script、V42EG、舊 SMM repo、舊 patch／overlay／workflow 文件只可作歷史參考，不可重新成為 Runtime Authority。

## 7. 目前新增決策

### DEC-G2-20260731-01｜公司 WhatsApp

- 公司正式接單電話：`85261123071`
- Deep link：`https://wa.me/85261123071`
- 離線 Customer 訂單只可標記 `OFFLINE_UNCONFIRMED`；開啟 WhatsApp 不等於店舖已接單。

### DEC-G2-20260731-02｜付款證明保存方案 A

- Customer 上傳付款截圖。
- 私有 Google Drive 保存圖片本體，不設公開連結。
- Google Sheet 保存訂單、Drive File ID、聲稱付款資料、核對結果、核對人、Audit 及留存日期。
- SMT／SMM 沿用現有付款核對 UI 與狀態流程。
- 圖片最少保留 60 日。
- 爭議、退款、核數調查中的紀錄暫停自動刪除。
- 到期刪除圖片後，Sheet 保留必要 Audit 及 `deleted_at`。

## 8. 每次完成的固定輸出

任何工作 checkpoint 完成時，回覆及文件必須清楚列出：

- 完成咗乜；
- 未完成乜；
- 實際 commit／PR；
- 測試證據；
- 部署／實機狀態；
- 新踩坑；
- 成功做法；
- Google Drive／Jade 同步結果；
- G Gate 進度。
