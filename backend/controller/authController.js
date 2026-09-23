import auth from "../models/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "sweetstore_super_secret_jwt_key_2026";
const ADMIN_EMAIL = "nanthakumar2006geetha02@gmail.com";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please fill in all fields (name, email, password)" });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = await auth.findOne({ email: cleanEmail });

    if (existing) {
      return res.status(400).json({ success: false, message: "An account with this email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const role = cleanEmail === ADMIN_EMAIL ? "admin" : "user";
    const newUser = new auth({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role
    });

    await newUser.save();

    // Generate token
    const token = jwt.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ success: false, message: "Registration failed: " + err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide both email and password" });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await auth.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(400).json({ success: false, message: "No account found with this email" });
    }

    // Check hashed password (and fallback for legacy plaintext)
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch {
      isMatch = false;
    }

    if (!isMatch && user.password === password) {
      isMatch = true;
      // Upgrade plaintext password to bcrypt hash
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
    }

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Ensure role is admin if it matches admin email
    if (cleanEmail === ADMIN_EMAIL && user.role !== "admin") {
      user.role = "admin";
      await user.save();
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ success: false, message: "Login failed: " + err.message });
  }
};