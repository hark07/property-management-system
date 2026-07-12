import { useState, useEffect, useRef } from "react";
import { FaBars, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import NotificationBell from "../notification/NotificationBell";

const Navbar = ({ setOpen }) => {
  const { user, logout } = useAuth();

  const [openProfile, setOpenProfile] = useState(false);

  const profileRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className="
        bg-white
        shadow
        h-16
        flex
        items-center
        justify-between
        px-4
        md:px-6
        sticky
        top-0
        z-30
      "
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOpen(true)}
          className="
            lg:hidden
            text-xl
            text-gray-700
          "
        >
          <FaBars />
        </button>

        <h1 className="text-xl font-semibold">Property Management</h1>
      </div>

      <div className="flex items-center gap-5">
        <NotificationBell />

        <div ref={profileRef} className="relative">
          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="
              flex
              items-center
              gap-2
              cursor-pointer
              focus:outline-none
            "
          >
            <FaUserCircle
              className="
                text-3xl
                text-gray-600
              "
            />

            <div className="hidden md:block text-left">
              <p className="font-semibold text-sm">{user?.name || "User"}</p>

              <p
                className="
                text-xs
                text-gray-500
                capitalize
              "
              >
                {user?.role || "Guest"}
              </p>
            </div>
          </button>

          {openProfile && (
            <div
              className="
                  absolute
                  right-0
                  mt-3
                  w-52
                  bg-white
                  rounded-xl
                  shadow-lg
                  border
                  overflow-hidden
                "
            >
              <div
                className="
                    px-4
                    py-3
                    border-b
                  "
              >
                <p className="font-semibold text-sm">{user?.name}</p>

                <p
                  className="
                    text-xs
                    text-gray-500
                  "
                >
                  {user?.email}
                </p>
              </div>

              <button
                onClick={logout}
                className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-red-600
                    hover:bg-red-50
                  "
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
