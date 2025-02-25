import { User } from '../users/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import { createToken } from './auth.utils';
import config from '../../config';
import AppError from '../../errors/AppError';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(401, 'Invalid credentials');

  const jwtPayload = {
    name: user.name,
    email: user.email,
    role: user.role,
    id: user._id,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {

  const user = await User.isUserExistsByCustomId(userData.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const userStatus = user?.isBlocked;

  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      _id: userData.id,
      role: userData.role,
    },
    {
      password: newHashedPassword,
    },
  );


  return null;
};

export const AuthServices = {
  loginUser,
  changePassword,
};
