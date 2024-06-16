import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    date: {
      type: String,
      required: [true, "Booking date is required"],
    },
    startTime: {
      type: String,
      required: [true, "Start Time is required"],
    },
    endTime: {
      type: String,
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User Id is required"],
      ref: "User",
    },
    car: {
      type: Schema.Types.ObjectId,
      required: [true, "Car Id is required"],
      ref: "Car",
    },

    totalCost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const BookingModel = model<TBooking>("booking", bookingSchema);

export { BookingModel };
