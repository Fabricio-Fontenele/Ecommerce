import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { finishOrder } from "@/actions/finishOrder";
import { ACTION_ERROR_MESSAGES, isActionErrorMessage } from "@/lib/actionErrors";

import { getUseCartQueryKey } from "../queries/useCart";

export const getUseFinishOrderMutationKey = () => ["finishOrder"];

export const useFinishOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUseFinishOrderMutationKey(),
    mutationFn: async () => {
      return await finishOrder();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUseCartQueryKey,
      });
      toast.success("Pedido finalizado com sucesso!", {
        description: "Você será redirecionado para o pagamento",
      });
    },
    onError: (error: Error) => {
      if (isActionErrorMessage(error, ACTION_ERROR_MESSAGES.unauthorized)) {
        toast.error("Ops! Você precisa estar logado 🔒", {
          description: "Entre na sua conta para finalizar a compra",
          duration: 5000,
          action: {
            label: "Fazer Login",
            onClick: () => (window.location.href = "/authentication"),
          },
        });
      } else if (
        isActionErrorMessage(error, ACTION_ERROR_MESSAGES.shippingAddressRequired)
      ) {
        toast.error("Falta o endereço de entrega 📍", {
          description: "Selecione ou cadastre um endereço para continuar",
          duration: 5000,
        });
      } else if (isActionErrorMessage(error, ACTION_ERROR_MESSAGES.cartEmpty)) {
        toast.error("Carrinho vazio 🛒", {
          description: "Adicione produtos ao carrinho antes de finalizar",
          duration: 5000,
        });
      } else {
        toast.error("Não foi possível finalizar o pedido 😕", {
          description: error.message || "Tente novamente em alguns instantes",
          duration: 5000,
        });
      }
    },
  });
};
