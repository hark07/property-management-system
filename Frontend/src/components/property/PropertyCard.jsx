import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaBed, FaBath, FaHome } from "react-icons/fa";

const PropertyCard = ({ property }) => {
  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow
        overflow-hidden
        hover:shadow-xl
        transition
      "
    >
      <div
        className="
          relative
        "
      >
        {property.images?.[0] && (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-60 object-cover"
          />
        )}

        <span
          className="
            absolute
            top-4
            left-4
            bg-blue-600
            text-white
            px-3
            py-1
            rounded-full
            text-sm
          "
        >
          {property.type}
        </span>
      </div>

      <div
        className="
          p-5
        "
      >
        <h2
          className="
            text-xl
            font-bold
            mb-2
          "
        >
          {property.title}
        </h2>

        <div
          className="
            flex
            items-center
            gap-2
            text-gray-500
            text-sm
          "
        >
          <FaMapMarkerAlt />

          {property.city}
        </div>

        <div
          className="
            flex
            gap-5
            mt-4
            text-gray-600
            text-sm
          "
        >
          <div
            className="
              flex
              items-center
              gap-1
            "
          >
            <FaBed />

            {property.bedrooms || 0}
          </div>

          <div
            className="
              flex
              items-center
              gap-1
            "
          >
            <FaBath />

            {property.bathrooms || 0}
          </div>

          <div
            className="
              flex
              items-center
              gap-1
            "
          >
            <FaHome />

            {property.area || "N/A"}
          </div>
        </div>

        <div
          className="
            flex
            justify-between
            items-center
            mt-5
          "
        >
          <h3
            className="
              text-blue-600
              font-bold
              text-lg
            "
          >
            Rs. {property.rent}
          </h3>

          <Link
            to={`/properties/${property._id}`}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-4
              py-2
              rounded-lg
              text-sm
            "
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
