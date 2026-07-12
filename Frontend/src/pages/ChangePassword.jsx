import { useState } from "react";
import { toast } from "react-toastify";

import { changePassword } from "../services/authService";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const data = await changePassword(formData);

      toast.success(data.message);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-lg mx-auto px-5">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Change Password</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-semibold">
                Current Password
              </label>

              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">New Password</label>

              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Updating..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
