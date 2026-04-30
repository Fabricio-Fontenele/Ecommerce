"use client";

import {
  ChevronRightIcon,
  LayoutGridIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  Package2Icon,
  ShieldCheckIcon,
  SparklesIcon,
  UserCircle2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/lib/authClient";
import { getUserInitials } from "@/lib/user";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Cart from "./cart";

const visitorLinks = [
  {
    href: "#produtos",
    title: "Colecao em destaque",
    description: "Ir direto para os itens mais fortes da home.",
    icon: SparklesIcon,
  },
  {
    href: "/authentication",
    title: "Entrar ou criar conta",
    description: "Acompanhe pedidos e finalize compras com menos atrito.",
    icon: UserCircle2Icon,
  },
];

const accountLinks = [
  {
    href: "/myOrders",
    title: "Meus pedidos",
    description: "Acompanhe status, historico e compras concluidas.",
    icon: Package2Icon,
  },
  {
    href: "/cart/identification",
    title: "Continuar checkout",
    description: "Retome seu carrinho e confirme endereco e pagamento.",
    icon: ShieldCheckIcon,
  },
];

const Header = () => {
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name?.trim() || "Usuário";
  const userInitials = getUserInitials(session?.user?.name);

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:p-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Logo.svg"
            alt="Logo"
            width={100}
            height={26.14}
            className="h-auto w-20 sm:w-24 lg:w-28"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant={"outline"}
                size={"icon"}
                className="group relative h-10 w-10 overflow-hidden rounded-full border-stone-300/80 bg-white/75 transition-all duration-300 hover:border-stone-950 hover:bg-stone-50 sm:h-11 sm:w-11"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.16),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <MenuIcon className="relative h-5 w-5 text-stone-700 transition-transform duration-300 group-hover:scale-110 group-hover:text-stone-950 sm:h-5 sm:w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[88vw] border-l-stone-200/80 bg-[linear-gradient(180deg,#fcfaf6_0%,#f6efe7_100%)] p-0 sm:w-[430px]">
              <SheetHeader className="gap-3 border-b border-stone-200/80 px-5 pt-6 pb-5 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-950 text-stone-50">
                    <LayoutGridIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <SheetTitle className="text-xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-2xl">
                      Navegação
                    </SheetTitle>
                    <SheetDescription className="text-sm text-stone-500">
                      Atalhos diretos para compra, conta e acompanhamento.
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>
              <div className="flex h-full flex-col px-5 py-5 sm:px-6">
                {session?.user ? (
                  <>
                    <div className="rounded-[1.8rem] border border-stone-200 bg-white/80 p-4 shadow-[0_20px_60px_-42px_rgba(28,25,23,0.38)] backdrop-blur">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                          <Avatar className="h-13 w-13 flex-shrink-0 rounded-2xl border border-stone-200 bg-stone-100">
                            <AvatarImage
                              src={(session.user.image as string) || undefined}
                              alt={userName}
                            />
                            <AvatarFallback className="rounded-2xl bg-stone-950 text-sm font-semibold tracking-[0.18em] text-stone-50">
                              {userInitials}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-semibold tracking-[0.24em] text-stone-500 uppercase">
                              Conta ativa
                            </p>
                            <h3 className="mt-1 truncate text-base font-semibold tracking-[-0.03em] text-stone-950">
                              {userName}
                            </h3>
                            <span className="mt-1 block truncate text-sm text-stone-500">
                              {session.user.email}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => authClient.signOut()}
                          className="h-10 w-10 rounded-full border-stone-200 bg-white text-stone-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                          <LogOutIcon className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
                          <p className="text-[10px] font-semibold tracking-[0.22em] text-stone-500 uppercase">
                            Status
                          </p>
                          <p className="mt-1 text-sm font-medium text-stone-950">
                            Checkout protegido
                          </p>
                        </div>
                        <div className="rounded-2xl border border-stone-200 bg-stone-950 px-4 py-3 text-stone-50">
                          <p className="text-[10px] font-semibold tracking-[0.22em] text-stone-400 uppercase">
                            Acesso
                          </p>
                          <p className="mt-1 text-sm font-medium">
                            Pedidos e carrinho
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {accountLinks.map((item) => {
                        const Icon = item.icon;

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="group flex items-center justify-between rounded-[1.4rem] border border-stone-200 bg-white/75 px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-300 hover:bg-white"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-stone-950 text-stone-50">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold tracking-[-0.02em] text-stone-950">
                                  {item.title}
                                </p>
                                <p className="mt-1 text-xs leading-5 text-stone-500">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                            <ChevronRightIcon className="h-4 w-4 flex-shrink-0 text-stone-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-stone-700" />
                          </Link>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-[1.8rem] border border-stone-200 bg-white/80 p-5 shadow-[0_20px_60px_-42px_rgba(28,25,23,0.38)] backdrop-blur">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-950 text-stone-50">
                        <SparklesIcon className="h-6 w-6" />
                      </div>
                      <h2 className="mt-5 text-2xl font-semibold tracking-[-0.05em] text-stone-950">
                        Entre para salvar pedidos e acelerar o checkout.
                      </h2>
                      <p className="mt-3 text-sm leading-6 text-stone-500">
                        Seu carrinho continua simples, mas com login o fluxo de
                        compra fica bem mais direto e rastreável.
                      </p>
                      <Button
                        variant={"default"}
                        asChild
                        className="mt-5 h-12 w-full rounded-full bg-stone-950 text-stone-50 hover:bg-stone-800"
                      >
                        <Link href={"/authentication"}>
                          <LogInIcon className="h-4 w-4" />
                          Entrar agora
                        </Link>
                      </Button>
                    </div>

                    <div className="mt-6 space-y-3">
                      {visitorLinks.map((item) => {
                        const Icon = item.icon;

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="group flex items-center justify-between rounded-[1.4rem] border border-stone-200 bg-white/75 px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-300 hover:bg-white"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-stone-950">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold tracking-[-0.02em] text-stone-950">
                                  {item.title}
                                </p>
                                <p className="mt-1 text-xs leading-5 text-stone-500">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                            <ChevronRightIcon className="h-4 w-4 flex-shrink-0 text-stone-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-stone-700" />
                          </Link>
                        );
                      })}
                    </div>
                  </>
                )}

                <div className="mt-auto pt-6">
                  <div className="rounded-[1.6rem] border border-stone-200 bg-stone-950 px-4 py-4 text-stone-50">
                    <p className="text-[10px] font-semibold tracking-[0.24em] text-stone-400 uppercase">
                      Atalho rapido
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold tracking-[-0.02em]">
                          Voltar para a vitrine
                        </p>
                        <p className="mt-1 text-xs text-stone-400">
                          Explore colecao, novidades e destaques sem ruído.
                        </p>
                      </div>
                      <Button
                        asChild
                        size="sm"
                        className="rounded-full bg-stone-50 text-stone-950 hover:bg-amber-200"
                      >
                        <Link href="/">Home</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Cart enabled={Boolean(session?.user)} />
        </div>
      </div>
    </header>
  );
};

export default Header;
