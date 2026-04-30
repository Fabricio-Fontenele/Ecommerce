import Link from "next/link";

import { Button } from "../ui/button";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-stone-900/10 bg-[#171412] text-stone-50 shadow-[0_30px_120px_-48px_rgba(0,0,0,0.8)] sm:rounded-[2.25rem]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-25" />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(16,12,10,0.96)_8%,rgba(16,12,10,0.9)_36%,rgba(16,12,10,0.38)_67%,rgba(16,12,10,0.82)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.3),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.12),transparent_32%)]" />

      <div className="relative grid gap-8 px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[1.25fr_0.75fr] lg:px-10 lg:py-10">
        <div className="flex min-h-[29rem] flex-col justify-between gap-8 sm:min-h-[34rem] lg:min-h-[36rem]">
          <div className="space-y-7">
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] font-semibold tracking-[0.28em] uppercase backdrop-blur">
              Drop 04
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Inverno urbano
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl leading-none font-semibold tracking-[-0.08em] text-balance sm:text-6xl lg:text-[5.4rem]">
                Moda com peso visual, sem perder mobilidade.
              </h1>
              <p className="max-w-xl text-sm leading-7 text-stone-300 sm:text-base lg:text-lg">
                Silhuetas limpas, tênis fortes e peças de sobreposição que
                funcionam no corre da semana inteira. Menos firula, mais
                presença.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 rounded-full bg-stone-50 px-7 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-200 sm:h-14 sm:px-8 sm:text-base"
                asChild
              >
                <Link href="#produtos">Comprar coleção</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/20 bg-white/5 px-7 text-sm text-stone-100 hover:border-white/35 hover:bg-white/10 sm:h-14 sm:px-8 sm:text-base"
                asChild
              >
                <Link href="#novidades">Ver novidades</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.4rem] border border-white/10 bg-white/8 p-4 backdrop-blur">
              <div className="text-2xl font-semibold tracking-[-0.05em] text-amber-300">
                24h
              </div>
              <p className="mt-1 text-xs tracking-[0.2em] text-stone-300 uppercase">
                despacho rápido
              </p>
            </div>
            <div className="rounded-[1.4rem] border border-white/10 bg-white/8 p-4 backdrop-blur">
              <div className="text-2xl font-semibold tracking-[-0.05em] text-stone-50">
                Fit
              </div>
              <p className="mt-1 text-xs tracking-[0.2em] text-stone-300 uppercase">
                peças versáteis
              </p>
            </div>
            <div className="rounded-[1.4rem] bg-gradient-to-br from-amber-300 to-orange-500 p-4 text-stone-950">
              <div className="text-2xl font-semibold tracking-[-0.05em]">
                -30%
              </div>
              <p className="mt-1 text-xs tracking-[0.2em] uppercase">
                seleção da semana
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[20rem] items-end lg:justify-end">
          <div className="relative w-full max-w-[26rem] lg:mr-2">
            <div className="absolute -top-6 right-5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold tracking-[0.24em] text-stone-100 uppercase backdrop-blur">
              Edição limitada
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-3 backdrop-blur">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-stone-900">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.45))]" />
              </div>
            </div>

            <div className="absolute -left-3 bottom-5 rounded-[1.5rem] border border-white/15 bg-stone-950/85 p-4 shadow-2xl backdrop-blur sm:-left-8">
              <p className="text-[10px] font-semibold tracking-[0.26em] text-stone-400 uppercase">
                Styling note
              </p>
              <p className="mt-2 max-w-[12rem] text-sm leading-6 text-stone-100">
                Tons terrosos, camadas secas e tênis limpo para segurar a base.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
