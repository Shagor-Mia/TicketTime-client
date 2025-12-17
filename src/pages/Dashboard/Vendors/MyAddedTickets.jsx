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

  /* ---------------- Fetch Tickets ---------------- */
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["vendor-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/vendor/me");
      return res.data;
    },
  });

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
    };

    updateMutation.mutate({
      id: selectedTicket._id,
      payload: updatedData,
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Added Tickets</h1>

      {/* -------- GRID -------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => {
          const isRejected = ticket.verificationStatus === "rejected";

          return (
            <div key={ticket._id} className="card bg-base-100 shadow-md border">
              <figure className="h-48">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="w-full h-full object-cover"
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
                <div className="card-actions justify-end mt-4">
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
