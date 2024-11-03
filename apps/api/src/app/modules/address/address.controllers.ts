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

// get all addresses
const getMyAddresses = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const result = await AddressServices.getMyAddresses(userId!);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'My addresses fetched successfully.',
    data: result,
  });
});

// delete address
const deleteAddress = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const addressId = req.params.addressId;
  const result = await AddressServices.deleteAddress(addressId!, userId!);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Address Deleted successfully.',
    data: result,
  });
});

// make default address
const makeDefaultAddress = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const addressId = req.params.addressId;
  const result = await AddressServices.makeDefaultAddress(addressId!, userId!);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Successfully marked as default',
    data: result,
  });
});
const AddressControllers = {
  addAddress,
  getMyAddresses,
  deleteAddress,
  makeDefaultAddress,
};

export default AddressControllers;
