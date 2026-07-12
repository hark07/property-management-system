import API from "../api/axios";

// Get all users
export const getUsers = async () => {
  const { data } = await API.get("/auth/users");

  return data;
};
