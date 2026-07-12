import API from "../api/axios";

// ====================================
// Get My Notifications
// ====================================
export const getNotifications = async () => {
  const { data } = await API.get("/notifications");

  return data;
};

// ====================================
// Get Unread Notification Count
// ====================================
export const getUnreadCount = async () => {
  const { data } = await API.get("/notifications/unread-count");

  return data;
};

// ====================================
// Create Notification
// ====================================
export const createNotification = async (notificationData) => {
  const { data } = await API.post("/notifications", notificationData);

  return data;
};

// ====================================
// Mark Single Notification as Read
// ====================================
export const markAsRead = async (id) => {
  const { data } = await API.put(`/notifications/${id}/read`);

  return data;
};

// ====================================
// Mark All Notifications as Read
// ====================================
export const markAllAsRead = async () => {
  const { data } = await API.put("/notifications/mark-all-read");

  return data;
};

// ====================================
// Delete Notification
// ====================================
export const deleteNotification = async (id) => {
  const { data } = await API.delete(`/notifications/${id}`);

  return data;
};
