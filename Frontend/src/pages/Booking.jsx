import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getPropertyById } from "../services/propertyService";
import { createBooking } from "../services/bookingService";
import { getAmenitiesByProperty } from "../services/amenityService";

const Booking = () => {
  const { propertyId } = useParams();

  const [property, setProperty] = useState(null);
  const [amenities, setAmenities] = useState([]);

  const [formData, setFormData] = useState({
    amenity: "",
    bookingDate: "",
    checkIn: "",
    checkOut: "",
    purpose: "",
    guests: 1,
  });

  useEffect(() => {
    fetchData();
  }, [propertyId]);

  const fetchData = async () => {
    try {
      const propertyRes = await getPropertyById(propertyId);
      setProperty(propertyRes.property);

      const amenityRes = await getAmenitiesByProperty(propertyId);

      setAmenities(amenityRes.amenities || []);
    } catch (error) {
      toast.error("Failed to load booking page");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amenity) {
      toast.error("Please select an amenity");
      return;
    }

    try {
      await createBooking({
        property: propertyId,
        amenity: formData.amenity,
        bookingDate: formData.bookingDate,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        purpose: formData.purpose,
        guests: Number(formData.guests),
      });

      toast.success("Booking request sent");

      setFormData({
        amenity: "",
        bookingDate: "",
        checkIn: "",
        checkOut: "",
        purpose: "",
        guests: 1,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  if (!property) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <section className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-5">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-3">Book {property.title}</h1>

          <p className="text-blue-600 font-bold text-2xl mb-6">
            Rs. {property.rent}/month
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium">Select Amenity</label>

              <select
                name="amenity"
                value={formData.amenity}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              >
                <option value="">Select Amenity</option>

                {amenities.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Booking Date</label>

              <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 font-medium">Check In</label>

                <input
                  type="time"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Check Out</label>

                <input
                  type="time"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">Purpose</label>

              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                rows="4"
                placeholder="Purpose of booking"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Guests</label>

              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                min="1"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Booking;
