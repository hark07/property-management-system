import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";

import AmenityForm from "../../components/amenity/AmenityForm";

import { createAmenity } from "../../services/amenityService";

const AddAmenity = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const data = await createAmenity(formData);

      toast.success(data.message);

      navigate("/amenities");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create amenity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        Add Amenity
      </h1>

      <AmenityForm onSubmit={handleSubmit} loading={loading} />
    </Layout>
  );
};

export default AddAmenity;
