import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = new URL("..", import.meta.url);
const dist = new URL("../dist_staging/", import.meta.url);
const distPath = fileURLToPath(dist);
const files = [
  "index.html",
  "boot.js",
  "morefunApiClient.js",
  "front-app.js",
  "front-app.css",
  "admin-cms.js",
  "admin-cms.css"
];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const file of files) {
  await cp(new URL(file, root), new URL(file, dist));
}

await writeFile(join(distPath, "_redirects"), "/* /index.html 200\n", "utf8");
console.log("dist_staging build PASS");
