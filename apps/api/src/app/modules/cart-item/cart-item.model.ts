import { TCartItem } from '@repo/utils/types';
import { model, Schema } from 'mongoose';

const cartItemSchema = new Schema<TCartItem>({
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
      type: Schema.Types.ObjectId,
      ref: 'option',
    },
  ],
  quantity: {
    type: Number,
    required: true,
  },
});

const CartItem = model<TCartItem>('cartItem', cartItemSchema);
export default CartItem;
