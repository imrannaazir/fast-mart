import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import ProductService from './product.service';

// create product
const createProduct = catchAsync(async (req, res) => {
  const result = await ProductService.createProduct(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Product created successfully.',
    data: result,
  });
});

// get all product
const getAllProduct = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ProductService.getAllProduct(query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All product retrieved successfully.',
    data: result,
  });
});

const ProductController = {
  createProduct,
  getAllProduct,
};

export default ProductController;
