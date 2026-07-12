import User from "../models/User.js";
import Property from "../models/Property.js";
import Tenant from "../models/Tenant.js";
import Maintenance from "../models/Maintenance.js";
import Amenity from "../models/Amenity.js";
import Booking from "../models/Booking.js";

// ======================
// Admin Dashboard
// ======================
export const adminDashboard = async (req, res) => {
  try {
    const [users, properties, tenants, maintenances, amenities, bookings] =
      await Promise.all([
        User.countDocuments(),
        Property.countDocuments(),
        Tenant.countDocuments(),
        Maintenance.countDocuments(),
        Amenity.countDocuments(),
        Booking.countDocuments(),
      ]);

    const pendingMaintenance = await Maintenance.countDocuments({
      status: "Pending",
    });

    const completedMaintenance = await Maintenance.countDocuments({
      status: "Completed",
    });

    const pendingBookings = await Booking.countDocuments({
      status: "Pending",
    });

    const approvedBookings = await Booking.countDocuments({
      status: "Approved",
    });

    res.status(200).json({
      success: true,
      dashboard: {
        users,
        properties,
        tenants,
        maintenances,
        amenities,
        bookings,
        pendingMaintenance,
        completedMaintenance,
        pendingBookings,
        approvedBookings,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Owner Dashboard
// ======================
export const ownerDashboard = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const ownerProperties = await Property.find({
      owner: ownerId,
    }).select("_id");

    const propertyIds = ownerProperties.map((p) => p._id);

    const totalProperties = propertyIds.length;

    const totalMaintenance = await Maintenance.countDocuments({
      property: {
        $in: propertyIds,
      },
    });

    const totalBookings = await Booking.countDocuments({
      property: {
        $in: propertyIds,
      },
    });

    res.json({
      success: true,
      dashboard: {
        totalProperties,
        totalMaintenance,
        totalBookings,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Tenant Dashboard
// ======================
export const tenantDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const maintenanceRequests = await Maintenance.countDocuments({
      tenant: userId,
    });

    const bookings = await Booking.countDocuments({
      tenant: userId,
    });

    res.json({
      success: true,
      dashboard: {
        maintenanceRequests,
        bookings,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Staff Dashboard
// ======================
export const staffDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const assigned = await Maintenance.countDocuments({
      assignedStaff: userId,
    });

    const completed = await Maintenance.countDocuments({
      assignedStaff: userId,
      status: "Completed",
    });

    const inProgress = await Maintenance.countDocuments({
      assignedStaff: userId,
      status: "In Progress",
    });

    res.json({
      success: true,
      dashboard: {
        assigned,
        completed,
        inProgress,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
