const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Change this to a secure secret

// 📌 Register New User
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    let userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
      return res.status(400).json({ message: "Email or phone number already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, phone, password: hashedPassword, role });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    res.status(500).json({ message: "Server Error!", error: error.message });
  }
});

// 📌 Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials!" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, user });

  } catch (error) {
    res.status(500).json({ message: "Server Error!", error: error.message });
  }
});

// 📌 Get User Profile (Protected Route)
router.get("/profile", async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Denied. No Token Provided!" });

    const verified = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(verified.id).select("-password");
    
    if (!user) return res.status(404).json({ message: "User not found!" });

    res.status(200).json(user);

  } catch (error) {
    res.status(401).json({ message: "Invalid Token!" });
  }
});

module.exports = router;
