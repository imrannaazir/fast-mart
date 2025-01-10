import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import CollectionServices from './collection.services';

// create collection
const createCollection = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user._id;
  const result = await CollectionServices.createCollection(payload, userId!);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Collection created successfully.',
    data: result,
  });
});

// get all collections
const getAllCollections = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await CollectionServices.getAllCollections(query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Collections retrieved successfully.',
    data: result.result,
    meta: result.meta,
  });
});

const getSingleCollection = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CollectionServices.getSingleCollection(id!);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Collection retrieved successfully.',
    data: result,
  });
});

// delete single collection
const deleteSingleCollection = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await CollectionServices.deleteSingleCollection(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Collection deleted successfully.',
    data: result,
  });
});

// delete many collections
const deleteManyCollection = catchAsync(async (req, res) => {
  const ids = req.body.ids;
  const result = await CollectionServices.deleteManyCollection(ids);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Collections deleted successfully.',
    data: result,
  });
});
const CollectionControllers = {
  createCollection,
  getAllCollections,
  getSingleCollection,
  deleteSingleCollection,
  deleteManyCollection,
};

export default CollectionControllers;
