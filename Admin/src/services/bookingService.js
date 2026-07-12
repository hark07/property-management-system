import API from "../api/axios";

// Create Booking
export const createBooking = async (data) => {
  const response = await API.post("/bookings", data);

  return response.data;
};

// User Get Own Bookings
export const getBookings = async () => {
  const response = await API.get("/bookings");

  return response.data;
};

// Admin Get All Bookings
export const getAllBookings = async () => {
  const response = await API.get("/bookings/admin/all");

  return response.data;
};

// User Get Single Booking
export const getBooking = async (id) => {
  const response = await API.get(`/bookings/${id}`);

  return response.data;
};

// Update Booking
export const updateBooking = async (id, data) => {
  const response = await API.put(`/bookings/${id}`, data);

  return response.data;
};

// Delete Booking
export const deleteBooking = async (id) => {
  const response = await API.delete(`/bookings/${id}`);

  return response.data;
};

// Cancel Booking
export const cancelBooking = async (id) => {
  const response = await API.put(`/bookings/${id}/cancel`);

  return response.data;
};
