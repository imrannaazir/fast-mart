import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import BrandService from './brand.service';

// create brand
const createBrand = catchAsync(async (req, res) => {
  const userId = req?.user?._id;
  const result = await BrandService.createBrand(req.body, userId!);

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

// get single brand
const getSingleBrand = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BrandService.getSingleBrand(id!);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Brand retrieved successfully.',
    data: result,
  });
});

// delete single brand
const deleteSingleBrand = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await BrandService.deleteSingleBrand(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Brand deleted successfully.',
    data: result,
  });
});

//delete many brands
const deleteManyBrand = catchAsync(async (req, res) => {
  const ids = req.body.ids;

  const result = await BrandService.deleteManyBrand(ids);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Brands deleted successfully.',
    data: result,
  });
});
const BrandController = {
  createBrand,
  getAllBrands,
  deleteSingleBrand,
  deleteManyBrand,
  getSingleBrand,
};

export default BrandController;
