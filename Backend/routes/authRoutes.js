

// routes/authRoutes.js
import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { registerUser, loginUser ,getAllUsers} from "../controllers/authController.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser); // Always creates guest
router.post("/login", loginUser);

// ✅ Sirf admin fetch kar sakta hai
router.get("/all", protect, adminOnly, getAllUsers);

export default router;