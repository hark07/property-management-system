import express from "express";

import {
  createNotification,
  getMyNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ====================================
// Notification Routes
// ====================================

// Create Notification
router.post("/", protect, createNotification);

// Get Logged In User Notifications
router.get("/", protect, getMyNotifications);

// Get Unread Notification Count
router.get("/unread-count", protect, getUnreadCount);

// Mark All Notifications as Read
router.put("/mark-all-read", protect, markAllAsRead);

// Mark Single Notification as Read
router.put("/:id/read", protect, markAsRead);

// Delete Notification
router.delete("/:id", protect, deleteNotification);

export default router;
