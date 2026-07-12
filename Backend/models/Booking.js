import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    amenity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Amenity",
      required: true,
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    checkIn: {
      type: String,
      required: true,
    },

    checkOut: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
      default: "",
    },

    guests: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Booking", bookingSchema);
