# MoreFunOS Design Center App V0.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立同一套 Desktop + Mobile Adaptive Design Center App，完成 P-Line UI 建立、編輯、保存、重開、Profile 預覽及候選 Artifact 輸出的第一個真實閉環。

**Architecture:** Web-first 單一 React/TypeScript App；DesignDocument 是唯一設計文件模型。Desktop/Mobile 只使用不同 Adaptive Shell，共用 Canvas、Component、Token、Module、Contract、Manifest、Persistence 及 Version Core。P-Line 只以 Runtime Profile/Manifest 注入能力，不複製 Business Logic。

**Tech Stack:** React + TypeScript + Vite（若現有 repo 沒有更高 Authority 的既定 stack）；Vitest；Testing Library；Playwright；CSS responsive primitives；browser storage 作 V0.1 design-document persistence abstraction，後續可替換 adapter。

## Global Constraints

- Active branch: `feat/design-center-app-fast-closure`。
- Design Center 不得建立第二 Store、State、Business Truth、Firebase Truth、Native Bridge、Print Authority、Hardware Authority。
- Desktop/Mobile 必須共用同一 Core 與 DesignDocument。
- 第一版唯一目標是 P-Line UI 生產閉環；AI/Image/Marketplace 不得阻塞。
- Preview PASS 不等於 Production Closure PASS；必須 Save/Open/Version/Export。
- 不 Build APK；Web-first。

---

## File Structure

- `apps/design-center/`：Design Center App 根目錄。
- `src/model/design-document.ts`：唯一 DesignDocument schema/type。
- `src/model/node.ts`：Visual/Layout node types。
- `src/model/module-contract.ts`：Module Registry/Contract/Manifest types。
- `src/core/document-store.ts`：DesignDocument 編輯命令；只屬設計文件，不含產品 Business Truth。
- `src/core/persistence.ts`：Save/Open adapter。
- `src/core/versioning.ts`：checkpoint/rollback。
- `src/core/boundary-validator.ts`：Architecture boundary validation。
- `src/shell/DesktopShell.tsx`：桌面操作殼。
- `src/shell/MobileShell.tsx`：手機操作殼。
- `src/editor/Canvas.tsx`：Canvas/selection/pan/zoom。
- `src/editor/LayerTree.tsx`：Layer 操作。
- `src/editor/Inspector.tsx`：Visual/Layout/Token/Component property 編輯。
- `src/editor/Toolbar.tsx`：新增元素及常用命令。
- `src/modules/registry.ts`：Capability Module registry。
- `src/modules/contracts.ts`：Module contract validation。
- `src/runtime/p-line-profile.ts`：P-Line runtime profile adapter。
- `src/runtime/manifest.ts`：Runtime manifest builder。
- `src/preview/PreviewSurface.tsx`：Desktop/Mobile/P-Line preview。
- `src/export/export-candidate.ts`：候選 UI artifact exporter。
- `src/tests/`：unit/integration tests。
- `e2e/`：Desktop/Mobile production-closure E2E。

---

### Task 1: App Skeleton + DesignDocument

**Produces:** 可啟動 App、單一 DesignDocument type、seed P-Line document、schema tests。

- [ ] 建立 `apps/design-center` React + TypeScript + Vite app，保留 repo 既有 package manager/monorepo convention。
- [ ] 先寫 DesignDocument schema/unit tests：要求 id/name/schemaVersion/targetProfile/nodes/components/tokens/modules/contracts/runtimeManifest/assets/versions/updatedAt。
- [ ] 實作 `design-document.ts`、`node.ts`、`module-contract.ts` 最小 types。
- [ ] 建立 `createSeedPLineDocument()`，targetProfile 固定 `p-line`，但不得包含 P-Line business truth。
- [ ] 執行 unit tests、typecheck、build；全部 PASS 後 commit `feat(design-center): bootstrap document core`。

### Task 2: Adaptive Desktop/Mobile Shell

**Consumes:** DesignDocument。
**Produces:** `DesktopShell`, `MobileShell`, responsive shell selector。

- [ ] 先寫 viewport tests：Desktop 顯示左 Layer/中 Canvas/右 Inspector；Mobile 顯示 Canvas + bottom toolbar + drawer triggers。
- [ ] 實作共用 App chrome，禁止兩套 editor core。
- [ ] Desktop breakpoint 使用現有 design token；若無既定值，V0.1 採 `<768px` Mobile、`>=768px` Desktop。
- [ ] 驗證 1280×800 與 390×844 viewport 無水平 overflow、主要操作可見。
- [ ] tests/typecheck/build PASS 後 commit `feat(design-center): add adaptive desktop mobile shell`。

### Task 3: Canvas + Selection + Layer Tree

**Produces:** node render、select、pan/zoom、layer reorder/visibility/lock。

- [ ] 先寫 selection、visibility、lock、reorder reducer tests。
- [ ] Canvas 使用 DesignDocument.nodes render；selection/zoom/panel open 狀態只能屬 editor-local state。
- [ ] LayerTree 與 Canvas 使用 node id 同步選取，禁止 DOM selector 作 identity。
- [ ] 實作 pan/zoom 最小可用操作；Desktop mouse/trackpad，Mobile touch/pinch 或 +/- controls。
- [ ] integration tests PASS 後 commit `feat(design-center): add canvas and layer editing`。

### Task 4: Visual Elements + Inspector + Layout

**Produces:** Text/Shape/Image/Icon，位置/尺寸/文字/顏色，Flex/Grid/Gap/Padding/Alignment。

- [ ] 先寫 node creation/update/layout tests。
- [ ] Toolbar 可新增四種 node。
- [ ] Inspector 可改 text/image source/color/width/height/alignment/gap/padding/layout mode。
- [ ] Mobile Inspector 使用 drawer/sheet，但呼叫同一 update command。
- [ ] 建立至少一個 1280×800 P-Line frame 作驗收 seed。
- [ ] tests PASS 後 commit `feat(design-center): add visual and layout editing`。

### Task 5: Tokens + Components

**Produces:** token registry、component definition/instance/property override。

- [ ] 先寫 token resolve、component instance、override tests。
- [ ] 實作 color/typography/spacing/radius/effect token 最小 schema。
- [ ] node style 可引用 token id，不複製散落 magic values。
- [ ] Component definition 與 instance 分離；instance 只保存 reference + overrides。
- [ ] tests PASS 後 commit `feat(design-center): add tokens and components`。

### Task 6: Save/Open + Version/Rollback

**Produces:** PersistenceAdapter、local V0.1 adapter、checkpoint/rollback。

- [ ] 先寫 save→new session open→same document integration test。
- [ ] 定義 `PersistenceAdapter.save(document)` / `load(id)` / `list()`；V0.1 browser storage 只係 adapter，唔寫入 P-Line runtime truth。
- [ ] 每個 checkpoint 保存 document snapshot + version id + timestamp + label。
- [ ] rollback 必須建立新 checkpoint 保留 rollback 前狀態，避免 destructive history loss。
- [ ] tests PASS 後 commit `feat(design-center): add persistence and rollback`。

### Task 7: Module Registry + Contract + Slot

**Produces:** module registration、slot composition、contract validator。

- [ ] 先寫缺少 moduleId/version/mission/slots/capabilities/acceptance 必須 FAIL 的 tests。
- [ ] Contract 必須支援 inputs/outputs/events/commands/states/capabilities/version。
- [ ] Slot composition 只允許 registry 已註冊 module id；module 不得私下互相 import runtime state。
- [ ] UI 顯示 module list、mission、slot、contract summary。
- [ ] tests PASS 後 commit `feat(design-center): add module registry contracts`。

### Task 8: Runtime Manifest + P-Line Profile

**Produces:** P-Line profile、manifest builder、compatibility validation。

- [ ] 先寫 P-Line manifest tests，欄位必須含 productLineId/runtimeVersion/modules/permissions/workflow/adapters/theme/compatibility。
- [ ] `p-line-profile.ts` 只提供 profile/config/capability mapping，不可包含 price/order/payment/print business calculation。
- [ ] manifest module version 不兼容時 Preview 必須顯示 explicit compatibility failure。
- [ ] tests PASS 後 commit `feat(design-center): add p-line runtime profile`。

### Task 9: Preview + Candidate Export

**Produces:** Desktop/Mobile/P-Line preview、candidate artifact exporter。

- [ ] 先寫 preview profile switching test。
- [ ] PreviewSurface render 同一 DesignDocument，profile 只改 adaptive/runtime presentation。
- [ ] exporter 輸出 `design-document.json`、`runtime-manifest.json`、`module-contracts.json` 及 renderable UI source bundle/representation；不得輸出 P-Line Business Truth。
- [ ] export 前必須執行 boundary + compatibility validation，FAIL 時禁止標記 candidate PASS。
- [ ] tests PASS 後 commit `feat(design-center): add preview and candidate export`。

### Task 10: Boundary Validator

**Produces:** 可機器檢查嘅越界 Gate。

- [ ] 建立 fixtures：direct Firebase import、Worker operational write、NativeBridge printer call、second business store；全部必須 FAIL。
- [ ] validator 規則掃描 Design Center source boundary/forbidden imports 與 manifest authority declarations。
- [ ] 合法 editor-local selection/zoom state 必須 PASS，避免誤殺。
- [ ] 加入 package test script `test:boundary`。
- [ ] PASS 後 commit `test(design-center): enforce architecture boundary`。

### Task 11: Desktop + Mobile E2E Production Closure

**Produces:** 真正 V0.1 closure evidence。

- [ ] Desktop 1280×800 E2E：open seed → add text → edit token → reorder layer → save → reload → verify → P-Line preview → checkpoint → export。
- [ ] Mobile 390×844 E2E：open same doc → select layer → edit text/color/size → save → reload → verify → preview → candidate version。
- [ ] Cross-device logical test：兩端載入同一 persisted document schema/version，不存在 mobile-specific document fork。
- [ ] 驗證 no horizontal overflow、touch target、drawer、selected state、save feedback。
- [ ] 全部 PASS 後 commit `test(design-center): close desktop mobile production flow`。

### Task 12: First P-Line UI Candidate + Handoff

**Produces:** 第一個由 Design Center 建立嘅 P-Line UI Candidate 及接手文件。

- [ ] 用 Design Center seed/template 建立一個真實 P-Line UI frame，不直接手寫第二條 P-Line UI 路徑。
- [ ] 保存、reload、Desktop/Mobile 修改、P-Line preview、export 全部再跑一次。
- [ ] 記錄 candidate artifact version、document id、manifest version、module versions、test evidence。
- [ ] 更新 GitHub CURRENT handoff、Google Drive CURRENT handoff、Jade Note CURRENT milestone。
- [ ] 最終 Gate：DC0-DC6 狀態逐項標記 PASS/FAIL；任何 FAIL 不得稱 V0.1 完成。

---

## Self-review

- Scope 只包含 P-Line UI 生產閉環，未加入 AI/Image/Marketplace。
- Desktop/Mobile 共用 Core，沒有第二套 Document/Store。
- 每個 Gate 都有可測試輸出。
- Preview 與 Production Closure 已分離。
- Hardware/Business Truth 明確留在 Runtime/Host Authority。
