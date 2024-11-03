import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AddressServices from './address.services';

// add new address
const addAddress = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user._id;
  const result = await AddressServices.addAddress({ ...payload, userId });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'New Address created successfully.',
    data: result,
  });
});

const AddressControllers = {
  addAddress,
};

export default AddressControllers;
