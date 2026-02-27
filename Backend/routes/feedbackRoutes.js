import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { submitFeedback, getAllFeedbacks } from "../controllers/feedbackController.js";

const router = express.Router();

// Guest submit feedback
router.post("/", protect, submitFeedback);

// Admin fetch all feedback
router.get("/all", protect, adminOnly, getAllFeedbacks);

export default router;