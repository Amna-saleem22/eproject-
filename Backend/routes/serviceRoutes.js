import express from "express";
import {
  addService,
  getServices,
} from "../controllers/serviceController.js";

const router = express.Router();

// ✅ Add Service
router.post("/add", addService);

// ✅ Get All Services
router.get("/", getServices);

// ✅ Export Default
export default router;
