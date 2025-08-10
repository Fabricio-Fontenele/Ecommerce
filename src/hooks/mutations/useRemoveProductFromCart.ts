import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    },
  });
};
