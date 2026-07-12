import Tenant from "../models/Tenant.js";

// Create Tenant
export const createTenant = async (req, res) => {
  try {
    const tenant = await Tenant.create(req.body);

    res.status(201).json({
      success: true,
      message: "Tenant assigned successfully.",
      tenant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Tenants
export const getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find()
      .populate("user", "name email")
      .populate("property", "title city");

    res.json({
      success: true,
      count: tenants.length,
      tenants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Tenant
export const getTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id)
      .populate("user", "name email")
      .populate("property", "title");

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found.",
      });
    }

    res.json({
      success: true,
      tenant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Tenant
export const updateTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found.",
      });
    }

    res.json({
      success: true,
      message: "Tenant updated successfully.",
      tenant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Tenant
export const deleteTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndDelete(req.params.id);

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found.",
      });
    }

    res.json({
      success: true,
      message: "Tenant removed successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
