import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getBookings, deleteBooking } from "../services/bookingService";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const data = await getBookings();

      setBookings(data.bookings || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmCancel) return;

    try {
      await deleteBooking(id);

      toast.success("Booking cancelled successfully.");

      setBookings((prev) => prev.filter((booking) => booking._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel booking.");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Cancelled":
        return "bg-gray-200 text-gray-700";

      case "Completed":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-600">
          Loading bookings...
        </h2>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Bookings</h1>

          <p className="text-gray-500 mt-2">View all your property bookings.</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <h2 className="text-2xl font-semibold mb-2">No Bookings Found</h2>

            <p className="text-gray-500">
              You haven't booked any property yet.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={
                    booking.property?.images?.length > 0
                      ? booking.property.images[0]
                      : "https://placehold.co/800x400?text=Property"
                  }
                  alt={booking.property?.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold">
                      {booking.property?.title}
                    </h2>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                        booking.status,
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="mt-5 space-y-3 text-gray-700">
                    <p>
                      <strong>Address:</strong> {booking.property?.address}
                    </p>

                    <p>
                      <strong>City:</strong> {booking.property?.city}
                    </p>

                    <p>
                      <strong>Rent:</strong> ₹{booking.property?.rent}
                    </p>

                    <p>
                      <strong>Amenity:</strong> {booking.amenity?.name}
                    </p>

                    <p>
                      <strong>Booking Date:</strong>{" "}
                      {formatDate(booking.bookingDate)}
                    </p>

                    <p>
                      <strong>Check In:</strong> {booking.checkIn}
                    </p>

                    <p>
                      <strong>Check Out:</strong> {booking.checkOut}
                    </p>

                    <p>
                      <strong>Guests:</strong> {booking.guests}
                    </p>

                    <p>
                      <strong>Purpose:</strong> {booking.purpose || "N/A"}
                    </p>

                    <p>
                      <strong>Created:</strong> {formatDate(booking.createdAt)}
                    </p>
                  </div>

                  {booking.status === "Pending" && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyBookings;
