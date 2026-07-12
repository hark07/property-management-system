import Notification from "../models/Notification.js";
import { getIO } from "../socket/socket.js";

const createNotification = async ({
  user,
  title,
  message,
  type = "System",
  link = "",
  sender = null,
}) => {
  try {
    const notification = await Notification.create({
      user,
      title,
      message,
      type,
      link,
      sender,
    });

    const populatedNotification = await Notification.findById(
      notification._id,
    ).populate("sender", "name email");

    const io = getIO();

    if (io) {
      io.emit("notificationCreated", populatedNotification);
    }

    return notification;
  } catch (error) {
    console.log("Notification Error:", error.message);
  }
};

export default createNotification;
