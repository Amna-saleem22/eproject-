import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String, required: true },
    rating: { type: Number, default: 5 },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);