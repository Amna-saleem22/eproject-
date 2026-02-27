










import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Guest Registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      name,
      email,
      password,
      role: "guest", // always guest
    });

    res.status(201).json({
      message: "Registered Successfully",
      token: generateToken(user._id, user.role),
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN (Guest or Admin)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Email or Password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Email or Password" });

    res.status(200).json({
      message: "Login Successful",
      token: generateToken(user._id, user.role),
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getAllUsers = async (req, res) => {
  try {
    // ================= PAGINATION =================
    const page = parseInt(req.query.page) || 1;  // default page 1
    const limit = parseInt(req.query.limit) || 20; // default 20 users per page
    const skip = (page - 1) * limit;

    // ================= SEARCH =================
    const search = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    // ================= FETCH USERS =================
    const users = await User.find(search)
      .select("name email createdAt role") // only needed fields
      .sort({ createdAt: -1 })            // newest first
      .skip(skip)
      .limit(limit)
      .lean();

    const totalUsers = await User.countDocuments(search);

    res.status(200).json({
      users,
      page,
      limit,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users" });
  }
};