import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getProperties } from "../../services/propertyService";

const TenantForm = ({ initialData = {}, onSubmit, loading = false }) => {
  const [properties, setProperties] = useState([]);

  const [formData, setFormData] = useState({
    user: initialData.user?._id || initialData.user || "",

    property: initialData.property?._id || initialData.property || "",

    leaseStart: initialData.leaseStart
      ? initialData.leaseStart.substring(0, 10)
      : "",

    leaseEnd: initialData.leaseEnd ? initialData.leaseEnd.substring(0, 10) : "",

    monthlyRent: initialData.monthlyRent || "",

    securityDeposit: initialData.securityDeposit || 0,

    status: initialData.status || "Active",
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

    if (
      !formData.user ||
      !formData.property ||
      !formData.leaseStart ||
      !formData.leaseEnd ||
      !formData.monthlyRent
    ) {
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
        font-semibold
      "
      >
        Tenant Assignment
      </h2>

      <input
        type="text"
        name="user"
        value={formData.user}
        onChange={handleChange}
        placeholder="Enter User ID"
        className="
          w-full
          border
          rounded-lg
          p-3
        "
      />

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

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      "
      >
        <input
          type="date"
          name="leaseStart"
          value={formData.leaseStart}
          onChange={handleChange}
          className="
            border
            rounded-lg
            p-3
          "
        />

        <input
          type="date"
          name="leaseEnd"
          value={formData.leaseEnd}
          onChange={handleChange}
          className="
            border
            rounded-lg
            p-3
          "
        />

        <input
          type="number"
          name="monthlyRent"
          value={formData.monthlyRent}
          onChange={handleChange}
          placeholder="Monthly Rent"
          className="
            border
            rounded-lg
            p-3
          "
        />

        <input
          type="number"
          name="securityDeposit"
          value={formData.securityDeposit}
          onChange={handleChange}
          placeholder="Security Deposit"
          className="
            border
            rounded-lg
            p-3
          "
        />
      </div>

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
        <option value="Active">Active</option>

        <option value="Expired">Expired</option>

        <option value="Terminated">Terminated</option>
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
        {loading ? "Saving..." : "Save Tenant"}
      </button>
    </form>
  );
};

export default TenantForm;
