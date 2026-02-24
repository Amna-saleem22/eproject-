import Booking from "../models/Booking.js";
import User from "../models/User.js";

// ✅ Get all pending bookings for admin dashboard
export const getPendingBookings = async (req, res) => {
  try {
    // Fetch all bookings with status pending
    const pendingBookings = await Booking.find({ status: "pending" })
      .populate("guestId", "name email"); // guest info

    res.status(200).json({
      message: "Pending bookings fetched successfully",
      bookings: pendingBookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Confirm a booking by admin
export const confirmBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "confirmed"; // update status
    await booking.save();

    res.status(200).json({
      message: "Booking confirmed successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};