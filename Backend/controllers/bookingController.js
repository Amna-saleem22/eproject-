import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    res.status(201).json({
      message: "Booking Created Successfully ✅",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    res.json(booking);
  } catch (error) {
    res.status(404).json({ message: "Booking Not Found ❌" });
  }
};
