import { Schema, model } from "mongoose";
import { TUser } from "./car.interface";
import { Role } from "./user.const";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    role: {
      type: String,
      enum: {
        values: Role,
        message: "{VALUE} is not a valid role",
      },
      required: [true, "Role is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<TUser>("User", userSchema);

export { UserModel };
