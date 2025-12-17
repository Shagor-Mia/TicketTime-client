import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import useSecureAxios from "../../../hooks/useSecureAxios";
import Swal from "sweetalert2";

const Advertise = () => {
  const axiosSecure = useSecureAxios();

  const [page, setPage] = useState(1);
  const limit = 6;
  const [searchText, setSearchText] = useState("");
  const [transportType, setTransportType] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["image-tickets", page, limit, searchText, transportType],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/advertise", {
        params: { page, limit, searchText, transportType },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const tickets = data?.tickets || [];
  const totalPages = data?.totalPages || 1;

  const handleAddAdvertise = async (ticket) => {
    try {
      await axiosSecure.post("/advertise", {
        ticketId: ticket._id,
      });

      Swal.fire({
        icon: "success",
        title: "Advertised!",
        text: "Ticket added to advertise list",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  if (error) {
    return (
      <p className="text-center text-red-500 py-10">Failed to load tickets</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">All Tickets</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search by title, from, to"
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

      {/* Tickets */}
      {isLoading ? (
        <p className="text-center py-10">Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p className="text-center py-10">No tickets found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {tickets.map((ticket) => (
              <motion.div
                key={ticket._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <img
                  src={ticket.image || "https://via.placeholder.com/400x250"}
                  alt={ticket.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">{ticket.title}</h3>
                  <p className="text-gray-600">
                    {ticket.from} → {ticket.to}
                  </p>
                  <p className="text-sm">Transport: {ticket.transportType}</p>
                  <p className="text-sm font-medium">Price: ${ticket.price}</p>
                  <p className="text-xs text-gray-500">
                    Vendor: {ticket.vendor?.name}
                  </p>
                  <button
                    onClick={() => handleAddAdvertise(ticket)}
                    className="btn btn-sm btn-primary w-full mt-3"
                  >
                    Add Advertise
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
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

export default Advertise;
