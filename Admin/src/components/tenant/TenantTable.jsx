import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const TenantTable = ({ tenants = [], onDelete }) => {
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
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left">Tenant</th>

            <th className="p-4 text-left">Email</th>

            <th className="p-4 text-left">Property</th>

            <th className="p-4 text-left">Monthly Rent</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tenants.length > 0 ? (
            tenants.map((tenant) => (
              <tr
                key={tenant._id}
                className="
                    border-t
                    hover:bg-slate-50
                  "
              >
                <td className="p-4">{tenant.user?.name || "N/A"}</td>

                <td className="p-4">{tenant.user?.email || "N/A"}</td>

                <td className="p-4">{tenant.property?.title || "N/A"}</td>

                <td className="p-4">Rs. {tenant.monthlyRent || 0}</td>

                <td className="p-4">
                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-green-100
                      text-green-700
                      text-sm
                    "
                  >
                    {tenant.status}
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
                      onClick={() => navigate(`/tenants/${tenant._id}`)}
                      className="
                          text-blue-600
                        "
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => navigate(`/tenants/edit/${tenant._id}`)}
                      className="
                          text-yellow-600
                        "
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDelete(tenant._id)}
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
                No tenants found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TenantTable;
