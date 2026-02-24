

// routes/authRoutes.js
import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser); // Always creates guest
router.post("/login", loginUser);

export default router;