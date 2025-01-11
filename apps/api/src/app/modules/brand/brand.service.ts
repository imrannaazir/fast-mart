import { TBrand, TDeleteManyReturnType } from '@repo/utils/types';
import { StatusCodes } from 'http-status-codes';
import mongoose, { PipelineStage } from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TMeta } from '../../utils/sendResponse';
import Brand from './brand.model';

const createBrand = async (payload: TBrand, userId: string) => {
  payload.createdBy = userId;
  // create brand
  const { _id, ...restPayload } = payload;
  const whereOption = _id ? { _id } : { _id: new mongoose.Types.ObjectId() };
  const result = await Brand.updateOne(whereOption, restPayload, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  });
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create brand.');
  }

  return result;
};

const getAllBrands = async (
  query: Record<string, unknown>,
): Promise<{ result: TBrand[]; meta: TMeta }> => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || Number(config.data_limit);
  const skip = (page - 1) * limit;

  const sortingCondition: Record<string, 1 | mongoose.Expression.Meta | -1> =
    query.sort
      ? {
          [`${query.sort}`]: query?.order === 'asc' ? 1 : -1,
        }
      : { createdAt: -1 };

  const searchCondition = query?.searchTerm
    ? {
        name: {
          $regex: query.searchTerm,
          $options: 'i',
        },
      }
    : {};

  const brandPipelines: PipelineStage[] = [
    // match pipe line
    {
      $match: searchCondition,
    },

    // lookup pipeline
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'brand',
        as: 'products',
      },
    },

    // look up pipeline for logo
    {
      $lookup: {
        from: 'images',
        localField: 'logo',
        foreignField: '_id',
        as: 'logo',
      },
    },

    // look up pipeline for cover photo
    {
      $lookup: {
        from: 'images',
        localField: 'cover_photo',
        foreignField: '_id',
        as: 'cover_photo',
      },
    },

    // add field pipeline
    {
      $addFields: {
        noOfProducts: { $size: '$products' },
        logo: {
          $arrayElemAt: ['$logo', 0],
        },
        cover_photo: {
          $arrayElemAt: ['$cover_photo', 0],
        },
      },
    },
    //project pipeline
    {
      $project: {
        products: 0,
      },
    },
    {
      $sort: sortingCondition,
    },
    //pagination pipeline
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];

  const result = await Brand.aggregate(brandPipelines);
  const total = result?.length;
  const totalPage = Math.ceil(total / limit);

  const meta: TMeta = {
    page,
    limit,
    total,
    totalPage,
  };

  return { result, meta };
};

const getSingleBrand = async (id: string) => {
  const brand = await Brand.findById(id).populate('logo cover_photo');
  return brand;
};

// delete single brand
const deleteSingleBrand = async (id: string): Promise<TBrand | null> => {
  // check is brand is exist
  const isBrandExist = await Brand.findById(id);

  if (!isBrandExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Brand not founded.');
  }
  const result = await Brand.findByIdAndDelete(id);
  return result;
};

// delete many brands
const deleteManyBrand = async (
  ids: string[],
): Promise<TDeleteManyReturnType> => {
  // check are brands exist
  const notExistingBrands: string[] = [];

  for (const id of ids) {
    const isBrandExist = await Brand.findById(id);
    if (!isBrandExist) {
      notExistingBrands.push(id);
    }
  }

  if (notExistingBrands.length) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Brands not founded by id : ${notExistingBrands.join(',')}`,
    );
  }

  const result = await Brand.deleteMany({ _id: { $in: ids } });
  return result;
};
const BrandService = {
  createBrand,
  getAllBrands,
  deleteManyBrand,
  deleteSingleBrand,
  getSingleBrand,
};
export default BrandService;
