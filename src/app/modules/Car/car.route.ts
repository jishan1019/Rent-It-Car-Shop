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

router.get("/", CarController.getAllCar);
router.get("/:id", CarController.getSingleCar);

router.post(
  "/",
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
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(updateCarValidationSchema),
  CarController.updateCar //admin
);

router.delete("/:id", auth(USER_ROLE.admin), CarController.deleteCar); //admin

export const CarRoutes = router;
