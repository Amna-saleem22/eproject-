// import express from "express";
// import { createBooking, updateBooking } from "../controllers/bookingController.js";
// import { protect } from "../middleware/authMiddleware.js";

// import { getBookingById} from "../controllers/bookingController.js";

// const router = express.Router();

// // All routes require authentication
// router.use(protect);
// router.get("/:id", getBookingById);
// router.post("/", createBooking);        // Create booking
// router.put("/:id", updateBooking);     // Cancel/update booking

// export default router;
import express from "express";
import {
  createBooking,
  getMyBookings,
  updateBooking,
  getBookingById,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/my", protect, getMyBookings);
router.post("/", createBooking);
router.get("/:id", getBookingById);
router.put("/:id", updateBooking);

export default router;