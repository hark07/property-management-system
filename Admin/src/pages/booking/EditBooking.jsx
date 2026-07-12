import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";

import BookingForm from "../../components/booking/BookingForm";

import { getBooking, updateBooking } from "../../services/bookingService";

const EditBooking = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  const [loading, setLoading] = useState(false);

  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      setFetching(true);

      const data = await getBooking(id);

      setBooking(data.booking);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load booking.");

      navigate("/bookings");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const data = await updateBooking(id, formData);

      toast.success(data.message || "Booking updated successfully.");

      navigate("/bookings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
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
          Loading booking...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="
        mb-6
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          "
        >
          Edit Booking
        </h1>

        <p
          className="
          text-gray-500
          mt-2
          "
        >
          Update booking details.
        </p>
      </div>

      <BookingForm
        initialData={booking}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </Layout>
  );
};

export default EditBooking;
