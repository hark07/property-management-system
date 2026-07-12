import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PropertyTable = ({ properties, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left">Image</th>

            <th className="p-4 text-left">Title</th>

            <th className="p-4 text-left">Type</th>

            <th className="p-4 text-left">City</th>

            <th className="p-4 text-left">Rent</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {properties.map((property) => (
            <tr key={property._id} className="border-t hover:bg-slate-50">
              <td className="p-4">
                {property.images && property.images.length > 0 ? (
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="
                        w-20
                        h-16
                        object-cover
                        rounded-lg
                        "
                  />
                ) : (
                  <div
                    className="
                        w-20
                        h-16
                        bg-gray-200
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        text-xs
                        "
                  >
                    No Image
                  </div>
                )}
              </td>

              <td className="p-4">{property.title}</td>

              <td className="p-4">{property.type}</td>

              <td className="p-4">{property.city}</td>

              <td className="p-4">Rs. {property.rent}</td>

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
                  {property.status}
                </span>
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => navigate(`/properties/${property._id}`)}
                    className="
                      text-blue-600
                      hover:text-blue-800
                      "
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() => navigate(`/properties/edit/${property._id}`)}
                    className="
                      text-yellow-600
                      hover:text-yellow-800
                      "
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => onDelete(property._id)}
                    className="
                      text-red-600
                      hover:text-red-800
                      "
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyTable;
