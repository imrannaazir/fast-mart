import { Types } from 'mongoose';
import { TCollection } from './collection.interfaces';
import { Collection } from './collection.models';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import { TMeta } from '../../utils/sendResponse';

// create collection
const createCollection = async (
  payload: TCollection,
  userId: Types.ObjectId,
): Promise<TCollection> => {
  payload.createdBy = userId;
  const result = await Collection.create(payload);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create collection.');
  }

  return result;
};

// get all collections
const getAllCollections = async (
  query: Record<string, unknown>,
): Promise<{ result: TCollection[]; meta: TMeta }> => {
  const collectionModelQuery = new QueryBuilder(
    Collection.find().populate('image icon'),
    query,
  )
    .search(['title'])
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await collectionModelQuery.modelQuery;
  const meta = await collectionModelQuery.countTotal();

  return { result, meta };
};

const CollectionServices = { createCollection, getAllCollections };
export default CollectionServices;
