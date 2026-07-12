import API from "../api/axios";

// Create Property
export const createProperty = async (formData) => {
  const { data } = await API.post("/properties", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// Get All Properties
export const getProperties = async () => {
  const { data } = await API.get("/properties");

  return data;
};

// Get Single Property
export const getProperty = async (id) => {
  const { data } = await API.get(`/properties/${id}`);

  return data;
};

// Update Property
export const updateProperty = async (id, formData) => {
  const { data } = await API.put(`/properties/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// Delete Property
export const deleteProperty = async (id) => {
  const { data } = await API.delete(`/properties/${id}`);

  return data;
};
