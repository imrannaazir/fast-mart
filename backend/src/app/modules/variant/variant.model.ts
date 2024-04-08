import { Schema, model } from 'mongoose';
import {
  TVariant,
  TOption,
  TProductVariant,
  TProductVariantOption,
} from './variant.interfaces';

// variant schema
const variantSchema = new Schema<TVariant>(
  {
    variant_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// option schema
const optionSchema = new Schema<TOption>({
  option_name: {
    type: String,
    required: true,
  },
  variantId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'variant',
  },
});

// product variant schema
const productVariantSchema = new Schema<TProductVariant>({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'product',
  },
  productVariantOptions: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'productVariantOptions',
    },
  ],
});

// product variant option schema
const productVariantOptionSchema = new Schema<TProductVariantOption>({
  variantId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'variant',
  },
  options: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'option',
    },
  ],
});

// models
export const Variant = model<TVariant>('variant', variantSchema);
export const Option = model<TOption>('option', optionSchema);
export const ProductVariant = model<TProductVariant>(
  'productVariant',
  productVariantSchema,
);
export const ProductVariantOption = model<TProductVariantOption>(
  'productVariantOption',
  productVariantOptionSchema,
);
