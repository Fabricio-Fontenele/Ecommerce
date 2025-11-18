import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { finishOrder } from "@/actions/finishOrder";

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
        queryKey: getUseFinishOrderMutationKey(),
      });
      toast.success("Pedido finalizado com sucesso!", {
        description: "Você será redirecionado para o pagamento",
      });
    },
    onError: (error: Error) => {
      if (
        error.message.includes("authenticated") ||
        error.message.includes("autenticado")
      ) {
        toast.error("Ops! Você precisa estar logado 🔒", {
          description: "Entre na sua conta para finalizar a compra",
          duration: 5000,
          action: {
            label: "Fazer Login",
            onClick: () => (window.location.href = "/authentication"),
          },
        });
      } else if (
        error.message.includes("address") ||
        error.message.includes("endereço")
      ) {
        toast.error("Falta o endereço de entrega 📍", {
          description: "Selecione ou cadastre um endereço para continuar",
          duration: 5000,
        });
      } else if (error.message.includes("Cart not found")) {
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
