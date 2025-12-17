import React from "react";
import TicketCard from "./TicketCard";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Advertising = () => {
  const axios = useAxios();
  const {
    data: tickets = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["advertise-tickets"],
    queryFn: async () => {
      const res = await axios.get("/advertise");
      return res.data; // array
    },
  });

  if (isLoading) {
    return <p className="text-center py-10">Loading featured tickets...</p>;
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load advertised tickets
      </p>
    );
  }

  if (tickets.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">
        No advertised tickets available
      </p>
    );
  }

  return (
    <section className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-2 text-center">Featured Tickets</h2>
      <h3 className="text-center text-gray-600 mb-6 text-lg">
        Book your next journey effortlessly with our most popular travel
        tickets.
      </h3>

      <div className="flex gap-6 overflow-x-auto py-4 px-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
        {tickets.map((ticket) => (
          <motion.div
            key={ticket._id}
            className="min-w-[250px] sm:min-w-full"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <TicketCard ticket={ticket} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Advertising;
