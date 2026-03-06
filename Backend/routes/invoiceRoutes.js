// routes/invoiceRoutes.js
import express from "express";
import { getInvoiceByBooking } from "../controllers/invoiceController.js";

const router = express.Router();

// Get invoice by booking ID
router.get("/:bookingId", getInvoiceByBooking);

export default router;