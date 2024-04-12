import { Types } from 'mongoose';
import { TCollection } from './collection.interfaces';
import { Collection } from './collection.models';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import { TMeta } from '../../utils/sendResponse';
import { Image } from '../image/image.model';
import Icon from '../icon/icon.model';

// create collection
const createCollection = async (
  payload: TCollection,
  userId: Types.ObjectId,
): Promise<TCollection> => {
  // check image id is valid
  if (payload.image) {
    const isImageExist = await Image.findById(payload.image);
    if (!isImageExist) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        `No image founded by id: ${payload.image}`,
      );
    }
  }
  // check icon id is valid
  if (payload.icon) {
    const isIconExist = await Icon.findById(payload.icon);
    if (!isIconExist) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        `No icon founded by id: ${payload.icon}`,
      );
    }
  }

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
