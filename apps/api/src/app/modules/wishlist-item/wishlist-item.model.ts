import { TWishlistItem } from '@repo/utils/types';
import { model, Schema } from 'mongoose';

const wishlistItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'product',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  },
);

const WishlistItem = model<TWishlistItem>('wishlistItem', wishlistItemSchema);
export default WishlistItem;
