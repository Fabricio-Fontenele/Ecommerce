"use server";

import { getRequiredSession } from "@/lib/authSession";
import { getCartTotalPriceInCents, getCartWithItems } from "@/lib/cart";

export const getCart = async () => {
  const session = await getRequiredSession();

  const cart = await getCartWithItems(session.user.id);

  return {
    ...cart,
    totalPriceInCents: getCartTotalPriceInCents(cart),
  };
};
