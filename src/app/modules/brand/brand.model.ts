import { Schema, model } from 'mongoose';
import { TBrand } from './brand.interfac';

const brandSchema = new Schema<TBrand>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Brand = model<TBrand>('brand', brandSchema);
export default Brand;
