import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";

import BookingForm from "../../components/booking/BookingForm";

import { createBooking } from "../../services/bookingService";

const AddBooking = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const data = await createBooking(formData);

      toast.success(data.message || "Booking created successfully.");

      navigate("/bookings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create booking.");
    } finally {
      setLoading(false);
    }
  };

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
          Add Booking
        </h1>

        <p
          className="
          text-gray-500
          mt-2
          "
        >
          Create a new booking request.
        </p>
      </div>

      <BookingForm onSubmit={handleSubmit} loading={loading} />
    </Layout>
  );
};

export default AddBooking;
