import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaBuilding,
  FaUsers,
  FaTools,
  FaClipboardList,
  FaCalendarAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";


import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ open, setOpen }) => {
  const { logout, user } = useAuth();

  const role = user?.role;

  const menu = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: `/${role}`,
      roles: ["admin", "owner", "tenant", "staff"],
    },

    {
      name: "Properties",
      icon: <FaBuilding />,
      path: "/properties",
      roles: ["admin", "owner"],
    },

    {
      name: "Tenants",
      icon: <FaUsers />,
      path: "/tenants",
      roles: ["admin", "owner"],
    },

    {
      name: "Maintenance",
      icon: <FaTools />,
      path: "/maintenance",
      roles: ["admin", "owner", "tenant", "staff"],
    },

    {
      name: "Amenities",
      icon: <FaClipboardList />,
      path: "/amenities",
      roles: ["admin", "owner"],
    },

    {
      name: "Bookings",
      icon: <FaCalendarAlt />,
      path: "/bookings",
      roles: ["admin", "owner", "tenant"],
    },

    {
      name: "Profile",
      icon: <FaUserCircle />,
      path: "/profile",
      roles: ["admin", "owner", "tenant", "staff"],
    },

    {
      name: "Notifications",
      icon: <MdNotificationsActive />,
      path: "/notifications",
      roles: ["admin", "owner"],
    },
    {
      name: "Users",
      icon: <FaUsers />,
      path: "/admin/users",
      roles: ["admin"],
    },
  ];

  const filteredMenu = menu.filter((item) => item.roles.includes(role));

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
              fixed
              inset-0
              bg-black
              bg-opacity-50
              z-40
              lg:hidden
            "
        />
      )}

      <aside
        className={`
          fixed
          top-0
          left-0
          bottom-0
          w-64
          bg-slate-900
          text-white
          z-50
          transform
          transition-transform
          duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0

        `}
      >
        <div
          className="
          flex
          items-center
          justify-between
          px-5
          py-6
          border-b
          border-slate-700
        "
        >
          <h2
            className="
            text-2xl
            font-bold
          "
          >
            Property PMS
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="
              lg:hidden
              text-xl
            "
          >
            <FaTimes />
          </button>
        </div>

        <div
          className="
          px-5
          py-4
          border-b
          border-slate-700
        "
        >
          <p
            className="
            font-semibold
          "
          >
            {user?.name}
          </p>

          <p
            className="
            text-gray-400
            text-sm
            capitalize
          "
          >
            {user?.role}
          </p>
        </div>

        <nav
          className="
          p-3
          overflow-y-auto
          h-[calc(100vh-180px)]
        "
        >
          {filteredMenu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `

                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-lg
                  mb-2
                  transition

                  ${isActive ? "bg-blue-600" : "hover:bg-slate-800"}

                `}
            >
              {item.icon}

              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
