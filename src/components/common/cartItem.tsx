import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/addCartProduct";
import { decreaseCartProductQuantity } from "@/actions/decreaseCartProductQuantity";
import { removeProductFromCart } from "@/actions/removeCartProduct";
import { formatCentsToBRL } from "@/helpers/money";

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
  const queryClient = useQueryClient();

  const removeProductFromCartMutation = useMutation({
    mutationKey: ["removeProductFromCart"],
    mutationFn: () => removeProductFromCart({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const decreaseCartProductQuantityMutation = useMutation({
    mutationKey: ["decreaseCartProductQuantity"],
    mutationFn: () => decreaseCartProductQuantity({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const increaseCartProductQuantityMutation = useMutation({
    mutationKey: ["increaseCartProductQuantity"],
    mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg object-cover"
        />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium">{productName}</p>
          <p className="text-muted-foreground text-xs">{productVariantName}</p>
          <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
            <Button
              className="h-6 w-6"
              variant="ghost"
              size="sm"
              onClick={handleDecreaseQuantityClick}
            >
              <MinusIcon size={12} />
            </Button>
            <span className="text-xs font-medium">{quantity}</span>
            <Button
              className="h-6 w-6"
              variant="ghost"
              size="sm"
              onClick={handleIncreaseQuantityClick}
            >
              <PlusIcon size={12} />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDeleteClick}
          disabled={removeProductFromCartMutation.isPending}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
        <p className="text-sm font-bold">
          {formatCentsToBRL(ProductVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
