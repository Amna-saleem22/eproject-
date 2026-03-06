import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import mongoose from "mongoose";

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
      booking,
    });

  } catch (error) {

    console.error("Create booking error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


/* ===============================
   GET BOOKING BY ID
================================ */
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid booking ID" });
    }

    const booking = await Booking.findById(id)
      .populate("user", "name email")
      .populate("assignedRoom");

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Derived fields calculation
    const roomsCount = booking.assignedRoom ? 1 : 0; // ya agar multiple rooms allow hai to us logic se
    const totalGuests = (booking.adults || 0) + (booking.children || 0);
    const nights =
      booking.checkInDate && booking.checkOutDate
        ? Math.ceil(
            (new Date(booking.checkOutDate) - new Date(booking.checkInDate)) /
              (1000 * 60 * 60 * 24)
          )
        : 1;

    res.status(200).json({
      success: true,
      booking: {
        ...booking._doc,
        roomsCount,
        totalGuests,
        nights,
      },
    });
  } catch (error) {
    console.error("Get booking error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   ADMIN CONFIRM BOOKING
================================ */
export const confirmBooking = async (req, res) => {
  try {

    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const room = await Room.findOne({
      type: booking.roomType,
      status: "available",
    });

    if (!room) {
      return res.status(400).json({
        success: false,
        message: "No rooms available",
      });
    }

    booking.status = "confirmed";
    booking.assignedRoom = room._id;

    room.status = "occupied";

    await booking.save();
    await room.save();

    res.json({
      success: true,
      message: "Booking confirmed and room assigned",
      booking,
    });

  } catch (error) {

    console.error("Confirm booking error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};








// ===================== GET USER BOOKINGS =====================
export const getMyBookings = async (req, res) => {
  try {
    // req.user._id should come from protect middleware
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ success: false, message: "Invalid user" });
    }

    const bookings = await Booking.find({ user: userId })
      .populate("assignedRoom", "roomNumber type") // get room details if assigned
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Get user bookings error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};












// ===================== CANCEL BOOKING =====================
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params; // Booking ID from frontend
    const userId = req.user._id;

    // 1️⃣ Find booking and make sure it belongs to the current user
    const booking = await Booking.findOne({ _id: id, user: userId }).populate("assignedRoom");

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // 2️⃣ Update booking status
    booking.status = "cancelled";

    // 3️⃣ Release assigned room if exists
    if (booking.assignedRoom) {
      const room = await Room.findById(booking.assignedRoom._id);
      if (room) {
        room.status = "available";
        await room.save();
      }
      booking.assignedRoom = null;
    }

    await booking.save();

    // 4️⃣ Emit socket event if using real-time updates (optional)
    // io.to(userId.toString()).emit("bookingUpdated", booking);

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};