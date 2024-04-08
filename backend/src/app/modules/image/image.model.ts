import { Schema, model } from 'mongoose';
import { TImage, TProductImage } from './image.interface';

const imageSchema = new Schema<TImage>(
  {
    file_name: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);
const productImageSchema = new Schema<TProductImage>({
  imageId: {
    type: Schema.Types.ObjectId,
    ref: 'image',
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'product',
  },
});

export const Image = model<TImage>('image', imageSchema);
export const ProductImage = model<TProductImage>(
  'productImage',
  productImageSchema,
);
