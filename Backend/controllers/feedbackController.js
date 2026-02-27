import Feedback from "../models/Feedback.js";

// Guest submit feedback
export const submitFeedback = async (req, res) => {
  try {
    const { message, rating } = req.body;

    if (!message) return res.status(400).json({ message: "Feedback cannot be empty" });
    if (!rating || rating < 1 || rating > 5)
      return res.status(400).json({ message: "Rating must be between 1 and 5" });

    const feedback = await Feedback.create({
      user: req.user._id,   // logged-in user
      message,
      rating,
    });

    // populate user name automatically
    await feedback.populate("user", "name");

    res.status(201).json({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin fetch all feedback
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("user", "name email").sort({ createdAt: -1 });
    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};