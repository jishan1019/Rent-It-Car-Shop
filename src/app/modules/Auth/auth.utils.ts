import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const createToken = (
  jwtPayload: { userId: Types.ObjectId; role: string },
  secretKey: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secretKey, {
    expiresIn: expiresIn,
  });
};
