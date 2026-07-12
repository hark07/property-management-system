import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FaMapMarkerAlt, FaBed, FaBath, FaUser } from "react-icons/fa";

import { getPropertyById } from "../services/propertyService";

const PropertyDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [property, setProperty] = useState(null);

  const fetchProperty = async () => {
    try {
      const data = await getPropertyById(id);

      setProperty(data.property);
    } catch (error) {
      toast.error("Failed to load property");
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  if (!property) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-5">
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {/* Image Gallery */}

          <div className="grid md:grid-cols-2 gap-3 p-5">
            {property.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={property.title}
                className="
                  w-full
                  h-72
                  object-cover
                  rounded-lg
                "
              />
            ))}
          </div>

          <div className="p-8">
            <h1
              className="
              text-3xl
              font-bold
              mb-3
            "
            >
              {property.title}
            </h1>

            <div
              className="
              flex
              items-center
              gap-2
              text-gray-500
              mb-5
            "
            >
              <FaMapMarkerAlt />
              {property.address}, {property.city}
            </div>

            <p
              className="
              text-blue-600
              font-bold
              text-2xl
              mb-5
            "
            >
              Rs. {property.rent}/month
            </p>

            <div
              className="
              flex
              gap-8
              mb-6
              text-gray-600
            "
            >
              <span
                className="
                flex
                items-center
                gap-2
              "
              >
                <FaBed />
                {property.bedrooms} Bedrooms
              </span>

              <span
                className="
                flex
                items-center
                gap-2
              "
              >
                <FaBath />
                {property.bathrooms} Bathrooms
              </span>
            </div>

            <div className="mb-6">
              <h2
                className="
                text-xl
                font-bold
                mb-2
              "
              >
                Description
              </h2>

              <p
                className="
                text-gray-600
                leading-7
              "
              >
                {property.description}
              </p>
            </div>

            {/* Owner Info */}

            <div
              className="
              bg-gray-100
              rounded-lg
              p-5
              mb-6
            "
            >
              <h2
                className="
                font-bold
                mb-3
              "
              >
                Owner Information
              </h2>

              <div
                className="
                flex
                items-center
                gap-3
              "
              >
                <FaUser />

                <div>
                  <p className="font-semibold">{property.owner?.name}</p>

                  <p className="text-sm text-gray-500">
                    {property.owner?.email}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate(`/booking/${property._id}`)}
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6
                py-3
                rounded-lg
              "
            >
              Book Property
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
