import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const getAllUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await UserModel.findById(id);
  return result;
};

const updateUserIntroDb = async (id: string, payload: Partial<TUser>) => {
  const isUserExist = await UserModel.findById(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not exists.");
  }

  const result = await UserModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const UserService = {
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserIntroDb,
};
