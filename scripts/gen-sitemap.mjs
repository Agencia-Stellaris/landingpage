// Regenerates public/sitemap.xml using each route's most recent git commit
// date as <lastmod>. Falls back to today when the file has no git history
// (fresh route, CI shallow clone, etc.). Run via the `build` script in
// package.json so every deploy ships an honest sitemap.
//
// /recursos is intentionally omitted — see project_recursos_unlisted memory.

import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://www.stellaris.com.co";
const TODAY = new Date().toISOString().slice(0, 10);

const ROUTES = [
  {
    url: "/",
    priority: "1.0",
    changefreq: "weekly",
    files: ["src/pages/HomePage.tsx", "src/data/content.ts", "src/data/home.ts"],
  },
  {
    url: "/servicios/whatsapp-marketing",
    priority: "0.8",
    changefreq: "monthly",
    files: ["src/pages/WhatsAppMarketingPage.tsx", "src/data/services/whatsapp-marketing.ts"],
  },
  {
    url: "/servicios/redes-sociales",
    priority: "0.8",
    changefreq: "monthly",
    files: ["src/pages/RedesSocialesPage.tsx", "src/data/services/redes-sociales.ts"],
  },
  {
    url: "/servicios/desarrollo-web",
    priority: "0.8",
    changefreq: "monthly",
    files: ["src/pages/DesarrolloWebPage.tsx", "src/data/services/desarrollo-web.ts"],
  },
  {
    url: "/servicios/email-marketing",
    priority: "0.8",
    changefreq: "monthly",
    files: ["src/pages/EmailMarketingPage.tsx", "src/data/services/email-marketing.ts"],
  },
  {
    url: "/politica-de-privacidad",
    priority: "0.3",
    changefreq: "yearly",
    files: ["src/pages/PrivacyPolicyPage.tsx"],
  },
];

function lastmodFor(files) {
  const dates = [];
  for (const f of files) {
    try {
      const out = execSync(`git log -1 --format=%cs -- "${f}"`, {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
      if (out) dates.push(out);
    } catch {
      // file untracked or git unavailable — skip
    }
  }
  if (!dates.length) return TODAY;
  return dates.sort().pop();
}

const body = ROUTES.map((r) => {
  const lastmod = lastmodFor(r.files);
  return `  <url>
    <loc>${SITE}${r.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
}).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

writeFileSync(resolve(ROOT, "public/sitemap.xml"), xml, "utf8");
console.log(`✓ sitemap.xml regenerated (${ROUTES.length} routes)`);
