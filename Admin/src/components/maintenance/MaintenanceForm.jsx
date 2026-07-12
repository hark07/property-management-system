import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { getProperties } from "../../services/propertyService";

const MaintenanceForm = ({ initialData = {}, onSubmit, loading = false }) => {
  const [properties, setProperties] = useState([]);

  const [formData, setFormData] = useState({
    property: initialData.property?._id || initialData.property || "",

    issueTitle: initialData.issueTitle || "",

    description: initialData.description || "",

    priority: initialData.priority || "Medium",

    status: initialData.status || "Pending",

    images: initialData.images || [],

    resolutionNote: initialData.resolutionNote || "",
  });

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
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

      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.property || !formData.issueTitle || !formData.description) {
      return toast.error("Please fill all required fields.");
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
        Maintenance Request
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

        {properties.map((property) => (
          <option key={property._id} value={property._id}>
            {property.title}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="issueTitle"
        value={formData.issueTitle}
        onChange={handleChange}
        placeholder="Issue Title"
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
        placeholder="Describe issue"
        rows="5"
        className="
          w-full
          border
          rounded-lg
          p-3
        "
      />

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="
          w-full
          border
          rounded-lg
          p-3
        "
      >
        <option value="Low">Low</option>

        <option value="Medium">Medium</option>

        <option value="High">High</option>

        <option value="Emergency">Emergency</option>
      </select>

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
        <option value="Pending">Pending</option>

        <option value="Accepted">Accepted</option>

        <option value="In Progress">In Progress</option>

        <option value="Completed">Completed</option>

        <option value="Cancelled">Cancelled</option>
      </select>

      <textarea
        name="resolutionNote"
        value={formData.resolutionNote}
        onChange={handleChange}
        placeholder="Resolution Note"
        rows="3"
        className="
          w-full
          border
          rounded-lg
          p-3
        "
      />

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
        {loading ? "Saving..." : "Save Maintenance"}
      </button>
    </form>
  );
};

export default MaintenanceForm;
