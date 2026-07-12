import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const AmenityTable = ({ amenities, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow
        overflow-x-auto
      "
    >
      <table
        className="
          min-w-full
        "
      >
        <thead
          className="
            bg-slate-100
          "
        >
          <tr>
            <th className="px-5 py-4 text-left">Name</th>

            <th className="px-5 py-4 text-left">Property</th>

            <th className="px-5 py-4 text-left">Capacity</th>

            <th className="px-5 py-4 text-left">Time</th>

            <th className="px-5 py-4 text-left">Status</th>

            <th className="px-5 py-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {amenities.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="
                  text-center
                  py-8
                  text-gray-500
                "
              >
                No amenities found.
              </td>
            </tr>
          ) : (
            amenities.map((item) => (
              <tr
                key={item._id}
                className="
                  border-b
                  hover:bg-gray-50
                "
              >
                <td
                  className="
                    px-5
                    py-4
                  "
                >
                  {item.name}
                </td>

                <td
                  className="
                    px-5
                    py-4
                  "
                >
                  {item.property?.title || "N/A"}
                </td>

                <td
                  className="
                    px-5
                    py-4
                  "
                >
                  {item.capacity}
                </td>

                <td
                  className="
                    px-5
                    py-4
                  "
                >
                  {item.openingTime}
                  {" - "}
                  {item.closingTime}
                </td>

                <td
                  className="
                    px-5
                    py-4
                  "
                >
                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm

                      ${
                        item.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }

                    `}
                  >
                    {item.status}
                  </span>
                </td>

                <td
                  className="
                    px-5
                    py-4
                  "
                >
                  <div
                    className="
                      flex
                      gap-3
                    "
                  >
                    <button
                      onClick={() => navigate(`/amenities/${item._id}`)}
                      className="
                        text-blue-600
                      "
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => navigate(`/amenities/edit/${item._id}`)}
                      className="
                        text-green-600
                      "
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDelete(item._id)}
                      className="
                        text-red-600
                      "
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AmenityTable;
