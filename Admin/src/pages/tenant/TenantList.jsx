import { useEffect, useMemo, useState } from "react";

import { FaPlus, FaSearch } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";

import TenantTable from "../../components/tenant/TenantTable";

import { deleteTenant, getTenants } from "../../services/tenantService";

const TenantList = () => {
  const navigate = useNavigate();

  const [tenants, setTenants] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      setLoading(true);

      const data = await getTenants();

      setTenants(data.tenants || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load tenants.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this tenant?");

    if (!confirmDelete) return;

    try {
      const data = await deleteTenant(id);

      toast.success(data.message);

      fetchTenants();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed.");
    }
  };

  const filteredTenants = useMemo(() => {
    return tenants.filter((tenant) => {
      const name = tenant.user?.name?.toLowerCase() || "";

      const email = tenant.user?.email?.toLowerCase() || "";

      const property = tenant.property?.title?.toLowerCase() || "";

      const searchText = search.toLowerCase();

      const searchMatch =
        name.includes(searchText) ||
        email.includes(searchText) ||
        property.includes(searchText);

      const statusMatch =
        statusFilter === "All" || tenant.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [tenants, search, statusFilter]);

  const totalPages = Math.ceil(filteredTenants.length / itemsPerPage);

  const paginatedTenants = filteredTenants.slice(
    (currentPage - 1) * itemsPerPage,

    currentPage * itemsPerPage,
  );

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
        <h1
          className="
          text-3xl
          font-bold
        "
        >
          Tenants
        </h1>

        <button
          onClick={() => navigate("/tenants/add")}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-3
            rounded-lg
            flex
            items-center
            gap-2
          "
        >
          <FaPlus />
          Add Tenant
        </button>
      </div>

      <div
        className="
        bg-white
        rounded-xl
        shadow
        p-5
        mb-6
      "
      >
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
        "
        >
          <div
            className="
            flex
            items-center
            border
            rounded-lg
            px-3
          "
          >
            <FaSearch
              className="
              text-gray-400
            "
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="
                Search tenant
              "
              className="
                p-3
                w-full
                outline-none
              "
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
              border
              rounded-lg
              p-3
            "
          >
            <option value="All">All Status</option>

            <option value="Active">Active</option>

            <option value="Expired">Expired</option>

            <option value="Terminated">Terminated</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div
          className="
            bg-white
            rounded-xl
            shadow
            p-8
            text-center
          "
        >
          Loading tenants...
        </div>
      ) : (
        <>
          <TenantTable tenants={paginatedTenants} onDelete={handleDelete} />

          <div
            className="
              flex
              justify-center
              gap-3
              mt-6
            "
          >
            {Array.from({
              length: totalPages,
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`
                        px-4
                        py-2
                        rounded-lg

                        ${
                          currentPage === index + 1
                            ? "bg-blue-600 text-white"
                            : "bg-white shadow"
                        }
                      `}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
};

export default TenantList;
