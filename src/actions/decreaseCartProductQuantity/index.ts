"use server";

import { eq } from "drizzle-orm";
import z from "zod";

import { getDb } from "@/db";
import { cartItemTable } from "@/db/schema";
import { ACTION_ERROR_MESSAGES } from "@/lib/actionErrors";
import { getRequiredSession } from "@/lib/authSession";

import { decreaseCartProductQuantitySchema } from "./schema";

export const decreaseCartProductQuantity = async (
  data: z.infer<typeof decreaseCartProductQuantitySchema>,
) => {
  decreaseCartProductQuantitySchema.parse(data);
  const db = getDb();
  const session = await getRequiredSession();
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) => eq(cartItem.id, data.cartItemId),
    with: {
      cart: true,
    },
  });
  if (!cartItem) {
    throw new Error(ACTION_ERROR_MESSAGES.cartItemNotFound);
  }
  const cartDoesNotBelongToUser = cartItem.cart.userId !== session.user.id;
  if (cartDoesNotBelongToUser) {
    throw new Error(ACTION_ERROR_MESSAGES.unauthorized);
  }

  if (cartItem.quantity === 1) {
    await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id));
    return;
  }

  await db
    .update(cartItemTable)
    .set({ quantity: cartItem.quantity - 1 })
    .where(eq(cartItemTable.id, cartItem.id));
};
