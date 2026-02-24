

import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { getPendingBookings, confirmBooking } from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", protect, adminOnly, (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.name} 👑` });
});
// Get all pending bookings
router.get("/bookings", protect, adminOnly, getPendingBookings);

// Confirm a booking
router.patch("/bookings/:id/confirm", protect, adminOnly, confirmBooking);

export default router;