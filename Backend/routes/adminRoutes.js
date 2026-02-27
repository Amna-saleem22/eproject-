import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  getAllBookings,
  updateBookingStatus,
  bulkUpdateBookings
} from "../controllers/adminController.js";

const router = express.Router();

// Protect all routes
router.use(protect, adminOnly);

router.get("/dashboard", (req, res) => {
  res.json({ 
    success: true,
    message: `Welcome Admin ${req.user.name} 👑`,
    admin: {
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
});

router.get("/bookings", getAllBookings);
router.put("/bookings/:id", updateBookingStatus);
router.post("/bookings/bulk-update", bulkUpdateBookings);

export default router;