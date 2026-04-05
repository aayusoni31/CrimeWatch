// incident reports schema
import mongoose from "mongoose";

const updateSchema = new mongoose.Schema({
  text: { type: String, required: true },
  by: { type: String, required: true },
  byRole: { type: String, enum: ["citizen", "police", "admin", "system"] },
  createdAt: { type: Date, default: Date.now },
});

const incidentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: 2000,
    },
    category: {
      type: String,
      enum: [
        "Accident",
        "Theft",
        "Assault",
        "Suspicious Activity",
        "Fire",
        "Infrastructure",
        "Harassment",
        "Other",
      ],
      required: true,
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      required: true,
    },
    status: {
      type: String,
      enum: ["reported", "under_investigation", "resolved", "rejected"],
      default: "reported",
    },
    // GeoJSON point for map coordinates
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
      address: {
        type: String,
        default: "",
      },
    },
    // Reporter — stored here but never sent to public API responses
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Suspect information — only visible to police and admin
    suspectInfo: {
      type: String,
      default: null,
      maxlength: 1000,
    },
    // Cloudinary photo URL
    photo: {
      type: String,
      default: null,
    },
    // AI-generated summary from Gemini
    aiSummary: {
      type: String,
      default: null,
    },
    // Assigned police station
    policeStation: {
      type: String,
      default: null,
    },
    // Assigned officer
    assignedOfficer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    // Timeline updates
    updates: [updateSchema],
    // Is this a duplicate — detected by Gemini AI
    isDuplicate: {
      type: Boolean,
      default: false,
    },
    duplicateOf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      default: null,
    },
    // Number of citizens who confirmed this incident
    confirmations: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// Create geospatial index for location-based queries
incidentSchema.index({ location: "2dsphere" });

export default mongoose.model("Incident", incidentSchema);
