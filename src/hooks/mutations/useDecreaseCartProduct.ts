import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  });
};
