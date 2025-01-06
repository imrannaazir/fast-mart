import { OrderStatus, PaymentStatus, PaymentType } from '@repo/utils/constants';
import { TOrder, TOrderItem } from '@repo/utils/types';
import { model, Schema } from 'mongoose';

const orderSchema = new Schema<Omit<TOrder, '_id' | 'createdAt' | 'updatedAt'>>(
  {
    addressId: {
      type: Schema.Types.ObjectId,
      ref: 'address',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    paymentTransactionId: {
      type: Schema.Types.ObjectId,
      ref: 'paymentTransaction',
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: 'PLACED',
    },
    paymentStatus: {
      type: String,
      enum: PaymentStatus,
      default: 'UNPAID',
    },
    paymentType: {
      type: String,
      enum: PaymentType,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    discountAmount: {
      type: Number,
      required: true,
    },
    grossAmount: {
      type: Number,
      required: true,
    },
    shippingAmount: {
      type: Number,
      required: true,
    },
    netAmount: {
      type: Number,
      required: true,
    },
    transaction: {
      type: Schema.Types.ObjectId,
      ref: 'paymentTransaction',
    },
    orderDeliveredAt: {
      type: Date,
    },
    orderShippedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const orderItemSchema = new Schema<
  Omit<TOrderItem, '_id' | 'createdAt' | 'updatedAt'>
>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'order',
      required: true,
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    optionIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'option',
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const Order = model<TOrder>('order', orderSchema);
export const OrderItem = model<TOrderItem>('orderItem', orderItemSchema);
