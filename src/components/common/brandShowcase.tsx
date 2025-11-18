"use client";

import Image from "next/image";

import Partners from "./Partners";

const BrandShowcase = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-6 sm:rounded-3xl sm:p-8 dark:from-slate-900 dark:to-slate-800">
      <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200 opacity-20 blur-3xl dark:bg-purple-900" />
      <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-200 opacity-20 blur-3xl dark:bg-blue-900" />

      <div className="relative">
        <div className="mb-6 text-center sm:mb-8">
          <h2 className="mb-2 text-xl font-bold sm:mb-3 sm:text-2xl lg:text-3xl">
            Marcas{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Parceiras
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xs sm:text-sm">
            Trabalhamos com as melhores marcas do mercado para oferecer
            qualidade e estilo
          </p>
        </div>

        {/* Mobile: Scroll horizontal */}
        <div className="flex gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden">
          {Partners.map((partner) => (
            <div key={partner.title} className="group shrink-0">
              <div className="relative h-20 w-20 rounded-xl border border-slate-200 bg-white p-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 dark:border-slate-700 dark:bg-slate-800">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/0 to-blue-500/0 transition-all duration-300 group-hover:from-purple-500/10 group-hover:to-blue-500/10" />

                <div className="relative flex h-full w-full items-center justify-center">
                  <Image
                    src={partner.imageUrl}
                    alt={partner.title}
                    width={60}
                    height={60}
                    className="h-full w-full object-contain opacity-70 grayscale filter transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid compacto */}
        <div className="hidden gap-4 sm:grid sm:grid-cols-7 lg:gap-6">
          {Partners.map((partner) => (
            <div key={partner.title} className="group">
              <div className="relative aspect-square rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 dark:border-slate-700 dark:bg-slate-800">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/0 to-blue-500/0 transition-all duration-300 group-hover:from-purple-500/10 group-hover:to-blue-500/10" />

                <div className="relative flex h-full w-full items-center justify-center">
                  <Image
                    src={partner.imageUrl}
                    alt={partner.title}
                    width={60}
                    height={60}
                    className="h-full w-full object-contain opacity-70 grayscale filter transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center sm:mt-8">
          <p className="text-xs text-slate-600 sm:text-sm dark:text-slate-400">
            Parceria com as melhores marcas do mercado
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandShowcase;
