import { Types } from "mongoose";

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
