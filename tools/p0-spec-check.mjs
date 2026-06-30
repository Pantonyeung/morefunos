import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../front-app.js", import.meta.url), "utf8");
const css = await readFile(new URL("../front-app.css", import.meta.url), "utf8");
const admin = await readFile(new URL("../admin-cms.js", import.meta.url), "utf8");

const requiredSource = [
  ["Phase 3 marked needs fix context", "detailDrafts"],
  ["AppShell route surfaces", "mf-shell"],
  ["Purple rice lock", "isPurpleProduct"],
  ["Add merge by configuration", "configSignature"],
  ["Add lock", "addingKeys"],
  ["Riceball chips", "ingredientAdjustments"],
  ["Cheese toggle", "data-detail-toggle=\"cheese\""],
  ["Meal drink two layer", "檸檬飲品｜已包含"],
  ["No drink option", "無需飲品 -$1"],
  ["Bento rice base", "data-rice-base"],
  ["Bento curry excludes egg through chips", "咖喱調整"],
  ["UI13 identity", "小米粒身份"],
  ["UI13 progress", "mf-progress"],
  ["SHOP_WHATSAPP_NUMBER", "SHOP_WHATSAPP_NUMBER"],
  ["WhatsApp title", "磨飯 More Fun 自取訂單"],
  ["Hong Kong time business status", "Asia/Hong_Kong"],
  ["Option product opens detail", "productRequiresDetail"],
  ["Drink single page controls", "function drinkControls"],
  ["Supported five payments", "supportedPaymentMethods"],
  ["Purple audit mode", "purpleAuditMode"],
  ["Purple audit URL flag", "audit_zimi"],
  ["Home shop quote", "shopQuote"],
  ["Jar icon badge", "mf-jar-icon"]
];

const requiredAdmin = [
  ["Admin Traditional Chinese login", "後台登入"],
  ["Admin form editor", "data-row-form"],
  ["Admin field labels", "function fieldLabel"],
  ["Admin save confirm", "確認儲存"],
  ["Admin risk confirm", "售罄、停用或隱藏"],
  ["Admin human success", "已儲存，後台已寫入操作紀錄"]
];

const requiredCss = [
  ["100dvh AppShell", "100dvh"],
  ["Body no full scroll", "overflow: hidden"],
  ["Fixed header", ".mf-header"],
  ["Safe area", "safe-area-inset-bottom"],
  ["Scrollable middle", "overflow-y: auto"],
  ["Fixed detail bottom", ".mf-detail-bottom"]
];

const forbidden = [
  "付款成功",
  "已付款",
  "已核實",
  "已收款",
  "配送狀態",
  "付款證明上載",
  "上載付款截圖",
  "信用卡",
  "八達通",
  "積分商城",
  "購物車",
  "填入 QR 圖片網址",
  "生成 WhatsApp",
  "自取餐點",
  "立即點單",
  "二層選擇",
  "可互動",
  "chips / popover"
];

const forbiddenAdmin = [
  "Admin Login",
  "Edit JSON",
  "Selected row",
  "Save update",
  "Invalid JSON.",
  "Copy JSON"
];

const failures = [];
for (const [label, marker] of requiredSource) {
  if (!source.includes(marker)) failures.push(`missing source marker: ${label}`);
}
for (const [label, marker] of requiredCss) {
  if (!css.includes(marker)) failures.push(`missing css marker: ${label}`);
}
for (const [label, marker] of requiredAdmin) {
  if (!admin.includes(marker)) failures.push(`missing admin marker: ${label}`);
}
for (const text of forbidden) {
  if (source.includes(text)) failures.push(`forbidden text present: ${text}`);
}
for (const text of forbiddenAdmin) {
  if (admin.includes(text)) failures.push(`forbidden admin text present: ${text}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("P0 UI01-UI13 spec compliance checks PASS");
