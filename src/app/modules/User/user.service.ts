import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const getAllUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await UserModel.findOne({ _id: id }, { isDeleted: false });

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not exists.");
  }

  return user;
};

const updateUserIntroDb = async (id: string, payload: Partial<TUser>) => {
  const isUserExist = await UserModel.findOne(
    { _id: id },
    { isDeleted: false }
  );

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not exists.");
  }

  const result = await UserModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteSingleUserFromDB = async (id: string) => {
  const result = await UserModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

const getMeFromDb = async (id: string) => {
  const user = await UserModel.findOne({ _id: id }, { isDeleted: false });

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not exists.");
  }

  return user;
};

export const UserService = {
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserIntroDb,
  deleteSingleUserFromDB,
  getMeFromDb,
};
