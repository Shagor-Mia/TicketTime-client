import React from "react";
import { useNavigate } from "react-router";

const TicketCard = ({ ticket }) => {
  const navigate = useNavigate();

  const handleSeeDetails = () => {
    navigate(`/advertise/${ticket._id}`);
  };

  return (
    <div className="rounded-sm md:rounded-lg shadow-lg overflow-hidden bg-base-100 text-base-content hover:shadow-xl transition-shadow duration-300">
      <img
        src={ticket.image}
        alt={ticket.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 space-y-1">
        <h3 className="text-xl font-semibold">{ticket.title}</h3>

        <p className="text-base-content/70">
          <strong>Total Ticket:</strong> {ticket.quantity}
        </p>

        <p className="text-base-content/70">
          <strong>Unit Price:</strong> {ticket.price}
        </p>

        <p className="text-base-content/70">
          <strong>Transport:</strong> {ticket.transportType}
        </p>

        <p className="text-base-content/70">
          <strong>Perks:</strong> {ticket.perks.join(", ")}
        </p>

        <button
          onClick={handleSeeDetails}
          className="btn btn-primary btn-sm w-full mt-3"
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
