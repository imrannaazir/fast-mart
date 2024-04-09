import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TCategory } from './category.interface';
import Category from './category.model';
import { Types } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { TMeta } from '../../utils/sendResponse';

// create category
const createCategory = async (
  payload: TCategory,
  userId: Types.ObjectId,
): Promise<TCategory> => {
  // check is already a category by provided name
  payload.createdBy = userId;
  const isAlreadyCategoryByName = await Category.findOne({
    title: payload.title,
  });

  if (isAlreadyCategoryByName) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'There is already a category by this title.',
    );
  }

  // create
  const result = await Category.create(payload);

  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create category.');
  }

  return result;
};

// get all category
const getAllCategory = async (
  query: Record<string, unknown>,
): Promise<{ result: TCategory[]; meta: TMeta }> => {
  const categoryQueryModel = new QueryBuilder(Category.find(), query)
    .search(['title'])
    .filter()
    .sort()
    .fields()
    .paginate();
  const result = await categoryQueryModel.modelQuery;
  const meta = await categoryQueryModel.countTotal();

  return { result, meta };
};

const CategoryService = {
  createCategory,
  getAllCategory,
};

export default CategoryService;
