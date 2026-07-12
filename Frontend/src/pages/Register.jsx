import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { registerUser } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await registerUser(formData);

      toast.success(data.message);

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-5 py-10">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>

        <p className="text-center text-gray-500 mb-8">Register to continue</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Full Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Phone</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
