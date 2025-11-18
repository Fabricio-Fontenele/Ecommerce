import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateCartShippingAddress } from "@/actions/updateCartShippingAddress";
import { UpdateCartShippingAddressSchema } from "@/actions/updateCartShippingAddress/schema";

import { getUseCartQueryKey } from "../queries/useCart";

export const useUpdateCartShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCartShippingAddressSchema) =>
      updateCartShippingAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUseCartQueryKey,
      });
    },
    onError: () => {
      toast.error("Não foi possível atualizar o endereço 😕", {
        description: "Tente novamente em alguns instantes",
        duration: 5000,
      });
    },
  });
};

export const getUpdateCartShippingAddressMutationKey = () => [
  "update-cart-shipping-address",
];
