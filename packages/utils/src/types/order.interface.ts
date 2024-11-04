export type TOrderStatus = "PLACED" | "PROCESSING" | "SHIPPING" | "DELIVERED";
export type TPaymentStatus = "PAID" | "UNPAID";
export type TPaymentType = "NET_BANKING" | "CARD" | "COD";

export type TOrder = {
  _id?: string;
  userId?: string;
  totalAmount?: number;
  discountAmount?: number;
  grossAmount?: number;
  shippingAmount?: number;
  netAmount?: number;
  status: TOrderStatus;
  paymentStatus: TPaymentStatus;
  paymentType: TPaymentType;
  paymentTransactionId?: string;
  orderShippedAt?: Date;
  orderDeliveredAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TOrderType = {
  _id?: string;
  orderId?: string;
};
