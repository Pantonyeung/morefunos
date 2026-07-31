# More FunOS｜每次開發必讀／必須遵守

> 狀態：CURRENT / MUST READ BEFORE ANY DEVELOPMENT
> 更新：2026-07-31 HKT
> 正式 Authority：`Pantonyeung/morefunos` → `main`
> GitHub＝正式工程 Authority；Google Drive＝長期鏡像；Jade Note＝AI 接手導航。

## 1. 真相優先序

安全／資料完整／不可逆風險 → Master Authority → 本文件＋Current Registry＋Low Cost CI → repo `AGENTS.md`／PRIMARY STANDARD → Ownership／Decision／Current Lock／Change Impact → active branch／PR／head evidence → 最新產品明確決定 → Drive／Jade。

## 2. 每次開工必讀

1. `MOREFUNOS_MASTER_CONTROL_AUTHORITY.md`
2. `MOREFUNOS_DEVELOPMENT_MUST_READ.md`
3. `MOREFUNOS_CURRENT_DEVELOPMENT_REGISTRY.md`
4. `MOREFUNOS_LOW_COST_CI_DEVELOPMENT_PROTOCOL_V1.0.md`
5. `MOREFUNOS_ENGINEERING_PITFALLS_AND_PROVEN_SOLUTIONS.md`
6. 對應 repo 最新 `AGENTS.md`、Lock、Change Impact、Handoff、active PR／head evidence

未讀完，禁止修改、建立新 CI、合拼或宣稱完成。

## 3. Current Authority

### Project OS／G0.5
- `Pantonyeung/morefunos/main`
- G0.5 Branch／Workflow／Runtime Cost Consolidation：`CLOSEOUT CERTIFIED`
- Active workflows：manual-only／read-only；禁止恢復 push、pull_request、cron、bot writeback。
- Cloudflare／GitHub Actions／Firebase 必須分開審核；manual Actions 不會自動停止 Cloudflare Git Integration。
- SMT Cloudflare production branch＝`main`；非生產 Preview 已停用。
- 舊 SMM Cloudflare Git integration 已斷開；repo／歷史保留。
- Firebase Hosting／Functions／Firestore／Storage／Extensions 未啟用。
- Google Cloud Scheduler／Pub/Sub：`DEFERRED BY OWNER — NOT A G1 START BLOCKER`。

### Admin｜G1
- Repo：`Pantonyeung/morefunos-admin`
- Branch：`feat/admin-p0-full-connect-v1`
- PR #1：Draft／Open／Mergeable
- 最新 fresh-read head：`0b04d65e3666a87297434a63e6de0696b5b96c24`
- Evidence：大量 Source／Contract 已建立；Live staging／deployment／cross-system acceptance 仍未完成。
- Staff Auth LOCK：全系統角色只保留 `owner`／`staff`；Owner 用 Firebase Auth；Staff 不建立 Firebase User，由 Admin Owner 管理私有 Staff Account，經 Cloudflare Worker 登入及取得短期 Session；Staff／SMT Mobile 不直接寫受保護 RTDB。
- Staff 密碼只保存 salt＋versioned hash；停用／重設密碼／登出所有裝置以 `sessionVersion` 撤銷舊 Session。
- Staff Auth Master Checklist 係 repo 正式進度清單；Source implemented 不等於 Tested／Deployed／Accepted。

### Customer｜G2
- Repo：`Pantonyeung/morefun-ordering-web`
- PR #21／head `031e7a60b95e0413678b7da3439dca0abcad5c24`
- PR 較舊且 main 有後續 uploads；未 reconciliation 前兩邊都唔係最終 Authority，禁止直接 merge。

### SMT
- Baseline：`smt-functional-completeness-v1`；PR #30 已合併，Runtime／Offline Browser 81／81 PASS，只代表 Software／Browser。
- Main Candidate：`smt-main-candidate-v1`／PR #34 Draft／Open／Mergeable
- 最新 PR head：`28feab6b744684642f24fae8c91b0738bcc5d0fb`
- Software Gate verified head：`9bad3a9c40d21a30b114824820ba3de8214a7b05`
- 保留待 Domain Diff：PR #17 Printer、#20 Required Flow、#23 Recovery、#24 Incoming Queue。
- `DEFERRED — HARDWARE UNAVAILABLE`：SUNMI 實體打印、Package Installer／APK OTA 實機、Production signing／release E2E。
- 舊 `morefunos-smm`：`SUPERSEDED AS INDEPENDENT CORE`；只作 SMT mobile supporting／migration surface。

### WORK03
舊 Login／Push／Pull／Heartbeat／Fallback：`SUPERSEDED / DO NOT CONTINUE`。現役架構：Firebase Auth＋Firebase RTDB＋Cloudflare Worker＋Google Sheet V2 ledger。

## 4. 永久禁止

- default branch 代表所有 domain；第二套 SMM／Cart／Pricing／Order／Sync／Print truth。
- Customer／SMT 自行重新計價；Google Sheet 作即時 Order Truth。
- Staff／SMT／SMT Mobile 直接寫受保護 RTDB；Staff 建立 Firebase Authentication User。
- Firebase Hosting 與 Cloudflare 同時作同一前端自動部署 Authority。
- service account JSON／private key／password hash／salt／token 進入 Repo、前端、Drive、Jade 或聊天。
- Adaptive 當 Scale；override／Observer／DOM scan 掩蓋 Authority 根因。
- Software／Contract／Browser PASS 當 Device／Store／Production PASS。
- 文件更新觸發 full CI；單一問題反覆跑完整 CI。

## 5. Targeted Failure／Evidence

`單一問題 → isolate → reproduce → root cause → minimal fix → targeted verification → minimum regression → integration branch → one final gate`

Evidence：`CODE_EXISTS → CONTRACT_PASS → BROWSER_PASS → DEVICE_PASS → STORE_PASS → PRODUCT_LOCKED`。禁止跨級宣稱。

## 6. 目前主要 Gate

- G1：Admin Firebase Publish 真閉環＋Staff Auth／Worker Runtime command staging 驗證。
- G2：Customer reconciliation＋Unified Consumer Adapter。
- G3：Order API／重計價／Idempotency／原子派號／Customer→SMT Intake。
- G4：Print Closure。
- G5：Device／Store Acceptance。

## 7. Gap／下一步唯一優先

**G1 Admin Firebase Publish Real Closure**：fresh-read Admin PR #1 最新 head，先完成 RTDB V2 smoke test、Worker secrets／deployment、Owner Staff API、Staff login/session、protected Runtime command、Admin Staff UI，再取得 Draft／Runtime／Publish／Audit／Recovery 真實 staging evidence。
