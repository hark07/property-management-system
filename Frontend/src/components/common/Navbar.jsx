import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaBars,
  FaTimes,
  FaBuilding,
  FaUser,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    navigate("/login");
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-700"
        >
          <FaBuilding />
          PropertyHub
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link to="/properties" className="hover:text-blue-600">
            Properties
          </Link>

          <Link to="/about" className="hover:text-blue-600">
            About
          </Link>

          <Link to="/contact" className="hover:text-blue-600">
            Contact
          </Link>

          {token ? (
            <>
              <Link
                to="/bookings"
                className="flex items-center gap-2 hover:text-blue-600"
              >
                <FaClipboardList />
                My Bookings
              </Link>

              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-blue-600"
              >
                <FaUser />
                {user?.name}
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-5 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t px-5 py-5 space-y-4">
          <Link to="/" onClick={() => setOpen(false)} className="block">
            Home
          </Link>

          <Link
            to="/properties"
            onClick={() => setOpen(false)}
            className="block"
          >
            Properties
          </Link>

          <Link to="/about" onClick={() => setOpen(false)} className="block">
            About
          </Link>

          <Link to="/contact" onClick={() => setOpen(false)} className="block">
            Contact
          </Link>

          {token ? (
            <>
              <Link
                to="/bookings"
                onClick={() => setOpen(false)}
                className="block"
              >
                My Bookings
              </Link>

              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="block"
              >
                Profile
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="w-full bg-red-600 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block bg-blue-600 text-white text-center py-2 rounded-lg"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="block border border-blue-600 text-blue-600 text-center py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
