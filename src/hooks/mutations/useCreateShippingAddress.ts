import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createShippingAddress } from "@/actions/createShippingAddress";
import { CreateShippingAddressSchema } from "@/actions/createShippingAddress/schema";

import { getShippingAddressesKey } from "../queries/useShippingAddresses";

export const getCreateShippingAddressKey = () => ["createShippingAddress"];

export const useCreateShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateShippingAddressSchema) =>
      createShippingAddress(data),
    onSuccess: (result) => {
      toast.success("Endereço salvo com sucesso!");
      // Invalidar a query de endereços para recarregar a lista
      queryClient.invalidateQueries({ queryKey: getShippingAddressesKey() });
      return result; // Retornar o resultado para uso no componente
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao salvar endereço. Tente novamente.",
      );
    },
  });
};
