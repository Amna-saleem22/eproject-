import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    guestName: { type: String, required: true },
    phone: { type: String, required: true },

    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },

    adults: Number,
    children: Number,
    seniors: Number,
    totalGuests: Number,
    nights: Number,

    roomType: String,
    roomsCount: Number,

    foodPackage: String,
    roomCost: Number,
    foodCost: Number,
    totalAmount: { type: Number, required: true },

    extraServices: [
      {
        serviceId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
        },
        name: String,
        price: Number,
      },
    ],

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);