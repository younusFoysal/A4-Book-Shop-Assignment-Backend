import catchAsync from '../../utils/catchAsync';
import SendResponse from '../../utils/SendResponse';
import { userServices } from './user.service';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await userServices.createUserIntoDB(userData);

  SendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const userData  = req.body;
  const { userId } = req.params;
  const result = await userServices.UpdateuserIntoDb(userData , userId);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Updated successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getalluserintodb();

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'users retrieved successfully',
    data: result,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await userServices.getUserById(userId);
  SendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'User retrieved successfully', data: result });
});

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await userServices.deleteUser(userId);
  SendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'User deleted successfully' });
});

export const userController = {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
