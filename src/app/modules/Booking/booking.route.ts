import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidationSchema } from "./booking.validation";
import { BookingController } from "./booking.controller";

const router = Router();

router.get("/", BookingController.getAllBooking); //admin
router.get("/my-bookings", BookingController.getSingleBooking); //user all booking

router.post(
  "/",
  validateRequest(bookingValidationSchema),
  BookingController.createBooking
);

export const BookingRoutes = router;
