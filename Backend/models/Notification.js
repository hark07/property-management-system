import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["Booking", "Maintenance", "Property", "Amenity", "System"],
      default: "System",
    },

    status: {
      type: String,
      enum: ["Unread", "Read"],
      default: "Unread",
    },

    link: {
      type: String,
      default: "",
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
