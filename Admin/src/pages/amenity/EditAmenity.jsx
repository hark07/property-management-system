import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";

import AmenityForm from "../../components/amenity/AmenityForm";

import { getAmenity, updateAmenity } from "../../services/amenityService";

const EditAmenity = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [amenity, setAmenity] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAmenity();
  }, []);

  const fetchAmenity = async () => {
    try {
      const data = await getAmenity(id);

      setAmenity(data.amenity);
    } catch (error) {
      toast.error("Failed to load amenity.");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const data = await updateAmenity(id, formData);

      toast.success(data.message);

      navigate("/amenities");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!amenity) {
    return (
      <Layout>
        <div
          className="
            bg-white
            p-8
            rounded-xl
            shadow
            text-center
          "
        >
          Loading...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        Edit Amenity
      </h1>

      <AmenityForm
        initialData={amenity}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </Layout>
  );
};

export default EditAmenity;
