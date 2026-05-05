import { mkdir, writeFile } from "node:fs/promises";

const site = "https://www.laprodufilms.com";
const langs = ["es", "ca", "en"];
const sections = ["", "servicios", "portfolio", "metodo", "blog", "faq", "contacto"];
const legal = ["politica-privacidad", "aviso-legal", "cookies"];
const landings = [
  "productora-audiovisual-barcelona",
  "video-corporativo-barcelona",
  "produccion-documentales-barcelona",
  "video-eventos-barcelona",
  "spot-publicitario-barcelona",
  "postproduccion-video-barcelona",
];
const projects = [
  "secundaris",
  "inspira",
  "la-nit-de-reis",
  "martina-matencio",
  "guillermina-baeza",
  "bofill",
  "chroma",
  "mwc2025",
  "cal-blay",
  "sonisord",
  "optica-2000",
  "cedec-casos-exito",
  "norai-corporativo",
  "norai-director-mmb",
  "norai-chef",
  "mwc2024",
  "mwc2023",
  "cedec-consultora",
  "valldaura-labs",
  "rcr-arquitectes",
  "secundaris-capitulo-6",
];
const posts = [
  "entrevista-documental-2026",
  "evento-contenido-reutilizable-2026",
  "briefing-video-corporativo-2026",
  "planificar-contenido-redes-rodaje-2026",
  "postproduccion-entregables-finales-2026",
  "produccion-audiovisual-television-marcas-2026",
  "fotografia-corporativa-barcelona-2026",
  "fotografia-eventos-corporativos-2026",
  "iluminacion-video-corporativo-2026",
  "luz-entrevistas-documentales-2026",
  "audio-profesional-rodaje-video-2026",
  "sonido-entrevistas-eventos-2026",
];

function url(lang, path = "") {
  return `${site}/${lang}/${path ? `${path.replace(/^\/|\/$/g, "")}/` : ""}`;
}

const routePaths = [];
for (const lang of langs) {
  routePaths.push(...sections.map((section) => url(lang, section)));
  routePaths.push(...legal.map((section) => url(lang, section)));
  routePaths.push(...landings.map((section) => url(lang, section)));
  routePaths.push(...projects.map((slug) => url(lang, `portfolio/${slug}`)));
  routePaths.push(...posts.map((slug) => url(lang, `blog/${slug}`)));
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...new Set(routePaths)].map((loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${loc.includes("/blog/") ? "monthly" : "weekly"}</changefreq>
    <priority>${loc.match(/\/(portfolio|blog)\//) ? "0.8" : "0.9"}</priority>
  </url>`).join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml
`;

const redirects = `/* /index.html 200
`;

await mkdir("public", { recursive: true });
await writeFile("public/sitemap.xml", sitemap);
await writeFile("public/robots.txt", robots);
await writeFile("public/_redirects", redirects);
