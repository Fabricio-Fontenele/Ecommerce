"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  CreateShippingAddressSchema,
  createShippingAddressSchema,
} from "./schema";

export const createShippingAddress = async (
  data: CreateShippingAddressSchema,
) => {
  // Validar dados com Zod
  const validatedData = createShippingAddressSchema.parse(data);

  // Verificar autenticação
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Usuário não autenticado");
  }

  // Criar endereço no banco de dados
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
      country: "Brasil", // Assumindo Brasil como padrão
      phone: validatedData.phone,
      email: validatedData.email,
      cpfOrCnpj: validatedData.cpf,
    })
    .returning();

  return {
    success: true,
    data: newAddress,
  };
};
