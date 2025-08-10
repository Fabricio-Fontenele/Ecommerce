import { useQuery } from "@tanstack/react-query";

import { getCart } from "@/actions/getCart";

export const getUseCartQueryKey = ["cart"] as const;

export const UseCart = (params?: {
  initialData?: Awaited<ReturnType<typeof getCart>>;
}) => {
  return useQuery({
    queryKey: getUseCartQueryKey,
    queryFn: () => getCart(),
    initialData: params?.initialData,
  });
};
