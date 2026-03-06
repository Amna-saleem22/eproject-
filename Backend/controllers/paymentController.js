import mongoose from "mongoose";
import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";

// ===============================
// Helper validation functions
// ===============================
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidCardNumber = (num) => /^\d{16}$/.test(num.replace(/\s+/g, ""));
const isValidExpiry = (exp) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp);
const isValidCvv = (cvv) => /^\d{3,4}$/.test(cvv);

// ===============================
// Make Payment
// ===============================
export const makePayment = async (req, res) => {
  try {
    const { bookingId, method, customerName, email, nameOnCard, cardNumber, expiry, cvv } = req.body;

    // Booking validation
    if (!mongoose.Types.ObjectId.isValid(bookingId))
      return res.status(400).json({ success: false, message: "Invalid booking ID" });

    const booking = await Booking.findById(bookingId);
    if (!booking)
      return res.status(404).json({ success: false, message: "Booking not found" });

    // Customer info validation
    if (!customerName || !email)
      return res.status(400).json({ success: false, message: "Customer name and email required" });

    if (!isValidEmail(email))
      return res.status(400).json({ success: false, message: "Invalid email format" });

    // Online payment validation
    if (method === "Online") {
      if (!nameOnCard || !cardNumber || !expiry || !cvv)
        return res.status(400).json({ success: false, message: "Complete card details required" });
      if (!isValidCardNumber(cardNumber))
        return res.status(400).json({ success: false, message: "Invalid card number" });
      if (!isValidExpiry(expiry))
        return res.status(400).json({ success: false, message: "Invalid expiry date" });
      if (!isValidCvv(cvv))
        return res.status(400).json({ success: false, message: "Invalid CVV" });
    }

    // Create payment
    const payment = await Payment.create({
      bookingId,
      method,
      customerName,
      email,
      nameOnCard: method === "Online" ? nameOnCard : undefined,
      cardNumber: method === "Online" ? cardNumber : undefined,
      expiry: method === "Online" ? expiry : undefined,
      cvv: method === "Online" ? cvv : undefined,
      amount: booking.totalAmount,
      paymentStatus: "paid",
      transactionId: "TXN" + Date.now(),
    });

    res.status(201).json({ success: true, payment });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===============================
// Get Payment by Booking ID
// ===============================
export const getPaymentByBookingId = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const payment = await Payment.findOne({ bookingId });
    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// Get All Payments for Admin
// ===============================










/* ===============================
   GET ALL PAYMENTS FOR ADMIN
================================ */
export const getAllPayments = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;
    let filter = {};

    if (fromDate && toDate) {
      filter.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }

    // Fetch payments and populate booking info
    const payments = await Payment.find(filter)
      .sort({ createdAt: -1 })
      .populate("bookingId", "guestName roomType checkInDate checkOutDate totalAmount");

    // Map payments to ensure all fields exist
    const paymentsMapped = payments.map(p => ({
      _id: p._id,
      bookingId: p.bookingId?._id || p.bookingId || "N/A", // Always show booking ID
      customerName: p.customerName || p.bookingId?.guestName || "N/A",
      amount: p.amount || p.bookingId?.totalAmount || 0,
      method: p.method || "Cash",
      paymentStatus: p.paymentStatus || "paid",
      transactionId: p.transactionId || (p.method === "Online" ? "TXN" + Date.now() : "CASH-" + Date.now()),
      createdAt: p.createdAt,
      bookingInfo: p.bookingId || null, // full booking object
    }));

    // Calculate total revenue
    const totalRevenue = paymentsMapped
      .filter(p => p.paymentStatus === "paid")
      .reduce((sum, p) => sum + (p.amount || 0), 0);

    res.status(200).json({
      success: true,
      count: paymentsMapped.length,
      totalRevenue,
      payments: paymentsMapped,
    });
  } catch (error) {
    console.error("Fetch All Payments Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};