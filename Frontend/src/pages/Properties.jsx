import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PropertyCard from "../components/property/PropertyCard";
import { getProperties } from "../services/propertyService";

const Properties = () => {
  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    type: "All",
    city: "All",
  });

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const data = await getProperties(filters);

      setProperties(data.properties || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    fetchProperties();
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,

      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      className="
        min-h-screen
        bg-gray-50
        py-16
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-5
        "
      >
        <div
          className="
            text-center
            mb-10
          "
        >
          <h1
            className="
              text-4xl
              font-bold
            "
          >
            Find Your Property
          </h1>

          <p
            className="
              text-gray-500
              mt-3
            "
          >
            Explore available rental properties
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="
            bg-white
            p-5
            rounded-xl
            shadow
            grid
            grid-cols-1
            md:grid-cols-4
            gap-4
            mb-10
          "
        >
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search property"
            className="
              border
              rounded-lg
              px-4
              py-3
              outline-none
            "
          />

          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="
              border
              rounded-lg
              px-4
              py-3
            "
          >
            <option>All</option>

            <option>House</option>

            <option>Apartment</option>

            <option>Room</option>
          </select>

          <select
            name="city"
            value={filters.city}
            onChange={handleChange}
            className="
              border
              rounded-lg
              px-4
              py-3
            "
          >
            <option>All</option>

            <option>Kathmandu</option>

            <option>Pokhara</option>
          </select>

          <button
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              rounded-lg
              font-semibold
            "
          >
            Search
          </button>
        </form>

        {loading ? (
          <div
            className="
                text-center
                py-10
              "
          >
            Loading properties...
          </div>
        ) : properties.length === 0 ? (
          <div
            className="
                text-center
                py-10
                bg-white
                rounded-xl
              "
          >
            No properties found.
          </div>
        ) : (
          <div
            className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
          >
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Properties;
