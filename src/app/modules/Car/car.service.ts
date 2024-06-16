import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { CarModel } from "./car.model";
import { TCar } from "./car.interface";

const getAllCarFromDB = async () => {
  const result = await CarModel.find();
  return result;
};

const getSingleCarFromDB = async (id: string) => {
  const result = await CarModel.findOne({ _id: id });
  return result;
};

const createCarIntroDb = async (payload: TCar) => {
  const result = await CarModel.create(payload);
  return result;
};

const updateCarIntroDb = async (id: string, payload: Partial<TCar>) => {
  const isUserExist = await CarModel.findById(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Car not exists.");
  }

  const result = await CarModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteSingleCarFromDB = async (id: string) => {
  const result = await CarModel.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true, runValidators: true }
  );
  return result;
};

export const CarService = {
  getAllCarFromDB,
  getSingleCarFromDB,
  createCarIntroDb,
  updateCarIntroDb,
  deleteSingleCarFromDB,
};
