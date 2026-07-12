// import API from "../api/axios";

// // ==============================
// // Get Logged In User Profile
// // ==============================
// export const getProfile = async () => {
//   const { data } = await API.get("/profile");

//   return data;
// };

// // ==============================
// // Update Profile
// // ==============================
// export const updateProfile = async (profileData) => {
//   const { data } = await API.put("/profile", profileData);

//   return data;
// };

// // ==============================
// // Change Password
// // ==============================
// export const changePassword = async (passwordData) => {
//   const { data } = await API.put("/profile/change-password", passwordData);

//   return data;
// };

// // ==============================
// // Update Avatar
// // ==============================
// export const updateAvatar = async (avatarUrl) => {
//   const { data } = await API.put("/profile/avatar", {
//     avatar: avatarUrl,
//   });

//   return data;
// };


import API from "../api/axios";

// Get Profile
export const getProfile = async () => {
  const { data } = await API.get("/profile");
  return data;
};

// Update Profile
export const updateProfile = async (profileData) => {
  const { data } = await API.put("/profile", profileData);
  return data;
};

// Change Password
export const changePassword = async (passwordData) => {
  const { data } = await API.put("/profile/change-password", passwordData);
  return data;
};

// Update Avatar
export const updateAvatar = async (avatarUrl) => {
  const { data } = await API.put("/profile/avatar", {
    avatar: avatarUrl,
  });

  return data;
};