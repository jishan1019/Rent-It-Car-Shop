import httpStatus from "http-status";
import { TUser } from "../User/user.interface";
import { UserModel } from "../User/user.model";
import AppError from "../../errors/AppError";

const createUserIntroDb = async (payload: TUser) => {
  const isUserExist = await UserModel.findOne({ email: payload?.email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists.");
  }

  const result = await UserModel.create(payload);
  return result;
};

export const AuthService = {
  createUserIntroDb,
};
