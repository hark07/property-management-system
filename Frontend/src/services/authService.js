import API from "../api/axios";

// ==============================
// Register
// ==============================
export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};

// ==============================
// Login
// ==============================
export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};

// ==============================
// Get Profile
// ==============================
export const getProfile = async () => {
  const response = await API.get("/profile");

  return response.data;
};

// ==============================
// Update Profile
// ==============================
export const updateProfile = async (profileData) => {
  const response = await API.put("/profile", profileData);

  if (response.data.user) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};

// ==============================
// Change Password
// ==============================
export const changePassword = async (passwordData) => {
  const response = await API.put("/profile/change-password", passwordData);

  return response.data;
};

// ==============================
// Update Avatar
// ==============================
export const updateAvatar = async (avatar) => {
  const response = await API.put("/profile/avatar", {
    avatar,
  });

  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    user.avatar = response.data.avatar;

    localStorage.setItem("user", JSON.stringify(user));
  }

  return response.data;
};

// ==============================
// Logout
// ==============================
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ==============================
// Current User
// ==============================
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

// ==============================
// Check Login
// ==============================
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
