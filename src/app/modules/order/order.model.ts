import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    buyer_name: {
      type: String,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalCost: { type: Number, required: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    soldAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Order = model<TOrder>('order', orderSchema);
export default Order;
