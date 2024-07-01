import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { CarModel } from "./car.model";
import { TCar, TReturnCar } from "./car.interface";
import { BookingModel } from "../Booking/booking.model";
import { calculateTotalCost } from "./car.utils";
import { CarBookingStatus } from "./car.constant";
import mongoose from "mongoose";
import { BOOKING_STATUS } from "../Booking/booking.constant";
import { sendEmail } from "../../utils/sendEmail";
import { TBookingPopulatedCar } from "../Booking/booking.interface";

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

const returnCarIntoDb = async (payload: TReturnCar) => {
  const bookingId = payload?.bookingId;

  const bookingInfo = await BookingModel.findById(bookingId)
    .populate("user")
    .populate("car");

  if (!bookingInfo) {
    throw new AppError(httpStatus.BAD_REQUEST, "This Booking not exists.");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const carId = bookingInfo.car._id;

    const carUpdateResult = await CarModel.findByIdAndUpdate(
      carId,
      { status: CarBookingStatus.AVAILABLE },
      { new: true, session }
    );

    if (!carUpdateResult) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update car status");
    }

    const updateBookingResult = await BookingModel.findByIdAndUpdate(
      bookingId,
      { bookingStatus: BOOKING_STATUS.returned },
      { new: true, session }
    );

    if (!updateBookingResult) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update booking");
    }

    const result = await BookingModel.findById(updateBookingResult?._id)
      .populate("user")
      .populate("car")
      .session(session)
      .exec();

    const { user, car } = result as unknown as TBookingPopulatedCar;

    sendEmail(
      user?.email,
      user?.name,
      car?.name,
      result?.date as string,
      result?.startTime as string,
      result?.endTime as string,
      result?.totalCost as number
    );

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to get booking");
    }

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(httpStatus.BAD_REQUEST, "Failed to return car");
  }
};

const createRetuningReqCarIntoDb = async (payload: TReturnCar) => {
  const bookingId = payload.bookingId;

  const bookingInfo = await BookingModel.findById(bookingId)
    .populate("user")
    .populate("car");

  if (!bookingInfo) {
    throw new AppError(httpStatus.BAD_REQUEST, "This Booking not exists.");
  }

  const car = bookingInfo.car as unknown as TCar;
  const pricePerHour = car.pricePerHour;

  const totalCost = calculateTotalCost(
    bookingInfo?.startTime,
    payload?.endTime,
    pricePerHour
  );

  const bookingUpdateData = {
    endTime: payload?.endTime,
    totalCost,
    bookingStatus: BOOKING_STATUS.returning,
  };

  const updateBookingResult = await BookingModel.findByIdAndUpdate(
    bookingId,
    bookingUpdateData,
    { new: true }
  );

  if (!updateBookingResult) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update booking");
  }

  const result = await BookingModel.findById(updateBookingResult?._id)
    .populate("user")
    .populate("car")
    .exec();

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to get booking");
  }

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
  returnCarIntoDb,
  updateCarIntroDb,
  deleteSingleCarFromDB,
  createRetuningReqCarIntoDb,
};
