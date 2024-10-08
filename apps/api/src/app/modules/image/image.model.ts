import { TImage } from '@repo/utils/types';
import { Schema, model } from 'mongoose';

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
    format: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// models
export const Image = model<TImage>('image', imageSchema);
