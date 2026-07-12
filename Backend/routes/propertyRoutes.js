import express from "express";

import {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// ==============================
// Public Routes
// ==============================

// Get All Properties
// Website visitors can view properties
router.get("/", getProperties);

// Get Single Property
// Website visitors can view property details
router.get("/:id", getProperty);

// ==============================
// Protected Routes
// ==============================

// Create Property
// Owner and Admin
router.post("/", protect, upload.array("images", 5), createProperty);

// Update Property
// Owner own property, Admin all properties
router.put("/:id", protect, upload.array("images", 5), updateProperty);

// Delete Property
// Owner own property, Admin all properties
router.delete("/:id", protect, deleteProperty);

export default router;
