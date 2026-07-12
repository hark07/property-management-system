import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { getProperties } from "../../services/propertyService";

import { getAmenities } from "../../services/amenityService";

const BookingForm = ({ initialData = {}, onSubmit, loading = false }) => {
  const [properties, setProperties] = useState([]);

  const [amenities, setAmenities] = useState([]);

  const [formData, setFormData] = useState({
    property: initialData.property?._id || initialData.property || "",

    amenity: initialData.amenity?._id || initialData.amenity || "",

    bookingDate: initialData.bookingDate
      ? initialData.bookingDate.substring(0, 10)
      : "",

    checkIn: initialData.checkIn || "",

    checkOut: initialData.checkOut || "",

    purpose: initialData.purpose || "",

    guests: initialData.guests || 1,

    status: initialData.status || "Pending",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const propertyData = await getProperties();

      setProperties(propertyData.properties || []);

      const amenityData = await getAmenities();

      setAmenities(amenityData.amenities || []);
    } catch (error) {
      toast.error("Failed to load properties and amenities.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: name === "guests" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.property ||
      !formData.amenity ||
      !formData.bookingDate ||
      !formData.checkIn ||
      !formData.checkOut
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
        font-bold
        "
      >
        Booking Information
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

      <select
        name="amenity"
        value={formData.amenity}
        onChange={handleChange}
        className="
        w-full
        border
        rounded-lg
        p-3
        "
      >
        <option value="">Select Amenity</option>

        {amenities.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="bookingDate"
        value={formData.bookingDate}
        onChange={handleChange}
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
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          className="
          border
          rounded-lg
          p-3
          "
        />

        <input
          type="time"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          className="
          border
          rounded-lg
          p-3
          "
        />
      </div>

      <textarea
        name="purpose"
        value={formData.purpose}
        onChange={handleChange}
        placeholder="Purpose"
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
        name="guests"
        min="1"
        value={formData.guests}
        onChange={handleChange}
        placeholder="Guests"
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
        <option value="Pending">Pending</option>

        <option value="Approved">Approved</option>

        <option value="Rejected">Rejected</option>

        <option value="Completed">Completed</option>

        <option value="Cancelled">Cancelled</option>
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
        {loading ? "Saving..." : "Save Booking"}
      </button>
    </form>
  );
};

export default BookingForm;
