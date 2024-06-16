import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  updateUserValidationSchema,
  userValidationSchema,
} from "./user.validation";

const router = Router();

router.get("/", UserController.getAllUser);
router.get("/:_id", UserController.getSingleUser);
router.post(
  "/",
  validateRequest(userValidationSchema),
  UserController.createUser
);
router.patch(
  "/:_id",
  validateRequest(updateUserValidationSchema),
  UserController.updateUser
);

export const UserRoutes = router;
