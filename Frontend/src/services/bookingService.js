import API from "../api/axios";

// Get All Bookings
export const getBookings = async () => {
  const response = await API.get("/bookings");
  return response.data;
};

// Get Single Booking
export const getBooking = async (id) => {
  const response = await API.get(`/bookings/${id}`);
  return response.data;
};

// Create Booking
export const createBooking = async (bookingData) => {
  const response = await API.post("/bookings", bookingData);
  return response.data;
};

// Update Booking
export const updateBooking = async (id, bookingData) => {
  const response = await API.put(`/bookings/${id}`, bookingData);
  return response.data;
};

// Delete Booking
export const deleteBooking = async (id) => {
  const response = await API.delete(`/bookings/${id}`);
  return response.data;
};
