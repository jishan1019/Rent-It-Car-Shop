import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";

const getAllBookingFromDB = async () => {
  const result = await BookingModel.find();
  return result;
};

const getSingleBookingFromDB = async (id: string) => {
  const result = await BookingModel.findOne({ _id: id });
  return result;
};

const createBookingIntroDb = async (payload: TBooking) => {
  const result = await BookingModel.create(payload);
  return result;
};

export const BookingService = {
  getAllBookingFromDB,
  getSingleBookingFromDB,
  createBookingIntroDb,
};
