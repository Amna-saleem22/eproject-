
import express from "express";
import {
  createBooking,
  getMyBookings,
  confirmBooking,
  updateBooking,
  getBookingById,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/my", protect, getMyBookings);
router.post("/", createBooking);
router.get("/:id", confirmBooking);
router.get("/:id", getBookingById);
router.put("/:id", updateBooking);

export default router;