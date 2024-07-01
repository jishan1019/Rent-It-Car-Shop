import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  carReturnValidationSchema,
  carValidationSchema,
  updateCarValidationSchema,
} from "./car.validation";
import { CarController } from "./car.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.const";

const router = Router();

router.get("/all-car", CarController.getAllCar);
router.get("/single-car/:id", CarController.getSingleCar);

router.post(
  "/create-car",
  auth(USER_ROLE.admin),
  validateRequest(carValidationSchema),
  CarController.createCar // admin
);

router.put(
  "/return",
  auth(USER_ROLE.admin),
  validateRequest(carReturnValidationSchema),
  CarController.returnCar //admin
);

router.put(
  "/create-retuning-request",
  auth(USER_ROLE.user),
  validateRequest(carReturnValidationSchema),
  CarController.createRetuningRequest //user car retuning req
);

router.put(
  "/update-car/:id",
  auth(USER_ROLE.admin),
  validateRequest(updateCarValidationSchema),
  CarController.updateCar //admin
);

router.delete(
  "/delete-car/:id",
  auth(USER_ROLE.admin),
  CarController.deleteCar
); //admin

export const CarRoutes = router;
