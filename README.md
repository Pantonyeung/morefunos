# More Fun OS｜磨飯手機點餐系統

本 repository 用作管理「磨飯 More Fun」手機點餐網站、營運規則、UI 規格、Google Sheet 後台規格，以及交付給 Codex 的開發指令。

## Project Goal

建立一個適合夫妻店使用的手機點餐網站：

- 手機優先 Mobile First
- 到店自取
- WhatsApp 接單
- Google Sheet 作為低成本後台資料源
- 不依賴大型付費系統
- 優先完成可用版本，再逐步優化

## Core Direction

磨飯不是單純紫米店、健康餐店或便當店。

磨飯的核心是：

> 陪伴大家長大，讓每一個來過的人，都感覺自己被記得。

網站設計需要符合：

- 輕日系
- 現代簡約
- 乾淨清晰
- 手機操作快
- 客人容易完成下單
- 店主容易維護

## Current Scope

第一階段只做必要功能：

1. 首頁
2. 點單頁
3. 商品詳情
4. 購物車／記憶罐
5. 結帳頁
6. WhatsApp 訂單摘要
7. Google Sheet 商品資料同步
8. 簡易後台控制

## Repository Structure

```text
morefunos/
├── README.md
├── PROJECT_BRIEF.md
├── CODEX_INSTRUCTIONS.md
├── docs/
│   ├── README.md
│   ├── ui/
│   ├── google-sheet/
│   ├── business-rules/
│   └── codex/
└── .gitignore
```

## Working Rule

所有重要規則先寫入文件，再交給 Codex 實作。

不要直接憑記憶修改程式碼。

每次修改前先確認：

1. 修改目標
2. 涉及文件
3. 預期效果
4. 驗收標準

## Status

Status：Foundation Created

Next Step：補齊產品資料、UI 規格、Google Sheet 欄位規格與 Codex 任務清單。
## Runnable App Source

This repository now contains the runnable MoreFun mobile ordering web app source at the repo root.

### Local Run

```bash
npm install
npm run dev
```

Default local URL:

```text
http://127.0.0.1:4173/
```

Admin route:

```text
http://127.0.0.1:4173/admin/login
```

### Checks and Build

```bash
npm run check
npm run build
npm run acceptance:front
npm run acceptance:p0
npm run acceptance:admin
```

`npm run build` creates `dist_staging/`, which is build output and must not be committed.

### Data Policy

Google Sheet Backend is the source of truth for business data. GitHub hardcoded/static data is fallback or compatibility data only. If frontend fallback data differs from Backend API data, report the diff instead of guessing.

The new Backend API has not been connected yet. Current passed public APIs are:

- `navigation.get`
- `ui.theme.get`
- `store.hours.get`
