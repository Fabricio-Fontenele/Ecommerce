import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    },
  });
};
