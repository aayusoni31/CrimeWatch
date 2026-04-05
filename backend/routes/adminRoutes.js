// /api/admin/*
import express from "express";
import User from "../models/User.js";
import Incident from "../models/Incident.js";
import Notification from "../models/Notification.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

// GET /api/admin/users — all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/admin/pending-police — police accounts waiting approval
router.get("/pending-police", async (req, res) => {
  try {
    const pending = await User.find({ role: "police", status: "pending" });
    res.json(pending);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /api/admin/approve-police/:id — approve police account
router.patch("/approve-police/:id", async (req, res) => {
  try {
    const officer = await User.findByIdAndUpdate(
      req.params.id,
      { status: "active" },
      { new: true },
    );
    if (!officer) return res.status(404).json({ message: "User not found" });

    // Notify the officer
    await Notification.create({
      recipient: officer._id,
      type: "account_approved",
      title: "Account Approved",
      message: "Your police account has been approved. You can now log in.",
    });

    req.io.to(`user_${officer._id}`).emit("account_approved");
    res.json({ message: "Police account approved.", officer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /api/admin/reject-police/:id — reject police account
router.patch("/reject-police/:id", async (req, res) => {
  try {
    const officer = await User.findByIdAndUpdate(
      req.params.id,
      { status: "suspended" },
      { new: true },
    );

    await Notification.create({
      recipient: officer._id,
      type: "account_rejected",
      title: "Account Rejected",
      message:
        "Your police account registration was rejected. Contact your department administrator.",
    });

    res.json({ message: "Police account rejected." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/admin/analytics — dashboard stats
router.get("/analytics", async (req, res) => {
  try {
    const [totalIncidents, resolved, critical, totalUsers, pendingPolice] =
      await Promise.all([
        Incident.countDocuments(),
        Incident.countDocuments({ status: "resolved" }),
        Incident.countDocuments({ severity: "critical" }),
        User.countDocuments(),
        User.countDocuments({ role: "police", status: "pending" }),
      ]);

    const byCategory = await Incident.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const bySeverity = await Incident.aggregate([
      { $group: { _id: "$severity", count: { $sum: 1 } } },
    ]);

    res.json({
      totalIncidents,
      resolved,
      critical,
      resolutionRate: totalIncidents
        ? Math.round((resolved / totalIncidents) * 100)
        : 0,
      totalUsers,
      pendingPolice,
      byCategory,
      bySeverity,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/admin/incidents/:id — admin can delete any incident
router.delete("/incidents/:id", async (req, res) => {
  try {
    await Incident.findByIdAndDelete(req.params.id);
    req.io.emit("incident_deleted", { id: req.params.id });
    res.json({ message: "Incident deleted by admin." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
