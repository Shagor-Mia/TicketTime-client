import { useQuery } from "@tanstack/react-query";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import useSecureAxios from "../../../hooks/useSecureAxios";

const ApproveTickets = () => {
  const axiosSecure = useSecureAxios();

  const { data: tickets = [], refetch } = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets"); // ✅ fetch ALL
      return res.data;
    },
  });

  const updateStatus = (ticket, status) => {
    axiosSecure.patch(`/tickets/${ticket._id}/approve`, { status }).then(() => {
      refetch(); // ✅ status updates but row stays
      Swal.fire({
        icon: "success",
        title: `Ticket ${status}`,
        timer: 1200,
        showConfirmButton: false,
      });
    });
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
      <h2 className="text-4xl font-bold mb-6">
        Ticket Approval Panel ({tickets.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Route</th>
              <th>Transport</th>
              <th>Vendor</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Departure</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <th>{index + 1}</th>
                <td>{ticket.title}</td>
                <td>
                  {ticket.from} → {ticket.to}
                </td>
                <td>{ticket.transportType}</td>
                <td>{ticket.vendor?.email}</td>
                <td>৳{ticket.price}</td>
                <td>{ticket.quantity}</td>
                <td>{new Date(ticket.departure).toLocaleString()}</td>

                <td
                  className={`font-semibold ${
                    ticket.verificationStatus === "approved"
                      ? "text-green-600"
                      : ticket.verificationStatus === "rejected"
                      ? "text-red-600"
                      : "text-yellow-500"
                  }`}
                >
                  {ticket.verificationStatus}
                </td>

                <td className="flex gap-2">
                  <button
                    onClick={() => updateStatus(ticket, "approved")}
                    className="btn btn-sm"
                    disabled={ticket.verificationStatus !== "pending"}
                  >
                    <FaUserCheck />
                  </button>

                  <button
                    onClick={() => updateStatus(ticket, "rejected")}
                    className="btn btn-sm"
                    disabled={ticket.verificationStatus !== "pending"}
                  >
                    <IoPersonRemoveSharp />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveTickets;
