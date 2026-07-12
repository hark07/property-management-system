import { useEffect, useState } from "react";

import { FaBell } from "react-icons/fa";

import {
  getNotifications,
  markNotificationRead,
} from "../../services/notificationService";

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();

      setNotifications(data.notifications || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRead = async (id) => {
    try {
      await markNotificationRead(id);

      fetchNotifications();
    } catch (error) {
      console.log(error);
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
        "
      >
        <FaBell />

        {notifications.filter((item) => !item.isRead).length > 0 && (
          <span
            className="
                absolute
                -top-2
                -right-2
                bg-red-600
                text-white
                text-xs
                rounded-full
                px-2
              "
          >
            {notifications.filter((item) => !item.isRead).length}
          </span>
        )}
      </button>

      {open && (
        <div
          className="
              absolute
              right-0
              mt-3
              w-80
              bg-white
              shadow-xl
              rounded-lg
              z-50
            "
        >
          <h3
            className="
                font-bold
                p-4
                border-b
              "
          >
            Notifications
          </h3>

          <div
            className="
                max-h-96
                overflow-y-auto
              "
          >
            {notifications.length === 0 ? (
              <p
                className="
                    p-4
                    text-gray-500
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
                  onClick={() => handleRead(item._id)}
                >
                  <h4
                    className="
                        font-semibold
                      "
                  >
                    {item.title}
                  </h4>

                  <p
                    className="
                        text-sm
                        text-gray-600
                      "
                  >
                    {item.message}
                  </p>

                  <span
                    className="
                        text-xs
                        text-blue-600
                      "
                  >
                    {item.type}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
