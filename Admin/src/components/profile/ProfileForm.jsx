import { useEffect, useState } from "react";

const ProfileForm = ({ user, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
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
      <h2
        className="
          text-2xl
          font-bold
        "
      >
        Edit Profile
      </h2>

      <div>
        <label className="block mb-2 font-medium">Full Name</label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-lg
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Email Address</label>

        <input
          type="email"
          name="email"
          value={formData.email}
          disabled
          className="
            w-full
            border
            rounded-lg
            p-3
            bg-gray-100
            cursor-not-allowed
          "
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Phone Number</label>

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-lg
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Address</label>

        <textarea
          name="address"
          rows={4}
          value={formData.address}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-lg
            p-3
            resize-none
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="
          bg-blue-600
          hover:bg-blue-700
          disabled:bg-blue-400
          text-white
          px-6
          py-3
          rounded-lg
          transition
        "
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
};

export default ProfileForm;
