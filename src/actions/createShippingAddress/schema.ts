import { z } from "zod";

export const createShippingAddressSchema = z.object({
  email: z.email("Email inválido"),
  fullName: z.string().min(2, "Nome completo é obrigatório"),
  cpf: z
    .string()
    .min(11, "CPF deve ter 11 dígitos")
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF deve estar no formato XXX.XXX.XXX-XX",
    ),
  phone: z
    .string()
    .min(10, "Celular é obrigatório")
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "Celular deve estar no formato (XX) XXXXX-XXXX",
    ),
  zipCode: z
    .string()
    .min(8, "CEP é obrigatório")
    .regex(/^\d{5}-\d{3}$/, "CEP deve estar no formato XXXXX-XXX"),
  address: z.string().min(5, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, "Bairro é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
});

export type CreateShippingAddressSchema = z.infer<
  typeof createShippingAddressSchema
>;
