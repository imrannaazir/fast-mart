import { Schema, model } from 'mongoose';
import { TTag } from './tag.interface';

const tagSchema = new Schema<TTag>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Tag = model<TTag>('Tag', tagSchema);
export default Tag;
