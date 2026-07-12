import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedStaff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    issueTitle: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Emergency"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },

    images: [
      {
        type: String,
      },
    ],

    resolutionNote: {
      type: String,
      default: "",
    },

    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Maintenance", maintenanceSchema);
