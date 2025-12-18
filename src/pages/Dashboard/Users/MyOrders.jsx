import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useSecureAxios from "../../../hooks/useSecureAxios";
import MyBookedTicketCard from "../../../components/Bookings/MyBookedTicketCard";
import LoadingSpinner from "../../../components/shared/Spinner";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const MyOrders = () => {
  const axiosSecure = useSecureAxios();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [transportType, setTransportType] = useState("");
  const limit = 6;

  const { data, isLoading } = useQuery({
    queryKey: ["my-bookings", page, searchText, transportType],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/user", {
        params: { page, limit, searchText, transportType },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <LoadingSpinner />;

  const bookings = data?.bookings || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">My Booked Tickets</h2>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search tickets..."
          value={searchText}
          onChange={(e) => {
            setPage(1);
            setSearchText(e.target.value);
          }}
          className="input input-bordered w-full sm:w-64"
        />

        <select
          value={transportType}
          onChange={(e) => {
            setPage(1);
            setTransportType(e.target.value);
          }}
          className="select select-bordered w-full sm:w-64"
        >
          <option value="">All Transport Types</option>
          <option value="Bus">Bus</option>
          <option value="Flight">Flight</option>
          <option value="Train">Train</option>
        </select>
      </div>

      {/* Bookings */}
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          No bookings found for the selected filters.
        </p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {bookings.map((booking) => (
            <motion.div key={booking._id} variants={itemVariants}>
              <MyBookedTicketCard booking={booking} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="btn btn-outline"
          >
            Prev
          </button>

          <span className="flex items-center">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="btn btn-outline"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
