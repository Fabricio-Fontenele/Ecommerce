"use server";

import { eq } from "drizzle-orm";

import { getDb } from "@/db";
import { orderItemTable, orderTable } from "@/db/schema";
import { ACTION_ERROR_MESSAGES } from "@/lib/actionErrors";
import { getRequiredSession } from "@/lib/authSession";
import { getCartTotalPriceInCents, getCartWithItems } from "@/lib/cart";

export const finishOrder = async () => {
  const db = getDb();
  const session = await getRequiredSession();

  const cart = await getCartWithItems(session.user.id);

  if (cart.items.length === 0) {
    throw new Error(ACTION_ERROR_MESSAGES.cartEmpty);
  }
  if (!cart.shippingAddress) {
    throw new Error(ACTION_ERROR_MESSAGES.shippingAddressRequired);
  }
  const shippingAddress = cart.shippingAddress;
  const existingPendingOrder = await db.query.orderTable.findFirst({
    where: (order, { and }) =>
      and(
        eq(order.userId, session.user.id),
        eq(order.shippingAddressId, shippingAddress.id),
        eq(order.status, "pending"),
      ),
    with: {
      items: true,
    },
    orderBy: (order, { desc }) => [desc(order.createdAt)],
  });

  const totalPriceInCents = getCartTotalPriceInCents(cart);

  if (existingPendingOrder) {
    await db.transaction(async (tx) => {
      await tx
        .delete(orderItemTable)
        .where(eq(orderItemTable.orderId, existingPendingOrder.id));

      await tx
        .update(orderTable)
        .set({
          email: session.user.email,
          zipCode: shippingAddress.zipCode,
          country: shippingAddress.country,
          phone: shippingAddress.phone,
          cpfOrCnpj: shippingAddress.cpfOrCnpj,
          city: shippingAddress.city,
          complement: shippingAddress.complement,
          neighborhood: shippingAddress.neighborhood,
          number: shippingAddress.number,
          recipientName: shippingAddress.recipientName,
          state: shippingAddress.state,
          street: shippingAddress.street,
          totalPriceInCents,
        })
        .where(eq(orderTable.id, existingPendingOrder.id));

      await tx.insert(orderItemTable).values(
        cart.items.map((item) => ({
          orderId: existingPendingOrder.id,
          productVariantId: item.productVariant.id,
          quantity: item.quantity,
          priceInCents: item.productVariant.priceInCents,
        })),
      );
    });

    return { orderId: existingPendingOrder.id };
  }

  const [order] = await db
    .insert(orderTable)
    .values({
      email: session.user.email,
      zipCode: shippingAddress.zipCode,
      country: shippingAddress.country,
      phone: shippingAddress.phone,
      cpfOrCnpj: shippingAddress.cpfOrCnpj,
      city: shippingAddress.city,
      complement: shippingAddress.complement,
      neighborhood: shippingAddress.neighborhood,
      number: shippingAddress.number,
      recipientName: shippingAddress.recipientName,
      state: shippingAddress.state,
      street: shippingAddress.street,
      userId: session.user.id,
      totalPriceInCents,
      shippingAddressId: shippingAddress.id,
    })
    .returning();

  if (!order) {
    throw new Error("Failed to create order");
  }

  await db.insert(orderItemTable).values(
    cart.items.map((item) => ({
      orderId: order.id,
      productVariantId: item.productVariant.id,
      quantity: item.quantity,
      priceInCents: item.productVariant.priceInCents,
    })),
  );

  return { orderId: order.id };
};
