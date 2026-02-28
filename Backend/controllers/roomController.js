// // controllers/roomController.js
// import Room from "../models/Room.js";

// // Create new room
// export const createRoom = async (req, res) => {
//   try {
//     const { roomType, totalRooms, pricePerNight, description, amenities } = req.body;
//     const newRoom = await Room.create({
//       roomType,
//       totalRooms,
//       pricePerNight,
//       description,
//       amenities,
//     });
//     res.status(201).json({ message: "Room created successfully", room: newRoom });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to create room" });
//   }
// };

// // Get all rooms
// export const getAllRooms = async (req, res) => {
//   try {
//     const rooms = await Room.find({});
//     res.status(200).json({ rooms });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to fetch rooms" });
//   }
// };


import Room from "../models/Room.js";


// ✅ Get All Rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ roomNumber: 1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms" });
  }
};


// ✅ Create Single Room (Manual Add)
export const createRoom = async (req, res) => {
  try {
    const { roomNumber, floor, type, price, description } = req.body;

    const existing = await Room.findOne({ roomNumber });
    if (existing) {
      return res.status(400).json({ message: "Room number already exists" });
    }

    const room = await Room.create({
      roomNumber,
      floor,
      type,
      price,
      description,
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: "Error creating room" });
  }
};


// ✅ Update Room Status (For Maintenance etc)
export const updateRoomStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    room.status = status;
    await room.save();

    res.json({ message: "Room status updated", room });
  } catch (error) {
    res.status(500).json({ message: "Error updating room status" });
  }
};