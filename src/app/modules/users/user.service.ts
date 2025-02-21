import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);

  return result;
};

const getalluserintodb = async () => {
  const result = await User.find();

  return result;
};

const getUserById = async (userId: string) => {
  return await User.findById(userId);
};

const UpdateuserIntoDb = async (payload: Partial<TUser>, userId: string) => {
  const result = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteUser = async (userId: string) => {
  return await User.findByIdAndDelete(userId);
};

export const userServices = {
  createUserIntoDB,
  UpdateuserIntoDb,
  getalluserintodb,
  getUserById,
  deleteUser
};
