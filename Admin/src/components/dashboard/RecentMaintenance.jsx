import { FaTools } from "react-icons/fa";

const RecentMaintenance = ({ count = 0 }) => {
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
          Recent Maintenance
        </h2>

        <FaTools
          className="
            text-blue-600
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
          Pending Requests
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
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-3
          rounded-lg
        "
      >
        View Maintenance
      </button>
    </div>
  );
};

export default RecentMaintenance;
