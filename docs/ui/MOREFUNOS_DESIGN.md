# MoreFunOS｜磨飯 UI Design Authority V1.0

狀態：DRAFT FOR REVIEW  
適用：Customer／Admin／SMT Register／SMT Mobile（SMM）／Android Host 顯示層  
設計基礎：VoltAgent `awesome-design-md` 文件結構方法 × MoreFunOS 現役品牌、營運、裝置與工程邊界  
禁止：直接複製任何第三方品牌、專有字體、顏色或版面；禁止用本文件覆蓋商業邏輯、資料 Authority、Runtime Contract 或 Engineering Constitution。

---

## 0. 文件角色

本文件定義 MoreFunOS 應該「點睇、點感受、點操作」。

本文件負責：

- 品牌視覺語言
- 顏色角色
- 字體層級
- 間距、圓角、陰影
- 按鈕、卡片、輸入、導航、彈層、狀態元件
- 動效、觸控、無障礙
- Customer／Admin／SMT／SMM 裝置 Profile
- AI／Codex 生成 UI 時嘅設計約束

本文件不負責：

- 商品價格、套餐規則、售罄邏輯
- Firebase／Worker／Order／Payment／Print Authority
- 權限、Revision、Idempotency、Audit
- 端口資料模型、API Contract
- 用 UI Guard 掩蓋 Domain 問題

優先次序：Global Master Authority → Current Status → Port Authority → Engineering Constitution → 本文件 → 實際元件實作。

---

## 1. Visual Theme & Atmosphere｜視覺主題與氣氛

### 1.1 核心感受

MoreFunOS 唔係冷冰冰企業軟件，亦唔係可愛到影響效率嘅卡通 App。

設計要同時具備：

1. **被記得**：客人感到熟悉、溫暖、有陪伴感。
2. **乾淨可靠**：資料、價格、狀態一眼睇清。
3. **高峰可操作**：店員忙亂時仍可快速點選、修正、確認。
4. **輕日系**：留白、自然暖色、柔和曲線，但唔過度裝飾。
5. **紫米識別**：紫色係品牌記憶，不係全畫面高飽和背景。
6. **食物為主角**：Customer 端以產品、口味、組合價值做主角；後台以狀態與操作做主角。

### 1.2 品牌形容詞

溫暖、清爽、可靠、親切、俐落、熟悉、有記憶感、適合香港小店。

### 1.3 禁止氣氛

- 禁止科技霓虹、賭場式高刺激漸層。
- 禁止全黑 Cyberpunk 作主視覺。
- 禁止純醫療／健身品牌感，磨飯唔只係健康餐。
- 禁止過度日系小清新，導致價格、按鈕、售罄狀態唔清楚。
- 禁止大量玻璃擬態影響對比。
- 禁止每個頁面使用唔同風格。

---

## 2. Brand Principles｜品牌設計原則

### P1｜讓每一個來過的人，都感覺自己被記得

設計應優先使用熟悉稱呼、回訪記憶、清楚歷史與偏好，而唔係抽象科技文案。

### P2｜溫暖不能犧牲效率

Customer 可以有情感層次；SMT／SMM 高峰操作必須先效率、後裝飾。

### P3｜一個品牌，四種密度

所有端口共用顏色、字體、圓角、狀態語義；只因工作場景改變資訊密度與元件尺寸。

### P4｜狀態比裝飾重要

營業、暫停、售罄、待處理、完成、打印失敗、離線，必須使用穩定一致嘅語義顏色與文字。

### P5｜食物圖像真實

使用真實產品攝影或經核准磨飯 IP。禁止生成與實物差距過大嘅假食物圖。

---

## 3. Color Palette & Roles｜顏色系統

### 3.1 Primary Brand

| Token | 色值 | 用途 |
|---|---:|---|
| `--mf-purple-700` | `#51326B` | 深品牌色、深色文字、重點標題 |
| `--mf-purple-600` | `#684082` | 主按鈕、Active、品牌核心 |
| `--mf-purple-500` | `#7A5294` | Hover／次重點 |
| `--mf-purple-200` | `#DCCCE7` | 選中背景、輕提示 |
| `--mf-purple-100` | `#F0E8F5` | 品牌淡色區塊 |

紫色只負責品牌、主要行動與選中狀態。禁止將所有卡片、背景、導航全部染紫。

### 3.2 Rice & Warm Neutrals

| Token | 色值 | 用途 |
|---|---:|---|
| `--mf-rice-50` | `#FCFAF6` | Customer 主畫布 |
| `--mf-rice-100` | `#F7F2EA` | 分區背景、空狀態 |
| `--mf-rice-200` | `#EEE4D7` | 邊界、分隔、淡卡片 |
| `--mf-warm-white` | `#FFFDFC` | 卡片、彈層 |
| `--mf-ink-900` | `#241F26` | 主文字 |
| `--mf-ink-700` | `#4B454D` | 次文字 |
| `--mf-ink-500` | `#777078` | 輔助資訊 |
| `--mf-border` | `#DDD6DE` | 一般邊界 |

### 3.3 Food Accents

| Token | 色值 | 用途 |
|---|---:|---|
| `--mf-orange-600` | `#C96C2D` | 熱食、推薦、加購提示 |
| `--mf-orange-100` | `#F8E6D7` | 推薦淡背景 |
| `--mf-green-600` | `#35745A` | 營業、成功、可取餐 |
| `--mf-green-100` | `#E2F0E8` | 成功淡背景 |

食物 Accent 只用於導購與狀態，唔可與品牌紫競爭。

### 3.4 Semantic States

| 狀態 | 主色 | 淡背景 | 規則 |
|---|---:|---:|---|
| 成功／營業／可取餐 | `#2F7657` | `#E1F1E8` | 綠色 |
| 提醒／繁忙／待確認 | `#A76420` | `#FFF0D8` | 琥珀色 |
| 錯誤／停止／打印失敗 | `#B43D3D` | `#FBE4E4` | 紅色 |
| 售罄／停用 | `#706A72` | `#ECE9ED` | 灰色，必須配文字 |
| 資訊／同步中 | `#3B648F` | `#E3EDF7` | 藍色 |
| 離線／Pending Queue | `#8A5B20` | `#F8EAD5` | 琥珀啡 |

禁止只靠顏色表達狀態；必須同時有文字、圖示或形狀。

### 3.5 Dark Operational Surface

SMT／SMM 可使用局部深色操作列：

- `--mf-ops-950: #19171A`
- `--mf-ops-900: #242126`
- `--mf-ops-800: #302C32`
- 文字使用 `#FFFFFF`／`rgba(255,255,255,.72)`

禁止 Customer 主流程全黑化。

---

## 4. Typography Rules｜字體規則

### 4.1 Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang HK", "Noto Sans TC", "Microsoft JhengHei", sans-serif;
```

只使用合法可部署字體。禁止複製第三方專有品牌字體。

### 4.2 數字與價格

價格、訂單號、時間、數量要使用支援 Tabular Numbers 嘅系統字體：

```css
font-variant-numeric: tabular-nums;
```

### 4.3 Type Scale

| Role | Customer | Admin | SMT 1280×800 | SMM |
|---|---:|---:|---:|---:|
| Display | 30–36 | 28–32 | 28–34 | 26–30 |
| Page Title | 24–28 | 24–28 | 24–28 | 22–26 |
| Section Title | 19–22 | 18–22 | 20–24 | 18–21 |
| Product Name | 16–19 | 15–17 | 18–22 | 16–19 |
| Body | 15–17 | 14–16 | 16–18 | 15–17 |
| Metadata | 12–14 | 12–14 | 13–15 | 12–14 |
| Price Primary | 22–30 | 18–24 | 24–34 | 20–28 |
| Order Number | — | 18–24 | 28–40 | 24–32 |

### 4.4 Weight

- 400：一般內容
- 500：標籤、次重點
- 600：產品名、按鈕、狀態
- 700：價格、訂單號、核心數字

禁止大量 700 導致全頁爭焦點。

### 4.5 Line Height

- 標題：1.2–1.3
- 內容：1.45–1.6
- 高密度操作元件：1.25–1.4

繁體中文禁止過緊字距；預設 `letter-spacing: 0`，大標題最多 `-0.01em`。

---

## 5. Spacing, Radius & Elevation｜間距、圓角、深度

### 5.1 Spacing Scale

```text
4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64
```

禁止任意新增 13、17、23、29px 等無系統間距，除非硬件校準有證據。

### 5.2 Radius

| Token | 值 | 用途 |
|---|---:|---|
| `--radius-xs` | 6px | 狀態標籤、細輸入 |
| `--radius-sm` | 10px | 操作按鈕、細卡 |
| `--radius-md` | 14px | 產品卡、一般容器 |
| `--radius-lg` | 20px | Customer Hero、主要彈層 |
| `--radius-pill` | 999px | Tag、Filter、單一短操作 |

SMT 高密度頁面優先 8–12px；Customer 可 14–20px。禁止所有元件全部 Pill 化。

### 5.3 Shadows

```css
--shadow-1: 0 1px 2px rgba(36,31,38,.08);
--shadow-2: 0 6px 18px rgba(36,31,38,.10);
--shadow-3: 0 14px 36px rgba(36,31,38,.16);
```

- 卡片預設使用邊框或 `shadow-1`。
- 彈層使用 `shadow-2`／`shadow-3`。
- 禁止每張卡都有厚重浮起效果。

---

## 6. Component Styling｜核心元件

### 6.1 Buttons

#### Primary

- 背景：`--mf-purple-600`
- 文字：白色
- 高度：Customer 48–54px；SMT 46–56px；SMM 48–54px
- 圓角：10–14px，Customer 可 999px 但只限主要 CTA
- Active：`transform: scale(.97)`，80–120ms
- Disabled：灰底、灰字、無陰影，保留原因提示

#### Secondary

- 白／暖白背景
- 紫色或深文字
- 1px 邊框
- 不得同 Primary 有相同視覺重量

#### Destructive

- 紅色只用於取消、停止、刪除、拒絕
- 必須以文字清楚寫明行為
- 高風險行為需確認，但唔可每一步都彈確認

#### Quick Action

SMT／SMM 快捷操作可用較緊湊按鈕，但觸控區不得少於 44×44px。

### 6.2 Product Cards

#### Customer

- 真實產品圖優先
- 產品名最多兩行
- 價格永遠清楚可見
- 套餐包含以簡潔副標題顯示
- 售罄時降低圖片飽和度、加明確「售罄」Overlay，按鈕停用
- 推薦標籤不得遮住產品名或價格

#### SMT／SMM

- 價格與產品名比圖片重要
- 支援純文字細卡／小圖卡／大圖卡
- 卡片按下後要即時有狀態反饋
- 快速點單不代表繞過必要選項驗證
- 選中／已加入要有數量或明確狀態，不可只變色

### 6.3 Cart / 記憶罐

Customer 使用「記憶罐」品牌語言；SMT／SMM 使用「購物車／訂單內容」營運語言。

- 數量控制靠近右手操作區
- 金額欄固定對齊
- 修改項目顯示差異，不重複整段套餐文字
- Checkout CTA 固定但不可遮住內容
- 空車狀態提供下一個直接行動

### 6.4 Status Chips

- 高度 24–32px
- 文字 12–14px／600
- 配合語義色與圖示
- 禁止純色小圓點作唯一狀態

標準字詞：營業中、暫停接單、繁忙、售罄、待處理、完成／可取餐、離線、同步中、打印失敗。

### 6.5 Inputs

- Label 永遠存在，唔只靠 Placeholder
- 錯誤直接顯示原因
- 數量／金額輸入使用適合鍵盤
- 密碼、員工登入要有可見／隱藏控制
- Admin 表單採清楚分組，唔好一頁堆滿欄位

### 6.6 Navigation

#### Customer

- 底部導航最多 4–5 項
- Icon 在上、文字在下
- Active 使用紫色＋形狀／粗幼差異

#### SMT

- 主導航固定、唔遮購物車
- 點單、待處理、訂單、售罄、更多要有清楚層級
- 1280×800 禁止靠整頁縮放適配

#### SMM

- 單手操作優先
- 主要操作放下半部
- 唔可用 iframe 或縮細 Desktop Shell 代替 Mobile Profile

### 6.7 Dialogs / Sheets

- 背景遮罩後禁止點擊底層
- 空白位置不作確認
- 必須有返回／取消／確認路徑
- 長內容內部滾動，底部主要操作固定
- SMT 彈卡寬度按工作類型控制，唔可每個彈層全屏

### 6.8 Toast / Feedback

- 一般成功提示 1–3 秒
- 錯誤／離線／打印失敗不可自動消失，直到有恢復行動
- 禁止同一操作同時 Toast、Dialog、Banner 三重提示

---

## 7. Layout Principles｜版面原則

### 7.1 Common

- 優先清楚層級，唔追求所有空間填滿。
- 一屏只保留一個 Primary Action。
- 關鍵價格、狀態、訂單號沿固定軸線對齊。
- 區塊以背景、間距、邊界三者其一分隔，唔好全部同時使用。

### 7.2 Customer Mobile

- 手機優先，首頁一屏完成主要入口。
- 推薦卡可以橫滑，但核心導航唔可依賴橫滑。
- 產品列表 2 欄為主；產品名過長要穩定截斷。
- 底部 Checkout 需預留 Safe Area。

### 7.3 SMT Register 1280×800

- 1280×800 為原生基準，禁止由 1920×1080 Scale Down。
- Product Area 與 Cart Area 採可配置比例，但要由 Layout Grid 真實生效。
- 高峰常用資訊首屏可見。
- 右手操作：加減、確認、付款、完成靠右或右下。
- 固定高度只可用於真正硬件邊界，不可壓住內容。

建議 Grid：

```text
Top Bar：56–64px
Main Area：剩餘高度
Product / Cart：68/32、70/30 或 75/25，由 Token 控制
Bottom Action：如有，56–64px
```

### 7.4 SMM Mobile

- 390–430px 寬度作主要設計範圍。
- 重要操作拇指可達。
- 大列表採 Sticky Filter／Segment，但避免多層 Sticky 互相遮擋。
- 待處理訂單優先顯示時間、來源、金額、核對狀態。

### 7.5 Admin

- Desktop 先清楚表格與批量操作；Tablet 保持可用。
- 左側導航可收合，但不可只剩無文字 Icon。
- Published／Draft／Runtime 狀態要有固定位置。
- 危險操作同一般編輯視覺分離。

---

## 8. Motion & Interaction｜動效與互動

### 8.1 Timing

- Press：80–120ms
- Hover／Focus：120–180ms
- Page／Panel Transition：180–260ms
- Brand Entrance：最多 600ms，且只限非高峰客戶體驗

### 8.2 Allowed

- 按壓縮放 `.97–.98`
- 輕微淡入／位移 4–12px
- Cart 數量更新微彈
- 成功狀態短暫 Highlight

### 8.3 Forbidden

- SMT／SMM 使用長動畫阻礙連續操作
- 大面積 Parallax
- 每張產品卡持續浮動
- Loading 無限品牌動畫而無進度／狀態
- 依賴動畫先顯示必要資訊

尊重 `prefers-reduced-motion`。

---

## 9. Accessibility & Touch｜無障礙與觸控

- 最小觸控區：44×44px；SMT 高峰建議 48×48px。
- 文字與背景需達合理對比；淡紫背景不可配淡灰字。
- Focus 狀態不可移除。
- Icon 按鈕必須有可讀 Label／aria-label。
- 售罄、錯誤、成功不可只靠顏色。
- Customer 正文最少 15px；SMT 主要操作最少 16px。
- 支援 Safe Area、橫屏、鍵盤、掃碼器及觸控。

---

## 10. Brand IP & Imagery｜IP 與圖像

### 10.1 IP

- 紫米仔、米米、記憶種子只可用於歡迎、空狀態、獎勵、公告、品牌故事。
- SMT 高峰畫面唔應大量放 IP，避免搶操作焦點。
- IP 表情與姿勢要溫暖、自然，禁止過度幼兒化。

### 10.2 Food Photography

- 真實產品比例、配料、份量要可信。
- 使用暖自然光、簡潔背景。
- 禁止過度油亮、誇張煙霧、虛假份量。
- 同類產品拍攝角度與裁切要一致。

### 10.3 Icons

- 統一 Stroke 或統一 Filled，唔可混用多套風格。
- 主要操作 Icon 需配文字。
- 禁止 Emoji 作正式操作 Icon。

---

## 11. Port Profiles｜端口設計差異

### Customer

情感 60%／效率 40%。暖米色畫布、紫色核心 CTA、食物攝影、記憶語言。

### Admin

清晰 60%／控制 40%。暖白＋中性灰為主，紫色只標示主操作與 Published Authority。

### SMT Register

效率 75%／品牌 25%。高對比、快速掃視、大價格、大訂單號、右手操作、少裝飾。

### SMM

效率 70%／品牌 30%。同 SMT Shared Core 視覺語義，但重新排列成手機單手操作，禁止縮細桌面版。

### Android Host

診斷 80%／品牌 20%。打印機、連線、版本、任務結果優先；品牌只用於 Header 與正常狀態。

---

## 12. Do's & Don'ts｜強制設計守則

### 必須

- 使用語義 Token，禁止頁面自行定義近似顏色。
- 使用同一狀態字詞與色彩。
- 先畫 Normal／Pressed／Disabled／Loading／Error／Offline。
- 所有新元件先決定屬於 Shared、Customer、Admin、SMT 或 SMM。
- 改 UI 前先確認唔會新增第二套 State／Render Path。
- 1280×800 用原生 Layout 重排。

### 禁止

- 禁止複製 Starbucks／Apple／Linear 等品牌外觀。
- 禁止使用第三方專有字體或 Logo。
- 禁止整頁 Scale、iframe Desktop Shell 當適配。
- 禁止大量 `!important`、z-index 疊壓、固定高度遮內容。
- 禁止只改 CSS 遮住結構根因。
- 禁止將 Customer 卡通語言直接搬入 SMT 高峰操作。
- 禁止每頁自行創建新紫色、新圓角、新陰影。

---

## 13. Responsive Behavior｜響應式

### Breakpoint Guidance

```text
Customer Small：320–374
Customer Standard：375–430
Customer Wide：431–767
Tablet／Admin Compact：768–1023
Desktop／Admin：1024+
SMT Native：1280×800 fixed hardware profile
```

Breakpoint 只決定排列，不改變商業邏輯、State 或資料來源。

- 由雙欄轉單欄時保持操作順序。
- Sticky 元件要計算 Safe Area。
- 文字放大 120% 時不可遮住價格與 CTA。
- SMT Native Profile 唔因瀏覽器外框而建立第二套 Desktop Layout。

---

## 14. AI / Codex Prompt Guide｜執行指令

```text
你正在為 MoreFunOS／磨飯設計或實作 UI。

必須先讀：
1. Global Master Authority
2. CURRENT_STATUS
3. 對應 Port Authority／AGENTS／CURRENT HANDOFF
4. Engineering Constitution
5. docs/ui/MOREFUNOS_DESIGN.md

視覺要求：
- 使用磨飯輕日系、溫暖、清爽、可靠風格。
- 使用本文件定義嘅顏色、字體、間距、圓角、狀態語義。
- Customer 重視食物與被記得；SMT／SMM 重視高峰效率。
- 禁止抄任何第三方品牌。

工程要求：
- 禁止新增第二套 State、Store、Selector、Listener、Observer、Render Path。
- 禁止 Patch、Bridge、DOM Scan、Polling、Reload、整頁 Scale。
- UI 必須由現有 Domain State 原生 Render。
- 不得改商業邏輯、價格、資料 Contract，除非任務明確授權。

交付必須列出：
- 修改前問題
- 唯一 Component Owner
- 使用咗邊啲 Design Tokens
- Normal／Pressed／Disabled／Loading／Error／Offline 狀態
- 對應 Profile 驗證尺寸
- Targeted Test 與未驗證項目
```

---

## 15. UI Review Checklist｜驗收清單

### Brand

- [ ] 一眼可辨識為磨飯，而唔係其他品牌換 Logo。
- [ ] 紫色使用克制，米色與食物色有平衡。
- [ ] 文案符合「陪伴大家長大／被記得」。

### Usability

- [ ] 主要行動 3 秒內可找到。
- [ ] 價格、數量、狀態無歧義。
- [ ] 高峰操作可單手／右手完成。
- [ ] 觸控區達 44px 以上。

### State

- [ ] Normal、Pressed、Disabled、Loading、Error、Offline 齊全。
- [ ] 售罄、暫停、離線、打印失敗有文字提示。
- [ ] UI 無自行推斷 Business State。

### Responsive

- [ ] Customer 375／390／430px 通過。
- [ ] SMM 真手機 Profile 通過。
- [ ] SMT 1280×800 原生通過，無整頁 Scale。
- [ ] Admin 1024px 以上通過。

### Engineering

- [ ] 無新 Patch／Bridge／第二套 State。
- [ ] 無大量 `!important`／z-index／硬壓高度。
- [ ] Design Token 有唯一 Owner。
- [ ] 只聲稱實際取得嘅 Evidence Level。

---

## 16. 採用來源與轉化原則

本文件採用 `awesome-design-md` 類型文件嘅結構方法：

- Visual Theme & Atmosphere
- Color Palette & Roles
- Typography Rules
- Component Stylings
- Layout Principles
- Depth & Elevation
- Do's and Don'ts
- Responsive Behavior
- Agent Prompt Guide

但所有品牌內容均重新設計為磨飯專屬，並加入 MoreFunOS 必需嘅：

- 四端 Profile
- POS 高峰操作
- 售罄／營業／離線／打印狀態
- Native-Core-First 工程限制
- 1280×800 硬件 Profile
- Customer「記憶」品牌語言

任何外部設計只可放入 Reference，不得直接成為 Authority。
