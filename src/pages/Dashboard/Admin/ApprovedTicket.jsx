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
      const res = await axiosSecure.get("/tickets");
      return res.data;
    },
  });

  const updateStatus = (ticket, status) => {
    axiosSecure.patch(`/tickets/${ticket._id}/approve`, { status }).then(() => {
      refetch();
      Swal.fire({
        icon: "success",
        title: `Ticket ${status}`,
        timer: 1200,
        showConfirmButton: false,
      });
    });
  };

  if (!tickets.length) {
    return <p className="text-center py-10 text-gray-500">No tickets found.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto my-10 px-2 dark:bg-black">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">
        Ticket Approval Panel ({tickets.length})
      </h2>

      <div className="overflow-x-auto w-full">
        <table className="table table-zebra w-full min-w-[700px]">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th className="hidden sm:table-cell">Route</th>
              <th className="hidden md:table-cell">Transport</th>
              <th className="hidden lg:table-cell">Vendor</th>
              <th>Price</th>
              <th className="hidden lg:table-cell">Qty</th>
              <th className="hidden xl:table-cell">Departure</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <th>{index + 1}</th>
                <td>{ticket.title}</td>
                <td className="hidden sm:table-cell">
                  {ticket.from} → {ticket.to}
                </td>
                <td className="hidden md:table-cell">{ticket.transportType}</td>
                <td className="hidden lg:table-cell">{ticket.vendor?.email}</td>
                <td>৳{ticket.price}</td>
                <td className="hidden lg:table-cell">{ticket.quantity}</td>
                <td className="hidden xl:table-cell">
                  {new Date(ticket.departure).toLocaleString()}
                </td>
                <td
                  className={`font-semibold px-2 py-1 rounded ${
                    ticket.verificationStatus === "approved"
                      ? "text-green-600"
                      : ticket.verificationStatus === "rejected"
                      ? "text-red-600"
                      : "text-yellow-500"
                  }`}
                >
                  {ticket.verificationStatus}
                </td>
                <td className="flex gap-1 flex-wrap justify-center">
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
