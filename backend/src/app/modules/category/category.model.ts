import { Schema, model } from 'mongoose';
import { TCategory, TProductCategory } from './category.interface';

// category schema
const categorySchema = new Schema<TCategory>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  { timestamps: true },
);

// product category schema
const productCategorySchema = new Schema<TProductCategory>({
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'category',
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'product',
  },
});

// models
const Category = model<TCategory>('category', categorySchema);
export default Category;

export const ProductCategory = model<TProductCategory>(
  'productCategory',
  productCategorySchema,
);
