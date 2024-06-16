import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { updateUserValidationSchema } from "./car.validation";
import { CarController } from "./car.controller";

const router = Router();

router.get("/", CarController.getAllCar);
router.get("/:id", CarController.getSingleCar);

router.post(
  "/",
  validateRequest(updateUserValidationSchema),
  CarController.createCar
);

router.put(
  "/:id",
  validateRequest(updateUserValidationSchema),
  CarController.updateCar
);

router.delete("/:id", CarController.deleteCar);

export const CarRoutes = router;
