import { Schema, model } from 'mongoose';
import { TProductTag, TTag } from './tag.interface';

const tagSchema = new Schema<TTag>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const productTagSchema = new Schema<TProductTag>({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'product',
  },
  tagId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'tag',
  },
});

// models
const Tag = model<TTag>('tag', tagSchema);
export const ProductTag = model<TProductTag>('productTag', productTagSchema);
export default Tag;
