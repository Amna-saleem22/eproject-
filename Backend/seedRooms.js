import mongoose from "mongoose";
import dotenv from "dotenv";
import Room from "./models/Room.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const rooms = [];

for (let i = 1; i <= 20; i++) {
  rooms.push({
    roomNumber: 100 + i,
    floor: i <= 10 ? 1 : 2,
    type: i <= 10 ? "Standard" :  "Deluxe",
    price: i <= 10 ? 3000 : 5000,
  });
}

await Room.deleteMany();
await Room.insertMany(rooms);

console.log("20 Rooms Created Successfully ✅");
process.exit();