import express from "express";
import {
  submitContactForm,
  getAllContacts,
} from "../controllers/contactController.js";

const router = express.Router();

// Guest submits contact form
router.post("/send", submitContactForm);

// Admin gets all contact messages
router.get("/all", getAllContacts);

export default router;