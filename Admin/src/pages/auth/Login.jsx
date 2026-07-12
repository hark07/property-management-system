import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaBuilding } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
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

      const data = await login(formData.email, formData.password);

      toast.success(data.message || "Login Successful");

      switch (data.user.role) {
        case "admin":
          navigate("/admin");
          break;

        case "owner":
          navigate("/owner");
          break;

        case "tenant":
          navigate("/tenant");
          break;

        case "staff":
          navigate("/staff");
          break;

        default:
          navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FaBuilding className="text-5xl text-blue-700" />
          </div>

          <h1 className="text-3xl font-bold">Property Management</h1>

          <p className="text-gray-500 mt-2">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>

            <div className="flex items-center border rounded-lg mt-2">
              <FaEnvelope className="mx-3 text-gray-500" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-medium">Password</label>

            <div className="flex items-center border rounded-lg mt-2">
              <FaLock className="mx-3 text-gray-500" />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6">
          Don't have an account?
          <Link to="/register" className="text-blue-700 font-semibold ml-2">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
