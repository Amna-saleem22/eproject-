// routes/roomRoutes.js
import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { createRoom, getAllRooms } from "../controllers/roomController.js";

const router = express.Router();

router.post("/", protect, adminOnly, createRoom); // create room
router.get("/", protect, adminOnly, getAllRooms); // get all rooms

export default router;