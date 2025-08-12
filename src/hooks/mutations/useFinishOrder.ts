import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    },
  });
};
