import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import z from "zod";

import { getDb } from "@/db";
import { orderTable } from "@/db/schema";
import { ACTION_ERROR_MESSAGES } from "@/lib/actionErrors";
import { env } from "@/lib/env";

const checkoutMetadataSchema = z.object({
  orderId: z.uuid(),
});

export const POST = async (request: Request) => {
  try {
    const db = getDb();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe signature" },
        { status: 400 },
      );
    }

    const text = await request.text();
    const stripe = new Stripe(env.stripeSecretKey());
    const event = stripe.webhooks.constructEvent(
      text,
      signature,
      env.stripeWebhookSecret(),
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = checkoutMetadataSchema.safeParse(session.metadata);

      if (!metadata.success) {
        console.error("Stripe webhook received invalid checkout metadata", {
          sessionId: session.id,
          metadata: session.metadata,
        });
        return NextResponse.json(
          { error: "Missing order metadata" },
          { status: 400 },
        );
      }

      await db.transaction(async (tx) => {
        const order = await tx.query.orderTable.findFirst({
          where: eq(orderTable.id, metadata.data.orderId),
        });

        if (!order) {
          throw new Error(ACTION_ERROR_MESSAGES.orderNotFound);
        }

        if (order.status === "paid") {
          return;
        }

        await tx
          .update(orderTable)
          .set({
            status: "paid",
          })
          .where(eq(orderTable.id, metadata.data.orderId));
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook failed", error);

    return NextResponse.json(
      { error: "Webhook handling failed" },
      { status: 400 },
    );
  }
};
