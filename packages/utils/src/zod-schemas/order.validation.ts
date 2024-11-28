import { z } from "zod";
import { PaymentType } from "../constants/order.constants";

export const placeOrderValidation = z.object({
  body: z.object({
    cartItemIds: z.array(z.string()),
    addressId: z.string(),
    paymentType: z.enum(PaymentType as [string, ...string[]]),
  }),
});
