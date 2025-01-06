import { TPaymentType } from "./order.interface";

export type TPaymentTransaction = {
  _id: string;
  orderId?: string;
  transactionId: string;
  amount: number;
  paymentType: TPaymentType;
  createdAt: string;
  updatedAt: string;
};
