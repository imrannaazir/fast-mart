import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import TagService from './tag.service';

// create Tag
const createTag = catchAsync(async (req, res) => {
  const result = await TagService.createTag(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Tag created successfully.',
    data: result,
  });
});

const TagController = {
  createTag,
};

export default TagController;
