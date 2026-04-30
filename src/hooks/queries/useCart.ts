import { useQuery } from "@tanstack/react-query";

import { getCart } from "@/actions/getCart";

export const getUseCartQueryKey = ["cart"] as const;

export const UseCart = (params?: {
  enabled?: boolean;
  initialData?: Awaited<ReturnType<typeof getCart>>;
}) => {
  return useQuery({
    queryKey: getUseCartQueryKey,
    queryFn: getCart,
    enabled: params?.enabled ?? true,
    initialData: params?.initialData,
    staleTime: 30_000,
  });
};
