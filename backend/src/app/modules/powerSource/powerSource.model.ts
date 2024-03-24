import { Schema, model } from 'mongoose';
import { TPowerSource } from './powerSource.interface';

const powerSourceSchema = new Schema<TPowerSource>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const PowerSource = model<TPowerSource>('powerSource', powerSourceSchema);
export default PowerSource;
