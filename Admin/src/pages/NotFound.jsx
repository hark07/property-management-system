import { useNavigate } from "react-router-dom";

import { FaHome } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
        px-4
      "
    >
      <div
        className="
          bg-white
          rounded-xl
          shadow-lg
          p-8
          text-center
          max-w-md
          w-full
        "
      >
        <h1
          className="
            text-7xl
            font-bold
            text-blue-600
          "
        >
          404
        </h1>

        <h2
          className="
            text-2xl
            font-bold
            mt-4
          "
        >
          Page Not Found
        </h2>

        <p
          className="
            text-gray-500
            mt-3
          "
        >
          Sorry, the page you are looking for does not exist.
        </p>

        <button
          onClick={() => navigate("/")}
          className="
            mt-6
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-lg
            flex
            items-center
            justify-center
            gap-2
            mx-auto
          "
        >
          <FaHome />
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
