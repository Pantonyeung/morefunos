import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../front-app.js", import.meta.url), "utf8");
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

const uiChecks = [
  ["UI01 Home", "function homePage", "homepage.read"],
  ["UI02 Menu", "function menuPage", "menu.read"],
  ["UI03 Product Detail", "function productDetailPage", "product.detail.read"],
  ["UI04-UI09 Meal Pages", "detailOptions", "meal_drink_options"],
  ["UI10 Memory Jar", "function memoryJarPage", "cart.calculate"],
  ["UI11 My Orders", "function ordersPage", "order.history.read"],
  ["UI12 Payment Method", "function paymentPage", "payment.methods.read"],
  ["UI13 My Memory", "function memberPage", "customer.memory.read"]
];

const requiredRoutes = [
  "/",
  "/menu",
  "/product/",
  "/memory-jar",
  "/orders",
  "/payment",
  "/member"
];

const requiredActions = [
  "settings.read",
  "featureFlags.read",
  "homepage.read",
  "menu.read",
  "product.detail.read",
  "cart.calculate",
  "payment.methods.read",
  "order.submitWhatsAppPayload",
  "order.history.read",
  "customer.identify",
  "customer.memory.read",
  "badge.list"
];

const forbiddenVisible = [
  "付款成功",
  "已付款",
  "已核實",
  "已收款",
  "製作中",
  "已接單",
  "可取餐",
  "已完成",
  "配送狀態",
  "付款證明上載",
  "上載付款截圖",
  "八達通",
  "信用卡",
  "積分商城",
  "扣記憶種子"
];

const failures = [];
for (const [label, marker, action] of uiChecks) {
  if (!source.includes(marker) || !source.includes(action)) failures.push(`${label} missing marker/action`);
}
for (const route of requiredRoutes) {
  if (!source.includes(route)) failures.push(`route missing ${route}`);
}
for (const action of requiredActions) {
  if (!source.includes(action)) failures.push(`action missing ${action}`);
}
for (const text of forbiddenVisible) {
  if (source.includes(text)) failures.push(`forbidden visible text present ${text}`);
}
if (!html.includes("boot.js") || !source.includes("morefunApiClient.js")) {
  failures.push("frontend bootstrap/client missing");
}
if (!source.includes("記憶罐") || !source.includes("待店舖確認") || !source.includes("到店付款")) {
  failures.push("locked wording missing");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("UI01-UI13 frontend acceptance checks PASS");
