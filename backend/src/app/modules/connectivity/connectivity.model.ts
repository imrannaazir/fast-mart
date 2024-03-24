import { Schema, model } from 'mongoose';
import { TConnectivity } from './connectivity.interface';

const connectivitySchema = new Schema<TConnectivity>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Connectivity = model<TConnectivity>('connectivity', connectivitySchema);
export default Connectivity;
