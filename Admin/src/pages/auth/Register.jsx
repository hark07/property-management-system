import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaUserTag,
  FaBuilding,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "tenant",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
      };

      const data = await register(payload);

      toast.success(data.message || "Registration successful.");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <FaBuilding className="text-5xl text-blue-700 mx-auto mb-3" />

          <h1 className="text-3xl font-bold">Create Account</h1>

          <p className="text-gray-500 mt-2">
            Register to Property Management System
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium">Full Name</label>

            <div className="flex items-center border rounded-lg mt-2">
              <FaUser className="mx-3 text-gray-500" />

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full p-3 outline-none"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="font-medium">Email</label>

            <div className="flex items-center border rounded-lg mt-2">
              <FaEnvelope className="mx-3 text-gray-500" />

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="w-full p-3 outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="font-medium">Phone</label>

            <div className="flex items-center border rounded-lg mt-2">
              <FaPhone className="mx-3 text-gray-500" />

              <input
                type="text"
                name="phone"
                placeholder="Enter phone"
                className="w-full p-3 outline-none"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="font-medium">Role</label>

            <div className="flex items-center border rounded-lg mt-2">
              <FaUserTag className="mx-3 text-gray-500" />

              <select
                name="role"
                className="w-full p-3 outline-none bg-white"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="tenant">Tenant</option>
                <option value="owner">Owner</option>
                <option value="staff">Staff</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-medium">Password</label>

            <div className="flex items-center border rounded-lg mt-2">
              <FaLock className="mx-3 text-gray-500" />

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full p-3 outline-none"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="font-medium">Confirm Password</label>

            <div className="flex items-center border rounded-lg mt-2">
              <FaLock className="mx-3 text-gray-500" />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                className="w-full p-3 outline-none"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-6">
          Already have an account?
          <Link to="/" className="text-blue-700 font-semibold ml-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
