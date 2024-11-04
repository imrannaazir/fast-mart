import { TCartItem } from '@repo/utils/types';
import { model, Schema } from 'mongoose';

const cartItemSchema = new Schema<TCartItem>(
  {
    product: {
      type: String,
      ref: 'product',
      as: 'product',
      required: true,
    },
    user: {
      type: String,
      ref: 'user',
      required: true,
    },
    options: [
      {
        type: String,
      },
    ],
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const CartItem = model<TCartItem>('cartItem', cartItemSchema);
export default CartItem;
