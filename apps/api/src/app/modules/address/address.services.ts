import { TAddress } from '@repo/utils/types';
import Address from './address.model';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

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

// delete address by id
const deleteAddress = async (
  addressId: string,
  userId: string,
): Promise<{ deletedCount: number }> => {
  // check this is user's address
  const isUserAddress = await Address.findOne({
    userId,
    _id: addressId,
  });

  if (!isUserAddress?._id) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are unauthorized.');
  }

  const deletedAddress = await Address.deleteOne({
    _id: addressId,
    userId,
  });

  return { deletedCount: deletedAddress.deletedCount };
};

// make default address
const makeDefaultAddress = async (
  addressId: string,
  userId: string,
): Promise<TAddress | null> => {
  // check this is user's address
  const isUserAddress = await Address.findOne({
    userId,
    _id: addressId,
  });

  if (!isUserAddress?._id) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are unauthorized.');
  }

  // update current default address
  await Address.findOneAndUpdate(
    { userId, default: true },
    {
      default: false,
    },
  );

  const updatedAddress = await Address.findOneAndUpdate(
    {
      userId,
      _id: addressId,
    },
    {
      default: true,
    },
  );
  return updatedAddress;
};

const AddressServices = {
  addAddress,
  getMyAddresses,
  deleteAddress,
  makeDefaultAddress,
};

export default AddressServices;
