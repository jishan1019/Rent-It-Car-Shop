import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { updateUserValidationSchema } from "./user.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.const";

const router = Router();

router.get("/", UserController.getAllUser);
router.get("/:_id", UserController.getSingleUser);

router.patch(
  "/:_id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(updateUserValidationSchema),
  UserController.updateUser
);

router.delete("/:_id", auth(USER_ROLE.admin), UserController.deleteUser);

export const UserRoutes = router;
