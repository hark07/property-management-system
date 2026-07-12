import { useEffect, useState } from "react";

import { FaPlus, FaSearch } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";

import PropertyTable from "../../components/property/PropertyTable";

import { deleteProperty, getProperties } from "../../services/propertyService";

const PropertyList = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [type, setType] = useState("All");

  const [status, setStatus] = useState("All");

  const [city, setCity] = useState("All");

  const [page, setPage] = useState(1);

  const [pages, setPages] = useState(1);

  const [cities, setCities] = useState([]);

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const data = await getProperties({
        search,

        type,

        status,

        city,

        page,

        limit: 5,
      });

      setProperties(data.properties || []);

      setPages(data.pages || 1);

      const uniqueCities = [
        ...new Set(data.properties.map((item) => item.city)),
      ];

      setCities(uniqueCities);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [search, type, status, city, page]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this property?");

    if (!confirm) return;

    try {
      const data = await deleteProperty(id);

      toast.success(data.message);

      fetchProperties();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

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
            Properties
          </h1>

          <p
            className="
            text-gray-500
          "
          >
            Manage all rental properties.
          </p>
        </div>

        <button
          onClick={() => navigate("/properties/add")}
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
          Add Property
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
          md:grid-cols-4
          gap-4
        "
        >
          <div
            className="
            border
            rounded-lg
            flex
            items-center
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
              onChange={(e) => {
                setPage(1);

                setSearch(e.target.value);
              }}
              placeholder="Search title"
              className="
                w-full
                p-3
                outline-none
              "
            />
          </div>

          <select
            value={type}
            onChange={(e) => {
              setPage(1);

              setType(e.target.value);
            }}
            className="
              border
              rounded-lg
              p-3
            "
          >
            <option>All</option>

            <option>Apartment</option>

            <option>House</option>

            <option>Hostel</option>

            <option>Office</option>
          </select>

          <select
            value={status}
            onChange={(e) => {
              setPage(1);

              setStatus(e.target.value);
            }}
            className="
              border
              rounded-lg
              p-3
            "
          >
            <option>All</option>

            <option>Available</option>

            <option>Occupied</option>

            <option>Maintenance</option>
          </select>

          <select
            value={city}
            onChange={(e) => {
              setPage(1);

              setCity(e.target.value);
            }}
            className="
              border
              rounded-lg
              p-3
            "
          >
            <option>All</option>

            {cities.map((item) => (
              <option key={item}>{item}</option>
            ))}
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
          Loading...
        </div>
      ) : (
        <>
          <PropertyTable properties={properties} onDelete={handleDelete} />

          <div
            className="
            flex
            justify-center
            gap-3
            mt-6
          "
          >
            {Array.from({
              length: pages,
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`
              
              px-4
              py-2
              rounded-lg

              ${
                page === index + 1
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

export default PropertyList;
