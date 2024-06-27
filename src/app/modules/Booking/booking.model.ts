import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";
import { BOOKING_STATUS, BookingStatus } from "./booking.constant";

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
    bookingStatus: {
      type: String,
      enum: {
        values: BookingStatus,
        message: "{VALUE} is not a valid booking status",
      },
      required: [true, "Booking Status is required"],
      default: BOOKING_STATUS.inProgress,
    },
  },
  {
    timestamps: true,
  }
);

const BookingModel = model<TBooking>("booking", bookingSchema);

export { BookingModel };
