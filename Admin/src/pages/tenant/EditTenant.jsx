import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";

import TenantForm from "../../components/tenant/TenantForm";

import { getTenant, updateTenant } from "../../services/tenantService";

const EditTenant = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [tenant, setTenant] = useState(null);

  const [loading, setLoading] = useState(false);

  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchTenant();
  }, [id]);

  const fetchTenant = async () => {
    try {
      setFetching(true);

      const data = await getTenant(id);

      setTenant(data.tenant);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load tenant.");

      navigate("/tenants");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const data = await updateTenant(
        id,

        formData,
      );

      toast.success(data.message || "Tenant updated successfully.");

      navigate("/tenants");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update tenant.");
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
          Loading tenant...
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
          Edit Tenant
        </h1>

        <p
          className="
          text-gray-500
          mt-2
        "
        >
          Update tenant information.
        </p>
      </div>

      <TenantForm
        initialData={tenant}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </Layout>
  );
};

export default EditTenant;
