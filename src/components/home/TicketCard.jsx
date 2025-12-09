import React from "react";
import { useNavigate } from "react-router";

const TicketCard = ({ ticket }) => {
  const navigate = useNavigate();

  const handleSeeDetails = () => {
    navigate(`/tickets/${ticket.id}`);
  };

  return (
    <div className=" rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={ticket.image}
        alt={ticket.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{ticket.title}</h3>
        <p className="text-gray-600 mb-1">
          <strong>Price:</strong> ${ticket.price} / unit
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Quantity:</strong> {ticket.quantity}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Transport:</strong> {ticket.transport}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Perks:</strong> {ticket.perks}
        </p>
        <button
          onClick={handleSeeDetails}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
