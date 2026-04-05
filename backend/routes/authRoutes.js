// /api/auth/*
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password, role, badgeId, adminCode } = req.body;

    // Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Admin registration requires secret code
    if (role === "admin") {
      if (adminCode !== process.env.ADMIN_CODE) {
        return res.status(403).json({ message: "Invalid admin access code." });
      }
    }

    // Police registration requires badge ID
    if (role === "police" && !badgeId) {
      return res
        .status(400)
        .json({ message: "Badge ID is required for police." });
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: role || "citizen",
      badgeId: badgeId || null,
      status: role === "police" ? "pending" : "active",
    });

    // If police registered, notify all admins
    if (role === "police") {
      const admins = await User.find({ role: "admin", status: "active" });
      const notifications = admins.map((admin) => ({
        recipient: admin._id,
        type: "new_police_pending",
        title: "New Police Registration",
        message: `Officer ${name} (Badge: ${badgeId}) has registered and needs approval.`,
        relatedUser: user._id,
      }));
      if (notifications.length > 0) {
        await Notification.insertMany(notifications);
      }

      return res.status(201).json({
        message:
          "Registration successful. Your account is pending admin approval. You will be notified once approved.",
        pending: true,
      });
    }

    const token = generateToken(user._id);
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (user.status === "pending") {
      return res.status(403).json({
        message: "Your account is pending admin approval. Please wait.",
      });
    }

    if (user.status === "suspended") {
      return res
        .status(403)
        .json({ message: "Your account has been suspended." });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const token = generateToken(user._id);
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/auth/me — get current user
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

// GET /api/auth/notifications — get my notifications
router.get("/notifications", protect, async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /api/auth/notifications/:id/read
router.patch("/notifications/:id/read", protect, async (req, res) => {
  try {
    await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user._id },
      { read: true },
    );
    res.json({ message: "Marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
