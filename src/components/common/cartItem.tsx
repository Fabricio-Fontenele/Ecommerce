import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  ProductVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantName,
  productVariantImageUrl,
  ProductVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-1">
          <p className="text-xs">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </p>
          <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
            <Button className="h-4 w-4" variant="ghost" onClick={() => {}}>
              <MinusIcon size={12} />
            </Button>
            <span className="text-xs font-medium">{quantity}</span>
            <Button className="h-4 w-4" variant="ghost" onClick={() => {}}>
              <PlusIcon size={12} />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-2">
        <Button variant={"outline"} size={"icon"} onClick={() => {}}>
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold">
          {formatCentsToBRL(ProductVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
