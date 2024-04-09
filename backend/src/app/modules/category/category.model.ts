import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';

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

// models
const Category = model<TCategory>('category', categorySchema);
export default Category;
