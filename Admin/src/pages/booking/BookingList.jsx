import { useEffect, useMemo, useState } from "react";

import { FaPlus, FaSearch } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";

import BookingTable from "../../components/booking/BookingTable";

import { getAllBookings, deleteBooking } from "../../services/bookingService";

const BookingList = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const data = await getAllBookings();

      console.log("BOOKINGS RESPONSE:", data);

      setBookings(data.bookings || []);
    } catch (error) {
      console.log("BOOKING ERROR:", error.response);

      toast.error(error.response?.data?.message || "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this booking?");

    if (!confirmDelete) return;

    try {
      const data = await deleteBooking(id);

      toast.success(data.message);

      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed.");
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((item) => {
      const searchText = search.toLowerCase();

      const property = item.property?.title?.toLowerCase() || "";

      const tenant = item.tenant?.name?.toLowerCase() || "";

      const amenity = item.amenity?.name?.toLowerCase() || "";

      const searchMatch =
        property.includes(searchText) ||
        tenant.includes(searchText) ||
        amenity.includes(searchText);

      const statusMatch =
        statusFilter === "All" || item.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [bookings, search, statusFilter]);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,

    currentPage * itemsPerPage,
  );

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
        <h1
          className="
          text-3xl
          font-bold
          "
        >
          Bookings
        </h1>

        <button
          onClick={() => navigate("/bookings/add")}
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-3
          rounded-lg
          flex
          items-center
          gap-2
          "
        >
          <FaPlus />
          Add Booking
        </button>
      </div>

      <div
        className="
        bg-white
        rounded-xl
        shadow
        p-5
        mb-6
        "
      >
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
          "
        >
          <div
            className="
            flex
            items-center
            border
            rounded-lg
            px-3
            "
          >
            <FaSearch
              className="
              text-gray-400
              "
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="
              Search property, tenant, amenity
              "
              className="
              w-full
              p-3
              outline-none
              "
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
            border
            rounded-lg
            p-3
            "
          >
            <option value="All">All Status</option>

            <option value="Pending">Pending</option>

            <option value="Approved">Approved</option>

            <option value="Rejected">Rejected</option>

            <option value="Completed">Completed</option>

            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div
          className="
            bg-white
            rounded-xl
            shadow
            p-8
            text-center
            "
        >
          Loading bookings...
        </div>
      ) : (
        <>
          <BookingTable bookings={paginatedBookings} onDelete={handleDelete} />

          <div
            className="
              flex
              justify-center
              gap-3
              mt-6
              "
          >
            {Array.from({
              length: totalPages,
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`
                    px-4
                    py-2
                    rounded-lg

                    ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-white shadow"
                    }

                    `}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
};

export default BookingList;
