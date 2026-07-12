import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { getProperties } from "../../services/propertyService";

const AmenityForm = ({ initialData = {}, onSubmit, loading = false }) => {
  const [properties, setProperties] = useState([]);

  const [formData, setFormData] = useState({
    property: initialData.property?._id || initialData.property || "",

    name: initialData.name || "",

    description: initialData.description || "",

    capacity: initialData.capacity || 1,

    openingTime: initialData.openingTime || "",

    closingTime: initialData.closingTime || "",

    rules: initialData.rules || "",

    status: initialData.status || "Available",
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const data = await getProperties();

      setProperties(data.properties || []);
    } catch (error) {
      toast.error("Failed to load properties.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: name === "capacity" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.property ||
      !formData.name ||
      !formData.capacity ||
      !formData.openingTime ||
      !formData.closingTime
    ) {
      return toast.error("Please fill required fields.");
    }

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        rounded-xl
        shadow
        p-6
        space-y-5
      "
    >
      <h2
        className="
          text-xl
          font-bold
        "
      >
        Amenity Information
      </h2>

      <select
        name="property"
        value={formData.property}
        onChange={handleChange}
        className="
          w-full
          border
          rounded-lg
          p-3
        "
      >
        <option value="">Select Property</option>

        {properties.map((item) => (
          <option key={item._id} value={item._id}>
            {item.title}
          </option>
        ))}
      </select>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Amenity Name"
        className="
          w-full
          border
          rounded-lg
          p-3
        "
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        rows="3"
        className="
          w-full
          border
          rounded-lg
          p-3
        "
      />

      <input
        type="number"
        name="capacity"
        min="1"
        value={formData.capacity}
        onChange={handleChange}
        placeholder="Capacity"
        className="
          w-full
          border
          rounded-lg
          p-3
        "
      />

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
        "
      >
        <input
          type="time"
          name="openingTime"
          value={formData.openingTime}
          onChange={handleChange}
          className="
            border
            rounded-lg
            p-3
          "
        />

        <input
          type="time"
          name="closingTime"
          value={formData.closingTime}
          onChange={handleChange}
          className="
            border
            rounded-lg
            p-3
          "
        />
      </div>

      <textarea
        name="rules"
        value={formData.rules}
        onChange={handleChange}
        placeholder="Rules"
        rows="3"
        className="
          w-full
          border
          rounded-lg
          p-3
        "
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="
          w-full
          border
          rounded-lg
          p-3
        "
      >
        <option value="Available">Available</option>

        <option value="Unavailable">Unavailable</option>
      </select>

      <button
        disabled={loading}
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-6
          py-3
          rounded-lg
        "
      >
        {loading ? "Saving..." : "Save Amenity"}
      </button>
    </form>
  );
};

export default AmenityForm;
