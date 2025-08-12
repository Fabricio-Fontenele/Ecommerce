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
        <Button variant={"outline"} size={"icon"}>
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col px-5 pb-5">
          {isEmpty ? (
            <div className="text-muted-foreground flex flex-1 flex-col items-center justify-center gap-4 py-12">
              <ShoppingBasketIcon className="h-12 w-12 opacity-40" />
              <span className="text-lg font-medium">
                Seu carrinho está vazio
              </span>
              <span className="text-sm">Que tal explorar nossos produtos?</span>
              <Button asChild variant="outline" className="mt-2">
                <Link href="/">Ver produtos</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex h-full max-h-full flex-col overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="flex h-full flex-col gap-8">
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
              <div className="flex flex-col gap-4">
                <Separator />
                <div className="flex items-center justify-between text-xs font-medium">
                  <p>Subtotal</p>
                  <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-xs font-medium">
                  <p>Entrega</p>
                  <p>Grátis</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-xs font-medium">
                  <p>Total</p>
                  <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
                </div>
                <Button className="mt-5 rounded-full" size="lg" asChild>
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
