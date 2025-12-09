import React, { useState } from "react";
import AllTicketCard from "../../components/AllTickets/AllTicketCard";

const sampleTickets = [
  {
    _id: "1",
    title: "Dhaka to Chittagong",
    from: "Dhaka",
    to: "Chittagong",
    type: "Bus",
    price: 850,
    quantity: 22,
    perks: ["AC Coach", "WiFi", "Snacks"],
    departure: "2025-12-12T18:30",
    image: "https://via.placeholder.com/400x250",
  },
  {
    _id: "2",
    title: "Dhaka to Sylhet",
    from: "Dhaka",
    to: "Sylhet",
    type: "Train",
    price: 550,
    quantity: 0,
    perks: ["First Class", "Food"],
    departure: "2025-12-10T15:00",
    image: "https://via.placeholder.com/400x250",
  },
];

const AllTicket = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sampleTickets.map((ticket) => (
        <AllTicketCard key={ticket._id} ticket={ticket} />
      ))}
    </div>
  );
};

export default AllTicket;
