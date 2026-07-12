import {
  FaBell,
  FaTools,
  FaCalendarCheck,
  FaBuilding,
  FaWifi,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";

const NotificationCard = ({ notification, onRead, onDelete }) => {
  const getIcon = () => {
    switch (notification.type) {
      case "Maintenance":
        return <FaTools className="text-orange-500 text-2xl" />;

      case "Booking":
        return <FaCalendarCheck className="text-green-600 text-2xl" />;

      case "Property":
        return <FaBuilding className="text-blue-600 text-2xl" />;

      case "Amenity":
        return <FaWifi className="text-purple-600 text-2xl" />;

      default:
        return <FaBell className="text-gray-600 text-2xl" />;
    }
  };

  return (
    <div
      className={`
        bg-white
        rounded-xl
        shadow
        p-5
        border-l-4
        ${
          notification.status === "Unread"
            ? "border-blue-600"
            : "border-gray-300"
        }
      `}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex gap-4 flex-1">
          <div>{getIcon()}</div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold">{notification.title}</h3>

            <p className="text-gray-600 mt-1">{notification.message}</p>

            <p className="text-sm text-gray-400 mt-3">
              {new Date(notification.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-end">
          <span
            className={`
              px-3
              py-1
              rounded-full
              text-xs
              font-medium
              text-white
              ${
                notification.status === "Unread" ? "bg-red-500" : "bg-green-600"
              }
            `}
          >
            {notification.status}
          </span>

          {notification.status === "Unread" && (
            <button
              onClick={() => onRead(notification._id)}
              className="
                flex
                items-center
                gap-2
                bg-green-600
                hover:bg-green-700
                text-white
                px-3
                py-2
                rounded-lg
                text-sm
              "
            >
              <FaCheckCircle />
              Read
            </button>
          )}

          <button
            onClick={() => onDelete(notification._id)}
            className="
              flex
              items-center
              gap-2
              bg-red-600
              hover:bg-red-700
              text-white
              px-3
              py-2
              rounded-lg
              text-sm
            "
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
