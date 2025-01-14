import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import CategoryService from './category.service';

// create category
const createCategory = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const result = await CategoryService.createCategory(req.body, userId!);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Category created successfully.',
    data: result,
  });
});

// get all category
const getAllCategory = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await CategoryService.getAllCategory(query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Categories retrieved successfully.',
    meta: result.meta,
    data: result.result,
  });
});
const getSingleCategory = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CategoryService.getSingleCategory(id!);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Category retrieved successfully.',
    data: result,
  });
});

// delete single  category
const deleteSingleCategory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await CategoryService.deleteSingleCategory(id);
  sendResponse(res, {
    success: true,
    message: 'Category deleted successfully.',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// delete many category
const deleteManyCategories = catchAsync(async (req, res) => {
  const ids = req.body.ids;
  const result = await CategoryService.deleteManyCategories(ids);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Categories deleted successfully.',
    data: result,
  });
});
const CategoryController = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  deleteManyCategories,
  deleteSingleCategory,
};

export default CategoryController;
