import React from "react";
import TicketCard from "./TicketCard";
import { motion } from "framer-motion";

// Sample ticket data
const tickets = [
  {
    id: 1,
    image: "/images/bus.jpg",
    title: "Express Bus Ticket",
    price: 15,
    quantity: 50,
    transport: "Bus",
    perks: "WiFi, Reclining Seats",
  },
  {
    id: 2,
    image: "/images/train.jpg",
    title: "Superfast Train Ticket",
    price: 30,
    quantity: 100,
    transport: "Train",
    perks: "AC, Meals Included",
  },
  {
    id: 3,
    image: "/images/launch.jpg",
    title: "River Launch Ticket",
    price: 25,
    quantity: 80,
    transport: "Launch",
    perks: "Scenic View, Snacks",
  },
  {
    id: 4,
    image: "/images/plane.jpg",
    title: "Domestic Flight Ticket",
    price: 100,
    quantity: 200,
    transport: "Plane",
    perks: "In-flight Meals, Extra Luggage",
  },
  {
    id: 5,
    image: "/images/bus2.jpg",
    title: "Luxury Bus Ticket",
    price: 20,
    quantity: 60,
    transport: "Bus",
    perks: "AC, Reclining Seats",
  },
  {
    id: 6,
    image: "/images/train2.jpg",
    title: "Night Train Ticket",
    price: 35,
    quantity: 90,
    transport: "Train",
    perks: "Sleeper, Meals Included",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Advertising = () => {
  return (
    <section className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-2 text-center">Featured Tickets</h2>
      <h3 className="text-center text-gray-600 mb-6 text-lg">
        Book your next journey effortlessly with our most popular travel
        tickets.
      </h3>

      {/* Scrollable on small devices */}
      <div className="flex gap-6 overflow-x-auto py-4 px-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
        {tickets.map((ticket) => (
          <motion.div
            key={ticket.id}
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
