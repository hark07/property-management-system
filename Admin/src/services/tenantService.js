import API from "../api/axios";

// Create Tenant
export const createTenant = async (tenantData) => {
  const { data } = await API.post("/tenants", tenantData);

  return data;
};

// Get All Tenants
export const getTenants = async () => {
  const { data } = await API.get("/tenants");

  return data;
};

// Get Single Tenant
export const getTenant = async (id) => {
  const { data } = await API.get(`/tenants/${id}`);

  return data;
};

// Update Tenant
export const updateTenant = async (id, tenantData) => {
  const { data } = await API.put(
    `/tenants/${id}`,

    tenantData,
  );

  return data;
};

// Delete Tenant
export const deleteTenant = async (id) => {
  const { data } = await API.delete(`/tenants/${id}`);

  return data;
};
