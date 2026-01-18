import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AllTicketCard from "../../components/AllTickets/AllTicketCard";
import useSecureAxios from "../../hooks/useSecureAxios";
import LoadingSpinner from "../../components/shared/Spinner";

const AllTicket = () => {
  const axiosSecure = useSecureAxios();

  const [page, setPage] = useState(1);
  const limit = 8;
  const [searchText, setSearchText] = useState("");
  const [transportType, setTransportType] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["approvedTickets", page, limit, searchText, transportType],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/approved", {
        params: { page, limit, searchText, transportType },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const tickets = data?.tickets || [];
  const totalPages = data?.totalPages || 1;

  if (error) {
    return (
      <p className="text-center text-red-500 py-10">Failed to load tickets</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 ">
      <h2 className="md:text-5xl text-3xl font-bold mb-6 text-center ">
        All Tickets
      </h2>

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
        <LoadingSpinner />
      ) : tickets.length === 0 ? (
        <p className="text-center py-10">No tickets found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tickets.map((ticket) => (
            <AllTicketCard key={ticket._id} ticket={ticket} />
          ))}
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

export default AllTicket;
