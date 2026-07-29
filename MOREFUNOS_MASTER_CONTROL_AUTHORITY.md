# More FunOS｜四端閉環總控權威文件 V1.0

> 狀態：CURRENT / HIGHEST AUTHORITY / MUST READ FIRST
> 更新：2026-07-29 19:51 HKT
> 正式總控 Repo：`Pantonyeung/morefunos`
> 適用範圍：Admin／Customer／SMT Register／SMT Mobile／Android Host／打印／Firebase／Order API／Audit／Report

## 0. 最高身份

本文件係 More FunOS 全系統唯一最高接手入口、總控文件及跨端閉環 Authority。

任何單一 repo、PR、branch、module、CI、QA、對話或端口文件，都只可以係本文件下面嘅子記錄或鏡像，不得取代本文件。

以下主題一律降級為子模組記錄：

- PR #30
- Runtime／長時間離線／Journal／Service Worker／Browser Gate
- 單一 SMT／SMM／Admin／Customer 工作包
- APK Foundation／D／E 線個別里程碑

## 1. 四端正式定義

### A. Admin Control Plane

Repo：`Pantonyeung/morefunos-admin`

負責產品、分類、價格、選項、套餐、售罄、公告、營業時間、Draft、Published、Runtime、Release、Audit、Firebase Auth／Role／Rules／Publish／Recovery。

### B. Customer Experience

Repo：`Pantonyeung/morefun-ordering-web`

負責顧客瀏覽、會員、選餐、優惠及 Order API 提交。只讀 Published／Runtime Snapshot；不得自行成為價格、售罄、產品規則或 Order Authority。

### C. SMT Application

Repo：`Pantonyeung/morefunos-smt`

包含兩個 UI Profile：

1. SMT Register UI：收銀機／大屏／高峰操作
2. SMT Mobile UI：原 SMM，手機／遙距操作

兩者共用同一 Domain、State、Business Rule、Cart、Pricing、Checkout、Order、Payment、Sync、Permission、Audit、Recovery、API Contract。

### D. SMT Android Host／Hardware Plane

隸屬 `Pantonyeung/morefunos-smt` Android／Native 部分。

負責 Kiosk、WebView Host、Native Bridge、LAN／Sunmi／Label 打印、Offline Queue／SQLite／Recovery、Runtime OTA／APK OTA、安裝、版本、診斷及設備能力。

SMT Mobile 只建立 Print Job／Command，不直接連實體打印機；Android Host 執行並回傳 printed／failed／retry。

## 2. 舊 SMM Repo 狀態

Repo：`Pantonyeung/morefunos-smm`

狀態：`SUPERSEDED AS INDEPENDENT CORE`。

只可作歷史參考、遷移來源或受控抽取；不得再建立第二套 SMM 商業邏輯。

## 3. 唯一閉環

```text
Admin Draft
→ Admin Publish
→ Firebase Published／Runtime Snapshot
→ Customer／SMT Register／SMT Mobile
→ Cart／Checkout
→ Order API
→ 後端重新計價／Idempotency／唯一 Order ID
→ Order Authority
→ SMT Local Queue／Firebase
→ Print Job
→ SMT Android Host
→ Receipt／Kitchen／Label
→ printed／failed／retry
→ Audit／Report／Google Sheet Mirror
```

## 4. Source of Truth Map

| 領域 | 唯一 Authority | 禁止 |
|---|---|---|
| 產品／價格／規則 | Admin Published | Customer／SMT 自行改價 |
| 售罄／等候時間 | Runtime Snapshot | 各端永久維護第二真相 |
| 顧客訂單提交 | Order API | 前端直接寫 Order Authority |
| 訂單正式狀態 | Order Authority＋SMT Local durable queue | Google Sheet 作即時真相 |
| 打印工作 | Print Job Contract | Customer／SMT Mobile 直接控打印機 |
| Android 硬件 | SMT Android Host | Web Runtime 假裝具 Native 能力 |
| 報表／帳簿 | Google Sheet Mirror／Audit | Sheet 分配正式流水或重新計價 |
| UI／Adaptive | SMT 自適應系統 Authority | 1920→1280 整頁縮放／第二套 UI |

## 5. 當前真實狀態｜2026-07-29

### 已完成

- G0 Authority 收口第一階段完成：中央 repo、四端 repo map、鏡像入口、SMM superseded redirect、三方 Authority 已建立。
- SMT 自適應系統 V1.0：Full Browser Matrix 78／78 PASS、0 failure、0 flaky。
- Runtime／離線軟件整合：Targeted 3／3 PASS；Full Browser Matrix 81／81 PASS；0 failure；0 flaky。
- Journal、Snapshot、Queue、Recovery、Service Worker、Storage Health、Runtime UI Hook。
- APK Foundation／D／E 線已有獨立軟件及 CI 成果。

### 未完成

- Admin Firebase Auth／Rules／真實 Publish 閉環。
- 統一 Published／Runtime Consumer Adapter。
- 正式 Order API／後端重新計價／原子派號。
- Customer 下單後 SMT 即時 Intake。
- Print Closure 真實紙張、中文、切紙、標籤驗收。
- Android／打印／斷網／斷電／多日營運實機驗收。
- Store Acceptance／Production Ready。

## 6. 正式推進 Gate

### G0｜Authority 收口

狀態：`PHASE 1 COMPLETE`。

- 四端角色及 repo map 已鎖定。
- Source of Truth Map 已鎖定。
- SMM 已合併為 SMT Mobile UI。
- PR #30／長時間離線記錄已降級為 G2／G3 支援子模組。
- 中央 Authority、四 repo 鏡像、Google Drive、Jade Note 已建立。

### G1｜Admin Publish 閉環

狀態：`NEXT ACTIVE GATE`。

- Firebase Auth。
- Owner Account／Role Claims。
- Security Rules。
- Draft Write／Runtime Write／Publish／Audit／Recovery。
- 首次 Published Seed。

### G2｜統一 Consumer Adapter

- Customer／SMT Register／SMT Mobile 共用 Published／Runtime Snapshot Contract。
- 產品、價格、選項、售罄、公告、營業時間同步。
- Offline last-known-good。

### G3｜Order Commit 閉環

- 後端重新計價。
- Idempotency。
- 唯一 Order ID／派號。
- Offline Queue／Retry／Conflict Recovery。
- Customer → SMT 即時 Intake。

### G4｜Print Closure

- Print Job Contract。
- SMT Mobile 只發命令。
- Android Host 靜默打印。
- ESC/POS／TSPL 中文、切紙、Label。
- printed／failed／retry／fallback 回傳。

### G5｜Store Acceptance

- Admin 改價四端同步。
- 售罄即時同步。
- 雙擊／重試不重複單。
- 斷網可開單，恢復後同步。
- Crash／Reload／斷電可恢復。
- 多機同時開單。
- 高峰壓力、跨日、日結、報表、Audit。

## 7. 總控工作規則

每次執行必須先記錄：

1. 所屬 Gate。
2. 影響端口／repo。
3. 唯一 Authority。
4. 閉環影響。
5. 證據層級：Code／Contract／Browser／Device／Store。
6. 改動、根因、踩坑、成功方法、Commit／Run／Artifact。
7. 未完成邊界及下一步。
8. 三方記錄同步狀態。

未完成記錄，禁止進入下一個可驗證階段。

## 8. 三方最高記錄

### GitHub

本文件：`Pantonyeung/morefunos/main/MOREFUNOS_MASTER_CONTROL_AUTHORITY.md`

GitHub 係正式工程 Authority。

### Google Drive

鏡像：`More FunOS｜四端閉環總控權威文件 V1.0`

File ID：`1eDlawSeHWnjbmlP9H2nVm8GajTsxRsW1fVwtMA025-A`

### Jade Note

Pinned Note：`More FunOS｜四端閉環總控權威文件 V1.0`

Note ID：`80777da0-ab92-414b-95b7-6863950d489b`

三方衝突時，以本文件最新內容為準。

## 9. Repo 鏡像狀態

- Central Authority：`Pantonyeung/morefunos`，commit `e549a8cc3a5ee7e9af5881f19230a0b87d06f72f`
- SMT mirror：commit `6b9db8f9ce28c999ffd76937fc6c565c0eaf5490`
- Admin mirror：commit `ebcca40b8f9d59475438f2dd6959308aa73a9689`
- Customer mirror：commit `b7461199b0779e9ad6d8b0c3fcdbfa141337f56f`
- SMM superseded redirect：commit `ef2068ff8d87bed92201eefa638c6bc5e8863505`

## 10. G0 踩坑／成功方法

### 踩坑

- 初版最高文件先落咗 SMT repo；之後辨識到真正中央 repo `Pantonyeung/morefunos`，若唔修正會形成第二個最高 Authority。
- GitHub installed repository streaming search無結果；改用 organization repository search先完整辨識 central／Admin／Customer／SMT／SMM repos。
- 舊 Jade Note 同 PR #30 Note 曾同時置頂，會令下一個 AI 誤認多個最高入口；已取消置頂並標記 superseded／submodule。

### 成功方法

`先鎖中央 repo → 建 Master Authority → 建四端 repo mirror／redirect → 更新 Drive／Jade → 降級舊主題 → 回寫中央 checkpoint`

## 11. 永久禁止

- 用單一 PR／單一模組作 More FunOS 最高主題。
- 將 SMM 繼續發展成第二套系統。
- 未有 Firebase／Order API 就聲稱四端閉環。
- 未有實機證據就聲稱 Production Ready。
- Google Sheet 作即時 Order Truth。
- 各端自行重新計價。
- Customer／SMT Mobile 直接控制打印機。
- 有 fail／flaky 仍合併。
- 文件存在但三方記錄未同步。

## 12. 下一步唯一優先

正式進入 G1：Admin Firebase Publish 真閉環。

先審核 `Pantonyeung/morefunos-admin` → `feat/admin-p0-full-connect-v1` 現況，建立 G1 execution record，逐項驗證 Firebase Auth、Rules、Draft／Runtime／Publish／Audit／Recovery，未有真實讀寫證據不得標完成。
