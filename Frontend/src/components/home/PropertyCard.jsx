import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaBed, FaBath, FaRupeeSign } from "react-icons/fa";

const PropertyCard = ({ property }) => {
  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow-md
        overflow-hidden
        hover:shadow-xl
        transition
        duration-300
      "
    >
      <img
        src={property.images?.[0]}
        alt={property.title}
        className="
          w-full
          h-56
          object-cover
        "
      />

      <div className="p-5">
        <h3
          className="
            text-xl
            font-bold
            text-gray-800
            mb-2
            line-clamp-1
          "
        >
          {property.title}
        </h3>

        <div
          className="
            flex
            items-center
            gap-2
            text-gray-500
            text-sm
          "
        >
          <FaMapMarkerAlt className="text-blue-600" />

          <span>{property.city}</span>
        </div>

        <div
          className="
            flex
            gap-6
            mt-4
            text-gray-600
            text-sm
          "
        >
          <span
            className="
              flex
              items-center
              gap-2
            "
          >
            <FaBed className="text-blue-600" />
            {property.bedrooms || 0}
            Beds
          </span>

          <span
            className="
              flex
              items-center
              gap-2
            "
          >
            <FaBath className="text-blue-600" />
            {property.bathrooms || 0}
            Baths
          </span>
        </div>

        <div
          className="
            flex
            justify-between
            items-center
            mt-5
          "
        >
          <div
            className="
              flex
              items-center
              text-blue-600
              font-bold
              text-lg
            "
          >
            <FaRupeeSign />

            {property.rent}

            <span
              className="
                text-sm
                font-medium
                ml-1
                text-gray-500
              "
            >
              /month
            </span>
          </div>

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
              transition
            "
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
