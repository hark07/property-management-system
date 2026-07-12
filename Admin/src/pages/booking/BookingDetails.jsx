import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";

import { getBooking } from "../../services/bookingService";

const BookingDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      setLoading(true);

      const data = await getBooking(id);

      setBooking(data.booking);
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking not found.");

      navigate("/bookings");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div
          className="
          bg-white
          rounded-xl
          shadow
          p-8
          text-center
          "
        >
          Loading booking details...
        </div>
      </Layout>
    );
  }

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
            Booking Details
          </h1>

          <p
            className="
            text-gray-500
            mt-2
            "
          >
            View complete booking information.
          </p>
        </div>

        <button
          onClick={() => navigate(`/bookings/edit/${booking._id}`)}
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-3
          rounded-lg
          "
        >
          Edit Booking
        </button>
      </div>

      <div
        className="
        bg-white
        rounded-xl
        shadow
        p-6
        "
      >
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-5
          "
        >
          <Info label="Property" value={booking.property?.title || "N/A"} />

          <Info label="Amenity" value={booking.amenity?.name || "N/A"} />

          <Info label="Tenant" value={booking.tenant?.name || "N/A"} />

          <Info label="Tenant Email" value={booking.tenant?.email || "N/A"} />

          <Info
            label="Booking Date"
            value={
              booking.bookingDate
                ? new Date(booking.bookingDate).toLocaleDateString()
                : "-"
            }
          />

          <Info
            label="Time"
            value={`${booking.checkIn} - ${booking.checkOut}`}
          />

          <Info label="Guests" value={booking.guests} />

          <Info label="Status" value={booking.status} />

          <div
            className="
            md:col-span-2
            "
          >
            <p
              className="
              text-sm
              text-gray-500
              "
            >
              Purpose
            </p>

            <div
              className="
              mt-2
              bg-gray-50
              rounded-lg
              p-4
              "
            >
              {booking.purpose || "-"}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Info = ({ label, value }) => {
  return (
    <div
      className="
      bg-gray-50
      rounded-lg
      p-4
      "
    >
      <p
        className="
        text-sm
        text-gray-500
        "
      >
        {label}
      </p>

      <p
        className="
        font-semibold
        mt-1
        "
      >
        {value}
      </p>
    </div>
  );
};

export default BookingDetails;
