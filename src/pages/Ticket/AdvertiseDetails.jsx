import React from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const AdvertiseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useAxios();

  // ---------------- Fetch Ticket ----------------
  const {
    data: ticket,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["advertise-ticket", id],
    queryFn: async () => {
      const res = await axios.get(`/advertise/${id}`);
      return res.data.data; // <- the ticket object
    },
    enabled: !!id,
  });

  console.log(ticket);

  // ---------------- UI States ----------------
  if (isLoading) {
    return <p className="text-center mt-10">Loading ticket...</p>;
  }

  if (error || !ticket) {
    return (
      <p className="text-center mt-10 text-red-500">
        Ticket not found or failed to load
      </p>
    );
  }

  // ---------------- UI ----------------
  return (
    <motion.div
      className="max-w-6xl mx-auto md:px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 md:rounded-lg rounded-sm"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-10">
        {/* LEFT: Image & Main Info */}
        <motion.div
          className="space-y-4 md:w-full"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={ticket.image}
            alt={ticket.title}
            className="md:rounded-2xl rounded-xl shadow-md w-full h-[320px] object-cover"
            whileHover={{ scale: 1.01 }}
          />

          <div>
            {" "}
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">{ticket.title}</h1>
              <p className="text-gray-600 text-lg">
                {ticket.from} → {ticket.to}
              </p>
              <p>
                Transport:
                <span className="font-semibold"> {ticket.transportType}</span>
              </p>
              <p>
                Price:
                <span className="font-semibold"> ৳{ticket.price}</span>
              </p>
              <p>
                Available:
                <span className="font-semibold"> {ticket.quantity}</span>
              </p>
            </div>
            {/* Perks */}
            <div className="flex gap-2 flex-wrap text-xs">
              {ticket.perks?.map((p, i) => (
                <span
                  key={i}
                  className="bg-gray-100 px-3 py-1 rounded-full text-gray-600"
                >
                  {p}
                </span>
              ))}
            </div>
            {/* Departure */}
            <p className="text-gray-500">
              Departure: {new Date(ticket.departure).toLocaleDateString()} at{" "}
              {new Date(ticket.departure).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdvertiseDetails;
