import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";

import { getProperty } from "../../services/propertyService";

const PropertyDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [property, setProperty] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);

      const data = await getProperty(id);

      setProperty(data.property);
    } catch (error) {
      toast.error(error.response?.data?.message || "Property not found");

      navigate("/properties");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div
          className="
          bg-white
          rounded-xl
          shadow
          p-8
          text-center
        "
        >
          Loading property details...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="
        flex
        flex-col
        md:flex-row
        md:justify-between
        gap-4
        mb-6
      "
      >
        <div>
          <h1
            className="
            text-3xl
            font-bold
          "
          >
            Property Details
          </h1>

          <p
            className="
            text-gray-500
          "
          >
            Complete property information.
          </p>
        </div>

        <button
          onClick={() => navigate(`/properties/edit/${property._id}`)}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-3
            rounded-lg
          "
        >
          Edit Property
        </button>
      </div>

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-3
        gap-6
      "
      >
        <div
          className="
          bg-white
          rounded-xl
          shadow
          p-5
        "
        >
          <h2
            className="
            text-xl
            font-bold
            mb-4
          "
          >
            Images
          </h2>

          {property.images && property.images.length > 0 ? (
            <div className="space-y-4">
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={property.title}
                  className="
                        w-full
                        h-52
                        object-cover
                        rounded-lg
                      "
                />
              ))}
            </div>
          ) : (
            <div
              className="
                h-52
                bg-gray-100
                rounded-lg
                flex
                items-center
                justify-center
              "
            >
              No Image Available
            </div>
          )}
        </div>

        <div
          className="
          lg:col-span-2
          bg-white
          rounded-xl
          shadow
          p-6
        "
        >
          <div
            className="
            flex
            justify-between
            items-center
            mb-5
          "
          >
            <h2
              className="
              text-2xl
              font-bold
            "
            >
              {property.title}
            </h2>

            <span
              className="
              bg-green-100
              text-green-700
              px-4
              py-2
              rounded-full
            "
            >
              {property.status}
            </span>
          </div>

          <p
            className="
            text-gray-600
            mb-6
          "
          >
            {property.description || "No description available"}
          </p>

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
          >
            <Info label="Type" value={property.type} />

            <Info label="Monthly Rent" value={`Rs. ${property.rent}`} />

            <Info label="Address" value={property.address} />

            <Info label="City" value={property.city} />

            <Info label="State" value={property.state || "N/A"} />

            <Info label="Country" value={property.country || "N/A"} />

            <Info label="Bedrooms" value={property.bedrooms} />

            <Info label="Bathrooms" value={property.bathrooms} />

            <Info label="Area" value={`${property.area} sq.ft`} />
          </div>

          <hr className="my-6" />

          <h3
            className="
            text-xl
            font-semibold
            mb-3
          "
          >
            Owner Information
          </h3>

          <p>Name: {property.owner?.name || "N/A"}</p>

          <p>Email: {property.owner?.email || "N/A"}</p>
        </div>
      </div>
    </Layout>
  );
};

const Info = ({ label, value }) => {
  return (
    <div
      className="
      bg-gray-50
      rounded-lg
      p-4
    "
    >
      <p
        className="
        text-gray-500
        text-sm
      "
      >
        {label}
      </p>

      <p
        className="
        font-semibold
        mt-1
      "
      >
        {value}
      </p>
    </div>
  );
};

export default PropertyDetails;
