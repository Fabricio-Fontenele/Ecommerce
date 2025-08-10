import { useQuery } from "@tanstack/react-query";

import { getShippingAddresses } from "@/actions/getShippingAddresses";
import { shippingAddressTable } from "@/db/schema";
export const getShippingAddressesKey = () => ["shippingAddresses"] as const;

export const useShippingAddresses = (
  params: {
    initialData?: (typeof shippingAddressTable.$inferSelect)[];
  } = {},
) => {
  return useQuery({
    queryKey: getShippingAddressesKey(),
    queryFn: async () => {
      const response = await getShippingAddresses();
      return response.data;
    },
    initialData: params?.initialData,
  });
};
