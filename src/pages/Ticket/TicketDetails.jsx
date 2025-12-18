import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import useSecureAxios from "../../hooks/useSecureAxios";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import bg3 from "../../assets/bg3.jpg";

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useSecureAxios();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const queryClient = useQueryClient();

  /* ---------------- Fetch Ticket ---------------- */
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axiosSecure.get(`/ticket/${id}`);
        setTicket(res.data);
      } catch (err) {
        setTicket(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id, axiosSecure]);

  /* ---------------- Countdown ---------------- */
  useEffect(() => {
    if (!ticket) return;

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

  /* ---------------- Booking ---------------- */
  const handleBooking = async () => {
    setError("");

    if (qty > ticket.quantity) {
      setError("Booking quantity cannot exceed available tickets.");
      return;
    }

    const bookingData = {
      ticketId: ticket._id,
      ticketTitle: ticket.title,
      ticketImage: ticket.image,
      transportType: ticket.transportType,

      from: ticket.from,
      to: ticket.to,
      departure: ticket.departure,

      vendorEmail: ticket.vendor.email,

      quantity: qty,
      unitPrice: ticket.price,
      totalPrice: qty * ticket.price,
    };

    try {
      await axiosSecure.post("/bookings", bookingData);

      Swal.fire({
        icon: "success",
        title: "Booking Request Sent",
        text: "Your booking is pending vendor approval.",
        timer: 1800,
        showConfirmButton: false,
      }).then(() => {
        queryClient.invalidateQueries(["approvedTickets"]);
        navigate("/ticket"); //  redirect after success
      });

      setQty(1);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: err.response?.data?.message || "Something went wrong!",
      });
    }
  };

  /* ---------------- UI States ---------------- */
  if (loading) {
    return <p className="text-center mt-10">Loading ticket...</p>;
  }

  if (!ticket) {
    return <p className="text-center mt-10 text-red-500">Ticket not found</p>;
  }

  const disabled = timeLeft === "Expired" || ticket.quantity === 0;

  /* ---------------- UI ---------------- */
  return (
    <div
      style={{
        backgroundImage: `url(${bg3})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        className="max-w-6xl mx-auto px-4 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-200 rounded-lg"
        >
          ← Back
        </button>

        <div className="flex flex-col md:flex-row gap-10">
          {/* LEFT: Image & Main Info */}
          <motion.div
            className="space-y-4 md:w-1/2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={ticket.image}
              alt={ticket.title}
              className="rounded-2xl shadow-md w-full h-[320px] object-cover"
              whileHover={{ scale: 1.01 }}
            />

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
              {ticket.perks.map((p, i) => (
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
          </motion.div>

          {/* RIGHT: Booking Section */}
          <motion.div
            className="md:w-1/2 bg-white shadow-md rounded-xl md:rounded-2xl p-6 space-y-4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold">Book This Ticket</h3>

            <p className="font-medium">
              ⏳ Countdown:
              <span className="ml-2 text-blue-600">{timeLeft}</span>
            </p>

            <div>
              <label className="block mb-1">Enter Quantity</label>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="border p-2 w-full rounded-lg"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              disabled={disabled}
              onClick={handleBooking}
              className={`w-full p-3 rounded-lg text-white ${
                disabled ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Book Now
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TicketDetails;
