import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';
import { Status } from './product.constant';

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    model: {
      type: String,
      required: true,
      unique: true,
    },
    compatibility: {
      type: String,
    },
    weight: {
      type: Number,
    },
    unit: {
      type: String,
    },
    dimensions: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Status,
      default: 'in-stock',
    },
    image: {
      type: String,
    },
    brand: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'brand',
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'category',
    },
    operatingSystem: {
      type: Schema.Types.ObjectId,
      ref: 'operatingSystem',
    },
    powerSource: {
      type: Schema.Types.ObjectId,
      ref: 'powerSource',
    },
    connectivity: {
      type: Schema.Types.ObjectId,
      ref: 'connectivity',
    },
    features: [
      {
        type: Schema.Types.ObjectId,
        ref: 'feature',
      },
    ],
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'tag',
      },
    ],
  },
  { timestamps: true },
);

const Product = model<TProduct>('product', productSchema);
export default Product;
