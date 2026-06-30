import { morefunAction } from "./morefunApiClient.js";

const app = document.getElementById("app");
const CART_KEY = "morefun_memory_jar";
const CUSTOMER_KEY = "morefun_customer";
const PAYMENT_KEY = "morefun_payment_method";
const ORDERS_KEY = "morefun_local_orders";
const MENU_CACHE_KEY = "morefun.menu.cache.v1";
const MENU_CACHE_TTL_MS = 10 * 60 * 1000;

const state = {
  route: normalizeRoute(location.pathname),
  loading: true,
  error: "",
  settings: {},
  flags: {},
  home: null,
  menu: { categories: [], products: [], availability: [] },
  paymentMethods: [],
  productDetail: null,
  cart: loadCart(),
  cartCalc: null,
  selectedCategory: "POPULAR",
  selectedPayment: localStorage.getItem(PAYMENT_KEY) || "",
  customer: loadCustomer(),
  orders: [],
  memory: null,
  detailDrafts: {},
  addingKeys: new Set()
};

let basicsPromise = null;
let homePromise = null;
let menuPromise = null;
let paymentsPromise = null;

// Fallback navigation until navigation.get is wired into the frontend.
const navItems = [
  ["/", "首頁"],
  ["/menu", "點單"],
  ["/orders", "我的訂單"],
  ["/member", "我的記憶"]
];

const forbiddenPaymentIds = new Set(["octopus", "credit_card", "apple_pay", "google_pay", "other_wallet"]);

function normalizeRoute(path) {
  const clean = (path || "/").replace(/\/$/, "") || "/";
  if (clean === "/memory") return "/member";
  if (clean === "/cart") return "/memory-jar";
  return clean;
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
  calculateCart();
}

function loadCustomer() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOMER_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveCustomer() {
  localStorage.setItem(CUSTOMER_KEY, JSON.stringify(state.customer));
}

function loadLocalOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveLocalOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

async function init() {
  applyAuditFlagsFromUrl();
  renderShell();
  if (state.route === "/menu" && useCachedMenu()) {
    state.loading = false;
    render();
    ensureBasics().then(render).catch(() => {});
    refreshMenuInBackground();
    return;
  }
  render();
  await Promise.allSettled(initialLoadersForRoute(state.route));
  state.loading = false;
  await routeLoader();
  render();
}

function initialLoadersForRoute(route) {
  const loaders = [ensureBasics()];
  if (route === "/") loaders.push(ensureHome(), ensureMenu());
  else if (route === "/menu") loaders.push(ensureMenu());
  else if (route.startsWith("/product/")) loaders.push(ensureMenu());
  else if (route === "/payment") loaders.push(ensurePayments());
  return loaders;
}

function ensureBasics() {
  basicsPromise ||= loadBasics().catch(err => {
    basicsPromise = null;
    throw err;
  });
  return basicsPromise;
}

function ensureHome() {
  if (state.home) return Promise.resolve(state.home);
  homePromise ||= loadHome().catch(err => {
    homePromise = null;
    throw err;
  });
  return homePromise;
}

function ensureMenu() {
  if (state.menu.products?.length) return Promise.resolve(state.menu);
  menuPromise ||= loadMenu().catch(err => {
    menuPromise = null;
    throw err;
  });
  return menuPromise;
}

function ensurePayments() {
  if (state.paymentMethods.length) return Promise.resolve(state.paymentMethods);
  paymentsPromise ||= loadPayments().catch(err => {
    paymentsPromise = null;
    throw err;
  });
  return paymentsPromise;
}

async function loadBasics() {
  const [settings, flags] = await Promise.all([
    morefunAction("settings.read"),
    morefunAction("featureFlags.read")
  ]);
  state.settings = settings.settings || {};
  state.flags = flags.feature_flags || {};
}

async function loadHome() {
  state.home = await morefunAction("homepage.read");
}

async function loadMenu() {
  setMenuData(await morefunAction("menu.read", { include_sold_out: true }));
  writeMenuCache(state.menu);
}

function setMenuData(menu) {
  state.menu = menu || { categories: [], products: [], availability: [] };
  applyAvailability();
  if (!state.selectedCategory && state.menu.categories?.length) {
    state.selectedCategory = state.menu.categories[0].category_id;
  }
}

function readMenuCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(MENU_CACHE_KEY) || "null");
    if (!cached?.menu || Date.now() - Number(cached.cached_at || 0) > MENU_CACHE_TTL_MS) return null;
    return cached.menu;
  } catch {
    return null;
  }
}

function writeMenuCache(menu) {
  try {
    localStorage.setItem(MENU_CACHE_KEY, JSON.stringify({ cached_at: Date.now(), menu }));
  } catch {
    // Cache is optional; ignore storage limits or private-mode failures.
  }
}

function useCachedMenu() {
  const cached = readMenuCache();
  if (!cached) return false;
  setMenuData(cached);
  return true;
}

function refreshMenuInBackground() {
  menuPromise = loadMenu()
    .then(() => {
      if (!state.loading) render();
      return state.menu;
    })
    .catch(() => {
      menuPromise = null;
    });
  return menuPromise;
}

function applyAvailability() {
  const availability = state.menu.availability || state.menu.product_availability || [];
  const byId = new Map(availability.map(row => [String(row.product_id), row]));
  state.menu.products = (state.menu.products || []).map(product => {
    const row = byId.get(String(product.product_id));
    return row ? { ...product, ...row } : product;
  });
}

async function loadPayments() {
  const data = await morefunAction("payment.methods.read");
  state.paymentMethods = (data.methods || [])
    .filter(m => !forbiddenPaymentIds.has(String(m.payment_method_id)));
  const methods = supportedPaymentMethods();
  if (!state.selectedPayment && methods.length) {
    state.selectedPayment = methods[0].payment_method_id;
  }
}

function applyAuditFlagsFromUrl() {
  const params = new URLSearchParams(location.search);
  if (params.get("audit_zimi") === "1") localStorage.setItem("morefun_audit_zimi", "1");
  if (params.get("audit_zimi") === "0") localStorage.removeItem("morefun_audit_zimi");
  if (params.get("purple_audit") === "1") localStorage.setItem("morefun_purple_audit", "1");
  if (params.get("purple_audit") === "0") localStorage.removeItem("morefun_purple_audit");
}

async function routeLoader() {
  if (state.route === "/") {
    await Promise.allSettled([ensureHome(), ensureMenu()]);
  }
  if (state.route === "/menu") {
    await ensureMenu();
  }
  if (state.route === "/payment") {
    await ensurePayments();
  }
  if (state.route.startsWith("/product/")) {
    await ensureMenu();
    const productId = decodeURIComponent(state.route.split("/").pop());
    try {
      state.productDetail = await morefunAction("product.detail.read", { product_id: productId });
    } catch (err) {
      state.error = err.message;
    }
  }
  if (state.route === "/memory-jar") {
    await calculateCart();
  }
  if (state.route === "/orders") {
    await loadOrders();
  }
  if (state.route === "/member") {
    await loadMemory();
  }
}

async function calculateCart() {
  try {
    const items = state.cart.map(item => ({
      temp_item_id: item.temp_item_id,
      product_id: item.product_id,
      product_type: item.product_type,
      quantity: item.quantity,
      configuration: item.configuration || {}
    }));
    state.cartCalc = await morefunAction("cart.calculate", { items, coupon_ids: [] });
  } catch {
    state.cartCalc = {
      items: state.cart,
      summary: {
        item_subtotal_before_packaging: cartSubtotal(),
        packaging_fee_total: 0,
        item_subtotal: cartSubtotal(),
        discount_total: 0,
        total_amount: cartSubtotal()
      },
      warnings: ["部分餐點需要重新確認。"]
    };
  }
}

async function loadOrders() {
  const localOrders = loadLocalOrders().filter(order => order.visible_to_customer !== false);
  if (!state.customer.phone) {
    state.orders = localOrders;
    return;
  }
  try {
    const data = await morefunAction("order.history.read", { customer_phone: state.customer.phone });
    const remoteOrders = data.orders || data.rows || [];
    state.orders = [...localOrders, ...remoteOrders];
  } catch {
    state.orders = localOrders;
  }
}

async function loadMemory() {
  if (!state.customer.phone) {
    state.memory = null;
    return;
  }
  try {
    const identify = await morefunAction("customer.identify", {
      phone: state.customer.phone,
      display_name: state.customer.name || ""
    });
    const customerId = identify.customer?.customer_id || identify.customer_id || state.customer.phone;
    const [memory, badges] = await Promise.allSettled([
      morefunAction("customer.memory.read", { customer_id: customerId }),
      morefunAction("badge.list", { customer_id: customerId })
    ]);
    state.memory = {
      customer_id: customerId,
      data: memory.status === "fulfilled" ? memory.value : {},
      badges: badges.status === "fulfilled" ? badges.value : {}
    };
  } catch {
    state.memory = null;
  }
}

function navigate(path) {
  history.pushState({}, "", path);
  state.route = normalizeRoute(path);
  state.error = "";
  state.productDetail = null;
  render();
  routeLoader().then(render);
}

window.addEventListener("popstate", () => {
  state.route = normalizeRoute(location.pathname);
  routeLoader().then(render);
});

function renderShell() {
  app.innerHTML = `<main class="mf-app"><div class="mf-shell"><div class="mf-phone" data-view></div>${bottomNav()}</div></main>`;
  app.addEventListener("click", handleClick);
  app.addEventListener("input", handleInput);
  app.addEventListener("change", handleChange);
  app.addEventListener("submit", handleSubmit);
}

function render() {
  const view = app.querySelector("[data-view]");
  if (!view) return;
  if (state.loading) {
    view.innerHTML = loadingPage();
    return;
  }
  if (state.error) {
    view.innerHTML = `${header()}<div class="mf-error">${esc(state.error)}</div>`;
    return;
  }

  if (state.route === "/") view.innerHTML = homePage();
  else if (state.route === "/menu") view.innerHTML = menuPage();
  else if (state.route.startsWith("/product/")) view.innerHTML = productDetailPage();
  else if (state.route === "/memory-jar") view.innerHTML = memoryJarPage();
  else if (state.route === "/orders") view.innerHTML = ordersPage();
  else if (state.route === "/payment") view.innerHTML = paymentPage();
  else if (state.route === "/member") view.innerHTML = memberPage();
  else view.innerHTML = notFoundPage();

  app.querySelector(".mf-bottom-nav")?.remove();
  app.querySelector(".mf-app").insertAdjacentHTML("beforeend", bottomNav());
}

function header() {
  const status = hongKongBusinessStatus();
  return `
    <header class="mf-header">
      <div class="mf-brand">
        <strong>磨飯 MORE FUN</strong>
        <span>${esc(state.settings.brand_slogan || "陪伴大家長大的地方")}</span>
      </div>
      <div class="mf-status">
        <b>${esc(status.label)}</b>
        <span>${esc(status.detail)}</span>
      </div>
    </header>
  `;
}

function loadingPage() {
  const cards = Array.from({ length: 4 }, (_, index) => `
    <article class="mf-skeleton-card ${index === 0 ? "featured" : ""}">
      <div class="mf-skeleton-img"></div>
      <div class="mf-skeleton-copy">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </article>
  `).join("");
  return `
    ${header()}
    <section class="mf-loading-page" aria-live="polite" aria-busy="true">
      <div class="mf-loading-title">
        <b>正在準備餐單…</b>
        <span>磨飯幫你拎緊今日餐點</span>
      </div>
      <div class="mf-skeleton-list">${cards}</div>
    </section>
  `;
}

function hongKongBusinessStatus() {
  const manual = String(state.settings.operation_store_status || "").toLowerCase();
  if (["closed", "paused", "manual_closed"].includes(manual)) {
    return { open: false, label: "● 休息中", detail: state.settings.operation_closed_banner_text || "稍後再來" };
  }
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Hong_Kong",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(new Date());
  const hour = Number(parts.find(part => part.type === "hour")?.value || 0);
  const minute = Number(parts.find(part => part.type === "minute")?.value || 0);
  const now = hour * 60 + minute;
  const openAt = timeToMinutes(state.settings.business_open_time || state.settings.open_time || "08:00");
  const closeAt = timeToMinutes(state.settings.business_close_time || state.settings.close_time || "20:00");
  const isOpen = openAt <= closeAt ? now >= openAt && now < closeAt : now >= openAt || now < closeAt;
  return {
    open: isOpen,
    label: isOpen ? "● 可下單" : "● 休息中",
    detail: isOpen ? `${formatMinutes(closeAt)} 截單` : `${formatMinutes(openAt)} 開始`
  };
}

function timeToMinutes(value) {
  if (typeof value === "number") return Math.round(value * 24 * 60);
  const match = String(value || "").match(/(\d{1,2}):(\d{2})/);
  return match ? Number(match[1]) * 60 + Number(match[2]) : 8 * 60;
}

function formatMinutes(value) {
  const minutes = ((Number(value) % 1440) + 1440) % 1440;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

function homePage() {
  const home = state.home || {};
  const banners = activeRows(home.banners || []);
  const banner = banners[0] || {};
  const announcements = activeRows(home.announcements || []);
  const recommended = popularProducts().slice(0, 3);
  const shopQuote =
    state.settings.shop_quote ||
    state.settings.home_shop_quote ||
    state.settings.store_quote ||
    banner.shop_quote ||
    banner.price_label ||
    "今日都要好好食飯";
  return `
    ${header()}
    <section class="mf-hero" data-go="${targetPath(banner) || "/menu"}">
      <div class="mf-hero-copy">
        <h1>${esc(banner.title || "今日都要好好食飯")}</h1>
        <p>${esc(banner.subtitle || "紫米飯糰、便當、小食與飲品，到店自取。")}</p>
        <strong>${esc(shopQuote)}</strong>
      </div>
      <div class="mf-hero-media">${banner.image_url ? `<img src="${esc(banner.image_url)}" alt="">` : ""}</div>
    </section>
    <div class="mf-strip">到店自取｜${esc(state.settings.operation_sold_out_banner_text || "實際取餐時間以 WhatsApp 確認為準")}</div>
    ${announcements.length ? `<div class="mf-notice"><b>${esc(announcements[0].title || "重要公告")}</b><br>${esc(announcements[0].body || announcements[0].content || "")}</div>` : ""}
    <section class="mf-section">
      <div class="mf-section-head"><h2>人氣推薦</h2><span>精選 3 款</span></div>
      <div class="mf-grid-3">${recommended.map(productCard).join("")}</div>
    </section>
    <section class="mf-section">
      <div class="mf-quick">
        <button data-go="/member">我的回憶<span>${memorySeedText()}</span></button>
        <button data-go="/orders">最近訂單<span>${state.customer.phone ? "查看紀錄" : "下單後會記低"}</span></button>
        <button data-go="/member">優惠券<span>查看可用小心意</span></button>
      </div>
    </section>
  `;
}

function menuPage() {
  const cats = menuCategories();
  const preferred = state.selectedCategory || cats[0]?.category_id || "POPULAR";
  const active = cats.some(c => c.category_id === preferred) ? preferred : (cats[0]?.category_id || "POPULAR");
  const products = productsForCategory(active);
  return `
    <div class="mf-order-page">
      ${header()}
      <div class="mf-menu-search">
        <input class="mf-search" data-search-products placeholder="搜尋想吃的..." />
      </div>
      <section class="mf-menu-layout" aria-label="點單餐牌">
      <aside class="mf-side-cats">
        ${cats.map(c => `<button class="${c.category_id === active ? "active" : ""}" data-cat="${esc(c.category_id)}"><span>${esc(categoryIcon(c))}</span>${esc(categoryName(c))}</button>`).join("")}
      </aside>
      <div class="mf-list product-scroll">
        ${purpleRiceSoldOutNotice()}
        ${products.map((p, i) => i < 5 ? menuProductCard(p, i) : listProductRow(p)).join("") || `<div class="mf-empty">暫時未有餐點。</div>`}
      </div>
      </section>
      ${jarBar()}
    </div>
  `;
}

function productDetailPage() {
  const detail = state.productDetail;
  const product = detail?.product || findProduct(decodeURIComponent(state.route.split("/").pop())) || {};
  const recs = relatedProducts(product).slice(0, 3);
  const draft = detailDraft(product);
  const total = detailTotal(product, draft);
  const sold = isSoldOut(product);
  return `
    ${header()}
    <section class="mf-detail-page">
      <img class="mf-detail-img" src="${esc(product.image_url || "")}" alt="" loading="lazy">
      ${sold ? `<div class="mf-notice"><b>今日暫停供應</b><br>此餐點目前不可加入記憶罐。</div>` : ""}
      <section class="mf-section">
        <div class="mf-section-head"><h2>${esc(product.product_name || "餐點詳情")}</h2><span>${price(product.base_price)}</span></div>
        <p class="mf-muted">${esc(product.description || product.tags_text || "選好後加入記憶罐，再到確認頁送出 WhatsApp。")}</p>
      </section>
      ${detailControls(product, draft)}
      <section class="mf-section">
        <div class="mf-section-head"><h2>你可能都鍾意</h2><span>推薦餐點</span></div>
        <div class="mf-grid-3">${recs.map(productCard).join("")}</div>
      </section>
    </section>
    ${detailBottomArea(product, draft, total, sold)}
  `;
}

function detailDraft(product) {
  const id = product.product_id || "unknown";
  if (!state.detailDrafts[id]) {
    state.detailDrafts[id] = {
      quantity: 1,
      remark: "",
      riceBase: "肉燥飯",
      ingredientAdjustments: {},
      cheese: false,
      drink: "檸檬飲品｜已包含",
      drinkDelta: 0,
      snack: "",
      snackDelta: 0,
      addonRiceball: "",
      addonRiceballDelta: 0,
      bentoAdjustments: {},
      openGroup: ""
    };
  }
  return state.detailDrafts[id];
}

function detailControls(product, draft) {
  const kind = productKind(product);
  if (kind === "bento") return bentoControls(product, draft);
  if (kind === "riceball") return riceballControls(product, draft);
  if (kind === "drink") return drinkControls(product, draft);
  return smartComboControls(product, draft, "加配飲品", "加配飯糰");
}

function riceballControls(product, draft) {
  const ingredients = ["肉鬆", "青瓜", "西生菜", "薄脆", "沙律醬"];
  return `
    <section class="mf-section">
      <div class="mf-section-head"><h2>配料</h2><span>可多 / 少 / 走</span></div>
      <div class="mf-chip-row">
        ${ingredients.map(name => ingredientChip(name, draft)).join("")}
        <button class="mf-chip ${draft.cheese ? "selected" : "dashed"}" data-detail-toggle="cheese">+ 芝士 $4</button>
      </div>
      ${detailPopover(draft)}
    </section>
    ${smartComboControls(product, draft, "加配飲品（飯糰加購價）", "加配小食（單點價）")}
  `;
}

function ingredientChip(name, draft) {
  const value = draft.ingredientAdjustments[name];
  return `<button class="mf-chip ${value ? "selected" : ""}" data-detail-group="${esc(name)}">${esc(value ? `${name}・${value}` : name)}</button>`;
}

function detailPopover(draft) {
  if (!draft.openGroup) return "";
  if (draft.openGroup === "檸檬飲品") {
    return `
      <div class="mf-popover">
        <b>檸檬飲品</b>
        <span>熱飲｜已包含</span>
        ${["熱檸茶", "熱檸水"].map(v => `<button data-detail-drink="${v}" data-price="0">${v}</button>`).join("")}
        <span>想飲凍啲？</span>
        ${["凍檸茶 +$3", "凍檸水 +$3"].map(v => `<button data-detail-drink="${v}" data-price="3">${v}</button>`).join("")}
        <span>其他</span>
        <button data-detail-drink="無需飲品 -$1" data-price="-1">無需飲品 -$1</button>
      </div>
    `;
  }
  const bentoOptions = bentoPopoverOptions(draft.openGroup);
  const values = bentoOptions.length ? bentoOptions : ["多", "少", "走"];
  return `
    <div class="mf-popover">
      <b>${esc(draft.openGroup)}</b>
      ${values.map(opt => `<button data-detail-pick="${esc(opt.label || opt)}" data-price="${Number(opt.price || 0)}">${esc(opt.label || opt)}</button>`).join("")}
    </div>
  `;
}

function smartComboControls(product, draft, drinkTitle, addonTitle) {
  return `
    ${mealDrinkSelector(draft)}
    <section class="mf-section">
      <div class="mf-section-head"><h2>${esc(addonTitle)}</h2><span>按需要加配</span></div>
      <div class="mf-chip-row">${addonOptions(addonTitle).map(opt => `<button class="mf-chip ${draft.snack === opt.label || draft.addonRiceball === opt.label ? "selected" : ""}" data-detail-addon="${esc(addonTitle)}" data-label="${esc(opt.label)}" data-price="${Number(opt.price)}">${esc(opt.label)} ${opt.price ? price(opt.price) : ""}</button>`).join("")}</div>
    </section>
  `;
}

function drinkControls(product, draft) {
  const variants = [
    ["正常冰", 0],
    ["少冰", 0],
    ["走冰", 0],
    ["少甜", 0],
    ["走甜", 0]
  ];
  return `
    <section class="mf-section">
      <div class="mf-section-head"><h2>飲品選項</h2><span>可點選</span></div>
      <div class="mf-chip-row">
        ${variants.map(([label, delta]) => `<button class="mf-chip ${draft.drink === label ? "selected" : ""}" data-detail-drink="${label}" data-price="${delta}">${label}</button>`).join("")}
      </div>
    </section>
    <section class="mf-section">
      <div class="mf-section-head"><h2>加配飯糰</h2><span>自選套餐引導</span></div>
      <div class="mf-chip-row">${addonOptions("飯糰").map(opt => `<button class="mf-chip ${draft.addonRiceball === opt.label ? "selected" : ""}" data-detail-addon="飯糰" data-label="${esc(opt.label)}" data-price="${Number(opt.price)}">${esc(opt.label)} ${price(opt.price)}</button>`).join("")}</div>
    </section>
    <section class="mf-section">
      <div class="mf-section-head"><h2>加配小食</h2><span>單點價</span></div>
      <div class="mf-chip-row">${addonOptions("snack").map(opt => `<button class="mf-chip ${draft.snack === opt.label ? "selected" : ""}" data-detail-addon="snack" data-label="${esc(opt.label)}" data-price="${Number(opt.price)}">${esc(opt.label)} ${price(opt.price)}</button>`).join("")}</div>
    </section>
  `;
}

function mealDrinkSelector(draft) {
  // Fallback meal drink options. Google Sheet Backend should be source of truth.
  const upgrades = [
    ["手打檸檬茶", 10],
    ["台式奶茶", 8],
    ["玄米冷泡茶", 6]
  ];
  return `
    <section class="mf-section">
      <div class="mf-section-head"><h2>套餐飲品</h2><span>先選升級或基本檸檬飲品</span></div>
      <div class="mf-chip-row">
        ${upgrades.map(([label, priceDelta]) => `<button class="mf-chip ${draft.drink === label ? "selected" : ""}" data-detail-drink="${label}" data-price="${priceDelta}">${label} +$${priceDelta}</button>`).join("")}
        <button class="mf-chip ${draft.drink.includes("檸") || draft.drink.includes("無需") ? "selected" : ""}" data-detail-group="檸檬飲品">${esc(draft.drink || "檸檬飲品｜已包含")}</button>
      </div>
      ${draft.openGroup === "檸檬飲品" ? detailPopover(draft) : ""}
    </section>
  `;
}

function bentoControls(product, draft) {
  return `
    <section class="mf-section">
      <div class="mf-section-head"><h2>飯底選擇</h2><span>必選一款</span></div>
      <div class="mf-chip-row">${["肉燥飯", "咖喱飯", "菜飯"].map(v => `<button class="mf-chip ${draft.riceBase === v ? "selected" : ""}" data-rice-base="${v}">${v}</button>`).join("")}</div>
    </section>
    <section class="mf-section">
      <div class="mf-section-head"><h2>${esc(draft.riceBase)}調整</h2><span>按需要調整</span></div>
      <div class="mf-chip-row">${bentoChips(draft).map(chip => `<button class="mf-chip ${draft.bentoAdjustments[chip] ? "selected" : ""}" data-bento-chip="${esc(chip)}">${esc(draft.bentoAdjustments[chip] || chip)}</button>`).join("")}</div>
      ${draft.openGroup && draft.openGroup !== "檸檬飲品" ? detailPopover(draft) : ""}
    </section>
    ${mealDrinkSelector(draft)}
    <section class="mf-section">
      <div class="mf-section-head"><h2>順手加單點</h2><span>加多一份小食</span></div>
      <div class="mf-chip-row">${addonOptions("snack").map(opt => `<button class="mf-chip ${draft.snack === opt.label ? "selected" : ""}" data-detail-addon="snack" data-label="${esc(opt.label)}" data-price="${Number(opt.price)}">${esc(opt.label)} ${price(opt.price)}</button>`).join("")}</div>
    </section>
  `;
}

function bentoChips(draft) {
  if (draft.riceBase === "咖喱飯") return ["飯量", "咖喱調整", "加料", "轉菜飯底 +$7"];
  if (draft.riceBase === "菜飯") return ["飯量", "加料", "走蛋"];
  return ["飯量", "肉燥調整", "加料", "轉菜飯底 +$7", "走蛋"];
}

function bentoPopoverOptions(group) {
  if (group === "飯量") return ["多飯", "少飯", "半飯"];
  if (group === "肉燥調整") return [{ label: "雙倍肉燥 +$7", price: 7 }, "多汁", "少汁", { label: "分上 +$1", price: 1 }];
  if (group === "咖喱調整") return ["多汁", "少汁", { label: "分上 +$1", price: 1 }];
  if (group === "加料") return [{ label: "芝士碎 +$7", price: 7 }, { label: "原片芝士 +$7", price: 7 }, { label: "轉麵 +$2", price: 2 }, { label: "加辣油 +$1", price: 1 }];
  return [];
}

function addonOptions(kind) {
  // Fallback add-on options. Report diffs if Backend API data differs.
  if (/飯糰/.test(kind)) return [{ label: "古早味飯糰", price: 23 }, { label: "芝士泡菜飯糰", price: 28 }, { label: "肉鬆蛋飯糰", price: 28 }];
  return [{ label: "蜜糖雞塊", price: 16 }, { label: "唐揚雞", price: 16 }, { label: "薯角", price: 16 }];
}

function detailBottomArea(product, draft, total, sold) {
  const cartCount = state.cart.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
  return `
    <section class="mf-detail-bottom">
      <div class="mf-detail-inputs">
        <textarea data-detail-remark placeholder="${esc(state.settings.product_note_placeholder || "備註，例如走醬、醬汁分開")}">${esc(draft.remark || "")}</textarea>
        <div class="mf-qty"><span>數量</span><button data-detail-qty="-1">-</button><b>${draft.quantity}</b><button data-detail-qty="1">+</button></div>
      </div>
      <div class="mf-detail-action">
        <div class="mf-mini-jar"><i>罐</i><b>記憶罐</b><span>${cartCount} 件</span></div>
        <div><b>${price(total)}</b><span>${detailSummary(draft)}</span></div>
        <button class="mf-btn" data-add-detail="${esc(product.product_id || "")}" ${sold || state.addingKeys.has(addKey(product, draft)) ? "disabled" : ""}>${sold ? "暫停供應" : "加入記憶罐"}</button>
      </div>
    </section>
  `;
}

function memoryJarPage() {
  const summary = state.cartCalc?.summary || {};
  return `
    ${header()}
    <section class="mf-section">
      <div class="mf-section-head"><h2>記憶罐</h2><span>${state.cart.length} 件</span></div>
      <div class="mf-list">
        ${state.cart.map(cartRow).join("") || `<div class="mf-empty">記憶罐暫時未有餐點。</div>`}
      </div>
    </section>
    <section class="mf-section mf-card" style="padding:14px">
      <div class="mf-section-head"><h2>確認訂單</h2><span>${price(summary.total_amount || cartSubtotal())}</span></div>
      <form class="mf-form" data-customer-form>
        <input name="name" placeholder="稱呼" value="${esc(state.customer.name || "")}" required>
        <input name="phone" placeholder="WhatsApp 電話" value="${esc(state.customer.phone || "")}" required>
        <div class="mf-strip">取餐安排：盡快取餐<br>實際時間以 WhatsApp 回覆確認為準</div>
        <textarea name="pickup_note" placeholder="取餐備註，例如：大約 12:45 到、學生午膳、大量訂單、到門口再通知">${esc(state.customer.pickup_note || "")}</textarea>
        <textarea name="note" placeholder="全單備註，例如：分開袋、餐具 2 套、醬汁分開、有小朋友食">${esc(state.customer.note || "")}</textarea>
        <div class="mf-price-summary">
          <span>商品小計</span><b>${price(summary.item_subtotal || cartSubtotal())}</b>
          <span>包裝費</span><b>${price(summary.packaging_fee_total || 0)}</b>
          <span>總額</span><b>${price(summary.total_amount || cartSubtotal())}</b>
        </div>
        <button class="mf-btn" type="submit">保存聯絡資料</button>
      </form>
    </section>
    <section class="mf-section mf-card" style="padding:14px">
      <div class="mf-section-head"><h2>WhatsApp 訂單預覽</h2><span>送出前確認</span></div>
      <textarea class="mf-whatsapp-preview" readonly>${esc(buildWhatsAppText(currentOrderPayload()))}</textarea>
    </section>
    <section class="mf-section">
      <button class="mf-btn secondary" data-go="/payment">選擇付款方式 / QR Code</button>
      <button class="mf-btn" data-submit-whatsapp style="margin-left:8px">WhatsApp 送出訂單</button>
    </section>
  `;
}

function ordersPage() {
  return `
    ${header()}
    <section class="mf-section">
      <div class="mf-section-head"><h2>我的訂單</h2><span>不做即時狀態追蹤</span></div>
      <div class="mf-order-list">
        ${state.orders.map(orderCard).join("") || `<div class="mf-empty">未有訂單紀錄。下單後會慢慢幫你保存。</div>`}
      </div>
    </section>
  `;
}

function paymentPage() {
  const methods = supportedPaymentMethods();
  const selected = methods.find(m => m.payment_method_id === state.selectedPayment) || methods[0] || {};
  const isCash = selected.payment_method_id === "cash_on_pickup";
  const total = state.cartCalc?.summary?.total_amount || cartSubtotal();
  return `
    ${header()}
    <section class="mf-section">
      <div class="mf-section-head"><h2>付款方式</h2><span>${price(total)}</span></div>
      <div class="mf-payment-list">
        ${methods.map(m => `<button class="mf-payment-card ${m.payment_method_id === selected.payment_method_id ? "selected" : ""}" data-payment="${esc(m.payment_method_id)}"><b>${esc(paymentLabel(m))}</b><br><span>${esc(paymentDescription(m))}</span></button>`).join("")}
      </div>
    </section>
    <section class="mf-section mf-card" style="padding:14px">
      <h2>${esc(paymentLabel(selected))}</h2>
      <p class="mf-muted">${isCash ? "到店取餐時付款，店舖會以 WhatsApp 確認訂單及取餐時間。" : `請使用 ${esc(paymentLabel(selected))} 掃描以下 QR Code 完成付款。店舖會以 WhatsApp 確認付款及取餐時間。`}</p>
      ${!isCash && selected.qr_code_image_url ? `<img class="mf-qr" src="${esc(selected.qr_code_image_url)}" alt="QR Code">` : (!isCash ? `<div class="mf-empty">此付款方式暫未提供 QR，請改用其他付款方式或到店付款。</div>` : "")}
      <div class="mf-strip">付款狀態：${isCash ? "到店付款" : "待店舖確認"}</div>
    </section>
    <section class="mf-section">
      <button class="mf-btn secondary" data-go="/memory-jar">返回確認訂單</button>
    </section>
  `;
}

function memberPage() {
  const memory = state.memory?.data || {};
  const profile = memory.profile || memory.customer || {};
  const summary = memory.summary || memory.memory || {};
  const seeds = Number(summary.memory_seed_count ?? profile.memory_seed_count ?? 0);
  const energy = Number(summary.memory_energy_progress ?? profile.memory_energy_progress ?? 0);
  const coupons = memory.coupons || memory.customer_coupons || [];
  const badges = state.memory?.badges?.badges || memory.badges || [];
  const frequent = memory.frequent_items || memory.customer_frequent_items || popularProducts().slice(0, 3);
  const nextSeed = Math.max(30, Math.ceil((seeds + 1) / 10) * 10);
  const progress = Math.min(100, Math.max(0, energy * 10));
  return `
    ${header()}
    <section class="mf-memory-layout">
      <div class="mf-memory-hero">
        <span>小米粒身份</span>
        <h2>歡迎返嚟，${esc(state.customer.name || "小米粒")}</h2>
        <p>你又為磨飯留低一點回憶。</p>
      </div>
      <section class="mf-memory-seed">
        <div><span>記憶種子</span><strong>${seeds} 顆</strong></div>
        <div><span>記憶能量</span><strong>${energy} / 10</strong></div>
        <div class="mf-progress"><i style="width:${progress}%"></i></div>
        <p>記憶種子不會扣減，只會陪你慢慢累積。</p>
      </section>
      <section class="mf-memory-panel">
        <h2>下一個小心意</h2>
        <p>${nextSeed} 顆記憶種子解鎖<br>凍飲升級券<br>目前：${seeds} / ${nextSeed} 顆</p>
      </section>
      <section class="mf-memory-panel">
        <div class="mf-section-head"><h2>回憶券</h2><span>${coupons.length} 張</span></div>
        <div class="mf-memory-stack">${coupons.map(couponCard).join("") || `<div class="mf-empty">暫時未有回憶券。</div>`}</div>
      </section>
      <section class="mf-memory-panel">
        <div class="mf-section-head"><h2>記憶勳章</h2><span>${badges.length || 1} 個</span></div>
        <div class="mf-badge-row">${(badges.length ? badges : [{ badge_name: "熟悉的小米粒" }]).map(badge => `<span>${esc(badge.badge_name || badge.badge_id || "熟悉的小米粒")}</span>`).join("")}</div>
      </section>
      <section class="mf-memory-panel">
        <div class="mf-section-head"><h2>常購餐點</h2><span>再次點餐</span></div>
        <div class="mf-grid-3">${frequent.slice(0, 3).map(productCard).join("")}</div>
      </section>
      <section class="mf-memory-panel">
        <h2>最近回憶</h2>
        <p>最近常點：${esc(frequent[0]?.product_name || "紫米套餐")}</p>
      </section>
      <section class="mf-memory-panel">
        <h2>我的偏好</h2>
        <p>常飲：${esc(profile.favorite_drink || "台式奶茶")}<br>常見調整：${esc(profile.favorite_adjustment || "沙律醬走")}</p>
      </section>
      <section class="mf-memory-panel">
        <h2>聯絡資料</h2>
        <p>稱呼：${esc(state.customer.name || "未填寫")}<br>WhatsApp：${state.customer.phone ? "已保存" : "未保存"}</p>
        <button class="mf-btn secondary" data-go="/memory-jar">更改聯絡資料</button>
      </section>
    </section>
  `;
}

function notFoundPage() {
  return `${header()}<div class="mf-empty">找不到頁面。</div>`;
}

function productCard(product) {
  const sold = isSoldOut(product);
  const action = productActionButton(product, sold);
  return `
    <article class="mf-product-card mf-card-compact ${sold ? "sold-out" : ""}" data-go="/product/${encodeURIComponent(product.product_id)}">
      ${productImage(product)}
      <div class="mf-product-body">
        <h3>${esc(product.product_name || product.name || "餐點")}</h3>
        <p>${esc(shortText(product.description || product.tags_text || "磨飯日常餐點"))}</p>
        <div class="mf-price-row"><span class="mf-price">${price(product.base_price || product.price)}</span>${action}</div>
      </div>
    </article>
  `;
}

function menuProductCard(product, index) {
  const sold = isSoldOut(product);
  if (index === 0) {
    return `
      <article class="mf-product-card mf-card-featured mf-feature-card ${sold ? "sold-out" : ""}" data-go="/product/${encodeURIComponent(product.product_id)}">
        ${productImage(product)}
        <div class="mf-product-body">
          <h3>${esc(product.product_name || product.name || "餐點")}</h3>
          <p>${esc(shortText(product.description || product.tags_text || "磨飯日常餐點"))}</p>
          <div class="mf-price-row"><span class="mf-price">${price(product.base_price || product.price)}</span>${productActionButton(product, sold)}</div>
        </div>
      </article>
    `;
  }
  return `
    <article class="mf-list-row mf-card-medium mf-medium-row ${sold ? "sold-out" : ""}" data-go="/product/${encodeURIComponent(product.product_id)}">
      ${productImage(product)}
      <div class="mf-product-summary">
        <h3>${esc(product.product_name)}</h3>
        <p>${esc(shortText(product.description || product.tags_text || ""))}</p>
        <b>${price(product.base_price)}</b>
      </div>
      ${productActionButton(product, sold)}
    </article>
  `;
}

function listProductRow(product) {
  const sold = isSoldOut(product);
  return `
    <article class="mf-list-row mf-card-compact ${sold ? "sold-out" : ""}" data-go="/product/${encodeURIComponent(product.product_id)}">
      ${productImage(product)}
      <div class="mf-product-summary"><h3>${esc(product.product_name)}</h3><p>${esc(shortText(product.description || product.tags_text || ""))}</p><b>${price(product.base_price)}</b></div>
      ${productActionButton(product, sold)}
    </article>
  `;
}

function productActionButton(product, sold) {
  if (sold) return `<span class="mf-sold-label mf-product-action">售罄</span>`;
  if (productRequiresDetail(product)) {
    return `<button class="mf-icon-btn mf-product-action" aria-label="選擇 ${esc(product.product_name || "餐點")}" data-go="/product/${encodeURIComponent(product.product_id)}">＋</button>`;
  }
  return `<button class="mf-icon-btn mf-product-action" aria-label="加入 ${esc(product.product_name || "餐點")}" data-add="${esc(product.product_id)}">＋</button>`;
}

function productImage(product) {
  const src = product.image_url || "";
  return `
    <div class="mf-product-media">
      ${src ? `<img class="mf-product-img" src="${esc(src)}" alt="" loading="lazy">` : `<span class="mf-product-placeholder" aria-hidden="true">磨飯</span>`}
    </div>
  `;
}

function cartRow(item) {
  const config = item.configuration || {};
  const summary = [
    config.rice_base,
    config.drink,
    config.cheese ? "+芝士" : "",
    config.snack,
    config.remark ? `備註：${config.remark}` : ""
  ].filter(Boolean).join("｜");
  return `
    <div class="mf-list-row">
      <img src="${esc(item.image_url || "")}" alt="" loading="lazy">
      <div>
        <h3>${esc(item.product_name)}</h3>
        <p>${esc(summary || item.product_type || "")}</p>
        <b>${price(Number(item.base_price || 0) * Number(item.quantity || 1))}</b>
        <div class="mf-inline-actions">
          <button class="mf-mini" data-qty="${esc(item.temp_item_id)}" data-delta="-1">-</button>
          <span class="mf-qty-count">${item.quantity}</span>
          <button class="mf-mini" data-qty="${esc(item.temp_item_id)}" data-delta="1">+</button>
          <button class="mf-mini" data-edit-item="${esc(item.temp_item_id)}">修改</button>
          <button class="mf-mini" data-copy-item="${esc(item.temp_item_id)}">複製修改</button>
        </div>
      </div>
      <button class="mf-mini danger" data-remove="${esc(item.temp_item_id)}">刪除</button>
    </div>
  `;
}

function optionRow(option) {
  return `<button class="mf-option" data-option="${esc(option.id || option.value || option.name)}"><span>${esc(option.label || option.name || option.option_name)}</span><b>${option.price_delta ? "+" + price(option.price_delta) : ""}</b></button>`;
}

function orderCard(order) {
  return `
    <article class="mf-order-card">
      <b>${esc(order.order_number || order.order_id || "訂單")}</b>
      <p>${esc(order.created_at || order.order_date || "")}</p>
      <button class="mf-btn secondary" data-repeat-order="${esc(order.order_id || "")}">再次點餐</button>
      <button class="mf-btn secondary" data-hide-order="${esc(order.order_id || "")}">隱藏記錄</button>
    </article>
  `;
}

function couponCard(coupon) {
  return `<div class="mf-memory-card"><b>${esc(coupon.coupon_name || coupon.coupon_template_id || "回憶券")}</b><br><span>${esc(coupon.status || "可用")}</span></div>`;
}

function jarBar() {
  const total = state.cartCalc?.summary?.total_amount || cartSubtotal();
  const count = state.cart.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
  return `
    <div class="mf-jar-bar" data-go="/memory-jar">
      <div class="mf-jar-icon" aria-hidden="true">罐<span>${count}</span></div>
      <div class="mf-jar-summary">
        <b>記憶罐</b>
        <span>${count} 件｜${price(total)}</span>
      </div>
      <button class="mf-btn" data-go="/memory-jar">去結賬</button>
    </div>
  `;
}

function bottomNav() {
  return `<nav class="mf-bottom-nav">${navItems.map(([path, label]) => `<a href="${path}" data-go="${path}" class="${navActive(path) ? "active" : ""}">${label}</a>`).join("")}</nav>`;
}

function navActive(path) {
  if (path === "/" && state.route === "/") return true;
  if (path !== "/" && state.route.startsWith(path)) return true;
  if (path === "/member" && state.route === "/member") return true;
  return false;
}

function handleClick(event) {
  const add = event.target.closest("[data-add]");
  if (add) {
    event.stopPropagation();
    addToCart(add.getAttribute("data-add"));
    return;
  }
  const addDetail = event.target.closest("[data-add-detail]");
  if (addDetail) {
    event.stopPropagation();
    addToCart(addDetail.getAttribute("data-add-detail"));
    return;
  }
  const detailGroup = event.target.closest("[data-detail-group]");
  if (detailGroup) {
    const product = currentDetailProduct();
    const draft = detailDraft(product);
    const group = detailGroup.getAttribute("data-detail-group");
    draft.openGroup = draft.openGroup === group ? "" : group;
    render();
    return;
  }
  const detailPick = event.target.closest("[data-detail-pick]");
  if (detailPick) {
    const product = currentDetailProduct();
    const draft = detailDraft(product);
    const group = draft.openGroup;
    const label = detailPick.getAttribute("data-detail-pick");
    if (["肉鬆", "青瓜", "西生菜", "薄脆", "沙律醬"].includes(group)) {
      draft.ingredientAdjustments[group] = label;
    } else if (group) {
      draft.bentoAdjustments[group] = label;
    }
    draft.openGroup = "";
    render();
    return;
  }
  const detailDrink = event.target.closest("[data-detail-drink]");
  if (detailDrink) {
    const product = currentDetailProduct();
    const draft = detailDraft(product);
    draft.drink = detailDrink.getAttribute("data-detail-drink");
    draft.drinkDelta = Number(detailDrink.getAttribute("data-price") || 0);
    draft.openGroup = "";
    render();
    return;
  }
  const detailToggle = event.target.closest("[data-detail-toggle]");
  if (detailToggle) {
    const draft = detailDraft(currentDetailProduct());
    if (detailToggle.getAttribute("data-detail-toggle") === "cheese") draft.cheese = !draft.cheese;
    render();
    return;
  }
  const riceBase = event.target.closest("[data-rice-base]");
  if (riceBase) {
    const draft = detailDraft(currentDetailProduct());
    draft.riceBase = riceBase.getAttribute("data-rice-base");
    draft.bentoAdjustments = {};
    draft.openGroup = "";
    render();
    return;
  }
  const bentoChip = event.target.closest("[data-bento-chip]");
  if (bentoChip) {
    const draft = detailDraft(currentDetailProduct());
    const chip = bentoChip.getAttribute("data-bento-chip");
    if (["走蛋", "轉菜飯底 +$7"].includes(chip)) {
      draft.bentoAdjustments[chip] = draft.bentoAdjustments[chip] ? "" : chip;
    } else {
      draft.openGroup = draft.openGroup === chip ? "" : chip;
    }
    render();
    return;
  }
  const detailAddon = event.target.closest("[data-detail-addon]");
  if (detailAddon) {
    const draft = detailDraft(currentDetailProduct());
    const label = detailAddon.getAttribute("data-label");
    const delta = Number(detailAddon.getAttribute("data-price") || 0);
    if (/飯糰/.test(detailAddon.getAttribute("data-detail-addon"))) {
      draft.addonRiceball = draft.addonRiceball === label ? "" : label;
      draft.addonRiceballDelta = draft.addonRiceball ? delta : 0;
    } else {
      draft.snack = draft.snack === label ? "" : label;
      draft.snackDelta = draft.snack ? delta : 0;
    }
    render();
    return;
  }
  const detailQty = event.target.closest("[data-detail-qty]");
  if (detailQty) {
    const draft = detailDraft(currentDetailProduct());
    draft.quantity = Math.max(1, Number(draft.quantity || 1) + Number(detailQty.getAttribute("data-detail-qty") || 0));
    render();
    return;
  }
  const remove = event.target.closest("[data-remove]");
  if (remove) {
    if (!confirm("刪除這件餐點？")) return;
    state.cart = state.cart.filter(item => item.temp_item_id !== remove.getAttribute("data-remove"));
    saveCart();
    render();
    return;
  }
  const qty = event.target.closest("[data-qty]");
  if (qty) {
    const item = state.cart.find(entry => entry.temp_item_id === qty.getAttribute("data-qty"));
    if (item) {
      const next = Number(item.quantity || 1) + Number(qty.getAttribute("data-delta") || 0);
      if (next < 1) {
        if (!confirm("是否刪除此餐點？")) return;
        state.cart = state.cart.filter(entry => entry.temp_item_id !== item.temp_item_id);
      } else {
        item.quantity = next;
      }
      saveCart();
      render();
    }
    return;
  }
  const edit = event.target.closest("[data-edit-item]");
  if (edit) {
    const item = state.cart.find(entry => entry.temp_item_id === edit.getAttribute("data-edit-item"));
    if (item) navigate(`/product/${encodeURIComponent(item.product_id)}`);
    return;
  }
  const copy = event.target.closest("[data-copy-item]");
  if (copy) {
    const item = state.cart.find(entry => entry.temp_item_id === copy.getAttribute("data-copy-item"));
    if (item) {
      state.cart.push({ ...item, temp_item_id: "tmp_" + Date.now().toString(36), quantity: 1, configuration: { ...(item.configuration || {}) } });
      saveCart();
      navigate(`/product/${encodeURIComponent(item.product_id)}`);
    }
    return;
  }
  const payment = event.target.closest("[data-payment]");
  if (payment) {
    state.selectedPayment = payment.getAttribute("data-payment");
    localStorage.setItem(PAYMENT_KEY, state.selectedPayment);
    render();
    return;
  }
  if (event.target.closest("[data-submit-whatsapp]")) {
    syncCustomerForm();
    submitWhatsApp();
    return;
  }
  if (event.target.closest("[data-generate-whatsapp]")) {
    syncCustomerForm();
    if (!state.customer.name || !state.customer.phone || !state.cart.length) {
      navigate("/memory-jar");
      return;
    }
    const payload = currentOrderPayload();
    persistLocalOrder(payload, buildWhatsAppText(payload));
    navigate("/orders");
    return;
  }
  const repeat = event.target.closest("[data-repeat-order]");
  if (repeat) {
    const order = state.orders.find(entry => String(entry.order_id) === repeat.getAttribute("data-repeat-order"));
    const items = order?.items || order?.order_items || [];
    if (items.length) {
      state.cart = items.map(item => ({
        temp_item_id: "tmp_" + Math.random().toString(36).slice(2),
        product_id: item.product_id,
        product_name: item.product_name || findProduct(item.product_id)?.product_name || item.product_id,
        product_type: item.product_type || findProduct(item.product_id)?.product_type || "item",
        base_price: Number(item.base_price || item.unit_price || findProduct(item.product_id)?.base_price || 0),
        image_url: item.image_url || findProduct(item.product_id)?.image_url || "",
        quantity: Number(item.quantity || 1),
        configuration: item.configuration || {}
      }));
      saveCart();
      navigate("/memory-jar");
    }
    return;
  }
  const hide = event.target.closest("[data-hide-order]");
  if (hide) {
    const orderId = hide.getAttribute("data-hide-order");
    const orders = loadLocalOrders().map(order => order.order_id === orderId ? { ...order, visible_to_customer: false, hidden_at: new Date().toISOString(), hidden_by: "customer" } : order);
    saveLocalOrders(orders);
    loadOrders().then(render);
    return;
  }
  const cat = event.target.closest("[data-cat]");
  if (cat) {
    state.selectedCategory = cat.getAttribute("data-cat");
    render();
    return;
  }
  const go = event.target.closest("[data-go]");
  if (go) {
    event.preventDefault();
    event.stopPropagation();
    navigate(go.getAttribute("data-go"));
  }
}

function handleInput(event) {
  if (event.target.matches("[data-search-products]")) {
    const q = event.target.value.trim().toLowerCase();
    document.querySelectorAll(".mf-list > *").forEach(el => {
      el.style.display = el.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  }
  if (event.target.matches("[data-detail-remark]")) {
    detailDraft(currentDetailProduct()).remark = event.target.value;
  }
}

function handleChange() {}

function handleSubmit(event) {
  const form = event.target.closest("[data-customer-form]");
  if (!form) return;
  event.preventDefault();
  syncCustomerForm(form);
  render();
}

function syncCustomerForm(form = document.querySelector("[data-customer-form]")) {
  if (!form) return;
  const data = new FormData(form);
  state.customer = {
    name: String(data.get("name") || ""),
    phone: String(data.get("phone") || ""),
    pickup: "asap",
    pickup_note: String(data.get("pickup_note") || ""),
    note: String(data.get("note") || "")
  };
  saveCustomer();
}

function addToCart(productId) {
  const product = findProduct(productId);
  if (!product || isSoldOut(product)) return;
  const draft = state.route.startsWith("/product/") ? detailDraft(product) : null;
  const configuration = draft ? cartConfiguration(product, draft) : {};
  const key = addKey(product, draft);
  if (state.addingKeys.has(key)) return;
  state.addingKeys.add(key);
  const existing = state.cart.find(item => item.product_id === productId && configSignature(item.configuration || {}) === configSignature(configuration));
  if (existing) {
    existing.quantity += Number(draft?.quantity || 1);
  } else {
    state.cart.push({
      temp_item_id: "tmp_" + Date.now().toString(36),
      product_id: product.product_id,
      product_name: product.product_name,
      product_type: product.product_type,
      base_price: detailUnitPrice(product, draft),
      image_url: product.image_url || "",
      quantity: Number(draft?.quantity || 1),
      configuration
    });
  }
  saveCart();
  render();
  setTimeout(() => state.addingKeys.delete(key), 350);
}

async function submitWhatsApp() {
  if (!state.cart.length) return;
  if (!state.customer.name || !state.customer.phone) {
    navigate("/memory-jar");
    return;
  }
  const payload = currentOrderPayload();
  let text;
  try {
    const data = await morefunAction("order.submitWhatsAppPayload", payload);
    text = data.whatsapp_text || data.text || buildWhatsAppText(payload);
  } catch {
    text = buildWhatsAppText(payload);
  }
  persistLocalOrder(payload, text);
  const phone = state.settings.SHOP_WHATSAPP_NUMBER || state.settings.shop_whatsapp_number || "85261123071";
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
}

function currentOrderPayload() {
  const selected = state.paymentMethods.find(m => m.payment_method_id === state.selectedPayment) || state.paymentMethods[0] || {};
  const isCash = selected.payment_method_id === "cash_on_pickup";
  const total = state.cartCalc?.summary?.total_amount || cartSubtotal();
  return {
    customer: state.customer,
    items: state.cart,
    payment: {
      paymentMethod: paymentLabel(selected),
      paymentStatus: isCash ? "到店付款" : "待店舖確認",
      paymentAmount: total,
      paymentReminder: isCash ? "" : "店舖會以 WhatsApp 確認付款及取餐時間。"
    },
    pickup: {
      arrangement: "盡快取餐",
      pickupNote: state.customer.pickup_note || "",
      orderNote: state.customer.note || "",
      note: "實際時間以 WhatsApp 回覆確認為準"
    }
  };
}

function currentDetailProduct() {
  return state.productDetail?.product || findProduct(decodeURIComponent(state.route.split("/").pop())) || {};
}

function productKind(product) {
  const text = `${product.product_id || ""} ${product.product_type || ""} ${product.category_id || ""} ${product.product_name || ""}`.toLowerCase();
  if (/bento|便當|飯餐|bento_/.test(text)) return "bento";
  if (/drink|飲品|d4|tea|奶茶|檸/.test(text)) return "drink";
  if (/riceball|飯糰|紫米|r00|f[1-6]/.test(text)) return "riceball";
  return "snack";
}

function detailUnitPrice(product, draft) {
  if (!draft) return Number(product.base_price || 0);
  const qty = Math.max(1, Number(draft.quantity || 1));
  return Math.round((detailTotal(product, draft) / qty) * 10) / 10;
}

function detailTotal(product, draft) {
  const base = Number(product.base_price || 0);
  const cheese = draft.cheese ? 4 : 0;
  const bentoExtra = Object.values(draft.bentoAdjustments || {}).reduce((sum, label) => sum + optionPrice(label), 0);
  const addon = Number(draft.snackDelta || 0) + Number(draft.addonRiceballDelta || 0);
  const unit = base + cheese + Number(draft.drinkDelta || 0) + bentoExtra + addon;
  return Math.max(0, unit * Number(draft.quantity || 1));
}

function optionPrice(label) {
  const match = String(label || "").match(/\+\$(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

function detailSummary(draft) {
  const bits = [];
  if (draft.riceBase) bits.push(draft.riceBase);
  if (draft.drink) bits.push(draft.drink);
  if (draft.cheese) bits.push("+芝士");
  if (draft.snack) bits.push(draft.snack);
  return bits.slice(0, 2).join("｜") || "已選摘要";
}

function cartConfiguration(product, draft) {
  if (!draft) return {};
  return {
    kind: productKind(product),
    rice_base: productKind(product) === "bento" ? draft.riceBase : "",
    ingredients: draft.ingredientAdjustments,
    cheese: draft.cheese,
    drink: draft.drink,
    drink_delta: draft.drinkDelta,
    snack: draft.snack,
    snack_delta: draft.snackDelta,
    addon_riceball: draft.addonRiceball,
    addon_riceball_delta: draft.addonRiceballDelta,
    bento_adjustments: draft.bentoAdjustments,
    remark: draft.remark || ""
  };
}

function configSignature(config) {
  const ordered = {};
  Object.keys(config || {}).sort().forEach(key => {
    const value = config[key];
    ordered[key] = value && typeof value === "object" && !Array.isArray(value) ? Object.fromEntries(Object.entries(value).sort()) : value;
  });
  return JSON.stringify(ordered);
}

function addKey(product, draft) {
  return `${product.product_id || ""}:${configSignature(draft ? cartConfiguration(product, draft) : {})}`;
}

function persistLocalOrder(payload, whatsappText) {
  const orders = loadLocalOrders();
  orders.unshift({
    order_id: "local_" + Date.now().toString(36),
    order_number: "LOCAL-" + new Date().toISOString().slice(0, 19).replace(/[-:T]/g, ""),
    created_at: new Date().toISOString(),
    customer_phone: payload.customer.phone,
    total_amount: payload.payment.paymentAmount,
    payment_method: payload.payment.paymentMethod,
    payment_status: payload.payment.paymentStatus,
    whatsapp_payload: whatsappText,
    visible_to_customer: true,
    items: payload.items
  });
  saveLocalOrders(orders.slice(0, 20));
}

function buildWhatsAppText(payload) {
  const lines = [
    "磨飯 More Fun 自取訂單",
    `稱呼：${payload.customer.name}`,
    `電話：${payload.customer.phone}`,
    "取餐安排：盡快取餐",
    payload.pickup.pickupNote ? `取餐備註：${payload.pickup.pickupNote}` : "",
    "實際時間以 WhatsApp 回覆確認為準",
    "",
    "餐點：",
    ...payload.items.map((item, index) => `${index + 1}. ${item.product_name} × ${item.quantity}${cartConfigText(item.configuration)}`),
    payload.pickup.orderNote ? `\n全單備註：${payload.pickup.orderNote}` : "",
    "",
    `付款方式：${payload.payment.paymentMethod}`,
    `付款狀態：${payload.payment.paymentStatus}`,
    `總額：${price(payload.payment.paymentAmount)}`,
    payload.payment.paymentReminder,
    "請店舖確認訂單及取餐時間。"
  ].filter(Boolean);
  return lines.join("\n");
}

function cartConfigText(config = {}) {
  const bits = [
    config.rice_base ? `飯底：${config.rice_base}` : "",
    config.drink ? `飲品：${config.drink}` : "",
    config.cheese ? "加芝士 $4" : "",
    config.snack ? `小食：${config.snack}` : "",
    ...Object.entries(config.ingredients || {}).map(([k, v]) => `${k}${v}`),
    ...Object.values(config.bento_adjustments || {}).filter(Boolean),
    config.remark ? `備註：${config.remark}` : ""
  ].filter(Boolean);
  return bits.length ? `\n${bits.join("｜")}` : "";
}

function visibleCategories() {
  const categories = (state.menu.categories || []).filter(c => bool(c.is_visible));
  const purpleSoldOut = purpleRiceSoldOut();
  return categories.filter(c => !(purpleSoldOut && /RICEBALL|SALAD|紫米/.test(`${c.category_id}${c.category_name}`)));
}

function menuCategories() {
  const source = visibleCategories();
  // Fallback category buckets for compatibility when backend category rows are missing.
  const specs = [
    ["POPULAR", "人氣熱賣", /人氣|熱賣|推薦|popular|top/i],
    ["RICEBALL_MEAL", "飯團套餐", /飯團套餐|飯糰套餐|fixed|combo|set|套餐/i],
    ["RICEBALL", "單點飯團", /單點飯團|單點飯糰|飯團|飯糰|riceball/i],
    ["BENTO", "便當", /便當|bento|肉燥|咖喱|菜飯/i],
    ["CUSTOM_MEAL", "自選套餐", /自選|custom/i],
    ["SNACK_DRINK", "小食飲品", /小食|飲品|drink|snack|tea|奶茶|檸/i],
    ["PURPLE_SALAD", "紫米沙律", /沙律|salad|紫米沙律/i]
  ];
  return specs.map(([fallbackId, label, pattern]) => {
    const found = source.find(c => c.category_id === fallbackId || pattern.test(`${c.category_id || ""} ${c.category_name || ""}`));
    return found ? { ...found, category_name: label } : { category_id: fallbackId, category_name: label, is_visible: true };
  }).filter(c => !(purpleRiceSoldOut() && /PURPLE|RICEBALL|SALAD|紫米|飯團|飯糰/.test(`${c.category_id}${c.category_name}`)));
}

function productsForCategory(categoryId) {
  let products = state.menu.products || [];
  if (categoryId === "POPULAR" || categoryId === "popular") products = popularProducts();
  else if (["RICEBALL_MEAL", "RICEBALL", "BENTO", "CUSTOM_MEAL", "SNACK_DRINK", "PURPLE_SALAD"].includes(categoryId)) {
    products = products.filter(p => productMatchesMenuCategory(p, categoryId));
  }
  else products = products.filter(p => p.category_id === categoryId);
  return products
    .filter(p => bool(p.is_visible))
    .filter(p => !(purpleRiceSoldOut() && isPurpleProduct(p)))
    .sort((a, b) => Number(isSoldOut(a)) - Number(isSoldOut(b)) || Number(a.sort_order || 999) - Number(b.sort_order || 999));
}

function popularProducts() {
  const products = state.menu.products || [];
  return products
    .filter(p => bool(p.is_visible))
    .filter(p => !isSoldOut(p))
    .filter(p => /top6|popular|combo|fixed_set|bento/i.test(`${p.tags_text || ""} ${p.category_id || ""}`))
    .concat(products.filter(p => bool(p.is_visible) && !isSoldOut(p)))
    .filter(uniqueByProduct)
    .slice(0, 12);
}

function relatedProducts(product) {
  return (state.menu.products || [])
    .filter(p => p.product_id !== product.product_id)
    .filter(p => p.product_type === product.product_type || p.category_id === product.category_id)
    .filter(p => !isSoldOut(p))
    .slice(0, 3);
}

function detailOptions(detail) {
  const groups = [];
  [
    "ingredients",
    "modifier_options",
    "meal_drink_options",
    "salad_sauces",
    "bento_adjustment_options"
  ].forEach(key => {
    (detail[key] || []).slice(0, 8).forEach(item => {
      groups.push({
        id: item.ingredient_id || item.modifier_option_id || item.drink_option_id || item.sauce_id || item.bento_option_id,
        label: item.option_name || item.ingredient_name || item.label || item.name || item.drink_name || item.sauce_name,
        price_delta: item.price_delta || item.extra_price || 0
      });
    });
  });
  return groups;
}

function findProduct(productId) {
  return (state.menu.products || []).find(p => String(p.product_id) === String(productId));
}

function activeRows(rows) {
  return (rows || []).filter(row => row.is_active === undefined || bool(row.is_active));
}

function targetPath(banner) {
  if (!banner?.target_type) return "";
  if (banner.target_type === "product") return `/product/${encodeURIComponent(banner.target_id || "")}`;
  if (banner.target_type === "category") {
    state.selectedCategory = banner.target_id;
    return "/menu";
  }
  return "/menu";
}

function categoryName(category) {
  if (category.category_id === "POPULAR") return "人氣熱賣";
  return category.category_name || category.category_id;
}

function categoryIcon(category) {
  const name = categoryName(category);
  if (/人氣/.test(name)) return "熱";
  if (/套餐/.test(name)) return "套";
  if (/飯團|飯糰/.test(name)) return "飯";
  if (/便當/.test(name)) return "便";
  if (/小食|飲品/.test(name)) return "飲";
  if (/沙律/.test(name)) return "紫";
  return "磨";
}

function productMatchesMenuCategory(product, categoryId) {
  const text = `${product.product_id || ""} ${product.product_name || ""} ${product.product_type || ""} ${product.category_id || ""} ${product.tags_text || ""}`.toLowerCase();
  if (categoryId === "RICEBALL_MEAL") return /套餐|meal|combo|fixed|set/.test(text) && /飯團|飯糰|riceball|紫米|f[1-6]/i.test(text);
  if (categoryId === "RICEBALL") return /飯團|飯糰|riceball|紫米|^f[1-6]$/i.test(text) && !/套餐|meal|combo|set|沙律|salad/.test(text);
  if (categoryId === "BENTO") return /便當|bento|肉燥|咖喱|菜飯/.test(text);
  if (categoryId === "CUSTOM_MEAL") return /自選|custom/.test(text);
  if (categoryId === "SNACK_DRINK") return /小食|飲品|drink|snack|tea|奶茶|檸|薯角/.test(text);
  if (categoryId === "PURPLE_SALAD") return /沙律|salad/.test(text) && /紫米|purple/.test(text);
  return product.category_id === categoryId;
}

function isSoldOut(product) {
  if (purpleAuditMode() && isPurpleProduct(product)) return false;
  if (purpleRiceSoldOut() && isPurpleProduct(product)) return true;
  const status = String(product.availability_status || "").toLowerCase();
  if (status && !["available", "active", "true", "1"].includes(status)) return true;
  return product.is_sold_out || product.is_available === false || product.is_visible === false;
}

function purpleRiceSoldOut() {
  if (purpleAuditMode()) return false;
  return String(state.settings.operation_purple_rice_status || "").toLowerCase().includes("sold_out");
}

function purpleAuditMode() {
  return localStorage.getItem("morefun_audit_zimi") === "1" || localStorage.getItem("morefun_purple_audit") === "1";
}

function isPurpleProduct(product) {
  const text = `${product.product_id || ""} ${product.product_name || ""} ${product.product_type || ""} ${product.category_id || ""} ${product.tags_text || ""}`;
  return /紫米|riceball|RICEBALL|SALAD/.test(text) || /^F[1-6]$/i.test(String(product.product_id || ""));
}

function purpleRiceSoldOutNotice() {
  if (purpleAuditMode()) return `<div class="mf-notice"><b>紫米全開檢查模式</b><br>staging / audit only：紫米相關商品暫時全部可見可點，未改正式 Google Sheet。</div>`;
  return purpleRiceSoldOut() ? `<div class="mf-notice"><b>重要公告</b><br>${esc(state.settings.operation_sold_out_banner_text || "今日紫米已售罄，其他餐點正常供應。")}</div>` : "";
}

function productRequiresDetail(product) {
  const kind = productKind(product);
  if (["bento", "riceball", "drink"].includes(kind)) return true;
  const text = `${product.product_id || ""} ${product.product_type || ""} ${product.category_id || ""} ${product.tags_text || ""} ${product.product_name || ""}`;
  return /meal|set|combo|套餐|便當|飯糰|飲品|紫米|F[1-6]/i.test(text);
}

function cartSubtotal() {
  return state.cart.reduce((sum, item) => sum + Number(item.base_price || 0) * Number(item.quantity || 1), 0);
}

function paymentLabel(method) {
  if (!method) return "到店支付現金";
  if (method.payment_method_id === "cash_on_pickup") return method.label || "到店支付現金";
  return method.whatsapp_output_label || method.label || method.payment_method_id;
}

function paymentDescription(method) {
  if (method.payment_method_id === "cash_on_pickup") return "到店取餐時付款";
  return `掃描 ${paymentLabel(method)} QR Code 付款`;
}

function supportedPaymentMethods() {
  const real = new Map((state.paymentMethods || []).map(method => [String(method.payment_method_id), method]));
  return [
    { payment_method_id: "cash_on_pickup", label: "到店支付現金", whatsapp_output_label: "到店支付現金", description: "到店取餐時付款", enabled: true, requires_qr_code: false },
    { payment_method_id: "payme", label: "PayMe", whatsapp_output_label: "PayMe", description: "掃描 PayMe QR Code 付款", enabled: true, requires_qr_code: true },
    { payment_method_id: "fps", label: "轉數快 FPS", whatsapp_output_label: "FPS 轉數快", description: "掃描 FPS QR Code 付款", enabled: true, requires_qr_code: true },
    { payment_method_id: "alipay", label: "Alipay", whatsapp_output_label: "Alipay", description: "掃描 Alipay QR Code 付款", enabled: true, requires_qr_code: true },
    { payment_method_id: "wechat_pay", label: "WeChat Pay", whatsapp_output_label: "WeChat Pay", description: "掃描 WeChat Pay QR Code 付款", enabled: true, requires_qr_code: true }
  ].map(defaultMethod => ({ ...defaultMethod, ...(real.get(defaultMethod.payment_method_id) || {}) }));
}

function memorySeedText() {
  const count = state.memory?.data?.summary?.memory_seed_count;
  return count ? `${count} 顆記憶種子` : "登入後查看";
}

function uniqueByProduct(product, index, arr) {
  return arr.findIndex(p => p.product_id === product.product_id) === index;
}

function bool(value) {
  if (typeof value === "boolean") return value;
  return ["true", "1", "yes", "active", "available", "enabled"].includes(String(value).toLowerCase());
}

function price(value) {
  const n = Number(value || 0);
  return `$${Number.isInteger(n) ? n : n.toFixed(1)}`;
}

function shortText(value) {
  const text = String(value || "");
  return text.length > 26 ? text.slice(0, 25) + "..." : text;
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

init();
