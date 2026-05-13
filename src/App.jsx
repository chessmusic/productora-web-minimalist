import { useEffect, useMemo, useState } from "react";

const SITE_URL = "https://www.laprodufilms.com";
const LANGS = ["es", "ca", "en"];
const DEFAULT_LANG = "es";
const BUSINESS_ID = `${SITE_URL}/#laprodu-films`;
const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID || "";
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID || "";
const GOOGLE_TAG_ID = GOOGLE_ADS_ID || GA_MEASUREMENT_ID;
const CONSENT_STORAGE_KEY = "laprodu-cookie-consent";

const reelUrl =
  "https://player.vimeo.com/video/1035928354?h=da15957380&badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0&dnt=1";

const copy = {
  es: {
    nav: ["Inicio", "Servicios", "Portfolio", "Método", "Blog", "FAQ", "Contacto"],
    contactCta: "Contáctanos",
    heroKicker: "Productora audiovisual en Barcelona",
    heroTitle: "Creamos y contamos historias que despiertan emociones y dejan huella.",
    heroSubtitle: "Productora audiovisual para televisión, documentales, reportajes, corporativos y publicidad.",
    heroText:
      "Nuestro desafío es narrarlas a través de diversos formatos: programas de televisión, documentales, reportajes, corporativos, publicidad, eventos, fotografía, redes sociales y postproducción. Disfrutamos cada paso de lo que hacemos y nos encantaría que formases parte de los créditos de nuestro próximo proyecto.",
    heroPrimary: "Ver portfolio",
    heroSecondary: "Hablar con producción",
    reelLabel: "Reel LAPRODU FILMS",
    reelText: "Una selección de trabajos para televisión, marcas, instituciones y proyectos sociales.",
    servicesTitle: "Servicios audiovisuales",
    servicesIntro:
      "Producción audiovisual para televisión, documentales, reportajes, corporativos, eventos, fotografía, redes sociales, publicidad y postproducción.",
    portfolioTitle: "Portfolio",
    portfolioIntro:
      "Una selección de trabajos recientes para televisión, marcas, instituciones, proyectos sociales y coberturas internacionales.",
    methodTitle: "De la idea al entregable final",
    blogTitle: "Blog y notas de producción",
    blogIntro:
      "Entradas pensadas para compartir criterio de producción, preparación de rodajes y aprendizaje acumulado en televisión, eventos y piezas corporativas.",
    faqTitle: "Preguntas habituales",
    servicesLabel: "Servicios",
    methodLabel: "Método",
    contactLabel: "Contacto",
    footerLine: "© 2026 LAPRODU FILMS — Producción nacional e internacional.",
    privacyLabel: "Política de privacidad",
    legalLabel: "Aviso legal",
    cookiesLabel: "Cookies",
    contactTitle: "¿Ponemos tu proyecto en preproducción?",
    contactText:
      "Cuéntanos el objetivo, la fecha aproximada, ciudad de rodaje y formatos que necesitas. Responderemos con una primera lectura de alcance.",
    formName: "Nombre",
    formEmail: "Email",
    formProject: "Proyecto",
    formBudget: "Rango de presupuesto",
    formSelect: "Seleccionar",
    formBudgetOpen: "Proyecto abierto",
    formSubmit: "Enviar",
    formError: "Revisa nombre, email y descripción del proyecto.",
    formSuccessTitle: "Mensaje preparado.",
    formSuccessText: "Se ha abierto tu correo con la información del proyecto. Solo falta revisar y enviar el email.",
    formNewBrief: "Nuevo mensaje",
    footer: "Productora audiovisual para televisión, marcas, instituciones y cultura.",
    cookieBannerTitle: "Cookies y medición",
    cookieBannerText:
      "Usamos cookies técnicas y, si aceptas, medición para Google Ads/Analytics. Nos ayuda a saber qué campañas funcionan y mejorar la web.",
    cookieAccept: "Aceptar medición",
    cookieReject: "Solo necesarias",
    cookieSettings: "Gestionar cookies",
  },
  en: {
    nav: ["Home", "Services", "Work", "Method", "Blog", "FAQ", "Contact"],
    contactCta: "Contact us",
    heroKicker: "Audiovisual production company in Barcelona",
    heroTitle: "We create and tell stories that move people and leave a mark.",
    heroSubtitle: "Audiovisual production for television, documentaries, reports, corporate films and advertising.",
    heroText:
      "Our challenge is to tell them through different formats: television programmes, documentaries, reports, corporate films, advertising, events, photography, social media and postproduction. We enjoy every step of the process and would love you to be part of the credits of our next project.",
    heroPrimary: "View work",
    heroSecondary: "Talk to production",
    reelLabel: "LAPRODU FILMS reel",
    reelText: "Selected work for television, brands, institutions and social projects.",
    servicesTitle: "Audiovisual services",
    servicesIntro:
      "Audiovisual production for television, documentaries, reports, corporate films, events, photography, social media, advertising and postproduction.",
    portfolioTitle: "Portfolio",
    portfolioIntro:
      "Selected recent work for television, brands, institutions, social projects and international event coverage.",
    methodTitle: "From idea to final delivery",
    blogTitle: "Blog and production notes",
    blogIntro:
      "Posts for sharing production criteria, shoot preparation and lessons learned across television, events and corporate films.",
    faqTitle: "Common questions",
    servicesLabel: "Services",
    methodLabel: "Method",
    contactLabel: "Contact",
    footerLine: "© 2026 LAPRODU FILMS — National and international production.",
    privacyLabel: "Privacy policy",
    legalLabel: "Legal notice",
    cookiesLabel: "Cookies",
    contactTitle: "Shall we move your project into pre-production?",
    contactText:
      "Tell us the goal, approximate date, shooting city and required formats. We will reply with a first scope reading.",
    formName: "Name",
    formEmail: "Email",
    formProject: "Project",
    formBudget: "Budget range",
    formSelect: "Select",
    formBudgetOpen: "Open project",
    formSubmit: "Send",
    formError: "Please review name, email and project description.",
    formSuccessTitle: "Message prepared.",
    formSuccessText: "Your email client has opened with the project information. Just review it and send the email.",
    formNewBrief: "New message",
    footer: "Audiovisual production for television, brands, institutions and culture.",
    cookieBannerTitle: "Cookies and measurement",
    cookieBannerText:
      "We use technical cookies and, if you accept, measurement for Google Ads/Analytics. This helps us understand which campaigns work and improve the website.",
    cookieAccept: "Accept measurement",
    cookieReject: "Necessary only",
    cookieSettings: "Manage cookies",
  },
  ca: {
    nav: ["Inici", "Serveis", "Portfolio", "Mètode", "Blog", "FAQ", "Contacte"],
    contactCta: "Contacta'ns",
    heroKicker: "Productora audiovisual a Barcelona",
    heroTitle: "Creem i expliquem històries que desperten emocions i deixen empremta.",
    heroSubtitle: "Productora audiovisual per a televisió, documentals, reportatges, corporatius i publicitat.",
    heroText:
      "El nostre repte és narrar-les a través de diversos formats: programes de televisió, documentals, reportatges, corporatius, publicitat, esdeveniments, fotografia, xarxes socials i postproducció. Gaudim cada pas del que fem i ens encantaria que formessis part dels crèdits del nostre proper projecte.",
    heroPrimary: "Veure portfolio",
    heroSecondary: "Parlar amb producció",
    reelLabel: "Reel LAPRODU FILMS",
    reelText: "Una selecció de treballs per a televisió, marques, institucions i projectes socials.",
    servicesTitle: "Serveis audiovisuals",
    servicesIntro:
      "Producció audiovisual per a televisió, documentals, reportatges, corporatius, esdeveniments, fotografia, xarxes socials, publicitat i postproducció.",
    portfolioTitle: "Portfolio",
    portfolioIntro:
      "Una selecció de treballs recents per a televisió, marques, institucions, projectes socials i cobertures internacionals.",
    methodTitle: "De la idea al lliurament final",
    blogTitle: "Blog i notes de producció",
    blogIntro:
      "Entrades pensades per compartir criteri de producció, preparació de rodatges i aprenentatge acumulat en televisió, esdeveniments i peces corporatives.",
    faqTitle: "Preguntes habituals",
    servicesLabel: "Serveis",
    methodLabel: "Mètode",
    contactLabel: "Contacte",
    footerLine: "© 2026 LAPRODU FILMS — Producció nacional i internacional.",
    privacyLabel: "Política de privacitat",
    legalLabel: "Avís legal",
    cookiesLabel: "Cookies",
    contactTitle: "Posem el teu projecte en preproducció?",
    contactText:
      "Explica'ns l'objectiu, la data aproximada, la ciutat de rodatge i els formats que necessites. Respondrem amb una primera lectura d'abast.",
    formName: "Nom",
    formEmail: "Email",
    formProject: "Projecte",
    formBudget: "Rang de pressupost",
    formSelect: "Seleccionar",
    formBudgetOpen: "Projecte obert",
    formSubmit: "Enviar",
    formError: "Revisa nom, email i descripció del projecte.",
    formSuccessTitle: "Missatge preparat.",
    formSuccessText: "S'ha obert el teu correu amb la informació del projecte. Només falta revisar i enviar l'email.",
    formNewBrief: "Nou missatge",
    footer: "Productora audiovisual per a televisió, marques, institucions i cultura.",
    cookieBannerTitle: "Cookies i mesurament",
    cookieBannerText:
      "Fem servir cookies tècniques i, si acceptes, mesurament per a Google Ads/Analytics. Ens ajuda a saber quines campanyes funcionen i millorar la web.",
    cookieAccept: "Acceptar mesurament",
    cookieReject: "Només necessàries",
    cookieSettings: "Gestionar cookies",
  },
};

const services = {
  es: [
    { title: "Documentales", text: "Desarrollo, guion, entrevistas, rodaje, montaje y master para historias con mirada propia.", image: "/laprodu/fotos/rodaje-documental-entrevista-laprodu-films.jpg", deliverable: "Series documentales, teasers y piezas web" },
    { title: "Televisión", text: "Reportajes, programas, cápsulas y contenido pensado para emisión, archivo y continuidad editorial.", image: "/laprodu/fotos/reportaje-television-rtve-rosales-laprodu-films.png", deliverable: "RTVE La 2 Catalunya, reportaje y magazine" },
    { title: "Vídeos corporativos", text: "Piezas de empresa, testimonios, casos de éxito y presentaciones con tono cercano y narrativo.", image: "/laprodu/fotos/video-corporativo-rodaje-empresa-laprodu-films.jpg", deliverable: "Corporativo, consultora, social y marca", cta: "Ver enfoque para vídeo corporativo", landingSlug: "video-corporativo-auditado-2026" },
    { title: "Eventos", text: "Cobertura, entrevistas, aftermovie, fotografía y entregas rápidas para comunicar durante y después del evento.", image: "/laprodu/fotos/cobertura-eventos-aftermovie-laprodu-films.jpg", deliverable: "Aftermovie, clips, fotos y reels" },
    { title: "Fotografía", text: "Retrato, backstage, producto, prensa y bancos de imagen para campañas y comunicación recurrente.", image: "/laprodu/fotos/fotografia-corporativa-rodaje-laprodu-films.jpg", deliverable: "Selección editada y archivo final" },
    { title: "Redes sociales", text: "Formatos verticales, teasers, subtítulos y adaptaciones por canal desde la planificación del rodaje.", image: "/laprodu/fotos/contenido-redes-sociales-video-laprodu-films.jpg", deliverable: "Reels, shorts, stories y social ads" },
    { title: "Publicidad", text: "Spots, branded content y piezas promocionales con concepto, dirección y producción ajustada a campaña.", image: "/laprodu/fotos/spot-publicitario-producto-laprodu-films.jpg", deliverable: "Spot, promo, pre-roll y paid media" },
    { title: "Postproducción", text: "Edición, color, grafismo, mezcla, subtítulos, versiones, conformado y entregables técnicos.", image: "/laprodu/fotos/postproduccion-video-edicion-color-laprodu-films.jpg", deliverable: "Masters finales y versiones" },
  ],
  en: [
    { title: "Documentaries", text: "Development, script, interviews, shooting, editing and mastering for stories with a clear point of view.", image: "/laprodu/fotos/rodaje-documental-entrevista-laprodu-films.jpg", deliverable: "Documentary series, teasers and web pieces" },
    { title: "Television", text: "Reports, programmes, capsules and content designed for broadcast, archive and editorial continuity.", image: "/laprodu/fotos/reportaje-television-rtve-rosales-laprodu-films.png", deliverable: "RTVE La 2 Catalunya, reports and magazines" },
    { title: "Corporate videos", text: "Company films, testimonials, success cases and presentations with a close narrative tone.", image: "/laprodu/fotos/video-corporativo-rodaje-empresa-laprodu-films.jpg", deliverable: "Corporate, consultancy, social and brand", cta: "View corporate video approach", landingSlug: "video-corporativo-auditado-2026" },
    { title: "Events", text: "Coverage, interviews, aftermovies, photography and fast delivery for communication during and after the event.", image: "/laprodu/fotos/cobertura-eventos-aftermovie-laprodu-films.jpg", deliverable: "Aftermovie, clips, photos and reels" },
    { title: "Photography", text: "Portrait, backstage, product, press and image banks for campaigns and ongoing communication.", image: "/laprodu/fotos/fotografia-corporativa-rodaje-laprodu-films.jpg", deliverable: "Edited selection and final archive" },
    { title: "Social media", text: "Vertical formats, teasers, subtitles and channel adaptations planned from the shoot.", image: "/laprodu/fotos/contenido-redes-sociales-video-laprodu-films.jpg", deliverable: "Reels, shorts, stories and social ads" },
    { title: "Advertising", text: "Spots, branded content and promotional films with concept, direction and campaign-ready production.", image: "/laprodu/fotos/spot-publicitario-producto-laprodu-films.jpg", deliverable: "Spot, promo, pre-roll and paid media" },
    { title: "Postproduction", text: "Editing, color, graphics, mixing, subtitles, versions, conforming and technical deliverables.", image: "/laprodu/fotos/postproduccion-video-edicion-color-laprodu-films.jpg", deliverable: "Final masters and versions" },
  ],
  ca: [
    { title: "Documentals", text: "Desenvolupament, guió, entrevistes, rodatge, muntatge i màster per a històries amb mirada pròpia.", image: "/laprodu/fotos/rodaje-documental-entrevista-laprodu-films.jpg", deliverable: "Sèries documentals, teasers i peces web" },
    { title: "Televisió", text: "Reportatges, programes, càpsules i contingut pensat per a emissió, arxiu i continuïtat editorial.", image: "/laprodu/fotos/reportaje-television-rtve-rosales-laprodu-films.png", deliverable: "RTVE La 2 Catalunya, reportatge i magazín" },
    { title: "Vídeos corporatius", text: "Peces d'empresa, testimonis, casos d'èxit i presentacions amb un to proper i narratiu.", image: "/laprodu/fotos/video-corporativo-rodaje-empresa-laprodu-films.jpg", deliverable: "Corporatiu, consultora, social i marca", cta: "Veure enfocament per a vídeo corporatiu", landingSlug: "video-corporativo-auditado-2026" },
    { title: "Esdeveniments", text: "Cobertura, entrevistes, aftermovie, fotografia i lliuraments ràpids per comunicar durant i després de l'esdeveniment.", image: "/laprodu/fotos/cobertura-eventos-aftermovie-laprodu-films.jpg", deliverable: "Aftermovie, clips, fotos i reels" },
    { title: "Fotografia", text: "Retrat, backstage, producte, premsa i bancs d'imatge per a campanyes i comunicació recurrent.", image: "/laprodu/fotos/fotografia-corporativa-rodaje-laprodu-films.jpg", deliverable: "Selecció editada i arxiu final" },
    { title: "Xarxes socials", text: "Formats verticals, teasers, subtítols i adaptacions per canal des de la planificació del rodatge.", image: "/laprodu/fotos/contenido-redes-sociales-video-laprodu-films.jpg", deliverable: "Reels, shorts, stories i social ads" },
    { title: "Publicitat", text: "Spots, branded content i peces promocionals amb concepte, direcció i producció ajustada a campanya.", image: "/laprodu/fotos/spot-publicitario-producto-laprodu-films.jpg", deliverable: "Spot, promo, pre-roll i paid media" },
    { title: "Postproducció", text: "Edició, color, grafisme, mescla, subtítols, versions, conformat i entregables tècnics.", image: "/laprodu/fotos/postproduccion-video-edicion-color-laprodu-films.jpg", deliverable: "Màsters finals i versions" },
  ],
};

const projectData = [
  { slug: "secundaris", title: "SECUNDARIS", type: "Serie Documental TV | Teaser", client: "RTVE La 2 Catalunya", year: "2025", category: "Televisión", image: "/laprodu/portada/secundaris-serie-documental-rtve-laprodu-films.png", video: "https://www.youtube.com/embed/0lL1hoBhZ4o", span: "lg:col-span-7", note: "Serie documental de retratos y oficios con mirada humana." },
  { slug: "inspira", title: "INSPIRA", type: "Serie Documental TV | Teaser", client: "RTVE La 2 Catalunya", year: "2025", category: "Televisión", image: "/laprodu/portada/inspira-serie-documental-rtve-laprodu-films.png", video: "https://www.youtube.com/embed/u9bkYrMcHGg", span: "lg:col-span-5", note: "Conversaciones culturales con un tratamiento visual sobrio." },
  { slug: "la-nit-de-reis", title: "LA NIT DE REIS", type: "Documental TV", client: "RTVE La 2 Catalunya", year: "2025", category: "Documental", image: "/laprodu/portada/la-nit-de-reis-documental-tv-laprodu-films.png", video: "https://www.youtube.com/embed/VIOS9JBA2-k", span: "lg:col-span-4", note: "Documental televisivo para emisión cultural." },
  { slug: "martina-matencio", title: "MARTINA MATENCIO", type: "Reportaje TV | Secundaris", client: "RTVE La 2 Catalunya", year: "2025", category: "Televisión", image: "/laprodu/portada/martina-matencio-reportaje-tv-secundaris-laprodu-films.png", video: "https://www.youtube.com/embed/5tWH5UoYkfk", span: "lg:col-span-4", note: "Reportaje de la serie Secundaris." },
  { slug: "guillermina-baeza", title: "GUILLERMINA BAEZA", type: "Reportaje TV | Secundaris", client: "RTVE La 2 Catalunya", year: "2025", category: "Televisión", image: "/laprodu/portada/guillermina-baeza-reportaje-tv-laprodu-films.png", video: "https://www.youtube.com/embed/jx8hI4ZWnUI", span: "lg:col-span-4", note: "Retrato televisivo de autora y trayectoria." },
  { slug: "bofill", title: "BOFILL", type: "Reportaje TV | Inspira", client: "RTVE La 2 Catalunya", year: "2025", category: "Televisión", image: "/laprodu/portada/bofill-reportaje-tv-inspira-laprodu-films.png", video: "https://www.youtube.com/embed/wIECrDeaDxo", span: "lg:col-span-6", note: "Arquitectura, memoria e imagen para Inspira." },
  { slug: "chroma", title: "CHROMA", type: "Corporativo", client: "Chroma", year: "2024", category: "Corporativo", image: "/laprodu/portada/chroma-video-corporativo-laprodu-films.png", video: "https://www.youtube.com/embed/Hy_YV8yKmjo?si=axx30qHu2a7in8h-", span: "lg:col-span-6", note: "Vídeo corporativo de identidad y servicio." },
  { slug: "mwc2025", title: "MWC2025", type: "Reportaje | Netherlands Pavilion", client: "Netherlands Pavilion", year: "2025", category: "Eventos", image: "/laprodu/portada/mwc-2025-netherlands-pavilion-laprodu-films.png", video: "", span: "lg:col-span-4", note: "Cobertura internacional para comunicación de evento." },
  { slug: "cal-blay", title: "CAL BLAY", type: "Vídeo Promocional", client: "Cal Blay", year: "2024", category: "Corporativo", image: "/laprodu/portada/cal-blay-video-promocional-laprodu-films.png", video: "https://www.youtube.com/embed/vkMuAq0XouI", span: "lg:col-span-4", note: "Pieza promocional para marca gastronómica." },
  { slug: "sonisord", title: "SONISORD", type: "Spot | Publicidad", client: "Sonisord", year: "2024", category: "Publicidad", image: "/laprodu/portada/sonisord-spot-publicitario-laprodu-films.png", video: "https://www.youtube.com/embed/EQ80BqQ0dZc", span: "lg:col-span-4", note: "Spot de campaña con tono directo." },
  { slug: "optica-2000", title: "ÓPTICA 2000", type: "Vídeo Promocional", client: "Óptica 2000", year: "2024", category: "Publicidad", image: "/laprodu/portada/optica-2000-video-promocional-laprodu-films.png", video: "https://www.youtube.com/embed/bXEbq0dtDD4", span: "lg:col-span-4", note: "Vídeo promocional de producto y marca." },
  { slug: "cedec-casos-exito", title: "CEDEC", type: "Casos de Éxito | Teaser", client: "Consultora empresarial", year: "2024", category: "Corporativo", image: "/laprodu/portada/cedec-casos-exito-video-testimonial-laprodu-films.png", video: "https://www.youtube.com/embed/tDyq1wZD9Co", span: "lg:col-span-4", note: "Pieza testimonial para consultora empresarial." },
  { slug: "norai-corporativo", title: "Proyecto NORAI", type: "Corporativo | Social", client: "Impulsem - Museu Marítim Barcelona", year: "2024", category: "Social", image: "/laprodu/portada/proyecto-norai-video-corporativo-social-laprodu-films.png", video: "https://www.youtube.com/embed/2V3AwRKewN8", span: "lg:col-span-4", note: "Proyecto social narrado desde cocina, inclusión y territorio." },
  { slug: "norai-director-mmb", title: "NORAI | Director MMB", type: "Entrevista | Social", client: "Impulsem - Museu Marítim Barcelona", year: "2024", category: "Social", image: "/laprodu/portada/norai-director-museu-maritim-entrevista-laprodu-films.png", video: "https://www.youtube.com/embed/pF6HhLZYS9w?si=Zr5xV2vpA5Iauonc", span: "lg:col-span-4", note: "Entrevista para ampliar el contexto del proyecto NORAI." },
  { slug: "norai-chef", title: "NORAI | Chef", type: "Entrevista | Social", client: "Impulsem - Museu Marítim Barcelona", year: "2024", category: "Social", image: "/laprodu/portada/norai-chef-entrevista-social-laprodu-films.png", video: "https://www.youtube.com/embed/Z9WCzwnwZsA", span: "lg:col-span-4", note: "Testimonio de cocina y oficio dentro del proyecto social." },
  { slug: "mwc2024", title: "MWC2024", type: "Reportaje | Netherlands Pavilion", client: "Netherlands Pavilion", year: "2024", category: "Eventos", image: "/laprodu/portada/mwc-2024-netherlands-pavilion-laprodu-films.png", video: "https://www.youtube.com/embed/7GU3-GUretk?si=ud687kJSojSjR3ri", span: "lg:col-span-4", note: "Cobertura MWC para Netherlands Pavilion." },
  { slug: "mwc2023", title: "MWC2023", type: "Promo | MWC2023", client: "Netherlands Pavilion", year: "2023", category: "Eventos", image: "/laprodu/portada/mwc-2023-netherlands-pavilion-laprodu-films.png", video: "https://www.youtube.com/embed/6nQUFAsEhVk?si=W2Po3MbQWqnFM2i1", span: "lg:col-span-4", note: "Promo de evento internacional." },
  { slug: "cedec-consultora", title: "CEDEC", type: "Vídeo Consultora", client: "CEDEC", year: "2024", category: "Corporativo", image: "/laprodu/portada/cedec-video-consultora-laprodu-films.png", video: "https://www.youtube.com/embed/gGxyG1vaWRU?si=TWmpzClN87ayDP6z", span: "lg:col-span-4", note: "Vídeo corporativo para consultora." },
  { slug: "valldaura-labs", title: "VALLDAURA LABS", type: "Reportaje TV | Valldaura IAAC", client: "RTVE La 2 Catalunya", year: "2024", category: "Televisión", image: "/laprodu/portada/valldaura-labs-reportaje-tv-laprodu-films.png", video: "https://www.youtube.com/embed/WVTuF6wYGAU?si=-0xdn-0VPlGRanBh", span: "lg:col-span-6", note: "Reportaje sobre innovación y territorio." },
  { slug: "rcr-arquitectes", title: "RCR ARQUITECTES", type: "Reportaje TV", client: "RTVE La 2 Catalunya", year: "2024", category: "Televisión", image: "/laprodu/portada/rcr-arquitectes-reportaje-tv-laprodu-films.png", video: "https://www.youtube.com/embed/HNk1MjTHhSM?si=TDSP7qI8J-ozVJa1", span: "lg:col-span-6", note: "Reportaje televisivo de arquitectura y proceso." },
  { slug: "secundaris-capitulo-6", title: "SECUNDARIS | Capítulo 6", type: "Serie Documental TV", client: "RTVE La 2 Catalunya", year: "2025", category: "Televisión", image: "/laprodu/portada/secundaris-capitulo-6-rosales-laprodu-films.png", video: "", span: "lg:col-span-4", note: "Capítulo de la serie documental SECUNDARIS." },
];

const projects = {
  es: projectData,
  en: projectData.map((project) => ({
    ...project,
    category: project.category
      .replace("Televisión", "Television")
      .replace("Documental", "Documentary")
      .replace("Corporativo", "Corporate")
      .replace("Publicidad", "Advertising")
      .replace("Eventos", "Events"),
    type: project.type
      .replace("Serie Documental TV", "TV Documentary Series")
      .replace("Documental TV", "TV Documentary")
      .replace("Reportaje TV", "TV Report")
      .replace("Reportaje", "Report")
      .replace("Vídeo Promocional", "Promotional Video")
      .replace("Corporativo", "Corporate")
      .replace("Publicidad", "Advertising")
      .replace("Entrevista", "Interview")
      .replace("Vídeo Consultora", "Consultancy Video")
      .replace("Casos de Éxito", "Success Cases"),
  })),
  ca: projectData.map((project) => ({
    ...project,
    category: project.category
      .replace("Televisión", "Televisió")
      .replace("Documental", "Documental")
      .replace("Corporativo", "Corporatiu")
      .replace("Publicidad", "Publicitat")
      .replace("Eventos", "Esdeveniments"),
    type: project.type
      .replace("Serie Documental TV", "Sèrie documental TV")
      .replace("Documental TV", "Documental TV")
      .replace("Reportaje TV", "Reportatge TV")
      .replace("Reportaje", "Reportatge")
      .replace("Vídeo Promocional", "Vídeo promocional")
      .replace("Corporativo", "Corporatiu")
      .replace("Publicidad", "Publicitat")
      .replace("Entrevista", "Entrevista")
      .replace("Vídeo Consultora", "Vídeo consultora")
      .replace("Casos de Éxito", "Casos d'èxit"),
    note: project.note
      .replace("Serie documental de retratos y oficios con mirada humana.", "Sèrie documental de retrats i oficis amb mirada humana.")
      .replace("Conversaciones culturales con un tratamiento visual sobrio.", "Converses culturals amb un tractament visual sobri.")
      .replace("Documental televisivo para emisión cultural.", "Documental televisiu per a emissió cultural.")
      .replace("Reportaje de la serie Secundaris.", "Reportatge de la sèrie Secundaris.")
      .replace("Retrato televisivo de autora y trayectoria.", "Retrat televisiu d'autora i trajectòria.")
      .replace("Arquitectura, memoria e imagen para Inspira.", "Arquitectura, memòria i imatge per a Inspira.")
      .replace("Vídeo corporativo de identidad y servicio.", "Vídeo corporatiu d'identitat i servei.")
      .replace("Cobertura internacional para comunicación de evento.", "Cobertura internacional per a comunicació d'esdeveniment.")
      .replace("Pieza promocional para marca gastronómica.", "Peça promocional per a marca gastronòmica.")
      .replace("Spot de campaña con tono directo.", "Spot de campanya amb to directe.")
      .replace("Vídeo promocional de producto y marca.", "Vídeo promocional de producte i marca.")
      .replace("Pieza testimonial para consultora empresarial.", "Peça testimonial per a consultora empresarial.")
      .replace("Proyecto social narrado desde cocina, inclusión y territorio.", "Projecte social narrat des de cuina, inclusió i territori.")
      .replace("Entrevista para ampliar el contexto del proyecto NORAI.", "Entrevista per ampliar el context del projecte NORAI.")
      .replace("Testimonio de cocina y oficio dentro del proyecto social.", "Testimoni de cuina i ofici dins del projecte social.")
      .replace("Cobertura MWC para Netherlands Pavilion.", "Cobertura MWC per a Netherlands Pavilion.")
      .replace("Promo de evento internacional.", "Promo d'esdeveniment internacional.")
      .replace("Vídeo corporativo para consultora.", "Vídeo corporatiu per a consultora.")
      .replace("Reportaje sobre innovación y territorio.", "Reportatge sobre innovació i territori.")
      .replace("Reportaje televisivo de arquitectura y proceso.", "Reportatge televisiu d'arquitectura i procés.")
      .replace("Capítulo de la serie documental SECUNDARIS.", "Capítol de la sèrie documental SECUNDARIS."),
  })),
};

const posts = {
  es: [
    {
      slug: "entrevista-documental-2026",
      title: "Cómo preparar una entrevista documental en 2026",
      excerpt: "Checklist práctico para llegar al rodaje con tema, personaje, espacio, luz, sonido y permisos resueltos antes de encender cámara.",
      category: "Documental",
      date: "15 enero 2026",
      read: "7 min",
      image: "/laprodu/fotos/rodaje-documental-entrevista-laprodu-films.jpg",
      content: [
        "Una entrevista documental empieza mucho antes de colocar la cámara. El trabajo importante está en entender qué historia sostiene el personaje, qué tensión narrativa puede aparecer y qué necesita saber el equipo para no improvisar lo esencial en rodaje.",
        "Antes de grabar conviene cerrar una escaleta de temas, no un guion rígido. La conversación debe tener dirección, pero también espacio para escuchar. En paralelo se revisan localización, ruido ambiente, disponibilidad de luz, permisos de imagen y posibles materiales de archivo.",
        "El día de rodaje, el objetivo es crear una situación cómoda y técnicamente controlada: sonido limpio, mirada bien ubicada, fondo con intención y un ritmo de preguntas que permita respuestas completas. Una buena entrevista no solo informa; revela presencia.",
      ],
    },
    {
      slug: "evento-contenido-reutilizable-2026",
      title: "Del evento al contenido reutilizable",
      excerpt: "Cómo planificar aftermovie, clips verticales, fotografías, declaraciones y piezas para LinkedIn o Instagram desde la misma cobertura.",
      category: "Eventos",
      date: "12 marzo 2026",
      read: "6 min",
      image: "/laprodu/fotos/cobertura-evento-monitor-video-laprodu-films.jpg",
      content: [
        "Un evento puede convertirse en mucho más que un aftermovie. Si se prepara bien, una sola cobertura puede generar resumen principal, cápsulas verticales, entrevistas, fotografías, piezas para prensa y material para comunicación interna.",
        "La clave está en diseñar entregables antes del evento. No se rueda igual si solo se necesita una pieza de dos minutos que si también hay que capturar declaraciones, ambiente, producto, ponencias y momentos para redes sociales.",
        "La planificación permite asignar prioridades: qué momentos no se pueden perder, quién debe aparecer, qué formatos son verticales, qué se entrega el mismo día y qué se reserva para una edición más cuidada. Así el contenido dura más que el propio evento.",
      ],
    },
    {
      slug: "briefing-video-corporativo-2026",
      title: "Qué debe incluir un briefing de vídeo corporativo",
      excerpt: "Objetivos, públicos, mensajes, referencias, entregables, calendario y presupuesto: la información que evita dudas y mejora la propuesta.",
      category: "Brief",
      date: "8 abril 2026",
      read: "8 min",
      image: "/laprodu/fotos/video-corporativo-rodaje-empresa-laprodu-films.jpg",
      content: [
        "Un buen briefing no tiene que ser largo, pero sí concreto. La productora necesita entender qué debe conseguir el vídeo, a quién habla, dónde se va a publicar y qué acción espera provocar.",
        "La información mínima incluye objetivo, público, mensajes clave, referencias visuales, duración aproximada, formatos de entrega, fechas importantes, localizaciones, personas que aparecen y rango de presupuesto. Con eso se puede diseñar una propuesta comparable y realista.",
        "También ayuda explicar qué no se quiere: tono demasiado institucional, exceso de grafismo, ritmo publicitario o formato testimonial. Cuanto más claro es el marco, más energía queda para resolver la parte creativa.",
      ],
    },
    {
      slug: "planificar-contenido-redes-rodaje-2026",
      title: "Cómo planificar contenido para redes desde el rodaje",
      excerpt: "La forma de salir de un rodaje con piezas horizontales, verticales, fotografías, subtítulos y clips pensados para cada canal.",
      category: "Redes",
      date: "21 mayo 2026",
      read: "6 min",
      image: "/laprodu/fotos/contenido-redes-sociales-video-laprodu-films.jpg",
      content: [
        "El contenido para redes no debería decidirse cuando el vídeo principal ya está montado. Si se piensa desde preproducción, el equipo puede capturar planos verticales, frases cortas, recursos, detalles y fotografías que luego multiplican la vida útil de la pieza.",
        "La planificación empieza definiendo canales: Instagram, TikTok, LinkedIn, YouTube Shorts o web no piden el mismo ritmo ni el mismo encuadre. También conviene decidir si habrá subtítulos quemados, versiones sin música, cortes por idioma y miniaturas específicas.",
        "Durante el rodaje, un pequeño listado de entregables ayuda a no perder oportunidades: tres clips de 20 segundos, cinco frases destacadas, fotos de making of, recursos verticales y una versión cuadrada. Así el proyecto no termina en un único master, sino en un sistema de comunicación.",
      ],
    },
    {
      slug: "postproduccion-entregables-finales-2026",
      title: "Postproducción: qué revisar antes de entregar un vídeo",
      excerpt: "Color, sonido, grafismo, subtítulos, formatos, derechos musicales y versiones: el control final antes de publicar o emitir.",
      category: "Postproducción",
      date: "10 junio 2026",
      read: "7 min",
      image: "/laprodu/fotos/postproduccion-entregables-video-laprodu-films.jpg",
      content: [
        "La postproducción no termina cuando el montaje emociona. Antes de entregar, hay que revisar color, mezcla de sonido, niveles, grafismos, subtítulos, derechos musicales, logos, nombres propios y formatos de exportación.",
        "Un buen control final evita problemas en publicación o emisión. Es importante comprobar que los textos no tienen errores, que las versiones verticales conservan información relevante, que los subtítulos son legibles y que cada archivo responde al canal donde se va a usar.",
        "También conviene entregar con orden: master principal, versiones para redes, miniaturas, stills, archivo de subtítulos y una nomenclatura clara. La entrega habla tanto del proyecto como el propio vídeo.",
      ],
    },
    {
      slug: "produccion-audiovisual-television-marcas-2026",
      title: "Qué diferencia una pieza para televisión de una pieza para marca",
      excerpt: "Objetivo, ritmo, lenguaje, validaciones y entrega técnica cambian cuando una historia nace para emisión o para comunicación corporativa.",
      category: "Televisión",
      date: "2 julio 2026",
      read: "8 min",
      image: "/laprodu/fotos/produccion-audiovisual-television-marcas-laprodu-films.png",
      content: [
        "Una pieza para televisión y una pieza para marca pueden compartir equipo, cámara y oficio, pero no siempre comparten objetivo. La televisión suele pedir claridad editorial, ritmo narrativo y una estructura que funcione dentro de una parrilla o programa.",
        "La pieza de marca, en cambio, necesita responder a una estrategia concreta: explicar un servicio, activar confianza, presentar un caso o alimentar una campaña. El mensaje suele estar más definido y las validaciones internas tienen más peso.",
        "Entender esa diferencia desde el briefing ayuda a elegir tono, duración, recursos visuales, voz, grafismo y formatos finales. Lo importante no es aplicar una fórmula, sino producir cada historia para el contexto en el que vivirá.",
      ],
    },
    {
      slug: "fotografia-corporativa-barcelona-2026",
      title: "Fotografía corporativa en Barcelona: cómo preparar una sesión útil",
      excerpt: "Qué definir antes de una sesión de fotografía corporativa para obtener retratos, recursos de equipo e imágenes listas para web, prensa y redes.",
      category: "Fotografía",
      date: "18 agosto 2026",
      read: "7 min",
      image: "/laprodu/fotos/fotografia-corporativa-barcelona-laprodu-films.jpg",
      content: [
        "Una sesión de fotografía corporativa funciona mejor cuando no se piensa solo como un retrato de equipo. Para una marca, las imágenes deben servir para web, notas de prensa, LinkedIn, propuestas comerciales, dossiers, campañas y comunicación interna.",
        "Antes de la sesión conviene definir qué piezas necesita la empresa: retratos individuales, foto de equipo, recursos de oficina, proceso de trabajo, detalles de producto o imágenes de dirección. Esa lista evita improvisar y ayuda a elegir localización, vestuario, fondos y tiempos.",
        "En Barcelona, muchas sesiones combinan espacios interiores, terrazas, oficinas y exteriores cercanos. La clave está en mantener coherencia visual: luz controlada, encuadres limpios, color alineado con la marca y una selección final preparada para distintos formatos digitales.",
      ],
    },
    {
      slug: "fotografia-eventos-corporativos-2026",
      title: "Fotografía de eventos corporativos: imágenes que sirven después del evento",
      excerpt: "Cómo cubrir un evento para conseguir fotos de ambiente, ponentes, networking, marca y momentos clave con valor real para comunicación.",
      category: "Fotografía",
      date: "9 septiembre 2026",
      read: "6 min",
      image: "/laprodu/fotos/fotografia-evento-corporativo-laprodu-films.jpg",
      content: [
        "La fotografía de eventos corporativos no consiste solo en documentar lo que ocurre. Una buena cobertura debe anticipar qué imágenes necesitará el equipo de comunicación después: prensa, resumen web, redes sociales, newsletters, patrocinadores y memoria del evento.",
        "Para lograrlo, el fotógrafo necesita conocer agenda, ponentes, momentos clave, marcas visibles, zonas de networking y entregables esperados. No se trabaja igual una conferencia institucional que una activación de marca, una feria internacional o una presentación de producto.",
        "El valor aparece cuando la entrega está pensada para uso real: selección rápida para publicación inmediata, edición cuidada, nombres de archivo claros y variedad de planos. Así el evento no queda solo registrado, sino convertido en material de comunicación.",
      ],
    },
    {
      slug: "iluminacion-video-corporativo-2026",
      title: "Iluminación para vídeo corporativo: natural, cuidada y coherente con la marca",
      excerpt: "Por qué la luz cambia la percepción de un vídeo corporativo y cómo decidir entre luz natural, refuerzo técnico o esquema completo de rodaje.",
      category: "Luz",
      date: "24 septiembre 2026",
      read: "7 min",
      image: "/laprodu/fotos/iluminacion-rodaje-video-corporativo-laprodu-films.webp",
      content: [
        "La iluminación de un vídeo corporativo influye directamente en la confianza que transmite una marca. Una entrevista bien iluminada parece más clara, más cercana y más profesional; una mala luz puede hacer que incluso un buen mensaje pierda fuerza.",
        "No siempre hace falta un gran despliegue. A veces basta con controlar la luz natural, elegir bien la orientación de la sala y reforzar suavemente el rostro. En otros casos, cuando hay varias entrevistas o una estética muy definida, conviene montar un esquema de luz más preciso.",
        "La decisión debería tomarse en preproducción. Revisar localización, ventanas, horarios, color de paredes y necesidades de continuidad permite rodar con intención y evitar cambios bruscos entre planos. La luz no decora: sostiene el tono de la pieza.",
      ],
    },
    {
      slug: "luz-entrevistas-documentales-2026",
      title: "Luz en entrevistas documentales: cómo mantener verdad sin perder control",
      excerpt: "Recursos de iluminación para entrevistas documentales, testimonios y reportajes donde el personaje debe sentirse natural y presente.",
      category: "Luz",
      date: "15 octubre 2026",
      read: "8 min",
      image: "/laprodu/fotos/iluminacion-video-corporativo-laprodu-films.jpg",
      content: [
        "En una entrevista documental, la luz debe acompañar al personaje sin imponerse sobre él. La imagen tiene que sentirse verdadera, pero eso no significa renunciar al control técnico. El equilibrio está en respetar el espacio y dirigir la mirada del espectador.",
        "La preparación empieza observando la localización: entrada de luz, fondo, reflejos, ruido visual, colores dominantes y movimiento de personas. A partir de ahí se decide si conviene trabajar con luz disponible, suavizar una ventana o construir una atmósfera más cinematográfica.",
        "Una buena iluminación documental no busca lucirse. Busca que el rostro tenga volumen, que el fondo aporte contexto y que la entrevista mantenga continuidad durante toda la conversación. Cuando la luz está bien resuelta, la atención vuelve a lo importante: lo que se cuenta.",
      ],
    },
    {
      slug: "audio-profesional-rodaje-video-2026",
      title: "Audio profesional en rodaje: el detalle que más se nota cuando falla",
      excerpt: "Micrófonos, ambiente, localización y control de ruido: claves para conseguir sonido limpio en vídeos corporativos, entrevistas y eventos.",
      category: "Audio",
      date: "3 noviembre 2026",
      read: "7 min",
      image: "/laprodu/fotos/rodaje-produccion-audiovisual-barcelona-laprodu-films.jpg",
      content: [
        "El audio suele recibir menos atención que la imagen, hasta que falla. Una entrevista con ruido, eco o niveles inestables puede arruinar una pieza aunque la cámara y la luz estén perfectamente resueltas.",
        "El primer paso es escuchar la localización antes de rodar: aire acondicionado, neveras, tráfico, obras, salas con mucha reverberación o espacios compartidos. Después se elige microfonía adecuada, posición, grabación de seguridad y control de ambiente.",
        "En vídeos corporativos, documentales y eventos, el sonido limpio mejora comprensión, ritmo y sensación de calidad. También facilita subtítulos, versiones para redes y mezclas finales. Grabar bien el audio en origen ahorra problemas difíciles de reparar en postproducción.",
      ],
    },
    {
      slug: "sonido-entrevistas-eventos-2026",
      title: "Sonido en entrevistas y eventos: cómo evitar problemas antes de grabar",
      excerpt: "Checklist de audio para entrevistas, ponencias y coberturas de eventos: pruebas, backups, sala, microfonía y coordinación técnica.",
      category: "Audio",
      date: "19 noviembre 2026",
      read: "6 min",
      image: "/laprodu/fotos/audio-evento-entrevista-laprodu-films.jpg",
      content: [
        "En entrevistas y eventos, el sonido depende tanto de la técnica como de la coordinación. Saber quién habla, dónde se mueve, qué sistema de sonido hay en sala y qué momentos son irrepetibles permite preparar una cobertura más segura.",
        "Antes de grabar conviene hacer prueba de micro, revisar baterías, grabadores, frecuencias, cables, entradas de mesa y posibles backups. En eventos, además, es importante coordinarse con el equipo técnico del espacio para acceder a señal limpia cuando sea posible.",
        "El objetivo es reducir incertidumbre. Una buena estrategia de audio combina microfonía cercana, ambiente controlado, redundancia y escucha activa durante el rodaje. Cuando el sonido está cuidado, la edición fluye y el mensaje llega sin fricción.",
      ],
    },
    {
      slug: "productora-audiovisual-barcelona-precio-2026",
      title: "Productora audiovisual en Barcelona: precio, alcance y cómo pedir presupuesto",
      excerpt: "Guía práctica para entender qué influye en el precio de una producción audiovisual en Barcelona y cómo pedir una propuesta clara.",
      category: "Presupuesto",
      date: "4 diciembre 2026",
      read: "8 min",
      image: "/laprodu/fotos/presupuesto-produccion-audiovisual-corporativa-laprodu-films.jpg",
      content: [
        "Buscar “productora audiovisual Barcelona precio” suele llevar a una respuesta incómoda: depende. Y es verdad, pero no debería quedarse ahí. El precio cambia según objetivo, duración, equipo, localizaciones, número de entrevistas, necesidades de luz y sonido, postproducción, grafismo, música, subtítulos y versiones finales.",
        "Un trabajo pequeño puede ser una pieza sencilla, una sesión de fotografía, un clip social o una edición concreta. Una producción más completa puede incluir tratamiento, guion, jornada de rodaje, equipo técnico, dirección, entrevistas, montaje, color, mezcla, subtítulos y entregables para varios canales.",
        "La mejor forma de pedir presupuesto no es empezar por una cifra cerrada, sino por el uso real del contenido: dónde se publicará, qué debe conseguir, qué material ya existe y qué fecha de entrega manda. Con ese contexto, la productora puede ajustar alcance sin inflar el proyecto ni dejar fuera lo importante.",
      ],
    },
    {
      slug: "video-corporativo-empresa-barcelona-2026",
      title: "Vídeo corporativo para empresa en Barcelona: cuándo hacerlo y qué debe contar",
      excerpt: "Cómo enfocar un vídeo corporativo para explicar una empresa, generar confianza y crear piezas útiles para web, ventas y LinkedIn.",
      category: "Corporativo",
      date: "11 diciembre 2026",
      read: "8 min",
      image: "/laprodu/fotos/video-corporativo-empresa-set-entrevista-laprodu-films.webp",
      content: [
        "Un vídeo corporativo para empresa no debería ser una presentación larga con frases genéricas. Funciona cuando ayuda a entender qué hace la compañía, por qué importa, quién está detrás y qué problema resuelve para sus clientes.",
        "En Barcelona, muchas empresas necesitan piezas que vivan en varios lugares: web, LinkedIn, presentaciones comerciales, ferias, newsletters o campañas. Eso obliga a pensar el vídeo como un sistema: pieza principal, teaser, clips cortos, subtítulos, miniaturas y versiones por idioma si el mercado es internacional.",
        "El contenido suele ganar cuando combina entrevistas breves, recursos reales de trabajo, detalles del producto o servicio y una estructura clara. La producción debe cuidar tono, luz, sonido y ritmo, pero también evitar el exceso de solemnidad. Una empresa se entiende mejor cuando se muestra trabajando.",
      ],
    },
    {
      slug: "produccion-documental-television-espana-2026",
      title: "Producción documental para televisión en España: de la idea al máster final",
      excerpt: "Qué necesita una producción documental para televisión: investigación, tratamiento, entrevistas, rodaje, montaje, derechos y entrega técnica.",
      category: "Documental",
      date: "18 diciembre 2026",
      read: "9 min",
      image: "/laprodu/fotos/produccion-documental-television-espana-laprodu-films.png",
      content: [
        "La producción documental para televisión en España exige una mezcla de mirada narrativa y orden técnico. No basta con tener una buena historia: hay que transformarla en tratamiento, estructura, plan de rodaje, entrevistas, archivo, derechos y entrega final preparada para emisión.",
        "El proceso suele empezar con investigación y enfoque editorial. Después llegan permisos, localizaciones, personajes, calendario, necesidades de sonido, luz y cámara. En televisión también pesan la duración, el ritmo, la claridad de contexto y la convivencia con la línea editorial del programa o canal.",
        "La postproducción ordena todo ese material: montaje, color, mezcla, grafismo, subtítulos, masters y revisiones. Cuanto mejor está preparada la fase previa, más margen tiene la edición para construir una pieza con sentido. La técnica importa, pero el verdadero centro sigue siendo la historia.",
      ],
    },
    {
      slug: "auditoria-seo-web-2026",
      title: "Auditoría SEO para web: qué revisar antes de invertir en posicionamiento o Google Ads",
      excerpt: "Checklist práctico para saber si tu web está preparada para posicionar, captar leads y recibir tráfico de campañas sin perder oportunidades.",
      category: "SEO",
      date: "22 diciembre 2026",
      read: "9 min",
      image: "/laprodu/fotos/auditoria-seo-web-contenidos-laprodu-films.webp",
      ctaLanding: "auditoria-seo-web",
      ctaLabel: "Ver packs de auditoría SEO",
      content: [
        "Una auditoría SEO no debería limitarse a decir si una web está “bien” o “mal”. Lo importante es saber si Google puede rastrear las páginas clave, si entiende qué ofrece cada una y si el usuario encuentra un camino claro hacia el contacto, la compra o la solicitud de presupuesto.",
        "Antes de invertir en posicionamiento o Google Ads conviene revisar sitemap, robots, indexación, titles, metas, H1, jerarquía de contenidos, velocidad, enlaces internos, páginas duplicadas, formularios, llamadas a la acción y medición de eventos. Si una landing no responde a una intención concreta, enviarle tráfico suele salir caro.",
        "La parte de contenido también pesa. Una web puede tener buen diseño y aun así no atacar búsquedas long-tail como “auditoría SEO web precio”, “mejorar posicionamiento web empresa” o “landing page para Google Ads”. Detectar esas oportunidades permite crear páginas y artículos que responden a preguntas reales del mercado.",
        "Una buena auditoría termina con prioridades. No todo tiene la misma urgencia: primero se corrigen bloqueos de indexación, errores de estructura y páginas críticas; después se trabaja contenido, enlaces internos, schema, FAQ, casos de confianza y nuevas landings comerciales.",
      ],
    },
  ],
  en: [],
};

const postTranslations = {
  "entrevista-documental-2026": {
    title: "How to prepare a documentary interview in 2026",
    excerpt: "A practical checklist for arriving on set with topic, character, space, light, sound and permissions solved before the camera rolls.",
    category: "Documentary",
    date: "January 15, 2026",
    content: [
      "A documentary interview starts long before the camera is placed. The important work is understanding what story the character carries, what narrative tension may appear and what the crew needs to know before the shoot.",
      "Before recording, it is useful to close a list of topics, not a rigid script. The conversation needs direction, but also room to listen. Location, ambient noise, available light, image permissions and archive material should be reviewed in parallel.",
      "On the shooting day, the goal is to create a comfortable and technically controlled situation: clean sound, well-placed eye line, intentional background and a rhythm of questions that allows full answers. A good interview does not only inform; it reveals presence.",
    ],
  },
  "evento-contenido-reutilizable-2026": {
    title: "From event coverage to reusable content",
    excerpt: "How to plan an aftermovie, vertical clips, photography, statements and LinkedIn or Instagram pieces from the same production day.",
    category: "Events",
    date: "March 12, 2026",
    content: [
      "An event can become much more than an aftermovie. With the right preparation, one coverage day can generate a main recap, vertical clips, interviews, photography, press material and internal communication pieces.",
      "The key is designing deliverables before the event. Shooting is not the same if you only need a two-minute film or if you also need statements, atmosphere, product shots, talks and moments for social media.",
      "Planning lets the team set priorities: which moments cannot be missed, who must appear, which formats are vertical, what is delivered the same day and what is saved for a more refined edit. That way, content lasts longer than the event itself.",
    ],
  },
  "briefing-video-corporativo-2026": {
    title: "What a corporate video briefing should include",
    excerpt: "Goals, audiences, messages, references, deliverables, schedule and budget: the information that reduces doubt and improves the proposal.",
    category: "Brief",
    date: "April 8, 2026",
    content: [
      "A good briefing does not need to be long, but it does need to be specific. The production company needs to understand what the video should achieve, who it speaks to, where it will be published and what action it should trigger.",
      "The minimum information includes goal, audience, key messages, visual references, approximate duration, delivery formats, important dates, locations, people appearing on camera and budget range. With that, the proposal can be comparable and realistic.",
      "It also helps to explain what you do not want: an overly institutional tone, excessive graphics, advertising pace or a testimonial format. The clearer the frame, the more energy remains for the creative work.",
    ],
  },
  "planificar-contenido-redes-rodaje-2026": {
    title: "How to plan social content from the shoot",
    excerpt: "How to leave a shoot with horizontal pieces, vertical clips, photography, subtitles and channel-specific assets.",
    category: "Social media",
    date: "May 21, 2026",
    content: [
      "Social content should not be decided once the main video is already edited. If it is planned during pre-production, the crew can capture vertical shots, short quotes, details and photographs that extend the life of the project.",
      "Planning starts with channels: Instagram, TikTok, LinkedIn, YouTube Shorts and web do not ask for the same rhythm or framing. It is also useful to decide whether there will be burned-in subtitles, no-music versions, language cuts and specific thumbnails.",
      "During the shoot, a small deliverables list helps avoid missed opportunities: three 20-second clips, five highlighted quotes, making-of photos, vertical resources and a square version. The project then becomes a communication system, not a single master file.",
    ],
  },
  "postproduccion-entregables-finales-2026": {
    title: "Postproduction: what to review before delivering a video",
    excerpt: "Color, sound, graphics, subtitles, formats, music rights and versions: the final control before publishing or broadcasting.",
    category: "Postproduction",
    date: "June 10, 2026",
    content: [
      "Postproduction does not end when the edit feels right. Before delivery, color, sound mix, levels, graphics, subtitles, music rights, logos, names and export formats need to be reviewed.",
      "A good final check prevents problems during publication or broadcast. Texts need to be accurate, vertical versions should keep relevant information, subtitles must be readable and every file should match the channel where it will be used.",
      "Delivery also needs order: main master, social versions, thumbnails, stills, subtitle files and clear file naming. The delivery says as much about the project as the video itself.",
    ],
  },
  "produccion-audiovisual-television-marcas-2026": {
    title: "What makes a TV piece different from a brand piece",
    excerpt: "Goal, rhythm, language, approvals and technical delivery change when a story is made for broadcast or corporate communication.",
    category: "Television",
    date: "July 2, 2026",
    content: [
      "A TV piece and a brand piece can share crew, camera and craft, but they do not always share the same goal. Television usually requires editorial clarity, narrative rhythm and a structure that works inside a programme or broadcast slot.",
      "A brand piece, on the other hand, needs to answer a specific strategy: explain a service, build trust, present a case or feed a campaign. The message is usually more defined and internal approvals carry more weight.",
      "Understanding that difference from the briefing helps choose tone, duration, visual resources, voice, graphics and final formats. The point is not to apply a formula, but to produce each story for the context where it will live.",
    ],
  },
  "fotografia-corporativa-barcelona-2026": {
    title: "Corporate photography in Barcelona: how to prepare a useful session",
    excerpt: "What to define before a corporate photography session to get portraits, team resources and images ready for web, press and social media.",
    category: "Photography",
    date: "August 18, 2026",
    content: [
      "A corporate photography session works better when it is not treated only as a team portrait. For a brand, images need to serve the website, press releases, LinkedIn, commercial proposals, dossiers, campaigns and internal communication.",
      "Before the session, it is useful to define what assets the company needs: individual portraits, team photo, office resources, work process, product details or leadership images. That list prevents improvisation and helps choose location, wardrobe, backgrounds and timing.",
      "In Barcelona, many sessions combine interiors, terraces, offices and nearby outdoor spaces. The key is visual consistency: controlled light, clean framing, color aligned with the brand and a final selection prepared for different digital formats.",
    ],
  },
  "fotografia-eventos-corporativos-2026": {
    title: "Corporate event photography: images that keep working after the event",
    excerpt: "How to cover an event to obtain atmosphere, speakers, networking, brand presence and key moments with real communication value.",
    category: "Photography",
    date: "September 9, 2026",
    content: [
      "Corporate event photography is not only about documenting what happens. Good coverage anticipates what the communication team will need afterwards: press, website recap, social media, newsletters, sponsors and event reports.",
      "To achieve that, the photographer needs to know the agenda, speakers, key moments, visible brands, networking areas and expected deliverables. A public conference is not covered the same way as a brand activation, international fair or product presentation.",
      "The value appears when delivery is designed for real use: quick selection for immediate publication, careful editing, clear file names and a variety of shots. The event is not just recorded; it becomes communication material.",
    ],
  },
  "iluminacion-video-corporativo-2026": {
    title: "Lighting for corporate video: natural, careful and aligned with the brand",
    excerpt: "Why light changes the perception of a corporate video and how to choose between natural light, technical support or a full lighting setup.",
    category: "Light",
    date: "September 24, 2026",
    content: [
      "Lighting in a corporate video directly affects the trust a brand conveys. A well-lit interview feels clearer, closer and more professional; poor light can weaken even a strong message.",
      "A large setup is not always necessary. Sometimes it is enough to control natural light, choose the room orientation well and softly reinforce the face. In other cases, when there are several interviews or a defined aesthetic, a more precise lighting setup is useful.",
      "The decision should be made during pre-production. Reviewing location, windows, schedules, wall color and continuity needs helps shoot with intention and avoid abrupt changes between shots. Light is not decoration: it supports the tone of the piece.",
    ],
  },
  "luz-entrevistas-documentales-2026": {
    title: "Light in documentary interviews: keeping truth without losing control",
    excerpt: "Lighting resources for documentary interviews, testimonials and reports where the character needs to feel natural and present.",
    category: "Light",
    date: "October 15, 2026",
    content: [
      "In a documentary interview, light should accompany the character without imposing itself. The image needs to feel truthful, but that does not mean giving up technical control. The balance is respecting the space while guiding the viewer's eye.",
      "Preparation starts by observing the location: light entry, background, reflections, visual noise, dominant colors and movement of people. From there, the team decides whether to work with available light, soften a window or build a more cinematic atmosphere.",
      "Good documentary lighting does not try to show off. It gives the face volume, lets the background add context and keeps continuity throughout the conversation. When the light is solved, attention returns to what matters: the story being told.",
    ],
  },
  "audio-profesional-rodaje-video-2026": {
    title: "Professional audio on set: the detail people notice most when it fails",
    excerpt: "Microphones, ambience, location and noise control: keys to clean sound in corporate videos, interviews and events.",
    category: "Audio",
    date: "November 3, 2026",
    content: [
      "Audio often receives less attention than image, until it fails. An interview with noise, echo or unstable levels can ruin a piece even if camera and light are perfectly handled.",
      "The first step is listening to the location before shooting: air conditioning, fridges, traffic, construction, reverberant rooms or shared spaces. Then the team chooses suitable microphones, placement, safety recording and ambience control.",
      "In corporate videos, documentaries and events, clean sound improves comprehension, rhythm and perceived quality. It also helps subtitles, social versions and final mixes. Capturing good audio at source avoids problems that are hard to repair in postproduction.",
    ],
  },
  "sonido-entrevistas-eventos-2026": {
    title: "Sound in interviews and events: how to avoid problems before recording",
    excerpt: "Audio checklist for interviews, talks and event coverage: tests, backups, room, microphones and technical coordination.",
    category: "Audio",
    date: "November 19, 2026",
    content: [
      "In interviews and events, sound depends on both technique and coordination. Knowing who speaks, where they move, what sound system the venue has and which moments are unrepeatable makes coverage safer.",
      "Before recording, it is useful to test microphones, review batteries, recorders, frequencies, cables, desk inputs and possible backups. In events, it is also important to coordinate with the venue's technical team to access a clean signal whenever possible.",
      "The goal is to reduce uncertainty. A good audio strategy combines close microphones, controlled ambience, redundancy and active listening during the shoot. When sound is cared for, editing flows and the message arrives without friction.",
    ],
  },
  "productora-audiovisual-barcelona-precio-2026": {
    title: "Audiovisual production company in Barcelona: price, scope and how to request a quote",
    excerpt: "A practical guide to understand what affects the cost of audiovisual production in Barcelona and how to request a clear proposal.",
    category: "Budget",
    date: "December 4, 2026",
    content: [
      "Searching for “audiovisual production company Barcelona price” usually leads to an uncomfortable answer: it depends. That is true, but it should not stop there. Price changes according to goal, duration, crew, locations, number of interviews, lighting and sound needs, postproduction, graphics, music, subtitles and final versions.",
      "A small job may be a simple piece, a photography session, a social clip or a specific edit. A fuller production may include treatment, script, shooting day, crew, direction, interviews, editing, color, mixing, subtitles and deliverables for several channels.",
      "The best way to request a quote is not to start with a fixed figure, but with the real use of the content: where it will be published, what it needs to achieve, what material already exists and what deadline matters. With that context, the production company can adjust scope without inflating the project or leaving out what matters.",
    ],
  },
  "video-corporativo-empresa-barcelona-2026": {
    title: "Corporate video for companies in Barcelona: when to produce one and what it should tell",
    excerpt: "How to approach a corporate video that explains a company, builds trust and creates useful assets for web, sales and LinkedIn.",
    category: "Corporate",
    date: "December 11, 2026",
    content: [
      "A corporate video for a company should not be a long presentation full of generic claims. It works when it helps people understand what the company does, why it matters, who is behind it and what problem it solves for clients.",
      "In Barcelona, many companies need pieces that live in several places: website, LinkedIn, sales presentations, trade fairs, newsletters or campaigns. That means thinking about the video as a system: main piece, teaser, short clips, subtitles, thumbnails and language versions if the market is international.",
      "The content usually gains strength when it combines short interviews, real work footage, details of the product or service and a clear structure. Production should care for tone, light, sound and rhythm, but also avoid excessive solemnity. A company is easier to understand when it is shown at work.",
    ],
  },
  "produccion-documental-television-espana-2026": {
    title: "Documentary production for television in Spain: from idea to final master",
    excerpt: "What a documentary production for television needs: research, treatment, interviews, shooting, editing, rights and technical delivery.",
    category: "Documentary",
    date: "December 18, 2026",
    content: [
      "Documentary production for television in Spain requires both narrative vision and technical order. A good story is not enough: it needs to become treatment, structure, shooting plan, interviews, archive, rights and final delivery prepared for broadcast.",
      "The process usually starts with research and editorial focus. Then come permissions, locations, characters, schedule, sound, light and camera needs. In television, duration, rhythm, contextual clarity and alignment with the programme or channel also matter.",
      "Postproduction orders all that material: editing, color, mix, graphics, subtitles, masters and revisions. The better the previous phase is prepared, the more room editing has to build a meaningful piece. Technique matters, but the real center remains the story.",
    ],
  },
  "auditoria-seo-web-2026": {
    title: "SEO audit for websites: what to review before investing in ranking or Google Ads",
    excerpt: "A practical checklist to know whether your website is ready to rank, capture leads and receive campaign traffic without wasting opportunities.",
    category: "SEO",
    date: "December 22, 2026",
    ctaLabel: "View SEO audit packages",
    content: [
      "An SEO audit should not be limited to saying whether a website is “good” or “bad”. What matters is knowing whether Google can crawl the key pages, whether it understands what each page offers and whether the user finds a clear path to contact, purchase or request a quote.",
      "Before investing in SEO or Google Ads, it is worth reviewing sitemap, robots, indexation, titles, metas, H1s, content hierarchy, speed, internal links, duplicate pages, forms, calls to action and event tracking. If a landing page does not answer a specific intent, sending paid traffic to it becomes expensive.",
      "Content also matters. A website can have a good design and still miss long-tail searches such as “SEO audit website price”, “improve business website ranking” or “landing page for Google Ads”. Detecting those opportunities makes it possible to create pages and articles that answer real market questions.",
      "A good audit ends with priorities. Not everything has the same urgency: first come indexation blockers, structure errors and critical pages; then content, internal links, schema, FAQ, trust signals and new commercial landings.",
    ],
  },
};

posts.en = posts.es.map((post) => ({
  ...post,
  ...postTranslations[post.slug],
}));

const postTranslationsCa = {
  "entrevista-documental-2026": {
    title: "Com preparar una entrevista documental el 2026",
    excerpt: "Checklist pràctic per arribar al rodatge amb tema, personatge, espai, llum, so i permisos resolts abans d'encendre la càmera.",
    category: "Documental",
    date: "15 gener 2026",
    content: [
      "Una entrevista documental comença molt abans de col·locar la càmera. La feina important és entendre quina història sosté el personatge, quina tensió narrativa pot aparèixer i què ha de saber l'equip per no improvisar l'essencial al rodatge.",
      "Abans de gravar convé tancar una escaleta de temes, no un guió rígid. La conversa ha de tenir direcció, però també espai per escoltar. En paral·lel es revisen localització, soroll ambient, disponibilitat de llum, permisos d'imatge i possibles materials d'arxiu.",
      "El dia de rodatge, l'objectiu és crear una situació còmoda i tècnicament controlada: so net, mirada ben situada, fons amb intenció i un ritme de preguntes que permeti respostes completes. Una bona entrevista no només informa; revela presència.",
    ],
  },
  "evento-contenido-reutilizable-2026": {
    title: "De l'esdeveniment al contingut reutilitzable",
    excerpt: "Com planificar aftermovie, clips verticals, fotografies, declaracions i peces per a LinkedIn o Instagram des d'una mateixa cobertura.",
    category: "Esdeveniments",
    date: "12 març 2026",
    content: [
      "Un esdeveniment pot convertir-se en molt més que un aftermovie. Si es prepara bé, una sola cobertura pot generar resum principal, càpsules verticals, entrevistes, fotografies, peces per a premsa i material per a comunicació interna.",
      "La clau és dissenyar entregables abans de l'esdeveniment. No es roda igual si només cal una peça de dos minuts que si també cal capturar declaracions, ambient, producte, ponències i moments per a xarxes socials.",
      "La planificació permet assignar prioritats: quins moments no es poden perdre, qui ha d'aparèixer, quins formats són verticals, què s'entrega el mateix dia i què es reserva per a una edició més cuidada. Així el contingut dura més que el mateix esdeveniment.",
    ],
  },
  "briefing-video-corporativo-2026": {
    title: "Què ha d'incloure un briefing de vídeo corporatiu",
    excerpt: "Objectius, públics, missatges, referències, entregables, calendari i pressupost: la informació que evita dubtes i millora la proposta.",
    category: "Brief",
    date: "8 abril 2026",
    content: [
      "Un bon briefing no ha de ser llarg, però sí concret. La productora necessita entendre què ha d'aconseguir el vídeo, a qui parla, on es publicarà i quina acció espera provocar.",
      "La informació mínima inclou objectiu, públic, missatges clau, referències visuals, durada aproximada, formats de lliurament, dates importants, localitzacions, persones que apareixen i rang de pressupost. Amb això es pot dissenyar una proposta comparable i realista.",
      "També ajuda explicar què no es vol: un to massa institucional, excés de grafisme, ritme publicitari o format testimonial. Com més clar és el marc, més energia queda per resoldre la part creativa.",
    ],
  },
  "planificar-contenido-redes-rodaje-2026": {
    title: "Com planificar contingut per a xarxes des del rodatge",
    excerpt: "La manera de sortir d'un rodatge amb peces horitzontals, verticals, fotografies, subtítols i clips pensats per a cada canal.",
    category: "Xarxes",
    date: "21 maig 2026",
    content: [
      "El contingut per a xarxes no s'hauria de decidir quan el vídeo principal ja està muntat. Si es pensa des de preproducció, l'equip pot capturar plans verticals, frases curtes, recursos, detalls i fotografies que després multipliquen la vida útil de la peça.",
      "La planificació comença definint canals: Instagram, TikTok, LinkedIn, YouTube Shorts o web no demanen el mateix ritme ni el mateix enquadrament. També convé decidir si hi haurà subtítols incrustats, versions sense música, talls per idioma i miniatures específiques.",
      "Durant el rodatge, una petita llista d'entregables ajuda a no perdre oportunitats: tres clips de 20 segons, cinc frases destacades, fotos de making of, recursos verticals i una versió quadrada. Així el projecte no acaba en un únic màster, sinó en un sistema de comunicació.",
    ],
  },
  "postproduccion-entregables-finales-2026": {
    title: "Postproducció: què revisar abans d'entregar un vídeo",
    excerpt: "Color, so, grafisme, subtítols, formats, drets musicals i versions: el control final abans de publicar o emetre.",
    category: "Postproducció",
    date: "10 juny 2026",
    content: [
      "La postproducció no acaba quan el muntatge emociona. Abans d'entregar, cal revisar color, mescla de so, nivells, grafismes, subtítols, drets musicals, logotips, noms propis i formats d'exportació.",
      "Un bon control final evita problemes en publicació o emissió. És important comprovar que els textos no tenen errors, que les versions verticals conserven informació rellevant, que els subtítols són llegibles i que cada arxiu respon al canal on s'utilitzarà.",
      "També convé entregar amb ordre: màster principal, versions per a xarxes, miniatures, stills, arxiu de subtítols i una nomenclatura clara. El lliurament parla tant del projecte com el mateix vídeo.",
    ],
  },
  "produccion-audiovisual-television-marcas-2026": {
    title: "Què diferencia una peça per a televisió d'una peça per a marca",
    excerpt: "Objectiu, ritme, llenguatge, validacions i entrega tècnica canvien quan una història neix per emissió o per comunicació corporativa.",
    category: "Televisió",
    date: "2 juliol 2026",
    content: [
      "Una peça per a televisió i una peça per a marca poden compartir equip, càmera i ofici, però no sempre comparteixen objectiu. La televisió sol demanar claredat editorial, ritme narratiu i una estructura que funcioni dins d'una graella o programa.",
      "La peça de marca, en canvi, necessita respondre a una estratègia concreta: explicar un servei, activar confiança, presentar un cas o alimentar una campanya. El missatge sol estar més definit i les validacions internes tenen més pes.",
      "Entendre aquesta diferència des del briefing ajuda a triar to, durada, recursos visuals, veu, grafisme i formats finals. L'important no és aplicar una fórmula, sinó produir cada història per al context on viurà.",
    ],
  },
  "fotografia-corporativa-barcelona-2026": {
    title: "Fotografia corporativa a Barcelona: com preparar una sessió útil",
    excerpt: "Què cal definir abans d'una sessió de fotografia corporativa per obtenir retrats, recursos d'equip i imatges per a web, premsa i xarxes.",
    category: "Fotografia",
    date: "18 agost 2026",
    content: [
      "Una sessió de fotografia corporativa funciona millor quan no es pensa només com un retrat d'equip. Per a una marca, les imatges han de servir per a web, notes de premsa, LinkedIn, propostes comercials, dossiers, campanyes i comunicació interna.",
      "Abans de la sessió convé definir quines peces necessita l'empresa: retrats individuals, foto d'equip, recursos d'oficina, procés de treball, detalls de producte o imatges de direcció. Aquesta llista evita improvisar i ajuda a triar localització, vestuari, fons i temps.",
      "A Barcelona, moltes sessions combinen espais interiors, terrasses, oficines i exteriors propers. La clau és mantenir coherència visual: llum controlada, enquadraments nets, color alineat amb la marca i una selecció final preparada per a diferents formats digitals.",
    ],
  },
  "fotografia-eventos-corporativos-2026": {
    title: "Fotografia d'esdeveniments corporatius: imatges que serveixen després de l'esdeveniment",
    excerpt: "Com cobrir un esdeveniment per aconseguir fotos d'ambient, ponents, networking, marca i moments clau amb valor real per a comunicació.",
    category: "Fotografia",
    date: "9 setembre 2026",
    content: [
      "La fotografia d'esdeveniments corporatius no consisteix només a documentar el que passa. Una bona cobertura ha d'anticipar quines imatges necessitarà l'equip de comunicació després: premsa, resum web, xarxes socials, newsletters, patrocinadors i memòria de l'esdeveniment.",
      "Per aconseguir-ho, el fotògraf necessita conèixer agenda, ponents, moments clau, marques visibles, zones de networking i entregables esperats. No es treballa igual una conferència institucional que una activació de marca, una fira internacional o una presentació de producte.",
      "El valor apareix quan l'entrega està pensada per a ús real: selecció ràpida per a publicació immediata, edició cuidada, noms d'arxiu clars i varietat de plans. Així l'esdeveniment no queda només registrat, sinó convertit en material de comunicació.",
    ],
  },
  "iluminacion-video-corporativo-2026": {
    title: "Il·luminació per a vídeo corporatiu: natural, cuidada i coherent amb la marca",
    excerpt: "Per què la llum canvia la percepció d'un vídeo corporatiu i com decidir entre llum natural, reforç tècnic o esquema complet de rodatge.",
    category: "Llum",
    date: "24 setembre 2026",
    content: [
      "La il·luminació d'un vídeo corporatiu influeix directament en la confiança que transmet una marca. Una entrevista ben il·luminada sembla més clara, més propera i més professional; una mala llum pot fer que fins i tot un bon missatge perdi força.",
      "No sempre cal un gran desplegament. De vegades n'hi ha prou amb controlar la llum natural, triar bé l'orientació de la sala i reforçar suaument el rostre. En altres casos, quan hi ha diverses entrevistes o una estètica molt definida, convé muntar un esquema de llum més precís.",
      "La decisió s'hauria de prendre en preproducció. Revisar localització, finestres, horaris, color de parets i necessitats de continuïtat permet rodar amb intenció i evitar canvis bruscos entre plans. La llum no decora: sosté el to de la peça.",
    ],
  },
  "luz-entrevistas-documentales-2026": {
    title: "Llum en entrevistes documentals: com mantenir veritat sense perdre control",
    excerpt: "Recursos d'il·luminació per a entrevistes documentals, testimonis i reportatges on el personatge s'ha de sentir natural i present.",
    category: "Llum",
    date: "15 octubre 2026",
    content: [
      "En una entrevista documental, la llum ha d'acompanyar el personatge sense imposar-se. La imatge s'ha de sentir veritable, però això no vol dir renunciar al control tècnic. L'equilibri és respectar l'espai i dirigir la mirada de l'espectador.",
      "La preparació comença observant la localització: entrada de llum, fons, reflexos, soroll visual, colors dominants i moviment de persones. A partir d'aquí es decideix si convé treballar amb llum disponible, suavitzar una finestra o construir una atmosfera més cinematogràfica.",
      "Una bona il·luminació documental no busca lluir-se. Busca que el rostre tingui volum, que el fons aporti context i que l'entrevista mantingui continuïtat durant tota la conversa. Quan la llum està ben resolta, l'atenció torna al que és important: allò que s'explica.",
    ],
  },
  "audio-profesional-rodaje-video-2026": {
    title: "Àudio professional en rodatge: el detall que més es nota quan falla",
    excerpt: "Micròfons, ambient, localització i control de soroll: claus per aconseguir so net en vídeos corporatius, entrevistes i esdeveniments.",
    category: "Àudio",
    date: "3 novembre 2026",
    content: [
      "L'àudio sol rebre menys atenció que la imatge, fins que falla. Una entrevista amb soroll, eco o nivells inestables pot arruïnar una peça encara que la càmera i la llum estiguin perfectament resoltes.",
      "El primer pas és escoltar la localització abans de rodar: aire condicionat, neveres, trànsit, obres, sales amb molta reverberació o espais compartits. Després es tria microfonia adequada, posició, gravació de seguretat i control d'ambient.",
      "En vídeos corporatius, documentals i esdeveniments, el so net millora comprensió, ritme i sensació de qualitat. També facilita subtítols, versions per a xarxes i mescles finals. Gravar bé l'àudio en origen estalvia problemes difícils de reparar en postproducció.",
    ],
  },
  "sonido-entrevistas-eventos-2026": {
    title: "So en entrevistes i esdeveniments: com evitar problemes abans de gravar",
    excerpt: "Checklist d'àudio per a entrevistes, ponències i cobertures d'esdeveniments: proves, backups, sala, microfonia i coordinació tècnica.",
    category: "Àudio",
    date: "19 novembre 2026",
    content: [
      "En entrevistes i esdeveniments, el so depèn tant de la tècnica com de la coordinació. Saber qui parla, on es mou, quin sistema de so hi ha a sala i quins moments són irrepetibles permet preparar una cobertura més segura.",
      "Abans de gravar convé fer prova de micro, revisar bateries, gravadors, freqüències, cables, entrades de taula i possibles backups. En esdeveniments, a més, és important coordinar-se amb l'equip tècnic de l'espai per accedir a senyal net quan sigui possible.",
      "L'objectiu és reduir incertesa. Una bona estratègia d'àudio combina microfonia propera, ambient controlat, redundància i escolta activa durant el rodatge. Quan el so està cuidat, l'edició flueix i el missatge arriba sense fricció.",
    ],
  },
  "productora-audiovisual-barcelona-precio-2026": {
    title: "Productora audiovisual a Barcelona: preu, abast i com demanar pressupost",
    excerpt: "Guia pràctica per entendre què influeix en el preu d'una producció audiovisual a Barcelona i com demanar una proposta clara.",
    category: "Pressupost",
    date: "4 desembre 2026",
    content: [
      "Buscar “productora audiovisual Barcelona preu” acostuma a portar a una resposta incòmoda: depèn. I és veritat, però no hauria de quedar-se aquí. El preu canvia segons objectiu, durada, equip, localitzacions, nombre d'entrevistes, necessitats de llum i so, postproducció, grafisme, música, subtítols i versions finals.",
      "Una feina petita pot ser una peça senzilla, una sessió de fotografia, un clip social o una edició concreta. Una producció més completa pot incloure tractament, guió, jornada de rodatge, equip tècnic, direcció, entrevistes, muntatge, color, mescla, subtítols i entregables per a diversos canals.",
      "La millor manera de demanar pressupost no és començar per una xifra tancada, sinó per l'ús real del contingut: on es publicarà, què ha d'aconseguir, quin material ja existeix i quina data de lliurament mana. Amb aquest context, la productora pot ajustar abast sense inflar el projecte ni deixar fora el que és important.",
    ],
  },
  "video-corporativo-empresa-barcelona-2026": {
    title: "Vídeo corporatiu per a empresa a Barcelona: quan fer-lo i què ha d'explicar",
    excerpt: "Com enfocar un vídeo corporatiu per explicar una empresa, generar confiança i crear peces útils per a web, vendes i LinkedIn.",
    category: "Corporatiu",
    date: "11 desembre 2026",
    content: [
      "Un vídeo corporatiu per a empresa no hauria de ser una presentació llarga amb frases genèriques. Funciona quan ajuda a entendre què fa la companyia, per què importa, qui hi ha al darrere i quin problema resol per als seus clients.",
      "A Barcelona, moltes empreses necessiten peces que visquin en diversos llocs: web, LinkedIn, presentacions comercials, fires, newsletters o campanyes. Això obliga a pensar el vídeo com un sistema: peça principal, teaser, clips curts, subtítols, miniatures i versions per idioma si el mercat és internacional.",
      "El contingut sol guanyar quan combina entrevistes breus, recursos reals de treball, detalls del producte o servei i una estructura clara. La producció ha de cuidar to, llum, so i ritme, però també evitar l'excés de solemnitat. Una empresa s'entén millor quan es mostra treballant.",
    ],
  },
  "produccion-documental-television-espana-2026": {
    title: "Producció documental per a televisió a Espanya: de la idea al màster final",
    excerpt: "Què necessita una producció documental per a televisió: investigació, tractament, entrevistes, rodatge, muntatge, drets i entrega tècnica.",
    category: "Documental",
    date: "18 desembre 2026",
    content: [
      "La producció documental per a televisió a Espanya exigeix una barreja de mirada narrativa i ordre tècnic. No n'hi ha prou amb tenir una bona història: cal transformar-la en tractament, estructura, pla de rodatge, entrevistes, arxiu, drets i entrega final preparada per a emissió.",
      "El procés acostuma a començar amb investigació i enfocament editorial. Després arriben permisos, localitzacions, personatges, calendari, necessitats de so, llum i càmera. En televisió també pesen la durada, el ritme, la claredat de context i la convivència amb la línia editorial del programa o canal.",
      "La postproducció ordena tot aquest material: muntatge, color, mescla, grafisme, subtítols, màsters i revisions. Com millor està preparada la fase prèvia, més marge té l'edició per construir una peça amb sentit. La tècnica importa, però el centre real continua sent la història.",
    ],
  },
  "auditoria-seo-web-2026": {
    title: "Auditoria SEO per a web: què revisar abans d'invertir en posicionament o Google Ads",
    excerpt: "Checklist pràctic per saber si la teva web està preparada per posicionar, captar leads i rebre trànsit de campanyes sense perdre oportunitats.",
    category: "SEO",
    date: "22 desembre 2026",
    ctaLabel: "Veure packs d'auditoria SEO",
    content: [
      "Una auditoria SEO no s'hauria de limitar a dir si una web està “bé” o “malament”. L'important és saber si Google pot rastrejar les pàgines clau, si entén què ofereix cadascuna i si l'usuari troba un camí clar cap al contacte, la compra o la sol·licitud de pressupost.",
      "Abans d'invertir en posicionament o Google Ads convé revisar sitemap, robots, indexació, titles, metas, H1, jerarquia de continguts, velocitat, enllaços interns, pàgines duplicades, formularis, crides a l'acció i mesura d'esdeveniments. Si una landing no respon a una intenció concreta, enviar-hi trànsit sol sortir car.",
      "La part de contingut també pesa. Una web pot tenir bon disseny i tot i així no atacar cerques long-tail com “auditoria SEO web preu”, “millorar posicionament web empresa” o “landing page per a Google Ads”. Detectar aquestes oportunitats permet crear pàgines i articles que responen a preguntes reals del mercat.",
      "Una bona auditoria acaba amb prioritats. No tot té la mateixa urgència: primer es corregeixen bloquejos d'indexació, errors d'estructura i pàgines crítiques; després es treballa contingut, enllaços interns, schema, FAQ, senyals de confiança i noves landings comercials.",
    ],
  },
};

posts.ca = posts.es.map((post) => ({
  ...post,
  ...postTranslationsCa[post.slug],
}));

const faqs = {
  es: [
    [
      "¿Cuánto cuesta un vídeo corporativo?",
      "Depende del alcance: duración, número de días de rodaje, localizaciones, entrevistas, grafismo, música, versiones y complejidad de postproducción. Si nos cuentas objetivo, fecha y formatos que necesitas, te preparamos una propuesta orientativa sin compromiso.",
    ],
    [
      "¿Cuánto dura el proceso de producción?",
      "Depende del alcance y de la urgencia del proyecto. Algunas piezas sencillas o contenidos para evento pueden resolverse en pocos días; otras producciones con guion, varias localizaciones, entrevistas o postproducción más cuidada necesitan más margen. En la primera conversación definimos calendario, prioridades y fecha de entrega realista.",
    ],
    [
      "¿Trabajáis fuera de Barcelona o España?",
      "Sí. Producimos en Barcelona, en toda España y también en proyectos internacionales. Hemos cubierto el MWC durante varias ediciones para Netherlands Pavilion y podemos coordinar logística, equipo y entregables fuera de nuestra ciudad.",
    ],
    [
      "¿Incluye la propuesta creativa y el guion?",
      "Sí. Podemos ayudarte a ordenar la idea, definir el enfoque narrativo, preparar preguntas, guion, escaleta o tratamiento visual. Partimos de tu objetivo de comunicación y construimos la pieza contigo antes de rodar.",
    ],
    [
      "¿Hacéis contenido vertical para redes sociales?",
      "Sí. Podemos entregar versiones verticales, subtítulos, clips cortos, adaptaciones para LinkedIn, Instagram, TikTok o YouTube Shorts y piezas pensadas para campañas de paid media o comunicación recurrente.",
    ],
    [
      "¿Podéis encargaros solo de la postproducción?",
      "Sí. Si ya tienes el material grabado, podemos encargarnos de montaje, color, mezcla de sonido, grafismo, subtítulos, limpieza de audio y versiones finales. También revisamos el material antes de presupuestar para asegurar que es viable.",
    ],
    [
      "¿En qué formatos entregáis los proyectos?",
      "Entregamos masters para web, redes, presentaciones, archivo o emisión. Podemos preparar versiones horizontales, verticales, cuadradas, con o sin subtítulos, miniaturas y archivos optimizados para YouTube, Instagram, LinkedIn u otras plataformas.",
    ],
    [
      "¿También hacéis fotografía?",
      "Sí. Podemos sumar fotografía de evento, retrato corporativo, making of, producto, prensa o banco de imágenes dentro del mismo proyecto audiovisual. Es especialmente útil cuando la marca necesita contenido para web, redes y comunicación posterior.",
    ],
    [
      "¿Quién puede usar el material final?",
      "Normalmente entregamos las piezas finales para los usos acordados: web, redes, presentaciones, prensa, campañas o comunicación interna. Si el proyecto requiere música, archivo, talento o derechos concretos, lo dejamos definido antes de producir.",
    ],
  ],
  en: [
    [
      "How much does a corporate video cost?",
      "It depends on scope: duration, shooting days, locations, interviews, graphics, music, versions and postproduction complexity. If you share the goal, timing and formats you need, we can prepare an initial proposal with no obligation.",
    ],
    [
      "How long does the production process take?",
      "It depends on the scope and urgency of the project. Some simple pieces or event content can be delivered within a few days; other productions involving script, several locations, interviews or more detailed postproduction need more time. In the first conversation we define schedule, priorities and a realistic delivery date.",
    ],
    [
      "Do you work outside Barcelona or Spain?",
      "Yes. We produce in Barcelona, across Spain and on international projects. We have covered MWC for the Netherlands Pavilion over several editions, and we can coordinate logistics, crew and deliverables outside our city.",
    ],
    [
      "Does the proposal include creative development and script?",
      "Yes. We can help shape the idea, define the narrative approach, prepare questions, script, structure or visual treatment. We start from your communication goal and build the piece with you before shooting.",
    ],
    [
      "Do you create vertical content for social media?",
      "Yes. We can deliver vertical versions, subtitles, short clips, adaptations for LinkedIn, Instagram, TikTok or YouTube Shorts and pieces designed for paid media campaigns or ongoing communication.",
    ],
    [
      "Can you handle postproduction only?",
      "Yes. If you already have the footage, we can handle editing, color, sound mix, graphics, subtitles, audio cleanup and final versions. We also review the material before budgeting to make sure it is technically viable.",
    ],
    [
      "Which formats do you deliver?",
      "We deliver masters for web, social media, presentations, archive or broadcast. We can prepare horizontal, vertical and square versions, with or without subtitles, thumbnails and optimized files for YouTube, Instagram, LinkedIn or other platforms.",
    ],
    [
      "Do you also do photography?",
      "Yes. We can add event photography, corporate portraits, making-of, product, press images or a brand image bank within the same audiovisual project. This is especially useful when the brand needs content for web, social media and follow-up communication.",
    ],
    [
      "Who can use the final material?",
      "We usually deliver the final pieces for the agreed uses: website, social media, presentations, press, campaigns or internal communication. If the project involves music, archive, talent or specific rights, we define it before production.",
    ],
  ],
  ca: [
    [
      "Quant costa un vídeo corporatiu?",
      "Depèn de l'abast: durada, dies de rodatge, localitzacions, entrevistes, grafisme, música, versions i complexitat de postproducció. Si ens expliques objectiu, dates i formats que necessites, et preparem una proposta orientativa sense compromís.",
    ],
    [
      "Quant dura el procés de producció?",
      "Depèn de l'abast i de la urgència del projecte. Algunes peces senzilles o continguts per a esdeveniment es poden resoldre en pocs dies; altres produccions amb guió, diverses localitzacions, entrevistes o una postproducció més cuidada necessiten més marge. A la primera conversa definim calendari, prioritats i data de lliurament realista.",
    ],
    [
      "Treballeu fora de Barcelona o d'Espanya?",
      "Sí. Produïm a Barcelona, a tot Espanya i també en projectes internacionals. Hem cobert el MWC durant diverses edicions per al Netherlands Pavilion i podem coordinar logística, equip i entregables fora de la nostra ciutat.",
    ],
    [
      "Inclou la proposta creativa i el guió?",
      "Sí. Podem ajudar-te a ordenar la idea, definir l'enfocament narratiu, preparar preguntes, guió, escaleta o tractament visual. Partim del teu objectiu de comunicació i construïm la peça amb tu abans de rodar.",
    ],
    [
      "Feu contingut vertical per a xarxes socials?",
      "Sí. Podem entregar versions verticals, subtítols, clips curts, adaptacions per a LinkedIn, Instagram, TikTok o YouTube Shorts i peces pensades per a campanyes de paid media o comunicació recurrent.",
    ],
    [
      "Podeu encarregar-vos només de la postproducció?",
      "Sí. Si ja tens el material gravat, podem encarregar-nos de muntatge, color, mescla de so, grafisme, subtítols, neteja d'àudio i versions finals. També revisem el material abans de pressupostar per assegurar que és viable.",
    ],
    [
      "En quins formats entregueu els projectes?",
      "Entreguem màsters per a web, xarxes, presentacions, arxiu o emissió. Podem preparar versions horitzontals, verticals, quadrades, amb o sense subtítols, miniatures i arxius optimitzats per a YouTube, Instagram, LinkedIn o altres plataformes.",
    ],
    [
      "També feu fotografia?",
      "Sí. Podem sumar fotografia d'esdeveniment, retrat corporatiu, making of, producte, premsa o banc d'imatges dins del mateix projecte audiovisual. És especialment útil quan la marca necessita contingut per a web, xarxes i comunicació posterior.",
    ],
    [
      "Qui pot utilitzar el material final?",
      "Normalment entreguem les peces finals per als usos acordats: web, xarxes, presentacions, premsa, campanyes o comunicació interna. Si el projecte requereix música, arxiu, talent o drets concrets, ho deixem definit abans de produir.",
    ],
  ],
};

const landingPages = {
  es: {
    "productora-audiovisual-barcelona": {
      title: "Productora audiovisual en Barcelona",
      kicker: "Landing SEO / Google Ads",
      intro: "Producción audiovisual para marcas, instituciones, televisión y proyectos culturales que necesitan una pieza clara, cuidada y lista para publicar.",
      primary: "Pedir propuesta audiovisual",
      proof: "Televisión, documentales, corporativos, eventos, publicidad y postproducción desde Barcelona.",
      bullets: ["Dirección creativa y guion", "Rodaje con equipo técnico propio", "Postproducción, versiones y entregables"],
      related: ["secundaris", "chroma", "mwc2024"],
      faq: [
        ["¿Trabajáis con campañas de marca?", "Sí. Adaptamos el formato al objetivo de campaña: notoriedad, confianza, captación, lanzamiento o comunicación interna."],
        ["¿Podéis producir fuera de Barcelona?", "Sí. Producimos en toda España y podemos coordinar rodajes internacionales con logística propia."],
      ],
    },
    "video-corporativo-barcelona": {
      title: "Vídeo corporativo en Barcelona",
      kicker: "Landing Google Ads",
      intro: "Vídeos corporativos para explicar servicios, presentar empresas, activar confianza y convertir mensajes complejos en piezas audiovisuales útiles.",
      primary: "Solicitar vídeo corporativo",
      proof: "Piezas para consultoras, empresas, proyectos sociales, instituciones y marcas.",
      bullets: ["Briefing y propuesta narrativa", "Entrevistas, recursos y dirección", "Versiones para web, LinkedIn, YouTube y presentaciones"],
      related: ["chroma", "cedec-casos-exito", "cedec-consultora"],
      faq: [
        ["¿Qué incluye un vídeo corporativo?", "Normalmente incluye desarrollo, guion, rodaje, edición, color, música, grafismo y entregables finales."],
        ["¿Cuánto tarda?", "Una pieza estándar suele requerir entre 2 y 4 semanas desde el briefing hasta la entrega."],
      ],
    },
    "video-corporativo-auditado-2026": {
      title: "Vídeo corporativo 2026: de pieza única a sistema audiovisual",
      kicker: "Vídeo corporativo / Auditoría",
      intro: "Auditamos lo que ya tienes, definimos qué debe contar el nuevo vídeo y lo convertimos en piezas útiles para web, ventas, LinkedIn, YouTube, eventos y campañas.",
      primary: "Solicitar diagnóstico",
      secondary: "Ver ejemplo corporativo",
      proof: "Una producción pensada desde el briefing para generar confianza, explicar mejor la empresa y multiplicar entregables sin rodar cada semana.",
      bullets: ["Auditoría del vídeo actual y mensajes clave", "Guion modular para distintas audiencias", "Master principal, clips cortos y adaptaciones por canal"],
      related: ["chroma", "cedec-consultora", "norai-corporativo", "mwc2025", "valldaura-labs", "rcr-arquitectes"],
      hideRelatedWork: true,
      featuredProject: "chroma",
      proofVideos: ["chroma", "cedec-consultora", "norai-corporativo", "norai-director-mmb"],
      problemTitle: "El problema no suele ser tener poco vídeo. Es tener una pieza que nadie sabe reutilizar.",
      visualLabel: "Ejemplos aplicables",
      visualTitle: "De la pieza bonita al contenido que ventas y marca sí usan.",
      visualIntro: "La clave es producir pensando en contexto: qué verá una persona en la web, qué enviará ventas tras una reunión y qué puede funcionar como clip corto en LinkedIn o YouTube.",
      whenTitle: "Cuando el vídeo actual ya no ayuda a vender, explicar o captar atención.",
      processTitle: "Primero auditamos. Después producimos solo lo que tiene sentido.",
      deliverablesTitle: "Una jornada de rodaje puede convertirse en varios activos.",
      faqTitle: "Preguntas sobre vídeo corporativo 2026",
      outcomes: [
        ["Claridad", "Ordenamos el mensaje para que el vídeo explique qué haces, para quién y por qué importa sin sonar genérico."],
        ["Reutilización", "Planificamos recursos, entrevistas y escenas para crear master principal, clips, teasers y piezas verticales."],
        ["Medición", "Cada versión nace con un uso: web, ventas, anuncios, LinkedIn, YouTube, evento o comunicación interna."],
      ],
      pain: [
        ["El vídeo institucional se queda en la home", "Se aprueba internamente, queda bien, pero después apenas se usa en ventas, campañas o comunicación recurrente."],
        ["El mensaje intenta hablar a todo el mundo", "Clientes, talento, partners y dirección necesitan matices distintos. Una sola pieza generalista suele diluir el valor."],
        ["Se rueda sin pensar en distribución", "Si no se decide antes qué formatos harán falta, luego adaptar el material sale más caro y queda menos natural."],
      ],
      when: ["Tienes un vídeo antiguo que ya no representa a la empresa", "Necesitas explicar un servicio B2B complejo", "Quieres contenido para web, LinkedIn, YouTube o campañas", "Vas a una feria, evento o ronda comercial con material poco concreto"],
      process: [
        ["01", "Auditoría", "Revisamos vídeo actual, web, mensajes comerciales, audiencia y canales para detectar qué funciona y qué sobra."],
        ["02", "Mapa de formatos", "Definimos master principal, clips por objeción, piezas verticales, teaser y usos para ventas o paid media."],
        ["03", "Guion y rodaje", "Preparamos entrevistas, escenas, recursos visuales y una planificación que permita reutilizar sin perder calidad."],
        ["04", "Versiones y medición", "Entregamos piezas adaptadas por canal y recomendaciones sencillas para medir retención, clics, leads o uso comercial."],
      ],
      includes: ["Auditoría del vídeo y materiales existentes", "Propuesta narrativa y mensajes clave", "Guion o escaleta de entrevista", "Rodaje de equipo, producto, espacios o clientes", "Montaje, color, sonido, música y grafismo", "Subtítulos, miniaturas y versiones por canal"],
      channels: ["Home y página de servicios", "LinkedIn y YouTube", "Google Ads, YouTube Ads y remarketing", "Presentaciones comerciales", "Ferias, eventos y newsletters", "Comunicación interna y employer branding"],
      deliverables: ["Vídeo principal de empresa", "Teaser de 30-60 segundos", "Clips por servicio, objeción o audiencia", "Versiones verticales, cuadradas y subtituladas"],
      faq: [
        ["¿Tenemos que rehacer todo el vídeo corporativo?", "No siempre. Primero revisamos lo que ya existe. A veces conviene rescatar material, grabar nuevas entrevistas o crear versiones más útiles antes que repetir una gran pieza desde cero."],
        ["¿Sirve si somos una empresa B2B con un servicio difícil de explicar?", "Sí. De hecho, es donde más ayuda: podemos dividir el mensaje en problema, solución, prueba, equipo y casos para que cada pieza resuelva una duda concreta."],
        ["¿Podéis hacer contenido vertical sin que parezca improvisado?", "Sí. El vertical puede ser muy profesional si se piensa desde guion, luz, encuadre, subtítulos y ritmo. No es un recorte final: es un formato con intención propia."],
        ["¿Cómo sabemos si el vídeo funciona?", "Definimos indicadores sencillos antes de producir: retención, clics, leads, reuniones, uso por ventas, visualizaciones cualificadas o reducción de dudas repetidas."],
      ],
    },
    "auditoria-seo-web": {
      title: "Auditoría SEO para webs que necesitan vender mejor",
      kicker: "SEO / Auditoría web",
      intro: "Revisamos estructura, indexación, contenido, velocidad, intención de búsqueda y oportunidades comerciales para convertir tu web en una base más fuerte para SEO y Google Ads.",
      primary: "Solicitar auditoría SEO",
      secondary: "Leer guía previa",
      proof: "Pensada para negocios que ya tienen web, pero no saben si Google la entiende, si las páginas convierten o si la inversión en campañas está aterrizando en el lugar correcto.",
      bullets: ["Diagnóstico técnico y de contenidos", "Prioridades accionables, no informes eternos", "Recomendaciones para SEO orgánico y campañas"],
      related: [],
      proofVideos: [],
      heroImage: "/laprodu/fotos/auditoria-seo-web-contenidos-laprodu-films.webp",
      blogSlug: "auditoria-seo-web-2026",
      hideRelatedWork: true,
      problemLabel: "Problema habitual",
      problemTitle: "Muchas webs parecen terminadas, pero Google y el cliente no encuentran un camino claro.",
      visualLabel: "Qué revisamos",
      visualTitle: "Una auditoría útil separa lo urgente de lo decorativo.",
      visualIntro: "No se trata de llenar un PDF con capturas. Se trata de detectar bloqueos reales: páginas que no se indexan, títulos duplicados, contenido débil, landings sin intención clara, formularios poco medibles o activos que frenan el rendimiento.",
      whenTitle: "Cuando quieres invertir en SEO o Ads sin enviar tráfico a una web frágil.",
      processTitle: "De la revisión técnica al plan de acción.",
      deliverablesTitle: "Tres niveles según profundidad y momento del negocio.",
      faqTitle: "Preguntas sobre auditorías SEO",
      outcomes: [
        ["Indexación", "Comprobamos si Google puede rastrear, entender y priorizar las páginas que te interesan."],
        ["Contenido", "Revisamos si cada página responde a una búsqueda real y si tiene suficiente profundidad para competir."],
        ["Conversión", "Detectamos fricciones en CTAs, formularios, mensajes, confianza y estructura comercial."],
      ],
      pain: [
        ["La web existe, pero no posiciona", "Puede haber problemas de rutas, sitemap, metadatos, contenido duplicado, arquitectura o páginas demasiado parecidas entre sí."],
        ["Las campañas traen tráfico, pero pocos contactos", "Google Ads necesita landings claras, rápidas y medibles. Si la página no acompaña, el coste por lead sube."],
        ["Hay muchas mejoras posibles y poca prioridad", "Una auditoría práctica ordena el trabajo: qué arreglar primero, qué puede esperar y qué conviene convertir en contenido nuevo."],
      ],
      when: ["Antes de lanzar una campaña de Google Ads", "Después de rediseñar una web", "Si Search Console muestra páginas no indexadas", "Cuando el blog existe pero no atrae tráfico útil"],
      process: [
        ["01", "Revisión inicial", "Analizamos URLs, sitemap, robots, metadatos, indexación, rendimiento, enlaces internos y señales básicas de confianza."],
        ["02", "Intención y contenido", "Detectamos qué páginas atacan búsquedas reales, cuáles compiten entre sí y qué long-tail falta cubrir."],
        ["03", "Conversión", "Revisamos claridad del mensaje, llamadas a la acción, formularios, pruebas visuales, FAQ, schema y medición."],
        ["04", "Plan priorizado", "Entregamos una lista ordenada por impacto, esfuerzo y urgencia para poder actuar sin perder semanas."],
      ],
      includes: ["Revisión de indexación y sitemap", "Análisis de titles, metas, H1 y estructura", "Checklist de contenido y long-tail", "Revisión de landings y CTAs", "Recomendaciones de schema y FAQ", "Plan de prioridades SEO + Ads"],
      channels: ["Google Search Console", "SEO orgánico", "Google Ads y landings", "Blog y contenido long-tail", "Páginas de servicios", "Medición de leads y eventos"],
      deliverables: ["Informe claro de hallazgos", "Checklist de correcciones", "Mapa de oportunidades de contenido", "Plan de acción por prioridad"],
      pricing: [
        ["Básica", "150 €", "Para webs pequeñas o revisión previa antes de campaña.", ["Hasta 5 páginas clave", "Indexación, metadatos y estructura básica", "Checklist de correcciones prioritarias", "Entrega en documento breve"]],
        ["Standard", "400 €", "La opción más equilibrada para mejorar SEO y conversión.", ["Hasta 15 páginas clave", "Análisis técnico, contenido y landings", "Revisión de Search Console si hay acceso", "Plan de acción por impacto y esfuerzo"]],
        ["Premium", "900 €", "Para webs con varios servicios, idiomas o campañas activas.", ["Hasta 60 páginas, idiomas o landings activas", "Auditoría SEO, contenido, UX y medición", "Recomendaciones para Google Ads y landings", "Sesión de explicación y roadmap de 90 días"]],
      ],
      faq: [
        ["¿La auditoría incluye implementar cambios?", "No por defecto. La auditoría entrega diagnóstico y prioridades. Si quieres, después podemos presupuestar implementación, rediseño de landings, contenidos o mejoras técnicas."],
        ["¿Sirve si mi web está hecha en WordPress, Webflow, Wix, Vercel o código propio?", "Sí. La revisión se centra en lo que ve Google y lo que vive el usuario: URLs, contenido, velocidad, indexación, estructura, confianza y conversión."],
        ["¿Necesitáis acceso a Google Search Console?", "Ayuda mucho, sobre todo en la auditoría Standard y Premium. Si no hay acceso, podemos trabajar con rastreo externo y revisión manual, pero Search Console aporta datos más precisos."],
        ["¿Qué pack elegir antes de Google Ads?", "Para campañas pequeñas puede bastar la Básica. Si vas a invertir de forma continuada, recomendamos Standard porque revisa landing, intención, medición y oportunidades de contenido."],
      ],
    },
    "produccion-documentales-barcelona": {
      title: "Producción de documentales en Barcelona",
      kicker: "Documental / TV",
      intro: "Desarrollo, entrevistas, rodaje y postproducción para documentales, series y reportajes con mirada humana y estructura editorial.",
      primary: "Hablar de un documental",
      proof: "Experiencia en piezas documentales y reportajes para RTVE La 2 Catalunya.",
      bullets: ["Investigación y tratamiento", "Entrevistas y archivo", "Montaje narrativo y master final"],
      related: ["secundaris", "inspira", "la-nit-de-reis"],
      faq: [
        ["¿Ayudáis a desarrollar la idea?", "Sí. Podemos acompañar desde el tratamiento inicial hasta la estructura final de capítulos o pieza única."],
        ["¿Trabajáis para televisión?", "Sí. Tenemos experiencia en reportajes y documentales de emisión televisiva."],
      ],
    },
    "video-eventos-barcelona": {
      title: "Vídeo de eventos en Barcelona",
      kicker: "Eventos / Aftermovie",
      intro: "Cobertura audiovisual de eventos, ferias, congresos y activaciones con aftermovie, entrevistas, clips verticales y fotografía.",
      primary: "Planificar cobertura de evento",
      proof: "Coberturas MWC para Netherlands Pavilion y proyectos nacionales e internacionales.",
      bullets: ["Plan de cobertura previo", "Aftermovie y declaraciones", "Clips rápidos para redes y prensa"],
      related: ["mwc2025", "mwc2024", "mwc2023"],
      faq: [
        ["¿Podéis entregar clips el mismo día?", "Sí, si se planifica antes del evento y se reserva equipo de edición rápida."],
        ["¿Incluís fotografía?", "Sí. Podemos producir vídeo, fotografía y contenido vertical dentro de la misma cobertura."],
      ],
    },
    "spot-publicitario-barcelona": {
      title: "Spot publicitario en Barcelona",
      kicker: "Publicidad / Campaña",
      intro: "Spots, branded content y piezas promocionales para campañas con concepto, dirección, producción y versiones para paid media.",
      primary: "Producir un spot",
      proof: "Piezas promocionales para marcas, producto y comunicación comercial.",
      bullets: ["Concepto y tratamiento visual", "Rodaje orientado a campaña", "Versiones para social ads, web y YouTube"],
      related: ["sonisord", "optica-2000", "cal-blay"],
      faq: [
        ["¿Hacéis versiones para anuncios?", "Sí. Entregamos formatos horizontales, verticales, cuadrados y piezas adaptadas a cada canal."],
        ["¿Podéis partir de una idea de agencia?", "Sí. Podemos producir desde una idea cerrada o desarrollar el concepto con el cliente."],
      ],
    },
    "postproduccion-video-barcelona": {
      title: "Postproducción de vídeo en Barcelona",
      kicker: "Edición / Color / Entregables",
      intro: "Edición, color, grafismo, mezcla, subtítulos, versiones y masters finales para proyectos audiovisuales propios o material ya rodado.",
      primary: "Enviar material a postproducción",
      proof: "Postproducción para televisión, marca, redes sociales, eventos y proyectos corporativos.",
      bullets: ["Montaje y estructura narrativa", "Color, sonido y grafismo", "Subtítulos, formatos y versiones finales"],
      related: ["chroma", "norai-corporativo", "cedec-consultora"],
      faq: [
        ["¿Podéis editar material ya grabado?", "Sí. Podemos encargarnos solo de la postproducción si el material está rodado."],
        ["¿Preparáis entregables técnicos?", "Sí. Generamos masters para web, redes, archivo, emisión o presentaciones."],
      ],
    },
    "casos-exito-video": {
      title: "Vídeos de casos de éxito y testimoniales para empresas B2B",
      kicker: "Casos de éxito / Testimoniales",
      intro: "Creamos vídeos con clientes reales para demostrar resultados, generar confianza y dar al equipo comercial una pieza útil antes de la siguiente conversación.",
      primary: "Pedir propuesta",
      secondary: "Ver teaser CEDEC",
      proof: "Producción audiovisual de casos de éxito, testimonios de clientes y vídeos corporativos para web, LinkedIn, YouTube, ventas y campañas.",
      bullets: ["Entrevistas guiadas sin sonar a anuncio", "Guion comercial sin perder naturalidad", "Pieza principal, teaser y clips cortos"],
      related: ["cedec-casos-exito", "cedec-consultora", "chroma", "norai-corporativo", "norai-director-mmb", "norai-chef"],
      hideRelatedWork: true,
      featuredProject: "cedec-casos-exito",
      proofVideos: ["cedec-casos-exito", "cedec-consultora", "chroma", "norai-corporativo"],
      outcomes: [
        ["Confianza", "Un cliente satisfecho explica mejor que nadie por qué el proyecto funcionó."],
        ["Ventas", "El equipo comercial gana una pieza concreta para enviar, presentar o usar en campañas."],
        ["Marca", "La empresa muestra método, relación con cliente y capacidad real de entrega."],
      ],
      pain: [
        ["Hay interés, pero falta prueba", "El cliente potencial entiende tu servicio, pero necesita ver que ya ha funcionado para alguien parecido."],
        ["Los testimonios escritos no bastan", "Una frase en una web ayuda, pero una entrevista bien rodada transmite matices, contexto y credibilidad."],
        ["Ventas necesita contenido accionable", "El equipo comercial necesita una pieza que pueda enviar antes de una reunión, incluir en una propuesta o activar en campaña."],
      ],
      when: ["Lanzamiento de un servicio B2B", "Proyecto con resultados medibles", "Cliente dispuesto a explicar su experiencia", "Campañas de captación, LinkedIn o ferias"],
      process: [
        ["01", "Selección del caso", "Elegimos el cliente, el ángulo narrativo y el objetivo comercial de la pieza."],
        ["02", "Preguntas y guion", "Preparamos entrevista, estructura y mensajes clave para que el testimonio fluya natural."],
        ["03", "Rodaje", "Grabamos entrevista, recursos, ambiente de trabajo y detalles que den contexto visual."],
        ["04", "Versiones", "Montamos pieza principal, teaser y clips cortos listos para publicar o activar en campaña."],
      ],
      includes: ["Tratamiento narrativo del caso", "Preparación de preguntas para cliente", "Dirección de entrevista", "Rodaje de testimonio y recursos", "Montaje, color, sonido y grafismo", "Subtítulos y adaptaciones por canal"],
      channels: ["Landing comercial", "Página de casos de éxito", "LinkedIn y social ads", "YouTube y remarketing", "Presentaciones de venta", "Ferias, eventos y newsletters"],
      deliverables: ["Teaser de 30-60 segundos", "Pieza principal de caso de éxito", "Clips verticales para redes", "Miniaturas, subtítulos y masters finales"],
      faq: [
        ["¿El cliente tiene que aprenderse un guion?", "No. Preparamos una entrevista guiada para que la conversación sea natural, clara y útil. La idea es conseguir verdad, no una frase memorizada."],
        ["¿Podemos grabar en las oficinas del cliente?", "Sí. Revisamos localización, luz, sonido y tiempos antes del rodaje para que la grabación sea cómoda y no interrumpa más de lo necesario."],
        ["¿Sirve para campañas de Google Ads o LinkedIn?", "Sí. Podemos entregar versiones pensadas para landing, YouTube, LinkedIn, remarketing, presentaciones comerciales y comunicación interna."],
        ["¿Podéis hacer varios teasers del mismo caso?", "Sí. Podemos montar una pieza principal y varios cortes: teaser corto, clips por pregunta, versión vertical y fragmentos para activar en distintas fases del embudo comercial."],
      ],
    },
  },
};

landingPages.ca = Object.fromEntries(Object.entries(landingPages.es).map(([slug, page]) => [slug, {
  ...page,
  kicker: "Landing SEO / Google Ads",
  primary: "Demanar proposta audiovisual",
  proof: "Televisió, documentals, corporatius, esdeveniments, publicitat i postproducció des de Barcelona.",
}]));

landingPages.en = Object.fromEntries(Object.entries(landingPages.es).map(([slug, page]) => [slug, {
  ...page,
  kicker: "SEO / Google Ads landing page",
  primary: "Request a production proposal",
  proof: "Television, documentaries, corporate films, events, advertising and postproduction from Barcelona.",
}]));

Object.assign(landingPages.en, {
  "productora-audiovisual-barcelona": {
    ...landingPages.en["productora-audiovisual-barcelona"],
    title: "Audiovisual production company in Barcelona",
    intro: "Audiovisual production for brands, institutions, television and cultural projects that need a clear, crafted piece ready to publish.",
    bullets: ["Creative direction and script", "Shooting with a professional crew", "Postproduction, versions and deliverables"],
    faq: [["Do you work on brand campaigns?", "Yes. We adapt the format to campaign goals: awareness, trust, acquisition, launch or internal communication."], ["Can you produce outside Barcelona?", "Yes. We produce across Spain and can coordinate international shoots with our own logistics."]],
  },
  "video-corporativo-barcelona": {
    ...landingPages.en["video-corporativo-barcelona"],
    title: "Corporate video in Barcelona",
    intro: "Corporate videos to explain services, present companies, build trust and turn complex messages into useful audiovisual pieces.",
    bullets: ["Briefing and narrative proposal", "Interviews, footage and direction", "Versions for web, LinkedIn, YouTube and presentations"],
    faq: [["What does a corporate video include?", "It usually includes development, script, shooting, editing, color, music, graphics and final deliverables."], ["How long does it take?", "A standard piece usually takes between 2 and 4 weeks from briefing to delivery."]],
  },
  "video-corporativo-auditado-2026": {
    ...landingPages.en["video-corporativo-auditado-2026"],
    title: "Corporate video 2026: from one-off film to audiovisual system",
    kicker: "Corporate video / Audit",
    intro: "We audit what you already have, define what the new video needs to say and turn it into useful assets for website, sales, LinkedIn, YouTube, events and campaigns.",
    primary: "Request a diagnosis",
    secondary: "View corporate example",
    proof: "A production planned from the briefing to build trust, explain the company better and multiply deliverables without filming every week.",
    bullets: ["Audit of current video and key messages", "Modular script for different audiences", "Main film, short clips and channel adaptations"],
    problemTitle: "The problem is usually not having too little video. It is having one piece nobody knows how to reuse.",
    visualLabel: "Applicable examples",
    visualTitle: "From a nice film to content that sales and brand teams actually use.",
    visualIntro: "The key is to produce with context in mind: what someone will see on the website, what sales will send after a meeting and what can work as a short clip on LinkedIn or YouTube.",
    whenTitle: "When the current video no longer helps sell, explain or capture attention.",
    processTitle: "First we audit. Then we produce only what makes sense.",
    deliverablesTitle: "One shoot can become several useful assets.",
    faqTitle: "Questions about corporate video in 2026",
    outcomes: [
      ["Clarity", "We organize the message so the video explains what you do, for whom and why it matters without sounding generic."],
      ["Reuse", "We plan footage, interviews and scenes to create a main film, clips, teasers and vertical pieces."],
      ["Measurement", "Each version is created for a use case: website, sales, ads, LinkedIn, YouTube, event or internal communication."],
    ],
    pain: [
      ["The institutional video stays on the homepage", "It gets approved internally and looks good, but is barely used in sales, campaigns or recurring communication."],
      ["The message tries to speak to everyone", "Clients, talent, partners and leadership need different nuances. A single generic film often dilutes value."],
      ["The shoot is not planned for distribution", "If required formats are not defined beforehand, adapting the material later is more expensive and less natural."],
    ],
    when: ["You have an old video that no longer represents the company", "You need to explain a complex B2B service", "You want content for website, LinkedIn, YouTube or campaigns", "You are preparing a trade fair, event or sales cycle with weak material"],
    process: [
      ["01", "Audit", "We review current video, website, commercial messages, audience and channels to detect what works and what should go."],
      ["02", "Format map", "We define the main film, objection-based clips, vertical pieces, teaser and uses for sales or paid media."],
      ["03", "Script and shoot", "We prepare interviews, scenes, supporting footage and a plan that allows reuse without losing quality."],
      ["04", "Versions and measurement", "We deliver channel-specific assets and simple recommendations to measure retention, clicks, leads or commercial use."],
    ],
    includes: ["Audit of current video and materials", "Narrative proposal and key messages", "Script or interview outline", "Filming team, product, spaces or clients", "Editing, color, sound, music and graphics", "Subtitles, thumbnails and channel versions"],
    channels: ["Homepage and service pages", "LinkedIn and YouTube", "Google Ads, YouTube Ads and remarketing", "Sales presentations", "Trade fairs, events and newsletters", "Internal communication and employer branding"],
    deliverables: ["Main company video", "30-60 second teaser", "Clips by service, objection or audience", "Vertical, square and subtitled versions"],
    faq: [
      ["Do we need to redo the entire corporate video?", "Not always. First we review what already exists. Sometimes it is better to recover footage, record new interviews or create more useful versions before producing another large film from scratch."],
      ["Does this work for a B2B company with a hard-to-explain service?", "Yes. That is where it helps most: we can split the message into problem, solution, proof, team and cases so each piece answers a specific doubt."],
      ["Can vertical content still feel professional?", "Yes. Vertical can be very professional when script, light, framing, subtitles and pace are planned. It is not a final crop: it is a format with its own intention."],
      ["How do we know whether the video works?", "We define simple indicators before production: retention, clicks, leads, meetings, sales usage, qualified views or fewer repeated questions."],
    ],
  },
  "auditoria-seo-web": {
    ...landingPages.en["auditoria-seo-web"],
    title: "SEO audit for websites that need to sell better",
    kicker: "SEO / Website audit",
    intro: "We review structure, indexation, content, speed, search intent and commercial opportunities to turn your website into a stronger base for SEO and Google Ads.",
    primary: "Request SEO audit",
    secondary: "Read the guide",
    proof: "For businesses that already have a website but do not know whether Google understands it, whether pages convert or whether campaign spend is landing in the right place.",
    bullets: ["Technical and content diagnosis", "Actionable priorities, not endless reports", "Recommendations for organic SEO and campaigns"],
    problemLabel: "Common problem",
    problemTitle: "Many websites look finished, but Google and the customer cannot find a clear path.",
    visualLabel: "What we review",
    visualTitle: "A useful audit separates the urgent from the decorative.",
    visualIntro: "This is not about filling a PDF with screenshots. It is about finding real blockers: pages not indexed, duplicate titles, thin content, unclear landing intent, weak forms or assets that slow performance.",
    whenTitle: "When you want to invest in SEO or Ads without sending traffic to a fragile website.",
    processTitle: "From technical review to action plan.",
    deliverablesTitle: "Three levels depending on depth and business stage.",
    faqTitle: "Questions about SEO audits",
    outcomes: [
      ["Indexation", "We check whether Google can crawl, understand and prioritize the pages that matter."],
      ["Content", "We review whether each page answers a real search intent and has enough depth to compete."],
      ["Conversion", "We detect friction in CTAs, forms, messaging, trust signals and commercial structure."],
    ],
    pain: [
      ["The website exists, but does not rank", "There may be routing, sitemap, metadata, duplicate content, architecture or page similarity problems."],
      ["Campaigns bring traffic, but few leads", "Google Ads needs clear, fast and measurable landing pages. If the page does not support the click, cost per lead rises."],
      ["There are too many possible improvements", "A practical audit orders the work: what to fix first, what can wait and what should become new content."],
    ],
    when: ["Before launching a Google Ads campaign", "After redesigning a website", "If Search Console shows non-indexed pages", "When the blog exists but does not attract useful traffic"],
    process: [
      ["01", "Initial review", "We analyze URLs, sitemap, robots, metadata, indexation, performance, internal links and basic trust signals."],
      ["02", "Intent and content", "We detect which pages target real searches, which compete with each other and which long-tail topics are missing."],
      ["03", "Conversion", "We review message clarity, calls to action, forms, visual proof, FAQ, schema and measurement."],
      ["04", "Prioritized plan", "We deliver a list ordered by impact, effort and urgency so you can act without losing weeks."],
    ],
    includes: ["Indexation and sitemap review", "Titles, metas, H1 and structure analysis", "Content and long-tail checklist", "Landing page and CTA review", "Schema and FAQ recommendations", "SEO + Ads priority plan"],
    channels: ["Google Search Console", "Organic SEO", "Google Ads and landing pages", "Blog and long-tail content", "Service pages", "Lead and event measurement"],
    deliverables: ["Clear findings report", "Corrections checklist", "Content opportunity map", "Priority action plan"],
    pricing: [
      ["Basic", "150 €", "For small websites or a pre-campaign review.", ["Up to 5 key pages", "Indexation, metadata and basic structure", "Priority corrections checklist", "Short document delivery"]],
      ["Standard", "400 €", "The most balanced option for improving SEO and conversion.", ["Up to 15 key pages", "Technical, content and landing analysis", "Search Console review if access is available", "Action plan by impact and effort"]],
      ["Premium", "900 €", "For websites with up to 60 pages, languages or active landing pages.", ["Up to 60 pages, languages or active landings", "SEO, content, UX and measurement audit", "Google Ads and landing recommendations", "Explanation session and 90-day roadmap"]],
    ],
    faq: [
      ["Does the audit include implementation?", "Not by default. The audit delivers diagnosis and priorities. Afterwards we can quote implementation, landing redesign, content or technical improvements."],
      ["Does it work for WordPress, Webflow, Wix, Vercel or custom code?", "Yes. The review focuses on what Google sees and what users experience: URLs, content, speed, indexation, structure, trust and conversion."],
      ["Do you need access to Google Search Console?", "It helps a lot, especially for Standard and Premium. Without access, we can work with external crawling and manual review, but Search Console gives more precise data."],
      ["Which package should I choose before Google Ads?", "For small campaigns Basic may be enough. For continuous investment we recommend Standard because it reviews landing page, intent, measurement and content opportunities."],
    ],
  },
  "produccion-documentales-barcelona": {
    ...landingPages.en["produccion-documentales-barcelona"],
    title: "Documentary production in Barcelona",
    intro: "Development, interviews, shooting and postproduction for documentaries, series and reports with a human perspective and editorial structure.",
    bullets: ["Research and treatment", "Interviews and archive", "Narrative editing and final master"],
    faq: [["Can you help develop the idea?", "Yes. We can support the project from the first treatment to the final structure of episodes or a single piece."], ["Do you work for television?", "Yes. We have experience producing reports and documentaries for broadcast."]],
  },
  "video-eventos-barcelona": {
    ...landingPages.en["video-eventos-barcelona"],
    title: "Event video in Barcelona",
    intro: "Audiovisual coverage for events, fairs, congresses and activations with aftermovie, interviews, vertical clips and photography.",
    bullets: ["Coverage plan before the event", "Aftermovie and statements", "Fast clips for social media and press"],
    faq: [["Can you deliver clips on the same day?", "Yes, if it is planned before the event and a fast-editing workflow is reserved."], ["Do you include photography?", "Yes. We can produce video, photography and vertical content within the same coverage."]],
  },
  "spot-publicitario-barcelona": {
    ...landingPages.en["spot-publicitario-barcelona"],
    title: "Advertising spot in Barcelona",
    intro: "Spots, branded content and promotional films for campaigns with concept, direction, production and versions for paid media.",
    bullets: ["Concept and visual treatment", "Campaign-oriented shooting", "Versions for social ads, web and YouTube"],
    faq: [["Do you make ad versions?", "Yes. We deliver horizontal, vertical, square and channel-specific pieces."], ["Can you work from an agency idea?", "Yes. We can produce from a closed idea or develop the concept with the client."]],
  },
  "postproduccion-video-barcelona": {
    ...landingPages.en["postproduccion-video-barcelona"],
    title: "Video postproduction in Barcelona",
    intro: "Editing, color, graphics, mixing, subtitles, versions and final masters for our productions or footage already shot.",
    bullets: ["Editing and narrative structure", "Color, sound and graphics", "Subtitles, formats and final versions"],
    faq: [["Can you edit footage that is already shot?", "Yes. We can handle postproduction only if the material has already been filmed."], ["Do you prepare technical deliverables?", "Yes. We create masters for web, social media, archive, broadcast or presentations."]],
  },
  "casos-exito-video": {
    ...landingPages.en["casos-exito-video"],
    title: "Customer success story and testimonial videos for B2B companies",
    kicker: "Success stories / Testimonials",
    intro: "We create videos with real clients to prove results, build trust and give the sales team a useful asset before the next conversation.",
    primary: "Request a proposal",
    secondary: "Watch CEDEC teaser",
    proof: "Audiovisual production of success stories, client testimonials and corporate videos for websites, LinkedIn, YouTube, sales and campaigns.",
    bullets: ["Guided interviews that do not sound like ads", "Commercial script without losing naturalness", "Main piece, teaser and short clips"],
    outcomes: [
      ["Trust", "A satisfied client explains better than anyone why the project worked."],
      ["Sales", "The sales team gets a specific piece to send, present or use in campaigns."],
      ["Brand", "The company shows process, client relationship and real delivery capacity."],
    ],
    pain: [
      ["There is interest, but proof is missing", "The prospect understands the service, but needs to see that it has already worked for someone similar."],
      ["Written testimonials are not enough", "A quote on a website helps, but a well-filmed interview communicates nuance, context and credibility."],
      ["Sales needs actionable content", "The sales team needs an asset to send before a meeting, include in a proposal or activate in a campaign."],
    ],
    when: ["B2B service launch", "Project with measurable results", "Client willing to share the experience", "Lead generation, LinkedIn or trade fair campaigns"],
    process: [
      ["01", "Case selection", "We choose the client, narrative angle and commercial goal of the piece."],
      ["02", "Questions and script", "We prepare interview, structure and key messages so the testimonial flows naturally."],
      ["03", "Shoot", "We film interview, supporting footage, work atmosphere and details that give visual context."],
      ["04", "Versions", "We edit the main piece, teaser and short clips ready for publication or campaign activation."],
    ],
    includes: ["Narrative treatment of the case", "Client interview questions", "Interview direction", "Testimonial and supporting footage shoot", "Editing, color, sound and graphics", "Subtitles and channel adaptations"],
    channels: ["Commercial landing page", "Success stories page", "LinkedIn and social ads", "YouTube and remarketing", "Sales presentations", "Trade fairs, events and newsletters"],
    deliverables: ["30-60 second teaser", "Main success story film", "Vertical clips for social media", "Thumbnails, subtitles and final masters"],
    faq: [
      ["Does the client need to learn a script?", "No. We prepare a guided interview so the conversation feels natural, clear and useful. The goal is truth, not memorized lines."],
      ["Can we film at the client's office?", "Yes. We review location, light, sound and timing before the shoot so the recording is comfortable and efficient."],
      ["Does it work for Google Ads or LinkedIn campaigns?", "Yes. We can deliver versions for landing pages, YouTube, LinkedIn, remarketing, sales presentations and internal communication."],
      ["Can you create several teasers from the same case?", "Yes. We can edit a main piece and several cuts: short teaser, question-based clips, vertical version and fragments for different stages of the sales funnel."],
    ],
  },
});

Object.assign(landingPages.ca, {
  "productora-audiovisual-barcelona": {
    ...landingPages.ca["productora-audiovisual-barcelona"],
    title: "Productora audiovisual a Barcelona",
    intro: "Producció audiovisual per a marques, institucions, televisió i projectes culturals que necessiten una peça clara, cuidada i llesta per publicar.",
    primary: "Demanar proposta audiovisual",
    bullets: ["Direcció creativa i guió", "Rodatge amb equip tècnic professional", "Postproducció, versions i entregables"],
    faq: [["Treballeu amb campanyes de marca?", "Sí. Adaptem el format a l'objectiu de campanya: notorietat, confiança, captació, llançament o comunicació interna."], ["Podeu produir fora de Barcelona?", "Sí. Produïm a tot Espanya i podem coordinar rodatges internacionals amb logística pròpia."]],
  },
  "video-corporativo-barcelona": {
    ...landingPages.ca["video-corporativo-barcelona"],
    title: "Vídeo corporatiu a Barcelona",
    intro: "Vídeos corporatius per explicar serveis, presentar empreses, activar confiança i convertir missatges complexos en peces audiovisuals útils.",
    bullets: ["Briefing i proposta narrativa", "Entrevistes, recursos i direcció", "Versions per a web, LinkedIn, YouTube i presentacions"],
    faq: [["Què inclou un vídeo corporatiu?", "Normalment inclou desenvolupament, guió, rodatge, edició, color, música, grafisme i entregables finals."], ["Quant tarda?", "Una peça estàndard sol requerir entre 2 i 4 setmanes des del briefing fins al lliurament."]],
  },
  "video-corporativo-auditado-2026": {
    ...landingPages.ca["video-corporativo-auditado-2026"],
    title: "Vídeo corporatiu 2026: de peça única a sistema audiovisual",
    kicker: "Vídeo corporatiu / Auditoria",
    intro: "Auditem el que ja tens, definim què ha d'explicar el nou vídeo i el convertim en peces útils per a web, vendes, LinkedIn, YouTube, esdeveniments i campanyes.",
    primary: "Demanar diagnòstic",
    secondary: "Veure exemple corporatiu",
    proof: "Una producció pensada des del briefing per generar confiança, explicar millor l'empresa i multiplicar entregables sense rodar cada setmana.",
    bullets: ["Auditoria del vídeo actual i missatges clau", "Guió modular per a diferents audiències", "Màster principal, clips curts i adaptacions per canal"],
    problemTitle: "El problema no sol ser tenir poc vídeo. És tenir una peça que ningú sap reutilitzar.",
    visualLabel: "Exemples aplicables",
    visualTitle: "De la peça bonica al contingut que vendes i marca sí que fan servir.",
    visualIntro: "La clau és produir pensant en context: què veurà una persona a la web, què enviarà vendes després d'una reunió i què pot funcionar com a clip curt a LinkedIn o YouTube.",
    whenTitle: "Quan el vídeo actual ja no ajuda a vendre, explicar o captar atenció.",
    processTitle: "Primer auditem. Després produïm només el que té sentit.",
    deliverablesTitle: "Una jornada de rodatge pot convertir-se en diversos actius.",
    faqTitle: "Preguntes sobre vídeo corporatiu 2026",
    outcomes: [
      ["Claredat", "Ordenem el missatge perquè el vídeo expliqui què fas, per a qui i per què importa sense sonar genèric."],
      ["Reutilització", "Planifiquem recursos, entrevistes i escenes per crear màster principal, clips, teasers i peces verticals."],
      ["Mesura", "Cada versió neix amb un ús: web, vendes, anuncis, LinkedIn, YouTube, esdeveniment o comunicació interna."],
    ],
    pain: [
      ["El vídeo institucional es queda a la home", "S'aprova internament, queda bé, però després gairebé no es fa servir en vendes, campanyes o comunicació recurrent."],
      ["El missatge intenta parlar a tothom", "Clients, talent, partners i direcció necessiten matisos diferents. Una sola peça generalista sol diluir el valor."],
      ["Es roda sense pensar en distribució", "Si no es decideix abans quins formats faran falta, adaptar el material després surt més car i queda menys natural."],
    ],
    when: ["Tens un vídeo antic que ja no representa l'empresa", "Necessites explicar un servei B2B complex", "Vols contingut per a web, LinkedIn, YouTube o campanyes", "Vas a una fira, esdeveniment o ronda comercial amb material poc concret"],
    process: [
      ["01", "Auditoria", "Revisem vídeo actual, web, missatges comercials, audiència i canals per detectar què funciona i què sobra."],
      ["02", "Mapa de formats", "Definim màster principal, clips per objecció, peces verticals, teaser i usos per a vendes o paid media."],
      ["03", "Guió i rodatge", "Preparem entrevistes, escenes, recursos visuals i una planificació que permeti reutilitzar sense perdre qualitat."],
      ["04", "Versions i mesura", "Entreguem peces adaptades per canal i recomanacions senzilles per mesurar retenció, clics, leads o ús comercial."],
    ],
    includes: ["Auditoria del vídeo i materials existents", "Proposta narrativa i missatges clau", "Guió o escaleta d'entrevista", "Rodatge d'equip, producte, espais o clients", "Muntatge, color, so, música i grafisme", "Subtítols, miniatures i versions per canal"],
    channels: ["Home i pàgina de serveis", "LinkedIn i YouTube", "Google Ads, YouTube Ads i remarketing", "Presentacions comercials", "Fires, esdeveniments i newsletters", "Comunicació interna i employer branding"],
    deliverables: ["Vídeo principal d'empresa", "Teaser de 30-60 segons", "Clips per servei, objecció o audiència", "Versions verticals, quadrades i subtitulades"],
    faq: [
      ["Hem de refer tot el vídeo corporatiu?", "No sempre. Primer revisem el que ja existeix. De vegades convé rescatar material, gravar noves entrevistes o crear versions més útils abans de repetir una gran peça des de zero."],
      ["Serveix si som una empresa B2B amb un servei difícil d'explicar?", "Sí. De fet, és on més ajuda: podem dividir el missatge en problema, solució, prova, equip i casos perquè cada peça resolgui un dubte concret."],
      ["Podeu fer contingut vertical sense que sembli improvisat?", "Sí. El vertical pot ser molt professional si es pensa des de guió, llum, enquadrament, subtítols i ritme. No és un retall final: és un format amb intenció pròpia."],
      ["Com sabem si el vídeo funciona?", "Definim indicadors senzills abans de produir: retenció, clics, leads, reunions, ús per vendes, visualitzacions qualificades o reducció de dubtes repetits."],
    ],
  },
  "auditoria-seo-web": {
    ...landingPages.ca["auditoria-seo-web"],
    title: "Auditoria SEO per a webs que necessiten vendre millor",
    kicker: "SEO / Auditoria web",
    intro: "Revisem estructura, indexació, contingut, velocitat, intenció de cerca i oportunitats comercials per convertir la teva web en una base més forta per a SEO i Google Ads.",
    primary: "Demanar auditoria SEO",
    secondary: "Llegir guia prèvia",
    proof: "Pensada per a negocis que ja tenen web, però no saben si Google l'entén, si les pàgines converteixen o si la inversió en campanyes aterra al lloc correcte.",
    bullets: ["Diagnòstic tècnic i de continguts", "Prioritats accionables, no informes eterns", "Recomanacions per a SEO orgànic i campanyes"],
    problemLabel: "Problema habitual",
    problemTitle: "Moltes webs semblen acabades, però Google i el client no hi troben un camí clar.",
    visualLabel: "Què revisem",
    visualTitle: "Una auditoria útil separa l'urgent del decoratiu.",
    visualIntro: "No es tracta d'omplir un PDF amb captures. Es tracta de detectar bloquejos reals: pàgines que no s'indexen, títols duplicats, contingut feble, landings sense intenció clara, formularis poc mesurables o actius que frenen el rendiment.",
    whenTitle: "Quan vols invertir en SEO o Ads sense enviar trànsit a una web fràgil.",
    processTitle: "De la revisió tècnica al pla d'acció.",
    deliverablesTitle: "Tres nivells segons profunditat i moment del negoci.",
    faqTitle: "Preguntes sobre auditories SEO",
    outcomes: [
      ["Indexació", "Comprovem si Google pot rastrejar, entendre i prioritzar les pàgines que t'interessen."],
      ["Contingut", "Revisem si cada pàgina respon a una cerca real i si té prou profunditat per competir."],
      ["Conversió", "Detectem friccions en CTAs, formularis, missatges, confiança i estructura comercial."],
    ],
    pain: [
      ["La web existeix, però no posiciona", "Pot haver-hi problemes de rutes, sitemap, metadades, contingut duplicat, arquitectura o pàgines massa semblants entre si."],
      ["Les campanyes porten trànsit, però pocs contactes", "Google Ads necessita landings clares, ràpides i mesurables. Si la pàgina no acompanya, el cost per lead puja."],
      ["Hi ha moltes millores possibles i poca prioritat", "Una auditoria pràctica ordena la feina: què arreglar primer, què pot esperar i què convé convertir en contingut nou."],
    ],
    when: ["Abans de llançar una campanya de Google Ads", "Després de redissenyar una web", "Si Search Console mostra pàgines no indexades", "Quan el blog existeix però no atrau trànsit útil"],
    process: [
      ["01", "Revisió inicial", "Analitzem URLs, sitemap, robots, metadades, indexació, rendiment, enllaços interns i senyals bàsiques de confiança."],
      ["02", "Intenció i contingut", "Detectem quines pàgines ataquen cerques reals, quines competeixen entre si i quin long-tail falta cobrir."],
      ["03", "Conversió", "Revisem claredat del missatge, crides a l'acció, formularis, prova visual, FAQ, schema i mesura."],
      ["04", "Pla prioritzat", "Entreguem una llista ordenada per impacte, esforç i urgència per poder actuar sense perdre setmanes."],
    ],
    includes: ["Revisió d'indexació i sitemap", "Anàlisi de titles, metas, H1 i estructura", "Checklist de contingut i long-tail", "Revisió de landings i CTAs", "Recomanacions de schema i FAQ", "Pla de prioritats SEO + Ads"],
    channels: ["Google Search Console", "SEO orgànic", "Google Ads i landings", "Blog i contingut long-tail", "Pàgines de serveis", "Mesura de leads i esdeveniments"],
    deliverables: ["Informe clar de troballes", "Checklist de correccions", "Mapa d'oportunitats de contingut", "Pla d'acció per prioritat"],
    pricing: [
      ["Bàsica", "150 €", "Per a webs petites o revisió prèvia abans de campanya.", ["Fins a 5 pàgines clau", "Indexació, metadades i estructura bàsica", "Checklist de correccions prioritàries", "Entrega en document breu"]],
      ["Standard", "400 €", "L'opció més equilibrada per millorar SEO i conversió.", ["Fins a 15 pàgines clau", "Anàlisi tècnica, contingut i landings", "Revisió de Search Console si hi ha accés", "Pla d'acció per impacte i esforç"]],
      ["Premium", "900 €", "Per a webs amb diversos serveis, idiomes o campanyes actives.", ["Fins a 60 pàgines, idiomes o landings actives", "Auditoria SEO, contingut, UX i mesura", "Recomanacions per a Google Ads i landings", "Sessió d'explicació i roadmap de 90 dies"]],
    ],
    faq: [
      ["L'auditoria inclou implementar canvis?", "No per defecte. L'auditoria entrega diagnòstic i prioritats. Si vols, després podem pressupostar implementació, redisseny de landings, continguts o millores tècniques."],
      ["Serveix si la meva web està feta amb WordPress, Webflow, Wix, Vercel o codi propi?", "Sí. La revisió se centra en el que veu Google i el que viu l'usuari: URLs, contingut, velocitat, indexació, estructura, confiança i conversió."],
      ["Necessiteu accés a Google Search Console?", "Ajuda molt, sobretot en l'auditoria Standard i Premium. Si no hi ha accés, podem treballar amb rastreig extern i revisió manual, però Search Console aporta dades més precises."],
      ["Quin pack triar abans de Google Ads?", "Per a campanyes petites pot bastar la Bàsica. Si vols invertir de forma continuada, recomanem Standard perquè revisa landing, intenció, mesura i oportunitats de contingut."],
    ],
  },
  "produccion-documentales-barcelona": {
    ...landingPages.ca["produccion-documentales-barcelona"],
    title: "Producció de documentals a Barcelona",
    intro: "Desenvolupament, entrevistes, rodatge i postproducció per a documentals, sèries i reportatges amb mirada humana i estructura editorial.",
    bullets: ["Investigació i tractament", "Entrevistes i arxiu", "Muntatge narratiu i màster final"],
    faq: [["Ajudeu a desenvolupar la idea?", "Sí. Podem acompanyar des del tractament inicial fins a l'estructura final de capítols o peça única."], ["Treballeu per a televisió?", "Sí. Tenim experiència en reportatges i documentals d'emissió televisiva."]],
  },
  "video-eventos-barcelona": {
    ...landingPages.ca["video-eventos-barcelona"],
    title: "Vídeo d'esdeveniments a Barcelona",
    intro: "Cobertura audiovisual d'esdeveniments, fires, congressos i activacions amb aftermovie, entrevistes, clips verticals i fotografia.",
    bullets: ["Pla de cobertura previ", "Aftermovie i declaracions", "Clips ràpids per a xarxes i premsa"],
    faq: [["Podeu entregar clips el mateix dia?", "Sí, si es planifica abans de l'esdeveniment i es reserva equip d'edició ràpida."], ["Incloeu fotografia?", "Sí. Podem produir vídeo, fotografia i contingut vertical dins de la mateixa cobertura."]],
  },
  "spot-publicitario-barcelona": {
    ...landingPages.ca["spot-publicitario-barcelona"],
    title: "Spot publicitari a Barcelona",
    intro: "Spots, branded content i peces promocionals per a campanyes amb concepte, direcció, producció i versions per a paid media.",
    bullets: ["Concepte i tractament visual", "Rodatge orientat a campanya", "Versions per a social ads, web i YouTube"],
    faq: [["Feu versions per a anuncis?", "Sí. Entreguem formats horitzontals, verticals, quadrats i peces adaptades a cada canal."], ["Podeu partir d'una idea d'agència?", "Sí. Podem produir des d'una idea tancada o desenvolupar el concepte amb el client."]],
  },
  "postproduccion-video-barcelona": {
    ...landingPages.ca["postproduccion-video-barcelona"],
    title: "Postproducció de vídeo a Barcelona",
    intro: "Edició, color, grafisme, mescla, subtítols, versions i màsters finals per a projectes propis o material ja rodat.",
    bullets: ["Muntatge i estructura narrativa", "Color, so i grafisme", "Subtítols, formats i versions finals"],
    faq: [["Podeu editar material ja gravat?", "Sí. Podem encarregar-nos només de la postproducció si el material està rodat."], ["Prepareu entregables tècnics?", "Sí. Generem màsters per a web, xarxes, arxiu, emissió o presentacions."]],
  },
  "casos-exito-video": {
    ...landingPages.ca["casos-exito-video"],
    title: "Vídeos de casos d'èxit i testimonis per a empreses B2B",
    kicker: "Casos d'èxit / Testimonis",
    intro: "Creem vídeos amb clients reals per demostrar resultats, generar confiança i donar a l'equip comercial una peça útil abans de la propera conversa.",
    primary: "Demanar proposta",
    secondary: "Veure teaser CEDEC",
    proof: "Producció audiovisual de casos d'èxit, testimonis de clients i vídeos corporatius per a web, LinkedIn, YouTube, vendes i campanyes.",
    bullets: ["Entrevistes guiades sense sonar a anunci", "Guió comercial sense perdre naturalitat", "Peça principal, teaser i clips curts"],
    outcomes: [
      ["Confiança", "Un client satisfet explica millor que ningú per què el projecte va funcionar."],
      ["Vendes", "L'equip comercial guanya una peça concreta per enviar, presentar o fer servir en campanyes."],
      ["Marca", "L'empresa mostra mètode, relació amb client i capacitat real de lliurament."],
    ],
    pain: [
      ["Hi ha interès, però falta prova", "El client potencial entén el servei, però necessita veure que ja ha funcionat per a algú semblant."],
      ["Els testimonis escrits no són suficients", "Una frase a una web ajuda, però una entrevista ben rodada transmet matisos, context i credibilitat."],
      ["Vendes necessita contingut accionable", "L'equip comercial necessita una peça que pugui enviar abans d'una reunió, incloure en una proposta o activar en campanya."],
    ],
    when: ["Llançament d'un servei B2B", "Projecte amb resultats mesurables", "Client disposat a explicar la seva experiència", "Campanyes de captació, LinkedIn o fires"],
    process: [
      ["01", "Selecció del cas", "Triem el client, l'angle narratiu i l'objectiu comercial de la peça."],
      ["02", "Preguntes i guió", "Preparem entrevista, estructura i missatges clau perquè el testimoni flueixi natural."],
      ["03", "Rodatge", "Gravem entrevista, recursos, ambient de treball i detalls que donin context visual."],
      ["04", "Versions", "Muntem peça principal, teaser i clips curts llestos per publicar o activar en campanya."],
    ],
    includes: ["Tractament narratiu del cas", "Preparació de preguntes per al client", "Direcció d'entrevista", "Rodatge de testimoni i recursos", "Muntatge, color, so i grafisme", "Subtítols i adaptacions per canal"],
    channels: ["Landing comercial", "Pàgina de casos d'èxit", "LinkedIn i social ads", "YouTube i remarketing", "Presentacions de venda", "Fires, esdeveniments i newsletters"],
    deliverables: ["Teaser de 30-60 segons", "Peça principal de cas d'èxit", "Clips verticals per a xarxes", "Miniatures, subtítols i màsters finals"],
    faq: [
      ["El client ha d'aprendre's un guió?", "No. Preparem una entrevista guiada perquè la conversa sigui natural, clara i útil. La idea és aconseguir veritat, no una frase memoritzada."],
      ["Podem gravar a les oficines del client?", "Sí. Revisem localització, llum, so i temps abans del rodatge perquè la gravació sigui còmoda i no interrompi més del necessari."],
      ["Serveix per a campanyes de Google Ads o LinkedIn?", "Sí. Podem entregar versions pensades per a landing, YouTube, LinkedIn, remarketing, presentacions comercials i comunicació interna."],
      ["Podeu fer diversos teasers del mateix cas?", "Sí. Podem muntar una peça principal i diversos talls: teaser curt, clips per pregunta, versió vertical i fragments per activar en diferents fases de l'embut comercial."],
    ],
  },
});

const navTargets = {
  Inicio: "inicio",
  Home: "inicio",
  Inici: "inicio",
  Servicios: "servicios",
  Services: "servicios",
  Serveis: "servicios",
  Portfolio: "portfolio",
  Work: "portfolio",
  Método: "metodo",
  Method: "metodo",
  Mètode: "metodo",
  Blog: "blog",
  FAQ: "faq",
  Contacto: "contacto",
  Contact: "contacto",
  Contacte: "contacto",
};

const sectionRoutes = ["inicio", "servicios", "portfolio", "metodo", "blog", "faq", "contacto"];

function stripTrailingSlash(path) {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

function pathFor(lang, section = "inicio", slug = null) {
  const prefix = `/${lang}`;

  if (!section || section === "inicio") return `${prefix}/`;
  if (section === "portfolio" && slug === "todos") return `${prefix}/portfolio/`;
  if (section === "blog" && slug === "todos") return `${prefix}/blog/`;
  if (slug) return `${prefix}/${section}/${slug}/`;

  return `${prefix}/${section}/`;
}

function routeFromPath(pathname, hash = "") {
  if (hash && hash !== "#") {
    const legacy = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    const [legacySection = "inicio", legacySlug = null] = legacy;
    const legacyIsRoute = sectionRoutes.includes(legacySection) || legalPages[DEFAULT_LANG][legacySection] || landingPages[DEFAULT_LANG][legacySection];
    if (legacyIsRoute) {
      const nextPath = pathFor(DEFAULT_LANG, legacySection, legacySlug);
      window.history.replaceState({}, "", nextPath);
      return { lang: DEFAULT_LANG, section: legacySection, slug: legacySlug, path: stripTrailingSlash(nextPath) };
    }
  }

  const parts = pathname.split("/").filter(Boolean);
  const lang = LANGS.includes(parts[0]) ? parts[0] : DEFAULT_LANG;
  const rest = LANGS.includes(parts[0]) ? parts.slice(1) : parts;
  const [section = "inicio", slug = null] = rest;

  if (!LANGS.includes(parts[0])) {
    const nextPath = pathFor(lang, section, slug);
    window.history.replaceState({}, "", nextPath);
    return { lang, section, slug, path: stripTrailingSlash(nextPath) };
  }

  return { lang, section, slug, path: stripTrailingSlash(pathname) };
}

function routeFromLocation() {
  return routeFromPath(window.location.pathname, window.location.hash);
}

function useRoute(initialRoute = null) {
  const [route, setRoute] = useState(() => initialRoute || routeFromLocation());

  useEffect(() => {
    const update = () => setRoute(routeFromLocation());
    window.addEventListener("popstate", update);
    window.addEventListener("laprodu:navigate", update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener("laprodu:navigate", update);
    };
  }, []);

  return route;
}

function useReveal(route, lang) {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [route, lang]);
}

function ArrowIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusMinus({ open }) {
  return <span className="font-mono text-xl leading-none text-[#787774]">{open ? "−" : "+"}</span>;
}

function Tag({ children, bg = "#F7F6F3", color = "#2F3437" }) {
  return (
    <span className="inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ backgroundColor: bg, color }}>
      {children}
    </span>
  );
}

function SectionLabel({ children }) {
  return <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#787774]">{children}</p>;
}

function byLang(lang, values) {
  return values[lang] || values.en;
}

function navigateTo(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("laprodu:navigate"));
}

function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event: eventName, ...params });
  window.gtag?.("event", eventName, params);
}

function readConsentStatus() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(CONSENT_STORAGE_KEY);
}

function updateGoogleConsent(status) {
  if (typeof window === "undefined" || !window.gtag) return;
  const granted = status === "accepted" ? "granted" : "denied";
  window.gtag("consent", "update", {
    ad_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted,
    analytics_storage: granted,
  });
}

function loadGoogleTag() {
  if (typeof window === "undefined" || !GOOGLE_TAG_ID || document.getElementById("laprodu-google-tag")) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  window.gtag("js", new Date());
  if (GOOGLE_ADS_ID) window.gtag("config", GOOGLE_ADS_ID);
  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== GOOGLE_ADS_ID) window.gtag("config", GA_MEASUREMENT_ID);

  const script = document.createElement("script");
  script.id = "laprodu-google-tag";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GOOGLE_TAG_ID)}`;
  document.head.appendChild(script);
}

function CookieConsentBanner({ lang, t }) {
  const [status, setStatus] = useState(() => readConsentStatus());

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        window.dataLayer.push(arguments);
      };

    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      wait_for_update: 500,
    });

    if (status) {
      updateGoogleConsent(status);
      if (status === "accepted") loadGoogleTag();
    }
  }, [status]);

  const setConsent = (nextStatus) => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, nextStatus);
    setStatus(nextStatus);
    updateGoogleConsent(nextStatus);
    if (nextStatus === "accepted") loadGoogleTag();
    trackEvent(nextStatus === "accepted" ? "cookie_consent_accept" : "cookie_consent_reject", { event_category: "privacy" });
  };

  if (status) {
    return (
      <button
        type="button"
        onClick={() => setStatus(null)}
        className="fixed bottom-4 left-4 z-40 border border-[#E4E0D8] bg-white px-3 py-2 text-xs font-semibold text-[#24231f] shadow-[0_12px_30px_rgba(73,59,45,0.12)] transition hover:border-[#24231f]"
      >
        {t.cookieSettings}
      </button>
    );
  }

  return (
    <aside className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-3xl border border-[#E4E0D8] bg-white p-4 shadow-[0_18px_50px_rgba(73,59,45,0.18)] md:p-5" aria-label={t.cookieBannerTitle}>
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-bold text-[#24231f]">{t.cookieBannerTitle}</p>
          <p className="mt-1 text-sm leading-6 text-[#6F6B63]">{t.cookieBannerText}</p>
          <a href={pathFor(lang, "cookies")} className="mt-2 inline-flex text-xs font-semibold text-[#8C4F3B] underline underline-offset-4">
            {t.cookiesLabel}
          </a>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 md:min-w-72">
          <button type="button" onClick={() => setConsent("rejected")} className="border border-[#E4E0D8] bg-white px-4 py-3 text-sm font-semibold text-[#24231f] transition hover:border-[#24231f]">
            {t.cookieReject}
          </button>
          <button type="button" onClick={() => setConsent("accepted")} className="border border-[#24231f] bg-[#24231f] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#8C4F3B] hover:bg-[#8C4F3B]">
            {t.cookieAccept}
          </button>
        </div>
      </div>
    </aside>
  );
}

function LanguageSwitch({ lang, setLang, route }) {
  return (
    <div className="grid grid-cols-3 border border-[#E4E0D8] bg-[#FBFAF7] text-xs font-semibold shadow-[0_1px_0_rgba(36,35,31,0.04)]" aria-label="Language switcher">
      {[
        ["es", "ES"],
        ["ca", "CA"],
        ["en", "EN"],
      ].map(([value, label]) => (
        <button
          key={value}
          type="button"
          onClick={() => {
            setLang(value);
            navigateTo(pathFor(value, route.section, route.slug));
          }}
          className={`px-3 py-2 transition active:scale-[0.98] ${lang === value ? "bg-[#24231f] text-white" : "text-[#6F6B63] hover:bg-[#EFEAE2] hover:text-[#24231f]"}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function handleSectionNav(event, target, lang) {
  event.preventDefault();
  navigateTo(pathFor(lang, target));
}

function AppShell({ lang, setLang, t, route, activeSection, children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuLabel = byLang(lang, { es: "Abrir menú", ca: "Obrir menú", en: "Open menu" });

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [route.path, lang]);

  return (
    <main id="contenido" className="min-h-[100dvh] bg-transparent text-[#24231f] antialiased selection:bg-[#24231f] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap');
        main { font-family: 'Outfit', 'SF Pro Display', 'Helvetica Neue', sans-serif; }
        .font-editorial { font-family: 'Outfit', 'SF Pro Display', 'Helvetica Neue', sans-serif; font-weight: 800; }
        .font-mono { font-family: 'JetBrains Mono', 'SF Mono', monospace; }
        [data-reveal] { opacity: 0; transform: translate3d(0, 12px, 0); transition: opacity 600ms cubic-bezier(.16,1,.3,1), transform 600ms cubic-bezier(.16,1,.3,1); transition-delay: calc(var(--index, 0) * 80ms); }
        [data-reveal].is-visible { opacity: 1; transform: translate3d(0,0,0); }
        @keyframes softPulse { 0%,100% { opacity: .55; transform: translate3d(0,0,0); } 50% { opacity: 1; transform: translate3d(4px,0,0); } }
        .animate-soft-pulse { animation: softPulse 1.15s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          [data-reveal], .animate-soft-pulse { animation: none; transition: none; opacity: 1; transform: none; }
        }
      `}</style>
      <a href="#contenido" className="skip-link">{byLang(lang, { es: "Saltar al contenido", ca: "Saltar al contingut", en: "Skip to content" })}</a>

      <header className="sticky top-0 z-20 border-b border-[#E4E0D8] bg-[#FBFAF7]/88 backdrop-blur-md">
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between gap-5 px-4 py-4 md:px-8">
          <a href={pathFor(lang)} onClick={(event) => handleSectionNav(event, "inicio", lang)} className="flex items-center text-[#24231f] transition hover:text-[#8C4F3B] active:scale-[0.98]">
            <span className="text-base font-extrabold tracking-[-0.035em]">LAPRODU FILMS</span>
          </a>
          <div className="hidden items-center gap-1 text-[15px] font-medium text-[#6F6B63] lg:flex">
            {t.nav.map((item) => {
              const target = navTargets[item];
              const isActive = target === activeSection || (activeSection === "politica-privacidad" && target === "inicio") || (activeSection === "aviso-legal" && target === "inicio") || (activeSection === "cookies" && target === "inicio");
              return (
                <a
                  key={item}
                  href={pathFor(lang, target)}
                  onClick={(event) => handleSectionNav(event, target, lang)}
                  className={`px-3 py-2 transition active:scale-[0.98] ${isActive ? "bg-[#EFEAE2] text-[#24231f]" : "hover:bg-[#EFEAE2]/70 hover:text-[#24231f]"}`}
                >
                  {item}
                </a>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitch lang={lang} setLang={setLang} route={route} />
            </div>
            <a href={pathFor(lang, "contacto")} onClick={(event) => handleSectionNav(event, "contacto", lang)} className="hidden border border-[#24231f] bg-[#24231f] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[#8C4F3B] hover:bg-[#8C4F3B] active:scale-[0.98] sm:inline-flex">
              {t.contactCta}
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-[#24231f] bg-[#24231f] text-white transition hover:border-[#8C4F3B] hover:bg-[#8C4F3B] active:scale-[0.98] lg:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuLabel}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span className="relative h-3.5 w-4" aria-hidden="true">
                <span className={`absolute left-0 top-0 h-0.5 w-4 bg-current transition ${mobileMenuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
                <span className={`absolute left-0 top-[6px] h-0.5 w-4 bg-current transition ${mobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 top-3 h-0.5 w-4 bg-current transition ${mobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </nav>
        <div id="mobile-menu" className={`border-t border-[#E4E0D8] bg-[#FBFAF7] px-4 shadow-[0_18px_42px_rgba(73,59,45,0.10)] md:px-8 lg:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
          <div className="mx-auto grid max-w-[1440px] gap-4 py-4">
            <div className="grid grid-cols-2 gap-2 sm:hidden">
              <LanguageSwitch lang={lang} setLang={setLang} route={route} />
              <a href={pathFor(lang, "contacto")} onClick={(event) => handleSectionNav(event, "contacto", lang)} className="inline-flex items-center justify-center border border-[#24231f] bg-[#24231f] px-3 py-2 text-sm font-semibold text-white transition hover:border-[#8C4F3B] hover:bg-[#8C4F3B] active:scale-[0.98]">
                {t.contactCta}
              </a>
            </div>
            <div className="grid gap-1 text-base font-semibold text-[#24231f] sm:grid-cols-2">
              {t.nav.map((item) => {
                const target = navTargets[item];
                const isActive = target === activeSection || (activeSection === "politica-privacidad" && target === "inicio") || (activeSection === "aviso-legal" && target === "inicio") || (activeSection === "cookies" && target === "inicio");
                return (
                  <a
                    key={item}
                    href={pathFor(lang, target)}
                    onClick={(event) => handleSectionNav(event, target, lang)}
                    className={`border border-[#E4E0D8] px-4 py-3 transition active:scale-[0.98] ${isActive ? "bg-[#24231f] text-white" : "bg-white hover:bg-[#EFEAE2]"}`}
                  >
                    {item}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <div key={`${lang}-${route.path}`}>
        {children}
      </div>

      <CookieConsentBanner lang={lang} t={t} />

      <footer className="border-t border-[#EAEAEA] bg-white px-4 py-8 md:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-6 text-sm text-[#787774] lg:grid-cols-[1fr_auto] lg:items-center">
          <p>{t.footerLine}</p>
          <div className="flex flex-wrap gap-x-10 gap-y-3 lg:justify-end">
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[#111111]" aria-label="Social">
              <a href="https://www.youtube.com/@laprodufilms" target="_blank" rel="noreferrer" className="transition hover:text-[#787774]">
                YouTube
              </a>
              <a href="https://www.instagram.com/laprodu_films/" target="_blank" rel="noreferrer" className="transition hover:text-[#787774]">
                Instagram
              </a>
            </nav>
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[#111111]" aria-label="Legal">
              <a href={pathFor(lang, "politica-privacidad")} className="transition hover:text-[#787774]">{t.privacyLabel}</a>
              <a href={pathFor(lang, "aviso-legal")} className="transition hover:text-[#787774]">{t.legalLabel}</a>
              <a href={pathFor(lang, "cookies")} className="transition hover:text-[#787774]">{t.cookiesLabel}</a>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}

function projectCategoryStyle(category) {
  const styles = {
    Televisión: { bg: "#E1F3FE", color: "#1F6C9F" },
    Television: { bg: "#E1F3FE", color: "#1F6C9F" },
    Televisió: { bg: "#E1F3FE", color: "#1F6C9F" },
    Documental: { bg: "#EDF3EC", color: "#346538" },
    Documentary: { bg: "#EDF3EC", color: "#346538" },
    Corporativo: { bg: "#F1ECFA", color: "#6D4AA0" },
    Corporate: { bg: "#F1ECFA", color: "#6D4AA0" },
    Corporatiu: { bg: "#F1ECFA", color: "#6D4AA0" },
    Eventos: { bg: "#FBF3DB", color: "#956400" },
    Events: { bg: "#FBF3DB", color: "#956400" },
    Esdeveniments: { bg: "#FBF3DB", color: "#956400" },
    Publicidad: { bg: "#FDEBEC", color: "#9F2F2D" },
    Advertising: { bg: "#FDEBEC", color: "#9F2F2D" },
    Publicitat: { bg: "#FDEBEC", color: "#9F2F2D" },
    Social: { bg: "#EAF5F1", color: "#2F6F64" },
  };

  return styles[category] || { bg: "#EFEAE2", color: "#6F513F" };
}

function serviceImageAlt(service, lang) {
  return byLang(lang, {
    es: `${service.title} de LAPRODU FILMS para producción audiovisual en Barcelona: ${service.deliverable}.`,
    ca: `${service.title} de LAPRODU FILMS per a producció audiovisual a Barcelona: ${service.deliverable}.`,
    en: `${service.title} by LAPRODU FILMS for audiovisual production in Barcelona: ${service.deliverable}.`,
  });
}

function projectImageAlt(project, lang) {
  return byLang(lang, {
    es: `${project.title}, ${project.type} producido por LAPRODU FILMS para ${project.client}.`,
    ca: `${project.title}, ${project.type} produït per LAPRODU FILMS per a ${project.client}.`,
    en: `${project.title}, ${project.type} produced by LAPRODU FILMS for ${project.client}.`,
  });
}

function postImageAlt(post, lang) {
  return byLang(lang, {
    es: `${post.title}: imagen de producción audiovisual de LAPRODU FILMS en Barcelona.`,
    ca: `${post.title}: imatge de producció audiovisual de LAPRODU FILMS a Barcelona.`,
    en: `${post.title}: audiovisual production image by LAPRODU FILMS in Barcelona.`,
  });
}

function ProjectCard({ project, index, lang }) {
  const categoryStyle = projectCategoryStyle(project.category);

  return (
    <article data-reveal style={{ "--index": index % 6 }} className="is-visible reveal-card group bg-[#FBFAF7] shadow-[inset_0_0_0_1px_rgba(36,35,31,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(73,59,45,0.12)]">
      <a href={pathFor(lang, "portfolio", project.slug)} className="block" onClick={() => trackEvent("portfolio_card_click", { project_slug: project.slug, project_category: project.category })}>
        <div className="relative aspect-[16/10] overflow-hidden bg-[#EFEAE2]">
          <img
            src={project.image}
            alt={projectImageAlt(project, lang)}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-[1.035] group-hover:grayscale-0"
          />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <Tag bg="#F7F6F3" color="#2F3437">{project.year}</Tag>
            <Tag bg={categoryStyle.bg} color={categoryStyle.color}>{project.category}</Tag>
          </div>
        </div>
        <div className="grid gap-5 p-6 md:grid-cols-[1fr_auto] md:p-7">
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#111111]">{project.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#787774]">{project.type}</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-[#787774]">{project.client}</p>
          </div>
          <span className="inline-flex h-10 w-10 items-center justify-center border border-[#D8D2C7] text-[#24231f] transition group-hover:border-[#8C4F3B] group-hover:bg-[#EFEAE2] group-hover:text-[#8C4F3B]">
            <ArrowIcon className="h-4 w-4" />
            <span className="sr-only">{byLang(lang, { es: "Abrir proyecto", ca: "Obrir projecte", en: "Open project" })}</span>
          </span>
        </div>
      </a>
    </article>
  );
}

function PostCard({ post, index, lang }) {
  return (
    <article data-reveal style={{ "--index": index }} className="group bg-[#FBFAF7] shadow-[inset_0_0_0_1px_rgba(36,35,31,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(73,59,45,0.10)]">
      <a href={pathFor(lang, "blog", post.slug)} className="block" onClick={() => trackEvent("blog_card_click", { post_slug: post.slug, post_category: post.category })}>
        <div className="aspect-[16/9] overflow-hidden bg-[#EFEAE2]">
          <img src={post.image} alt={postImageAlt(post, lang)} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
        </div>
        <div className="p-6 md:p-8">
          <div className="mb-10 flex items-center justify-between gap-4">
            <Tag bg={index === 0 ? "#EDF3EC" : index === 1 ? "#FBF3DB" : "#E1F3FE"} color={index === 0 ? "#346538" : index === 1 ? "#956400" : "#1F6C9F"}>{post.category}</Tag>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#787774]">{post.read}</span>
          </div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-[#787774]">{post.date}</p>
          <h3 className="balanced-text text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#24231f]">{post.title}</h3>
          <p className="mt-4 text-sm leading-6 text-[#787774]">{post.excerpt}</p>
          <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#111111]">
            {byLang(lang, { es: "Leer entrada", ca: "Llegir entrada", en: "Read post" })}
            <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </a>
    </article>
  );
}

function PortfolioGrid({ projects, lang, limit = projects.length, showFilters = true }) {
  const [filter, setFilter] = useState("Todo");
  const categories = useMemo(() => ["Todo", ...Array.from(new Set(projects.map((project) => project.category)))], [projects]);
  const activeFilter = categories.includes(filter) ? filter : "Todo";
  const filtered = activeFilter === "Todo" ? projects : projects.filter((project) => project.category === activeFilter);
  const visible = filtered.slice(0, limit);

  return (
    <>
      {showFilters && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              className={`border px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition active:scale-[0.98] ${activeFilter === category ? "border-[#24231f] bg-[#24231f] text-white" : "border-[#D8D2C7] bg-[#FBFAF7] text-[#6F6B63] hover:bg-[#EFEAE2] hover:text-[#24231f]"}`}
            >
              {category === "Todo" ? byLang(lang, { es: "Todo", ca: "Tot", en: "All" }) : category}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((project, index) => (
          <ProjectCard key={`${project.title}-${index}`} project={project} index={index} lang={lang} />
        ))}
      </div>
    </>
  );
}

function FAQ({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="border-t border-[#EAEAEA]">
      {items.map(([question, answer], index) => (
        <div key={question} className="border-b border-[#EAEAEA] py-6">
          <button className="flex w-full items-center justify-between gap-8 text-left" type="button" onClick={() => setOpen(open === index ? -1 : index)}>
            <span className="text-xl font-medium tracking-[-0.02em] text-[#111111]">{question}</span>
            <PlusMinus open={open === index} />
          </button>
          {open === index && <p className="mt-4 max-w-3xl text-base leading-7 text-[#787774]">{answer}</p>}
        </div>
      ))}
    </div>
  );
}

function ContactForm({ t }) {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", project: "" });
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    const valid = form.name.trim() && form.email.includes("@") && form.project.trim().length > 16;
    if (!valid) {
      setStatus("error");
      setError(t.formError);
      return;
    }
    setStatus("loading");
    trackEvent("brief_submit", { event_category: "lead" });
    const subject = `Nuevo proyecto audiovisual - ${form.name.trim()}`;
    const body = [
      `${t.formName}: ${form.name.trim()}`,
      `${t.formEmail}: ${form.email.trim()}`,
      "",
      `${t.formProject}:`,
      form.project.trim(),
    ].join("\n");
    window.location.href = `mailto:produccion@laprodufilms.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.setTimeout(() => setStatus("success"), 350);
  }

  if (status === "success") {
    return (
      <div className="border border-[#EAEAEA] bg-white p-8">
        <SectionLabel>Brief</SectionLabel>
        <h3 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-[#111111]">{t.formSuccessTitle}</h3>
        <p className="mt-4 text-base leading-7 text-[#787774]">{t.formSuccessText}</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-8 border border-[#111111] bg-[#111111] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#333333] active:scale-[0.98]">
          {t.formNewBrief}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-[#EAEAEA] bg-white p-6 md:p-8">
      {status === "loading" ? (
        <div className="space-y-4" aria-live="polite">
          <div className="h-12 animate-soft-pulse bg-[#F7F6F3]" />
          <div className="h-12 animate-soft-pulse bg-[#F7F6F3]" />
          <div className="h-28 animate-soft-pulse bg-[#F7F6F3]" />
        </div>
      ) : (
        <>
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-[#111111]">{t.formName}</span>
              <input name="name" autoComplete="name" value={form.name} onFocus={() => trackEvent("form_start", { form_name: "contact" })} onChange={(event) => setForm({ ...form, name: event.target.value })} className="border border-[#EAEAEA] bg-[#FBFBFA] px-3 py-3 text-sm outline-none transition focus:border-[#111111]" placeholder="Marina Soldevila" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-[#111111]">{t.formEmail}</span>
              <input name="email" type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="border border-[#EAEAEA] bg-[#FBFBFA] px-3 py-3 text-sm outline-none transition focus:border-[#111111]" placeholder="produccion@empresa.com" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-[#111111]">{t.formProject}</span>
              <textarea name="project" value={form.project} onChange={(event) => setForm({ ...form, project: event.target.value })} rows={5} className="resize-none border border-[#EAEAEA] bg-[#FBFBFA] px-3 py-3 text-sm outline-none transition focus:border-[#111111]" placeholder="Documental corto, reportaje de evento, campaña social, spot o pieza corporativa." />
            </label>
          </div>
          {status === "error" && <p className="mt-5 border border-[#FDEBEC] bg-[#FDEBEC] px-3 py-3 text-sm text-[#9F2F2D]">{error}</p>}
          <button className="mt-6 w-full border border-[#111111] bg-[#111111] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#333333] active:scale-[0.98]" type="submit">
            {t.formSubmit}
          </button>
        </>
      )}
    </form>
  );
}

const methodSteps = {
  es: [
    { num: "01", name: "Brief", meta: "Fase 1 - Inicio", desc: "Se define el objetivo, el mensaje y el público objetivo. Se valida la propuesta y se establece el presupuesto y el calendario del proyecto.", tags: ["Estrategia", "Objetivos", "Presupuesto", "Calendario"] },
    { num: "02", name: "Tratamiento", meta: "Fase 2 - Concepto", desc: "Se desarrolla la visión artística: estética, tono, referencias visuales y narrativa. El cliente aprueba la dirección creativa antes de avanzar.", tags: ["Concepto", "Referencias", "Narrativa", "Aprobación"] },
    { num: "03", name: "Preproducción", meta: "Fase 3 - Planificación", desc: "Se planifica cada detalle: casting, localizaciones, storyboard, equipo técnico y plan de rodaje. Nada queda al azar.", tags: ["Casting", "Localizaciones", "Storyboard", "Plan de rodaje"] },
    { num: "04", name: "Rodaje", meta: "Fase 4 - Producción", desc: "Se captura el material en condiciones controladas. El equipo técnico y creativo trabajan coordinados para materializar la visión aprobada.", tags: ["Dirección", "Cámara", "Sonido", "Iluminación"] },
    { num: "05", name: "Postproducción", meta: "Fase 5 - Montaje", desc: "Se edita, coloriza, añade música y efectos. El material en bruto se transforma en la pieza final revisada y aprobada por el cliente.", tags: ["Edición", "Color", "Música", "Efectos"] },
    { num: "06", name: "Entregables", meta: "Fase 6 - Cierre", desc: "Se entregan los archivos finales en los formatos acordados: web, broadcast, redes sociales u otros canales. El proyecto queda listo para publicar.", tags: ["Formatos", "Web", "Broadcast", "Redes sociales"] },
  ],
  en: [
    { num: "01", name: "Brief", meta: "Phase 1 - Start", desc: "We define the goal, message and target audience. The proposal is approved and the project budget and timeline are set.", tags: ["Strategy", "Goals", "Budget", "Schedule"] },
    { num: "02", name: "Treatment", meta: "Phase 2 - Concept", desc: "We shape the artistic vision: look, tone, visual references and narrative. The client approves the creative direction before moving forward.", tags: ["Concept", "References", "Narrative", "Approval"] },
    { num: "03", name: "Pre-production", meta: "Phase 3 - Planning", desc: "Every detail is planned: casting, locations, storyboard, technical crew and shooting plan. Nothing is left to chance.", tags: ["Casting", "Locations", "Storyboard", "Shoot plan"] },
    { num: "04", name: "Shoot", meta: "Phase 4 - Production", desc: "The material is captured in controlled conditions. The technical and creative team work together to bring the approved vision to life.", tags: ["Direction", "Camera", "Sound", "Lighting"] },
    { num: "05", name: "Postproduction", meta: "Phase 5 - Edit", desc: "We edit, grade, add music and effects. Raw material becomes the final piece, reviewed and approved by the client.", tags: ["Editing", "Color", "Music", "Effects"] },
    { num: "06", name: "Deliverables", meta: "Phase 6 - Delivery", desc: "Final files are delivered in the agreed formats: web, broadcast, social media or other channels. The project is ready to publish.", tags: ["Formats", "Web", "Broadcast", "Social media"] },
  ],
  ca: [
    { num: "01", name: "Brief", meta: "Fase 1 - Inici", desc: "Es defineix l'objectiu, el missatge i el públic objectiu. Es valida la proposta i s'estableixen el pressupost i el calendari del projecte.", tags: ["Estratègia", "Objectius", "Pressupost", "Calendari"] },
    { num: "02", name: "Tractament", meta: "Fase 2 - Concepte", desc: "Es desenvolupa la visió artística: estètica, to, referències visuals i narrativa. El client aprova la direcció creativa abans d'avançar.", tags: ["Concepte", "Referències", "Narrativa", "Aprovació"] },
    { num: "03", name: "Preproducció", meta: "Fase 3 - Planificació", desc: "Es planifica cada detall: casting, localitzacions, storyboard, equip tècnic i pla de rodatge. Res queda a l'atzar.", tags: ["Casting", "Localitzacions", "Storyboard", "Pla de rodatge"] },
    { num: "04", name: "Rodatge", meta: "Fase 4 - Producció", desc: "Es captura el material en condicions controlades. L'equip tècnic i creatiu treballa coordinat per materialitzar la visió aprovada.", tags: ["Direcció", "Càmera", "So", "Il·luminació"] },
    { num: "05", name: "Postproducció", meta: "Fase 5 - Muntatge", desc: "S'edita, es fa color, s'afegeix música i efectes. El material brut es transforma en la peça final revisada i aprovada pel client.", tags: ["Edició", "Color", "Música", "Efectes"] },
    { num: "06", name: "Entregables", meta: "Fase 6 - Tancament", desc: "Es lliuren els arxius finals en els formats acordats: web, broadcast, xarxes socials o altres canals. El projecte queda llest per publicar.", tags: ["Formats", "Web", "Broadcast", "Xarxes socials"] },
  ],
};

function MethodFilmStrip({ lang }) {
  const [activeIdx, setActiveIdx] = useState(null);
  const steps = byLang(lang, methodSteps);
  const activeStep = activeIdx === null ? null : steps[activeIdx];
  const perfItems = useMemo(() => Array.from({ length: 29 }, (_, index) => index), []);

  return (
    <div className="laprodu-method">
      <div className="film-strip" aria-label={byLang(lang, { es: "Proceso de producción", ca: "Procés de producció", en: "Production process" })}>
        <div className="perfs top" aria-hidden="true">
          {perfItems.map((item) => <span key={`top-${item}`} className="perf" />)}
        </div>
        <div className="frames-row">
          {steps.map((step, index) => (
            <button
              key={step.num}
              type="button"
              className={`lp-frame ${activeIdx === index ? "active" : ""}`}
              style={{ "--delay": `${index * 70}ms` }}
              onClick={() => setActiveIdx(activeIdx === index ? null : index)}
              aria-expanded={activeIdx === index}
            >
              <span className="f-num">{step.num}</span>
              <span className="f-divider" />
              <span className="f-name">{step.name}</span>
            </button>
          ))}
        </div>
        <div className="perfs bottom" aria-hidden="true">
          {perfItems.map((item) => <span key={`bottom-${item}`} className="perf" />)}
        </div>
      </div>

      <div className="lp-connector" aria-hidden="true"><div className="lp-connector-line" /></div>

      <div className={`detail-panel ${activeStep ? "visible" : ""}`}>
        {activeStep && (
          <div className="detail-inner">
            <div className="d-num-bg">{activeStep.num}</div>
            <div>
              <button type="button" className="d-close" onClick={() => setActiveIdx(null)}>
                {byLang(lang, { es: "Cerrar", ca: "Tancar", en: "Close" })}
              </button>
              <p className="d-meta">{activeStep.meta}</p>
              <p className="d-title">{activeStep.name}</p>
              <p className="d-desc">{activeStep.desc}</p>
              <div className="d-tags">
                {activeStep.tags.map((tag) => <span key={tag} className="d-tag">{tag}</span>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HomePage({ lang, t, serviceItems, projectItems, postItems, faqItems }) {
  return (
    <>
      <section id="inicio" className="relative px-4 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[.92fr_1.08fr] lg:items-center">
          <div data-reveal className="max-w-4xl">
            <SectionLabel>{t.heroKicker}</SectionLabel>
            <h1 className="balanced-text font-editorial mt-7 max-w-[15ch] text-5xl leading-[0.95] tracking-[-0.055em] text-[#24231f] md:text-6xl xl:text-7xl">
              {t.heroTitle}
            </h1>
            <p className="pretty-text mt-7 max-w-[38rem] text-xl font-semibold leading-8 tracking-[-0.03em] text-[#24231f] md:text-2xl md:leading-9">{t.heroSubtitle}</p>
            <p className="pretty-text mt-5 max-w-[62ch] text-base leading-8 text-[#6F6B63] md:text-lg">{t.heroText}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={pathFor(lang, "portfolio")} className="border border-[#24231f] bg-[#24231f] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#8C4F3B] hover:bg-[#8C4F3B] active:scale-[0.98]">
                {t.heroPrimary}
              </a>
              <a href={pathFor(lang, "contacto")} className="border border-[#D8D2C7] bg-[#FBFAF7] px-5 py-3 text-sm font-semibold text-[#24231f] transition hover:bg-[#EFEAE2] active:scale-[0.98]">
                {t.heroSecondary}
              </a>
            </div>
          </div>

          <div data-reveal style={{ "--index": 2 }} className="grid gap-4 lg:pt-6">
            <div className="relative border border-[#DED8CE] bg-[#FBFAF7] p-3 shadow-[0_24px_70px_rgba(73,59,45,0.10)]">
              <div className="relative flex h-9 items-center gap-2 border-b border-[#E4E0D8] px-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#D8D2C7]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D8D2C7]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D8D2C7]" />
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-[#6F6B63]">laprodufilms.com</span>
              </div>
              <div className="relative aspect-video overflow-hidden bg-[#111111]">
                <iframe src={reelUrl} title="REEL LAPRODU FILMS" loading="lazy" className="absolute inset-0 h-full w-full" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" allowFullScreen />
              </div>
              <div className="grid gap-5 p-5 md:grid-cols-[1fr_auto]">
                <div>
                  <Tag bg="#EFEAE2" color="#8C4F3B">{t.reelLabel}</Tag>
                  <p className="pretty-text mt-3 text-sm leading-6 text-[#45413A]">{t.reelText}</p>
                </div>
                <a href="https://www.youtube.com/@laprodufilms" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#24231f] transition hover:text-[#8C4F3B]">
                  YouTube
                  <ArrowIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="border-y border-[#E4E0D8] bg-[#FBFAF7] px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div data-reveal className="mb-14 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <SectionLabel>{t.servicesLabel}</SectionLabel>
              <h2 className="balanced-text font-editorial mt-5 max-w-[10ch] text-6xl leading-[0.95] tracking-[-0.05em] text-[#24231f] md:text-7xl">{t.servicesTitle}</h2>
            </div>
            <p className="pretty-text max-w-3xl text-lg leading-8 text-[#6F6B63] lg:pt-11">{t.servicesIntro}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {serviceItems.map((service, index) => (
              <article key={service.title} data-reveal style={{ "--index": index }} className="group grid bg-[#F6F5F2] shadow-[inset_0_0_0_1px_rgba(36,35,31,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(73,59,45,0.10)]">
                <div className="aspect-[4/3] overflow-hidden bg-[#EFEAE2]">
                  <img src={service.image} alt={serviceImageAlt(service, lang)} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
                </div>
                <div className="flex min-h-[18.5rem] flex-col p-6">
                  <Tag bg="#EFEAE2" color="#8C4F3B">0{index + 1}</Tag>
                  <h3 className="mt-8 text-2xl font-semibold tracking-[-0.035em] text-[#24231f]">{service.title}</h3>
                  <p className="pretty-text mt-3 text-sm leading-6 text-[#6F6B63]">{service.text}</p>
                  <div className="mt-auto border-t border-[#E4E0D8] pt-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6F6B63]">{byLang(lang, { es: "Entregables", ca: "Entregables", en: "Deliverables" })}</p>
                    <p className="mt-2 text-sm font-medium leading-6 text-[#2F3437]">{service.deliverable}</p>
                    {service.landingSlug && (
                      <a href={pathFor(lang, service.landingSlug)} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#24231f] transition hover:text-[#8C4F3B]">
                        {service.cta}
                        <ArrowIcon className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div data-reveal className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <SectionLabel>Portfolio</SectionLabel>
              <h2 className="font-editorial mt-5 text-6xl leading-[0.95] tracking-[-0.04em] text-[#111111] md:text-7xl">{t.portfolioTitle}</h2>
            </div>
            <div className="max-w-xl">
              <p className="text-base leading-7 text-[#787774]">{t.portfolioIntro}</p>
              <a href={pathFor(lang, "portfolio", "todos")} className="mt-5 inline-flex items-center gap-2 border border-[#111111] bg-[#111111] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#333333]">
                {byLang(lang, { es: "Ver todos", ca: "Veure tots", en: "View all" })}
                <ArrowIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
          <PortfolioGrid projects={projectItems} lang={lang} limit={8} />
        </div>
      </section>

      <section id="metodo" className="border-y border-[#EAEAEA] bg-[#F7F6F3] px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div data-reveal className="mb-14 max-w-4xl">
            <SectionLabel>{t.methodLabel}</SectionLabel>
            <h2 className="font-editorial mt-5 text-6xl leading-[0.95] tracking-[-0.04em] text-[#111111] md:text-7xl">{t.methodTitle}</h2>
          </div>
          <MethodFilmStrip lang={lang} />
        </div>
      </section>

      <section id="blog" className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div data-reveal className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div className="max-w-4xl">
              <SectionLabel>Blog</SectionLabel>
              <h2 className="font-editorial mt-5 text-6xl leading-[0.95] tracking-[-0.04em] text-[#111111] md:text-7xl">{t.blogTitle}</h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#787774]">{t.blogIntro}</p>
            </div>
            <a href={pathFor(lang, "blog", "todos")} className="inline-flex items-center gap-2 border border-[#111111] bg-[#111111] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#333333]">
              {byLang(lang, { es: "Ver todas", ca: "Veure totes", en: "View all" })}
              <ArrowIcon className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {postItems.slice(0, 3).map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="border-y border-[#EAEAEA] bg-white px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div data-reveal>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-editorial mt-5 text-6xl leading-[0.95] tracking-[-0.04em] text-[#111111] md:text-7xl">{t.faqTitle}</h2>
          </div>
          <div data-reveal style={{ "--index": 1 }}>
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>

      <ContactSection t={t} lang={lang} />
    </>
  );
}

function ContactSection({ t, lang }) {
  return (
    <section id="contacto" className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[1fr_.85fr]">
        <div data-reveal className="relative overflow-hidden border border-[#DED8CE] bg-[#EFEAE2] p-8 text-[#24231f] md:p-12">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('/laprodu/fotos/rodaje-produccion-audiovisual-barcelona-laprodu-films.jpg')] bg-cover bg-center opacity-[0.10]" />
          <div className="relative">
          <SectionLabel>{t.contactLabel}</SectionLabel>
          <h2 className="balanced-text font-editorial mt-8 max-w-[11ch] text-5xl leading-[0.94] tracking-[-0.05em] md:text-7xl">{t.contactTitle}</h2>
          <p className="pretty-text mt-8 max-w-2xl text-base leading-7 text-[#5E5A52]">{t.contactText}</p>
          <div className="mt-12 grid gap-4 border-t border-[#D8D2C7] pt-8 text-sm text-[#5E5A52] sm:grid-cols-2">
            <div>
              <a href="mailto:produccion@laprodufilms.com" onClick={() => trackEvent("email_click", { event_category: "lead" })} className="font-semibold text-[#24231f] transition hover:text-[#8C4F3B]">produccion@laprodufilms.com</a>
              <p className="mt-1"><a href="tel:+34722387590" onClick={() => trackEvent("phone_click", { event_category: "lead" })} className="transition hover:text-[#8C4F3B]">+34 722 38 75 90</a></p>
            </div>
            <div>
              <p className="font-semibold text-[#24231f]">YouTube · Barcelona</p>
              <p className="mt-1">{byLang(lang, { es: "Proyectos nacionales e internacionales", ca: "Projectes nacionals i internacionals", en: "National and international projects" })}</p>
            </div>
          </div>
          </div>
        </div>
        <div data-reveal style={{ "--index": 1 }}>
          <ContactForm t={t} />
        </div>
      </div>
    </section>
  );
}

function PortfolioListPage({ t, lang, projectItems }) {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <a href={pathFor(lang)} className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#111111]">
          <ArrowIcon className="h-4 w-4 rotate-180" />
          {byLang(lang, { es: "Volver al inicio", ca: "Tornar a l'inici", en: "Back home" })}
        </a>
        <div data-reveal className="mb-12">
          <div>
            <SectionLabel>Portfolio</SectionLabel>
            <h1 className="font-editorial mt-5 text-6xl leading-[0.95] tracking-[-0.04em] text-[#111111] md:text-8xl">{t.portfolioTitle}</h1>
          </div>
        </div>
        <PortfolioGrid projects={projectItems} lang={lang} />
      </div>
    </section>
  );
}

function ProjectDetailPage({ project, lang, projectItems }) {
  const related = projectItems.filter((item) => item.slug !== project.slug && item.category === project.category).slice(0, 3);

  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <a href={pathFor(lang, "portfolio", "todos")} className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#111111]">
          <ArrowIcon className="h-4 w-4 rotate-180" />
          {byLang(lang, { es: "Volver al portfolio", ca: "Tornar al portfolio", en: "Back to portfolio" })}
        </a>
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div data-reveal>
            <SectionLabel>{project.category}</SectionLabel>
            <h1 className="font-editorial mt-5 text-6xl leading-[0.92] tracking-[-0.045em] text-[#111111] md:text-8xl">{project.title}</h1>
            <p className="mt-6 text-xl font-semibold leading-8 tracking-[-0.03em] text-[#111111]">{project.type}</p>
            <p className="mt-4 text-base leading-7 text-[#787774]">{project.note}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              <Tag>{project.year}</Tag>
              <Tag bg="#E1F3FE" color="#1F6C9F">{project.client}</Tag>
            </div>
            {project.slug === "cedec-casos-exito" && (
              <a href={pathFor(lang, "casos-exito-video")} className="mt-8 inline-flex items-center gap-2 border border-[#24231f] bg-[#24231f] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#8C4F3B] hover:bg-[#8C4F3B]">
                {byLang(lang, { es: "Ver landing de casos de éxito", ca: "Veure landing de casos d'èxit", en: "View success stories landing" })}
                <ArrowIcon className="h-4 w-4" />
              </a>
            )}
          </div>
          <div data-reveal style={{ "--index": 1 }} className="border border-[#EAEAEA] bg-white p-3">
            <div className="relative aspect-video overflow-hidden bg-[#111111]">
              {project.video ? (
                <iframe src={project.video} title={project.title} loading="lazy" className="absolute inset-0 h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
              ) : (
                <img src={project.image} alt={projectImageAlt(project, lang)} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              )}
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <div className="mt-16">
            <SectionLabel>{byLang(lang, { es: "Más piezas", ca: "Més peces", en: "More work" })}</SectionLabel>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item, index) => (
                <ProjectCard key={item.slug} project={item} index={index} lang={lang} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function SuccessCasesLandingPage({ page, lang, projectItems, t }) {
  const featured = page.featuredProject ? projectItems.find((item) => item.slug === page.featuredProject) : null;
  const related = (page.related || []).map((slug) => projectItems.find((item) => item.slug === slug)).filter(Boolean);
  const proofVideos = (page.proofVideos || page.related || [])
    .map((slug) => projectItems.find((item) => item.slug === slug))
    .filter((item) => item?.video)
    .slice(0, 4);
  const heroImage = page.heroImage || featured?.image;
  const secondaryHref = page.blogSlug ? pathFor(lang, "blog", page.blogSlug) : featured ? pathFor(lang, "portfolio", featured.slug) : null;
  const problemTitle = page.problemTitle || byLang(lang, { es: "La confianza se acelera cuando la cuenta un cliente.", ca: "La confiança s'accelera quan l'explica un client.", en: "Trust moves faster when a client tells it." });
  const problemLabel = page.problemLabel || byLang(lang, { es: "Problema comercial", ca: "Problema comercial", en: "Commercial problem" });
  const visualLabel = page.visualLabel || byLang(lang, { es: "Teasers y ejemplos", ca: "Teasers i exemples", en: "Teasers and examples" });
  const visualTitle = page.visualTitle || byLang(lang, { es: "Prueba visual antes de pedir contacto.", ca: "Prova visual abans de demanar contacte.", en: "Visual proof before asking for contact." });
  const visualIntro = page.visualIntro || byLang(lang, {
    es: "El objetivo no es hacer un vídeo bonito y aislado: es construir piezas que ventas, marketing y dirección puedan reutilizar en momentos distintos.",
    ca: "L'objectiu no és fer un vídeo bonic i aïllat: és construir peces que vendes, màrqueting i direcció puguin reutilitzar en moments diferents.",
    en: "The goal is not to create a nice isolated video: it is to build assets that sales, marketing and leadership can reuse at different moments.",
  });
  const whenTitle = page.whenTitle || byLang(lang, { es: "Cuando la prueba vale más que la promesa.", ca: "Quan la prova val més que la promesa.", en: "When proof is stronger than promise." });
  const processTitle = page.processTitle || byLang(lang, { es: "Del cliente real a una pieza útil para ventas.", ca: "Del client real a una peça útil per a vendes.", en: "From real client to a useful sales asset." });
  const deliverablesTitle = page.deliverablesTitle || byLang(lang, { es: "Una producción, varios usos.", ca: "Una producció, diversos usos.", en: "One production, several uses." });
  const faqTitle = page.faqTitle || byLang(lang, { es: "Preguntas sobre casos de éxito", ca: "Preguntes sobre casos d'èxit", en: "Questions about success stories" });

  return (
    <>
      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
          <div data-reveal>
            <SectionLabel>{page.kicker}</SectionLabel>
            <h1 className="balanced-text font-editorial mt-6 max-w-[12ch] text-5xl leading-[0.95] tracking-[-0.055em] text-[#24231f] md:text-7xl">
              {page.title}
            </h1>
            <p className="pretty-text mt-7 max-w-2xl text-xl font-semibold leading-8 tracking-[-0.03em] text-[#24231f]">{page.intro}</p>
            <p className="pretty-text mt-5 max-w-2xl text-base leading-7 text-[#6F6B63]">{page.proof}</p>
            <div className="mt-7 grid gap-3">
              {page.bullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-3 text-sm font-semibold leading-6 text-[#24231f]">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-[#8C4F3B]" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={pathFor(lang, "contacto")} onClick={() => trackEvent("success_cases_cta_click", { event_category: "lead" })} className="border border-[#24231f] bg-[#24231f] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#8C4F3B] hover:bg-[#8C4F3B] active:scale-[0.98]">
                {page.primary}
              </a>
              {secondaryHref && (
                <a href={secondaryHref} className="border border-[#D8D2C7] bg-[#FBFAF7] px-5 py-3 text-sm font-semibold text-[#24231f] transition hover:bg-[#EFEAE2] active:scale-[0.98]">
                  {page.secondary}
                </a>
              )}
            </div>
          </div>
          <div data-reveal style={{ "--index": 1 }} className="border border-[#DED8CE] bg-white p-3 shadow-[0_24px_70px_rgba(73,59,45,0.10)]">
            <div className="relative aspect-video overflow-hidden bg-[#111111]">
              {featured?.video ? (
                <iframe src={featured.video} title={`${featured.title} - ${featured.type}`} loading="lazy" className="absolute inset-0 h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
              ) : (
                <img src={heroImage} alt={featured ? projectImageAlt(featured, lang) : page.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              )}
            </div>
            {featured && (
              <div className="grid gap-5 p-5 md:grid-cols-[1fr_auto]">
                <div>
                  <Tag bg="#F1ECFA" color="#6D4AA0">{featured.type}</Tag>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#24231f]">{featured.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#6F6B63]">{featured.note}</p>
                </div>
                <a href={pathFor(lang, "portfolio", featured.slug)} className="inline-flex items-center gap-2 text-sm font-semibold text-[#24231f] transition hover:text-[#8C4F3B]">
                  Portfolio
                  <ArrowIcon className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {page.pain && (
        <section className="border-y border-[#E4E0D8] bg-[#FBFAF7] px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <div data-reveal>
              <SectionLabel>{problemLabel}</SectionLabel>
              <h2 className="font-editorial mt-5 max-w-[11ch] text-5xl leading-[0.95] tracking-[-0.05em] text-[#24231f] md:text-6xl">
                {problemTitle}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {page.pain.map(([title, text], index) => (
                <article key={title} data-reveal style={{ "--index": index }} className="bg-white p-6 shadow-[inset_0_0_0_1px_rgba(36,35,31,0.08)]">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#8C4F3B]">0{index + 1}</p>
                  <h3 className="mt-8 text-2xl font-semibold tracking-[-0.035em] text-[#24231f]">{title}</h3>
                  <p className="pretty-text mt-4 text-sm leading-6 text-[#6F6B63]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.outcomes && (
        <section className="border-y border-[#E4E0D8] bg-[#FBFAF7] px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-4 md:grid-cols-3">
            {page.outcomes.map(([title, text], index) => (
              <article key={title} data-reveal style={{ "--index": index }} className="bg-white p-6 shadow-[inset_0_0_0_1px_rgba(36,35,31,0.08)] md:p-8">
                <Tag bg={index === 0 ? "#EDF3EC" : index === 1 ? "#FBF3DB" : "#E1F3FE"} color={index === 0 ? "#346538" : index === 1 ? "#956400" : "#1F6C9F"}>0{index + 1}</Tag>
                <h2 className="mt-8 text-3xl font-semibold tracking-[-0.04em] text-[#24231f]">{title}</h2>
                <p className="pretty-text mt-4 text-base leading-7 text-[#6F6B63]">{text}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {proofVideos.length > 0 && (
        <section className="px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1440px]">
            <div data-reveal className="mb-10 grid gap-6 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
              <div>
                <SectionLabel>{visualLabel}</SectionLabel>
                <h2 className="font-editorial mt-5 text-5xl leading-[0.95] tracking-[-0.05em] text-[#24231f] md:text-6xl">
                  {visualTitle}
                </h2>
              </div>
              <p className="pretty-text max-w-3xl text-base leading-7 text-[#6F6B63]">
                {visualIntro}
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {proofVideos.map((item, index) => (
                <article key={item.slug} data-reveal style={{ "--index": index }} className="border border-[#DED8CE] bg-white p-3">
                  <div className="relative aspect-video overflow-hidden bg-[#111111]">
                    <iframe src={item.video} title={`${item.title} - ${item.type}`} loading="lazy" className="absolute inset-0 h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                  </div>
                  <div className="grid gap-4 p-5 md:grid-cols-[1fr_auto]">
                    <div>
                      <Tag bg={projectCategoryStyle(item.category).bg} color={projectCategoryStyle(item.category).color}>{item.category}</Tag>
                      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-[#24231f]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#6F6B63]">{item.type}</p>
                    </div>
                    <a href={pathFor(lang, "portfolio", item.slug)} className="inline-flex items-center gap-2 text-sm font-semibold text-[#24231f] transition hover:text-[#8C4F3B]">
                      Portfolio
                      <ArrowIcon className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <a href="https://www.youtube.com/@laprodufilms/videos" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 border border-[#24231f] bg-[#24231f] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#8C4F3B] hover:bg-[#8C4F3B]">
              {byLang(lang, { es: "Ver más vídeos en YouTube", ca: "Veure més vídeos a YouTube", en: "View more videos on YouTube" })}
              <ArrowIcon className="h-4 w-4" />
            </a>
          </div>
        </section>
      )}

      {page.when && (
        <section className="px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <div data-reveal>
              <SectionLabel>{byLang(lang, { es: "Cuándo tiene sentido", ca: "Quan té sentit", en: "When it makes sense" })}</SectionLabel>
              <h2 className="font-editorial mt-5 max-w-[11ch] text-5xl leading-[0.95] tracking-[-0.05em] text-[#24231f] md:text-6xl">
                {whenTitle}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {page.when.map((item, index) => (
                <div key={item} data-reveal style={{ "--index": index }} className="flex min-h-36 flex-col justify-between border border-[#E4E0D8] bg-[#FBFAF7] p-6">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#8C4F3B]">0{index + 1}</span>
                  <p className="mt-8 text-xl font-semibold leading-7 tracking-[-0.03em] text-[#24231f]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.process && (
        <section className="border-y border-[#EAEAEA] bg-[#F7F6F3] px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1440px]">
            <div data-reveal className="mb-12 max-w-4xl">
              <SectionLabel>{byLang(lang, { es: "Proceso", ca: "Procés", en: "Process" })}</SectionLabel>
              <h2 className="font-editorial mt-5 text-5xl leading-[0.95] tracking-[-0.05em] text-[#24231f] md:text-6xl">
                {processTitle}
              </h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-4">
              {page.process.map(([num, title, text], index) => (
                <article key={num} data-reveal style={{ "--index": index }} className="bg-white p-6 shadow-[inset_0_0_0_1px_rgba(36,35,31,0.08)]">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#8C4F3B]">{num}</p>
                  <h3 className="mt-8 text-2xl font-semibold tracking-[-0.035em] text-[#24231f]">{title}</h3>
                  <p className="pretty-text mt-4 text-sm leading-6 text-[#6F6B63]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.deliverables && (
        <section className="px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <div data-reveal>
              <SectionLabel>{byLang(lang, { es: "Entregables", ca: "Entregables", en: "Deliverables" })}</SectionLabel>
              <h2 className="font-editorial mt-5 text-5xl leading-[0.95] tracking-[-0.05em] text-[#24231f] md:text-6xl">
                {deliverablesTitle}
              </h2>
            </div>
            <div className="grid gap-5">
              {(page.includes || page.channels) && (
                <div className="grid gap-4 md:grid-cols-2">
                  {page.includes && (
                    <div className="bg-[#FBFAF7] p-6 shadow-[inset_0_0_0_1px_rgba(36,35,31,0.08)]">
                      <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#24231f]">{byLang(lang, { es: "Qué incluye", ca: "Què inclou", en: "What is included" })}</h3>
                      <ul className="mt-6 grid gap-3 text-sm leading-6 text-[#6F6B63]">
                        {page.includes.map((item) => <li key={item} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 bg-[#8C4F3B]" />{item}</li>)}
                      </ul>
                    </div>
                  )}
                  {page.channels && (
                    <div className="bg-[#24231f] p-6 text-white">
                      <h3 className="text-2xl font-semibold tracking-[-0.035em]">{byLang(lang, { es: "Dónde se usa", ca: "On es fa servir", en: "Where it is used" })}</h3>
                      <ul className="mt-6 grid gap-3 text-sm leading-6 text-[#EFEAE2]">
                        {page.channels.map((item) => <li key={item} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 bg-[#D6A15C]" />{item}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              <div className="grid gap-3">
                {page.deliverables.map((item, index) => (
                  <div key={item} data-reveal style={{ "--index": index }} className="flex items-center justify-between gap-6 border border-[#E4E0D8] bg-[#FBFAF7] p-5">
                    <p className="text-xl font-semibold tracking-[-0.03em] text-[#24231f]">{item}</p>
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#8C4F3B]">0{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {page.pricing && (
        <section className="border-y border-[#EAEAEA] bg-white px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1440px]">
            <div data-reveal className="mb-12 max-w-4xl">
              <SectionLabel>{byLang(lang, { es: "Precios", ca: "Preus", en: "Pricing" })}</SectionLabel>
              <h2 className="font-editorial mt-5 text-5xl leading-[0.95] tracking-[-0.05em] text-[#24231f] md:text-6xl">
                {byLang(lang, { es: "Elige la profundidad de auditoría que necesita tu web.", ca: "Tria la profunditat d'auditoria que necessita la teva web.", en: "Choose the audit depth your website needs." })}
              </h2>
              <p className="pretty-text mt-5 max-w-3xl text-base leading-7 text-[#6F6B63]">
                {byLang(lang, {
                  es: "Una página clave puede ser la home, un servicio, una landing, una entrada de blog importante o la página de contacto.",
                  ca: "Una pàgina clau pot ser la home, un servei, una landing, una entrada de blog important o la pàgina de contacte.",
                  en: "A key page can be the homepage, a service page, a landing page, an important blog post or the contact page.",
                })}
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {page.pricing.map(([name, price, intro, features], index) => (
                <article key={name} data-reveal style={{ "--index": index }} className={`flex flex-col border p-6 md:p-8 ${index === 1 ? "border-[#24231f] bg-[#24231f] text-white" : "border-[#E4E0D8] bg-[#FBFAF7] text-[#24231f]"}`}>
                  <p className={`font-mono text-xs uppercase tracking-[0.18em] ${index === 1 ? "text-[#D6A15C]" : "text-[#8C4F3B]"}`}>0{index + 1}</p>
                  <h3 className="mt-8 text-3xl font-semibold tracking-[-0.04em]">{name}</h3>
                  <p className={`mt-3 text-5xl font-semibold tracking-[-0.05em] ${index === 1 ? "text-white" : "text-[#24231f]"}`}>{price}</p>
                  <p className={`pretty-text mt-5 text-sm leading-6 ${index === 1 ? "text-[#EFEAE2]" : "text-[#6F6B63]"}`}>{intro}</p>
                  <ul className={`mt-8 grid gap-3 text-sm leading-6 ${index === 1 ? "text-[#EFEAE2]" : "text-[#5E5A52]"}`}>
                    {features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <span className={`mt-2 h-2 w-2 shrink-0 ${index === 1 ? "bg-[#D6A15C]" : "bg-[#8C4F3B]"}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={pathFor(lang, "contacto")} className={`mt-8 inline-flex justify-center border px-4 py-3 text-sm font-semibold transition active:scale-[0.98] ${index === 1 ? "border-white bg-white text-[#24231f] hover:bg-[#EFEAE2]" : "border-[#24231f] bg-[#24231f] text-white hover:border-[#8C4F3B] hover:bg-[#8C4F3B]"}`}>
                    {byLang(lang, { es: "Pedir este pack", ca: "Demanar aquest pack", en: "Request this package" })}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {!page.hideRelatedWork && related.length > 0 && (
        <section className="border-y border-[#EAEAEA] bg-white px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1440px]">
            <div data-reveal className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <SectionLabel>{byLang(lang, { es: "Prueba visual", ca: "Prova visual", en: "Visual proof" })}</SectionLabel>
                <h2 className="font-editorial mt-5 text-5xl leading-[0.95] tracking-[-0.05em] text-[#24231f] md:text-6xl">
                  {byLang(lang, { es: "Trabajos relacionados", ca: "Treballs relacionats", en: "Related work" })}
                </h2>
              </div>
              <a href={pathFor(lang, "portfolio", "todos")} className="inline-flex items-center gap-2 border border-[#24231f] bg-[#24231f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#333333]">
                {byLang(lang, { es: "Ver portfolio", ca: "Veure portfolio", en: "View portfolio" })}
                <ArrowIcon className="h-4 w-4" />
              </a>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((item, index) => (
                <ProjectCard key={item.slug} project={item} index={index} lang={lang} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div data-reveal>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-editorial mt-5 text-5xl leading-[0.95] tracking-[-0.05em] text-[#24231f] md:text-6xl">
              {faqTitle}
            </h2>
          </div>
          <div data-reveal style={{ "--index": 1 }}>
            <FAQ items={page.faq} />
          </div>
        </div>
      </section>

      <ContactSection t={t} lang={lang} />
    </>
  );
}

function BlogListPage({ t, lang, postItems }) {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <a href={pathFor(lang)} className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#111111]">
          <ArrowIcon className="h-4 w-4 rotate-180" />
          {byLang(lang, { es: "Volver al inicio", ca: "Tornar a l'inici", en: "Back home" })}
        </a>
        <div data-reveal className="mb-12 max-w-4xl">
          <SectionLabel>Blog</SectionLabel>
          <h1 className="font-editorial mt-5 text-6xl leading-[0.95] tracking-[-0.04em] text-[#111111] md:text-8xl">{t.blogTitle}</h1>
          <p className="mt-6 text-lg leading-8 text-[#787774]">{t.blogIntro}</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {postItems.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

function postTopic(post) {
  if (post.slug.includes("seo")) return "seo";
  if (post.slug.includes("fotografia")) return "photo";
  if (post.slug.includes("luz") || post.slug.includes("iluminacion")) return "light";
  if (post.slug.includes("audio-profesional") || post.slug.includes("sonido-")) return "audio";
  if (post.slug.includes("evento")) return "event";
  if (post.slug.includes("briefing")) return "brief";
  if (post.slug.includes("redes")) return "social";
  if (post.slug.includes("postproduccion")) return "post";
  if (post.slug.includes("television")) return "tv";
  return "documentary";
}

function blogExperienceCopy(lang, topic) {
  const common = {
    es: {
      fieldTitle: "Lo que conviene decidir antes de producir",
      fieldIntro: "La diferencia entre una pieza correcta y una pieza realmente útil suele estar en las decisiones pequeñas que se toman antes del rodaje.",
      checklistTitle: "Checklist práctico",
      mistakesTitle: "Errores habituales",
      questionsTitle: "Preguntas que ayudan a enfocar el proyecto",
      exampleTitle: "Una situación típica de producción",
      ctaTitle: "Cómo puede ayudarte LAPRODU FILMS",
      ctaText: "Si estás preparando una pieza audiovisual, podemos ayudarte a ordenar objetivo, formato, equipo, rodaje, postproducción y entregables para que el proyecto llegue claro a publicación.",
      ctaButton: "Hablar con producción",
    },
    ca: {
      fieldTitle: "El que convé decidir abans de produir",
      fieldIntro: "La diferència entre una peça correcta i una peça realment útil sovint és en les petites decisions que es prenen abans del rodatge.",
      checklistTitle: "Checklist pràctic",
      mistakesTitle: "Errors habituals",
      questionsTitle: "Preguntes que ajuden a enfocar el projecte",
      exampleTitle: "Una situació típica de producció",
      ctaTitle: "Com pot ajudar-te LAPRODU FILMS",
      ctaText: "Si estàs preparant una peça audiovisual, podem ajudar-te a ordenar objectiu, format, equip, rodatge, postproducció i entregables perquè el projecte arribi clar a publicació.",
      ctaButton: "Parlar amb producció",
    },
    en: {
      fieldTitle: "What should be decided before production",
      fieldIntro: "The difference between a correct piece and a truly useful one is often found in the small decisions made before the shoot.",
      checklistTitle: "Practical checklist",
      mistakesTitle: "Common mistakes",
      questionsTitle: "Questions that focus the project",
      exampleTitle: "A typical production situation",
      ctaTitle: "How LAPRODU FILMS can help",
      ctaText: "If you are preparing an audiovisual piece, we can help you define goal, format, crew, shooting, postproduction and deliverables so the project reaches publication with clarity.",
      ctaButton: "Talk to production",
    },
  };

  const topics = {
    seo: {
      es: {
        decisions: ["Qué páginas deben posicionar y cuáles solo cumplen función informativa.", "Qué búsquedas long-tail conviene atacar con blog, servicio o landing comercial.", "Qué eventos se deben medir: formulario, email, teléfono, clic en WhatsApp o descarga.", "Qué cambios son urgentes antes de invertir en Google Ads."],
        mistakes: ["Cambiar diseño sin revisar si Google puede indexar las nuevas URLs.", "Crear muchas páginas parecidas que compiten entre sí por la misma keyword.", "Lanzar campañas sin una landing clara, rápida y con un CTA medible."],
        questions: ["¿Qué página debería aparecer cuando alguien busca tu servicio principal?", "¿Qué dudas reales tiene el cliente antes de contactar?", "¿La web mide los leads o solo muestra visitas?"],
        example: "Una web puede tener buen aspecto y aun así no posicionar porque todas sus páginas hablan de forma genérica. En una auditoría buscamos dónde falta intención: servicios concretos, preguntas frecuentes, casos, precios orientativos, schema y rutas que Google pueda entender.",
        ctaTitle: "Cómo puede ayudarte una auditoría SEO",
        ctaText: "Si vas a invertir en posicionamiento, contenidos o campañas, primero conviene saber qué está frenando la web y qué acciones tienen más impacto.",
        ctaButton: "Ver auditoría SEO",
      },
      ca: {
        decisions: ["Quines pàgines han de posicionar i quines només compleixen una funció informativa.", "Quines cerques long-tail convé atacar amb blog, servei o landing comercial.", "Quins esdeveniments cal mesurar: formulari, email, telèfon, clic a WhatsApp o descàrrega.", "Quins canvis són urgents abans d'invertir en Google Ads."],
        mistakes: ["Canviar disseny sense revisar si Google pot indexar les noves URLs.", "Crear moltes pàgines semblants que competeixen entre si per la mateixa keyword.", "Llançar campanyes sense una landing clara, ràpida i amb un CTA mesurable."],
        questions: ["Quina pàgina hauria d'aparèixer quan algú busca el teu servei principal?", "Quins dubtes reals té el client abans de contactar?", "La web mesura els leads o només mostra visites?"],
        example: "Una web pot tenir bon aspecte i tot i així no posicionar perquè totes les pàgines parlen de forma genèrica. En una auditoria busquem on falta intenció: serveis concrets, preguntes freqüents, casos, preus orientatius, schema i rutes que Google pugui entendre.",
        ctaTitle: "Com pot ajudar-te una auditoria SEO",
        ctaText: "Si vols invertir en posicionament, continguts o campanyes, primer convé saber què està frenant la web i quines accions tenen més impacte.",
        ctaButton: "Veure auditoria SEO",
      },
      en: {
        decisions: ["Which pages should rank and which only serve an informational purpose.", "Which long-tail searches should be covered with blog posts, service pages or commercial landings.", "Which events should be measured: form, email, phone, WhatsApp click or download.", "Which changes are urgent before investing in Google Ads."],
        mistakes: ["Changing design without checking whether Google can index the new URLs.", "Creating many similar pages that compete for the same keyword.", "Launching campaigns without a clear, fast landing page and measurable CTA."],
        questions: ["Which page should appear when someone searches for your main service?", "What real doubts does the customer have before contacting?", "Does the website measure leads or only show visits?"],
        example: "A website can look good and still fail to rank because every page speaks in generic terms. In an audit we look for missing intent: concrete services, FAQs, cases, indicative prices, schema and routes Google can understand.",
        ctaTitle: "How an SEO audit can help",
        ctaText: "If you are going to invest in ranking, content or campaigns, it is worth knowing what is holding the website back and which actions have the highest impact.",
        ctaButton: "View SEO audit",
      },
    },
    photo: {
      es: {
        decisions: ["Uso final de las fotografías: web, prensa, LinkedIn, campaña o archivo interno.", "Lista de personas, espacios y detalles que deben aparecer.", "Estilo visual: natural, editorial, corporativo, documental o más publicitario.", "Entrega necesaria: selección rápida, edición completa, formatos verticales y versiones para redes."],
        mistakes: ["Llegar sin shotlist y descubrir al final que falta una foto clave.", "No reservar tiempo para cambios de luz, pausas, desplazamientos o retratos individuales.", "Tratar todas las imágenes igual, aunque unas sean para prensa y otras para campaña."],
        questions: ["¿Qué imagen de la empresa debe quedar después de la sesión?", "¿Quién validará la selección final y en qué canales se publicará?", "¿Las fotos deben convivir con vídeos, piezas verticales o una campaña de paid media?"],
        example: "En una sesión corporativa suele pasar que el equipo pide “unas fotos para web”, pero durante el rodaje aparecen necesidades nuevas: retrato de dirección, recursos de producto, imagen de grupo, detalles de manos trabajando y piezas para LinkedIn. Si eso se anticipa, la sesión rinde mucho más.",
      },
      ca: {
        decisions: ["Ús final de les fotografies: web, premsa, LinkedIn, campanya o arxiu intern.", "Llista de persones, espais i detalls que han d'aparèixer.", "Estil visual: natural, editorial, corporatiu, documental o més publicitari.", "Entrega necessària: selecció ràpida, edició completa, formats verticals i versions per a xarxes."],
        mistakes: ["Arribar sense shotlist i descobrir al final que falta una foto clau.", "No reservar temps per a canvis de llum, pauses, desplaçaments o retrats individuals.", "Tractar totes les imatges igual, encara que unes siguin per a premsa i altres per a campanya."],
        questions: ["Quina imatge de l'empresa ha de quedar després de la sessió?", "Qui validarà la selecció final i en quins canals es publicarà?", "Les fotos han de conviure amb vídeos, peces verticals o una campanya de paid media?"],
        example: "En una sessió corporativa sovint passa que l'equip demana “unes fotos per a web”, però durant el rodatge apareixen necessitats noves: retrat de direcció, recursos de producte, imatge de grup, detalls de mans treballant i peces per a LinkedIn. Si això s'anticipa, la sessió rendeix molt més.",
      },
      en: {
        decisions: ["Final use of the photographs: website, press, LinkedIn, campaign or internal archive.", "List of people, spaces and details that must appear.", "Visual style: natural, editorial, corporate, documentary or more advertising-led.", "Required delivery: fast selection, full edit, vertical formats and social versions."],
        mistakes: ["Arriving without a shot list and discovering at the end that a key image is missing.", "Not reserving time for light changes, pauses, movements or individual portraits.", "Treating every image the same, even when some are for press and others for campaign use."],
        questions: ["What image of the company should remain after the session?", "Who will approve the final selection and where will it be published?", "Do the photos need to live alongside video, vertical pieces or a paid media campaign?"],
        example: "In a corporate session, the team often asks for “some photos for the website”, but new needs appear during the shoot: leadership portraits, product resources, group image, hands-at-work details and LinkedIn pieces. When that is anticipated, the session works much harder.",
      },
    },
    light: {
      es: {
        decisions: ["Si la luz debe sentirse natural, editorial, institucional o cinematográfica.", "Horario de rodaje según ventanas, orientación y continuidad entre entrevistas.", "Nivel de control necesario: luz disponible, refuerzo suave o esquema completo.", "Relación entre fondo, rostro, color de marca y legibilidad del plano."],
        mistakes: ["Elegir una sala bonita pero imposible de iluminar sin ruido visual.", "No revisar cómo cambia la luz natural durante la jornada.", "Mezclar temperaturas de color que hacen que piel, paredes y producto se vean extraños."],
        questions: ["¿La pieza debe transmitir cercanía, autoridad, calma, energía o precisión?", "¿Habrá varias entrevistas que necesiten continuidad visual?", "¿La luz debe integrarse en un estilo de marca ya existente?"],
        example: "En entrevistas largas, una ventana puede parecer perfecta al empezar y convertirse en un problema una hora después. Por eso miramos horario, orientación y posibles refuerzos antes de decidir cámara y fondo. La luz tiene que acompañar toda la conversación, no solo el primer plano bonito.",
      },
      ca: {
        decisions: ["Si la llum s'ha de sentir natural, editorial, institucional o cinematogràfica.", "Horari de rodatge segons finestres, orientació i continuïtat entre entrevistes.", "Nivell de control necessari: llum disponible, reforç suau o esquema complet.", "Relació entre fons, rostre, color de marca i llegibilitat del pla."],
        mistakes: ["Triar una sala bonica però impossible d'il·luminar sense soroll visual.", "No revisar com canvia la llum natural durant la jornada.", "Barrejar temperatures de color que fan que pell, parets i producte es vegin estranys."],
        questions: ["La peça ha de transmetre proximitat, autoritat, calma, energia o precisió?", "Hi haurà diverses entrevistes que necessitin continuïtat visual?", "La llum s'ha d'integrar en un estil de marca ja existent?"],
        example: "En entrevistes llargues, una finestra pot semblar perfecta al principi i convertir-se en un problema una hora després. Per això mirem horari, orientació i possibles reforços abans de decidir càmera i fons. La llum ha d'acompanyar tota la conversa, no només el primer pla bonic.",
      },
      en: {
        decisions: ["Whether the light should feel natural, editorial, institutional or cinematic.", "Shooting schedule according to windows, orientation and continuity between interviews.", "Required level of control: available light, soft support or full setup.", "Relationship between background, face, brand color and readability of the frame."],
        mistakes: ["Choosing a beautiful room that is almost impossible to light cleanly.", "Not checking how natural light changes throughout the day.", "Mixing color temperatures that make skin, walls and product look strange."],
        questions: ["Should the piece communicate closeness, authority, calm, energy or precision?", "Will there be several interviews that need visual continuity?", "Does the lighting need to integrate with an existing brand style?"],
        example: "In long interviews, a window can look perfect at the start and become a problem an hour later. That is why we check schedule, orientation and possible support lights before deciding camera and background. Light needs to accompany the whole conversation, not just the first beautiful frame.",
      },
    },
    audio: {
      es: {
        decisions: ["Tipo de voz que se grabará: entrevista, ponencia, ambiente, testimonio o conversación en movimiento.", "Microfonía principal y sistema de seguridad por si falla una fuente.", "Ruidos de localización: tráfico, climatización, reverberación, público o maquinaria.", "Entrega final: vídeo web, redes, emisión, subtítulos, podcast o archivo interno."],
        mistakes: ["Confiar en que el micro de cámara bastará para una entrevista importante.", "No hacer prueba real con la persona hablando al volumen que usará en rodaje.", "Olvidar que una sala bonita puede sonar dura, hueca o demasiado viva."],
        questions: ["¿Qué parte del mensaje se perdería si el audio no fuese claro?", "¿Habrá música, subtítulos, traducción o versiones cortas?", "¿Quién controla la mesa de sonido o la megafonía si es un evento?"],
        example: "En eventos, el momento importante rara vez se repite. Por eso el audio se piensa con redundancia: señal de mesa si existe, micro propio cuando se puede y ambiente para conservar sensación de sala. La edición agradece mucho esa previsión.",
      },
      ca: {
        decisions: ["Tipus de veu que es gravarà: entrevista, ponència, ambient, testimoni o conversa en moviment.", "Microfonia principal i sistema de seguretat per si falla una font.", "Sorolls de localització: trànsit, climatització, reverberació, públic o maquinària.", "Entrega final: vídeo web, xarxes, emissió, subtítols, podcast o arxiu intern."],
        mistakes: ["Confiar que el micro de càmera serà suficient per a una entrevista important.", "No fer prova real amb la persona parlant al volum que farà servir al rodatge.", "Oblidar que una sala bonica pot sonar dura, buida o massa viva."],
        questions: ["Quina part del missatge es perdria si l'àudio no fos clar?", "Hi haurà música, subtítols, traducció o versions curtes?", "Qui controla la taula de so o la megafonia si és un esdeveniment?"],
        example: "En esdeveniments, el moment important gairebé mai es repeteix. Per això l'àudio es pensa amb redundància: senyal de taula si existeix, micro propi quan es pot i ambient per conservar sensació de sala. L'edició agraeix molt aquesta previsió.",
      },
      en: {
        decisions: ["Type of voice to record: interview, talk, ambience, testimonial or moving conversation.", "Main microphone and backup system in case one source fails.", "Location noise: traffic, air conditioning, reverberation, audience or machinery.", "Final delivery: web video, social media, broadcast, subtitles, podcast or internal archive."],
        mistakes: ["Trusting that the camera microphone will be enough for an important interview.", "Not testing with the person speaking at the volume they will use during the shoot.", "Forgetting that a beautiful room can sound harsh, hollow or too live."],
        questions: ["What part of the message would be lost if the audio were not clear?", "Will there be music, subtitles, translation or short versions?", "Who controls the sound desk or PA system if it is an event?"],
        example: "In events, the important moment rarely happens twice. That is why audio is planned with redundancy: desk signal when available, our own microphone when possible and ambience to keep the feeling of the room. Editing benefits enormously from that preparation.",
      },
    },
    default: {
      es: {
        decisions: ["Objetivo de comunicación y público principal.", "Canales de distribución: web, televisión, redes, presentación interna o campaña.", "Tono narrativo: documental, corporativo, periodístico, testimonial o publicitario.", "Entregables finales, calendario de validaciones y personas que deben aprobar."],
        mistakes: ["Empezar por la cámara antes de entender qué debe conseguir la pieza.", "No reservar tiempo para permisos, localizaciones, archivo o validaciones internas.", "Pensar solo en un vídeo final y no en todas las versiones que harán falta después."],
        questions: ["¿Qué tiene que entender o sentir la audiencia al terminar?", "¿Dónde vivirá la pieza durante los próximos meses?", "¿Qué materiales existentes pueden ayudar a contar mejor la historia?"],
        example: "En muchos proyectos, el briefing inicial parece sencillo, pero al ordenarlo aparecen capas: audiencia, calendario, aprobaciones, materiales previos, versiones para redes y necesidades de archivo. Cuanto antes se habla de todo eso, más tranquilo llega el rodaje.",
      },
      ca: {
        decisions: ["Objectiu de comunicació i públic principal.", "Canals de distribució: web, televisió, xarxes, presentació interna o campanya.", "To narratiu: documental, corporatiu, periodístic, testimonial o publicitari.", "Entregables finals, calendari de validacions i persones que han d'aprovar."],
        mistakes: ["Començar per la càmera abans d'entendre què ha d'aconseguir la peça.", "No reservar temps per a permisos, localitzacions, arxiu o validacions internes.", "Pensar només en un vídeo final i no en totes les versions que faran falta després."],
        questions: ["Què ha d'entendre o sentir l'audiència en acabar?", "On viurà la peça durant els propers mesos?", "Quins materials existents poden ajudar a explicar millor la història?"],
        example: "En molts projectes, el briefing inicial sembla senzill, però en ordenar-lo apareixen capes: audiència, calendari, aprovacions, materials previs, versions per a xarxes i necessitats d'arxiu. Com abans es parla de tot això, més tranquil arriba el rodatge.",
      },
      en: {
        decisions: ["Communication goal and main audience.", "Distribution channels: web, television, social media, internal presentation or campaign.", "Narrative tone: documentary, corporate, journalistic, testimonial or advertising-led.", "Final deliverables, approval calendar and people who need to validate."],
        mistakes: ["Starting with the camera before understanding what the piece must achieve.", "Not reserving time for permissions, locations, archive or internal approvals.", "Thinking only about one final video and not all the versions that will be needed afterwards."],
        questions: ["What should the audience understand or feel at the end?", "Where will the piece live over the next few months?", "What existing materials could help tell the story better?"],
        example: "In many projects, the initial brief looks simple, but once ordered it reveals layers: audience, schedule, approvals, previous material, social versions and archive needs. The earlier that is discussed, the calmer the shoot becomes.",
      },
    },
  };

  const selected = topics[topic]?.[lang] ?? topics.default[lang];
  return { ...common[lang], ...selected };
}

function BlogDetailPage({ post, lang, postItems }) {
  const related = postItems.filter((item) => item.slug !== post.slug).slice(0, 2);
  const experience = blogExperienceCopy(lang, postTopic(post));

  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <article className="mx-auto max-w-5xl">
        <a href={pathFor(lang, "blog", "todos")} className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#111111]">
          <ArrowIcon className="h-4 w-4 rotate-180" />
          {byLang(lang, { es: "Volver al blog", ca: "Tornar al blog", en: "Back to blog" })}
        </a>
        <div data-reveal>
          <SectionLabel>{post.category}</SectionLabel>
          <h1 className="font-editorial mt-5 text-6xl leading-[0.92] tracking-[-0.045em] text-[#111111] md:text-8xl">{post.title}</h1>
          <div className="mt-8 flex flex-wrap gap-2">
            <Tag>{post.date}</Tag>
            <Tag bg="#E1F3FE" color="#1F6C9F">{post.read}</Tag>
          </div>
        </div>
        <div data-reveal style={{ "--index": 1 }} className="mt-10 aspect-[16/9] overflow-hidden border border-[#EAEAEA] bg-[#F7F6F3]">
          <img src={post.image} alt={postImageAlt(post, lang)} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        </div>
        <div className="mx-auto mt-12 max-w-3xl space-y-7 text-lg leading-8 text-[#2F3437]">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {post.ctaLanding && (
          <div className="mx-auto mt-12 max-w-3xl border border-[#24231f] bg-[#24231f] p-6 text-white md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#D6A15C]">{byLang(lang, { es: "Siguiente paso", ca: "Següent pas", en: "Next step" })}</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{byLang(lang, { es: "Convierte esta revisión en un plan concreto.", ca: "Converteix aquesta revisió en un pla concret.", en: "Turn this review into a concrete plan." })}</h2>
            <p className="pretty-text mt-4 text-base leading-7 text-[#EFEAE2]">
              {byLang(lang, {
                es: "Si quieres revisar tu web antes de invertir más en SEO o campañas, hemos preparado tres niveles de auditoría según profundidad y momento del proyecto.",
                ca: "Si vols revisar la teva web abans d'invertir més en SEO o campanyes, hem preparat tres nivells d'auditoria segons profunditat i moment del projecte.",
                en: "If you want to review your website before investing more in SEO or campaigns, we have prepared three audit levels depending on depth and project stage.",
              })}
            </p>
            <a href={pathFor(lang, post.ctaLanding)} className="mt-6 inline-flex items-center gap-2 border border-white bg-white px-4 py-3 text-sm font-semibold text-[#24231f] transition hover:bg-[#EFEAE2]">
              {post.ctaLabel}
              <ArrowIcon className="h-4 w-4" />
            </a>
          </div>
        )}
        <div className="mx-auto mt-14 max-w-3xl border-y border-[#E4E0D8] py-10">
          <h2 className="balanced-text text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#24231f]">{experience.fieldTitle}</h2>
          <p className="pretty-text mt-5 text-lg leading-8 text-[#5E5A52]">{experience.fieldIntro}</p>
          <div className="mt-8 grid gap-3">
            {experience.decisions.map((item) => (
              <div key={item} className="flex gap-4 border border-[#E4E0D8] bg-[#FBFAF7] p-4">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 bg-[#8C4F3B]" />
                <p className="text-base leading-7 text-[#2F3437]">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
          <div className="bg-[#FBFAF7] p-6 shadow-[inset_0_0_0_1px_rgba(36,35,31,0.08)] md:p-8">
            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#24231f]">{experience.checklistTitle}</h2>
            <ul className="mt-6 space-y-4 text-base leading-7 text-[#5E5A52]">
              {experience.questions.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8C4F3B] text-[11px] font-bold leading-none text-white" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#24231f] p-6 text-white md:p-8">
            <h2 className="text-2xl font-semibold tracking-[-0.035em]">{experience.mistakesTitle}</h2>
            <ul className="mt-6 space-y-4 text-base leading-7 text-[#EFEAE2]">
              {experience.mistakes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#D6A15C]">!</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#24231f]">{experience.exampleTitle}</h2>
          <p className="pretty-text mt-5 border-l-4 border-[#8C4F3B] bg-[#FBFAF7] p-6 text-lg leading-8 text-[#45413A]">{experience.example}</p>
        </div>
        <div className="mx-auto mt-14 max-w-3xl bg-[#EFEAE2] p-6 md:p-8">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#24231f]">{experience.ctaTitle}</h2>
          <p className="pretty-text mt-4 text-base leading-7 text-[#5E5A52]">{experience.ctaText}</p>
          <a href={pathFor(lang, "contacto")} className="mt-6 inline-flex items-center gap-2 border border-[#24231f] bg-[#24231f] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#8C4F3B] hover:bg-[#8C4F3B]">
            {experience.ctaButton}
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
      </article>
      {related.length > 0 && (
        <div className="mx-auto mt-20 max-w-[1440px]">
          <SectionLabel>{byLang(lang, { es: "Más entradas", ca: "Més entrades", en: "More posts" })}</SectionLabel>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {related.map((item, index) => (
              <PostCard key={item.slug} post={item} index={index} lang={lang} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

const legalPages = {
  es: {
    "politica-privacidad": {
      label: "Legal",
      title: "Política de privacidad",
      intro:
        "Esta política explica cómo LAPRODU FILMS trata los datos personales recibidos a través de esta web y de los canales de contacto asociados.",
      sections: [
        ["Responsable del tratamiento", "El responsable del tratamiento es LAPRODU FILMS. Puedes contactar con el equipo en produccion@laprodufilms.com para cualquier cuestión relacionada con privacidad o protección de datos."],
        ["Datos que podemos tratar", "Podemos tratar datos identificativos y de contacto, como nombre, email, teléfono, empresa, información incluida en formularios, datos del proyecto audiovisual y comunicaciones enviadas voluntariamente por la persona interesada."],
        ["Finalidad", "Usamos estos datos para responder solicitudes, preparar propuestas, gestionar presupuestos, mantener comunicaciones profesionales, prestar servicios contratados y cumplir obligaciones legales aplicables."],
        ["Base legal", "La base legal puede ser el consentimiento de la persona que contacta, la ejecución de medidas precontractuales o contractuales y el cumplimiento de obligaciones legales."],
        ["Conservación y derechos", "Los datos se conservarán durante el tiempo necesario para atender la solicitud o relación profesional. Puedes solicitar acceso, rectificación, supresión, oposición, limitación o portabilidad escribiendo a produccion@laprodufilms.com."],
      ],
    },
    "aviso-legal": {
      label: "Legal",
      title: "Aviso legal",
      intro: "Este aviso regula el acceso y uso de la web de LAPRODU FILMS. La navegación implica la aceptación de estas condiciones generales.",
      sections: [
        ["Titularidad del sitio", "La presente web pertenece a LAPRODU FILMS. Para comunicaciones relacionadas con este sitio puedes escribir a produccion@laprodufilms.com."],
        ["Uso de la web", "La persona usuaria se compromete a utilizar la web de forma lícita, respetuosa y adecuada, sin realizar acciones que puedan dañar, inutilizar o sobrecargar sus contenidos, sistemas o servicios."],
        ["Propiedad intelectual", "Los textos, imágenes, vídeos, diseños, marcas y demás contenidos de la web son titularidad de LAPRODU FILMS o cuentan con autorización para su uso. No se permite su reproducción, distribución o transformación sin autorización previa."],
        ["Enlaces externos", "La web puede incluir enlaces a plataformas externas, como servicios de vídeo o redes sociales. LAPRODU FILMS no se responsabiliza del contenido, disponibilidad o políticas de dichos terceros."],
        ["Responsabilidad", "LAPRODU FILMS procura que la información publicada sea correcta y actualizada, aunque no garantiza la inexistencia de errores ni la disponibilidad permanente del sitio."],
      ],
    },
    cookies: {
      label: "Legal",
      title: "Política de cookies",
      intro: "Esta página describe el uso de cookies y tecnologías similares en la web de LAPRODU FILMS, especialmente de cara a medición de campañas de Google Ads y analítica.",
      sections: [
        ["Qué son las cookies", "Las cookies son pequeños archivos que se almacenan en el dispositivo de la persona usuaria y permiten recordar información técnica, preferencias o datos de navegación."],
        ["Cookies necesarias", "La web puede utilizar tecnologías necesarias para su funcionamiento, como recordar la preferencia de idioma o mantener decisiones básicas de privacidad. Estas no se usan para publicidad."],
        ["Cookies de medición y publicidad", "Si aceptas la medición, podremos activar herramientas como Google Ads o Google Analytics para entender el rendimiento de campañas, medir conversiones y mejorar la web. Si no aceptas, estas cookies permanecerán desactivadas."],
        ["Cookies de terceros", "Al reproducir vídeos o acceder a plataformas externas, proveedores como YouTube, Vimeo u otros servicios pueden instalar sus propias cookies conforme a sus políticas."],
        ["Gestión de cookies", "Puedes aceptar o rechazar la medición desde el aviso de cookies de la web. También puedes bloquear o eliminar cookies desde la configuración de tu navegador. La desactivación de algunas cookies puede afectar a la reproducción de vídeos o a determinadas funciones."],
        ["Actualizaciones", "Esta política puede actualizarse si cambian las herramientas utilizadas en la web o los requisitos legales aplicables."],
      ],
    },
  },
  ca: {
    "politica-privacidad": {
      label: "Legal",
      title: "Política de privacitat",
      intro:
        "Aquesta política explica com LAPRODU FILMS tracta les dades personals rebudes a través d'aquesta web i dels canals de contacte associats.",
      sections: [
        ["Responsable del tractament", "El responsable del tractament és LAPRODU FILMS. Pots contactar amb l'equip a produccion@laprodufilms.com per a qualsevol qüestió relacionada amb privacitat o protecció de dades."],
        ["Dades que podem tractar", "Podem tractar dades identificatives i de contacte, com ara nom, email, telèfon, empresa, informació inclosa en formularis, dades del projecte audiovisual i comunicacions enviades voluntàriament per la persona interessada."],
        ["Finalitat", "Fem servir aquestes dades per respondre sol·licituds, preparar propostes, gestionar pressupostos, mantenir comunicacions professionals, prestar serveis contractats i complir obligacions legals aplicables."],
        ["Base legal", "La base legal pot ser el consentiment de la persona que contacta, l'execució de mesures precontractuals o contractuals i el compliment d'obligacions legals."],
        ["Conservació i drets", "Les dades es conservaran durant el temps necessari per atendre la sol·licitud o relació professional. Pots sol·licitar accés, rectificació, supressió, oposició, limitació o portabilitat escrivint a produccion@laprodufilms.com."],
      ],
    },
    "aviso-legal": {
      label: "Legal",
      title: "Avís legal",
      intro: "Aquest avís regula l'accés i l'ús de la web de LAPRODU FILMS. La navegació implica l'acceptació d'aquestes condicions generals.",
      sections: [
        ["Titularitat del lloc", "Aquesta web pertany a LAPRODU FILMS. Per a comunicacions relacionades amb aquest lloc pots escriure a produccion@laprodufilms.com."],
        ["Ús de la web", "La persona usuària es compromet a utilitzar la web de manera lícita, respectuosa i adequada, sense realitzar accions que puguin danyar, inutilitzar o sobrecarregar els seus continguts, sistemes o serveis."],
        ["Propietat intel·lectual", "Els textos, imatges, vídeos, dissenys, marques i altres continguts de la web són titularitat de LAPRODU FILMS o disposen d'autorització per al seu ús. No se'n permet la reproducció, distribució o transformació sense autorització prèvia."],
        ["Enllaços externs", "La web pot incloure enllaços a plataformes externes, com serveis de vídeo o xarxes socials. LAPRODU FILMS no es responsabilitza del contingut, disponibilitat o polítiques d'aquests tercers."],
        ["Responsabilitat", "LAPRODU FILMS procura que la informació publicada sigui correcta i actualitzada, tot i que no garanteix la inexistència d'errors ni la disponibilitat permanent del lloc."],
      ],
    },
    cookies: {
      label: "Legal",
      title: "Política de cookies",
      intro: "Aquesta pàgina descriu l'ús de cookies i tecnologies similars a la web de LAPRODU FILMS, especialment de cara al mesurament de campanyes de Google Ads i analítica.",
      sections: [
        ["Què són les cookies", "Les cookies són petits arxius que s'emmagatzemen al dispositiu de la persona usuària i permeten recordar informació tècnica, preferències o dades de navegació."],
        ["Cookies necessàries", "La web pot utilitzar tecnologies necessàries per al seu funcionament, com recordar la preferència d'idioma o mantenir decisions bàsiques de privacitat. Aquestes no s'utilitzen per a publicitat."],
        ["Cookies de mesurament i publicitat", "Si acceptes el mesurament, podrem activar eines com Google Ads o Google Analytics per entendre el rendiment de campanyes, mesurar conversions i millorar la web. Si no acceptes, aquestes cookies romandran desactivades."],
        ["Cookies de tercers", "En reproduir vídeos o accedir a plataformes externes, proveïdors com YouTube, Vimeo o altres serveis poden instal·lar les seves pròpies cookies d'acord amb les seves polítiques."],
        ["Gestió de cookies", "Pots acceptar o rebutjar el mesurament des de l'avís de cookies de la web. També pots bloquejar o eliminar cookies des de la configuració del navegador. La desactivació d'algunes cookies pot afectar la reproducció de vídeos o determinades funcions."],
        ["Actualitzacions", "Aquesta política es pot actualitzar si canvien les eines utilitzades a la web o els requisits legals aplicables."],
      ],
    },
  },
  en: {
    "politica-privacidad": {
      label: "Legal",
      title: "Privacy policy",
      intro:
        "This policy explains how LAPRODU FILMS processes personal data received through this website and its associated contact channels.",
      sections: [
        ["Data controller", "The data controller is LAPRODU FILMS. You can contact the team at produccion@laprodufilms.com for any privacy or data protection question."],
        ["Data we may process", "We may process identification and contact details, such as name, email, phone number, company, form information, audiovisual project details and communications voluntarily sent by the interested person."],
        ["Purpose", "We use this data to answer requests, prepare proposals, manage quotes, maintain professional communications, provide contracted services and comply with applicable legal obligations."],
        ["Legal basis", "The legal basis may be the consent of the person contacting us, pre-contractual or contractual measures and compliance with legal obligations."],
        ["Retention and rights", "Data will be kept for as long as necessary to handle the request or professional relationship. You may request access, rectification, erasure, objection, restriction or portability by writing to produccion@laprodufilms.com."],
      ],
    },
    "aviso-legal": {
      label: "Legal",
      title: "Legal notice",
      intro: "This notice regulates access to and use of the LAPRODU FILMS website. Browsing the site implies acceptance of these general terms.",
      sections: [
        ["Website owner", "This website belongs to LAPRODU FILMS. For communications related to this site, you can write to produccion@laprodufilms.com."],
        ["Use of the website", "Users agree to use the website lawfully, respectfully and appropriately, without actions that may damage, disable or overload its content, systems or services."],
        ["Intellectual property", "Texts, images, videos, designs, trademarks and other website content belong to LAPRODU FILMS or are used with permission. Reproduction, distribution or transformation without prior authorization is not allowed."],
        ["External links", "The website may include links to external platforms, such as video services or social media. LAPRODU FILMS is not responsible for third-party content, availability or policies."],
        ["Liability", "LAPRODU FILMS aims to keep published information correct and updated, although it does not guarantee the absence of errors or permanent availability of the site."],
      ],
    },
    cookies: {
      label: "Legal",
      title: "Cookie policy",
      intro: "This page describes the use of cookies and similar technologies on the LAPRODU FILMS website, especially for Google Ads campaign measurement and analytics.",
      sections: [
        ["What cookies are", "Cookies are small files stored on the user's device that make it possible to remember technical information, preferences or browsing data."],
        ["Necessary cookies", "The website may use technologies required for its operation, such as remembering language preference or basic privacy choices. These are not used for advertising."],
        ["Measurement and advertising cookies", "If you accept measurement, we may activate tools such as Google Ads or Google Analytics to understand campaign performance, measure conversions and improve the website. If you do not accept, these cookies remain disabled."],
        ["Third-party cookies", "When playing videos or accessing external platforms, providers such as YouTube, Vimeo or other services may install their own cookies according to their policies."],
        ["Managing cookies", "You can accept or reject measurement from the website cookie notice. You can also block or delete cookies from your browser settings. Disabling some cookies may affect video playback or certain website features."],
        ["Updates", "This policy may be updated if the tools used on the website or applicable legal requirements change."],
      ],
    },
  },
};

function absoluteUrl(path) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function upsertMeta(attribute, value, content) {
  let element = document.head.querySelector(`meta[${attribute}="${value}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertLink(rel, href, extra = {}) {
  const hreflangSelector = extra.hreflang ? `[hreflang="${extra.hreflang}"]` : "";
  let element = document.head.querySelector(`link[rel="${rel}"]${hreflangSelector}`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    if (extra.hreflang) element.setAttribute("hreflang", extra.hreflang);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
  Object.entries(extra).forEach(([key, val]) => {
    if (key !== "hreflang") element.setAttribute(key, val);
  });
}

function videoIdFromEmbed(url) {
  return url?.match(/embed\/([^?]+)/)?.[1];
}

function metaDescription(lang, key) {
  return byLang(lang, {
    es: {
      home: "Productora audiovisual en Barcelona para documentales, televisión, vídeo corporativo, eventos, publicidad, fotografía y postproducción.",
      servicios: "Servicios de producción audiovisual en Barcelona: documentales, televisión, vídeo corporativo, eventos, fotografía, redes, publicidad y postproducción.",
      portfolio: "Portfolio audiovisual de LAPRODU FILMS: documentales, reportajes de televisión, vídeos corporativos, eventos, publicidad y proyectos sociales.",
      metodo: "Método de producción audiovisual de LAPRODU FILMS: brief, tratamiento, preproducción, rodaje, postproducción y entregables finales.",
      blog: "Blog de producción audiovisual con guías sobre vídeo corporativo, documentales, fotografía, iluminación, audio, eventos, SEO y Google Ads.",
      contacto: "Contacta con LAPRODU FILMS para producir documentales, vídeos corporativos, eventos, publicidad, fotografía o contenido audiovisual en Barcelona.",
      faq: "Preguntas frecuentes sobre producción audiovisual, vídeo corporativo, documentales, eventos, redes sociales, fotografía y postproducción.",
    },
    ca: {
      home: "Productora audiovisual a Barcelona per a documentals, televisió, vídeo corporatiu, esdeveniments, publicitat, fotografia i postproducció.",
      servicios: "Serveis de producció audiovisual a Barcelona: documentals, televisió, vídeo corporatiu, esdeveniments, fotografia, xarxes, publicitat i postproducció.",
      portfolio: "Portfolio audiovisual de LAPRODU FILMS: documentals, reportatges de televisió, vídeos corporatius, esdeveniments, publicitat i projectes socials.",
      metodo: "Mètode de producció audiovisual de LAPRODU FILMS: brief, tractament, preproducció, rodatge, postproducció i lliuraments finals.",
      blog: "Blog de producció audiovisual amb guies sobre vídeo corporatiu, documentals, fotografia, il·luminació, àudio, esdeveniments, SEO i Google Ads.",
      contacto: "Contacta amb LAPRODU FILMS per produir documentals, vídeos corporatius, esdeveniments, publicitat, fotografia o contingut audiovisual a Barcelona.",
      faq: "Preguntes freqüents sobre producció audiovisual, vídeo corporatiu, documentals, esdeveniments, xarxes socials, fotografia i postproducció.",
    },
    en: {
      home: "Audiovisual production company in Barcelona for documentaries, television, corporate video, events, advertising, photography and postproduction.",
      servicios: "Audiovisual production services in Barcelona: documentaries, television, corporate video, events, photography, social media, advertising and postproduction.",
      portfolio: "LAPRODU FILMS audiovisual portfolio: documentaries, television reports, corporate videos, events, advertising and social impact projects.",
      metodo: "LAPRODU FILMS audiovisual production method: brief, treatment, preproduction, shoot, postproduction and final deliverables.",
      blog: "Production blog with practical guides on corporate video, documentaries, photography, lighting, audio, events, SEO and Google Ads.",
      contacto: "Contact LAPRODU FILMS to produce documentaries, corporate videos, events, advertising, photography or audiovisual content in Barcelona.",
      faq: "Frequently asked questions about audiovisual production, corporate video, documentaries, events, social media, photography and postproduction.",
    },
  })[key];
}

function baseSchema(lang) {
  const description = metaDescription(lang, "home");
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": BUSINESS_ID,
    name: "LAPRODU FILMS",
    alternateName: "La Produ Films",
    description,
    url: SITE_URL,
    logo: absoluteUrl("/laprodu/img/laprodu-films-logo.png"),
    image: absoluteUrl("/laprodu/portada/secundaris-serie-documental-rtve-laprodu-films.png"),
    email: "produccion@laprodufilms.com",
    telephone: "+34722387590",
    priceRange: "€€",
    sameAs: ["https://www.youtube.com/@laprodufilms", "https://www.instagram.com/laprodu_films/"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barcelona",
      addressRegion: "Catalunya",
      addressCountry: "ES",
    },
    areaServed: byLang(lang, { es: "España e internacional", ca: "Espanya i internacional", en: "Spain and international" }),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: byLang(lang, { es: "producción audiovisual", ca: "producció audiovisual", en: "audiovisual production" }),
      email: "produccion@laprodufilms.com",
      telephone: "+34722387590",
      availableLanguage: ["es", "ca", "en"],
    },
    knowsAbout: byLang(lang, {
      es: ["producción audiovisual", "productora audiovisual Barcelona", "vídeo corporativo", "documentales", "reportajes de televisión", "fotografía corporativa", "postproducción", "eventos", "publicidad audiovisual"],
      ca: ["producció audiovisual", "productora audiovisual Barcelona", "vídeo corporatiu", "documentals", "reportatges de televisió", "fotografia corporativa", "postproducció", "esdeveniments", "publicitat audiovisual"],
      en: ["audiovisual production", "audiovisual production company Barcelona", "corporate video", "documentaries", "television reports", "corporate photography", "postproduction", "events", "video advertising"],
    }),
    makesOffer: [
      "Documentales",
      "Televisión",
      "Vídeos corporativos",
      "Eventos",
      "Fotografía",
      "Redes sociales",
      "Publicidad",
      "Postproducción",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        provider: { "@id": BUSINESS_ID },
        areaServed: byLang(lang, { es: "Barcelona, España e internacional", ca: "Barcelona, Espanya i internacional", en: "Barcelona, Spain and international" }),
      },
    })),
  };
}

function routeContext(route) {
  const lang = route.lang;
  const t = copy[lang];
  const serviceItems = services[lang];
  const projectItems = projects[lang];
  const postItems = posts[lang];
  const faqItems = faqs[lang];
  const normalizedSection = route.section || "inicio";
  const slug = route.slug;
  const project = normalizedSection === "portfolio" && slug && slug !== "todos" ? projectItems.find((item) => item.slug === slug) : null;
  const post = normalizedSection === "blog" && slug && slug !== "todos" ? postItems.find((item) => item.slug === slug) : null;
  const legalPage = legalPages[lang][normalizedSection];
  const landingPage = landingPages[lang][normalizedSection];

  return { lang, t, serviceItems, projectItems, postItems, faqItems, normalizedSection, slug, project, post, legalPage, landingPage };
}

function seoForRoute({ lang, section, slug, project, post, landingPage, legalPage }) {
  const t = copy[lang];
  const baseTitle = "LAPRODU FILMS";
  let title = `${baseTitle} | ${t.heroKicker}`;
  let description = metaDescription(lang, "home");
  let image = absoluteUrl("/laprodu/portada/secundaris-serie-documental-rtve-laprodu-films.png");
  let canonicalPath = pathFor(lang, section, slug);
  const jsonLd = [baseSchema(lang)];

  if (section === "servicios") {
    title = `${t.servicesTitle} | ${baseTitle}`;
    description = metaDescription(lang, "servicios");
  } else if (section === "portfolio" && !slug) {
    title = `Portfolio audiovisual | ${baseTitle}`;
    description = metaDescription(lang, "portfolio");
  } else if (section === "portfolio" && project) {
    title = `${project.title} - ${project.type} | ${baseTitle}`;
    description = `${project.note} Cliente: ${project.client}.`;
    image = absoluteUrl(project.image);
    if (project.video) {
      const videoId = videoIdFromEmbed(project.video);
      jsonLd.push({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: `${project.title} - ${project.type}`,
        description,
        thumbnailUrl: [image],
        uploadDate: `${project.year}-01-01T09:00:00+01:00`,
        embedUrl: project.video,
        contentUrl: videoId ? `https://www.youtube.com/watch?v=${videoId}` : project.video,
      });
    }
  } else if (section === "metodo") {
    title = `${t.methodTitle} | ${baseTitle}`;
    description = metaDescription(lang, "metodo");
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: t.methodTitle,
      description,
      itemListElement: byLang(lang, methodSteps).map((step, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: step.name,
        description: step.desc,
      })),
    });
  } else if (section === "blog" && !slug) {
    title = `${t.blogTitle} | ${baseTitle}`;
    description = metaDescription(lang, "blog");
  } else if (section === "blog" && post) {
    title = `${post.title} | ${baseTitle}`;
    description = post.excerpt;
    image = absoluteUrl(post.image);
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${absoluteUrl(canonicalPath)}#blogposting`,
      headline: post.title,
      description: post.excerpt,
      image,
      author: { "@type": "Organization", name: "LAPRODU FILMS" },
      publisher: { "@type": "Organization", name: "LAPRODU FILMS", logo: { "@type": "ImageObject", url: absoluteUrl("/laprodu/img/laprodu-films-logo.png") } },
      datePublished: "2026-01-15",
      mainEntityOfPage: absoluteUrl(canonicalPath),
    });
  } else if (section === "faq") {
    title = `${t.faqTitle} | ${baseTitle}`;
    description = metaDescription(lang, "faq");
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${absoluteUrl(canonicalPath)}#faq`,
      url: absoluteUrl(canonicalPath),
      mainEntity: faqs[lang].map(([name, acceptedAnswer]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
      })),
    });
  } else if (section === "contacto") {
    title = `${t.contactTitle} | ${baseTitle}`;
    description = metaDescription(lang, "contacto");
  } else if (landingPage) {
    const featured = landingPage.featuredProject ? projects[lang].find((item) => item.slug === landingPage.featuredProject) : null;
    const proofVideos = (landingPage.proofVideos || (featured ? [featured.slug] : []))
      .map((projectSlug) => projects[lang].find((item) => item.slug === projectSlug))
      .filter((item) => item?.video);
    title = `${landingPage.title} | LAPRODU FILMS`;
    description = landingPage.intro;
    image = absoluteUrl(featured?.image || landingPage.heroImage || "/laprodu/portada/cedec-casos-exito-video-testimonial-laprodu-films.png");
    canonicalPath = pathFor(lang, section);
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: landingPage.title,
      description: landingPage.intro,
      provider: { "@id": BUSINESS_ID },
      areaServed: byLang(lang, { es: "Barcelona, España e internacional", ca: "Barcelona, Espanya i internacional", en: "Barcelona, Spain and international" }),
      serviceType: landingPage.serviceType || landingPage.title,
      url: absoluteUrl(canonicalPath),
      hasOfferCatalog: landingPage.pricing ? {
        "@type": "OfferCatalog",
        name: landingPage.title,
        itemListElement: landingPage.pricing.map(([name, price, intro]) => ({
          "@type": "Offer",
          name,
          description: intro,
          price: price.replace(/[^\d,.]/g, "").replace(".", "").replace(",", "."),
          priceCurrency: "EUR",
          itemOffered: { "@type": "Service", name },
        })),
      } : landingPage.deliverables ? {
        "@type": "OfferCatalog",
        name: byLang(lang, { es: "Entregables del servicio", ca: "Entregables del servei", en: "Service deliverables" }),
        itemListElement: landingPage.deliverables.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      } : undefined,
    });
    proofVideos.forEach((item) => {
      const videoId = videoIdFromEmbed(item.video);
      jsonLd.push({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: `${item.title} - ${item.type}`,
        description: item.note,
        thumbnailUrl: [absoluteUrl(item.image)],
        uploadDate: `${item.year}-01-01T09:00:00+01:00`,
        embedUrl: item.video,
        contentUrl: videoId ? `https://www.youtube.com/watch?v=${videoId}` : item.video,
      });
    });
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${absoluteUrl(canonicalPath)}#faq`,
      url: absoluteUrl(canonicalPath),
      mainEntity: landingPage.faq.map(([name, acceptedAnswer]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
      })),
    });
  } else if (legalPage) {
    title = `${legalPage.title} | ${baseTitle}`;
    description = legalPage.intro;
  }

  return { title, description, image, canonicalPath, jsonLd };
}

function seoForPath(pathname) {
  const route = routeFromPath(pathname);
  const context = routeContext(route);
  return seoForRoute({
    lang: context.lang,
    section: context.normalizedSection,
    slug: context.slug,
    project: context.project,
    post: context.post,
    landingPage: context.landingPage,
    legalPage: context.legalPage,
  });
}

function useSeo(args) {
  const { lang, section, slug, project, post, landingPage, legalPage } = args;

  useEffect(() => {
    const seo = seoForRoute({ lang, section, slug, project, post, landingPage, legalPage });
    const canonical = absoluteUrl(seo.canonicalPath);
    document.title = seo.title;
    document.documentElement.lang = lang;

    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "robots", "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    upsertMeta("property", "og:type", post ? "article" : "website");
    upsertMeta("property", "og:site_name", "LAPRODU FILMS");
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", seo.image);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", seo.image);
    upsertLink("canonical", canonical);

    LANGS.forEach((locale) => {
      upsertLink("alternate", absoluteUrl(pathFor(locale, section, slug)), { hreflang: locale });
    });
    upsertLink("alternate", absoluteUrl(pathFor(DEFAULT_LANG, section, slug)), { hreflang: "x-default" });

    document.head.querySelectorAll("script[data-laprodu-schema]").forEach((node) => node.remove());
    seo.jsonLd.forEach((schema, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.laproduSchema = `${index}`;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [lang, section, slug, project, post, landingPage, legalPage]);
}

function LegalPage({ page, lang }) {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <article className="mx-auto max-w-5xl">
        <a href={pathFor(lang)} className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#111111]">
          <ArrowIcon className="h-4 w-4 rotate-180" />
          {byLang(lang, { es: "Volver al inicio", ca: "Tornar a l'inici", en: "Back home" })}
        </a>
        <div data-reveal>
          <SectionLabel>{page.label}</SectionLabel>
          <h1 className="font-editorial mt-5 text-5xl leading-[0.96] tracking-[-0.04em] text-[#111111] md:text-7xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#787774]">{page.intro}</p>
        </div>
        <div className="mt-12 border-t border-[#EAEAEA] bg-white">
          {page.sections.map(([heading, body], index) => (
            <section key={heading} data-reveal style={{ "--index": index }} className="border-b border-[#EAEAEA] p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#111111]">{heading}</h2>
              <p className="mt-4 text-base leading-7 text-[#787774]">{body}</p>
            </section>
          ))}
        </div>
      </article>
    </section>
  );
}

function NotFoundPage({ lang }) {
  return (
    <section className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-3xl">
        <SectionLabel>404</SectionLabel>
        <h1 className="font-editorial mt-5 text-6xl leading-[0.95] tracking-[-0.04em] text-[#111111] md:text-8xl">{byLang(lang, { es: "Página no encontrada", ca: "Pàgina no trobada", en: "Page not found" })}</h1>
        <a href={pathFor(lang)} className="mt-10 inline-flex border border-[#111111] bg-[#111111] px-5 py-3 text-sm font-semibold text-white">
          {byLang(lang, { es: "Volver al inicio", ca: "Tornar a l'inici", en: "Back home" })}
        </a>
      </div>
    </section>
  );
}

export default function LaProduFilmsEditorial({ initialRoute = null }) {
  const route = useRoute(initialRoute);
  const {
    lang,
    t,
    serviceItems,
    projectItems,
    postItems,
    faqItems,
    normalizedSection,
    slug,
    project,
    post,
    legalPage,
    landingPage,
  } = routeContext(route);
  const setLang = () => {};

  useReveal(route, lang);

  useEffect(() => {
    window.localStorage.setItem("laprodu-lang", lang);
  }, [lang]);

  useSeo({ lang, section: normalizedSection, slug, project, post, landingPage, legalPage });

  let page = (
    <HomePage
      lang={lang}
      t={t}
      serviceItems={serviceItems}
      projectItems={projectItems}
      postItems={postItems}
      faqItems={faqItems}
    />
  );

  if (normalizedSection === "portfolio" && (!slug || slug === "todos")) {
    page = <PortfolioListPage t={t} lang={lang} projectItems={projectItems} />;
  } else if (normalizedSection === "portfolio" && slug) {
    page = project ? <ProjectDetailPage project={project} lang={lang} projectItems={projectItems} /> : <NotFoundPage lang={lang} />;
  } else if (normalizedSection === "blog" && (!slug || slug === "todos")) {
    page = <BlogListPage t={t} lang={lang} postItems={postItems} />;
  } else if (normalizedSection === "blog" && slug) {
    page = post ? <BlogDetailPage post={post} lang={lang} postItems={postItems} /> : <NotFoundPage lang={lang} />;
  } else if (landingPage) {
    page = <SuccessCasesLandingPage page={landingPage} lang={lang} projectItems={projectItems} t={t} />;
  } else if (legalPage) {
    page = <LegalPage page={legalPage} lang={lang} />;
  }

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (!slug && sectionRoutes.includes(normalizedSection) && !["portfolio", "blog"].includes(normalizedSection)) {
        document.getElementById(normalizedSection)?.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
      window.scrollTo({ top: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [normalizedSection, slug, lang]);

  return (
    <AppShell lang={lang} setLang={setLang} t={t} route={route} activeSection={normalizedSection}>
      {page}
    </AppShell>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { absoluteUrl, routeContext, routeFromPath, seoForPath, seoForRoute };
