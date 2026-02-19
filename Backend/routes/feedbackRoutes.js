import express from "express";
import Feedback from "../models/Feedback.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const fb = await Feedback.create({
    user: req.user._id,
    booking: req.body.bookingId,
    message: req.body.message,
    rating: req.body.rating,
  });

  res.json({ message: "Feedback Submitted ✅", fb });
});

export default router;
