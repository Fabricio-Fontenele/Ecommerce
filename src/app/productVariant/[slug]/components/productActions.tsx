"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, MinusIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/addCartProduct";
import { Button } from "@/components/ui/button";

import AddToCartButton from "./addToCartButton";
interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const queryClient = useQueryClient();

  const buyNowMutation = useMutation({
    mutationFn: () => addProductToCart({ productVariantId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Produto adicionado! 🎉", {
        description: "Redirecionando para finalizar a compra...",
        duration: 2000,
      });
      // Redireciona direto para a confirmação do pedido (checkout)
      setTimeout(() => {
        router.push("/cart/confirmation");
      }, 500);
    },
    onError: (error: Error) => {
      if (
        error.message.includes("authenticated") ||
        error.message.includes("autenticado")
      ) {
        toast.error("Ops! Você precisa estar logado 🔒", {
          description: "Entre na sua conta para comprar",
          duration: 5000,
          action: {
            label: "Fazer Login",
            onClick: () => router.push("/authentication"),
          },
        });
      } else {
        toast.error("Não foi possível processar a compra 😕", {
          description: error.message || "Tente novamente em alguns instantes",
          duration: 5000,
        });
      }
    },
  });

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, 99));
  };

  const handleBuyNow = () => {
    buyNowMutation.mutate();
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
        <Button
          className="w-full rounded-full"
          size="lg"
          onClick={handleBuyNow}
          disabled={buyNowMutation.isPending}
        >
          {buyNowMutation.isPending && <Loader2 className="animate-spin" />}
          Comprar agora
        </Button>
      </div>
    </div>
  );
};

export default ProductActions;
