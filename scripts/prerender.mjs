import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const template = await readFile(path.join(distDir, "index.html"), "utf-8");
const sitemap = await readFile(path.join(distDir, "sitemap.xml"), "utf-8");
const { render } = await import(pathToFileURL(path.join(distDir, "server/entry-server.js")));

const paths = [...sitemap.matchAll(/<loc>https:\/\/www\.laprodufilms\.com([^<]+)<\/loc>/g)]
  .map((match) => match[1])
  .filter((value, index, list) => list.indexOf(value) === index);

function escapeAttr(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function escapeJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function headTags({ seo, lang, pathname }) {
  const canonical = `https://www.laprodufilms.com${seo.canonicalPath}`;
  const alternates = ["es", "ca", "en"]
    .map((locale) => {
      const localePath = pathname.replace(/^\/(es|ca|en)(\/|$)/, `/${locale}$2`);
      return `<link rel="alternate" hreflang="${locale}" href="https://www.laprodufilms.com${localePath}" />`;
    })
    .join("\n    ");

  return `<title>${escapeAttr(seo.title)}</title>
    <meta name="description" content="${escapeAttr(seo.description)}" />
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
    <link rel="canonical" href="${escapeAttr(canonical)}" />
    ${alternates}
    <link rel="alternate" hreflang="x-default" href="https://www.laprodufilms.com${pathname.replace(/^\/(es|ca|en)(\/|$)/, "/es$2")}" />
    <meta property="og:type" content="${pathname.includes("/blog/") ? "article" : "website"}" />
    <meta property="og:site_name" content="LAPRODU FILMS" />
    <meta property="og:title" content="${escapeAttr(seo.title)}" />
    <meta property="og:description" content="${escapeAttr(seo.description)}" />
    <meta property="og:url" content="${escapeAttr(canonical)}" />
    <meta property="og:image" content="${escapeAttr(seo.image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(seo.title)}" />
    <meta name="twitter:description" content="${escapeAttr(seo.description)}" />
    <meta name="twitter:image" content="${escapeAttr(seo.image)}" />
    ${seo.jsonLd.map((schema, index) => `<script type="application/ld+json" data-laprodu-schema="${index}">${escapeJson(schema)}</script>`).join("\n    ")}`;
}

function injectHtml({ pathname, rendered }) {
  const head = headTags({ seo: rendered.seo, lang: rendered.lang, pathname });

  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${rendered.lang}">`)
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta\s+name="description"[\s\S]*?>\s*/g, "")
    .replace(/<meta\s+name="robots"[\s\S]*?>\s*/g, "")
    .replace(/<link\s+rel="canonical"[\s\S]*?>\s*/g, "")
    .replace(/<link\s+rel="alternate"[\s\S]*?>\s*/g, "")
    .replace(/<meta\s+(property|name)="(?:og|twitter):[\s\S]*?>\s*/g, "")
    .replace("</head>", `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${rendered.html}</div>`);
}

for (const pathname of paths) {
  const rendered = render(pathname);
  const html = injectHtml({ pathname, rendered });
  const outputDir = path.join(distDir, pathname);
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, "index.html"), html);
}

const home = render("/es/");
await writeFile(path.join(distDir, "index.html"), injectHtml({ pathname: "/es/", rendered: home }));
