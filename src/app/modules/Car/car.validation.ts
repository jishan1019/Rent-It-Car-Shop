import { z } from "zod";
import { CarStatus } from "./car.constant";

export const carValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required." }),
    description: z.string({ required_error: "Description is required." }),
    color: z.string({ required_error: "Color is required." }),
    isElectric: z.boolean({ required_error: "isElectric is required." }),
    features: z.array(z.string(), { required_error: "Features are required." }),
    pricePerHour: z.number({ required_error: "Price per hour is required." }),
    status: z.enum([...CarStatus] as [string, ...string[]]).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const updateCarValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    isElectric: z.boolean().optional(),
    features: z.array(z.string()).optional(),
    pricePerHour: z.number().optional(),
    status: z.enum([...CarStatus] as [string, ...string[]]).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const carReturnValidationSchema = z.object({
  body: z.object({
    bookingId: z.string({ required_error: "Booking id is required." }),
    endTime: z.string({ required_error: "End time is required." }).optional(),
  }),
});

export const CarValidationSchema = {
  carValidationSchema,
  updateCarValidationSchema,
  carReturnValidationSchema,
};
