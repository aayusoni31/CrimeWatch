// push notification records
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    // Who receives this notification
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // What type of notification
    type: {
      type: String,
      enum: [
        "incident_reported", // new incident near you
        "status_updated", // your report status changed
        "officer_dispatched", // police dispatched to your report
        "report_resolved", // your report marked resolved
        "account_approved", // police account approved by admin
        "account_rejected", // police account rejected
        "new_police_pending", // admin: new police account waiting approval
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    // Link to the related incident or user
    relatedIncident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      default: null,
    },
    relatedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Notification", notificationSchema);
