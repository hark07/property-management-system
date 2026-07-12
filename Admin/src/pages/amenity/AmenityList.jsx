import { useEffect, useMemo, useState } from "react";

import { FaPlus, FaSearch } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";

import AmenityTable from "../../components/amenity/AmenityTable";

import { getAmenities, deleteAmenity } from "../../services/amenityService";

const AmenityList = () => {
  const navigate = useNavigate();

  const [amenities, setAmenities] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchAmenities();
  }, []);

  const fetchAmenities = async () => {
    try {
      setLoading(true);

      const data = await getAmenities();

      setAmenities(data.amenities || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load amenities.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this amenity?");

    if (!confirmDelete) return;

    try {
      const data = await deleteAmenity(id);

      toast.success(data.message);

      fetchAmenities();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed.");
    }
  };

  const filteredAmenities = useMemo(() => {
    return amenities.filter((item) => {
      const text = search.toLowerCase();

      const name = item.name?.toLowerCase() || "";

      const property = item.property?.title?.toLowerCase() || "";

      const searchMatch = name.includes(text) || property.includes(text);

      const statusMatch =
        statusFilter === "All" || item.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [amenities, search, statusFilter]);

  const totalPages = Math.ceil(filteredAmenities.length / itemsPerPage);

  const paginatedAmenities = filteredAmenities.slice(
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
          Amenities
        </h1>

        <button
          onClick={() => navigate("/amenities/add")}
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
          Add Amenity
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
                Search amenity
              "
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

            <option value="Available">Available</option>

            <option value="Unavailable">Unavailable</option>
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
          Loading amenities...
        </div>
      ) : (
        <>
          <AmenityTable
            amenities={paginatedAmenities}
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

export default AmenityList;
