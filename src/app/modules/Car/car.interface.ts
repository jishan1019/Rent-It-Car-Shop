import { Types } from "mongoose";

export type TCarStatus = "available" | "unavailable";

export type TCar = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
  status?: TCarStatus;
  isDeleted?: boolean;
  carImg?: string;
};

export type TReturnCar = {
  bookingId: Types.ObjectId;
  endTime: string;
};
