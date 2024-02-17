import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import CategoryService from './category.service';

// create category
const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.createCategory(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Category created successfully.',
    data: result,
  });
});

const CategoryController = {
  createCategory,
};

export default CategoryController;
