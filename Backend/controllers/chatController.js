import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

// 1️⃣ Create or Get Conversation
export const createOrGetConversation = async (req, res) => {
  try {
    const { guestId, adminId } = req.body;

    let conversation = await Conversation.findOne({
      guestId,
      adminId,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        guestId,
        adminId,
      });
    }

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: "Error creating conversation" });
  }
};

// 2️⃣ Get Messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
};