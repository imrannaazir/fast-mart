import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TBrand } from './brand.interface';
import Brand from './brand.model';
import mongoose, { PipelineStage } from 'mongoose';
import { TMeta } from '../../utils/sendResponse';
import config from '../../config';

const createBrand = async (payload: TBrand): Promise<TBrand> => {
  // create brand
  const result = await Brand.create(payload);
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

const BrandService = {
  createBrand,
  getAllBrands,
};
export default BrandService;
