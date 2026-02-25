

// import express from "express";
// import { protect, adminOnly } from "../middleware/authMiddleware.js";
// import { getAllBookings,confirmBooking} from "../controllers/adminController.js";

// const router = express.Router();

// router.get("/dashboard", protect, adminOnly, (req, res) => {
//   res.json({ message: `Welcome Admin ${req.user.name} 👑` });
// });
// // Get all pending bookings
// //router.get("/bookings", protect, adminOnly, getPendingBookings);

// router.get("/bookings", protect, adminOnly, getAllBookings);
// // Confirm a booking
// router.patch("/bookings/:id/confirm", protect, adminOnly, confirmBooking);
// //router.patch("/bookings/:id/confirm", protect, adminOnly, confirmBooking);

// export default router;


import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  getAllBookings,
//  confirmBooking,
  //cancelBooking,
  updateBookingStatus,
} from "../controllers/adminController.js";

const router = express.Router();

// Admin Dashboard message
router.get("/dashboard", protect, adminOnly, (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.name} 👑` });
});

// Get all bookings
router.get("/bookings", protect, adminOnly, getAllBookings);

// Update booking status (pending, confirmed, cancelled)
router.put("/bookings/:id", protect, adminOnly, updateBookingStatus);


// Get all bookings
//router.get("/bookings", protect, adminOnly, getAllBookings);

// Confirm booking
//router.patch("/bookings/:id/confirm", protect, adminOnly, confirmBooking);

// Cancel booking
//router.patch("/bookings/:id/cancel", protect, adminOnly, cancelBooking);

// Update booking status (general)
//router.put("/bookings/:id/status", protect, adminOnly, updateBookingStatus);

export default router;