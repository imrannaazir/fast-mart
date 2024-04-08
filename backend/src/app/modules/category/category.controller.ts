import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import CategoryService from './category.service';
import { Types } from 'mongoose';

// create category
const createCategory = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const result = await CategoryService.createCategory(
    req.body,
    userId as Types.ObjectId,
  );

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
    data: result,
  });
});
const CategoryController = {
  createCategory,
  getAllCategory,
};

export default CategoryController;
