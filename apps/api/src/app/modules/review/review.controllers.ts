import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import ReviewServices from './review.services';

const postReview = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const orderItemId = req.params.orderItemId;
  const payload = req.body;
  const result = ReviewServices.postReview(payload, orderItemId!, userId!);
  sendResponse(res, {
    success: true,
    message: 'You have successfully post a review.',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const ReviewControllers = { postReview };
export default ReviewControllers;
