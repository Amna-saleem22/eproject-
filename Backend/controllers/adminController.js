import Booking from "../models/Booking.js";
import Room from "../models/Room.js";







// GET /api/admin/stats
export const getAdminStats = async (req, res) => {
  try {
    // Total rooms
    const totalRooms = await Room.countDocuments();
    const occupiedRooms = await Room.countDocuments({ status: "occupied" });
    const availableRooms = await Room.countDocuments({ status: "available" });

    // Total bookings & guests
    const allBookings = await Booking.find();
    const totalBookings = allBookings.length;
    const totalGuests = allBookings.reduce((sum, b) => sum + (b.totalGuests || 0), 0);

    // Total revenue
    const totalRevenue = allBookings
      .filter(b => ["confirmed", "checked-out"].includes(b.status))
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    // Monthly Revenue (last 6 months)
    const monthlyRevenueAgg = await Booking.aggregate([
      { $match: { status: { $in: ["confirmed", "checked-out"] } } },
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 },
    ]);

    // Format for frontend
    const monthlyRevenue = monthlyRevenueAgg
      .map(item => ({
        month: `${item._id.month}-${item._id.year}`, // e.g., 3-2026
        revenue: item.revenue,
      }))
      .reverse(); // oldest month first

    res.json({
      success: true,
      stats: {
        totalRooms,
        occupiedRooms,
        availableRooms,
        totalBookings,
        totalGuests,
        totalRevenue,
        monthlyRevenue,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};



// ✅ Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("assignedRoom")
      .sort({ createdAt: -1 });
    res.status(200).json({ bookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Confirm booking + auto-assign room
export const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Step 1: Find room of requested type
    let room = await Room.findOne({ type: booking.roomType, status: "available" });
    let upgrade = false, extraService = "";

    // Step 2: Upgrade if no room of same type
    if (!room) {
      room = await Room.findOne({ status: "available" });
      if (room) {
        upgrade = true;
        extraService = "Free Breakfast Included 🍽️";
      }
    }

    if (!room) return res.status(400).json({ message: "No rooms available" });

    // Step 3: Assign room & mark occupied
    booking.status = "confirmed";
    booking.assignedRoom = room._id;
    booking.upgrade = upgrade;
    booking.extraService = extraService;
    room.status = "occupied";

    await room.save();
    await booking.save();

    res.json({ message: "Room assigned successfully", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error confirming booking" });
  }
};

// ✅ Check-In
export const checkInBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("assignedRoom");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    booking.status = "checked-in";
    booking.assignedRoom.status = "occupied";
    await booking.assignedRoom.save();
    await booking.save();
    res.json({ message: "Guest Checked-In", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Check-Out
export const checkOutBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("assignedRoom");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    booking.status = "checked-out";
    booking.assignedRoom.status = "available";
    await booking.assignedRoom.save();
    await booking.save();
    res.json({ message: "Guest Checked-Out", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Cancel / general update
export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const { status } = req.body;
    if (!["confirmed", "cancelled"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    booking.status = status;
    if (status === "cancelled" && booking.assignedRoom) {
      const room = await Room.findById(booking.assignedRoom);
      room.status = "available";
      await room.save();
      booking.assignedRoom = null;
    }
    await booking.save();

    res.json({ message: `Booking ${status}`, booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};