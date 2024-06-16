export type TRole = "user" | "admin";

export type TUser = {
  name: string;
  email: string;
  role: TRole;
  password: string;
  phone: string;
  address: string;
};
