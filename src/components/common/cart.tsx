"use client";

import { ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";

import { formatCentsToBRL } from "@/helpers/money";
import { UseCart } from "@/hooks/queries/useCart";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cartItem";

export const Cart = () => {
  const { data: cart } = UseCart();
  const isEmpty = !cart?.items || cart.items.length === 0;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon"}
          className="relative h-9 w-9 sm:h-10 sm:w-10"
        >
          <ShoppingBasketIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          {!isEmpty && (
            <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-medium sm:h-5 sm:w-5 sm:text-xs">
              {cart.items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-[85vw] flex-col sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-lg sm:text-xl">Carrinho</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col">
          {isEmpty ? (
            <div className="text-muted-foreground flex flex-1 flex-col items-center justify-center gap-3 px-4 py-8 sm:gap-4 sm:py-12">
              <ShoppingBasketIcon className="h-10 w-10 opacity-40 sm:h-12 sm:w-12" />
              <span className="text-center text-base font-medium sm:text-lg">
                Seu carrinho está vazio
              </span>
              <span className="text-center text-xs sm:text-sm">
                Que tal explorar nossos produtos?
              </span>
              <Button asChild variant="outline" className="mt-2">
                <Link href="/">Ver produtos</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-hidden py-4">
                <ScrollArea className="h-full">
                  <div className="flex flex-col gap-6 pr-4 sm:gap-8">
                    {cart.items.map((item) => (
                      <CartItem
                        key={item.id}
                        id={item.id}
                        productName={item.productVariant.product.name}
                        productVariantId={item.productVariant.id}
                        productVariantName={item.productVariant.name}
                        productVariantImageUrl={item.productVariant.imageUrl}
                        ProductVariantPriceInCents={
                          item.productVariant.priceInCents
                        }
                        quantity={item.quantity}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <div className="flex flex-col gap-3 border-t pt-4 sm:gap-4">
                <div className="flex items-center justify-between text-xs font-medium sm:text-sm">
                  <p>Subtotal</p>
                  <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-xs font-medium sm:text-sm">
                  <p>Entrega</p>
                  <p className="text-green-600">Grátis</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm font-bold sm:text-base">
                  <p>Total</p>
                  <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
                </div>
                <Button className="mt-2 rounded-full sm:mt-3" size="lg" asChild>
                  <Link href="/cart/identification">Finalizar compra</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
