import API from "../api/axios";

// Create Amenity
export const createAmenity = async (data) => {
  const response = await API.post("/amenities", data);

  return response.data;
};

// Get All Amenities
export const getAmenities = async () => {
  const response = await API.get("/amenities");

  return response.data;
};

// Get Single Amenity
export const getAmenity = async (id) => {
  const response = await API.get(`/amenities/${id}`);

  return response.data;
};

// Update Amenity
export const updateAmenity = async (id, data) => {
  const response = await API.put(`/amenities/${id}`, data);

  return response.data;
};

// Delete Amenity
export const deleteAmenity = async (id) => {
  const response = await API.delete(`/amenities/${id}`);

  return response.data;
};
