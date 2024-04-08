import { Schema, model } from 'mongoose';
import { TCollection, TProductCollection } from './collection.interfaces';

//  collection schema
const collectionSchema = new Schema<TCollection>(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
    icon: {
      type: Schema.Types.ObjectId,
      ref: 'icon',
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: 'image',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  },
);

// product collection schema
const productCollectionSchema = new Schema<TProductCollection>({
  collectionId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'collection',
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'product',
  },
});

// model
export const Collection = model<TCollection>('collection', collectionSchema);

export const ProductCollection = model<TProductCollection>(
  'ProductCollection',
  productCollectionSchema,
);
