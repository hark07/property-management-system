import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";

import TenantForm from "../../components/tenant/TenantForm";

import { createTenant } from "../../services/tenantService";

const AddTenant = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const data = await createTenant(formData);

      toast.success(data.message || "Tenant created successfully.");

      navigate("/tenants");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create tenant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1
          className="
          text-3xl
          font-bold
        "
        >
          Add Tenant
        </h1>

        <p
          className="
          text-gray-500
          mt-2
        "
        >
          Assign a tenant to a property.
        </p>
      </div>

      <TenantForm onSubmit={handleSubmit} loading={loading} />
    </Layout>
  );
};

export default AddTenant;
