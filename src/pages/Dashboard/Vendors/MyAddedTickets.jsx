import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useSecureAxios from "../../../hooks/useSecureAxios";
import LoadingSpinner from "../../../components/shared/Spinner";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";

const badgeColor = {
  pending: "badge-warning",
  approved: "badge-success",
  rejected: "badge-error",
};

const MyAddedTickets = () => {
  const axiosSecure = useSecureAxios();
  const queryClient = useQueryClient();

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 6;
  const [searchText, setSearchText] = useState("");
  const [transportType, setTransportType] = useState("");

  /* ---------------- Fetch Tickets ---------------- */
  const { data, isLoading } = useQuery({
    queryKey: ["vendor-tickets", page, searchText, transportType],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/vendor/me", {
        params: { page, limit, searchText, transportType },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const tickets = data?.tickets || [];
  const totalPages = data?.totalPages || 1;

  /* ---------------- Delete Ticket ---------------- */
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/tickets/vendor/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["vendor-tickets"]);
      Swal.fire("Deleted!", "Ticket has been deleted.", "success");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This ticket will be permanently deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  /* ---------------- Update Ticket ---------------- */
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) =>
      axiosSecure.patch(`/tickets/vendor/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["vendor-tickets"]);
      Swal.fire("Updated!", "Ticket updated successfully.", "success");
      setSelectedTicket(null);
    },
  });

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      title: form.title.value,
      price: Number(form.price.value),
      quantity: Number(form.quantity.value),
      departure: form.departure.value,
      transportType: form.transportType.value,
    };

    updateMutation.mutate({
      id: selectedTicket._id,
      payload: updatedData,
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        My Added Tickets
      </h1>

      {/* -------- Filters -------- */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
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

      {/* -------- GRID -------- */}
      {tickets.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No tickets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => {
            const isRejected = ticket.verificationStatus === "rejected";

            return (
              <div key={ticket._id} className="card bg-base-100 shadow-md ">
                <figure className="h-48 rounded-lg overflow-hidden">
                  <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="w-full h-full pt-2 px-2  object-cover"
                  />
                </figure>

                <div className="card-body">
                  <h2 className="card-title">{ticket.title}</h2>

                  <p className="text-sm">
                    {ticket.from} → {ticket.to}
                  </p>

                  <p className="text-sm">Transport: {ticket.transportType}</p>
                  <p className="text-sm">Price: ${ticket.price}</p>
                  <p className="text-sm">Quantity: {ticket.quantity}</p>

                  <span
                    className={`badge mt-2 capitalize ${
                      badgeColor[ticket.verificationStatus]
                    }`}
                  >
                    {ticket.verificationStatus}
                  </span>

                  {/* -------- ACTIONS -------- */}
                  <div className="card-actions  mt-4">
                    <button
                      className="btn btn-sm btn-info"
                      disabled={isRejected}
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <FaEdit /> Update
                    </button>

                    <button
                      className="btn btn-sm btn-error"
                      disabled={isRejected}
                      onClick={() => handleDelete(ticket._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* -------- Pagination -------- */}
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

      {/* -------- UPDATE MODAL -------- */}
      {selectedTicket && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Update Ticket</h3>

            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <input
                name="title"
                defaultValue={selectedTicket.title}
                className="input input-bordered w-full"
                placeholder="Title"
              />

              <input
                name="price"
                type="number"
                defaultValue={selectedTicket.price}
                className="input input-bordered w-full"
                placeholder="Price"
              />

              <input
                name="quantity"
                type="number"
                defaultValue={selectedTicket.quantity}
                className="input input-bordered w-full"
                placeholder="Quantity"
              />

              <input
                name="departure"
                type="datetime-local"
                defaultValue={selectedTicket.departure?.slice(0, 16)}
                className="input input-bordered w-full"
              />

              <select
                name="transportType"
                defaultValue={selectedTicket.transportType || ""}
                className="select select-bordered w-full"
              >
                <option value="">Select Transport Type</option>
                <option value="Bus">Bus</option>
                <option value="Flight">Flight</option>
                <option value="Train">Train</option>
              </select>

              <div className="modal-action">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setSelectedTicket(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyAddedTickets;
