import { TUser } from './user.interface';
import { User } from './user.model';
import QueryBuilder from '../../builder/queryBuilder';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);

  return result;
};

const getalluserintodb = async (query: Record<string, unknown>) => {
  const ProductSearchableFields = ['name', 'email'];
  const searchQuery = new QueryBuilder(User.find(), query)
  .search(ProductSearchableFields)
  .filter()
  .sort();
  const result = await searchQuery.modelQuery;

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
