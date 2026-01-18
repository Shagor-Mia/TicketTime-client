import React from "react";
import TicketCard from "./TicketCard";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import LoadingSpinner from "../shared/Spinner";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
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
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <p className="text-center py-10 text-error">
        Failed to load advertised tickets
      </p>
    );
  }

  if (tickets.length === 0) {
    return (
      <p className="text-center py-10 text-base-content/60">
        No advertised tickets available
      </p>
    );
  }

  const advertises = tickets.slice(0, 6);

  return (
    <section className="mt-10 py-10 rounded-2xl bg-base-200">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center mb-8 px-4">
        <h2 className="text-2xl md:text-5xl font-bold text-base-content">
          Featured Tickets
        </h2>
        <p className="mt-2 text-sm sm:text-base text-base-content/70">
          Book your next journey effortlessly with our most popular travel
          tickets.
        </p>
      </div>

      {/* Cards Container */}
      <motion.div
        className="
          h-[400px] overflow-y-auto
          sm:h-auto sm:overflow-visible
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-5 sm:gap-6
          px-4
        "
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {advertises.map((ticket) => (
          <motion.div
            key={ticket._id}
            variants={cardVariants}
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mb-4"
          >
            <TicketCard ticket={ticket} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Advertising;
