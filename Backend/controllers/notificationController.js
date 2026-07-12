import Notification from "../models/Notification.js";
import { getIO } from "../socket/socket.js";

// ====================================
// Create Notification
// ====================================
export const createNotification = async (req, res) => {
  try {
    const { user, title, message, type, link, sender } = req.body;

    const notification = await Notification.create({
      user,
      title,
      message,
      type,
      link,
      sender,
    });

    const populatedNotification = await Notification.findById(notification._id)
      .populate("user", "name email")
      .populate("sender", "name email");

    getIO().emit("notificationCreated", populatedNotification);

    res.status(201).json({
      success: true,
      message: "Notification created successfully.",
      notification: populatedNotification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====================================
// Get Logged In User Notifications
// ====================================
export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id,
    })
      .populate("sender", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====================================
// Get Unread Count
// ====================================
export const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      user: req.user._id,
      status: "Unread",
    });

    res.status(200).json({
      success: true,
      unread: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====================================
// Mark One Notification as Read
// ====================================
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        status: "Read",
      },
      {
        new: true,
      },
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    getIO().emit("notificationUpdated", notification);

    res.status(200).json({
      success: true,
      message: "Notification marked as read.",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====================================
// Mark All Notifications as Read
// ====================================
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        user: req.user._id,
        status: "Unread",
      },
      {
        status: "Read",
      },
    );

    getIO().emit("notificationsRead", {
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      message: "All notifications marked as read.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====================================
// Delete Notification
// ====================================
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    getIO().emit("notificationDeleted", {
      id: req.params.id,
    });

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
