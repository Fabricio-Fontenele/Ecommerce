"use client";

import Partners from "./Partners";

const BrandShowcase = () => {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-[linear-gradient(180deg,#fbf7f1_0%,#f4ece2_100%)] px-5 py-6 shadow-[0_22px_60px_-48px_rgba(120,53,15,0.45)] sm:px-8 sm:py-8 lg:px-10 lg:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.12),transparent_28%)]" />

      <div className="relative grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-stone-500 uppercase">
            Marcas parceiras
          </p>

          <div className="space-y-3">
            <h2 className="max-w-sm text-3xl leading-none font-semibold tracking-[-0.06em] text-stone-900 sm:text-4xl">
              Nomes fortes, seleção limpa.
            </h2>
            <p className="max-w-md text-sm leading-6 text-stone-600 sm:text-base">
              A curadoria mistura esporte, rua e casual refinado sem virar uma
              parede poluída de logos.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {Partners.slice(0, 3).map((partner) => (
              <span
                key={partner.title}
                className="rounded-full border border-stone-900/10 bg-white/80 px-3 py-1.5 text-xs font-medium text-stone-700"
              >
                {partner.title}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-stone-200/90 bg-white/80 p-3 backdrop-blur">
          <div className="grid gap-2 sm:grid-cols-2">
            {Partners.map((partner) => (
              <article
                key={partner.title}
                className="flex items-center justify-between rounded-[1.2rem] border border-stone-200 bg-stone-50/85 px-4 py-3 transition-colors duration-200 hover:bg-white"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-stone-900 text-xs font-semibold tracking-[0.2em] text-stone-50">
                    {partner.mark}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold tracking-[-0.03em] text-stone-900">
                      {partner.title}
                    </p>
                    <p className="text-[10px] font-semibold tracking-[0.24em] text-stone-500 uppercase">
                      {partner.origin}
                    </p>
                  </div>
                </div>
                <span className="text-lg text-stone-300">•</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
