import { FaCalendarCheck } from "react-icons/fa";

const RecentBookings = ({ count = 0 }) => {
  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow
        p-6
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          mb-5
        "
      >
        <h2
          className="
            text-xl
            font-bold
          "
        >
          Recent Bookings
        </h2>

        <FaCalendarCheck
          className="
            text-green-600
            text-2xl
          "
        />
      </div>

      <div
        className="
          border
          rounded-lg
          p-4
        "
      >
        <p
          className="
            text-gray-500
          "
        >
          Pending Bookings
        </p>

        <p
          className="
            text-3xl
            font-bold
            mt-2
          "
        >
          {count}
        </p>
      </div>

      <button
        className="
          mt-5
          w-full
          bg-green-600
          hover:bg-green-700
          text-white
          py-3
          rounded-lg
        "
      >
        View Bookings
      </button>
    </div>
  );
};

export default RecentBookings;
