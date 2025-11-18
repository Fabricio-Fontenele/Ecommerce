import Link from "next/link";

import { Button } from "../ui/button";

const HeroBanner = () => {
  return (
    <div className="relative min-h-[400px] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white sm:min-h-[500px] sm:rounded-3xl lg:min-h-[600px]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      <div className="relative flex h-full items-center">
        <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-2xl space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium backdrop-blur-sm sm:text-sm">
              <span className="text-yellow-400">✨</span>
              Coleção Verão 2025
            </div>

            <h1 className="text-4xl leading-tight font-bold sm:text-5xl lg:text-7xl">
              Vista-se com
              <br />
              <span className="animate-pulse bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Estilo
              </span>{" "}
              e{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Atitude
              </span>
            </h1>

            <p className="text-base leading-relaxed text-gray-300 sm:text-lg lg:text-xl">
              Explore as últimas tendências da moda. Peças exclusivas, qualidade
              premium e entrega rápida para todo Brasil.
            </p>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Button
                size="lg"
                className="h-12 rounded-full bg-white px-8 text-base font-semibold text-black shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl sm:h-14 sm:text-lg"
                asChild
              >
                <Link href="#produtos">Explorar Coleção</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-2 border-white/30 bg-white/5 px-8 text-base text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10 sm:h-14 sm:text-lg"
                asChild
              >
                <Link href="#novidades">Novidades</Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 border-t border-white/10 pt-6 sm:gap-8">
              <div className="text-center sm:text-left">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                  Frete Grátis
                </div>
                <div className="text-xs text-gray-400 sm:text-sm">
                  Em todo Brasil
                </div>
              </div>
              <div className="h-12 w-px bg-white/20" />
              <div className="text-center sm:text-left">
                <div className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                  Troca Fácil
                </div>
                <div className="text-xs text-gray-400 sm:text-sm">
                  30 dias garantidos
                </div>
              </div>
              <div className="hidden h-12 w-px bg-white/20 sm:block" />
              <div className="hidden text-center sm:block sm:text-left">
                <div className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                  Cashback
                </div>
                <div className="text-xs text-gray-400 sm:text-sm">
                  Em cada compra
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />

      <div className="absolute top-10 right-10 hidden lg:block">
        <div className="animate-bounce-slow relative h-32 w-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-2xl" />
          <div className="relative rounded-full border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-3xl font-bold">50%</div>
              <div className="text-xs">OFF</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
