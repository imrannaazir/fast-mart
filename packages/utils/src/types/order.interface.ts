export type TOrderStatus = "PLACED" | "PROCESSING" | "SHIPPING" | "DELIVERED";
export type TPaymentStatus = "PAID" | "UNPAID";
export type TPaymentType = "NET_BANKING" | "CARD" | "COD";

export type TOrder = {
  _id?: string;
  userId?: string;
  paymentTransactionId?: string;
  addressId?: string;
  totalAmount?: number; // total price of items
  discountAmount?: number; // discount of all items
  grossAmount?: number; // total - discount
  shippingAmount?: number; // shipping amount
  netAmount?: number; // gross + shipping amount
  status: TOrderStatus;
  paymentStatus: TPaymentStatus;
  paymentType: TPaymentType;
  orderShippedAt?: Date;
  orderDeliveredAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TOrderItem = {
  _id?: string;
  orderId?: string;
  productId?: string;
  optionId?: string;
  price: number;
  quantity: number;
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TPlaceOrderInput = {
  cartItemsId: string[];
  addressId: string;
  paymentType: TPaymentType;
};
