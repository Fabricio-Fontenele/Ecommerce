import Link from "next/link";

import { Button } from "../ui/button";

const PromoBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900 via-fuchsia-800 to-pink-900 text-white sm:rounded-3xl">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGg1MHYyMEgzNnptMC0zMGg1MHYyMEgzNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <div className="relative grid grid-cols-1 items-center gap-8 p-8 sm:p-12 md:grid-cols-2 lg:gap-16 lg:p-16">
        {/* Left Content */}
        <div className="space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold backdrop-blur-md sm:text-base">
            <span className="text-xl">⚡</span>
            <span>FLASH SALE</span>
            <span className="text-xl">⚡</span>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h2 className="text-4xl leading-tight font-black sm:text-5xl lg:text-6xl">
              MEGA
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                DESCONTO
              </span>
            </h2>
            <div className="flex items-baseline gap-3">
              <span className="text-6xl font-black text-yellow-300 sm:text-7xl lg:text-8xl">
                50%
              </span>
              <span className="text-2xl font-bold sm:text-3xl">OFF</span>
            </div>
          </div>

          {/* Description */}
          <p className="max-w-md text-base text-white/90 sm:text-lg">
            Renove seu guarda-roupa com as últimas tendências! Descontos
            imperdíveis em roupas, calçados e acessórios.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm sm:p-4">
              <div className="mb-1 text-2xl">🎁</div>
              <div className="text-xs font-semibold sm:text-sm">
                Frete Grátis
              </div>
            </div>
            <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm sm:p-4">
              <div className="mb-1 text-2xl">⏰</div>
              <div className="text-xs font-semibold sm:text-sm">
                Só até meia-noite
              </div>
            </div>
            <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm sm:p-4">
              <div className="mb-1 text-2xl">💳</div>
              <div className="text-xs font-semibold sm:text-sm">
                Parcelamento
              </div>
            </div>
            <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm sm:p-4">
              <div className="mb-1 text-2xl">✨</div>
              <div className="text-xs font-semibold sm:text-sm">
                Peças únicas
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <Button
              size="lg"
              className="group relative overflow-hidden rounded-full bg-white px-10 py-6 text-base font-bold text-purple-900 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-yellow-300/50 sm:text-lg"
              asChild
            >
              <Link href="/">
                <span className="relative z-10">Explorar Ofertas</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Content - Fashion Elements */}
        <div className="relative hidden items-center justify-center md:flex">
          <div className="relative h-80 w-80 lg:h-96 lg:w-96">
            {/* Animated circles */}
            <div className="animate-spin-slow absolute inset-0 rounded-full border-4 border-dashed border-white/20" />
            <div className="animate-spin-reverse absolute inset-8 rounded-full border-4 border-dotted border-pink-300/30" />

            {/* Center badge */}
            <div className="absolute inset-16 flex items-center justify-center rounded-full border-4 border-white/30 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md">
              <div className="text-center">
                <div className="mb-2 text-7xl font-black text-yellow-300 drop-shadow-lg lg:text-8xl">
                  50
                </div>
                <div className="text-2xl font-black lg:text-3xl">% OFF</div>
                <div className="mt-2 text-xs font-semibold text-white/80 sm:text-sm">
                  EM TUDO
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="animate-bounce-slow absolute top-8 -right-4 rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
              <span className="text-4xl">👗</span>
            </div>
            <div className="animation-delay-1000 animate-bounce-slow absolute bottom-16 -left-4 rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
              <span className="text-4xl">👠</span>
            </div>
            <div className="animation-delay-2000 animate-bounce-slow absolute right-8 -bottom-4 rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
              <span className="text-4xl">👜</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute right-0 -bottom-1 left-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
};

export default PromoBanner;
