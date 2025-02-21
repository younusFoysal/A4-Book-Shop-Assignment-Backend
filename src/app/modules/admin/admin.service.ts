import AppError from '../../errors/AppError';
 
import { User } from '../users/user.model';

const BlockinusersintoDb = async (id: string) => {
  const isExisteduser = await User.findById(id);

  if (!isExisteduser) {
    throw new AppError(404, 'user not found');
  }

  const isBlocked = isExisteduser?.isBlocked;

  if (isBlocked) {
    throw new AppError(400, 'user is already blocked');
  }

  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

 

export const adminServices = {
  BlockinusersintoDb,
  
};
