import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { FaArrowLeft, FaEdit } from "react-icons/fa";

import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";

import { getAmenity } from "../../services/amenityService";

const AmenityDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [amenity, setAmenity] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAmenity();
  }, []);

  const fetchAmenity = async () => {
    try {
      setLoading(true);

      const data = await getAmenity(id);

      setAmenity(data.amenity);
    } catch (error) {
      toast.error("Failed to load amenity details.");
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
          Loading...
        </div>
      </Layout>
    );
  }

  if (!amenity) {
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
          Amenity not found.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="
          flex
          justify-between
          items-center
          mb-6
        "
      >
        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Amenity Details
        </h1>

        <div
          className="
            flex
            gap-3
          "
        >
          <button
            onClick={() => navigate("/amenities")}
            className="
              bg-gray-600
              hover:bg-gray-700
              text-white
              px-4
              py-2
              rounded-lg
              flex
              items-center
              gap-2
            "
          >
            <FaArrowLeft />
            Back
          </button>

          <button
            onClick={() => navigate(`/amenities/edit/${id}`)}
            className="
              bg-green-600
              hover:bg-green-700
              text-white
              px-4
              py-2
              rounded-lg
              flex
              items-center
              gap-2
            "
          >
            <FaEdit />
            Edit
          </button>
        </div>
      </div>

      <div
        className="
          bg-white
          rounded-xl
          shadow
          p-6
          space-y-4
        "
      >
        <div>
          <h2 className="font-semibold">Amenity Name</h2>

          <p>{amenity.name}</p>
        </div>

        <div>
          <h2 className="font-semibold">Property</h2>

          <p>{amenity.property?.title || "N/A"}</p>
        </div>

        <div>
          <h2 className="font-semibold">Description</h2>

          <p>{amenity.description || "No description"}</p>
        </div>

        <div>
          <h2 className="font-semibold">Capacity</h2>

          <p>{amenity.capacity}</p>
        </div>

        <div>
          <h2 className="font-semibold">Opening Time</h2>

          <p>{amenity.openingTime}</p>
        </div>

        <div>
          <h2 className="font-semibold">Closing Time</h2>

          <p>{amenity.closingTime}</p>
        </div>

        <div>
          <h2 className="font-semibold">Rules</h2>

          <p>{amenity.rules || "No rules"}</p>
        </div>

        <div>
          <h2 className="font-semibold">Status</h2>

          <span
            className={`
              px-3
              py-1
              rounded-full

              ${
                amenity.status === "Available"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            `}
          >
            {amenity.status}
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default AmenityDetails;
