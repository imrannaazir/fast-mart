import { Schema, model } from 'mongoose';
import { Status } from './product.constant';
import { TProduct } from './product.interface';

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
    features: {
      type: Object,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'tag',
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true },
);

const Product = model<TProduct>('product', productSchema);
export default Product;
