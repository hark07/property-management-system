import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const BookingTable = ({ bookings = [], onDelete }) => {
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
      <table className="w-full">
        <thead
          className="
            bg-slate-100
          "
        >
          <tr>
            <th className="p-4 text-left">Property</th>

            <th className="p-4 text-left">Tenant</th>

            <th className="p-4 text-left">Amenity</th>

            <th className="p-4 text-left">Date</th>

            <th className="p-4 text-left">Time</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.length > 0 ? (
            bookings.map((item) => (
              <tr
                key={item._id}
                className="
                border-t
                hover:bg-gray-50
              "
              >
                <td className="p-4">{item.property?.title || "N/A"}</td>

                <td className="p-4">{item.tenant?.name || "N/A"}</td>

                <td className="p-4">{item.amenity?.name || "N/A"}</td>

                <td className="p-4">
                  {item.bookingDate
                    ? new Date(item.bookingDate).toLocaleDateString()
                    : "-"}
                </td>

                <td className="p-4">
                  {item.checkIn}

                  {" - "}

                  {item.checkOut}
                </td>

                <td className="p-4">
                  <span
                    className={`
                    px-3
                    py-1
                    rounded-full
                    text-sm

                    ${
                      item.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : item.status === "Completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                    }

                  `}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-4">
                  <div
                    className="
                    flex
                    justify-center
                    gap-3
                  "
                  >
                    <button
                      onClick={() => navigate(`/bookings/${item._id}`)}
                      className="
                      text-blue-600
                    "
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => navigate(`/bookings/edit/${item._id}`)}
                      className="
                      text-yellow-600
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
          ) : (
            <tr>
              <td
                colSpan="7"
                className="
                  p-8
                  text-center
                  text-gray-500
                "
              >
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
