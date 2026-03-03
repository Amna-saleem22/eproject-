import express from "express";
import { makePayment, getAllPayments,getPaymentByBookingId } from "../controllers/paymentController.js";

const router = express.Router();

// Create a payment
router.post("/pay", makePayment);

// Fetch payment by booking ID
router.get("/booking/:bookingId", getPaymentByBookingId);

// Admin: Get all payments
router.get("/all", getAllPayments);
export default router;
