import { TCartItem } from '@repo/utils/types';
import { model, Schema } from 'mongoose';

const cartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  variantId: {
    type: Schema.Types.ObjectId,
    ref: 'option',
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const CartItem = model<TCartItem>('cartItem', cartItemSchema);
export default CartItem;
