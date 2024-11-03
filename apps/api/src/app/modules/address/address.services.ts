import { TAddress } from '@repo/utils/types';
import Address from './address.model';
import QueryBuilder from '../../builder/QueryBuilder';

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

// get users all address
const getMyAddresses = async (userId: string): Promise<TAddress[]> => {
  const addressQueryModel = new QueryBuilder(
    Address.find({
      userId,
    }),
    {},
  ).sort();

  return await addressQueryModel.modelQuery;
};

const AddressServices = {
  addAddress,
  getMyAddresses,
};

export default AddressServices;
