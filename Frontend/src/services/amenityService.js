import API from "../api/axios";

export const getAmenitiesByProperty = async (propertyId) => {
  const response = await API.get(`/amenities/property/${propertyId}`);

  return response.data;
};