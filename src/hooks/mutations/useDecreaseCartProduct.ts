import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { decreaseCartProductQuantity } from "@/actions/decreaseCartProductQuantity";

import { getUseCartQueryKey } from "../queries/useCart";

export const getDecreaseCartProductMutationKey = (cartItemId: string) =>
  ["decreaseCartProductQuantity", cartItemId] as const;

export const useDecreaseCartProduct = (cartItemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getDecreaseCartProductMutationKey(cartItemId),
    mutationFn: () => decreaseCartProductQuantity({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey });
    },
    onError: () => {
      toast.error("Não foi possível atualizar a quantidade 😕", {
        description: "Tente novamente em alguns instantes",
        duration: 5000,
      });
    },
  });
};
