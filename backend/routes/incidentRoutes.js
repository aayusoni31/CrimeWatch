// /api/incidents/*
import express from "express";
import Incident from "../models/Incident.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/incidents — get all incidents (public, but reporter identity hidden)
router.get("/", async (req, res) => {
  try {
    const { severity, status, limit = 50 } = req.query;
    const filter = {};
    if (severity) filter.severity = severity;
    if (status) filter.status = status;

    const incidents = await Incident.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .select("-suspectInfo -reportedBy"); // hide sensitive fields from public

    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/incidents/:id — single incident
// Police and admin see full details, public sees anonymized version
router.get("/:id", async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id)
      .populate("reportedBy", "name phone email role")
      .populate("assignedOfficer", "name badgeId");

    if (!incident)
      return res.status(404).json({ message: "Incident not found" });

    // Check if requester is police or admin via token
    let isAuthorized = false;
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const jwt = await import("jsonwebtoken");
        const decoded = jwt.default.verify(
          authHeader.split(" ")[1],
          process.env.JWT_SECRET,
        );
        const user = await User.findById(decoded.id);
        if (user && (user.role === "police" || user.role === "admin")) {
          isAuthorized = true;
        }
      }
    } catch (_) {}

    if (!isAuthorized) {
      // Return anonymized version for public
      const publicIncident = incident.toObject();
      publicIncident.reportedBy = { name: "Anonymous Citizen" };
      publicIncident.suspectInfo = null;
      return res.json(publicIncident);
    }

    res.json(incident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/incidents — create new incident (logged in users only)
router.post("/", protect, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      severity,
      location,
      suspectInfo,
      photo,
    } = req.body;

    const incident = await Incident.create({
      title,
      description,
      category,
      severity,
      location,
      suspectInfo: suspectInfo || null,
      photo: photo || null,
      reportedBy: req.user._id,
      updates: [
        { text: "Report received and logged.", by: "System", byRole: "system" },
      ],
    });

    // Emit to all connected Socket.io clients immediately
    req.io.emit("new_incident", {
      ...incident.toObject(),
      reportedBy: { name: "Anonymous Citizen" }, // anonymize for socket broadcast
    });

    // Notify police officers in the area (simplified — notify all active police)
    const officers = await User.find({ role: "police", status: "active" });
    const notifications = officers.map((officer) => ({
      recipient: officer._id,
      type: "incident_reported",
      title: `New ${severity.toUpperCase()} Incident`,
      message: `${category}: ${title} reported at ${location.address || "Unknown location"}`,
      relatedIncident: incident._id,
    }));
    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
      // Emit notification to each officer's socket room
      officers.forEach((officer) => {
        req.io.to(`user_${officer._id}`).emit("new_notification", {
          title: `New ${severity} incident`,
          message: title,
        });
      });
    }

    res.status(201).json(incident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/incidents/:id — only reporter or admin can delete
router.delete("/:id", protect, async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident)
      return res.status(404).json({ message: "Incident not found" });

    // Check ownership or admin
    const isOwner = incident.reportedBy.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        message:
          "Only the person who filed this report or an admin can delete it.",
      });
    }

    await incident.deleteOne();
    req.io.emit("incident_deleted", { id: req.params.id });
    res.json({ message: "Incident deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/incidents/my/reports — citizen sees their own reports
router.get("/my/reports", protect, async (req, res) => {
  try {
    const incidents = await Incident.find({ reportedBy: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
