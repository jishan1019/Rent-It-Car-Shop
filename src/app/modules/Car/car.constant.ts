import { TCarStatus } from "./car.interface";

export const CarStatus: TCarStatus[] = ["available", "unavailable"];

export const CarBookingStatus = {
  AVAILABLE: "available",
  UNAVAILABLE: "unavailable",
} as const;
