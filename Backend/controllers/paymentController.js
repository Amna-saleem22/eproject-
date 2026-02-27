import mongoose from "mongoose";
import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";

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

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 🚫 DO NOT CHANGE BOOKING STATUS HERE

    const payment = await Payment.create({
      bookingId,
      method,
      customerName: method === "Online" ? customerName : null,
      email: method === "Online" ? email : null,
      nameOnCard: method === "Online" ? nameOnCard : null,
      cardNumber: method === "Online" ? cardNumber : null,
      expiry: method === "Online" ? expiry : null,
      paymentStatus: "paid", // payment done
      transactionId:
        method === "Online" ? "TXN" + Date.now() : null,
    });

    res.status(201).json({
      success: true,
      message: "Payment successful",
      payment,
    });
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



/* ===============================
   GET PAYMENT BY BOOKING ID
================================ */
export const getPaymentByBookingId = async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const payment = await Payment.findOne({ bookingId });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error("Fetch Payment Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};