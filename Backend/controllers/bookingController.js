import Booking from "../models/Booking.js";
import mongoose from "mongoose";

/* ===============================
   GET BOOKING BY ID
================================ */
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await Booking.findById(id).populate(
      "user",
      "name email"
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Fetch booking error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// controllers/bookingController.js
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("assignedRoom"); // ✅ populate assignedRoom
    res.status(200).json({ bookings });
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};
/* ===============================
   CREATE BOOKING
================================ */
export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      user: req.user._id,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   USER CANCEL BOOKING
================================ */
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not allowed",
      });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending bookings can be cancelled",
      });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled",
      booking,
    });
  } catch (error) {
    console.error("Update booking error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Step 1: Find available room of requested type
    let room = await Room.findOne({
      type: booking.roomType,
      status: "available",
    });

    let upgrade = false;
    let extraService = "";

    // Step 2: If not found → find higher type
    if (!room) {
      room = await Room.findOne({ status: "available" });

      if (room) {
        upgrade = true;
        extraService = "Free Breakfast Included 🍽️";
      }
    }

    if (!room) {
      return res.status(400).json({ message: "No rooms available" });
    }

    // Step 3: Assign room
    booking.status = "confirmed";
    booking.assignedRoom = room._id;
    booking.upgrade = upgrade;
    booking.extraService = extraService;

    await booking.save();

    res.json({ message: "Room Assigned Successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Error confirming booking" });
  }
};