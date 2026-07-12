import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";
import PropertyForm from "../../components/property/PropertyForm";

import { createProperty } from "../../services/propertyService";

const AddProperty = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const data = await createProperty(formData);

      toast.success(data.message || "Property created successfully.");

      navigate("/properties");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create property.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add New Property</h1>

        <p className="text-gray-500 mt-2">Create a new property listing.</p>
      </div>

      <PropertyForm onSubmit={handleSubmit} loading={loading} />
    </Layout>
  );
};

export default AddProperty;
