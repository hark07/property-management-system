import express from "express";

import {
  createAmenity,
  getAmenities,
  getAmenity,
  updateAmenity,
  deleteAmenity,
  getAmenitiesByProperty,
} from "../controllers/amenityController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAmenities);

router.get("/property/:propertyId", protect, getAmenitiesByProperty);

router.get("/:id", protect, getAmenity);

router.post("/", protect, createAmenity);

router.put("/:id", protect, updateAmenity);

router.delete("/:id", protect, deleteAmenity);

export default router;
