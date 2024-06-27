import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";

const getAllBooking = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await BookingService.getAllBookingFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req, res) => {
  const userId = req.user.userId || "";
  const result = await BookingService.getSingleUserBookingFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My Bookings retrieved successfully",
    data: result,
  });
});

const getUserBookingsHistory = catchAsync(async (req, res) => {
  const userId = req.user.userId || "";
  const result = await BookingService.getUserBookingHistory(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My All Bookings retrieved successfully",
    data: result,
  });
});

const createBooking = catchAsync(async (req, res) => {
  const userId = req.user.userId || "";

  const bookingData = {
    user: userId,
    car: req.body.carId,
    ...req.body,
  };

  const result = await BookingService.createBookingIntroDb(bookingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car booked successfully",
    data: result,
  });
});

export const BookingController = {
  getAllBooking,
  getSingleBooking,
  createBooking,
  getUserBookingsHistory,
};
