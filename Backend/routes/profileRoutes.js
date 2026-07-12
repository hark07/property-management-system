import express from "express";

import {
  getProfile,
  updateProfile,
  changePassword,
  updateAvatar,
} from "../controllers/profileController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ===============================
// Profile Routes
// ===============================

// Get Logged In User Profile
router.get("/", protect, getProfile);

// Update Profile
router.put("/", protect, updateProfile);

// Change Password
router.put("/change-password", protect, changePassword);

// Update Avatar
router.put("/avatar", protect, updateAvatar);

export default router;
