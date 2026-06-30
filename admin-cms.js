const API_BASE_URL =
  window.MOREFUN_API_BASE_URL ||
  localStorage.getItem("morefun_api_base_url") ||
  "https://script.google.com/macros/s/AKfycbzp2OzaZFFGpvtA0-DJwo2TjKa_4FG0grTH4gLJpNyQsIqHfpbjqUmgfUIVQmDDNFY0pA/exec";

const TOKEN_KEY = "morefun_admin_token";
const ADMIN_ID_KEY = "morefun_admin_id";

const forbiddenText = [
  "payment proof upload",
  "payment success",
  "paid",
  "verified",
  "delivery",
  "live order status",
  "credit card",
  "Octopus",
  "points mall",
  "seed deduction",
  "energy deduction",
  "hard delete"
];

const routes = [
  { path: "/admin/dashboard", label: "今日概覽" },
  { path: "/admin/orders", label: "訂單" },
  { path: "/admin/products", label: "商品" },
  { path: "/admin/availability", label: "售罄 / 供應" },
  { path: "/admin/categories-tags", label: "分類 / 標籤" },
  { path: "/admin/options-modifiers", label: "選項 / 加配" },
  { path: "/admin/meal-rules", label: "套餐規則" },
  { path: "/admin/meal-drinks", label: "套餐飲品" },
  { path: "/admin/homepage", label: "首頁公告" },
  { path: "/admin/recommendations", label: "推薦" },
  { path: "/admin/payment-methods", label: "付款 QR" },
  { path: "/admin/customer-memory", label: "客人記憶" },
  { path: "/admin/rewards", label: "回憶券" },
  { path: "/admin/badges", label: "勳章" },
  { path: "/admin/whatsapp-rules", label: "WhatsApp 文案" },
  { path: "/admin/settings", label: "店舖設定" },
  { path: "/admin/audit-logs", label: "操作紀錄" }
];

const pageConfigs = {
  "/admin/orders": {
    title: "Orders",
    description: "Read orders and copy saved WhatsApp payloads. No hard delete or live order tracking.",
    resources: [
      { label: "Orders", read: "admin.orders.read", readOnly: true }
    ]
  },
  "/admin/products": {
    title: "Products",
    description: "Edit product names, visibility, pricing, images, and product metadata.",
    resources: [
      { label: "Products", read: "admin.products.read", update: "admin.products.update", idField: "product_id" }
    ]
  },
  "/admin/availability": {
    title: "Availability",
    description: "Set sold-out, hidden, and available states.",
    resources: [
      { label: "Product Availability", read: "admin.products.read", update: "admin.availability.update", idField: "product_id", availabilityMode: true }
    ]
  },
  "/admin/categories-tags": {
    title: "Categories / Tags",
    description: "Control category visibility, tag definitions, and product-tag mapping.",
    resources: [
      { label: "Categories", read: "admin.categories.read", update: "admin.categories.update", idField: "category_id" },
      { label: "Product Tags", read: "admin.productTags.read", update: "admin.productTags.update", idField: "tag_id" },
      { label: "Product Tag Map", read: "admin.productTagMap.read", update: "admin.productTagMap.update", idField: "product_id" }
    ]
  },
  "/admin/options-modifiers": {
    title: "Options / Modifiers",
    description: "Manage ingredients, modifiers, bento adjustments, and salad sauce options.",
    resources: [
      { label: "Modifier Groups", read: "admin.modifierGroups.read", update: "admin.modifierGroups.update", idField: "modifier_group_id" },
      { label: "Modifier Options", read: "admin.modifierOptions.read", update: "admin.modifierOptions.update", idField: "modifier_option_id" },
      { label: "Ingredient Options", read: "admin.ingredientOptions.read", update: "admin.ingredientOptions.update", idField: "ingredient_id" },
      { label: "Bento Adjustment Groups", read: "admin.bentoAdjustmentGroups.read", update: "admin.bentoAdjustmentGroups.update", idField: "bento_group_id" },
      { label: "Bento Adjustment Options", read: "admin.bentoAdjustmentOptions.read", update: "admin.bentoAdjustmentOptions.update", idField: "bento_option_id" },
      { label: "Salad Sauce Options", read: "admin.saladSauceOptions.read", update: "admin.saladSauceOptions.update", idField: "sauce_id" }
    ]
  },
  "/admin/meal-rules": {
    title: "Meal Rules",
    description: "Control fixed meals, included items, combo rules, price rules, and packaging fee rules.",
    resources: [
      { label: "Fixed Riceball Meals", read: "admin.fixedRiceballMeals.read", update: "admin.fixedRiceballMeals.update", idField: "meal_id" },
      { label: "Fixed Meal Included Items", read: "admin.fixedMealIncludedItems.read", update: "admin.fixedMealIncludedItems.update", idField: "meal_id" },
      { label: "Custom Riceball Meal", read: "admin.customRiceballMealConfig.read", update: "admin.customRiceballMealConfig.update", idField: "config_id" },
      { label: "Combo Rules", read: "admin.comboRules.read", update: "admin.comboRules.update", idField: "combo_rule_id" },
      { label: "Price Rules", read: "admin.priceRules.read", update: "admin.priceRules.update", idField: "price_rule_id" },
      { label: "Meal Display Rules", read: "admin.mealDisplayRules.read", update: "admin.mealDisplayRules.update", idField: "rule_id" },
      { label: "Packaging Fee Rules", read: "admin.packagingFeeRules.read", update: "admin.packagingFeeRules.update", idField: "rule_id" },
      { label: "Packaging Fee Tests", read: "admin.packagingFeeTests.read", readOnly: true }
    ]
  },
  "/admin/meal-drinks": {
    title: "Meal Drinks",
    description: "Manage two-layer meal drink options.",
    resources: [
      { label: "Meal Drink Options", read: "admin.mealDrinkOptions.read", update: "admin.mealDrinkOptions.update", idField: "drink_option_id" }
    ]
  },
  "/admin/homepage": {
    title: "Homepage",
    description: "Manage homepage config, banners, and announcements.",
    resources: [
      { label: "Homepage Config", read: "admin.homepage.read", update: "admin.homepage.update", idField: "config_key", homepageTarget: "config" },
      { label: "Home Banners", read: "admin.homepage.read", update: "admin.homepage.update", idField: "banner_id", homepageTarget: "banner" },
      { label: "Announcements", read: "admin.homepage.read", update: "admin.homepage.update", idField: "announcement_id", homepageTarget: "announcement" }
    ]
  },
  "/admin/recommendations": {
    title: "Recommendations",
    description: "Edit recommendation sections and pools.",
    resources: [
      { label: "Recommendation Sections", read: "admin.recommendations.read", update: "admin.recommendations.update", idField: "section_id", recommendationTarget: "section" },
      { label: "Recommendation Pools", read: "admin.recommendations.read", update: "admin.recommendations.update", idField: "pool_id", recommendationTarget: "pool" }
    ]
  },
  "/admin/payment-methods": {
    title: "Payment Methods",
    description: "Control Cash, PayMe, FPS, Alipay, WeChat Pay, and QR URLs. Website payment verification remains forbidden.",
    resources: [
      { label: "Payment Methods", read: "admin.paymentMethods.read", update: "admin.paymentMethods.update", idField: "payment_method_id", paymentSafe: true }
    ]
  },
  "/admin/customer-memory": {
    title: "Customer Memory",
    description: "Read and update customer memory profiles without seed or energy deduction.",
    resources: [
      { label: "Customer Memory", read: "admin.customerMemory.read", update: "admin.customerMemory.update", idField: "customer_id" },
      { label: "Customer Coupons", read: "admin.customerCoupons.read", update: "admin.customerCoupons.update", idField: "customer_coupon_id" },
      { label: "Customers", read: "admin.customers.read", readOnly: true }
    ]
  },
  "/admin/rewards": {
    title: "Rewards",
    description: "Manage reward rules and coupon templates without points mall or seed deduction.",
    resources: [
      { label: "Reward Rules", read: "admin.rewardRules.read", update: "admin.rewardRules.update", idField: "reward_rule_id" },
      { label: "Coupon Templates", read: "admin.couponTemplates.read", update: "admin.couponTemplates.update", idField: "coupon_template_id" }
    ]
  },
  "/admin/badges": {
    title: "Badges",
    description: "Manage memory badge rules.",
    resources: [
      { label: "Badge Rules", read: "admin.badgeRules.read", update: "admin.badgeRules.update", idField: "badge_rule_id" }
    ]
  },
  "/admin/whatsapp-rules": {
    title: "WhatsApp Rules",
    description: "Edit WhatsApp text and order format rules.",
    resources: [
      { label: "WhatsApp Rules", read: "admin.whatsAppRules.read", update: "admin.whatsAppRules.update", idField: "rule_key", keyValue: { key: "rule_key", value: "rule_value" } }
    ]
  },
  "/admin/settings": {
    title: "Settings",
    description: "Edit settings and feature flags.",
    resources: [
      { label: "Settings", read: "admin.settings.read", update: "admin.settings.update", idField: "setting_key", keyValue: { key: "setting_key", value: "setting_value" } },
      { label: "Feature Flags", read: "admin.featureFlags.read", update: "admin.featureFlags.update", idField: "flag_key", featureFlag: true }
    ]
  },
  "/admin/audit-logs": {
    title: "Audit Logs",
    description: "Read-only log of admin updates written by backend update actions.",
    resources: [
      { label: "Audit Logs", read: "admin.audit.read", readOnly: true }
    ]
  }
};

const adminCopy = {
  "/admin/orders": ["訂單", "查看訂單與 WhatsApp 訂單內容；不提供刪單或即時狀態追蹤。", ["訂單"]],
  "/admin/products": ["商品", "日常修改商品名稱、價格、圖片、排序與前台顯示。", ["商品"]],
  "/admin/availability": ["售罄 / 供應", "快速設定商品可售、售罄或隱藏。", ["商品供應"]],
  "/admin/categories-tags": ["分類 / 標籤", "管理分類顯示、標籤名稱與商品標籤配對。", ["分類", "商品標籤", "商品標籤配對"]],
  "/admin/options-modifiers": ["選項 / 加配", "管理配料、加配、便當調整與沙律醬。", ["選項群組", "選項內容", "配料選項", "便當調整群組", "便當調整內容", "沙律醬選項"]],
  "/admin/meal-rules": ["套餐規則", "管理固定套餐、自選套餐、加價規則與餐盒費規則。", ["固定飯糰套餐", "固定套餐內容", "自選紫米套餐", "組合規則", "價格規則", "套餐顯示規則", "餐盒費規則", "餐盒費測試"]],
  "/admin/meal-drinks": ["套餐飲品", "管理套餐使用的二層飲品選擇。", ["套餐飲品選項"]],
  "/admin/homepage": ["首頁公告", "管理首頁金句、banner 與公告。", ["首頁設定", "首頁 Banner", "公告"]],
  "/admin/recommendations": ["推薦", "管理首頁與前台推薦區塊。", ["推薦區塊", "推薦商品池"]],
  "/admin/payment-methods": ["付款 QR", "管理現金、PayMe、FPS、Alipay、WeChat Pay 與 QR 圖片網址；不加入付款核實流程。", ["付款方式"]],
  "/admin/customer-memory": ["客人記憶", "查看與維護客人記憶資料，不提供扣記憶種子或能量。", ["客人記憶", "客人回憶券", "客人資料"]],
  "/admin/rewards": ["回憶券", "管理回憶券規則與券樣板，不加入積分商城。", ["回憶券規則", "券樣板"]],
  "/admin/badges": ["勳章", "管理記憶勳章規則。", ["勳章規則"]],
  "/admin/whatsapp-rules": ["WhatsApp 文案", "管理自取訂單文字與 WhatsApp 輸出規則。", ["WhatsApp 規則"]],
  "/admin/settings": ["店舖設定", "管理店舖設定與功能開關。", ["店舖設定", "功能開關"]],
  "/admin/audit-logs": ["操作紀錄", "查看後台修改寫入的 AuditLogs。", ["操作紀錄"]]
};

for (const [path, [title, description, resourceLabels]] of Object.entries(adminCopy)) {
  if (!pageConfigs[path]) continue;
  pageConfigs[path].title = title;
  pageConfigs[path].description = description;
  pageConfigs[path].resources.forEach((resource, index) => {
    resource.label = resourceLabels[index] || resource.label;
  });
}

const state = {
  route: normalizePath(location.pathname),
  activeResource: 0,
  rows: [],
  selected: null,
  selectedText: "",
  loading: false,
  status: null,
  dashboard: null
};

function normalizePath(path) {
  if (path === "/" || path === "/admin") return "/admin/dashboard";
  return path.replace(/\/$/, "");
}

function token() {
  return localStorage.getItem(TOKEN_KEY) || "";
}

function context() {
  return {
    admin_token: token(),
    admin_id: localStorage.getItem(ADMIN_ID_KEY) || "admin_cms"
  };
}

async function action(name, payload = {}, actionContext = context()) {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action: name, payload, context: actionContext }),
    redirect: "follow"
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Invalid response: ${text.slice(0, 240)}`);
  }
  if (!json.ok) {
    const code = json.error?.code || "ERROR";
    const message = json.error?.message || "Action failed";
    if (code === "UNAUTHORIZED") {
      localStorage.removeItem(TOKEN_KEY);
      navigate("/admin/login");
    }
    throw new Error(`${code}: ${message}`);
  }
  return json.data;
}

function navigate(path) {
  const next = normalizePath(path);
  history.pushState({}, "", next);
  state.route = next;
  state.activeResource = 0;
  state.rows = [];
  state.selected = null;
  state.selectedText = "";
  state.status = null;
  render();
  if (next !== "/admin/login") {
    loadCurrent();
  }
}

window.addEventListener("popstate", () => {
  state.route = normalizePath(location.pathname);
  state.activeResource = 0;
  state.rows = [];
  state.selected = null;
  render();
  if (state.route !== "/admin/login") loadCurrent();
});

function setStatus(type, message) {
  state.status = { type, message };
  render();
}

function app() {
  return document.getElementById("app");
}

function render() {
  if (state.route === "/admin/login" || !token()) {
    renderLogin();
    return;
  }

  if (!pageConfigs[state.route] && state.route !== "/admin/dashboard") {
    navigate("/admin/dashboard");
    return;
  }

  app().innerHTML = `
    <div class="app-shell">
      <aside class="side">
        <div class="brand">
          <strong>磨飯 More Fun</strong>
          <span>後台管理</span>
        </div>
        <nav class="nav">
          ${routes.map(route => `<a href="${route.path}" class="${route.path === state.route ? "active" : ""}" data-route="${route.path}">${escapeHtml(route.label)}</a>`).join("")}
        </nav>
      </aside>
      <main class="main">
        <div class="topbar">
          <small>Google Sheet / Apps Script 已連線</small>
          <div class="actions">
            <button class="secondary" data-refresh>重新整理</button>
            <button class="danger" data-logout>登出</button>
          </div>
        </div>
        ${state.route === "/admin/dashboard" ? dashboardMarkup() : pageMarkup()}
      </main>
    </div>
  `;

  bindShell();
}

function renderLogin() {
  app().innerHTML = `
    <main class="login-screen">
      <section class="login-panel">
        <h1>後台登入</h1>
        <p>登入後才可修改商品、售罄、公告、QR 與推薦；所有修改會由後端寫入操作紀錄。</p>
        <form data-login-form>
          <div class="field">
            <label for="password">管理密碼</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required />
          </div>
          <div class="field">
            <label for="apiUrl">後台 API</label>
            <input id="apiUrl" name="apiUrl" value="${escapeAttr(API_BASE_URL)}" />
          </div>
          <div class="field">
            <button class="primary" type="submit">登入</button>
          </div>
        </form>
        ${statusMarkup()}
      </section>
    </main>
  `;

  app().querySelector("[data-login-form]").addEventListener("submit", async event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const apiUrl = String(form.get("apiUrl") || "").trim();
    if (apiUrl) localStorage.setItem("morefun_api_base_url", apiUrl);
    try {
      const data = await action("admin.login", { password: String(form.get("password") || "") }, {});
      localStorage.setItem(TOKEN_KEY, data.admin_token);
      localStorage.setItem(ADMIN_ID_KEY, data.role || "owner");
      state.status = null;
      navigate("/admin/dashboard");
    } catch (err) {
      setStatus("error", humanError(err.message));
    }
  });
}

function dashboardMarkup() {
  const data = state.dashboard || {};
  const metrics = [
    ["今日訂單", data.today_orders_count ?? data.orders_today ?? "-"],
    ["今日營業額", data.today_revenue ?? data.revenue_today ?? "-"],
    ["售罄商品", data.sold_out_count ?? data.sold_out_items?.length ?? "-"],
    ["付款方式", data.payment_methods?.length ?? "-"]
  ];
  return `
    <section class="page-head">
      <h1>今日概覽</h1>
      <p>從後台資料讀取今日訂單、營業額、售罄與付款方式概覽。</p>
    </section>
    <section class="panel" style="margin-top:16px">
      <div class="summary-grid">
        ${metrics.map(([label, value]) => `<div class="metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(String(value))}</strong></div>`).join("")}
      </div>
      ${statusMarkup()}
    </section>
  `;
}

function pageMarkup() {
  const config = pageConfigs[state.route];
  const resource = config.resources[state.activeResource] || config.resources[0];
  return `
    <section class="page-head">
      <h1>${escapeHtml(config.title)}</h1>
      <p>${escapeHtml(config.description)}</p>
    </section>
    <section class="content-grid">
      <div class="panel">
        <div class="tabs">
          ${config.resources.map((item, index) => `<button class="tab ${index === state.activeResource ? "active" : ""}" data-resource="${index}">${escapeHtml(item.label)}</button>`).join("")}
        </div>
        <div class="toolbar">
          <input data-search placeholder="搜尋已載入資料" />
          <button class="secondary" data-refresh-resource>重新載入</button>
        </div>
        ${resource.readOnly ? `<p class="read-only-note">此頁只供查看，不會提供修改按鈕。</p>` : ""}
        ${tableMarkup(resource)}
      </div>
      <aside class="panel">
        <h2>${resource.readOnly ? "內容詳情" : "表單修改"}</h2>
        ${editorMarkup(resource)}
        ${statusMarkup()}
      </aside>
    </section>
  `;
}

function tableMarkup(resource) {
  if (state.loading) return `<div class="empty">正在載入 ${escapeHtml(resource.label)}...</div>`;
  if (!state.rows.length) return `<div class="empty">暫時未載入資料。</div>`;
  const rows = filteredRows();
  if (!rows.length) return `<div class="empty">找不到符合搜尋的資料。</div>`;
  const headers = preferredHeaders(rows);
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${headers.map(h => `<th>${escapeHtml(h)}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows.map((row, index) => `
            <tr data-row="${index}">
              ${headers.map(h => `<td><div class="cell-text">${escapeHtml(formatValue(row[h]))}</div></td>`).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function editorMarkup(resource) {
  const selected = state.selected;
  if (!selected) {
    return `<div class="empty">請先選擇一筆資料${resource.readOnly ? "查看" : "修改"}。</div>`;
  }
  if (resource.readOnly) {
    return `
      <div class="detail-list">
        ${Object.entries(selected).map(([key, value]) => `
          <div class="detail-row">
            <span>${escapeHtml(fieldLabel(key))}</span>
            <strong>${escapeHtml(formatValue(value))}</strong>
          </div>
        `).join("")}
      </div>
      <div class="actions" style="margin-top:12px">
        <button class="secondary" data-copy-summary>複製內容</button>
      </div>
    `;
  }
  return `
    <div class="form-grid" data-row-form>
      ${Object.entries(selected).map(([key, value]) => fieldMarkup(key, value)).join("")}
    </div>
    <div class="actions" style="margin-top:12px">
      <button class="primary" data-save-row>儲存修改</button>
      <button class="secondary" data-reset-row>還原</button>
    </div>
  `;
}

function fieldMarkup(key, value) {
  const label = fieldLabel(key);
  const attr = escapeAttr(key);
  if (isBooleanField(key, value)) {
    return `
      <label class="form-field form-switch">
        <span>${escapeHtml(label)}</span>
        <select data-field="${attr}" data-type="boolean">
          <option value="true" ${Booleanish(value) ? "selected" : ""}>開啟</option>
          <option value="false" ${!Booleanish(value) ? "selected" : ""}>關閉</option>
        </select>
      </label>
    `;
  }
  if (isStatusField(key)) {
    return `
      <label class="form-field">
        <span>${escapeHtml(label)}</span>
        <select data-field="${attr}">
          ${statusOptions(value)}
        </select>
      </label>
    `;
  }
  if (isLongTextField(key, value)) {
    return `
      <label class="form-field wide">
        <span>${escapeHtml(label)}</span>
        <textarea data-field="${attr}">${escapeHtml(value ?? "")}</textarea>
      </label>
    `;
  }
  const inputType = isNumberField(key, value) ? "number" : isUrlField(key) ? "url" : "text";
  const step = inputType === "number" ? ` step="${isPriceField(key) ? "0.1" : "1"}"` : "";
  return `
    <label class="form-field">
      <span>${escapeHtml(label)}</span>
      <input data-field="${attr}" type="${inputType}" value="${escapeAttr(value ?? "")}"${step} />
    </label>
  `;
}

function fieldLabel(key) {
  const labels = {
    product_id: "商品編號",
    product_name: "商品名稱",
    display_name: "顯示名稱",
    category_id: "分類",
    tag_id: "標籤",
    price: "價格",
    base_price: "基本價格",
    add_price: "加價",
    image_url: "圖片 URL",
    qr_code_image_url: "QR 圖片 URL",
    sort_order: "排序",
    enabled: "啟用",
    is_active: "啟用",
    is_visible: "前台顯示",
    is_hidden: "隱藏",
    availability_status: "供應狀態",
    sold_out_reason: "售罄原因",
    auto_restore_daily: "每日自動恢復",
    setting_key: "設定項目",
    setting_value: "設定內容",
    flag_key: "功能項目",
    rule_key: "規則項目",
    rule_value: "規則內容",
    title: "標題",
    subtitle: "副標題",
    body: "內容",
    content: "內容",
    label: "名稱",
    description: "說明",
    payment_method_id: "付款方式",
    whatsapp_output_label: "WhatsApp 顯示名稱"
  };
  return labels[key] || key.replaceAll("_", " ");
}

function isBooleanField(key, value) {
  return typeof value === "boolean" || /^(is_|has_|requires_|allow_|show_|hide_)/.test(key) || ["enabled", "visible", "active", "auto_restore_daily"].includes(key);
}

function isStatusField(key) {
  return key.includes("status") || key === "availability_status";
}

function statusOptions(value) {
  const options = [
    ["available", "可供應"],
    ["sold_out", "售罄"],
    ["hidden", "隱藏"],
    ["paused", "暫停"],
    ["active", "啟用"],
    ["inactive", "停用"]
  ];
  const current = String(value ?? "");
  if (current && !options.some(([v]) => v === current)) options.unshift([current, current]);
  return options.map(([v, label]) => `<option value="${escapeAttr(v)}" ${current === v ? "selected" : ""}>${escapeHtml(label)}</option>`).join("");
}

function isNumberField(key, value) {
  return isPriceField(key) || key.includes("sort") || key.includes("count") || (typeof value === "number" && Number.isFinite(value));
}

function isPriceField(key) {
  return key.includes("price") || key.includes("amount") || key.includes("fee");
}

function isUrlField(key) {
  return key.includes("url") || key.includes("image") || key.includes("qr");
}

function isLongTextField(key, value) {
  return key.includes("description") || key.includes("content") || key.includes("body") || key.includes("note") || String(value ?? "").length > 80;
}

function statusMarkup() {
  if (!state.status) return "";
  return `<div class="status ${state.status.type}">${escapeHtml(state.status.message)}</div>`;
}

function bindShell() {
  app().querySelectorAll("[data-route]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      navigate(link.getAttribute("data-route"));
    });
  });
  app().querySelector("[data-logout]")?.addEventListener("click", () => {
    localStorage.removeItem(TOKEN_KEY);
    navigate("/admin/login");
  });
  app().querySelector("[data-refresh]")?.addEventListener("click", loadCurrent);
  app().querySelector("[data-refresh-resource]")?.addEventListener("click", loadCurrent);
  app().querySelectorAll("[data-resource]").forEach(tab => {
    tab.addEventListener("click", () => {
      state.activeResource = Number(tab.getAttribute("data-resource"));
      state.selected = null;
      state.selectedText = "";
      state.status = null;
      render();
      loadCurrent();
    });
  });
  app().querySelector("[data-search]")?.addEventListener("input", event => {
    state.search = event.target.value;
    render();
  });
  app().querySelectorAll("[data-row]").forEach((rowEl, visibleIndex) => {
    rowEl.addEventListener("click", () => {
      const row = filteredRows()[visibleIndex];
      state.selected = row;
      state.selectedText = JSON.stringify(row, null, 2);
      state.status = null;
      render();
    });
  });
  app().querySelector("[data-reset-row]")?.addEventListener("click", () => {
    state.selectedText = JSON.stringify(state.selected, null, 2);
    render();
  });
  app().querySelector("[data-copy-summary]")?.addEventListener("click", async () => {
    await navigator.clipboard.writeText(Object.entries(state.selected || {}).map(([key, value]) => `${fieldLabel(key)}：${formatValue(value)}`).join("\n"));
    setStatus("ok", "已複製內容。");
  });
  app().querySelector("[data-save-row]")?.addEventListener("click", saveSelectedRow);
  app().querySelectorAll("[data-field]").forEach(field => {
    field.addEventListener("input", updateSelectedFromForm);
    field.addEventListener("change", updateSelectedFromForm);
  });
}

function updateSelectedFromForm() {
  const next = { ...(state.selected || {}) };
  app().querySelectorAll("[data-field]").forEach(field => {
    const key = field.getAttribute("data-field");
    if (!key) return;
    let value = field.value;
    if (field.getAttribute("data-type") === "boolean") {
      value = value === "true";
    } else if (field.type === "number") {
      value = value === "" ? "" : Number(value);
    }
    next[key] = value;
  });
  state.selectedText = JSON.stringify(next, null, 2);
}

async function loadCurrent() {
  if (!token()) return;
  if (state.route === "/admin/dashboard") {
    state.loading = true;
    render();
    try {
      state.dashboard = await action("admin.dashboard.read");
      state.loading = false;
      setStatus("ok", "今日概覽已載入。");
    } catch (err) {
      state.loading = false;
      setStatus("error", humanError(err.message));
    }
    return;
  }

  const config = pageConfigs[state.route];
  if (!config) return;
  const resource = config.resources[state.activeResource] || config.resources[0];
  state.loading = true;
  state.rows = [];
  state.selected = null;
  state.selectedText = "";
  render();
  try {
    const data = await action(resource.read, { limit: 500 });
    state.rows = extractRows(data, resource);
    state.loading = false;
    state.status = { type: "ok", message: `${resource.label}已載入。` };
    render();
  } catch (err) {
    state.loading = false;
    state.status = { type: "error", message: humanError(err.message) };
    render();
  }
}

function extractRows(data, resource) {
  if (!data) return [];
  if (Array.isArray(data.rows)) return data.rows;
  if (resource.homepageTarget === "config") return data.config?.rows || rowsFromObject(data.config?.config || data.config);
  if (resource.homepageTarget === "banner") return data.banners?.rows || data.banners || [];
  if (resource.homepageTarget === "announcement") return data.announcements?.rows || data.announcements || [];
  if (resource.recommendationTarget === "section") return data.sections?.rows || data.sections || [];
  if (resource.recommendationTarget === "pool") return data.pools?.rows || data.pools || [];
  if (Array.isArray(data.audit_logs)) return data.audit_logs;
  if (Array.isArray(data.orders)) return data.orders;
  return rowsFromObject(data);
}

function rowsFromObject(value) {
  if (!value || typeof value !== "object") return [];
  return Object.entries(value).map(([key, item]) => (
    item && typeof item === "object" ? { key, ...item } : { key, value: item }
  ));
}

function filteredRows() {
  const q = String(state.search || "").trim().toLowerCase();
  if (!q) return state.rows;
  return state.rows.filter(row => JSON.stringify(row).toLowerCase().includes(q));
}

function preferredHeaders(rows) {
  const all = Array.from(new Set(rows.flatMap(row => Object.keys(row))));
  const preferred = [
    "order_id", "order_number", "product_id", "product_name", "category_id", "tag_id",
    "payment_method_id", "label", "enabled", "availability_status", "setting_key",
    "setting_value", "flag_key", "rule_key", "rule_value", "created_at", "updated_at"
  ];
  return [...preferred.filter(h => all.includes(h)), ...all.filter(h => !preferred.includes(h))].slice(0, 8);
}

async function saveSelectedRow() {
  const config = pageConfigs[state.route];
  const resource = config.resources[state.activeResource] || config.resources[0];
  if (!resource.update || resource.readOnly) return;

  let row;
  try {
    row = JSON.parse(state.selectedText);
  } catch {
    setStatus("error", "表單資料格式不正確，請先檢查欄位。");
    return;
  }

  const lower = JSON.stringify(row).toLowerCase();
  if (forbiddenText.some(term => lower.includes(term.toLowerCase()))) {
    setStatus("error", "這項修改包含鎖定規格禁止的內容，未儲存。");
    return;
  }

  if (!confirm(`確認儲存「${resource.label}」修改？系統會寫入操作紀錄。`)) return;
  if (needsRiskConfirm(row) && !confirm("你正在把內容設為售罄、停用或隱藏，會即時影響前台顯示，確定要繼續？")) return;

  try {
    const payload = updatePayload(row, resource);
    await action(resource.update, payload);
    state.selected = row;
    state.selectedText = JSON.stringify(row, null, 2);
    setStatus("ok", "已儲存，後台已寫入操作紀錄。");
    await loadCurrent();
  } catch (err) {
    setStatus("error", humanError(err.message));
  }
}

function needsRiskConfirm(row) {
  return Object.entries(row || {}).some(([key, value]) => {
    const k = key.toLowerCase();
    const v = String(value).toLowerCase();
    if (k.includes("availability_status") && ["sold_out", "hidden", "paused"].includes(v)) return true;
    if (["enabled", "is_active", "is_visible", "visible", "active"].includes(k) && !Booleanish(value)) return true;
    if (["is_hidden", "hidden", "is_sold_out"].includes(k) && Booleanish(value)) return true;
    return false;
  });
}

function humanError(message) {
  if (String(message).includes("UNAUTHORIZED")) return "登入已過期，請重新登入後再試。";
  if (String(message).includes("Invalid response")) return "後台暫時沒有回應，請稍後再試。";
  return `未能儲存：${message}`;
}

function updatePayload(row, resource) {
  const clean = sanitizeRow(row, resource);

  if (resource.availabilityMode) {
    return {
      records: [{
        product_id: clean.product_id,
        availability_status: clean.availability_status || (clean.is_sold_out ? "sold_out" : "available"),
        sold_out_reason: clean.sold_out_reason || "",
        auto_restore_daily: clean.auto_restore_daily ?? true
      }]
    };
  }

  if (resource.keyValue) {
    return {
      [resource.keyValue.key]: clean[resource.keyValue.key] || clean.key,
      [resource.keyValue.value]: clean[resource.keyValue.value] ?? clean.value ?? ""
    };
  }

  if (resource.featureFlag) {
    return { flag_key: clean.flag_key || clean.key, enabled: Booleanish(clean.enabled) };
  }

  if (resource.homepageTarget) {
    return { target: resource.homepageTarget, ...clean };
  }

  if (resource.recommendationTarget) {
    return { target: resource.recommendationTarget, ...clean };
  }

  if (resource.paymentSafe) {
    clean.requires_upload = false;
    if (clean.payment_method_id !== "cash_on_pickup") {
      clean.payment_status_output = "待店舖確認";
    }
  }

  return { records: [clean] };
}

function sanitizeRow(row, resource) {
  const clean = { ...row };
  delete clean.payment_upload_url;
  delete clean.payment_proof_url;
  delete clean.payment_verified;
  delete clean.paid;
  delete clean.delivery_status;
  delete clean.live_status;
  if (resource.idField && clean[resource.idField] === undefined && clean.key !== undefined) {
    clean[resource.idField] = clean.key;
  }
  return clean;
}

function Booleanish(value) {
  if (typeof value === "boolean") return value;
  return ["true", "1", "yes", "enabled", "active"].includes(String(value).toLowerCase());
}

function formatValue(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

render();
if (state.route !== "/admin/login" && token()) {
  loadCurrent();
}
