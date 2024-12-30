import { TCollection } from '@repo/utils/types';
import { Schema, model } from 'mongoose';

//  collection schema
const collectionSchema = new Schema<TCollection>(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      text: true,
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
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

// model
export const Collection = model<TCollection>('collection', collectionSchema);
