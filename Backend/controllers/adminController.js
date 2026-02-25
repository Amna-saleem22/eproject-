import Booking from "../models/Booking.js";

// Get all bookings (Admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Confirm a booking (Admin)
export const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Booking not found ❌" });

    booking.status = "confirmed";
    await booking.save();

    res.json({
      message: "Booking confirmed ✅",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel a booking (Admin)
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Booking not found ❌" });

    booking.status = "cancelled";
    booking.extraServices = []; // optional
    await booking.save();

    res.json({
      message: "Booking cancelled ❌",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // Update any booking status or details (Admin)
// export const updateBookingStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     if (!["pending", "confirmed", "cancelled"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status value ❌" });
//     }

//     const booking = await Booking.findById(req.params.id);

//     if (!booking) return res.status(404).json({ message: "Booking not found ❌" });

//     booking.status = status;
//     await booking.save();

//     res.json({ message: "Booking status updated ✅", booking });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};