import { ProductStatus, ProductUnit } from '@repo/utils/constants';
import { TProduct } from '@repo/utils/types';
import { Schema, model } from 'mongoose';

const productSchema = new Schema<TProduct>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    compare_price: {
      type: Number,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'brand',
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'category',
      },
    ],
    collections: [
      {
        type: Schema.Types.ObjectId,
        ref: 'collection',
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    media: [
      {
        type: Schema.Types.ObjectId,
        ref: 'image',
      },
    ],
    quantity: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'tag',
      },
    ],
    unit: {
      type: String,
      enum: ProductUnit,
      default: 'g',
    },
    weight: {
      type: Number,
    },
    variants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'productVariantOption',
      },
    ],

    status: {
      type: String,
      enum: Object.values(ProductStatus),
      default: 'DRAFT',
    },
  },
  { timestamps: true },
);

const Product = model<TProduct>('product', productSchema);
export default Product;
