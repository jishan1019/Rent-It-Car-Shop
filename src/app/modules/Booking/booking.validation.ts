import { z } from "zod";

const bookingValidationSchema = z.object({
  body: z.object({
    date: z.string({ required_error: "Booking date is required." }),
    startTime: z.string({ required_error: "startTime is required." }),
    carId: z.string({ required_error: "Car Id is required." }),
  }),
});

export { bookingValidationSchema };
