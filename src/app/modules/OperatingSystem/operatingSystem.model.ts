import { Schema, model } from 'mongoose';
import { TOperatingSystem } from './OperatingSystem.interface';

const operatingSystemSchema = new Schema<TOperatingSystem>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const OperatingSystem = model<TOperatingSystem>(
  'OperatingSystem',
  operatingSystemSchema,
);
export default OperatingSystem;
