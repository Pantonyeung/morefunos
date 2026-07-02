import { morefunAction } from "./morefunApiClient.js";

const CART_KEY = "morefun_memory_jar";
const MENU_CACHE_KEY = "morefun.menu.v21.cache";
const MENU_CACHE_TTL_MS = 5 * 60 * 1000;

const v21 = {
  menu: null,
  loading: null,
  activeCategoryId: "POPULAR",
  seedOpen: false,
  patchedNode: null
};

const categorySpecs = [
  { id: "POPULAR", label: "人氣推薦", icon: "☆" },
  { id: "RICEBALL", label: "紫米飯團", icon: "△" },
  { id: "BENTO", label: "便當", icon: "▭" },
  { id: "SNACK", label: "小食", icon: "◒" },
  { id: "DRINK", label: "飲品", icon: "▱" },
  { id: "SOUP", label: "湯品", icon: "◌" },
  { id: "MORE", label: "更多", icon: "⋯" }
];

injectMenuV21Styles();
bootMenuV21();

function bootMenuV21() {
  const app = document.getElementById("app");
  if (!app) return;

  const observer = new MutationObserver(() => scheduleApplyMenuV21());
  observer.observe(app, { childList: true, subtree: true });
  window.addEventListener("popstate", scheduleApplyMenuV21);
  window.addEventListener("mf:menu-v21-refresh", scheduleApplyMenuV21);

  document.addEventListener("click", handleMenuV21Click, true);
  document.addEventListener("input", handleMenuV21Input, true);
  scheduleApplyMenuV21();
}

let scheduled = false;
function scheduleApplyMenuV21() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    applyMenuV21();
  });
}

async function applyMenuV21() {
  if (normalizePath(location.pathname) !== "/menu") return;
  const page = document.querySelector(".mf-order-page");
  const layout = document.querySelector(".mf-menu-layout");
  if (!page || !layout || page.dataset.menuV21Applied === "1") return;

  page.dataset.menuV21Applied = "1";
  page.classList.add("mf-menu-v21-page");
  document.querySelector("[data-search-products]")?.setAttribute("placeholder", "搜尋飯團、便當、飲品…");

  layout.className = "mf-menu-layout mf-v21-layout";
  layout.innerHTML = `<div class="mf-v21-loading">正在整理人氣推薦…</div>`;

  try {
    const menu = await loadMenuV21();
    renderMenuV21(layout, menu);
  } catch (error) {
    layout.innerHTML = `<div class="mf-v21-loading">暫時未能載入新版餐牌，請重新整理。</div>`;
  }
}

async function loadMenuV21() {
  if (v21.menu?.products?.length) return v21.menu;
  const cached = readMenuCacheV21();
  if (cached?.products?.length) {
    v21.menu = cached;
    refreshMenuV21InBackground();
    return cached;
  }
  if (!v21.loading) {
    v21.loading = morefunAction("menu.read", { include_sold_out: true })
      .then(menu => {
        v21.menu = normalizeMenuV21(menu);
        writeMenuCacheV21(v21.menu);
        return v21.menu;
      })
      .finally(() => {
        v21.loading = null;
      });
  }
  return v21.loading;
}

function refreshMenuV21InBackground() {
  morefunAction("menu.read", { include_sold_out: true })
    .then(menu => {
      v21.menu = normalizeMenuV21(menu);
      writeMenuCacheV21(v21.menu);
    })
    .catch(() => {});
}

function normalizeMenuV21(menu) {
  const normalized = menu || { products: [], categories: [] };
  normalized.products = Array.isArray(normalized.products) ? normalized.products : [];
  normalized.categories = Array.isArray(normalized.categories) ? normalized.categories : [];
  return normalized;
}

function readMenuCacheV21() {
  try {
    const cached = JSON.parse(localStorage.getItem(MENU_CACHE_KEY) || "null");
    if (!cached?.menu || Date.now() - Number(cached.cached_at || 0) > MENU_CACHE_TTL_MS) return null;
    return cached.menu;
  } catch {
    return null;
  }
}

function writeMenuCacheV21(menu) {
  try {
    localStorage.setItem(MENU_CACHE_KEY, JSON.stringify({ cached_at: Date.now(), menu }));
  } catch {
    // Menu cache is optional.
  }
}

function renderMenuV21(layout, menu) {
  const products = visibleProducts(menu.products || []);
  const categories = categorySpecs.filter(cat => cat.id === "POPULAR" || productsForCategory(products, cat.id).length);
  const counts = categoryCounts(menu, categories);
  const popular = popularProductsV21(products).slice(0, 6);

  layout.innerHTML = `
    <div class="mf-v21-tabs" role="tablist" aria-label="餐牌分類">
      ${categories.map(cat => categoryTab(cat, counts)).join("")}
    </div>
    <section class="mf-v21-popular" data-v21-popular>
      <div class="mf-v21-popular-head">
        <h2>Top 6 人氣推薦</h2>
        <button type="button" data-v21-cat="POPULAR">查看全部 ›</button>
      </div>
      <div class="mf-v21-popular-rail" aria-label="Top 6 人氣推薦">
        ${popular.map(product => popularCard(product)).join("")}
        <button type="button" class="mf-v21-popular-more" data-v21-expand-popular aria-label="展開人氣推薦">›</button>
      </div>
    </section>
    <div class="mf-v21-list" data-v21-list>
      ${categories.filter(cat => cat.id !== "POPULAR").map(cat => sectionForCategory(cat, productsForCategory(products, cat.id))).join("")}
    </div>
    ${seedShortcut(categories, counts)}
  `;

  const list = layout.querySelector("[data-v21-list]");
  list?.addEventListener("scroll", () => updateScrollState(layout), { passive: true });
  updateActiveCategory(layout, v21.activeCategoryId, counts);
  updateScrollState(layout);
}

function categoryTab(cat, counts) {
  const count = counts[cat.id] || 0;
  return `
    <button type="button" class="mf-v21-tab ${cat.id === v21.activeCategoryId ? "active" : ""}" data-v21-cat="${esc(cat.id)}" role="tab">
      ${esc(cat.label)}${count ? `<span>${count}</span>` : ""}
    </button>
  `;
}

function popularCard(product) {
  const sold = isSoldOutV21(product);
  const action = productAction(product, sold, "mf-v21-pop-add");
  return `
    <article class="mf-v21-pop-card ${sold ? "sold-out" : ""}" data-go="/product/${encodeURIComponent(product.product_id)}" data-v21-product="${esc(product.product_id)}">
      <div class="mf-v21-pop-media">
        ${productImage(product)}
        ${action}
      </div>
      <div class="mf-v21-pop-body">
        <h3>${esc(product.product_name || product.name || "餐點")}</h3>
        <p>${esc(shortText(product.description || product.tags_text || "磨飯人氣餐點", 18))}</p>
        <b>${price(product.base_price || product.price)}</b>
      </div>
    </article>
  `;
}

function sectionForCategory(cat, products) {
  return `
    <section class="mf-v21-section" data-v21-section="${esc(cat.id)}" id="mf-v21-${esc(cat.id)}">
      <div class="mf-v21-section-head">
        <div><i>${esc(cat.icon)}</i><h2>${esc(cat.label)}</h2></div>
        <span>${sectionSubtitle(cat.id)}</span>
      </div>
      <div class="mf-v21-section-list">
        ${products.map(product => productRowV21(product)).join("")}
      </div>
    </section>
  `;
}

function productRowV21(product) {
  const sold = isSoldOutV21(product);
  return `
    <article class="mf-v21-row ${sold ? "sold-out" : ""}" data-go="/product/${encodeURIComponent(product.product_id)}" data-v21-product="${esc(product.product_id)}">
      <div class="mf-v21-row-media">${productImage(product)}</div>
      <div class="mf-v21-row-copy">
        <h3>${esc(product.product_name || product.name || "餐點")}</h3>
        <p>${esc(shortText(product.description || product.tags_text || "磨飯日常餐點", 26))}</p>
        <b>${price(product.base_price || product.price)}</b>
      </div>
      ${productAction(product, sold, "mf-v21-row-add")}
    </article>
  `;
}

function seedShortcut(categories, counts) {
  const total = Object.values(counts).reduce((sum, count) => sum + Number(count || 0), 0);
  return `
    <aside class="mf-v21-seed ${v21.seedOpen ? "open" : ""}" aria-label="記憶種子分類入口">
      <button type="button" class="mf-v21-seed-toggle" data-v21-seed-toggle aria-expanded="${v21.seedOpen ? "true" : "false"}">
        <i>✿</i><span>${total}</span><b>${v21.seedOpen ? "收起" : "分類"}</b>
      </button>
      <div class="mf-v21-seed-panel">
        ${categories.map(cat => `
          <button type="button" class="${cat.id === v21.activeCategoryId ? "active" : ""}" data-v21-cat="${esc(cat.id)}">
            <i>${esc(cat.icon)}</i><em>${esc(cat.label)}</em>${counts[cat.id] ? `<span>${counts[cat.id]}</span>` : ""}
          </button>
        `).join("")}
      </div>
    </aside>
  `;
}

function productAction(product, sold, className) {
  if (sold) return `<span class="${className} mf-v21-sold">售罄</span>`;
  if (productRequiresDetailV21(product)) {
    return `<button type="button" class="${className}" data-go="/product/${encodeURIComponent(product.product_id)}" aria-label="選擇 ${esc(product.product_name || "餐點")}">＋</button>`;
  }
  return `<button type="button" class="${className}" data-add="${esc(product.product_id)}" aria-label="加入 ${esc(product.product_name || "餐點")}">＋</button>`;
}

function productImage(product) {
  const src = product.image_url || "";
  return src
    ? `<img src="${esc(src)}" alt="" loading="lazy">`
    : `<span class="mf-v21-placeholder">磨飯</span>`;
}

function handleMenuV21Click(event) {
  const seedToggle = event.target.closest("[data-v21-seed-toggle]");
  if (seedToggle) {
    event.preventDefault();
    event.stopPropagation();
    v21.seedOpen = !v21.seedOpen;
    const layout = document.querySelector(".mf-v21-layout");
    if (layout && v21.menu) renderMenuV21(layout, v21.menu);
    return;
  }

  const expandPopular = event.target.closest("[data-v21-expand-popular]");
  if (expandPopular) {
    event.preventDefault();
    event.stopPropagation();
    const list = document.querySelector("[data-v21-list]");
    list?.scrollTo({ top: 0, behavior: "smooth" });
    const layout = document.querySelector(".mf-v21-layout");
    layout?.classList.remove("is-collapsed");
    updateActiveCategory(layout, "POPULAR");
    return;
  }

  const catButton = event.target.closest("[data-v21-cat]");
  if (catButton) {
    event.preventDefault();
    event.stopPropagation();
    const categoryId = catButton.getAttribute("data-v21-cat") || "POPULAR";
    scrollToCategory(categoryId);
    return;
  }
}

function handleMenuV21Input(event) {
  if (!event.target.matches("[data-search-products]")) return;
  const q = event.target.value.trim().toLowerCase();
  document.querySelectorAll(".mf-v21-row, .mf-v21-pop-card").forEach(card => {
    card.hidden = q ? !card.textContent.toLowerCase().includes(q) : false;
  });
  document.querySelectorAll(".mf-v21-section").forEach(section => {
    const hasVisible = [...section.querySelectorAll(".mf-v21-row")].some(row => !row.hidden);
    section.hidden = q ? !hasVisible : false;
  });
}

function scrollToCategory(categoryId) {
  const layout = document.querySelector(".mf-v21-layout");
  const list = layout?.querySelector("[data-v21-list]");
  if (!layout || !list) return;

  if (categoryId === "POPULAR") {
    list.scrollTo({ top: 0, behavior: "smooth" });
    layout.classList.remove("is-collapsed");
    updateActiveCategory(layout, "POPULAR");
    return;
  }

  const section = layout.querySelector(`[data-v21-section="${cssEscape(categoryId)}"]`);
  if (!section) return;
  list.scrollTo({ top: section.offsetTop - 8, behavior: "smooth" });
  updateActiveCategory(layout, categoryId);
}

function updateScrollState(layout) {
  if (!layout) return;
  const list = layout.querySelector("[data-v21-list]");
  if (!list) return;
  const collapsed = list.scrollTop > 42;
  layout.classList.toggle("is-collapsed", collapsed);

  if (!collapsed) {
    updateActiveCategory(layout, "POPULAR");
    return;
  }

  const sections = [...layout.querySelectorAll("[data-v21-section]")].filter(section => !section.hidden);
  const current = sections.reduce((active, section) => {
    return section.offsetTop <= list.scrollTop + 88 ? section : active;
  }, sections[0]);
  if (current) updateActiveCategory(layout, current.dataset.v21Section || "POPULAR");
}

function updateActiveCategory(layout, categoryId, counts = null) {
  if (!layout) return;
  v21.activeCategoryId = categoryId || "POPULAR";
  layout.querySelectorAll("[data-v21-cat]").forEach(button => {
    button.classList.toggle("active", button.getAttribute("data-v21-cat") === v21.activeCategoryId);
  });
  if (counts) {
    const seed = layout.querySelector(".mf-v21-seed");
    if (seed) seed.outerHTML = seedShortcut(categorySpecs.filter(cat => layout.querySelector(`[data-v21-cat="${cssEscape(cat.id)}"]`)), counts);
  }
}

function categoryCounts(menu, categories) {
  const products = visibleProducts(menu.products || []);
  const cart = readCart();
  const byId = new Map(products.map(product => [String(product.product_id), product]));
  const top6 = new Set(popularProductsV21(products).slice(0, 6).map(product => String(product.product_id)));
  const counts = Object.fromEntries(categories.map(cat => [cat.id, 0]));

  cart.forEach(item => {
    const quantity = Number(item.quantity || 1);
    const product = byId.get(String(item.product_id));
    if (!product) return;
    const categoryId = primaryCategoryForProduct(product);
    if (counts[categoryId] !== undefined) counts[categoryId] += quantity;
    if (top6.has(String(item.product_id)) && counts.POPULAR !== undefined) counts.POPULAR += quantity;
  });
  return counts;
}

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function visibleProducts(products) {
  return (products || [])
    .filter(product => bool(product.is_visible))
    .sort((a, b) => Number(isSoldOutV21(a)) - Number(isSoldOutV21(b)) || Number(a.sort_order || 999) - Number(b.sort_order || 999));
}

function popularProductsV21(products) {
  const preferred = products
    .filter(product => !isSoldOutV21(product))
    .filter(product => /top6|popular|人氣|熱賣|推薦|combo|fixed_set|套餐|F4|能量|檸檬茶|奶茶/i.test(productText(product)));
  return preferred.concat(products.filter(product => !isSoldOutV21(product))).filter(uniqueByProduct).slice(0, 12);
}

function productsForCategory(products, categoryId) {
  if (categoryId === "POPULAR") return popularProductsV21(products).slice(0, 6);
  return products.filter(product => primaryCategoryForProduct(product) === categoryId).slice(0, 24);
}

function primaryCategoryForProduct(product) {
  const text = productText(product);
  if (/湯|soup|broth/.test(text)) return "SOUP";
  if (/飲品|drink|tea|奶茶|檸|茶|鮮奶|冷泡|凍飲|熱飲|lemon|milk/.test(text)) return "DRINK";
  if (/便當|bento|肉燥|咖喱|菜飯|飯餐/.test(text)) return "BENTO";
  if (/小食|snack|薯|雞塊|唐揚|炸|小吃/.test(text)) return "SNACK";
  if (/紫米|飯團|飯糰|riceball|onigiri|^f[1-6]\b/.test(text)) return "RICEBALL";
  return "MORE";
}

function productText(product) {
  return `${product.product_id || ""} ${product.product_name || ""} ${product.name || ""} ${product.product_type || ""} ${product.category_id || ""} ${product.tags_text || ""} ${product.description || ""}`.toLowerCase();
}

function sectionSubtitle(categoryId) {
  if (categoryId === "RICEBALL") return "每日手作・紫米飽滿";
  if (categoryId === "BENTO") return "飽肚飯餐・快速自取";
  if (categoryId === "SNACK") return "順手加配・更滿足";
  if (categoryId === "DRINK") return "清爽解渴・手作好味";
  if (categoryId === "SOUP") return "暖胃湯品";
  return "更多選擇";
}

function productRequiresDetailV21(product) {
  const kind = primaryCategoryForProduct(product);
  if (["BENTO", "RICEBALL", "DRINK"].includes(kind)) return true;
  return /meal|set|combo|套餐|便當|飯糰|飲品|紫米|F[1-6]/i.test(productText(product));
}

function isSoldOutV21(product) {
  const status = String(product.availability_status || "").toLowerCase();
  if (status && !["available", "active", "true", "1"].includes(status)) return true;
  return product.is_sold_out || product.is_available === false || product.is_visible === false;
}

function bool(value) {
  if (typeof value === "boolean") return value;
  if (value === undefined || value === null || value === "") return true;
  return ["true", "1", "yes", "active", "available", "enabled"].includes(String(value).toLowerCase());
}

function uniqueByProduct(product, index, arr) {
  return arr.findIndex(item => String(item.product_id) === String(product.product_id)) === index;
}

function price(value) {
  const n = Number(value || 0);
  return `$${Number.isInteger(n) ? n : n.toFixed(1)}`;
}

function shortText(value, length = 26) {
  const text = String(value || "").trim();
  return text.length > length ? `${text.slice(0, length - 1)}…` : text;
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizePath(path) {
  return (path || "/").replace(/\/$/, "") || "/";
}

function cssEscape(value) {
  if (window.CSS?.escape) return CSS.escape(String(value));
  return String(value).replace(/"/g, "\\\"");
}

function injectMenuV21Styles() {
  if (document.querySelector("style[data-menu-v21]")) return;
  const style = document.createElement("style");
  style.dataset.menuV21 = "1";
  style.textContent = `
    .mf-menu-v21-page { background: var(--mf-rice-white); }
    .mf-v21-layout {
      display: grid;
      grid-template-rows: auto auto 1fr;
      background: var(--mf-rice-white);
      overflow: hidden;
      padding: 0 var(--content-x-padding) var(--content-bottom-padding);
    }
    .mf-v21-loading {
      padding: 22px 0;
      color: var(--mf-muted);
      font-size: var(--font-base);
      font-weight: 800;
    }
    .mf-v21-tabs {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding: 8px 0 9px;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
    }
    .mf-v21-tabs::-webkit-scrollbar,
    .mf-v21-popular-rail::-webkit-scrollbar,
    .mf-v21-list::-webkit-scrollbar { display: none; }
    .mf-v21-tab {
      position: relative;
      flex: 0 0 auto;
      min-height: 34px;
      border: 1px solid transparent;
      border-radius: var(--radius-pill);
      background: #f4eddf;
      color: var(--mf-brown);
      padding: 0 14px;
      font-size: var(--font-sm);
      font-weight: 900;
      white-space: nowrap;
    }
    .mf-v21-tab.active {
      background: var(--mf-brown);
      color: #fff;
      box-shadow: var(--shadow-sm);
    }
    .mf-v21-tab span,
    .mf-v21-seed-toggle span,
    .mf-v21-seed-panel button span {
      display: inline-grid;
      place-items: center;
      min-width: 18px;
      height: 18px;
      border-radius: var(--radius-pill);
      background: var(--mf-accent);
      color: #fff;
      font-size: 10px;
      font-weight: 900;
      margin-left: 5px;
      padding: 0 5px;
    }
    .mf-v21-tab.active span { background: rgba(255, 255, 255, 0.22); }
    .mf-v21-popular {
      min-height: 194px;
      transition: min-height 0.22s ease;
      overflow: hidden;
    }
    .mf-v21-popular-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 0 9px;
    }
    .mf-v21-popular-head h2 {
      margin: 0;
      color: var(--mf-brown);
      font-size: 18px;
      line-height: 1.1;
    }
    .mf-v21-popular-head button {
      border: 0;
      background: transparent;
      color: var(--mf-muted);
      font-size: var(--font-sm);
      font-weight: 800;
    }
    .mf-v21-popular-rail {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: calc((100% - 20px) / 3.2);
      gap: 10px;
      overflow-x: auto;
      padding: 0 2px 12px 0;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
    }
    .mf-v21-pop-card {
      min-width: 0;
      overflow: hidden;
      border: 1px solid var(--mf-border);
      border-radius: var(--radius-lg);
      background: var(--mf-card);
      box-shadow: var(--shadow-sm);
    }
    .mf-v21-pop-media {
      position: relative;
      height: 88px;
      overflow: hidden;
      border-radius: var(--radius-lg) var(--radius-lg) 12px 12px;
      background: var(--mf-card-warm);
    }
    .mf-v21-pop-media img,
    .mf-v21-row-media img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .mf-v21-pop-body {
      display: grid;
      gap: 4px;
      min-height: 92px;
      padding: 10px 10px 11px;
    }
    .mf-v21-pop-body h3,
    .mf-v21-row-copy h3 {
      margin: 0;
      color: var(--mf-brown);
      font-size: var(--font-base);
      line-height: var(--line-tight);
    }
    .mf-v21-pop-body p,
    .mf-v21-row-copy p {
      margin: 0;
      color: var(--mf-muted);
      font-size: var(--font-sm);
      line-height: 1.35;
    }
    .mf-v21-pop-body b,
    .mf-v21-row-copy b {
      color: var(--mf-accent-dark);
      font-size: var(--font-base);
      font-weight: 950;
    }
    .mf-v21-pop-add,
    .mf-v21-row-add {
      display: inline-grid;
      place-items: center;
      border: 0;
      border-radius: var(--radius-pill);
      background: var(--mf-brown);
      color: #fff;
      font-weight: 950;
      box-shadow: var(--shadow-sm);
    }
    .mf-v21-pop-add {
      position: absolute;
      right: 7px;
      bottom: 7px;
      width: 30px;
      height: 30px;
    }
    .mf-v21-row-add {
      width: 38px;
      height: 38px;
    }
    .mf-v21-sold {
      width: auto;
      min-width: 42px;
      padding: 0 8px;
      background: var(--mf-sold-out);
      font-size: 11px;
    }
    .mf-v21-popular-more {
      display: grid;
      place-items: center;
      width: 34px;
      min-height: 100%;
      border: 0;
      border-radius: var(--radius-lg);
      background: color-mix(in srgb, var(--mf-card-warm) 86%, white);
      color: var(--mf-brown);
      font-size: 26px;
      font-weight: 800;
    }
    .mf-v21-list {
      min-height: 0;
      overflow-y: auto;
      display: grid;
      align-content: start;
      gap: 12px;
      padding: 4px 0 14px;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
    }
    .mf-v21-section { scroll-margin-top: 8px; }
    .mf-v21-section-head {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 10px;
      padding: 8px 0 9px;
    }
    .mf-v21-section-head div {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }
    .mf-v21-section-head i {
      display: grid;
      place-items: center;
      width: 26px;
      height: 26px;
      border-radius: var(--radius-pill);
      background: var(--mf-card-warm);
      color: var(--mf-brown);
      font-style: normal;
      font-weight: 900;
    }
    .mf-v21-section-head h2 {
      margin: 0;
      color: var(--mf-brown);
      font-size: 18px;
      line-height: 1.1;
    }
    .mf-v21-section-head span {
      color: var(--mf-muted);
      font-size: 12px;
      white-space: nowrap;
    }
    .mf-v21-section-list { display: grid; gap: 10px; }
    .mf-v21-row {
      display: grid;
      grid-template-columns: 92px 1fr 42px;
      gap: 12px;
      align-items: center;
      min-height: 108px;
      border: 1px solid var(--mf-border);
      border-radius: var(--radius-xl);
      background: var(--mf-card);
      padding: 8px;
      box-shadow: var(--shadow-sm);
    }
    .mf-v21-row-media {
      width: 92px;
      height: 88px;
      overflow: hidden;
      border-radius: var(--radius-md);
      background: var(--mf-card-warm);
    }
    .mf-v21-row-copy {
      min-width: 0;
      display: grid;
      gap: 5px;
    }
    .mf-v21-row-copy p { min-height: 18px; }
    .mf-v21-placeholder {
      display: grid;
      width: 100%;
      height: 100%;
      place-items: center;
      color: var(--mf-muted);
      font-size: var(--font-xs);
      font-weight: 900;
    }
    .mf-v21-row.sold-out,
    .mf-v21-pop-card.sold-out { opacity: 0.58; filter: grayscale(0.85); }
    .mf-v21-layout.is-collapsed .mf-v21-popular { min-height: 86px; }
    .mf-v21-layout.is-collapsed .mf-v21-popular-head { display: none; }
    .mf-v21-layout.is-collapsed .mf-v21-popular-rail {
      grid-auto-columns: calc((100% - 26px) / 3.2);
      gap: 8px;
      padding: 7px 0 9px;
    }
    .mf-v21-layout.is-collapsed .mf-v21-pop-card {
      height: 70px;
      border-radius: 16px;
    }
    .mf-v21-layout.is-collapsed .mf-v21-pop-media {
      height: 100%;
      border-radius: 16px;
    }
    .mf-v21-layout.is-collapsed .mf-v21-pop-body { display: none; }
    .mf-v21-layout.is-collapsed .mf-v21-popular-more {
      width: 30px;
      min-height: 70px;
      font-size: 22px;
    }
    .mf-v21-layout.is-collapsed .mf-v21-pop-add {
      width: 28px;
      height: 28px;
      right: 6px;
      bottom: 6px;
    }
    .mf-v21-seed {
      position: fixed;
      right: max(12px, calc((100vw - var(--app-max-width)) / 2 + 12px));
      bottom: calc(var(--bottom-nav-height) + var(--memory-jar-height) + var(--safe-bottom) + 28px);
      z-index: calc(var(--z-memory-jar) + 1);
      display: flex;
      align-items: end;
      gap: 8px;
      pointer-events: none;
    }
    .mf-v21-seed-toggle,
    .mf-v21-seed-panel {
      pointer-events: auto;
      border: 1px solid rgba(234, 223, 206, 0.82);
      background: rgba(255, 248, 237, 0.84);
      backdrop-filter: blur(14px);
      box-shadow: var(--shadow-md);
    }
    .mf-v21-seed-toggle {
      position: relative;
      display: grid;
      gap: 2px;
      place-items: center;
      width: 58px;
      min-height: 76px;
      border-radius: 28px;
      color: var(--mf-brown);
      font-weight: 900;
      padding: 8px 6px;
    }
    .mf-v21-seed-toggle i {
      display: grid;
      place-items: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #f0e1f1;
      color: #715178;
      font-style: normal;
    }
    .mf-v21-seed-toggle span {
      position: absolute;
      top: -5px;
      right: -4px;
      margin: 0;
      background: var(--mf-brown);
    }
    .mf-v21-seed-toggle b {
      font-size: 11px;
      writing-mode: vertical-rl;
      letter-spacing: 1px;
    }
    .mf-v21-seed-panel {
      display: none;
      width: 138px;
      border-radius: 22px;
      padding: 8px;
    }
    .mf-v21-seed.open .mf-v21-seed-panel { display: grid; gap: 4px; }
    .mf-v21-seed-panel button {
      display: grid;
      grid-template-columns: 24px 1fr auto;
      align-items: center;
      gap: 6px;
      min-height: 34px;
      border: 0;
      border-radius: 14px;
      background: transparent;
      color: var(--mf-muted);
      padding: 0 8px;
      text-align: left;
      font-weight: 850;
    }
    .mf-v21-seed-panel button.active {
      background: rgba(240, 225, 241, 0.9);
      color: var(--mf-brown);
    }
    .mf-v21-seed-panel button i,
    .mf-v21-seed-panel button em {
      font-style: normal;
    }
    .mf-v21-seed-panel button span {
      margin: 0;
      min-width: 18px;
      height: 18px;
      background: var(--mf-brown);
    }
    @media (max-width: 360px) {
      .mf-v21-row { grid-template-columns: 82px 1fr 38px; }
      .mf-v21-row-media { width: 82px; }
      .mf-v21-tab { padding: 0 12px; }
    }
  `;
  document.head.appendChild(style);
}
