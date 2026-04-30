"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/addCartProduct";
import { Button } from "@/components/ui/button";
import { ACTION_ERROR_MESSAGES, isActionErrorMessage } from "@/lib/actionErrors";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Produto adicionado à sacola!", {
        description: `${quantity} ${quantity === 1 ? "item adicionado" : "itens adicionados"}`,
        action: {
          label: "Ver Sacola",
          onClick: () => {
            // Trigger cart sheet open
            document
              .querySelector("[data-cart-trigger]")
              ?.dispatchEvent(new Event("click", { bubbles: true }));
          },
        },
      });
    },
    onError: (error: Error) => {
      if (isActionErrorMessage(error, ACTION_ERROR_MESSAGES.unauthorized)) {
        toast.error("Ops! Você precisa estar logado 🔒", {
          description: "Entre na sua conta para adicionar produtos à sacola",
          duration: 5000,
          action: {
            label: "Fazer Login",
            onClick: () => (window.location.href = "/authentication"),
          },
        });
      } else {
        toast.error("Não foi possível adicionar o produto 😕", {
          description: error.message || "Tente novamente em alguns instantes",
          duration: 5000,
        });
      }
    },
  });
  return (
    <Button
      className="rounded-full"
      size="lg"
      variant={"outline"}
      disabled={isPending}
      onClick={() => mutate()}
    >
      {isPending && <Loader2 className="animate-spin" />}
      Adicionar à sacola
    </Button>
  );
};

export default AddToCartButton;
