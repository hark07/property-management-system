import express from "express";

import {
  getUsers,
  getUser,
  updateUserRole,
  toggleUserStatus,
  deleteUser,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==============================
// Admin User Routes
// ==============================

// Get All Users
router.get("/", protect, getUsers);

// Get Single User
router.get("/:id", protect, getUser);

// Update User Role
router.put("/:id/role", protect, updateUserRole);

// Activate / Deactivate User
router.put("/:id/status", protect, toggleUserStatus);

// Delete User
router.delete("/:id", protect, deleteUser);

export default router;
