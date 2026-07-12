import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import {
  getProfile,
  updateProfile,
  updateAvatar,
} from "../services/authService";

const CLOUD_NAME = "dymvjftai";
const UPLOAD_PRESET = "property_management";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    avatar: "",
  });

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const data = await getProfile();

      setUser(data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await updateProfile({
        name: user.name,

        phone: user.phone,

        address: user.address,
      });

      setUser(response.user);

      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");

      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB.");

      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,

        {
          method: "POST",

          body: formData,
        },
      );

      const data = await response.json();

      await updateAvatar(data.secure_url);

      setUser((prev) => ({
        ...prev,

        avatar: data.secure_url,
      }));

      toast.success("Avatar updated successfully.");
    } catch (error) {
      toast.error("Avatar upload failed.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Loading Profile...</h2>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-5">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-blue-600 px-8 py-10 text-white">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={
                    user.avatar
                      ? user.avatar
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.name,
                        )}`
                  }
                  alt={user.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  disabled={uploading}
                  className="absolute bottom-0 right-0 bg-blue-700 text-white w-9 h-9 rounded-full hover:bg-blue-800 disabled:opacity-50"
                >
                  {uploading ? "..." : "✎"}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>

              <h1 className="text-3xl font-bold mt-5">{user.name}</h1>

              <p className="opacity-90 mt-1">{user.role}</p>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-semibold">Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Email</label>

                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Phone Number</label>

                <input
                  type="text"
                  name="phone"
                  value={user.phone || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Role</label>

                <input
                  type="text"
                  value={user.role}
                  disabled
                  className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block mb-2 font-semibold">Address</label>

              <textarea
                name="address"
                rows="4"
                value={user.address || ""}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your address"
              />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Update Profile"}
              </button>

              <button
                type="button"
                onClick={fetchProfile}
                className="border border-gray-300 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
