import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";

import MaintenanceForm from "../../components/maintenance/MaintenanceForm";

import {
  getMaintenance,
  updateMaintenance,
} from "../../services/maintenanceService";

const EditMaintenance = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [maintenance, setMaintenance] = useState(null);

  const [loading, setLoading] = useState(false);

  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchMaintenance();
  }, [id]);

  const fetchMaintenance = async () => {
    try {
      setFetching(true);

      const data = await getMaintenance(id);

      setMaintenance(data.maintenance);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load maintenance.",
      );

      navigate("/maintenance");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const data = await updateMaintenance(
        id,

        formData,
      );

      toast.success(data.message || "Maintenance updated successfully.");

      navigate("/maintenance");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed.");
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
          Loading maintenance...
        </div>
      </Layout>
    );
  }

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
          Edit Maintenance
        </h1>

        <p
          className="
          text-gray-500
        "
        >
          Update maintenance request details.
        </p>
      </div>

      <MaintenanceForm
        initialData={maintenance}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </Layout>
  );
};

export default EditMaintenance;
