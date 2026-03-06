import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import mongoose from "mongoose";

export const getInvoiceByBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ success: false, message: "Invalid booking ID" });
    }

    const booking = await Booking.findById(bookingId)
      .populate("assignedRoom"); // populate room details if needed

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Fetch payment for this booking
    const payment = await Payment.findOne({ bookingId });

    const invoice = {
      guestName: booking.guestName,
      phone: booking.phone,
      email: booking.email || booking.user?.email || "N/A",
      roomType: booking.roomType,
      assignedRoom: booking.assignedRoom,
      roomsCount: booking.roomsCount,
      totalGuests: booking.totalGuests,
      nights: booking.nights,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      totalAmount: booking.totalAmount,
      status: booking.status,
      bookingDate: booking.createdAt,
      payment: payment || null, // <-- now payment info is included
    };

    res.status(200).json({ success: true, invoice });
  } catch (error) {
    console.error("Invoice fetch error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};