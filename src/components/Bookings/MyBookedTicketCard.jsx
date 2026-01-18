import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useSecureAxios from "../../hooks/useSecureAxios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-blue-100 text-blue-700",
  rejected: "bg-red-100 text-red-700",
  paid: "bg-green-100 text-green-700",
};

const MyBookedTicketCard = ({ booking }) => {
  const { user } = useAuth();

  const axiosSecure = useSecureAxios();

  const {
    ticketTitle,
    ticketImage,
    from,
    to,
    departure,
    quantity,
    unitPrice,
    totalPrice,
    status,
  } = booking;

  const [timeLeft, setTimeLeft] = useState("");

  /* ---------------- Countdown ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const dep = new Date(departure);
      const diff = dep - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        setTimeLeft(`${d}d ${h}h ${m}m`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [departure]);

  // new
  const handlePayment = async (booking) => {
    //  1. Status check (FIRST)
    if (booking.status !== "accepted") {
      Swal.fire("Not allowed", "Booking not accepted yet", "warning");
      return;
    }

    //  2. Expiry check
    const now = new Date();
    const dep = new Date(booking.departure);
    if (dep < now) {
      Swal.fire("Expired", "This booking has already expired", "error");
      return;
    }

    try {
      //  3. Call backend
      const res = await axiosSecure.post("/payment-checkout-session", {
        bookingId: booking._id,
        ticketTitle: booking.ticketTitle,
        ticketImage: booking.ticketImage,
        from: booking.from,
        to: booking.to,
        departure: booking.departure,
        quantity: booking.quantity,
        unitPrice: booking.unitPrice,
        userName: user?.displayName || "Unknown",
        userEmail: user?.email,
      });

      //  4. Redirect to Stripe
      window.location.assign(res.data.url);
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Payment failed",
        err.response?.data?.message || "Something went wrong",
        "error",
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden text-gray-900 shadow-md bg-white"
    >
      <img
        src={ticketImage || "https://via.placeholder.com/400x250"}
        alt={ticketTitle}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{ticketTitle}</h3>

        <p className="text-gray-600">
          {from} → {to}
        </p>

        <p className="text-sm">
          Departure: {new Date(departure).toLocaleDateString()}{" "}
          {new Date(departure).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        <p className="text-sm">Booking Qty: {quantity}</p>

        <p className="font-semibold">Total Price: ৳{totalPrice}</p>

        {/* Status */}
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}
        >
          {status.toUpperCase()}
        </span>

        {/* Countdown */}
        <p className="text-sm text-gray-500">⏳ Countdown: {timeLeft}</p>

        {/* Pay Button */}
        {status === "accepted" && (
          <button
            onClick={() => handlePayment(booking)}
            className="w-full mt-2 p-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
          >
            Pay Now
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default MyBookedTicketCard;
