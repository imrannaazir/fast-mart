import { TAddress } from '@repo/utils/types';
import { model, Schema } from 'mongoose';

const addressSchema = new Schema<
  Omit<TAddress, '_id' | 'createdAt' | 'updatedAt'>
>(
  {
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    fullAddress: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    addressType: {
      type: String,
      required: true,
    },
    default: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Address = model<TAddress>('address', addressSchema);
export default Address;
