import mongoose from "mongoose";
import dotenv from "dotenv";
import Room from "./models/Room.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const rooms = [];

// Standard & Deluxe Rooms (20 rooms)
for (let i = 1; i <= 20; i++) {
  rooms.push({
    roomNumber: 100 + i,
    floor: i <= 10 ? 1 : 2,
    type: i <= 10 ? "Standard" : "Deluxe",
    price: i <= 10 ? 3000 : 5000,
  });
}

// Presidential Suite (5 rooms)
for (let i = 1; i <= 5; i++) {
  rooms.push({
    roomNumber: 120 + i + 20, // 121, 122, 123, 124, 125
    floor: 3,
    type: "Presidential Suite",
    price: 10000,
  });
}

await Room.deleteMany();
await Room.insertMany(rooms);

console.log("25 Rooms Created Successfully ✅");
process.exit();