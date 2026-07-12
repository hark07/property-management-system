import express from "express";

import {
  createTenant,
  getTenants,
  getTenant,
  updateTenant,
  deleteTenant,
} from "../controllers/tenantController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTenants);

router.get("/:id", protect, getTenant);

router.post("/", protect, createTenant);

router.put("/:id", protect, updateTenant);

router.delete("/:id", protect, deleteTenant);

export default router;
