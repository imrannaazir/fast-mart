import { Schema, model } from 'mongoose';
import { TImage, TProductImage } from './image.interface';

// image schema
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

// product image schema
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

// models
export const Image = model<TImage>('image', imageSchema);
export const ProductImage = model<TProductImage>(
  'productImage',
  productImageSchema,
);
