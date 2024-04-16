import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import BrandService from './brand.service';

// create brand
const createBrand = catchAsync(async (req, res) => {
  const result = await BrandService.createBrand(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Created brand successfully.',
    data: result,
  });
});

// get all brands
const getAllBrands = catchAsync(async (req, res) => {
  const result = await BrandService.getAllBrands(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Brands retrieved successfully.',
    data: result.result,
    meta: result.meta,
  });
});
const BrandController = {
  createBrand,
  getAllBrands,
};

export default BrandController;
