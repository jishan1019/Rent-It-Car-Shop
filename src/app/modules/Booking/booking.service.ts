import QueryBuilder from "../../builder/QueryBuilder";
import { bookingSearchableFields } from "./booking.constant";
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";

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
  const result = await BookingModel.create(payload);
  return result;
};

export const BookingService = {
  getAllBookingFromDB,
  getSingleUserBookingFromDB,
  createBookingIntroDb,
};
