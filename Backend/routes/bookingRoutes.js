// import express from "express";
// import {
//   createBooking,
//   getMyBookings,
  
//   // getPendingBookings,
//   // confirmBooking, cancelBooking,
//  // getBookingById,
//   addExtraServices,
//   updateBooking,
// } from "../controllers/bookingController.js";
// import { protect } from "../middleware/authMiddleware.js"; // Login check middleware

// // import { staffOnly } from "../middleware/staffOnlyMiddleware.js";
// // ✅ DEFINE ROUTER
// const router = express.Router();

// // // ✅ Booking Routes
// // // Staff confirms booking
// // router.patch("/:id/confirm", protect, staffOnly, confirmBooking);
// // // ✅ Staff Dashboard: Pending bookings list
// // router.get("/pending", protect, staffOnly, getPendingBookings);

// // // Staff cancels booking
// // router.patch("/:id/cancel", protect, staffOnly, cancelBooking);
// router.post("/", protect, createBooking); // Create Booking (User must be logged in)
// router.get("/my", protect, getMyBookings); // Get All My Bookings
// //router.get("/:id", protect, getBookingById); // Get Single Booking By ID
// router.put("/:id", protect, updateBooking); // Update booking (details or status e.g. Cancelled)
// router.put("/:id/services", protect, addExtraServices); // Add Extra Services

// // ✅ Export Default
// export default router;



import express from "express";
import {
  createBooking,
  getMyBookings,
  updateBooking,
  addExtraServices,
  getBookingById
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js"; // Login check middleware

const router = express.Router();

// ✅ User Booking Routes

// Create a new booking (User must be logged in)
router.post("/", protect, createBooking);

// Get all bookings for the logged-in user
router.get("/my", protect, getMyBookings);
// ✅ Get a single booking by ID
router.get("/:id", protect, getBookingById);

// Update a booking (mainly for cancelling or minor updates by user)
router.put("/:id", protect, updateBooking);

// Add extra services to a booking
router.put("/:id/services", protect, addExtraServices);

// ✅ Export router
export default router;