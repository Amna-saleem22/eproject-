import Booking from "../models/Booking.js";
import User from "../models/User.js"; // ✅ Only once

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,

      // ✅ Logged-in user attach
      user: req.user._id,
    });

    res.status(201).json({
      message: "Booking Created Successfully ✅",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Booking not found ❌" });

    booking.status = "Confirmed";
    await booking.save();

    res.json({ message: "Booking Confirmed ✅", booking });

  } catch (error) {
    res.status(500).json({ message: "Server error ❌" });
  }
};

// ✅ Staff Dashboard ke liye pending bookings
export const getPendingBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ status: "Pending" });

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({ message: "Server Error ❌" });
  }
};


export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Booking not found ❌" });

    booking.status = "Cancelled";
    await booking.save();

    res.json({ message: "Booking Cancelled ❌", booking });

  } catch (error) {
    res.status(500).json({ message: "Server error ❌" });
  }
};




// ✅ Get my bookings (exclude cancelled so they don't show on dashboard)
export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({
    user: req.user._id,
    status: { $ne: "Cancelled" },
  }).sort({ createdAt: -1 });
  res.json(bookings);
};

// ✅ Get Single Booking By ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking Not Found ❌" });
    }

    // ✅ Only booking owner can view
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not Allowed ❌" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addExtraServices = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Booking Not Found ❌" });

    // ✅ Add Services Array
    booking.extraServices = req.body.extraServices;

    // ✅ Update Total Amount
    const servicesTotal = booking.extraServices.reduce(
      (sum, s) => sum + s.price,
      0
    );

    booking.totalAmount += servicesTotal;

    await booking.save();

    res.json({
      message: "Extra Services Added Successfully ✅",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// ✅ Update booking (status e.g. Cancelled, or full details with cost recalculation)
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking Not Found ❌" });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not Allowed ❌" });
    }

    const { status, guestName, phone, checkInDate, checkOutDate, adults, children, seniors, roomType, roomsCount, foodPackage } = req.body;

    // Cancel: update status and clear extra services (so they're removed/hidden)
    if (status === "Cancelled") {
      booking.status = "Cancelled";
      booking.extraServices = [];
      await booking.save();
      return res.json({ message: "Booking Cancelled ✅", booking });
    }

    // Optional status update
    if (status) booking.status = status;

    // Update details if provided (and recalculate costs)
    const hasDetails = [guestName, phone, checkInDate, checkOutDate, adults, children, seniors, roomType, roomsCount, foodPackage].some((v) => v !== undefined && v !== null);
    if (hasDetails) {
      if (guestName !== undefined) booking.guestName = guestName;
      if (phone !== undefined) booking.phone = phone;
      if (checkInDate !== undefined) booking.checkInDate = checkInDate;
      if (checkOutDate !== undefined) booking.checkOutDate = checkOutDate;
      if (adults !== undefined) booking.adults = Number(adults);
      if (children !== undefined) booking.children = Number(children);
      if (seniors !== undefined) booking.seniors = Number(seniors);
      if (roomType !== undefined) booking.roomType = roomType;
      if (roomsCount !== undefined) booking.roomsCount = Number(roomsCount);
      if (foodPackage !== undefined) booking.foodPackage = foodPackage;

      const totalGuests = (booking.adults || 0) + (booking.children || 0) + (booking.seniors || 0);
      booking.totalGuests = totalGuests;

      const checkIn = new Date(booking.checkInDate);
      const checkOut = new Date(booking.checkOutDate);
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      if (nights <= 0) {
        return res.status(400).json({ message: "Check-Out must be after Check-In" });
      }
      booking.nights = nights;

      const roomPrices = { Standard: 5000, Deluxe: 8000, Suite: 12000 };
      const foodPrices = { NoFood: 0, Breakfast: 500, HalfBoard: 1500, FullBoard: 2500 };
      booking.roomCost = roomPrices[booking.roomType] * nights * (booking.roomsCount || 1);
      booking.foodCost = foodPrices[booking.foodPackage] * totalGuests * nights;
      booking.totalAmount = booking.roomCost + booking.foodCost;
    }

    await booking.save();

    res.json({
      message: "Booking Updated Successfully ✅",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

