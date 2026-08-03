# MoreFunOS｜磨飯 UI Design Authority V1.1

狀態：DRAFT FOR REVIEW  
適用：Customer／Admin／SMT Register／SMT Mobile（SMM）／Android Host 顯示層  
設計基礎：VoltAgent `awesome-design-md` 文件結構方法 × MoreFunOS 現役品牌、營運、裝置與工程邊界  
核心修正：所有端口均以自適應 PWA 為基礎；1920×1080、1280×800、手機及平板尺寸只屬驗收 Profile，禁止寫死成獨立版面或整頁縮放版本。

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
- 全端自適應 PWA 規則
- Customer／Admin／SMT／SMM／Android Host 顯示 Profile
- AI／Codex 生成 UI 時嘅設計約束

本文件不負責：

- 商品價格、套餐規則、售罄邏輯
- Firebase／Worker／Order／Payment／Print Authority
- 權限、Revision、Idempotency、Audit
- 端口資料模型、API Contract
- 用 UI Guard 掩蓋 Domain 問題

優先次序：Global Master Authority → Current Status → Port Authority → Engineering Constitution → 本文件 → 實際元件實作。

---

## 1. 核心設計定位

MoreFunOS 唔係冷冰冰企業軟件，亦唔係可愛到影響效率嘅卡通 App。

設計必須同時具備：

1. **被記得**：客人感到熟悉、溫暖、有陪伴感。
2. **乾淨可靠**：資料、價格、狀態一眼睇清。
3. **高峰可操作**：店員忙亂時仍可快速點選、修正、確認。
4. **輕日系**：自然暖色、柔和曲線、適量留白，但唔過度裝飾。
5. **紫米識別**：紫色係品牌記憶，不係全畫面高飽和背景。
6. **食物為主角**：Customer 端以產品同組合價值為主；營運端以狀態同操作為主。
7. **自適應優先**：同一功能不可因裝置尺寸不同而建立第二套 UI 或第二套邏輯。

品牌形容詞：溫暖、清爽、可靠、親切、俐落、熟悉、有記憶感、適合香港小店。

禁止：科技霓虹、賭場式漸層、全黑 Cyberpunk、醫療健身感、過度玻璃擬態、每頁不同風格。

---

## 2. 自適應 PWA 架構原則

### 2.1 唯一基礎

Customer、Admin、SMT、SMM 均必須以可安裝 PWA 方式設計及實作。

同一端口必須共用：

- 同一 Business Domain
- 同一 State／Store
- 同一 Component Authority
- 同一 Design Token
- 同一 Route Contract
- 同一 Offline／Recovery 規則

尺寸改變只可引發：

- Grid 重新排列
- 元件密度切換
- 導航形態切換
- 次要資訊摺疊或展開
- 圖片比例及欄數調整
- Dialog／Sheet 呈現方式調整

尺寸改變不可引發：

- 第二套商業邏輯
- 第二套 Store
- 第二套資料真相
- 複製一份 Desktop／Mobile Page
- iframe 載入另一個尺寸版本
- 以 CSS `transform: scale()` 縮放整頁
- 以固定 1280×800 或 1920×1080 當唯一畫布

### 2.2 自適應判斷依據

禁止只用裝置名稱或 User-Agent 決定 UI。

必須綜合：

- 可用 Viewport 寬度
- 可用 Viewport 高度
- 橫屏／直屏
- 觸控／滑鼠／鍵盤
- Safe Area
- 顯示密度
- Browser Chrome／PWA Standalone 模式
- 軟鍵盤是否開啟
- 硬件輸入：掃碼器、打印、外接鍵盤

### 2.3 Layout Modes

系統只定義能力模式，唔以單一型號命名：

| Mode | 典型可用空間 | 主要用途 |
|---|---|---|
| `compact` | 手機直屏、小型視窗 | 單欄、底部操作、次要資訊收合 |
| `medium` | 大手機橫屏、平板直屏 | 一至兩欄、可收合側欄 |
| `wide` | 平板橫屏、1280×800 | 多欄營運、產品＋購物車並排 |
| `expanded` | 1920×1080、大型觸控屏 | 增加可見內容，不放大整頁比例 |

Mode 由 Container／Viewport 能力決定，禁止將 `wide` 寫死等於 1280×800，亦禁止將 `expanded` 寫死等於 1920×1080。

### 2.4 連續式自適應

優先使用：

```css
clamp()
min()
max()
minmax()
auto-fit
auto-fill
container queries
aspect-ratio
safe-area-inset-*
```

Breakpoint 只負責結構轉換，唔用嚟逐像素補丁。

---

## 3. 品牌顏色

### 3.1 Primary Brand

| Token | 色值 | 用途 |
|---|---:|---|
| `--mf-purple-700` | `#51326B` | 深品牌色、重點標題 |
| `--mf-purple-600` | `#684082` | 主按鈕、Active、品牌核心 |
| `--mf-purple-500` | `#7A5294` | Hover／次重點 |
| `--mf-purple-200` | `#DCCCE7` | 選中背景、輕提示 |
| `--mf-purple-100` | `#F0E8F5` | 品牌淡色區塊 |

紫色只負責品牌、主要行動與選中狀態。禁止所有卡片、背景、導航全部染紫。

### 3.2 Rice & Warm Neutrals

| Token | 色值 | 用途 |
|---|---:|---|
| `--mf-rice-50` | `#FCFAF6` | 主畫布 |
| `--mf-rice-100` | `#F7F2EA` | 分區背景、空狀態 |
| `--mf-rice-200` | `#EEE4D7` | 邊界、分隔 |
| `--mf-warm-white` | `#FFFDFC` | 卡片、彈層 |
| `--mf-ink-900` | `#241F26` | 主文字 |
| `--mf-ink-700` | `#4B454D` | 次文字 |
| `--mf-ink-500` | `#777078` | 輔助資訊 |
| `--mf-border` | `#DDD6DE` | 一般邊界 |

### 3.3 Semantic States

| 狀態 | 主色 | 淡背景 |
|---|---:|---:|
| 成功／營業／可取餐 | `#2F7657` | `#E1F1E8` |
| 提醒／繁忙／待確認 | `#A76420` | `#FFF0D8` |
| 錯誤／停止／打印失敗 | `#B43D3D` | `#FBE4E4` |
| 售罄／停用 | `#706A72` | `#ECE9ED` |
| 資訊／同步中 | `#3B648F` | `#E3EDF7` |
| 離線／Pending Queue | `#8A5B20` | `#F8EAD5` |

禁止只靠顏色表達狀態；必須同時有文字、圖示或形狀。

---

## 4. 字體與比例

```css
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang HK", "Noto Sans TC", "Microsoft JhengHei", sans-serif;
font-variant-numeric: tabular-nums;
```

字體大小以角色及可用空間連續調整，禁止為每個解像度複製一張表。

建議：

```css
--font-body: clamp(15px, 0.35vw + 13.5px, 18px);
--font-product: clamp(16px, 0.45vw + 14px, 22px);
--font-price: clamp(22px, 0.9vw + 18px, 36px);
--font-order: clamp(26px, 1.2vw + 20px, 42px);
```

- 400：一般內容
- 500：標籤、次重點
- 600：產品名、按鈕、狀態
- 700：價格、訂單號、核心數字

禁止因 Expanded 畫面而將所有文字同比放大；大畫面應優先增加可見內容與操作空間。

---

## 5. 間距、圓角、陰影

間距：`4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64`

| Token | 值 | 用途 |
|---|---:|---|
| `--radius-xs` | 6px | 狀態標籤 |
| `--radius-sm` | 10px | 操作按鈕、細卡 |
| `--radius-md` | 14px | 產品卡、一般容器 |
| `--radius-lg` | 20px | Customer Hero、主要彈層 |
| `--radius-pill` | 999px | Tag、短操作 |

```css
--shadow-1: 0 1px 2px rgba(36,31,38,.08);
--shadow-2: 0 6px 18px rgba(36,31,38,.10);
--shadow-3: 0 14px 36px rgba(36,31,38,.16);
```

高密度營運介面優先 8–12px 圓角；Customer 可 14–20px。

---

## 6. 核心元件

### Buttons

- 最小觸控區 44×44px；高峰操作建議 48×48px。
- 高度用 `clamp(46px, 5.8vh, 58px)`，不可按解像度寫死。
- Active：`scale(.97)`，80–120ms。
- Disabled 必須保留原因提示。
- Destructive 只用於取消、停止、刪除、拒絕。

### Product Cards

同一 Product Card Component 支援密度變體：

- `compact`：文字為主、圖片可縮細或隱藏。
- `standard`：圖片＋名稱＋價格＋快捷操作。
- `comfortable`：大畫面增加描述、庫存及快捷選項。

禁止為 1280×800、1920×1080 分別複製兩套產品卡。

### Cart／記憶罐

- Compact：Bottom Sheet／獨立頁。
- Medium：可收合 Side Sheet。
- Wide／Expanded：固定右側 Cart Panel。
- 內容及狀態必須共用同一 Cart Store。

### Dialog／Sheet

- Compact：Bottom Sheet 或 Full-height Sheet。
- Medium：置中 Dialog 或 Side Sheet。
- Wide／Expanded：按工作類型使用固定最大寬度 Dialog。
- 背景遮罩後禁止操作底層。
- 長內容內部滾動，主要操作固定。

### Navigation

- Compact：Bottom Navigation／Top App Bar。
- Medium：Bottom Navigation 或可收合 Rail。
- Wide／Expanded：Navigation Rail／Sidebar／Top Bar。
- 導航切換只改展示，Route 與權限保持同一來源。

---

## 7. SMT 自適應營運介面

### 7.1 定位

SMT 係同一套自適應 PWA 營運系統，唔係 1280×800 專用版，亦唔係 1920×1080 專用版。

必須支援包括但不限於：

- 1280×800 橫屏觸控設備
- 1920×1080 橫屏觸控設備
- 其他 16:9、16:10、4:3 或近似比例設備
- Browser 模式及 PWA Standalone 模式
- 不同系統縮放、顯示密度及 Safe Area

### 7.2 Layout Behavior

#### Wide，例如 1280×800

- Product Area 與 Cart Area 並排。
- 比例可由 Token／Container 決定，例如 68/32、70/30、75/25。
- 高峰常用資訊首屏可見。
- 右手操作區靠右或右下。
- 低高度時先減少垂直留白及次要描述，唔縮放整頁。

#### Expanded，例如 1920×1080

- 保持同一資訊層級及操作位置。
- 增加產品欄數、可見訂單數、描述或快捷操作。
- Cart 可擴闊，但不可無限制拉闊。
- 唔將 1280×800 畫面等比例放大。
- 唔另建一套 1920×1080 DOM、CSS 或商業邏輯。

### 7.3 高度自適應

同寬度但高度不同時：

- Top Bar 使用 `clamp()`。
- 產品卡行數由可用高度決定。
- 次要資訊可收合。
- Cart Action 永遠可見但不可遮內容。
- 必須處理 720、768、800、900、1080 等高度。

### 7.4 SMT 禁止事項

- 禁止固定 `width: 1280px; height: 800px` 作 Production Shell。
- 禁止固定 `width: 1920px; height: 1080px` 作 Production Shell。
- 禁止用 iframe 切換尺寸版本。
- 禁止將 1920 版 Scale Down 成 1280。
- 禁止將 1280 版 Scale Up 成 1920。
- 禁止尺寸 Profile 擁有獨立 State／Cart／Pricing／Order 邏輯。

---

## 8. Customer／SMM／Admin 自適應規則

### Customer PWA

- 支援 iPhone、Android、小屏、大屏、直屏、橫屏。
- 320px 起保持可完成點餐，不以 390–430px 為唯一設計範圍。
- 產品列表按 Container 由 1 欄轉 2 欄，寬屏可增加但保持可讀。
- Checkout Bar 必須處理 iOS／Android Safe Area。
- 軟鍵盤打開時不可遮住輸入及主要確認。

### SMM PWA

- SMM 係 SMT Shared Core 嘅 Mobile Profile，唔係縮細 Desktop Shell。
- 小屏單手操作；大手機、摺疊屏、平板可以自然增加資訊密度。
- 主要操作放拇指可達區。
- 橫屏時可切換雙欄，但保持同一 Store。

### Admin PWA

- Desktop、Laptop、Tablet 均可用。
- 表格在窄畫面可轉卡片、分段或水平捲動，但不可截斷關鍵操作。
- 左側導航可轉 Rail／Drawer。
- Published／Draft／Runtime 狀態固定可見。

### Android Host

- 診斷頁同樣使用 Responsive PWA Layout。
- 觸控屏、平板、電視式顯示均可讀。
- 硬件功能由 Native Boundary 決定，唔由畫面尺寸決定。

---

## 9. PWA 必須能力

所有可安裝端口必須具備：

- 正確 Web App Manifest
- Standalone Display Mode
- iOS／Android Safe Area
- 安裝後啟動路由一致
- Service Worker 版本控制
- Last-known-good Cache
- Offline／Update 狀態提示
- 新版本可控刷新，禁止無限 `location.reload()`
- PWA 與 Browser 模式功能邊界清楚
- PWA 更新不可令未提交 Cart／Mutation Queue 消失

PWA 只係交付及裝置能力層，唔可以保存第二套 Business Truth。

---

## 10. 建議自適應測試矩陣

解像度唔係設計 Authority，只係最低驗收樣本。

### Mobile

- 320×568
- 360×800
- 375×812
- 390×844
- 414×896
- 430×932
- Android 常見小屏及大屏
- 橫屏、軟鍵盤、Safe Area

### Tablet／Compact Desktop

- 768×1024
- 800×1280
- 1024×768
- 1024×1366

### SMT／Large Operational

- 1280×720
- 1280×800
- 1366×768
- 1440×900
- 1920×1080

每個樣本必須驗證：

- 無整頁 Scale
- 無內容遮擋
- 無橫向溢出，除非元件規格明確允許
- 主要操作可達
- Cart／Dialog／Keyboard／Safe Area 正常
- Reload／Rotate／Resize 後 State 保留
- PWA Standalone 與 Browser 結果一致

---

## 11. 動效、觸控及無障礙

- Press：80–120ms
- Hover／Focus：120–180ms
- Panel Transition：180–260ms
- SMT／SMM 禁止長動畫阻礙操作
- 支援 `prefers-reduced-motion`
- Focus 狀態不可移除
- Icon 按鈕必須有 Label／aria-label
- 狀態不可只靠顏色
- 支援觸控、鍵盤、掃碼器及外接輸入

---

## 12. AI／Codex 強制規則

進行任何 UI 工作前必須：

1. 確認改動屬於邊個 Port／Component Owner。
2. 確認共用 State、Store、Route、Contract 不變。
3. 先列需要支援嘅 Layout Modes，而唔係只列一個解像度。
4. 使用 Fluid Tokens、Grid、Flex、Container Query 原生重排。
5. 同時驗證 Compact、Medium、Wide、Expanded。
6. 記錄 Browser、PWA Standalone、Device Evidence。

禁止：

- 寫死只支援 1280×800。
- 寫死只支援 1920×1080。
- 為每個尺寸 Copy Page／Copy CSS／Copy Store。
- 使用整頁 Scale、iframe、DOM Scan、第二 Listener、第二 Render Path。
- 以 User-Agent 當唯一版面判斷。
- 只改 CSS 遮住結構根因。

---

## 13. 完成定義

設計文件完成唔代表 UI 已完成。

每個自適應元件必須取得：

`SPEC_LOCKED → COMPONENT_PASS → RESPONSIVE_BROWSER_PASS → PWA_STANDALONE_PASS → DEVICE_PASS → STORE_PASS`

未完成所有必要 Profile 驗收，不可聲稱自適應完成。
