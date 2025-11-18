"use client";

import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/lib/authClient";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Cart from "./cart";

const Header = () => {
  const { data: session } = authClient.useSession();
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
                className="group relative h-10 w-10 overflow-hidden border-2 transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 sm:h-11 sm:w-11"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 transition-all duration-300 group-hover:from-purple-500/10 group-hover:to-blue-500/10" />
                <MenuIcon className="relative h-5 w-5 transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[85vw] sm:w-[400px]">
              <SheetHeader className="border-b pb-4">
                <SheetTitle className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {session?.user ? (
                  <>
                    <div className="rounded-2xl border-2 border-purple-500/20 bg-gradient-to-br from-purple-50 to-blue-50 p-4 dark:from-purple-950/20 dark:to-blue-950/20">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                          <Avatar className="h-12 w-12 flex-shrink-0 border-2 border-purple-500/30 sm:h-14 sm:w-14">
                            <AvatarImage
                              src={(session.user.image as string) || undefined}
                              alt={session.user.name || "User Avatar"}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-sm font-semibold text-white sm:text-base">
                              {session.user.name.split(" ")[0][0]}
                              {session.user.name.split(" ")[1]?.[0] || ""}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0 flex-1">
                            <h3 className="truncate text-sm font-bold sm:text-base">
                              {session.user.name}
                            </h3>
                            <span className="text-muted-foreground block truncate text-xs sm:text-sm">
                              {session.user.email}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => authClient.signOut()}
                          className="group h-9 w-9 flex-shrink-0 border-2 transition-all duration-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600 sm:h-10 sm:w-10 dark:hover:bg-red-950/20"
                        >
                          <LogOutIcon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="mb-3 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                        Navegação
                      </h3>
                      <Link href="/myOrders">
                        <Button
                          variant="ghost"
                          className="group w-full justify-start gap-3 rounded-xl border-2 border-transparent text-sm transition-all duration-300 hover:border-purple-500/20 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 sm:text-base dark:hover:from-purple-950/20 dark:hover:to-blue-950/20"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white transition-transform duration-300 group-hover:scale-110">
                            📦
                          </span>
                          Meus Pedidos
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-2xl border-2 border-purple-500/20 bg-gradient-to-br from-purple-50 to-blue-50 p-6 dark:from-purple-950/20 dark:to-blue-950/20">
                      <div className="mb-4 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-3xl shadow-lg">
                          👋
                        </div>
                      </div>
                      <h2 className="mb-2 text-center text-base font-bold sm:text-lg">
                        Olá! Bem-vindo
                      </h2>
                      <p className="text-muted-foreground mb-4 text-center text-xs sm:text-sm">
                        Faça login para acessar seus pedidos e aproveitar
                        benefícios exclusivos
                      </p>
                      <Button
                        variant={"default"}
                        asChild
                        className="w-full gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
                      >
                        <Link href={"/authentication"}>
                          <LogInIcon className="h-4 w-4" />
                          Fazer Login
                        </Link>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <Cart />
        </div>
      </div>
    </header>
  );
};

export default Header;
