import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import BrandService from './brand.service';

const createBrand = catchAsync(async (req, res) => {
  const result = await BrandService.createBrand(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Created brand successfully.',
    data: result,
  });
});

const BrandController = {
  createBrand,
};

export default BrandController;
