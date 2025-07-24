import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// controllers/authController.js


export const register = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    // Only allow admin role creation if explicitly passed from backend/admin panel
    const role = isAdmin ? 'admin' : 'student';

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, role });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    // Send only required data
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      // ❌ Don’t send role to frontend
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    // 3. Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    // 4. Send user data (avoid password)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// backend/controllers/authController.js
export const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  // Hardcoded admin credentials
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin123"; // You can hash this too if needed

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {

    const token = jwt.sign(
      { username: "admin", role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )
    return res.status(200).json({
      success: true,
      token,
      message: "Admin login successful",
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid admin credentials",
    });
  }
};
