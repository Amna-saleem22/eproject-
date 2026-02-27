// controllers/roomController.js
import Room from "../models/Room.js";

// Create new room
export const createRoom = async (req, res) => {
  try {
    const { roomType, totalRooms, pricePerNight, description, amenities } = req.body;
    const newRoom = await Room.create({
      roomType,
      totalRooms,
      pricePerNight,
      description,
      amenities,
    });
    res.status(201).json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create room" });
  }
};

// Get all rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.status(200).json({ rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
};