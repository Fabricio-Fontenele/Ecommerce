import { eq } from "drizzle-orm";

import { getDb } from "@/db";
import { cartTable } from "@/db/schema";

export const getOrCreateCart = async (userId: string) => {
  const db = getDb();
  const existingCart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, userId),
  });

  if (existingCart) {
    return existingCart;
  }

  const [createdCart] = await db
    .insert(cartTable)
    .values({
      userId,
    })
    .onConflictDoNothing({
      target: cartTable.userId,
    })
    .returning();

  if (createdCart) {
    return createdCart;
  }

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, userId),
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  return cart;
};

export const getCartWithItems = async (userId: string) => {
  const db = getDb();
  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, userId),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (cart) {
    return cart;
  }

  const ensuredCart = await getOrCreateCart(userId);

  return {
    ...ensuredCart,
    shippingAddress: null,
    items: [],
  };
};

export const getCartTotalPriceInCents = (
  cart: Awaited<ReturnType<typeof getCartWithItems>>,
) => {
  return cart.items.reduce((total, item) => {
    return total + item.productVariant.priceInCents * item.quantity;
  }, 0);
};
