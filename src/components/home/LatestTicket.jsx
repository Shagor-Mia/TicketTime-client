import React from "react";
import TicketCard from "./TicketCard";
import { motion } from "framer-motion";

// Sample latest tickets data (8 tickets)
const latestTickets = [
  {
    id: 101,
    image: "/images/bus3.jpg",
    title: "City Bus Ticket",
    price: 12,
    quantity: 40,
    transport: "Bus",
    perks: "WiFi, Reclining Seats",
  },
  {
    id: 102,
    image: "/images/train3.jpg",
    title: "Express Train Ticket",
    price: 28,
    quantity: 120,
    transport: "Train",
    perks: "AC, Meals Included",
  },
  {
    id: 103,
    image: "/images/launch2.jpg",
    title: "Sunset River Launch",
    price: 22,
    quantity: 60,
    transport: "Launch",
    perks: "Scenic View, Snacks",
  },
  {
    id: 104,
    image: "/images/plane2.jpg",
    title: "Flight to City A",
    price: 90,
    quantity: 180,
    transport: "Plane",
    perks: "In-flight Meals, Extra Luggage",
  },
  {
    id: 105,
    image: "/images/bus4.jpg",
    title: "Luxury Coach",
    price: 25,
    quantity: 50,
    transport: "Bus",
    perks: "AC, Reclining Seats",
  },
  {
    id: 106,
    image: "/images/train4.jpg",
    title: "Night Express Train",
    price: 38,
    quantity: 70,
    transport: "Train",
    perks: "Sleeper, Meals Included",
  },
  {
    id: 107,
    image: "/images/plane3.jpg",
    title: "Flight to City B",
    price: 120,
    quantity: 150,
    transport: "Plane",
    perks: "Business Class, Meals Included",
  },
  {
    id: 108,
    image: "/images/launch3.jpg",
    title: "Morning River Launch",
    price: 20,
    quantity: 80,
    transport: "Launch",
    perks: "Snacks, Scenic View",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const LatestTicketsSection = () => {
  return (
    <section className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-2 text-center">Latest Tickets</h2>
      <h3 className="text-center text-gray-600 mb-6 text-lg">
        Check out the newest travel tickets available for your next adventure!
      </h3>

      {/* Scrollable on small devices (y-axis) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-h-[80vh] sm:max-h-full overflow-y-auto sm:overflow-visible p-2">
        {latestTickets.map((ticket) => (
          <motion.div
            key={ticket.id}
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

export default LatestTicketsSection;
