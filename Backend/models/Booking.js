import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  guestName: { type: String, required: true },
  phone: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  assignedRoom: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  adults: { type: Number, default: 1 },
  children: { type: Number, default: 0 },
  seniors: { type: Number, default: 0 },
  roomType: String,
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["pending","confirmed","cancelled","checked-in","checked-out"], default: "pending" },
},
{ timestamps: true }
);

// Virtuals for totalGuests and nights
bookingSchema.virtual("totalGuests").get(function () {
  return (this.adults || 0) + (this.children || 0) + (this.seniors || 0);
});

bookingSchema.virtual("nights").get(function () {
  if (this.checkInDate && this.checkOutDate) {
    const diffTime = new Date(this.checkOutDate) - new Date(this.checkInDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  return 0;
});

// Ensure virtuals are included in JSON
bookingSchema.set("toJSON", { virtuals: true });
bookingSchema.set("toObject", { virtuals: true });

export default mongoose.model("Booking", bookingSchema);