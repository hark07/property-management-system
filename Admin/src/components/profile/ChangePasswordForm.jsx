import { useState } from "react";

const ChangePasswordForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      return alert("All fields are required.");
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return alert("Passwords do not match.");
    }

    onSubmit(formData);

    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        rounded-xl
        shadow
        p-6
        space-y-5
      "
    >
      <h2 className="text-2xl font-bold">Change Password</h2>

      <div>
        <label className="block mb-2 font-medium">Current Password</label>

        <input
          type={showPassword ? "text" : "password"}
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-lg
            p-3
          "
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">New Password</label>

        <input
          type={showPassword ? "text" : "password"}
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-lg
            p-3
          "
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Confirm Password</label>

        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-lg
            p-3
          "
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        Show Passwords
      </label>

      <button
        type="submit"
        disabled={loading}
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-6
          py-3
          rounded-lg
          disabled:bg-blue-400
        "
      >
        {loading ? "Updating..." : "Change Password"}
      </button>
    </form>
  );
};

export default ChangePasswordForm;
