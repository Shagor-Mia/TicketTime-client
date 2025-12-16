import React from "react";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../../hooks/useSecureAxios";

const statusBadge = {
  pending: "badge-warning",
  approved: "badge-success",
  rejected: "badge-error",
};

const MyAddedTickets = () => {
  const axiosSecure = useSecureAxios();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["vendor-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/vendor/me");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="p-4">Loading tickets...</p>;
  }

  return (
    <div className="overflow-x-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">My Added Tickets</h1>

      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Ticket</th>
            <th>Route</th>
            <th>Transport</th>
            <th>Departure</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {tickets.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center text-gray-500">
                No tickets found
              </td>
            </tr>
          ) : (
            tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                {/* index */}
                <th>{index + 1}</th>

                {/* ticket title + image */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={ticket.image} alt={ticket.title} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{ticket.title}</div>
                      <div className="text-sm opacity-50">
                        {ticket.perks?.join(", ")}
                      </div>
                    </div>
                  </div>
                </td>

                {/* route */}
                <td className="capitalize">
                  {ticket.from} → {ticket.to}
                </td>

                {/* transport */}
                <td>{ticket.transportType}</td>

                {/* departure */}
                <td>{new Date(ticket.departure).toLocaleString()}</td>

                {/* price */}
                <td>${ticket.price}</td>

                {/* quantity */}
                <td>{ticket.quantity}</td>

                {/* status */}
                <td>
                  <span
                    className={`badge capitalize ${
                      statusBadge[ticket.verificationStatus]
                    }`}
                  >
                    {ticket.verificationStatus}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyAddedTickets;
