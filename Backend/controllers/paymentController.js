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

    // ✅ Decide payment status
    const paymentStatus = method === "Cash" ? "Pending" : "Paid";

    // ✅ Create Payment Record
    const payment = await Payment.create({
      bookingId,
      method,
      customerName,
      email,
      nameOnCard,
      cardNumber,
      expiry,
      paymentStatus,
      transactionId: method === "Online" ? "TXN" + Date.now() : null,
    });

    // ✅ Update Booking Status
    await Booking.findByIdAndUpdate(bookingId, {
      status: method === "Cash" ? "Reserved" : "Confirmed",
    });

    res.json({
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
    const payment = await Payment.findOne({ bookingId: req.params.bookingId });
    if (!payment) return res.status(404).send("Payment not found");
    res.json(payment);
  } catch (error) {
    console.error("Fetch Payment Error:", error);
    res.status(500).json({ message: error.message });
  }
};
