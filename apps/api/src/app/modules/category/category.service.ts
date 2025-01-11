import { TCategory, TDeleteManyReturnType } from '@repo/utils/types';
import { StatusCodes } from 'http-status-codes';
import mongoose, { PipelineStage } from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TMeta } from '../../utils/sendResponse';
import { Collection } from '../collection/collection.models';
import { Image } from '../image/image.model';
import Category from './category.model';

// create category
const createCategory = async (payload: TCategory, userId: string) => {
  // check is collection id valid
  const isCollectionsExist = await Collection.find({
    _id: { $in: payload.collections },
  });

  if (!isCollectionsExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Collections not founded.');
  }

  // check is image id is valid
  if (payload.image) {
    const isImageExist = await Image.findById(payload.image);
    if (!isImageExist) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Image not founded.');
    }
  }
  const { _id, ...restPayload } = payload;
  const whereOption = _id ? { _id } : { _id: new mongoose.Types.ObjectId() };
  // create
  const result = await Category.findOneAndUpdate(whereOption, restPayload, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  });

  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create category.');
  }

  return result;
};

// get all category
const getAllCategory = async (
  query: Record<string, unknown>,
): Promise<{ result: TCategory[]; meta: TMeta }> => {
  // pagination config
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || Number(config.data_limit);
  const skip = (page - 1) * limit;
  // searching condition
  const searchCondition = query.searchTerm
    ? {
        title: {
          $regex: query.searchTerm,
          $options: 'i',
        },
      }
    : {};

  // filtering condition
  const collections = (
    typeof query?.collections === 'string'
      ? [query?.collections]
      : (query?.collections as string[])?.length
        ? query?.collections
        : []
  ) as string[];
  const filterCondition = query.collections
    ? {
        $or: collections?.map((collection) => ({
          collections: new mongoose.Types.ObjectId(collection as string),
        })),
      }
    : {};

  // sorting condition
  const sortingCondition: Record<string, 1 | mongoose.Expression.Meta | -1> =
    query.sort
      ? { [`${query.sort}`]: query.order === 'asc' ? 1 : -1 }
      : {
          createdAt: -1,
        };

  //  category pipelines
  const categoryPipelines: PipelineStage[] = [
    // match pipe line
    {
      $match: {
        $and: [searchCondition, filterCondition],
      },
    },

    // look up pipe line for products
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'categories',
        as: 'products',
      },
    },

    // look up pipe line for image
    {
      $lookup: {
        from: 'images',
        localField: 'image',
        foreignField: '_id',
        as: 'image',
      },
    },
    // look up pipe line for collection
    {
      $lookup: {
        from: 'collections',
        localField: 'collections',
        foreignField: '_id',
        as: 'collections',
      },
    },

    // add field pipeline
    {
      $addFields: {
        noOfProducts: {
          $size: '$products',
        },
        image: {
          $arrayElemAt: ['$image', 0], // image become array take only it's first element
        },
      },
    },

    // sorting pipeline
    {
      $sort: sortingCondition,
    },

    //project pipeline
    {
      $project: {
        products: 0,
      },
    },

    // pagination pipeline
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];

  const result = await Category.aggregate(categoryPipelines);
  const total = result.length;
  const totalPage = Math.ceil(total / limit);

  const meta: TMeta = {
    limit,
    page,
    total,
    totalPage,
  };

  return { meta, result };
};

const getSingleCategory = async (id: string) => {
  const category = await Category.findById(id).populate('image');
  return category;
};

// delete single category
const deleteSingleCategory = async (id: string): Promise<TCategory | null> => {
  // check is category exist
  const isCategoryExist = await Category.findById(id);
  if (!isCategoryExist) {
    throw new AppError(StatusCodes.NOT_FOUND, `Category not founded.`);
  }

  const result = await Category.findByIdAndDelete(id);
  return result;
};

// delete many categories
const deleteManyCategories = async (
  ids: string[],
): Promise<TDeleteManyReturnType> => {
  // check is categories exist
  const notExistingCategoryIds: string[] = [];
  for (const id of ids) {
    const isCategoryExist = await Category.findById(id);
    if (!isCategoryExist) {
      notExistingCategoryIds.push(id);
    }
  }

  if (notExistingCategoryIds.length) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Category not found by id : ${notExistingCategoryIds.join(',')}`,
    );
  }

  const result = await Category.deleteMany({ _id: { $in: ids } });
  return result;
};
const CategoryService = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  deleteSingleCategory,
  deleteManyCategories,
};

export default CategoryService;
