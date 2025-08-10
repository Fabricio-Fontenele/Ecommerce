import { useQuery } from "@tanstack/react-query";

import { getShippingAddresses } from "@/actions/getShippingAddresses";
export const getShippingAddressesKey = () => ["shippingAddresses"];

export const useShippingAddresses = () => {
  return useQuery({
    queryKey: getShippingAddressesKey(),
    queryFn: getShippingAddresses,
  });
};
