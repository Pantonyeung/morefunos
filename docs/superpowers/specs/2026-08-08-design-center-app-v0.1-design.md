# MoreFunOS Design Center App V0.1 Product Design

狀態：APPROVED FOR FAST-CLOSURE EXECUTION
日期：2026-08-08（香港時間）
分支：feat/design-center-app-fast-closure

## 1. 產品目標

最快落地一個真正可運行的 MoreFunOS Design Center App，第一個生產任務是為 P-Line 建立、修改、預覽及輸出所需 UI。

Design Center 是 UI 軀幹／UI Authority；P-Line 保留 Runtime 靈魂。Design Center 不建立第二套 Store、State、Business Truth、Firebase Truth、Native Bridge、Print Authority 或 Hardware Authority。

## 2. 單一產品、雙操作端

禁止建立 Desktop App 與 Mobile App 兩套平行產品。

採用同一 Web App + Adaptive Shell：
- Desktop Shell：左側 Layer/Module，中間 Canvas，右側 Inspector/Contract，上方 Toolbar。
- Mobile Shell：Canvas 為主，底部 Toolbar，Layer/Module/Inspector 以 Drawer/Sheet 開啟。
- Desktop 與 Mobile 共用同一 Canvas Core、Document Model、Component System、Token System、Module Registry、Contract、Runtime Manifest、Persistence、Version。

## 3. V0.1 唯一成功標準

在 Design Center 內完成以下真實閉環：

建立 P-Line UI → 編輯 → 儲存 → 關閉/重新開啟 → Desktop/Mobile 修改 → P-Line Runtime Profile 預覽 → 輸出候選 UI Artifact。

只完成畫面或 Preview 不算 PASS。

## 4. V0.1 功能範圍

### P0 Editor Core
1. Canvas Shell：選取、Pan、Zoom、Frame。
2. Layer Tree：排序、群組、鎖定、顯示/隱藏。
3. Basic Visual Elements：Text、Shape、Image、Icon。
4. Layout Engine：Auto Layout、Flex/Grid、Alignment、Gap、Padding、Constraint。
5. Component System：Component、Instance、Property。
6. Design Token System：Color、Typography、Spacing、Radius、Effect。
7. Responsive Profile：至少 Desktop、Mobile、P-Line target profile。

### P0 Modular Body
8. Module Registry：moduleId、version、mission、slots、capabilities、acceptance。
9. Slot & Composition：標準 Slot 與 Module 組裝。
10. Module Contract：inputs、outputs/events、commands、states、capabilities、version。
11. Runtime Manifest：productLineId、runtimeVersion、modules、permissions、workflow、adapters、theme、compatibility。
12. P-Line Runtime Profile：只注入配置、能力與工作流，不複製 P-Line Business Logic。

### P0 Production Closure
13. Save/Open：持久化 Design Document。
14. Version/Rollback：Known-good checkpoint。
15. Preview：Desktop、Mobile、P-Line Profile。
16. Export：輸出候選 UI Artifact + Manifest/Contract metadata。
17. Boundary Validation：阻止第二 Store/State、UI 直連 Firebase/Worker/Host/Hardware。

## 5. Mobile 操作範圍

Mobile 必須可以：
- 開啟 Design Document
- 選擇 Module/Layer
- 修改文字、圖片、顏色、尺寸及基本 Layout
- 移動/排序
- Component property 修改
- Preview Desktop/Mobile/P-Line Profile
- Save
- 建立候選版本

Mobile 不要求第一版完成複雜 Vector path 編輯、超大型 multi-select 精細操作或高階 Motion timeline；不得因這些能力阻塞 P-Line 生產閉環。

## 6. 資料模型

單一 DesignDocument：
- id
- name
- schemaVersion
- targetProfile
- nodes
- components
- tokens
- modules
- contracts
- runtimeManifest
- assets
- versions
- updatedAt

UI 編輯器本身可有 editor-local state（selection、zoom、open panels），但不得成為 P-Line Business Truth。

## 7. 技術方向

第一版採 Web-first Responsive App，避免同時維護原生 Desktop/Mobile 兩套程式。現有 repo 若無既定前端框架約束，採 React + TypeScript + Vite。Document Model 與 UI Shell 分離；Desktop/Mobile 只換 Shell，不換資料模型或核心引擎。

## 8. Gate

DC0 Authority Lock：邊界測試存在並可阻止越權。
DC1 Editor Core：Canvas/Layer/Visual/Layout/Component/Token 可運行。
DC2 Modular Body：Registry/Slot/Contract 可註冊、替換、獨立預覽。
DC3 P-Line Soul Injection：P-Line Profile 可注入，不修改 Module 內核。
DC4 Dual Operation：Desktop + Mobile 對同一 Document 編輯與保存。
DC5 Production Closure：Save/Open/Version/Preview/Export 全鏈 PASS。
DC6 First P-Line UI：由 Design Center 真正產出第一個 P-Line UI Candidate。

## 9. 明確不做

- 不做第二套 Desktop/Mobile Core。
- 不做第二套 Business Store/State/Firebase Truth。
- 不做 Design Center 直接 Printer/Cash Drawer/Native Bridge。
- 不以 DOM selector、文字或位置作業務控制。
- 不先做完整 Figma/Canva 功能集。
- P2 AI/Image/Marketplace 不得阻塞 V0.1。

## 10. 開發優先順序

App Skeleton → Document Model → Adaptive Shell → Canvas/Selection → Layer Tree → Visual Nodes → Layout → Tokens → Components → Persistence → Module Registry → Contract → Runtime Manifest/P-Line Profile → Preview → Version/Rollback → Export → Boundary QA → Desktop/Mobile E2E → First P-Line UI Candidate。
