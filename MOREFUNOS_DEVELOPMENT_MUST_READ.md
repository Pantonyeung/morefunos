# MoreFunOS｜每次開發必讀

> 狀態：CURRENT／全系統唯一導航入口
> 更新：2026-08-12 HKT
> 本文件只做 Authority Routing；不得建立第二套 Greenfield Authority。

## 1｜目前唯一現役工程主線
MoreFunOS P-Line 已物理分離成獨立 Greenfield 系統：

- Repo：`Pantonyeung/Greenfield-P-Line-Repo`
- Default：`main`
- Active Draft PR：#1 `feat: Part 5 order fulfillment coordination`
- Active Branch：`feat/part5-order-fulfillment-coordination`
- Fresh Head：`fa64ededc08252587101f0bdca52806ed83f1c4a`

Greenfield Active Authority 只包括：Owner 最新 Decision、Greenfield 開發4件套、Greenfield Current Source／Contract／Tests／Compatibility，以及當前 Gate 所需 Greenfield Workflow。

## 2｜Greenfield 開工必讀4件套
每次工程開始前 Fresh Read；工程完成／失敗／修正／Gate／Owner Decision／Pitfall 收口後即時更新：

1. `docs/handoffs/CURRENT_HANDOFF.md`
2. `docs/development/CURRENT_DEVELOPMENT_LOG.md`
3. `docs/authority/PITFALL_MOTHER.md`
4. `docs/decisions/OWNER_DECISION_REGISTRY.md`

再按當前任務讀 Current Source／Tests／Workflow／Compatibility Evidence。

## 3｜Legacy 邊界
以下一律降級為 `OPTIONAL HISTORICAL REFERENCE`，唔係 Greenfield Mandatory Fresh Read、唔係 Gate dependency、唔可阻塞 Greenfield：

- `Pantonyeung/morefunos-platform-b`
- 舊 O5／B15／舊 P-Line
- 舊 MoreFunOS CURRENT／Authority／Handoff／Decision／Workflow
- A-Line legacy Admin／SMT／SMM／Customer implementation

只有當前工作明確需要抽取成熟能力、查舊 Pitfall、比較 Candidate implementation 時，先按需讀指定 Legacy Source／Doc。禁止 documentation archaeology。

`Pantonyeung/morefunos` 保留作全系統導航／歷史治理索引；唔反向成為 Greenfield Business／Runtime Authority。

## 4｜證據層級
`SOURCE_EXISTS → CONTRACT_PASS → FULL_REGRESSION_PASS → DEPLOYED → BROWSER_PASS → DEVICE_PASS → HARDWARE_PASS → STORE_PASS → PRODUCTION_ACCEPTED`

禁止跨級；Software／CI／Workflow／Deploy PASS 不得寫成 Device／Hardware／Operational／Production PASS。

## 5｜Current Evidence
- Part 1–4：Greenfield Gate #1 Software Regression／Typecheck／Compatibility PASS。
- Part 5：Owner-approved；Source／Test／Cargo／Driver Handoff／SDK Compatibility 已收口，現為 `PRE-GATE CANDIDATE`。
- Part 5 最新 Final target test/typecheck：未有 fresh final evidence。
- `Part 1–5 Final Compatibility Gate`：截至 2026-08-12 Fresh Read，未有 `workflow_dispatch` run evidence。
- Durable Runtime Persistence／Device／Hardware／Operational／Production：全部 `NOT PERFORMED`。

## 6｜唯一下一 Gate
手動執行：

`🧪 MoreFunOS Greenfield P-Line｜Part 1-5 Final Compatibility Gate`

Branch 必須：`feat/part5-order-fulfillment-coordination`

原則只跑一次。FAIL：先讀實際 log＋`PITFALL_MOTHER`，定位第一個 Root Cause，修正後先准 rerun；禁止 blind rerun。

PASS 只可升級 Part 1–5 Software Regression／Typecheck／Compatibility／target dependency evidence；Device／Hardware／Operational／Production 仍不可升級。

## 7｜永久方法／Guard
`Authority-first → Owner Review → Contract → SDK-first（唔係 SDK-forced）→ low-cost local/static TDD → isolate first fatal → minimal fix → targeted verification → affected regression → compatibility → one final Gate`

近期必讀 Guard：
- Workflow Source Exists ≠ Workflow on main ≠ Run workflow Available ≠ Run Exists ≠ Run PASS。
- CI 禁止做逐 commit 試錯器。
- Source／Type／Test／Cargo 必須四向盤點。
- Split Settlement／Money／Receipt 必須共用同一 financial integrity rule；payer cross-subsidy／未清 credit 禁止冒充 settled。
- Generic Print Intent 唔係 Receipt Authority；Receipt 只走 Settlement Receipt Contract。
- Pickup Identifier 只係識別資料，唔係新 Pickup Workflow。
- UI／External SDK／Driver／Protocol 不得創造 Business Truth。

## 8｜三方定位
- GitHub＝正式工程 Authority／Evidence。
- Google Drive＝結構化長期鏡像／Archive。
- Jade Note＝AI 接手導航／快速檢索。

Drive／Jade 只可鏡像 GitHub Current；不得反向覆蓋 Current Source／Owner Decision／Evidence。
