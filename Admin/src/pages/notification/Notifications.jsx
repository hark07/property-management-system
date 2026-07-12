import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";


import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../../services/notificationService";
import NotificationCard from "../../components/notification/NotificationCard";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  // ==============================
  // Load Notifications
  // ==============================
  const loadNotifications = async () => {
    try {
      setLoading(true);

      const data = await getNotifications();

      setNotifications(data.notifications);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load notifications",
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Mark Single Read
  // ==============================
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
    } catch (error) {
      toast.error("Failed to update notification");
    }
  };

  // ==============================
  // Mark All Read
  // ==============================
  const handleMarkAll = async () => {
    try {
      await markAllAsRead();

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          status: "Read",
        })),
      );

      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to update notifications");
    }
  };

  // ==============================
  // Delete Notification
  // ==============================
  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);

      setNotifications((prev) => prev.filter((item) => item._id !== id));

      toast.success("Notification deleted");
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div
          className="
            bg-white
            rounded-xl
            shadow
            p-8
            text-center
          "
        >
          Loading notifications...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="
          flex
          justify-between
          items-center
          mb-6
        "
      >
        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Notifications
        </h1>

        {notifications.length > 0 && (
          <button
            onClick={handleMarkAll}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5
              py-2
              rounded-lg
            "
          >
            Mark All Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div
          className="
            bg-white
            rounded-xl
            shadow
            p-8
            text-center
            text-gray-500
          "
        >
          No notifications found.
        </div>
      ) : (
        <div
          className="
            space-y-5
          "
        >
          {notifications.map((notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
              onRead={handleRead}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Notifications;
