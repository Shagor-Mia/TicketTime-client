import { useQuery } from "@tanstack/react-query";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import { useState } from "react";
import useSecureAxios from "../../../hooks/useSecureAxios";
import VendorDashboard from "./VendorDashboard";

const ManageOrders = () => {
  const axiosSecure = useSecureAxios();
  const [bookings, setBookings] = useState([]);

  const { refetch, data = [] } = useQuery({
    queryKey: ["vendor-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/vendor");
      return res.data;
    },
    onSuccess: (data) => setBookings(data),
  });

  /* ---------------- Accept / Reject ---------------- */
  const updateBookingStatus = (bookingId, status) => {
    axiosSecure
      .patch(`/bookings/${bookingId}/status`, { status })
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Booking ${status}`,
            showConfirmButton: false,
            timer: 1200,
          });
          refetch();
        }
      });
  };

  const handleAccept = (id) => updateBookingStatus(id, "accepted");
  const handleReject = (id) => updateBookingStatus(id, "rejected");

  return (
    <div className="my-10 mx-auto max-w-6xl">
      <VendorDashboard />
      <h1 className="text-4xl font-bold mb-6">
        Bookings Pending Approval: {data.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Ticket</th>
              <th>User Email</th>
              <th>Qty</th>
              <th>Total Price</th>
              <th>Route</th>
              <th>Departure</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((booking, index) => (
              <tr key={booking._id}>
                <th>{index + 1}</th>
                <td>{booking.ticketTitle}</td>
                <td>{booking.userEmail}</td>
                <td>{booking.quantity}</td>
                <td>৳{booking.totalPrice}</td>
                <td>
                  {booking.from} → {booking.to}
                </td>
                <td>
                  {new Date(booking.departure).toLocaleDateString()}{" "}
                  {new Date(booking.departure).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td
                  className={`${
                    booking.status === "accepted"
                      ? "text-green-600"
                      : booking.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  } font-semibold`}
                >
                  {booking.status.toUpperCase()}
                </td>
                <td className="flex gap-2">
                  {booking.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleAccept(booking._id)}
                        className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
                      >
                        <FaUserCheck />
                      </button>
                      <button
                        onClick={() => handleReject(booking._id)}
                        className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                      >
                        <IoPersonRemoveSharp />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
