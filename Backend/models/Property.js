import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["Apartment", "House", "Hostel", "Office"],
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    pincode: {
      type: String,
      default: "",
    },

    rent: {
      type: Number,
      required: true,
    },

    bedrooms: {
      type: Number,
      default: 1,
    },

    bathrooms: {
      type: Number,
      default: 1,
    },

    area: {
      type: Number,
      default: 0,
    },

    images: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["Available", "Occupied", "Maintenance"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  },
);

const Property = mongoose.model("Property", propertySchema);

export default Property;
