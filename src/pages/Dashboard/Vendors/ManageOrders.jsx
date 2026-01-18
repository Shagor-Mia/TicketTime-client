import { useQuery } from "@tanstack/react-query";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import { useState } from "react";
import useSecureAxios from "../../../hooks/useSecureAxios";

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
      <h1 className="text-4xl font-bold mb-6 text-gray-900 ">
        Bookings Pending Approval: {data.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="table w-full dark:table-zebra">
          <thead>
            <tr className="bg-gray-100 dark:bg-base-300">
              <th className="text-gray-900 dark:text-base-content">#</th>
              <th className="text-gray-900 dark:text-base-content">Ticket</th>
              <th className="text-gray-900 dark:text-base-content">
                User Email
              </th>
              <th className="text-gray-900 dark:text-base-content">Qty</th>
              <th className="text-gray-900 dark:text-base-content">
                Total Price
              </th>
              <th className="text-gray-900 dark:text-base-content">Route</th>
              <th className="text-gray-900 dark:text-base-content">
                Departure
              </th>
              <th className="text-gray-900 dark:text-base-content">Status</th>
              <th className="text-gray-900 dark:text-base-content">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((booking, index) => (
              <tr
                key={booking._id}
                className="dark:bg-base-200 dark:border-b dark:border-gray-600"
              >
                <th className="dark:text-base-content">{index + 1}</th>
                <td className="dark:text-base-content">
                  {booking.ticketTitle}
                </td>
                <td className="dark:text-base-content">{booking.userEmail}</td>
                <td className="dark:text-base-content">{booking.quantity}</td>
                <td className="dark:text-base-content">
                  ৳{booking.totalPrice}
                </td>
                <td className="dark:text-base-content">
                  {booking.from} → {booking.to}
                </td>
                <td className="dark:text-base-content">
                  {new Date(booking.departure).toLocaleDateString()}{" "}
                  {new Date(booking.departure).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td
                  className={`font-semibold ${
                    booking.status === "accepted"
                      ? "text-green-600 dark:text-green-400"
                      : booking.status === "rejected"
                        ? "text-red-600 dark:text-red-400"
                        : "text-yellow-600 dark:text-yellow-400"
                  }`}
                >
                  {booking.status.toUpperCase()}
                </td>
                <td className="flex gap-2">
                  {booking.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleAccept(booking._id)}
                        className="btn btn-sm bg-green-600 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-700 text-white"
                      >
                        <FaUserCheck />
                      </button>
                      <button
                        onClick={() => handleReject(booking._id)}
                        className="btn btn-sm bg-red-600 hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-700 text-white"
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
