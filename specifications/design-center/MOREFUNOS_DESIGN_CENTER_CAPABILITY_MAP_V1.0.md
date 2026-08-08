# MoreFunOS Design Center Capability Map V1.0

日期：2026-08-08（香港時間）
狀態：STRATEGIC CAPABILITY BASELINE
用途：將外國／中國成熟 UI 設計工具、圖片設計工具能力，收斂成 MoreFunOS Design Center 可開發能力地圖。

## 0. Authority 邊界

本文件只定義 Design Center 能力與優先級，不改寫 MoreFunOS Domain Authority。

固定關係：
- Design Center = 模組化 UI 軀幹／UI Authority
- Capability Module = 有唯一使命、無產品線商業靈魂嘅器官
- B 線／其他產品線 = Runtime 靈魂
- Android Host／Hardware = Native／Hardware Authority

永久禁止：
- 第二套 Store／State／Business Truth／Firebase Truth
- UI 直接控制 Hardware
- UI 自行重算正式價格、付款結果、打印結果
- DOM scan／selector bridge／polling／reload hack

## 1. 競品能力來源分類

### UI／產品設計工具
Figma、Sketch、Penpot、Framer、MasterGo、Pixso、即時設計、Uizard、Visily、Lunacy。

共同能力：Canvas、Frame、Layer、Auto Layout、Responsive、Component、Variant、Design Token、Prototype、Preview、Version、Developer Handoff、Plugin/API、AI。

### 圖片／營銷設計工具
Canva、Adobe Express、稿定設計、創客貼、圖怪獸。

共同能力：Template、Drag & Drop、Text、Photo、Asset、Brand Kit、Resize、AI Generate、AI Edit、Export、Cloud／Team。

## 2. 能力優先級定義

- P0：Design Center 第一版不可缺少，否則無法形成可組裝軀幹
- P1：形成成熟設計生產力與 B 線正式注入能力
- P2：提升 AI、自動化、品牌及內容生產效率
- P3：未來競爭力；現階段禁止阻礙主線
- NO：明確不做／不可進入 Design Center Authority

## 3. P0｜核心軀幹（15 Modules）

### DC-P0-01 Canvas Shell
使命：畫布、縮放、平移、選取、Frame／Section 容器。

### DC-P0-02 Layer Tree
使命：圖層樹、排序、群組、鎖定、顯示／隱藏。

### DC-P0-03 Layout Engine
使命：Auto Layout、Flex／Grid、Alignment、Gap、Padding、Constraint。

### DC-P0-04 Responsive Profile
使命：1280×800、Desktop、Tablet、Mobile 等 Adaptive Profile。

### DC-P0-05 Basic Visual Elements
使命：Text、Shape、Image、Icon、Mask 等基礎 Render 元素。

### DC-P0-06 Component System
使命：Component、Instance、Property、可重用 UI 元件。

### DC-P0-07 Variant & UI State
使命：Variant、Default／Hover／Pressed／Disabled／Selected 等純 UI State。

### DC-P0-08 Design Token System
使命：Color、Typography、Spacing、Radius、Effect、Variable／Token。

### DC-P0-09 Asset Library
使命：Icon、Image、Illustration、Brand Asset 統一引用。

### DC-P0-10 Module Registry
使命：註冊 moduleId、version、mission、slots、capabilities、acceptance。

### DC-P0-11 Slot & Composition System
使命：標準 Slot、模組排序、頁面組裝；禁止模組直接互相私連。

### DC-P0-12 Module Contract Editor
使命：定義 inputs、outputs/events、commands、states、capabilities、version。

### DC-P0-13 Runtime Manifest Builder
使命：建立 productLineId、runtimeVersion、modules、permissions、workflow、adapters、theme、compatibility 配置。

### DC-P0-14 Preview & Mock Runtime
使命：以 Mock Contract／Runtime Profile 獨立預覽模組與整體 Shell。

### DC-P0-15 Version / Rollback
使命：設計版本、模組版本、Known-good、Rollback Point。

## 4. P1｜正式產品化能力（10 Modules）

### DC-P1-01 Prototype Flow
Click、Overlay、Navigation、Transition、Flow Preview。

### DC-P1-02 Developer Inspect
尺寸、Spacing、Token、Asset、Component／Module Metadata 檢視。

### DC-P1-03 Design-to-Code Export
輸出前端可使用嘅結構／Style／Token；不得輸出第二套 Business Logic。

### DC-P1-04 Permission Preview
以不同 Role／Scope 預覽同一 UI 軀幹。

### DC-P1-05 Workflow Preview
由 Runtime Workflow 注入流程；Design Center 只顯示流程結果。

### DC-P1-06 Contract Compatibility Check
檢查 Shell／Module／Contract／Host 最低版本及不兼容狀態。

### DC-P1-07 Architecture Boundary Check
偵測 UI 越界、第二 Store／State、直接 Firebase／Worker／Host 連接等違規。

### DC-P1-08 Module Isolation Test
使用 Mock Runtime 獨立 Browser Test；不依賴整個產品線先可運作。

### DC-P1-09 Device Profile Preview
模擬 Android WebView、Tablet、Mobile、不同尺寸與能力缺失。

### DC-P1-10 Design QA
Contrast、Spacing、Overflow、Touch Target、Responsive、State Coverage、Token Drift。

## 5. P2｜圖片／品牌／AI 生產力（9 Modules）

### DC-P2-01 Template Center
UI Template、Poster、Banner、Menu、Social、Campaign 等 Template Registry。

### DC-P2-02 Brand Kit
Logo、Color、Font、Image、Icon、Brand Rule。

### DC-P2-03 Brand Validation
檢查 Off-brand Color／Font／Logo／Copy；不涉 Business Truth。

### DC-P2-04 Multi-size Resize
一份設計轉 Desktop／Tablet／Mobile／Social Size。

### DC-P2-05 AI UI Generation
Prompt／Screenshot／Wireframe → UI 初稿；必須經 Module／Contract QA 後先註冊。

### DC-P2-06 AI Layout Adaptation
自動重排 Layout／Responsive；不可修改 Domain Contract。

### DC-P2-07 AI Image Generate
文字／參考圖產生品牌視覺素材。

### DC-P2-08 AI Image Edit
Remove BG、Remove／Replace Object、Expand、Retouch、Upscale。

### DC-P2-09 AI Design QA
自動檢查視覺一致性、Component 誤用、Token Drift、Responsive 風險。

## 6. P3｜未來競爭力（4 Modules）

### DC-P3-01 Collaborative Review
多人 Comment、Review、Approval；唔阻礙 V1 主線。

### DC-P3-02 Marketplace / Community
共享 Template／Component／Module；正式 Module 必須經 Registry Gate。

### DC-P3-03 Advanced Motion
Timeline、Keyframe、Micro-interaction、Motion Token。

### DC-P3-04 Cross-Line Auto Composer
根據 Runtime Profile 自動推薦／組裝 Capability Modules；只生成 Manifest 建議，不可繞過 Runtime Authority。

## 7. 明確 NO｜現階段不做

1. 微前端／任意遠端 Runtime Module Federation。
2. Design Center 直接寫 Firebase Operational Runtime。
3. Design Center 直接執行 Printer／Cash Drawer／Native Bridge。
4. UI Module 自行保存價格、訂單、付款、打印 Truth。
5. 每條產品線複製一套同名模組。
6. 用 DOM Selector／文字內容／畫面位置控制業務或硬件。
7. 為追求 Figma／Canva 功能數量而建立無使命功能。
8. P2／P3 阻塞 P0／P1 主線。

## 8. 由約 120 項競品功能收斂後嘅結論

原始能力池：約 120 項。
正式 Capability Map：38 Modules。
- P0：15
- P1：10
- P2：9
- P3：4

核心原則：唔用功能數量競爭；用「Module Contract + Runtime Manifest + B-Line Soul Injection + QA Boundary」形成 MoreFunOS 自己嘅差異。

## 9. 第一開發序列

禁止同時開 38 個 Module。

推薦唯一順序：
1. Canvas Shell
2. Layer Tree
3. Layout Engine
4. Basic Visual Elements
5. Component System
6. Design Token System
7. Module Registry
8. Slot & Composition
9. Module Contract Editor
10. Runtime Manifest Builder
11. Preview & Mock Runtime
12. Responsive Profile
13. Variant & UI State
14. Asset Library
15. Version / Rollback

P0 完成後先進 P1。

## 10. Gate

### Gate DC0｜Authority Lock
確認 Design Center 不擁有任何 Business Truth／Hardware Authority。

### Gate DC1｜Editor Core
Canvas、Layer、Layout、Visual、Component、Token 可獨立運作。

### Gate DC2｜Modular Body
Registry、Slot、Contract 完成；Module 可獨立註冊與替換。

### Gate DC3｜Soul Injection
Runtime Manifest 可注入 B 線 Profile；只換 Profile 可改組裝，不改 Module 內核。

### Gate DC4｜QA / Compatibility
Contract、Boundary、Responsive、Mock Runtime、Rollback PASS。

只有 DC0 → DC4 完成後，先可宣稱 Design Center 第一版核心成立。
