import { Schema, model } from "mongoose";
import { TCar } from "./car.interface";
import { CarStatus } from "./car.constant";

const carSchema = new Schema<TCar>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    color: {
      type: String,
      required: [true, "Color is required"],
    },
    isElectric: {
      type: Boolean,
      required: [true, "isElectric is required"],
    },
    features: {
      type: [String],
      required: [true, "Features are required"],
    },
    pricePerHour: {
      type: Number,
      required: [true, "Price per hour is required"],
    },
    status: {
      type: String,
      enum: {
        values: CarStatus,
        message: "{VALUE} is not a valid status",
      },
      default: "available",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const CarModel = model<TCar>("Car", carSchema);

export { CarModel };
