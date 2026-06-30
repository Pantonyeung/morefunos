const path = location.pathname.replace(/\/$/, "") || "/";

if (path.startsWith("/admin")) {
  await import("/admin-cms.js");
} else {
  await import("/front-app.js");
}
