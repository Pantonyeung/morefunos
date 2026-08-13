# MoreFunOS｜每次開發必讀

> 狀態：CURRENT／全系統唯一導航入口
> 更新：2026-08-13 HKT
> 本文件只做 Authority Routing；不得建立第二套 Greenfield Authority。

## 1｜唯一現役工程主線
- Repo：`Pantonyeung/Greenfield-P-Line-Repo`
- Default：`main`
- Active Branch：`feat/part6-local-operational-sovereignty`
- Fresh Head：`986c4c85312a2bd4f6ca8f609d949e24174c2de4`
- Active engineering PR：無；PR #4–#8 為 temporary TDD/evidence branches，唔係 Current Authority。

Greenfield Active Authority＝Owner 最新 Decision＋Greenfield 開發4件套＋Current Source／Contract／Tests／Evidence。`Pantonyeung/morefunos` 只保留全系統導航／歷史治理索引。

## 2｜Greenfield 開工必讀4件套
1. `docs/authority/PITFALL_MOTHER.md`
2. `docs/handoffs/CURRENT_HANDOFF.md`
3. `docs/development/CURRENT_DEVELOPMENT_LOG.md`
4. `docs/decisions/OWNER_DECISION_REGISTRY.md`

再讀當前 Gate 對應 Owner Decision、Source、Tests、Workflow、Compatibility Evidence。

## 3｜最新 LOCKED／CURRENT
- Full-Day Software Closure：PASS，tested SHA `d070c04791dbe6bda6b19c8a247722cbf98a89f8`。
- MPC1 Native Host／Boot／OTA controls：只到 host/unit／emulator evidence；Physical Device 未 PASS。
- SMT Runtime M1 Presentation Extraction：PASS。
- SMT Runtime M2 Greenfield Binding：PASS；Final Run `31609653387`／Job `94157424969`。
- `operationalReady=false` 必須保留；M1/M2 PASS ≠ Operational Ready。
- 最新 Owner Decision：`MATURE_PLATFORM_ASSEMBLY_FIRST_OWNER_DECISION_2026-08-12.md`。
- 原 Custom M3 persistence-RPC 方向降級為研究證據，唔係 production direction。

## 4｜M3 新方向：成熟平台 Assembly-first
固定組裝方向：
`Greenfield Business Soul + SMT UI(Vite)` → `Capacitor Android shell` → `mature persistence / updater plugins` → `exact vendor hardware plugins` → `Gradle/GitHub Actions` → APK。

Current candidate：
- Android container：Capacitor。
- Local persistence：`@capacitor-community/sqlite`；只保存 opaque/versioned Greenfield checkpoint，禁止建立第二套 Menu/Order/Pricing Truth。
- OTA：`@capgo/capacitor-updater`／Capgo lifecycle；active store operation期間禁止強制套用新 bundle。
- Dedicated POS：Android Enterprise／DevicePolicyManager／custom-home pattern。
- Hardware：SUNMI／Xprinter／USB／LAN／cash drawer先 exact vendor SDK／protocol，再由 Capacitor plugin 薄包裝。

Custom infrastructure 只有成熟方案不存在、exact device不兼容、license/security/cost不可接受、或違反 MoreFun Authority 時先可最小自研，並記錄 reject 理由。

## 5｜證據層級
`SOURCE_EXISTS → CONTRACT_PASS → FULL_REGRESSION_PASS → DEPLOYED → BROWSER_PASS → DEVICE_PASS → HARDWARE_PASS → STORE_PASS → PRODUCTION_ACCEPTED`

禁止跨級；Software／CI／Workflow／Emulator／Build PASS 不得寫成 Device／Hardware／Operational／Production PASS。

## 6｜唯一下一 Gate
**M3 Mature Container/Persistence Integration**：證明 Capacitor＋成熟 SQLite plugin 可以承載現有 M1/M2 Runtime，並 persist/restore 既有 Greenfield serialized checkpoint，而不建立第二套 Business Truth。

Gate順序：M3 Mature Container/Persistence → mature OTA updater → M4 Offline Runtime Simulation → Owner APK Build → structural/hash/runtime-authority verification → exact Physical Device → Hardware/Printer → Store/Production。

## 7｜永久 Guard
- Authority-first／Pitfall-first／External-first／minimal fix／same-gate rerun。
- Workflow Source Exists ≠ Run Exists ≠ Run PASS。
- Source／Type／Test／Cargo 必須四向盤點。
- UI／External SDK／Plugin／Driver／Protocol 不得創造 Business Truth。
- Cloud／Internet不得成 boot／restore／pricing／order／print／recovery critical path。
- APK大小、Emulator PASS、Host unit PASS一律唔等於 Device PASS。
- 禁止復活 legacy SMM 第二 Core、第二 Store／State／Native Bridge／OTA／Print Authority。

## 8｜Legacy／三方定位
Legacy `morefunos-platform-b`、舊 O5／B15、A-Line Admin／SMT／SMM／Customer 只係 OPTIONAL HISTORICAL REFERENCE／BODY donor／pitfall evidence，禁止反向覆蓋 Greenfield Current。

- GitHub＝正式工程 Authority／Evidence。
- Google Drive＝結構化長期鏡像／Archive。
- Jade Note＝AI 接手導航／快速檢索。
