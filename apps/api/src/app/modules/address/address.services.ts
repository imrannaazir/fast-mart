import { TAddress } from '@repo/utils/types';
import Address from './address.model';

// add new address
const addAddress = async (
  payload: Omit<TAddress, '_id' | 'createdAt' | 'updatedAt'>,
) => {
  /* 
    1. find default address of user and make false

    */

  await Address.findOneAndUpdate(
    {
      userId: payload.userId,
      default: true,
    },
    {
      default: false,
    },
  );

  const newAddress = await Address.create(payload);

  return newAddress;
};

const AddressServices = {
  addAddress,
};

export default AddressServices;
