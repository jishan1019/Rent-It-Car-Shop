import { z } from "zod";

export const carValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required." }),
    description: z.string({ required_error: "Description is required." }),
    color: z.string({ required_error: "Color is required." }),
    isElectric: z.boolean({ required_error: "isElectric is required." }),
    features: z.array(z.string(), { required_error: "Features are required." }),
    pricePerHour: z.number({ required_error: "Price per hour is required." }),
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
  }),
});

export const CarValidationSchema = {
  carValidationSchema,
  updateCarValidationSchema,
};
