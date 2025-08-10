"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export const getShippingAddresses = async () => {
  // Verificar autenticação
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Usuário não autenticado");
  }

  // Buscar endereços do usuário no banco de dados
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
