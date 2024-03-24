import { Schema, model } from 'mongoose';
import { TFeatureName } from './featureName.interface';

const featureNameSchema = new Schema<TFeatureName>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const FeatureName = model<TFeatureName>('FeatureName', featureNameSchema);
export default FeatureName;
