"use server";

import { eq } from "drizzle-orm";
import Stripe from "stripe";

import { db } from "@/db";
import { orderItemTable, orderTable } from "@/db/schema";
import { ACTION_ERROR_MESSAGES } from "@/lib/actionErrors";
import { getRequiredSession } from "@/lib/authSession";
import { env } from "@/lib/env";

import { createCheckoutSessionSchema } from "./schema";

export const createCheckoutSession = async (
  data: createCheckoutSessionSchema,
) => {
  const session = await getRequiredSession();

  const { orderId } = createCheckoutSessionSchema.parse(data);

  const order = await db.query.orderTable.findFirst({
    where: eq(orderTable.id, orderId),
  });
  if (!order) {
    throw new Error(ACTION_ERROR_MESSAGES.orderNotFound);
  }
  if (order.userId !== session.user.id) {
    throw new Error(ACTION_ERROR_MESSAGES.unauthorized);
  }
  if (order.status === "paid") {
    throw new Error(ACTION_ERROR_MESSAGES.orderAlreadyPaid);
  }
  if (order.status === "cancelled") {
    throw new Error(ACTION_ERROR_MESSAGES.orderCancelled);
  }

  const orderItems = await db.query.orderItemTable.findMany({
    where: eq(orderItemTable.orderId, orderId),
    with: {
      productVariant: { with: { product: true } },
    },
  });

  const stripe = new Stripe(env.stripeSecretKey());
  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${env.appUrl()}/checkout/success`,
    cancel_url: `${env.appUrl()}/checkout/cancel`,
    metadata: {
      orderId,
    },
    line_items: orderItems.map((orderItem) => {
      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: `${orderItem.productVariant.product.name} - ${orderItem.productVariant.name}`,
            description: orderItem.productVariant.product.description,
            images: [orderItem.productVariant.imageUrl],
          },
          // Em centavos
          unit_amount: orderItem.priceInCents,
        },
        quantity: orderItem.quantity,
      };
    }),
  });
  return {
    id: checkoutSession.id,
    orderId,
  };
};
