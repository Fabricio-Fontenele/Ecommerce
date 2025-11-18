"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import AddToCartButton from "./addToCartButton";
interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, 99));
  };
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold sm:text-base">Quantidade</h3>
        <div className="flex w-28 items-center justify-between rounded-lg border sm:w-32">
          <Button
            size="icon"
            variant="ghost"
            onClick={handleDecrement}
            className="h-9 w-9 sm:h-10 sm:w-10"
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium sm:text-base">{quantity}</span>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleIncrement}
            className="h-9 w-9 sm:h-10 sm:w-10"
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />
        <Button className="w-full rounded-full" size="lg">
          Comprar agora
        </Button>
      </div>
    </div>
  );
};

export default ProductActions;
