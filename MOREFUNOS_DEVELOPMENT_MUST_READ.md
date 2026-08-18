# MoreFunOS｜每次開發必讀

> 狀態：ROUTING ONLY／歷史中央導航，不是工程 Authority
> 更新：2026-08-18 HKT
> 正式 Current Authority：`Pantonyeung/morefunos-v1`

## 1｜唯一現役 Repository Set
1. `Pantonyeung/morefunos-v1`
   - 唯一 Product／Source／Business／Development Authority。
   - Authority branch：`main`。
   - Fresh observed main head：`d21684cb676f9298cd64348cbdb3aae5079b3e33`。
2. `Pantonyeung/morefunos-v1-builder`
   - verification／build／release relay only；永遠不是 Business／Runtime／Store／Native Bridge／Print Authority。

VNext／Greenfield／Platform-B／舊 P-Line／舊 SMT/SMM/Admin/Customer = SEALED DONOR／HISTORICAL，只可按 V1 Migration Ledger 精準抽取。Jade Note 依 D-011 = UNINSTALLED／FORBIDDEN，禁止讀、寫、引用、重連或作 mirror。

## 2｜V1 開工唯一閱讀順序
1. `AGENTS.md`
2. `docs/current/CURRENT_HANDOFF.md`
3. `docs/current/CURRENT_DEVELOPMENT_LOG.md`
4. `docs/current/CURRENT_OWNER_DECISIONS.md`
5. `docs/current/CURRENT_EXECUTION_PLAN.md`
6. relevant `docs/authority/*`

只有 V1 Four-Pack／Authority 可定義 Current；本檔只負責路由。

## 3｜Fresh Current Checkpoint
- A Carrier installed baseline：`0.1.11-g6-carrier`／versionCode `21`；Runtime delivery = long-lived Carrier + signed `.mfos`。
- Exact Product source packaged：`d094591d03c103bdc655ae8a9cf42679493c5f87`。
- Runtime `runtime-candidate-d094591d03c1`：Package P0／Private Release／Online OTA P1+P2 = PASS，狀態 `ONLINE-AVAILABLE`。
- Device lifecycle：PENDING；Hardware／Operational／Production：PENDING。
- B SMT donor Work Unit：PR #157 已 guarded merge，merge `93adcbc208bb0e38c07b291ed817a524973706e8`；B exact verification + ABC Integration PASS；PR #158 docs closure merge `d21684cb676f9298cd64348cbdb3aae5079b3e33`。
- M-028 donor extraction：LANDED／EXHAUSTED／SEALED；不可再當 standing donor access。
- C1-C4：維持 CLOSED／Assist-On-Demand；本輪 B SMT donor 冇改 C Business semantics。

## 4｜Evidence Truth
`SOURCE → TEST → TYPECHECK → BUILD → INSTALL → DEVICE → HARDWARE → OPERATIONAL → PRODUCTION`

目前只可聲稱：Product software/source gates PASS；d094 Runtime Package/Private Release/Online OTA server-side PASS；B SMT Source/Web + ABC software integration PASS。**Device／Hardware／Operational／Production 未 PASS。**

## 5｜唯一下一步
Owner real-device lifecycle／ergonomic acceptance：
1. 先記錄 known-good Current `runtime-candidate-f456e932d3f4`；
2. Check only：只偵測 d094 metadata，禁止自動 download/stage/activate/restart；
3. Owner explicit Download/Stage；
4. Owner explicit Activate；
5. 驗 Candidate → Stable/Current；
6. recents reopen ×2、cold reboot、WAN-off relaunch、Recovery return、rollback to f456、rollback persistence；
7. 同一實機驗 P01 Cart 25/28/32、左右手、donor-derived SMT 可讀性及 OTA 控制入口。

任何失敗先停喺第一個 fatal evidence；未完成 Device lifecycle 前，禁止升級成 Runtime Device PASS。

## 6｜永久 Guard
- Authority-first／Fresh-read／first fatal evidence／minimal fix／same-gate exact verification。
- 不可建立第二套 Business Truth／Store／State／Native Bridge／Print／OTA／Order／Pricing／Reporting Authority。
- UI 不可 author final price／sellability／order/payment/fulfillment/print-routing truth。
- CI／APK／OTA = evidence/release gate，不係 debugger。
- D-049：code mutation 前必須 Context7。
- D-088：普通 UI／Business Runtime 更新禁止因此重 Build APK；用 signed Runtime `.mfos`。
- D-089：營運 endpoint/config 先評估 replaceable config，唔好因可替換設定而 rebuild Carrier。
- 每次 END 必須 Self-Invention Audit。
- Drive = mirror/archive only；不可反向覆蓋 GitHub V1。

## 7｜Pitfall／Proven Solution 索引
中央舊 Pitfall Mother 維持 `HISTORICAL／SUPERSEDED／REDIRECT ONLY`。現役工程失敗與解法以 V1 `docs/qa/*`、`docs/authority/*`、Runtime lifecycle regression guard 為準；禁止另造平行 Authority。
