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
  const result = await BrandService.getAllBrands();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Brand retrieved successfully.',
    data: result,
  });
});
const BrandController = {
  createBrand,
  getAllBrands,
};

export default BrandController;
