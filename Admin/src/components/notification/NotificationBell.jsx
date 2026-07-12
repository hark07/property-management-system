import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

import {
  getNotifications,
  getUnreadCount,
  markAsRead,
} from "../../services/notificationService";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: true,
});

const NotificationBell = () => {
  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    loadNotifications();

    loadCount();

    socket.on("notificationCreated", (notification) => {
      setNotifications((prev) => [notification, ...prev]);

      setCount((prev) => prev + 1);

      toast.info(notification.title);
    });

    return () => {
      socket.off("notificationCreated");
    };
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();

      setNotifications(data.notifications.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  const loadCount = async () => {
    try {
      const data = await getUnreadCount();

      setCount(data.unread);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRead = async (id) => {
    try {
      await markAsRead(id);

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                status: "Read",
              }
            : item,
        ),
      );

      setCount((prev) => (prev > 0 ? prev - 1 : 0));
    } catch (error) {
      toast.error("Unable to update notification");
    }
  };

  return (
    <div
      className="
        relative
      "
    >
      <button
        onClick={() => setOpen(!open)}
        className="
          relative
          text-xl
          text-gray-600
        "
      >
        <FaBell />

        {count > 0 && (
          <span
            className="
              absolute
              -top-2
              -right-2
              bg-red-600
              text-white
              text-xs
              w-5
              h-5
              rounded-full
              flex
              items-center
              justify-center
            "
          >
            {count}
          </span>
        )}
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-4
            w-80
            bg-white
            shadow-xl
            rounded-xl
            overflow-hidden
            z-50
          "
        >
          <div
            className="
              p-4
              border-b
              font-bold
            "
          >
            Notifications
          </div>

          {notifications.length === 0 ? (
            <p
              className="
                p-5
                text-gray-500
                text-center
              "
            >
              No notifications
            </p>
          ) : (
            notifications.map((item) => (
              <div
                key={item._id}
                className="
                  p-4
                  border-b
                  hover:bg-gray-50
                "
              >
                <h3
                  className="
                    font-semibold
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    text-sm
                    text-gray-600
                  "
                >
                  {item.message}
                </p>

                {item.status === "Unread" && (
                  <button
                    onClick={() => handleRead(item._id)}
                    className="
                      text-blue-600
                      text-sm
                      mt-2
                    "
                  >
                    Mark as read
                  </button>
                )}
              </div>
            ))
          )}

          <Link
            to="/notifications"
            className="
              block
              text-center
              p-3
              bg-gray-100
              text-blue-600
              font-semibold
            "
            onClick={() => setOpen(false)}
          >
            View All
          </Link>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
