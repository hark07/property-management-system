import API from "../api/axios";

// Admin Dashboard
export const getAdminDashboard = async () => {
  const response = await API.get("/dashboard/admin");

  return response.data;
};

// Owner Dashboard
export const getOwnerDashboard = async () => {
  const response = await API.get("/dashboard/owner");

  return response.data;
};

// Tenant Dashboard
export const getTenantDashboard = async () => {
  const response = await API.get("/dashboard/tenant");

  return response.data;
};

// Staff Dashboard
export const getStaffDashboard = async () => {
  const response = await API.get("/dashboard/staff");

  return response.data;
};
