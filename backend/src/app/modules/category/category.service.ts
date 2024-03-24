import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TCategory } from './category.interface';
import Category from './category.model';

// create category
const createCategory = async (payload: TCategory) => {
  // check is already a category by provided name
  const isAlreadyCategoryByName = await Category.findOne({
    name: payload.name,
  });
  if (isAlreadyCategoryByName) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'There is already a category by this name.',
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
const getAllCategory = async () => {
  const result = Category.find({});
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Categories not founded.');
  }

  return result;
};

const CategoryService = {
  createCategory,
  getAllCategory,
};

export default CategoryService;
