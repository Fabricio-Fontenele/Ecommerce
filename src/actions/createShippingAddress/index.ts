"use server";

import { revalidatePath } from "next/cache";

import { getDb } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { getRequiredSession } from "@/lib/authSession";

import {
  CreateShippingAddressSchema,
  createShippingAddressSchema,
} from "./schema";

export const createShippingAddress = async (
  data: CreateShippingAddressSchema,
) => {
  const db = getDb();
  const validatedData = createShippingAddressSchema.parse(data);

  const session = await getRequiredSession();

  const [newAddress] = await db
    .insert(shippingAddressTable)
    .values({
      userId: session.user.id,
      recipientName: validatedData.fullName,
      street: validatedData.address,
      number: validatedData.number,
      complement: validatedData.complement || null,
      city: validatedData.city,
      state: validatedData.state,
      neighborhood: validatedData.neighborhood,
      zipCode: validatedData.zipCode,
      country: "Brasil",
      phone: validatedData.phone,
      email: validatedData.email,
      cpfOrCnpj: validatedData.cpf,
    })
    .returning();

  revalidatePath("/cart/identification");

  return {
    success: true,
    data: newAddress,
  };
};
