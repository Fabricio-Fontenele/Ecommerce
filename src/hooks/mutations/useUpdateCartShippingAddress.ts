import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCartShippingAddress } from "@/actions/updateCartShippingAddress";
import { UpdateCartShippingAddressSchema } from "@/actions/updateCartShippingAddress/schema";

import { getUseCartQueryKey } from "../queries/useCart";

export const useUpdateCartShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCartShippingAddressSchema) =>
      updateCartShippingAddress(data),
    onSuccess: () => {
      // Invalidar a query do carrinho para refletir a mudança
      queryClient.invalidateQueries({
        queryKey: getUseCartQueryKey,
      });
    },
  });
};

export const getUpdateCartShippingAddressMutationKey = () => [
  "update-cart-shipping-address",
];
