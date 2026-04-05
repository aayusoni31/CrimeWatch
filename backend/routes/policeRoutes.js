// /api/police/*
import express from "express";
import Incident from "../models/Incident.js";
import Notification from "../models/Notification.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// All police routes require login and police or admin role
router.use(protect);
router.use(authorize("police", "admin"));

// GET /api/police/incidents — all incidents for police view (full details)
router.get("/incidents", async (req, res) => {
  try {
    const incidents = await Incident.find()
      .sort({ createdAt: -1 })
      .populate("reportedBy", "name phone email")
      .populate("assignedOfficer", "name badgeId");
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /api/police/incidents/:id/status — update incident status
router.patch("/incidents/:id/status", async (req, res) => {
  try {
    const { status, updateText } = req.body;
    const incident = await Incident.findById(req.params.id).populate(
      "reportedBy",
      "name",
    );

    if (!incident)
      return res.status(404).json({ message: "Incident not found" });

    incident.status = status;
    incident.updates.push({
      text: updateText || `Status updated to ${status}`,
      by: req.user.name,
      byRole: req.user.role,
    });

    if (status === "under_investigation") {
      incident.assignedOfficer = req.user._id;
    }

    await incident.save();

    // Notify the reporter
    await Notification.create({
      recipient: incident.reportedBy._id,
      type: "status_updated",
      title: "Report Status Updated",
      message: `Your report "${incident.title}" is now ${status.replace("_", " ")}.`,
      relatedIncident: incident._id,
    });

    // Emit socket update
    req.io.emit("incident_updated", {
      id: incident._id,
      status,
      updates: incident.updates,
    });
    req.io.to(`user_${incident.reportedBy._id}`).emit("new_notification", {
      title: "Report Updated",
      message: `Your report status changed to ${status}`,
    });

    res.json(incident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
