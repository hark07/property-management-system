import User from "../models/User.js";

// ==============================
// Get All Users
// ==============================
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Single User
// ==============================
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,

      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==============================
// Update User Role
// ==============================
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found.",
      });
    }

    user.role = role;

    await user.save();

    res.status(200).json({
      success: true,

      message: "User role updated successfully.",

      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==============================
// Toggle User Status
// ==============================
export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found.",
      });
    }

    user.isActive = !user.isActive;

    await user.save();

    res.status(200).json({
      success: true,

      message: "User status updated.",

      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==============================
// Delete User
// ==============================
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found.",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,

      message: "User deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
