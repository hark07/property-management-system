import {
  FaBuilding,
  FaUsers,
  FaTools,
  FaCalendarCheck,
  FaWifi,
} from "react-icons/fa";

const StatsGrid = ({ stats = {} }) => {
  const cards = [
    {
      title: "Users",
      value: stats.users || 0,
      icon: <FaUsers />,
    },

    {
      title: "Properties",
      value: stats.properties || 0,
      icon: <FaBuilding />,
    },

    {
      title: "Tenants",
      value: stats.tenants || 0,
      icon: <FaUsers />,
    },

    {
      title: "Maintenance",
      value: stats.maintenances || 0,
      icon: <FaTools />,
    },

    {
      title: "Amenities",
      value: stats.amenities || 0,
      icon: <FaWifi />,
    },

    {
      title: "Bookings",
      value: stats.bookings || 0,
      icon: <FaCalendarCheck />,
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-6
        gap-5
      "
    >
      {cards.map((item, index) => (
        <div
          key={index}
          className="
              bg-white
              rounded-xl
              shadow
              p-5
            "
        >
          <div
            className="
                text-blue-600
                text-2xl
              "
          >
            {item.icon}
          </div>

          <h3
            className="
                text-gray-500
                mt-3
              "
          >
            {item.title}
          </h3>

          <p
            className="
                text-3xl
                font-bold
              "
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
