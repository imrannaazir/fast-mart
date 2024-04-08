import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TBrand } from './brand.interface';
import Brand from './brand.model';

const createBrand = async (payload: TBrand): Promise<TBrand> => {
  // create brand
  const result = await Brand.create(payload);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create brand.');
  }

  return result;
};

const getAllBrands = async (): Promise<TBrand[]> => {
  const result = await Brand.find({}).populate('logo cover_photo');

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No brand founded.');
  }

  return result;
};

const BrandService = {
  createBrand,
  getAllBrands,
};
export default BrandService;
