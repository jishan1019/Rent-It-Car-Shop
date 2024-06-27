import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidationSchema } from "./booking.validation";
import { BookingController } from "./booking.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.const";

const router = Router();

router.get("/", auth(USER_ROLE.admin), BookingController.getAllBooking); //admin

router.get(
  "/my-bookings",
  auth(USER_ROLE.user),
  BookingController.getSingleBooking
); //user all inrogress returning booking

router.get(
  "/my-bookings-history",
  auth(USER_ROLE.user),
  BookingController.getUserBookingsHistory
); //user all return booking

router.post(
  "/create-bookings",
  auth(USER_ROLE.user),
  validateRequest(bookingValidationSchema),
  BookingController.createBooking //user only
);

export const BookingRoutes = router;
