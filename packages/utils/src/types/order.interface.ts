import { TProduct } from "./product.interface";
import { TUser } from "./user.interface";
import { TOption } from "./variant.interfaces";

export type TOrderStatus = "PLACED" | "PROCESSING" | "SHIPPING" | "DELIVERED";
export type TPaymentStatus = "PAID" | "UNPAID";
export type TPaymentType = "NET_BANKING" | "CARD" | "COD";

export type TOrder = {
  _id?: string;
  userId?: string | TUser;
  paymentTransactionId?: string;
  addressId?: string;
  totalAmount?: number; // total price of items
  discountAmount?: number; // discount of all items
  grossAmount?: number; // total - discount
  shippingAmount?: number; // shipping amount
  netAmount?: number; // gross + shipping amount
  status: TOrderStatus;
  orderItems?: TOrderItem[];
  paymentStatus: TPaymentStatus;
  paymentType: TPaymentType;
  orderShippedAt?: Date;
  orderDeliveredAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TOrderPayload = Omit<TOrder, "_id" | "createdAt" | "updatedAt">;

export type TOrderItem = {
  _id?: string;
  orderId?: string;
  productId?: string;
  product?: TProduct;
  options?: TOption[];
  optionIds?: string[];
  price: number;
  quantity: number;
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
};
export type TOrderItemPayload = Omit<TOrderItem, "_id" | "createdAt" | "updatedAt">;

export type TPlaceOrderInput = {
  cartItemIds: string[];
  addressId: string;
  paymentType: TPaymentType;
};
