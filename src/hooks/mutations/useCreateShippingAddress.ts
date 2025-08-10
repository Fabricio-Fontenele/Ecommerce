import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createShippingAddress } from "@/actions/createShippingAddress";
import { CreateShippingAddressSchema } from "@/actions/createShippingAddress/schema";

export const useCreateShippingAddress = () => {
  return useMutation({
    mutationFn: (data: CreateShippingAddressSchema) =>
      createShippingAddress(data),
    onSuccess: () => {
      toast.success("Endereço salvo com sucesso!");
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
