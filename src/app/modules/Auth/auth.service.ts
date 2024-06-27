import httpStatus from "http-status";
import { TUser } from "../User/user.interface";
import { UserModel } from "../User/user.model";
import AppError from "../../errors/AppError";
import { TAuth } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";

const loginUserFromDb = async (payload: TAuth) => {
  const user = await UserModel.findOne({
    email: payload?.email,
    isDeleted: false,
  });

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found");
  }

  const isPasswordMatch = UserModel.isPasswordMatch(
    user?.password,
    payload?.password
  );

  if (!isPasswordMatch) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Password is wrong. Please try again"
    );
  }

  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_expire_time as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expire_time as string
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

const createUserIntroDb = async (payload: TUser) => {
  const isUserExist = await UserModel.findOne({ email: payload?.email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists.");
  }

  const result = await UserModel.create(payload);
  return result;
};

const generateNewRefreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { userId } = decoded;

  const user = await UserModel.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found");
  }

  const jwtPayload = {
    userId,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_expire_time as string
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  loginUserFromDb,
  createUserIntroDb,
  generateNewRefreshToken,
};
