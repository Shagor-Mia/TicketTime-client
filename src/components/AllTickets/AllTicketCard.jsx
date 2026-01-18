import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const AllTicketCard = ({ ticket }) => {
  const navigate = useNavigate();
  const isExpired = new Date(ticket.departure) < new Date();
  const outOfStock = ticket.quantity === 0;

  const departureDate = new Date(ticket.departure);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="rounded-2xl overflow-hidden shadow-md bg-white dark:bg-base-100 text-gray-900 dark:text-base-content">
        <img src={ticket.image} className="w-full h-48 object-cover" />

        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold">{ticket.title}</h3>

          <p className="text-gray-600 dark:text-base-content/70">
            {ticket.from} → {ticket.to}
          </p>

          <p className="text-sm text-gray-700 dark:text-base-content/70">
            Transport: {ticket.transportType}
          </p>

          <p className="font-semibold">৳ {ticket.price}</p>

          <p className="text-sm text-gray-700 dark:text-base-content/70">
            Available: {ticket.quantity}
          </p>

          {/* Departure date and time */}
          <p className="text-sm text-gray-700 dark:text-base-content/70">
            Departure:{" "}
            {departureDate.toLocaleDateString(undefined, {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            at{" "}
            {departureDate.toLocaleTimeString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <div className="flex gap-2 flex-wrap text-xs">
            {ticket.perks.map((p, idx) => (
              <span
                key={idx}
                className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-base-200 dark:text-base-content/80"
              >
                {p}
              </span>
            ))}
          </div>

          <button
            disabled={isExpired || outOfStock}
            onClick={() => navigate(`/ticket/${ticket._id}`)}
            className={`w-full mt-2 p-2 rounded-lg text-white transition ${
              isExpired || outOfStock
                ? "bg-gray-400 dark:bg-base-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            See Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AllTicketCard;
