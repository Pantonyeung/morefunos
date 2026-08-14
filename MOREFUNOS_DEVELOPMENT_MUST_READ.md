# MoreFunOS｜每次開發必讀

> 狀態：CURRENT／全系統唯一導航入口
> 更新：2026-08-14 HKT
> 本文件只做 Authority Routing；正式 VNext 工程真相只存在於下述兩個 Current Repo。

## 1｜唯一現役 Repository Set
1. `Pantonyeung/morefunos-vnext`
   - 唯一 Source／Runtime／Business／Development Authority。
2. `Pantonyeung/-morefunos-vnext-builder`
   - Owner-manual build／execution relay only；永遠唔係 Business Truth／Runtime／Store／Native Bridge／Print／OTA Authority。

**沒有第三個 Current Repo。**
Greenfield、Platform-B、舊 P-Line、舊 SMT/SMM/Admin/Customer、Drive、Jade 全部只係 REFERENCE ONLY／HISTORICAL DONOR；不可覆蓋 VNext Current。

## 2｜現役 Branch／PR／Head
- Source Repo：`Pantonyeung/morefunos-vnext`
- Active Branch：`feat/smt-operational-vertical-slice-gate-b`
- Draft PR：#11 `Gate B-C: External-first SMT Business Soul + durable local operation`
- Fresh Head：`64714a96c487ecbba280ea2773bb5c7fa976252f`
- Base `main`：`4d654e6a77dff6fb75f9d8b8c71387f41796563c`
- Builder `main`：`0bba4051b8c2f56135bdc01af99be9b8bca60448`

## 3｜VNext 開工必讀
1. `AGENTS.md`
2. `docs/handoffs/CURRENT_HANDOFF.md`
3. `docs/handoffs/CURRENT_DEVELOPMENT_LOG.md`
4. `docs/handoffs/CURRENT_OWNER_DECISIONS.md`
5. `docs/handoffs/CURRENT_EXECUTION_PLAN.md`
6. relevant `docs/authority/CURRENT_MANDATORY_*`
7. UI work 額外讀：
   - `CURRENT_MANDATORY_UI_AUTONOMY_AND_HANDOFF_POLICY.md`
   - `CURRENT_MANDATORY_VNEXT_SMT_OPERATIONAL_SOUL_AND_UI_CONTRACT.md`
   - `CURRENT_MANDATORY_VNEXT_SOVEREIGNTY_AND_REFERENCE_POLICY.md`

## 4｜最新 LOCKED／CURRENT
- VNext Sovereignty V1.1：只有 Source Repo＋Builder Repo Current。
- External-first：Official OS/Framework SDK → Vendor SDK/Protocol → mature maintained OSS → thin VNext adapter → custom last。
- UI owns presentation／layout／navigation／interaction／composition；Business Soul owns business meaning。
- 不可建立第二套 Store／State／Business Truth／Native Bridge／Print／OTA Authority。
- Private `morefunos-vnext` Actions 禁止；Builder 只可 Owner manual `workflow_dispatch`＋exact source SHA。
- 一隻 APK／Source line：RK3568 primary＋SUNMI T2s backup；minSdk28；禁止 T2s fork／Printer APK。

## 5｜Evidence Truth
Evidence ladder：`SOURCE → TEST/CONTRACT → BUILD → INSTALL → DEVICE → HARDWARE → OPERATIONAL → PRODUCTION`。

已證：
- Manual Builder mechanism：PASS。
- MPC1 stable signing／update-over-install：PASS。
- RK3568 Device Stability（accepted WebView provider profile）：PASS。
- RK3568 receipt／kitchen／label／cash-drawer Hardware Acceptance：PASS。

未證：
- PR #11 新 Business vertical slice 本批次 Test／Typecheck／Gradle：未形成正式 PASS。
- Operational：NOT PASS。
- Production：NOT PASS。

歷史 Hardware／Device PASS 只證已接受 MPC1 baseline；不可自動提升 PR #11 新 Business／Persistence／UI source。

## 6｜PR #11 Current Source State
已存在：
- Gate B typed Menu／Pricing／Order／Printing Business Soul。
- Room 2.8.4 `MoreFunStorage` checkpoint＋outbox infrastructure-only boundary。
- Durable Order／PrintJob repository。
- persist-before-dispatch authoritative printer wrapper。
- runtime composition＋restart restore source。
- Gate B/C fail-closed source verifiers／behavior tests source。

仍未完成／不可冒充 PASS：
- production SMT workspace mount 仍未完全收口；UI只可經 typed `UiPort`／Business Soul seam。
- MoreFunPrinter production thin native adapter 未完成。
- Payment／Refund formal mutation implementation 未完成。
- full-day Operational／Production chain 未完成。

## 7｜唯一下一優先事項
**先完成 PR #11 當前 Source/Test closure：typed SMT workspace seam＋正式 production mount，保持 UI 不直接 import Room／TCP／USB／SUNMI；再做 targeted Test／Typecheck／Web／Gradle verification。**

未完成 targeted verification 前：
- 禁止 Build APK；
- 禁止用 Public Builder 做 debugger；
- 禁止宣稱 Operational／Production PASS。

## 8｜永久 Guard
- Authority-first／Fresh-read／first fatal evidence／minimal fix／same-gate rerun。
- Source exists ≠ Test PASS ≠ Build PASS ≠ Device／Hardware／Operational／Production PASS。
- Historical donor只可 minimum transplant；adopt 後由 VNext contract/test/source 擁有。
- Drive＝長期鏡像；Jade＝AI導航；兩者都唔可反向覆蓋 GitHub VNext Authority。
