// controllers/adminController.js
import User from "../models/User.js";

// ============================
// Admin Only: Create Staff User
// ============================
export const createStaff = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Please provide name, email and password" 
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        success: false,
        message: "User with this email already exists" 
      });
    }

    // Validate password strength (optional but recommended)
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: "Password must be at least 6 characters" 
      });
    }

    // Create staff user
    const staff = await User.create({
      name,
      email,
      password, // Will be hashed by pre-save hook
      role: "staff", // Explicitly set role to staff
    });

    // Remove password from response
    const staffResponse = staff.toObject();
    delete staffResponse.password;

    res.status(201).json({
      success: true,
      message: "Staff created successfully",
      staff: staffResponse,
    });

  } catch (error) {
    console.error("Create staff error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server Error", 
      error: error.message 
    });
  }
};