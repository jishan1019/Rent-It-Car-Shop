import { Schema, model } from "mongoose";
import { TUser, TUserModel } from "./user.interface";
import { Role } from "./user.const";
import argon2 from "argon2";

const userSchema = new Schema<TUser, TUserModel>(
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
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: 0,
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

userSchema.post("save", function (user, next) {
  user.password = "";
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await this.findById(id).select("+password");
};

userSchema.statics.isPasswordMatch = async function (dbUserPass, payloadPass) {
  return await argon2.verify(dbUserPass, payloadPass);
};

const UserModel = model<TUser, TUserModel>("User", userSchema);

export { UserModel };
