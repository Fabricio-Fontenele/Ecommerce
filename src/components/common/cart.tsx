"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingBasketIcon } from "lucide-react";
import Image from "next/image";

import { getCart } from "@/actions/getCart";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export const Cart = () => {
  const { data: cart, isLoading: cartIsLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => getCart(),
  });
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
        <div>
          {cartIsLoading && <p>Carregando...</p>}
          {cart?.items.map((item) => (
            <div key={item.id} className="mb-4 flex gap-4">
              <div>
                <Image
                  src={item.productVariant.imageUrl}
                  alt={item.productVariant.product.name}
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <h3 className="font-medium">
                  {item.productVariant.product.name}
                </h3>
                <p>Quantidade: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
