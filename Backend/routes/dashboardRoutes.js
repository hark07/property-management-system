import express from "express";

import {
  adminDashboard,
  ownerDashboard,
  tenantDashboard,
  staffDashboard,
} from "../controllers/dashboardController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin Dashboard
router.get("/admin", protect, adminDashboard);

// Owner Dashboard
router.get("/owner", protect, ownerDashboard);

// Tenant Dashboard
router.get("/tenant", protect, tenantDashboard);

// Staff Dashboard
router.get("/staff", protect, staffDashboard);

export default router;
