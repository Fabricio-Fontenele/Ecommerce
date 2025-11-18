import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { removeProductFromCart } from "@/actions/removeCartProduct";

import { getUseCartQueryKey } from "../queries/useCart";

export const getRemoveProductFromCartMutationKey = (cartItemId: string) =>
  ["removeProductFromCart", cartItemId] as const;

export const useRemoveProductFromCart = (cartItemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getRemoveProductFromCartMutationKey(cartItemId),
    mutationFn: () => removeProductFromCart({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey });
      toast.success("Produto removido 🗑️", {
        description: "O item foi removido da sua sacola",
        duration: 3000,
      });
    },
    onError: () => {
      toast.error("Não foi possível remover o produto 😕", {
        description: "Tente novamente em alguns instantes",
        duration: 5000,
      });
    },
  });
};
