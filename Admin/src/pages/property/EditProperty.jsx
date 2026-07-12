import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";
import PropertyForm from "../../components/property/PropertyForm";

import { getProperty, updateProperty } from "../../services/propertyService";

const EditProperty = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [property, setProperty] = useState(null);

  const [loading, setLoading] = useState(false);

  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setFetching(true);

      const data = await getProperty(id);

      setProperty(data.property);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load property");

      navigate("/properties");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const data = await updateProperty(id, formData);

      toast.success(data.message || "Property updated successfully");

      navigate("/properties");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update property");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
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
          Loading property...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <h1
          className="
          text-3xl
          font-bold
        "
        >
          Edit Property
        </h1>

        <p
          className="
          text-gray-500
          mt-2
        "
        >
          Update property information.
        </p>
      </div>

      <PropertyForm
        initialData={property}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </Layout>
  );
};

export default EditProperty;
