// import Booking from "../models/Booking.js";

// // Get all bookings (Admin)
// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find()
//       .populate("user", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: bookings.length,
//       bookings
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: "Error fetching bookings",
//       error: error.message 
//     });
//   }
// };

// // Update booking status (Admin only - limited to confirmed/cancelled)
// export const updateBookingStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     // Only allow admin to set confirmed or cancelled
//     if (!["confirmed", "cancelled"].includes(status)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Invalid status. Only 'confirmed' or 'cancelled' allowed ❌" 
//       });
//     }

//     const booking = await Booking.findById(id);

//     if (!booking) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Booking not found ❌" 
//       });
//     }

//     // Prevent changing already cancelled or confirmed bookings
//     if (booking.status !== "pending") {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Cannot update booking with status: ${booking.status}. Only pending bookings can be modified. ❌` 
//       });
//     }

//     // Clear extra services if cancelling
//     if (status === "cancelled") {
//       booking.extraServices = [];
//     }

//     booking.status = status;
//     await booking.save();

//     // Populate user data for response
//     await booking.populate("user", "name email");

//     // Emit socket event for real-time updates (if using Socket.io)
//     const io = req.app.get('io');
//     if (io) {
//       // Emit to admin room
//       io.to('admin-room').emit('bookingUpdated', booking);
//       // Emit to specific user
//       io.to(`user-${booking.user._id}`).emit('bookingUpdated', booking);
//     }

//     res.json({
//       success: true,
//       message: status === "confirmed" ? "Booking confirmed ✅" : "Booking cancelled ❌",
//       booking,
//     });

//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: error.message 
//     });
//   }
// };

// // Bulk update (optional - for future use)
// export const bulkUpdateBookings = async (req, res) => {
//   try {
//     const { bookingIds, status } = req.body;

//     if (!["confirmed", "cancelled"].includes(status)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Invalid status ❌" 
//       });
//     }

//     const result = await Booking.updateMany(
//       { 
//         _id: { $in: bookingIds },
//         status: "pending" // Only update pending bookings
//       },
//       { status }
//     );

//     res.json({
//       success: true,
//       message: `Updated ${result.modifiedCount} bookings ✅`,
//       modifiedCount: result.modifiedCount
//     });

//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: error.message 
//     });
//   }
// };




// import Booking from "../models/Booking.js";

// // Get all bookings (Admin)
// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find()
//       .populate("user", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: bookings.length,
//       bookings
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: error.message 
//     });
//   }
// };

// // Update booking status (Admin only - limited to confirmed/cancelled)
// export const updateBookingStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     // Only allow admin to set confirmed or cancelled
//     if (!["confirmed", "cancelled"].includes(status)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Invalid status. Only 'confirmed' or 'cancelled' allowed ❌" 
//       });
//     }

//     const booking = await Booking.findById(id);

//     if (!booking) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Booking not found ❌" 
//       });
//     }

//     // Prevent changing already cancelled or confirmed bookings
//     if (booking.status !== "pending") {
//       return res.status(400).json({ 
//         success: false, 
//         message: `Cannot update booking with status: ${booking.status}. Only pending bookings can be modified. ❌` 
//       });
//     }

//     // Clear extra services if cancelling
//     if (status === "cancelled") {
//       booking.extraServices = [];
//     }

//     booking.status = status;
//     await booking.save();

//     // Populate user data for response
//     await booking.populate("user", "name email");

//     // ✅ Emit socket events for real-time updates
//     const io = req.app.get('io');
//     if (io) {
//       // Emit to admin room (all admins)
//       io.to('admin-room').emit('bookingUpdated', {
//         type: 'STATUS_CHANGE',
//         booking,
//         message: `Booking ${status} by admin`
//       });

//       // Emit to specific user
//       io.to(`user-${booking.user._id}`).emit('bookingUpdated', {
//         type: 'STATUS_CHANGE',
//         booking,
//         message: `Your booking has been ${status}`
//       });

//       console.log(`📡 Socket event emitted: Booking ${status} for user ${booking.user._id}`);
//     }

//     res.json({
//       success: true,
//       message: status === "confirmed" ? "Booking confirmed ✅" : "Booking cancelled ❌",
//       booking,
//     });

//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: error.message 
//     });
//   }
// };









import Booking from "../models/Booking.js";
// // Bulk update bookings (optional)
export const bulkUpdateBookings = async (req, res) => {
  try {
    const { bookingIds, status } = req.body;

    if (!["confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid status ❌" 
      });
    }

    const result = await Booking.updateMany(
      { 
        _id: { $in: bookingIds },
        status: "pending" // Only update pending bookings
      },
      { status }
    );

    // Get updated bookings for socket events
    const updatedBookings = await Booking.find({ 
      _id: { $in: bookingIds } 
    }).populate("user", "name email");

    // ✅ Emit socket events for each updated booking
    const io = req.app.get('io');
    if (io) {
      updatedBookings.forEach(booking => {
        io.to(`user-${booking.user._id}`).emit('bookingUpdated', {
          type: 'STATUS_CHANGE',
          booking,
          message: `Your booking has been ${status}`
        });
      });
      
      io.to('admin-room').emit('bulkBookingsUpdated', {
        count: result.modifiedCount,
        status,
        message: `${result.modifiedCount} bookings ${status}`
      });
    }

    res.json({
      success: true,
      message: `Updated ${result.modifiedCount} bookings ✅`,
      modifiedCount: result.modifiedCount
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};


// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const booking = await Booking.findById(id).populate("user", "name email");

    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    if (booking.status !== "pending") {
      return res.status(400).json({ success: false, message: "Only pending bookings can be updated" });
    }

    booking.status = status;
    if (status === "cancelled") booking.extraServices = [];
    await booking.save();

    // Emit socket updates
    const io = req.app.get("io");
    if (io) {
      io.to("admin-room").emit("bookingUpdated", { booking, message: `Booking ${status}` });
      io.to(`user-${booking.user._id}`).emit("bookingUpdated", { booking, message: `Your booking is ${status}` });
    }

    res.json({ success: true, message: `Booking ${status} successfully`, booking });
  } catch (error) {
    console.error("Error updating booking:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};