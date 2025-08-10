import z, { uuid } from "zod";

export const removeProductFromCartSchema = z.object({
  cartItemId: uuid(),
});
