# MoreFunOS｜Master Knowledge Authority

> Authority Level: A / HIGHEST AUTHORITY
> Status: CURRENT
> Updated: 2026-07-31 HKT
> Canonical Repo: `Pantonyeung/morefunos` → `main`
> Purpose: MoreFunOS 全系統唯一全域知識、治理、現況與接手文件

## 0. 唯一入口規則

本文件係 MoreFunOS 全系統唯一全域 Authority。任何 AI、Codex、工程師或新對話開始工作時，必須先讀本文件；不得再拼接多份 Master、Must Read、Registry、Classification、Guardrails 或 Knowledge Pack 自行推斷真相。

全域層只保留本文件一份 CURRENT 主文件。其他同級舊文件全部降級為 Redirect／Archive／Reference，不得直接產生施工指令。

GitHub 係正式工程 Authority；Google Drive 係長期鏡像；Jade Note 係搜尋及接手導航。三方衝突時，以本文件最新 GitHub 內容為準。

## 1. 四端正式定義

### Admin Control Plane
Repo：`Pantonyeung/morefunos-admin`

負責產品、分類、價格、選項、套餐、售罄、公告、營業時間、Draft、Published、Runtime、Release、Audit、Firebase Auth／Role／Rules／Publish／Recovery。

### Customer Experience
Repo：`Pantonyeung/morefun-ordering-web`

負責顧客瀏覽、會員、選餐、優惠及 Order API 提交。只讀 Published／Runtime Snapshot；不得自行成為價格、售罄、產品規則或 Order Authority。

### SMT Application
Repo：`Pantonyeung/morefunos-smt`

包含 SMT Register UI 與 SMT Mobile UI；兩者共用同一 Domain、State、Business Rule、Cart、Pricing、Checkout、Order、Payment、Sync、Permission、Audit、Recovery、API Contract。

### SMT Android Host／Hardware Plane
隸屬 `Pantonyeung/morefunos-smt` Android／Native 部分。

負責 Kiosk、WebView Host、Native Bridge、LAN／Sunmi／Label 打印、Offline Queue／SQLite／Recovery、Runtime OTA／APK OTA、安裝、版本、診斷及設備能力。SMT Mobile 只建立 Print Job／Command，不直接控制實體打印機。

### 舊 SMM
Repo：`Pantonyeung/morefunos-smm`

狀態：`SUPERSEDED AS INDEPENDENT CORE`。只可作歷史參考、遷移來源或受控抽取；不得再建立第二套 SMM 商業邏輯。

## 2. 唯一閉環

`Admin Draft → Admin Publish → Firebase Published／Runtime Snapshot → Customer／SMT Register／SMT Mobile → Cart／Checkout → Order API → 後端重新計價／Idempotency／唯一 Order ID → Order Authority → SMT Local Queue／Firebase → Print Job → SMT Android Host → Receipt／Kitchen／Label → printed／failed／retry → Audit／Report／Google Sheet Mirror`

## 3. Source of Truth

| 領域 | 唯一 Authority | 永久禁止 |
|---|---|---|
| 產品／價格／規則 | Admin Published | Customer／SMT 自行改價 |
| 售罄／等候時間 | Runtime Snapshot | 各端維護第二真相 |
| 顧客訂單提交 | Order API | 前端直接寫 Order Authority |
| 訂單正式狀態 | Order Authority＋SMT Local durable queue | Google Sheet 作即時真相 |
| 打印工作 | Print Job Contract | Customer／SMT Mobile 直接控打印機 |
| Android 硬件 | SMT Android Host | Web Runtime 假裝具 Native 能力 |
| 報表／帳簿 | Google Sheet Mirror／Audit | Sheet 派正式流水或重新計價 |
| UI／Adaptive | SMT 自適應系統 Authority | 1920→1280 整頁縮放／第二套 UI |

現役架構：Firebase Auth＋Firebase RTDB＋Cloudflare Worker＋Google Sheet V2 ledger mirror。Google Sheet／Apps Script 不再係 Runtime Authority。

## 4. 文件分級與舊資料降權

- A｜Master Authority：只有本文件。
- B｜Current Domain Authority：只對指定 repo／domain／branch／PR／head 有效。
- C｜Reference Only：背景、舊 UI、商業規則、migration、Contract、測試案例。
- D｜Engineering Knowledge：根因、踩坑、成功方法、回滾及驗證模式。
- E｜Historical／Audit：追溯、備份、版本比較。

以下全部預設 C 或 E：WORK01／WORK02／WORK03、Apps Script V1.2.x、舊 Staff Auth／Sync Runtime／gateway、舊 Google Sheet 主資料庫／即時 Order Truth、V42／SA2／EG、舊 Customer root-five-file 快照、舊 SMM independent core、仍引用上述架構的舊四端整合包／Final Lock／接手主題包。

固定標籤：`REFERENCE ONLY / NON-AUTHORITY / DO NOT IMPLEMENT DIRECTLY / MUST RECONCILE WITH CURRENT AUTHORITY`。

標題含 LOCK／FINAL／MUST READ／CURRENT 不會自動提升權威。

## 5. 全域開工規則

每次執行只需：

1. Fresh-read 本文件。
2. Fresh-read 對應 repo 最新 `AGENTS.md`。
3. Fresh-read該核心唯一 Current Domain Authority 文件。
4. Fresh-read active branch／PR／head evidence。

未完成以上四步，禁止修改、建立 CI、合拼或宣稱完成。

每次工作必須記錄：所屬 Gate、影響端口／repo、唯一 Authority、閉環影響、Evidence Level、改動／根因／驗證、未完成邊界、下一步、三方同步狀態。

## 6. Targeted Failure／Evidence

工作模式：`單一問題 → isolate → reproduce → root cause → minimal fix → targeted verification → minimum regression → integration branch → one final gate`

Evidence：`CODE_EXISTS → CONTRACT_PASS → BROWSER_PASS → DEVICE_PASS → STORE_PASS → PRODUCT_LOCKED`。

Source implemented ≠ tests executed ≠ deployment ≠ device acceptance。禁止跨級宣稱。

## 7. Current Development Registry｜2026-07-31

### Project OS｜G0.5
- Repo：`Pantonyeung/morefunos`／`main`
- 狀態：`MOREFUNOS G0.5 CLOSEOUT CERTIFIED`
- Active workflows：manual-only／read-only；禁止恢復 push／pull_request／cron／bot writeback。
- SMT Cloudflare production branch：`main`；Preview auto deploy 已停。
- 舊 SMM Cloudflare Git integration 已斷開。
- Firebase Hosting／Functions／Firestore／Storage／Extensions 未啟用。
- Scheduler／Pub/Sub：`DEFERRED BY OWNER — NOT A G1 START BLOCKER`。

### Admin｜G1
- Repo：`Pantonyeung/morefunos-admin`
- Branch：`feat/admin-p0-full-connect-v1`
- PR #1：Draft／Open／Mergeable
- Current observed head before consolidation：`4a3b75c13c25619a41fcdbea1a73a503434c846e`
- Single Domain Authority commit：`6959cfb8151fcfb252d2fc13570b5aab7f8a1b86`
- Append-only Engineering Log commit：`3599a7c1a27c6800ccb22f34fe96c906a0cca41d`
- 未完成：Worker secrets／latest deployment、protected Runtime command acceptance、跨端 staging acceptance、latest head test execution。

### Customer｜G2
- Repo：`Pantonyeung/morefun-ordering-web`
- Branch：`feat/g1-customer-runtime-consumer-v1`
- PR #22：Draft／Open／Mergeable
- Current observed head before consolidation：`0c32ae394e5b3b3db7885a4c032d4ed2532e56cf`
- Single Domain Authority commit：`db6f74c3f330a2842bb833ab8fcd3e9a8a700688`
- Append-only Engineering Log commit：`fafad097a6f53464db43d3255b63aad79dad3e10`
- 未完成：branch reconciliation、latest-head regression、preview deployment、Safari/PWA device acceptance、production promotion。

### SMT
- Repo：`Pantonyeung/morefunos-smt`
- Branch：`smt-main-candidate-v1`
- PR #34：Draft／Open／Mergeable
- Current observed head before consolidation：`879443a21de5bb34e798d1d4a3c773f14b3168f2`
- Single Domain Authority commit：`eb3adef7ae4faf4b6f4c60c9b5e36728368cf5c9`
- Append-only Engineering Log commit：`762ea147521ae3ccfbbe67377fc322f0c472d8ba`
- Hardware：`DEFERRED — HARDWARE UNAVAILABLE`。

## 8. Gate

- G1：Admin Firebase Publish 真閉環＋Staff Auth／Worker Runtime command staging。
- G2：Customer reconciliation＋Unified Consumer Adapter。
- G3：Order API／後端重新計價／Idempotency／原子派號／Customer→SMT Intake。
- G4：Print Closure。
- G5：Device／Store Acceptance。

## 9. 下一步唯一優先

`G1 Admin Firebase Publish Real Closure`：fresh-read Admin PR #1 最新 head，完成 RTDB V2 smoke test、Worker secrets／deployment、Owner Staff API、Staff login/session、protected Runtime command、Admin Staff UI，並取得 Draft／Runtime／Publish／Audit／Recovery 真實 staging evidence。

## 10. 永久禁止

- 用單一 PR／單一模組作 MoreFunOS 最高主題。
- 將 SMM 繼續發展成第二套系統。
- default branch 代表所有 domain。
- Customer／SMT 自行重新計價。
- Google Sheet 作即時 Order Truth。
- Staff／SMT／SMT Mobile 直接寫受保護 RTDB。
- Staff 建立 Firebase Authentication User。
- Firebase Hosting 與 Cloudflare 同時作同一前端自動部署 Authority。
- service account JSON／private key／password hash／salt／token 進 Repo、前端、Drive、Jade 或聊天。
- Adaptive 當 Scale；override／Observer／DOM scan 掩蓋 Authority 根因。
- Software／Contract／Browser PASS 當 Device／Store／Production PASS。
- 文件更新觸發 full CI；單一問題反覆跑完整 CI。
- 從 Reference／Historical 文件直接建立施工指令。
- 有 fail／flaky 仍合併。

## 11. 核心文件壓縮制度

每個核心只准一份 CURRENT 主文件：

- Global Project OS：`MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md`
- Admin：`CURRENT_DOMAIN_AUTHORITY.md`
- Customer：`CURRENT_DOMAIN_AUTHORITY.md`
- SMT Register＋Mobile＋Android Host：`CURRENT_DOMAIN_AUTHORITY.md`

`AGENTS.md` 只保留執行入口與指向，不重複 Architecture／Current Status。其他 Lock、Checklist、Handoff、Pitfall 文件全部改為附錄、Evidence 或 Archive，不得與 Current Domain Authority 並列。

新增資料必須更新原主文件，不得建立 `V2`、`FINAL`、`NEW`、`LATEST`、`REVISED` 等平行 Current 文件。

## 12. 單一累加工程日誌制度

每個現役核心只准另外保留一份 `ENGINEERING_LOG.md`，用作唯一累加式工作記錄。所有以下內容必須追加到該文件尾部，不得再建立獨立文件：

- 進度／Milestone／Checkpoint／Handoff
- 踩坑／根因／失敗方法／回滾方法
- 成功方法／可重用解法／驗證模式
- 測試結果／部署結果／Browser／Device／Store Evidence
- 未完成邊界／風險／下一步
- branch／PR／head／commit／artifact 對齊記錄

正式結構固定為：

```text
Global
└── MOREFUNOS_MASTER_KNOWLEDGE_AUTHORITY.md

Admin
├── CURRENT_DOMAIN_AUTHORITY.md
└── ENGINEERING_LOG.md

Customer
├── CURRENT_DOMAIN_AUTHORITY.md
└── ENGINEERING_LOG.md

SMT Register＋Mobile＋Android Host
├── CURRENT_DOMAIN_AUTHORITY.md
└── ENGINEERING_LOG.md
```

禁止新增 `MILESTONE_*`、`HANDOFF_*`、`PITFALL_*`、`SUCCESS_*`、`PROGRESS_*`、`LATEST_*`、`FINAL_*`、`VERIFICATION_SUMMARY_*` 或同類平行文件。需要保存機器產生的原始測試輸出時，只可放入 evidence/artifact 路徑，並由 `ENGINEERING_LOG.md` 引用；原始輸出不得成為 Authority。

日誌採 append-only：日常只在尾部追加。定期由 Owner 主導做 compaction，刪除重複、過時、被取代內容，但必須保留：已鎖定決定、根因、成功方法、Evidence Level、rollback point、未解風險及可追溯 commit。
