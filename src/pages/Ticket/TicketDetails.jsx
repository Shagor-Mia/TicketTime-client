import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TicketDetails = ({ ticket, onBack }) => {
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  // Countdown Logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const dep = new Date(ticket.departure);
      const diff = dep - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
      } else {
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${h}h ${m}m ${s}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [ticket]);

  // Booking Handler
  const handleBooking = () => {
    if (qty > ticket.quantity) {
      setError("Booking quantity cannot exceed available tickets.");
      return;
    }

    alert("Booking saved with Pending status!");
  };

  const disabled = timeLeft === "Expired" || ticket.quantity === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-3xl mx-auto"
    >
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-gray-200 rounded-lg"
      >
        ← Back
      </button>

      <div className="bg-white shadow-md rounded-2xl overflow-hidden">
        <img src={ticket.image} className="w-full h-64 object-cover" />

        <div className="p-6 space-y-3">
          <h1 className="text-2xl font-bold">{ticket.title}</h1>

          <p className="text-gray-600 text-lg">
            {ticket.from} → {ticket.to}
          </p>
          <p>Transport: {ticket.type}</p>
          <p className="text-xl font-semibold">৳ {ticket.price}</p>
          <p>Available: {ticket.quantity}</p>

          <div className="flex gap-2 flex-wrap text-xs text-gray-600">
            {ticket.perks.map((p, i) => (
              <span key={i} className="bg-gray-100 px-3 py-1 rounded-full">
                {p}
              </span>
            ))}
          </div>

          <p className="text-gray-500">Departure: {ticket.departure}</p>
          <p className="font-medium">⏳ Countdown: {timeLeft}</p>

          <div className="pt-4 border-t">
            <label className="block mb-1">Enter Quantity:</label>

            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="border p-2 w-full rounded-lg"
            />

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            <button
              disabled={disabled}
              onClick={handleBooking}
              className={`w-full mt-4 p-3 rounded-lg text-white ${
                disabled ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TicketDetails;
