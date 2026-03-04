import express from "express";
import {
  createOrGetConversation,
  getMessages,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/conversation", createOrGetConversation);
router.get("/messages/:conversationId", getMessages);

export default router;