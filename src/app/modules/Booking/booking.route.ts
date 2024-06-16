import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  carValidationSchema,
  updateCarValidationSchema,
} from "./booking.validation";
import { CarController } from "./booking.controller";

const router = Router();

router.get("/", CarController.getAllCar);
router.get("/:id", CarController.getSingleCar);

router.post(
  "/",
  validateRequest(carValidationSchema),
  CarController.createCar // admin
);

export const BookingRoutes = router;
