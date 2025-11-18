import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/addCartProduct";

import { getUseCartQueryKey } from "../queries/useCart";

export const getIncreaseCartProductMutationKey = (productVariantId: string) =>
  ["increaseCartProductQuantity", productVariantId] as const;

export const useIncreaseCartProductQuantity = (productVariantId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getIncreaseCartProductMutationKey(productVariantId),
    mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey });
      toast.success("Produto adicionado ao carrinho!", {
        description: "Continue comprando ou finalize seu pedido",
      });
    },
    onError: (error: Error) => {
      if (
        error.message.includes("authenticated") ||
        error.message.includes("autenticado")
      ) {
        toast.error("Ops! Você precisa estar logado 🔒", {
          description: "Entre na sua conta para adicionar produtos ao carrinho",
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
};
