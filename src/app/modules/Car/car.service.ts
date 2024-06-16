import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./car.interface";
import { UserModel } from "./car.model";

const getAllCarFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleCarFromDB = async (id: string) => {
  const result = await UserModel.findById(id);
  return result;
};

const createCarIntroDb = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

const updateCarIntroDb = async (id: string, payload: Partial<TUser>) => {
  const isUserExist = await UserModel.findById(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Car not exists.");
  }

  const result = await UserModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteSingleCarFromDB = async (id: string) => {
  const result = await UserModel.deleteOne({ _id: id });
  return result;
};

export const CarService = {
  getAllCarFromDB,
  getSingleCarFromDB,
  createCarIntroDb,
  updateCarIntroDb,
  deleteSingleCarFromDB,
};
