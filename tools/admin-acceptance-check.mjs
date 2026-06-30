import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../admin-cms.js", import.meta.url), "utf8");
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

const requiredRoutes = [
  "/admin/login",
  "/admin/dashboard",
  "/admin/orders",
  "/admin/products",
  "/admin/availability",
  "/admin/categories-tags",
  "/admin/options-modifiers",
  "/admin/meal-rules",
  "/admin/meal-drinks",
  "/admin/homepage",
  "/admin/recommendations",
  "/admin/payment-methods",
  "/admin/customer-memory",
  "/admin/rewards",
  "/admin/badges",
  "/admin/whatsapp-rules",
  "/admin/settings",
  "/admin/audit-logs"
];

const requiredActions = [
  "admin.login",
  "admin.dashboard.read",
  "admin.orders.read",
  "admin.products.read",
  "admin.products.update",
  "admin.availability.update",
  "admin.categories.read",
  "admin.categories.update",
  "admin.productTags.read",
  "admin.productTags.update",
  "admin.productTagMap.read",
  "admin.productTagMap.update",
  "admin.modifierGroups.read",
  "admin.modifierGroups.update",
  "admin.modifierOptions.read",
  "admin.modifierOptions.update",
  "admin.ingredientOptions.read",
  "admin.ingredientOptions.update",
  "admin.bentoAdjustmentGroups.read",
  "admin.bentoAdjustmentGroups.update",
  "admin.bentoAdjustmentOptions.read",
  "admin.bentoAdjustmentOptions.update",
  "admin.saladSauceOptions.read",
  "admin.saladSauceOptions.update",
  "admin.fixedRiceballMeals.read",
  "admin.fixedRiceballMeals.update",
  "admin.fixedMealIncludedItems.read",
  "admin.fixedMealIncludedItems.update",
  "admin.customRiceballMealConfig.read",
  "admin.customRiceballMealConfig.update",
  "admin.comboRules.read",
  "admin.comboRules.update",
  "admin.priceRules.read",
  "admin.priceRules.update",
  "admin.mealDisplayRules.read",
  "admin.mealDisplayRules.update",
  "admin.packagingFeeRules.read",
  "admin.packagingFeeRules.update",
  "admin.mealDrinkOptions.read",
  "admin.mealDrinkOptions.update",
  "admin.homepage.read",
  "admin.homepage.update",
  "admin.recommendations.read",
  "admin.recommendations.update",
  "admin.paymentMethods.read",
  "admin.paymentMethods.update",
  "admin.customerMemory.read",
  "admin.customerMemory.update",
  "admin.customerCoupons.read",
  "admin.customerCoupons.update",
  "admin.rewardRules.read",
  "admin.rewardRules.update",
  "admin.couponTemplates.read",
  "admin.couponTemplates.update",
  "admin.badgeRules.read",
  "admin.badgeRules.update",
  "admin.whatsAppRules.read",
  "admin.whatsAppRules.update",
  "admin.settings.read",
  "admin.settings.update",
  "admin.featureFlags.read",
  "admin.featureFlags.update",
  "admin.audit.read"
];

const forbidden = [
  "payment proof upload",
  "payment success",
  "paid / verified",
  "live order status",
  "delivery",
  "credit card",
  "Octopus",
  "points mall",
  "hard delete"
];

const missingRoutes = requiredRoutes.filter(route => !source.includes(route));
const missingActions = requiredActions.filter(action => !source.includes(action));
const forbiddenHits = forbidden.filter(term => source.toLowerCase().includes(term.toLowerCase()) && !source.includes("forbiddenText"));
const hasAppMount = html.includes('id="app"') && html.includes("boot.js") && source.includes("/admin/login");
const hasTokenContext = source.includes("admin_token") && source.includes("context:");
const hasConfirm = source.includes("confirm(");

if (missingRoutes.length || missingActions.length || forbiddenHits.length || !hasAppMount || !hasTokenContext || !hasConfirm) {
  console.error(JSON.stringify({ missingRoutes, missingActions, forbiddenHits, hasAppMount, hasTokenContext, hasConfirm }, null, 2));
  process.exit(1);
}

console.log("Admin CMS acceptance checks PASS");
