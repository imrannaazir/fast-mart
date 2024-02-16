import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TBrand } from './brand.interfac';
import Brand from './brand.model';

const createBrand = async (payload: TBrand) => {
  // check if already brand by name
  const isAlreadyBrandExistByName = await Brand.findOne({ name: payload.name });
  if (isAlreadyBrandExistByName) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'There is already a brand by provided name.',
    );
  }

  // create brand
  const result = await Brand.create(payload);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create brand.');
  }

  return result;
};

const BrandService = {
  createBrand,
};
export default BrandService;
