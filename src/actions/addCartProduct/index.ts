"use server";

import { sql } from "drizzle-orm";

import { getDb } from "@/db";
import { cartItemTable } from "@/db/schema";
import { ACTION_ERROR_MESSAGES } from "@/lib/actionErrors";
import { getRequiredSession } from "@/lib/authSession";
import { getOrCreateCart } from "@/lib/cart";

import { AddProductToCartSchema, addProductToCartSchema } from "./schema";

export const addProductToCart = async (data: AddProductToCartSchema) => {
  addProductToCartSchema.parse(data);
  const db = getDb();
  const session = await getRequiredSession();
  const productVariant = await db.query.productVariantTable.findFirst({
    where: (productVariant, { eq }) =>
      eq(productVariant.id, data.productVariantId),
  });
  if (!productVariant) {
    throw new Error(ACTION_ERROR_MESSAGES.productVariantNotFound);
  }

  const cart = await getOrCreateCart(session.user.id);

  await db
    .insert(cartItemTable)
    .values({
      cartId: cart.id,
      productVariantId: data.productVariantId,
      quantity: data.quantity,
    })
    .onConflictDoUpdate({
      target: [cartItemTable.cartId, cartItemTable.productVariantId],
      set: {
        quantity: sql`${cartItemTable.quantity} + ${data.quantity}`,
      },
    });
};
