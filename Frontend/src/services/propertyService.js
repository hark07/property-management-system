import API from "../api/axios";

// ==============================
// GET ALL PROPERTIES
// User Public
// ==============================

export const getProperties = async (params = {}) => {
  const response = await API.get("/properties", {
    params,
  });

  return response.data;
};

// ==============================
// GET SINGLE PROPERTY
// User Public
// ==============================

export const getProperty = async (id) => {
  const response = await API.get(`/properties/${id}`);

  return response.data;
};


export const getPropertyById = async (id) => {

  const response = await API.get(
    `/properties/${id}`
  );

  return response.data;

};