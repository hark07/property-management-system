import { useEffect, useMemo, useState } from "react";

import { FaPlus, FaSearch } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";

import MaintenanceTable from "../../components/maintenance/MaintenanceTable";

import {
  getMaintenances,
  deleteMaintenance,
} from "../../services/maintenanceService";

const MaintenanceList = () => {
  const navigate = useNavigate();

  const [maintenances, setMaintenances] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [priorityFilter, setPriorityFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchMaintenances();
  }, []);

  const fetchMaintenances = async () => {
    try {
      setLoading(true);

      const data = await getMaintenances();

      setMaintenances(data.maintenances || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load maintenance.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this maintenance request?");

    if (!confirmDelete) return;

    try {
      const data = await deleteMaintenance(id);

      toast.success(data.message);

      fetchMaintenances();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed.");
    }
  };

  const filteredMaintenance = useMemo(() => {
    return maintenances.filter((item) => {
      const searchText = search.toLowerCase();

      const issue = item.issueTitle?.toLowerCase() || "";

      const property = item.property?.title?.toLowerCase() || "";

      const tenant = item.tenant?.name?.toLowerCase() || "";

      const searchMatch =
        issue.includes(searchText) ||
        property.includes(searchText) ||
        tenant.includes(searchText);

      const statusMatch =
        statusFilter === "All" || item.status === statusFilter;

      const priorityMatch =
        priorityFilter === "All" || item.priority === priorityFilter;

      return searchMatch && statusMatch && priorityMatch;
    });
  }, [maintenances, search, statusFilter, priorityFilter]);

  const totalPages = Math.ceil(filteredMaintenance.length / itemsPerPage);

  const paginatedData = filteredMaintenance.slice(
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
          Maintenance Requests
        </h1>

        <button
          onClick={() => navigate("/maintenance/add")}
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
          Add Request
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
            md:grid-cols-3
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
            <FaSearch className="text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search issue, property, tenant"
              className="
                w-full
                p-3
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

            <option value="Pending">Pending</option>

            <option value="Accepted">Accepted</option>

            <option value="In Progress">In Progress</option>

            <option value="Completed">Completed</option>

            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="
              border
              rounded-lg
              p-3
            "
          >
            <option value="All">All Priority</option>

            <option value="Low">Low</option>

            <option value="Medium">Medium</option>

            <option value="High">High</option>

            <option value="Emergency">Emergency</option>
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
          Loading maintenance...
        </div>
      ) : (
        <>
          <MaintenanceTable
            maintenances={paginatedData}
            onDelete={handleDelete}
          />

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

export default MaintenanceList;
