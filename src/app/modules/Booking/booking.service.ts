import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { bookingSearchableFields } from "./booking.constant";
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import { CarModel } from "../Car/car.model";
import { CarBookingStatus } from "../Car/car.constant";

const getAllBookingFromDB = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(
    BookingModel.find().populate("User").populate("Car"),
    query
  )
    .search(bookingSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bookingQuery.modelQuery;
  return result;
};

const getSingleUserBookingFromDB = async (id: string) => {
  const result = await BookingModel.find({ _id: id })
    .populate("User")
    .populate("Car");
  return result;
};

const createBookingIntroDb = async (payload: TBooking) => {
  // check this car exists
  const isCarExist = await CarModel.findOne({
    _id: payload?.car,
    isDeleted: false,
    status: CarBookingStatus.AVAILABLE,
  });

  if (!isCarExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Car does not exist for booking");
  }

  const booking = await BookingModel.create(payload);

  // Populate the user and car fields
  const result = await BookingModel.findById(booking?._id)
    .populate("user")
    .populate("car")
    .exec();

  return result;
};

export const BookingService = {
  getAllBookingFromDB,
  getSingleUserBookingFromDB,
  createBookingIntroDb,
};
