import { Schema, model } from 'mongoose';
import { TOperatingSystem } from './operatingSystem.interface';

const operatingSystemSchema = new Schema<TOperatingSystem>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const OperatingSystem = model<TOperatingSystem>(
  'operatingSystem',
  operatingSystemSchema,
);
export default OperatingSystem;
