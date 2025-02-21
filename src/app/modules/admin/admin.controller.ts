import catchAsync from '../../utils/catchAsync';
import SendResponse from '../../utils/SendResponse';
import httpStatus from 'http-status';
import { adminServices } from './admin.service';

const BlockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  await adminServices.BlockinusersintoDb(userId);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Blocked successfully',
  });
});

export const BlockController = {
  BlockUser,
};
