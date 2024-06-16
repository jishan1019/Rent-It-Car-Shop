import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";
import { userValidationSchema } from "../User/user.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(userValidationSchema),
  AuthController.createUser
);

export const AuthRoutes = router;
