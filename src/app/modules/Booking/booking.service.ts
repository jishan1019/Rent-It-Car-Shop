import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import { CarModel } from "../Car/car.model";
import { CarBookingStatus } from "../Car/car.constant";
import mongoose from "mongoose";

const getAllBookingFromDB = async (query: Record<string, unknown>) => {
  if (query.carId) {
    query.car = query.carId;
    delete query.carId;
  }

  const bookingQuery = new QueryBuilder(
    BookingModel.find().populate("user").populate("car"),
    query
  )
    .search([])
    .filter()
    .sort()
    .fields();

  const result = await bookingQuery.modelQuery;
  return result;
};

const getSingleUserBookingFromDB = async (id: string) => {
  const result = await BookingModel.find({ user: id })
    .populate("user")
    .populate("car");

  return result;
};

const createBookingIntroDb = async (payload) => {
  // Check if the car exists and is available
  const isCarExist = await CarModel.findOne({
    _id: payload.car,
    isDeleted: false,
    status: CarBookingStatus.AVAILABLE,
  });

  if (!isCarExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Car does not exist for booking");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const booking = await BookingModel.create([{ ...payload }], { session });

    const updateCarStatusResult = await CarModel.findByIdAndUpdate(
      payload.car,
      { status: CarBookingStatus.UNAVAILABLE },
      { new: true, session }
    );

    if (!updateCarStatusResult) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update car status");
    }

    const bookingId = booking[0]._id;

    // Populate the user and car fields
    const result = await BookingModel.findById(bookingId)
      .populate("user")
      .populate("car")
      .session(session)
      .exec();

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    throw new AppError(httpStatus.BAD_REQUEST, "Failed to book a car");
  }
};

export const BookingService = {
  getAllBookingFromDB,
  getSingleUserBookingFromDB,
  createBookingIntroDb,
};
