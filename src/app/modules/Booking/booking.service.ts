import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { CarModel } from "./booking.model";
import { TCar } from "./booking.interface";

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

export const CarService = {
  getAllCarFromDB,
  getSingleCarFromDB,
  createCarIntroDb,
};
