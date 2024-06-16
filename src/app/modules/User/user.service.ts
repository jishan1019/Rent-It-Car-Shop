import { UserModel } from "./user.model";

const getAllUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await UserModel.findById(id);
  return result;
};

export const UserService = {
  getAllUserFromDB,
  getSingleUserFromDB,
};
