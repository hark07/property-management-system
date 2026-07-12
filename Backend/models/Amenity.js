import mongoose from "mongoose";

const amenitySchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    openingTime: {
      type: String,
      required: true,
    },

    closingTime: {
      type: String,
      required: true,
    },

    rules: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Available", "Unavailable"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Amenity", amenitySchema);
