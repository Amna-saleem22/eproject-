import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
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
    totalAmount: Number,

    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
