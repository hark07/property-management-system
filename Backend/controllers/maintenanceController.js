import Maintenance from "../models/Maintenance.js";
import { getIO } from "../socket/socket.js";
import createNotification from "../utils/createNotification.js";

// ==============================
// Create Maintenance Request
// ==============================
export const createMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.create({
      ...req.body,
      tenant: req.user._id,
    });

    // Real-time maintenance event
    getIO().emit("maintenanceCreated", maintenance);

    // Notification for tenant
    await createNotification({
      user: req.user._id,
      title: "Maintenance Request Created",
      message: "Your maintenance request has been submitted successfully.",
      type: "Maintenance",
      link: "/maintenance",
    });

    res.status(201).json({
      success: true,
      message: "Maintenance request created successfully.",
      maintenance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get All Maintenance Requests
// ==============================
export const getMaintenances = async (req, res) => {
  try {
    const maintenances = await Maintenance.find()
      .populate("tenant", "name email")
      .populate("property", "title")
      .populate("assignedStaff", "name email");

    res.status(200).json({
      success: true,
      count: maintenances.length,
      maintenances,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Single Maintenance Request
// ==============================
export const getMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id)
      .populate("tenant", "name email")
      .populate("property", "title")
      .populate("assignedStaff", "name email");

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        message: "Maintenance request not found.",
      });
    }

    res.status(200).json({
      success: true,
      maintenance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Update Maintenance Request
// ==============================
export const updateMaintenance = async (req, res) => {
  try {
    const oldMaintenance = await Maintenance.findById(req.params.id);

    const maintenance = await Maintenance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    )
      .populate("tenant", "name email")
      .populate("property", "title")
      .populate("assignedStaff", "name email");

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        message: "Maintenance request not found.",
      });
    }

    // Real-time update
    getIO().emit("maintenanceUpdated", maintenance);

    // Status changed notification
    if (oldMaintenance.status !== maintenance.status) {
      await createNotification({
        user: maintenance.tenant._id,

        title: "Maintenance Status Updated",

        message: `Your maintenance request status is now ${maintenance.status}.`,

        type: "Maintenance",

        link: "/maintenance",
      });
    }

    // Completed event

    if (maintenance.status === "Completed") {
      getIO().emit("maintenanceCompleted", maintenance);
    }

    res.status(200).json({
      success: true,

      message: "Maintenance updated successfully.",

      maintenance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==============================
// Delete Maintenance Request
// ==============================
export const deleteMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.findByIdAndDelete(req.params.id);

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        message: "Maintenance request not found.",
      });
    }

    // Real-time event
    getIO().emit("maintenanceDeleted", {
      id: req.params.id,
    });

    res.status(200).json({
      success: true,
      message: "Maintenance deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
