// models/Room.js
import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomType: {
      type: String,
      required: true,
      enum: ["Single", "Double", "Deluxe", "Luxury", "Suite"],
    },
    totalRooms: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["available", "booked", "maintenance"],
      default: "available",
    },
    amenities: [String], // e.g., ["WiFi", "TV", "AC"]
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);