import express from "express";
import { createStaff, getAllStaff } from "../controllers/staffController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin only
router.post("/create", protect, adminOnly, createStaff);
router.get("/all", protect, adminOnly, getAllStaff);

export default router;