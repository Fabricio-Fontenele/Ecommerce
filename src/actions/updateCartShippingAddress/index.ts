"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  UpdateCartShippingAddressSchema,
  updateCartShippingAddressSchema,
} from "./schema";

export const updateCartShippingAddress = async (
  data: UpdateCartShippingAddressSchema,
) => {
  updateCartShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Verificar se o endereço de entrega existe e pertence ao usuário
  const shippingAddress = await db.query.shippingAddressTable.findFirst({
    where: (address, { eq, and }) =>
      and(
        eq(address.id, data.shippingAddressId),
        eq(address.userId, session.user.id),
      ),
  });

  if (!shippingAddress) {
    throw new Error("Shipping address not found");
  }

  // Buscar o carrinho do usuário
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  // Atualizar o carrinho com o endereço de entrega
  await db
    .update(cartTable)
    .set({
      shippingAddressId: data.shippingAddressId,
    })
    .where(eq(cartTable.id, cart.id));

  return { success: true };
};
