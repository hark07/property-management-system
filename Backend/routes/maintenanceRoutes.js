import express from "express";

import {
  createMaintenance,
  getMaintenances,
  getMaintenance,
  updateMaintenance,
  deleteMaintenance,
} from "../controllers/maintenanceController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMaintenances);

router.get("/:id", protect, getMaintenance);

router.post("/", protect, createMaintenance);

router.put("/:id", protect, updateMaintenance);

router.delete("/:id", protect, deleteMaintenance);

export default router;
