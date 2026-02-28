import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  getAllBookings,
  confirmBooking,
  checkInBooking,
  checkOutBooking,
  getAdminStats,
  updateBookingStatus,
} from "../controllers/adminController.js";

const router = express.Router();
router.use(protect, adminOnly);

// Admin stats
router.get("/stats", getAdminStats);
router.get("/bookings", getAllBookings);
router.put("/bookings/:id/confirm", confirmBooking);
router.put("/bookings/:id/checkin", checkInBooking);
router.put("/bookings/:id/checkout", checkOutBooking);
router.put("/bookings/:id", updateBookingStatus);

export default router;