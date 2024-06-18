import httpStatus from "http-status";
import { TUser } from "../User/user.interface";
import { UserModel } from "../User/user.model";
import AppError from "../../errors/AppError";
import { TAuth } from "./auth.interface";

const loginUserFromDb = async (payload: TAuth) => {
  const user = await UserModel.findOne({ email: payload?.email });
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found");
  }

  console.log(user);

  return user;
};

const createUserIntroDb = async (payload: TUser) => {
  const isUserExist = await UserModel.findOne({ email: payload?.email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists.");
  }

  const result = await UserModel.create(payload);
  return result;
};

export const AuthService = {
  loginUserFromDb,
  createUserIntroDb,
};
