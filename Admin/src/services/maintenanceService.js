import API from "../api/axios";

// Create Maintenance
export const createMaintenance = async (data) => {
  const response = await API.post("/maintenance", data);

  return response.data;
};

// Get All Maintenance
export const getMaintenances = async () => {
  const response = await API.get("/maintenance");

  return response.data;
};

// Get Single Maintenance
export const getMaintenance = async (id) => {
  const response = await API.get(`/maintenance/${id}`);

  return response.data;
};

// Update Maintenance
export const updateMaintenance = async (id, data) => {
  const response = await API.put(`/maintenance/${id}`, data);

  return response.data;
};

// Delete Maintenance
export const deleteMaintenance = async (id) => {
  const response = await API.delete(`/maintenance/${id}`);

  return response.data;
};
