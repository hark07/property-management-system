import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";

import { getTenant } from "../../services/tenantService";

const TenantDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [tenant, setTenant] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTenant();
  }, [id]);

  const fetchTenant = async () => {
    try {
      setLoading(true);

      const data = await getTenant(id);

      setTenant(data.tenant);
    } catch (error) {
      toast.error(error.response?.data?.message || "Tenant not found.");

      navigate("/tenants");
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
          Loading tenant details...
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
            Tenant Details
          </h1>

          <p
            className="
            text-gray-500
          "
          >
            View complete tenant information.
          </p>
        </div>

        <button
          onClick={() => navigate(`/tenants/edit/${tenant._id}`)}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-3
            rounded-lg
          "
        >
          Edit Tenant
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
        <h2
          className="
          text-2xl
          font-bold
          mb-6
        "
        >
          {tenant.user?.name || "N/A"}
        </h2>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-5
        "
        >
          <Info label="Email" value={tenant.user?.email || "N/A"} />

          <Info label="Property" value={tenant.property?.title || "N/A"} />

          <Info label="Property City" value={tenant.property?.city || "N/A"} />

          <Info
            label="Lease Start"
            value={
              tenant.leaseStart
                ? new Date(tenant.leaseStart).toLocaleDateString()
                : "N/A"
            }
          />

          <Info
            label="Lease End"
            value={
              tenant.leaseEnd
                ? new Date(tenant.leaseEnd).toLocaleDateString()
                : "N/A"
            }
          />

          <Info label="Monthly Rent" value={`Rs. ${tenant.monthlyRent || 0}`} />

          <Info
            label="Security Deposit"
            value={`Rs. ${tenant.securityDeposit || 0}`}
          />

          <Info label="Status" value={tenant.status} />
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

export default TenantDetails;
