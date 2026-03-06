import express from "express";
import {
  createBooking,
  confirmBooking,
  getBookingById,
  cancelBooking,
  getMyBookings,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

// Create booking
router.post("/", createBooking);

router.get("/my", getMyBookings);       // <-- fetch only user's bookings
// Get booking by id
router.get("/:id", getBookingById);

router.put("/:id/cancel", cancelBooking); // Cancel booking route
// Admin confirm booking
router.post("/confirm", confirmBooking);

export default router;