import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";

import MaintenanceForm from "../../components/maintenance/MaintenanceForm";

import { createMaintenance } from "../../services/maintenanceService";

const AddMaintenance = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const data = await createMaintenance(formData);

      toast.success(data.message || "Maintenance created successfully.");

      navigate("/maintenance");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create maintenance.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div
        className="
        mb-6
      "
      >
        <h1
          className="
          text-3xl
          font-bold
        "
        >
          Add Maintenance Request
        </h1>

        <p
          className="
          text-gray-500
          mt-2
        "
        >
          Create a new maintenance issue.
        </p>
      </div>

      <MaintenanceForm onSubmit={handleSubmit} loading={loading} />
    </Layout>
  );
};

export default AddMaintenance;
