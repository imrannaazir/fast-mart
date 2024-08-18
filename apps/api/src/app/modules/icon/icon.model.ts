import { TTag } from '@repo/utils/types';
import { Schema, model } from 'mongoose';

const iconSchema = new Schema<TTag>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Icon = model<TTag>('icon', iconSchema);
export default Icon;
