"use server";

import { eq } from "drizzle-orm";

import { getDb } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { getRequiredSession } from "@/lib/authSession";

export const getShippingAddresses = async () => {
  const db = getDb();
  const session = await getRequiredSession();

  const addresses = await db
    .select()
    .from(shippingAddressTable)
    .where(eq(shippingAddressTable.userId, session.user.id))
    .orderBy(shippingAddressTable.createdAt);

  return {
    success: true,
    data: addresses,
  };
};
