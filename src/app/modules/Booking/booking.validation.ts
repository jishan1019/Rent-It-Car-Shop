import { z } from "zod";
import { BookingStatus } from "./booking.constant";

const bookingValidationSchema = z.object({
  body: z.object({
    date: z.string({ required_error: "Booking date is required." }),
    startTime: z.string({ required_error: "startTime is required." }),
    carId: z.string({ required_error: "Car Id is required." }),
    bookingStatus: z.enum([...BookingStatus] as [string, ...string[]]),
  }),
});

export { bookingValidationSchema };
