import { Types } from "mongoose";
import { TUser } from "../User/user.interface";
import { TCar } from "../Car/car.interface";

export type TBookingStatus = "inProgress" | "returning" | "returned";

export type TBooking = {
  date: string;
  startTime: string;
  endTime?: string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  totalCost?: number;
  bookingStatus: TBookingStatus;
};

export type TBookingPopulatedCar = {
  date: string;
  startTime: string;
  endTime?: string;
  user: TUser;
  car: TCar;
  totalCost?: number;
  bookingStatus: TBookingStatus;
};
