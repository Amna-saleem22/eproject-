import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    method: {
      type: String,
      enum: ["Cash", "Online"],
      required: true,
    },

    // ✅ Customer Info
    customerName: String,
    email: String,

    // ✅ Card Info
    nameOnCard: String,
    cardNumber: String,
    expiry: String,

   paymentStatus: {
  type: String,
  enum: ["pending", "paid", "failed"], // add lowercase pending/paid
  required: true,
  default: "pending"
},

    transactionId: String,
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
