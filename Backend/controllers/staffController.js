import Staff from "../models/Staff.js";

// ✅ Create Staff (Admin Only)
export const createStaff = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if role is valid
    const validRoles = ["receptionist", "housekeeping", "manager", "admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) return res.status(400).json({ message: "Staff already exists" });

    const staff = await Staff.create({ name, email, password, role });
    res.status(201).json({ message: "Staff created successfully", staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get All Staff
export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find({});
    res.json({ staff });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};