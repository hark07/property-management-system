import express from "express";

import {
  createBooking,
  getBookings,
  getAllBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  cancelBooking,
} from "../controllers/bookingController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin All Bookings
router.get("/admin/all", protect, getAllBookings);

// User Own Bookings
router.get("/", protect, getBookings);

// Create Booking
router.post("/", protect, createBooking);

// Single Booking
router.get("/:id", protect, getBooking);

// Update Booking
router.put("/:id", protect, updateBooking);

// Delete Booking
router.delete("/:id", protect, deleteBooking);

// Cancel Booking
router.put("/:id/cancel", protect, cancelBooking);

export default router;
