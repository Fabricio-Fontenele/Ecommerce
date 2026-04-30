"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { ACTION_ERROR_MESSAGES } from "@/lib/actionErrors";
import { getRequiredSession } from "@/lib/authSession";
import { getOrCreateCart } from "@/lib/cart";

import {
  UpdateCartShippingAddressSchema,
  updateCartShippingAddressSchema,
} from "./schema";

export const updateCartShippingAddress = async (
  data: UpdateCartShippingAddressSchema,
) => {
  updateCartShippingAddressSchema.parse(data);

  const session = await getRequiredSession();

  // Verificar se o endereço de entrega existe e pertence ao usuário
  const shippingAddress = await db.query.shippingAddressTable.findFirst({
    where: (address, { eq, and }) =>
      and(
        eq(address.id, data.shippingAddressId),
        eq(address.userId, session.user.id),
      ),
  });

  if (!shippingAddress) {
    throw new Error(ACTION_ERROR_MESSAGES.shippingAddressRequired);
  }

  // Buscar o carrinho do usuário
  const cart = await getOrCreateCart(session.user.id);

  // Atualizar o carrinho com o endereço de entrega
  await db
    .update(cartTable)
    .set({
      shippingAddressId: data.shippingAddressId,
    })
    .where(eq(cartTable.id, cart.id));

  return { success: true };
};
