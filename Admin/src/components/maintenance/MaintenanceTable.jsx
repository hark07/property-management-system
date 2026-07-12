import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const MaintenanceTable = ({ maintenances = [], onDelete }) => {
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
            <th
              className="
              p-4
              text-left
            "
            >
              Issue
            </th>

            <th
              className="
              p-4
              text-left
            "
            >
              Property
            </th>

            <th
              className="
              p-4
              text-left
            "
            >
              Tenant
            </th>

            <th
              className="
              p-4
              text-left
            "
            >
              Priority
            </th>

            <th
              className="
              p-4
              text-left
            "
            >
              Status
            </th>

            <th
              className="
              p-4
              text-center
            "
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {maintenances.length > 0 ? (
            maintenances.map((item) => (
              <tr
                key={item._id}
                className="
                      border-t
                      hover:bg-gray-50
                    "
              >
                <td className="p-4">{item.issueTitle}</td>

                <td className="p-4">{item.property?.title || "N/A"}</td>

                <td className="p-4">{item.tenant?.name || "N/A"}</td>

                <td className="p-4">
                  <span
                    className="
                        px-3
                        py-1
                        rounded-full
                        bg-yellow-100
                        text-yellow-700
                        text-sm
                      "
                  >
                    {item.priority}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className="
                        px-3
                        py-1
                        rounded-full
                        bg-blue-100
                        text-blue-700
                        text-sm
                      "
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
                      onClick={() => navigate(`/maintenance/${item._id}`)}
                      className="
                            text-blue-600
                          "
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => navigate(`/maintenance/edit/${item._id}`)}
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
                colSpan="6"
                className="
                    p-8
                    text-center
                    text-gray-500
                  "
              >
                No maintenance requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceTable;
