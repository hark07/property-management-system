import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";

import { getMaintenance } from "../../services/maintenanceService";

const MaintenanceDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [maintenance, setMaintenance] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaintenance();
  }, [id]);

  const fetchMaintenance = async () => {
    try {
      setLoading(true);

      const data = await getMaintenance(id);

      setMaintenance(data.maintenance);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Maintenance request not found.",
      );

      navigate("/maintenance");
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
          Loading maintenance details...
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
          md:items-center
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
            Maintenance Details
          </h1>

          <p className="text-gray-500">View maintenance request information.</p>
        </div>

        <button
          onClick={() => navigate(`/maintenance/edit/${maintenance._id}`)}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-3
            rounded-lg
          "
        >
          Edit Request
        </button>
      </div>

      <div
        className="
          bg-white
          rounded-xl
          shadow
          p-6
        "
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >
          <Info label="Issue Title" value={maintenance.issueTitle} />

          <Info label="Property" value={maintenance.property?.title || "N/A"} />

          <Info label="Tenant" value={maintenance.tenant?.name || "N/A"} />

          <Info
            label="Tenant Email"
            value={maintenance.tenant?.email || "N/A"}
          />

          <Info
            label="Assigned Staff"
            value={maintenance.assignedStaff?.name || "Not Assigned"}
          />

          <Info label="Priority" value={maintenance.priority} />

          <Info label="Status" value={maintenance.status} />

          <Info
            label="Completed At"
            value={
              maintenance.completedAt
                ? new Date(maintenance.completedAt).toLocaleDateString()
                : "-"
            }
          />

          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Description</p>

            <div
              className="
                mt-2
                bg-gray-50
                p-4
                rounded-lg
              "
            >
              {maintenance.description}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Resolution Note</p>

            <div
              className="
                mt-2
                bg-gray-50
                p-4
                rounded-lg
              "
            >
              {maintenance.resolutionNote || "-"}
            </div>
          </div>

          {maintenance.images?.length > 0 && (
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 mb-3">Images</p>

              <div
                className="
                  grid
                  grid-cols-2
                  md:grid-cols-4
                  gap-4
                "
              >
                {maintenance.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Maintenance ${index + 1}`}
                    className="
                      w-full
                      h-40
                      object-cover
                      rounded-lg
                      border
                    "
                  />
                ))}
              </div>
            </div>
          )}
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

export default MaintenanceDetails;
