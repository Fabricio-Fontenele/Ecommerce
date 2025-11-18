import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { formatCentsToBRL } from "@/helpers/money";
import { useDecreaseCartProduct } from "@/hooks/mutations/useDecreaseCartProduct";
import { useIncreaseCartProductQuantity } from "@/hooks/mutations/useIncreaseCartProductQuantity";
import { useRemoveProductFromCart } from "@/hooks/mutations/useRemoveProductFromCart";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string;
  ProductVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantId,
  productVariantName,
  productVariantImageUrl,
  ProductVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const removeProductFromCartMutation = useRemoveProductFromCart(id);

  const decreaseCartProductQuantityMutation = useDecreaseCartProduct(id);

  const increaseCartProductQuantityMutation =
    useIncreaseCartProductQuantity(productVariantId);

  const handleDecreaseQuantityClick = () => {
    decreaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade reduzida");
      },
      onError: (error) => {
        toast.error(
          error instanceof Error ? error.message : "Erro ao reduzir quantidade",
        );
      },
    });
  };

  const handleIncreaseQuantityClick = () => {
    increaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade aumentada");
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Erro ao aumentar quantidade",
        );
      },
    });
  };

  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho");
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Erro ao remover produto do carrinho",
        );
      },
    });
  };

  return (
    <div className="flex items-center justify-between gap-3 sm:gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
        <div className="relative h-16 w-16 flex-shrink-0 sm:h-20 sm:w-20">
          <Image
            src={productVariantImageUrl}
            alt={productVariantName}
            fill
            sizes="(max-width: 640px) 64px, 80px"
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1 sm:gap-1.5">
          <p className="truncate text-xs font-medium sm:text-sm">
            {productName}
          </p>
          <p className="text-muted-foreground truncate text-xs">
            {productVariantName}
          </p>
          <div className="flex w-[90px] items-center justify-between rounded-lg border p-1 sm:w-[100px]">
            <Button
              className="h-5 w-5 sm:h-6 sm:w-6"
              variant="ghost"
              size="sm"
              onClick={handleDecreaseQuantityClick}
            >
              <MinusIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </Button>
            <span className="text-xs font-medium">{quantity}</span>
            <Button
              className="h-5 w-5 sm:h-6 sm:w-6"
              variant="ghost"
              size="sm"
              onClick={handleIncreaseQuantityClick}
            >
              <PlusIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-shrink-0 flex-col items-end justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDeleteClick}
          disabled={removeProductFromCartMutation.isPending}
          className="h-8 w-8 sm:h-9 sm:w-9"
        >
          <TrashIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
        <p className="text-xs font-bold whitespace-nowrap sm:text-sm">
          {formatCentsToBRL(ProductVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
