import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  carReturnValidationSchema,
  carValidationSchema,
  updateCarValidationSchema,
} from "./car.validation";
import { CarController } from "./car.controller";

const router = Router();

router.get("/", CarController.getAllCar);
router.get("/:id", CarController.getSingleCar);

router.post(
  "/",
  validateRequest(carValidationSchema),
  CarController.createCar // admin
);

router.put(
  "/return",
  validateRequest(carReturnValidationSchema),
  CarController.returnCar //admin
);

router.put(
  "/:id",
  validateRequest(updateCarValidationSchema),
  CarController.updateCar //admin
);

router.delete("/:id", CarController.deleteCar); //admin

export const CarRoutes = router;
