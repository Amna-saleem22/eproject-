import express from "express";
import { makePayment, getPaymentByBookingId } from "../controllers/paymentController.js";

const router = express.Router();

// Create a payment
router.post("/pay", makePayment);

// Fetch payment by booking ID
router.get("/booking/:bookingId", getPaymentByBookingId);

export default router;
