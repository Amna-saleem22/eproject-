import mongoose from "mongoose";
import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";

// ----------------------
// Create Payment
// POST /payments/pay
export const makePayment = async (req, res) => {
  try {
    const {
      bookingId,
      method,
      customerName,
      email,
      nameOnCard,
      cardNumber,
      expiry,
    } = req.body;

    // Validate bookingId
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: "Invalid bookingId" });
    }

    // Check booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Decide payment status
    const paymentStatus = method === "Cash" ? "Pending" : "Paid";

    // Create Payment Record
    const payment = await Payment.create({
      bookingId: new mongoose.Types.ObjectId(bookingId),
      method,
      customerName: method === "Online" ? customerName : null,
      email: method === "Online" ? email : null,
      nameOnCard: method === "Online" ? nameOnCard : null,
      cardNumber: method === "Online" ? cardNumber : null,
      expiry: method === "Online" ? expiry : null,
      paymentStatus,
      transactionId: method === "Online" ? "TXN" + Date.now() : null,
    });

    // Update Booking Status
    booking.status = method === "Cash" ? "Reserved" : "Confirmed";
    await booking.save();

    res.status(201).json({
      message: "Payment Saved Successfully ✅",
      payment,
    });
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ----------------------
// Get Payment by Booking ID
// GET /payments/booking/:bookingId
export const getPaymentByBookingId = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Validate bookingId
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: "Invalid bookingId" });
    }

    const payment = await Payment.findOne({
      bookingId: new mongoose.Types.ObjectId(bookingId),
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json(payment);
  } catch (error) {
    console.error("Fetch Payment Error:", error);
    res.status(500).json({ message: error.message });
  }
};
