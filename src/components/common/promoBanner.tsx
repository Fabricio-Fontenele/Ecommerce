import Link from "next/link";

import { Button } from "../ui/button";

const PromoBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-[#163329] bg-[#0d1f19] text-emerald-50 shadow-[0_30px_100px_-52px_rgba(6,78,59,0.85)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.2),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12),transparent_24%)]" />
      <div className="absolute inset-y-0 right-[22%] hidden w-px bg-white/10 lg:block" />

      <div className="relative grid gap-8 px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-10">
        <div className="space-y-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200/15 bg-emerald-100/8 px-3 py-1.5 text-[11px] font-semibold tracking-[0.28em] uppercase backdrop-blur">
            Oferta de respiro
          </div>

          <div className="space-y-4">
            <h2 className="max-w-2xl text-3xl leading-none font-semibold tracking-[-0.07em] text-balance sm:text-5xl lg:text-6xl">
              Desconto real em peças que continuam boas depois do hype.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-emerald-100/75 sm:text-base">
              Seleção enxuta com tênis, outerwear e bases limpas. A ideia aqui
              não é encher a tela de sticker, é destacar o que vale entrar no
              carrinho agora.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 backdrop-blur">
              <p className="text-[10px] font-semibold tracking-[0.24em] text-emerald-100/55 uppercase">
                Janela da semana
              </p>
              <div className="mt-2 text-5xl font-semibold tracking-[-0.08em] text-amber-300 sm:text-6xl">
                30%
              </div>
              <p className="mt-2 text-sm leading-6 text-emerald-100/70">
                off em categorias selecionadas com frete liberado nas compras
                acima da faixa promocional.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-amber-300/20 bg-amber-300/10 p-4">
              <p className="text-[10px] font-semibold tracking-[0.24em] text-amber-100/70 uppercase">
                Condição
              </p>
              <p className="mt-3 text-lg font-medium tracking-[-0.04em] text-amber-50">
                Parcelamento leve e estoque curto.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 rounded-full bg-emerald-200 px-7 text-sm font-semibold text-emerald-950 hover:bg-amber-300 sm:h-14 sm:text-base"
              asChild
            >
              <Link href="#produtos">Explorar ofertas</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white/15 bg-white/5 px-7 text-sm text-emerald-50 hover:border-white/30 hover:bg-white/10 sm:h-14 sm:text-base"
              asChild
            >
              <Link href="#novidades">Ver lançamentos</Link>
            </Button>
          </div>
        </div>

        <div className="relative flex items-stretch">
          <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-5 backdrop-blur">
              <p className="text-[10px] font-semibold tracking-[0.24em] text-emerald-100/55 uppercase">
                Código visual
              </p>
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <div className="text-4xl font-semibold tracking-[-0.07em] text-emerald-50">
                    GREEN
                  </div>
                  <div className="text-sm text-emerald-100/60">WEEK</div>
                </div>
                <div className="rounded-full border border-emerald-200/20 px-3 py-1 text-xs text-emerald-100/80">
                  cápsula ativa
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-stone-950/25 p-5">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-emerald-200 p-4" />
                <div className="rounded-2xl bg-amber-300 p-4" />
                <div className="rounded-2xl bg-emerald-900 p-4" />
              </div>
              <p className="mt-4 max-w-xs text-sm leading-6 text-emerald-100/70">
                Uma faixa promocional mais limpa, com contraste forte e sem
                depender de emojis ou efeitos aleatórios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
