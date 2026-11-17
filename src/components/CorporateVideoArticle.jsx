export default function CorporateVideoArticle({ page, lang }) {
  const backLabel = { es: "Volver a servicios", ca: "Tornar a serveis", en: "Back to services" }[lang];
  const authorLabel = { es: "Por Laprodu Films", ca: "Per Laprodu Films", en: "By Laprodu Films" }[lang];

  return (
    <article className="px-4 py-14 md:px-8 md:py-20">
      <header className="mx-auto max-w-[900px]">
        <a href={`/${lang}/servicios/`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#6F6B63] transition hover:text-[#24231f]">
          <span aria-hidden="true">←</span> {backLabel}
        </a>
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-[#8C4F3B]">{page.kicker}</p>
        <h1 className="balanced-text font-editorial mt-5 text-4xl leading-[1.05] tracking-[-0.045em] text-[#24231f] md:text-6xl">{page.title}</h1>
        <p className="pretty-text mt-7 text-lg leading-8 text-[#5E5A52] md:text-xl md:leading-9">{page.intro}</p>
        <p className="mt-6 border-b border-[#DED8CE] pb-8 text-sm text-[#787774]">{authorLabel}</p>
      </header>

      <div className="mx-auto max-w-[760px]">
        <nav aria-label={page.contentsLabel} className="my-10 border-l-2 border-[#D8D2C7] pl-6">
          <p className="text-sm font-semibold text-[#24231f]">{page.contentsLabel}</p>
          <ol className="mt-4 grid list-decimal gap-x-8 gap-y-2 pl-5 text-sm leading-6 text-[#6F6B63] sm:grid-cols-2">
            {page.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(event) => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                    event.preventDefault();
                    document.getElementById(section.id)?.scrollIntoView({ behavior: "instant", block: "start" });
                    document.getElementById(`heading-${section.id}`)?.focus({ preventScroll: true });
                  }}
                  className="underline decoration-[#D8D2C7] underline-offset-4 transition hover:text-[#8C4F3B]"
                >{section.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        {page.sections.map((section) => (
          <section key={section.id} id={section.id} className="mt-12 scroll-mt-28" aria-labelledby={`heading-${section.id}`}>
            <h2 id={`heading-${section.id}`} tabIndex={-1} className="text-2xl font-semibold leading-tight tracking-[-0.025em] text-[#24231f] md:text-3xl">{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="pretty-text mt-5 text-base leading-8 text-[#5E5A52] md:text-lg">{paragraph}</p>
            ))}
            {section.bullets && (
              <ul className="mt-5 list-disc space-y-3 pl-6 text-base leading-8 text-[#5E5A52] marker:text-[#8C4F3B] md:text-lg">
                {section.bullets.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
            {section.steps && (
              <ol className="mt-6 list-decimal space-y-5 pl-6 text-base leading-8 text-[#5E5A52] marker:font-semibold marker:text-[#8C4F3B] md:text-lg">
                {section.steps.map(([title, text]) => (
                  <li key={title} className="pl-1"><strong className="font-semibold text-[#24231f]">{title}.</strong> {text}</li>
                ))}
              </ol>
            )}
            {section.closing && <p className="pretty-text mt-5 text-base leading-8 text-[#5E5A52] md:text-lg">{section.closing}</p>}
          </section>
        ))}

        <aside className="mt-14 border-t border-[#DED8CE] pt-8">
          <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[#24231f]">{page.ctaTitle}</h2>
          <p className="mt-4 text-base leading-7 text-[#5E5A52]">{page.ctaText}</p>
          <a href={`/${lang}/contacto/`} className="mt-5 inline-flex items-center gap-2 font-semibold text-[#8C4F3B] underline underline-offset-4 transition hover:text-[#24231f]">
            {page.cta} <span aria-hidden="true">↗</span>
          </a>
        </aside>
      </div>
    </article>
  );
}
