import { Model } from "mongoose";

export type TRole = "user" | "admin";

export type TUser = {
  name: string;
  email: string;
  role: TRole;
  password: string;
  phone: string;
  address: string;
};

export interface TUserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatch(dbUserPass: string, payloadPass: string): Promise<boolean>;
}
