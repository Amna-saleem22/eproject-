import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },

    message: String,
    rating: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
