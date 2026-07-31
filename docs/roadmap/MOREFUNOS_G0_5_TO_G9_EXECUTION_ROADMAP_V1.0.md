# MoreFunOS G0.5 → G9 執行 Roadmap V1.0

狀態：`CURRENT / OWNER-APPROVED STRUCTURE`
建立時間：2026-07-31 13:54 HKT

## 1. G Gate 定義

G 編號係跨端工程 Gate，不係對話章節，亦唔係單純百分比。每一 Gate 必須有明確退出條件；未通過退出條件，不得宣稱完成或落地。

## 2. Roadmap

| Gate | 名稱 | 核心範圍 | 退出條件 | 目前狀態 |
|---|---|---|---|---|
| G0.5 | Authority Consolidation | 清理舊分支、舊文件、第二 Authority、Apps Script／V42EG／舊 SMM 定位 | Current Authority、回滾點、歷史分類及接手規則清楚 | `CLOSED / 文件治理完成` |
| G1 | Public Runtime＋Menu／Availability Foundation | Admin Publish、Firebase Public Runtime、Customer 正確菜單映射、SMT／SMM 售罄、Customer latest-valid offline menu | Full regression、最新部署、SMT→SMM→Customer 傳播、Safari／Android offline acceptance | `91% / Source implemented，Production 未完成` |
| G2 | Cross-port Business Authority Design Lock | 菜單分發權限、Staff scope、售罄、營業／取餐時間、離線 WhatsApp、付款證明／60日保存 | Owner 決策、權限矩陣、狀態機、資料契約、保安／留存方案全部文件化 | `DECISION LOCKED / Implementation pending` |
| G3 | Admin Distribution＋Staff Permission Runtime | Admin 指定 SMT／SMM／Customer 菜單、產品 assignment、permission scope、runtime lock、audit | Worker API、Firebase schema、Admin UI、SMT／SMM assigned catalog 全部通過 | `NOT STARTED` |
| G4 | Customer Ordering＋Offline WhatsApp Continuity | 線上正式訂單、斷線 latest-valid menu、離線購物車、WhatsApp `OFFLINE_UNCONFIRMED`、恢復網絡避免雙重下單 | 在線／離線／重連／重送／售罄衝突／價格版本 Gate 全通過 | `PARTIAL FOUNDATION ONLY` |
| G5 | Payment Proof＋Human Reconciliation | Customer 上傳、私有 Drive、Sheet ledger、SMT／SMM 核對、核實／問題／保留、60日 retention | Upload、授權預覽、核對 Audit、Customer 狀態同步、retention job、爭議 hold 全通過 | `SMT LOCAL UI EXISTS / Backend pending` |
| G6 | Store／Pickup Operations Runtime | Admin／SMT／SMM 共用營業狀態、等候時間、最早／最遲取餐、臨時 override、版本衝突 | 三端寫入同一 Authority，Customer 即時讀取，衝突／過期／離線 Gate 通過 | `DESIGN LOCKED / Implementation pending` |
| G7 | Order Intake＋Print＋Device Closed Loop | Customer／WhatsApp／現場／平台統一 Intake、核款才接單、打印 jobs、APK、LAN／Sunmi／label | Order idempotency、付款 Gate、五機打印、離線 queue、實體結果回寫 | `PARTIAL SMT MODULES / Integration pending` |
| G8 | Full-system Staging／Security／Recovery Acceptance | Admin＋SMT＋SMM＋Customer 全鏈路、權限、資料最小化、備份、災難恢復、性能 | Full regression、Browser Matrix、Android/iPhone、token revoke、backup restore、security review | `NOT STARTED` |
| G9 | Production Launch＋Operational Acceptance | 真實店舖部署、監控、員工流程、營運數據、事故回滾、最終簽收 | 連續真實營運、打印／訂單／付款／售罄／日結無阻塞，Owner 驗收 | `NOT STARTED` |

## 3. G1 真實狀態

G1 已有：

- Admin Public Runtime／Customer same-origin consumer；
- Customer 顯示契約及 server-side public projection；
- SMT／SMM Shared Availability source implementation；
- Customer latest-valid／previous-valid offline menu source implementation；
- targeted contract evidence。

G1 尚未完成：

- 最新 branch head full regression；
- Admin／SMT／Customer staging 同步部署；
- 真實 SMT 寫售罄 → SMM 讀取 → Customer 禁止下單；
- SMM 恢復供應 → SMT／Customer 同步；
- 香港時間 05:00 staging acceptance；
- iPhone Safari／PWA offline cold start；
- Android／SMT device acceptance；
- Production acceptance。

因此 G1 只可標 `91%`，不可標落地完成。

## 4. G2 真實狀態

已確認及鎖定：

- Admin 擁有權威菜單並控制分發；
- Admin 指定 SMT／SMM 可用菜單及 Customer 可見菜單；
- SMT／SMM 只可控制被授權產品的售罄／停售／恢復；
- Admin／SMT／SMM 均可控制營業、等候及取餐 Runtime，但必須經同一 Worker Authority；
- Customer 只讀，售罄／paused 商品不得加入、修改、結帳或提交；
- Customer 斷線時使用最新有效本機菜單，可建立離線 WhatsApp 訂單；
- 公司 WhatsApp：`85261123071`；
- Customer 可上傳付款證明；
- SMT／SMM 沿用已鎖定核款 UI；核款才接單；
- 付款圖片存私有 Google Drive；Google Sheet 保存 ledger；最少 60 日。

尚未落地：

- G2 所需 Worker API、Firebase schema、Admin UI、Customer upload、Drive／Sheet adapter、SMM shared queue、retention job、實機流程。

結論：G2 係 `設計／決策已確定`，但唔係 `程式／Production 已落地`。

## 5. Gate 升級規則

- 文件完成只升到 `DECISION LOCKED`。
- 程式提交只升到 `SOURCE IMPLEMENTED`。
- Targeted tests 唔等於 Full Regression。
- Preview 可用唔等於 Production。
- 單端可用唔等於跨端閉環。
- 必須有 Owner 實機／營運驗收先可關閉 G8／G9。

## 6. 下一個唯一優先順序

1. 收口 G1 deployment／device acceptance，避免 foundation 未穩就擴散。
2. G2 依序落實：G3 Permission／Distribution → G4 Offline Order → G5 Payment Proof → G6 Store/Pickup Runtime。
3. 之後先進 G7 打印／裝置閉環、G8 全系統 staging、G9 Production。
