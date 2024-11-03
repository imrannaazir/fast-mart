import { z } from "zod";
const addressSchema = z.object({
  fullAddress: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  zipCode: z.string(),
  addressType: z.string(),
});

export const addressValidationSchema = z.object({
  body: addressSchema,
});
