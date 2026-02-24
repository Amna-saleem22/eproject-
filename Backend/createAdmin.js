import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const createAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: "admin@example.com" });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = await User.create({
      name: "Super Admin",
      email: "adminAmna@example.com",
      password: "Admin@123", // will auto hash
      role: "admin",
    });

    console.log("Admin created successfully ✅");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();