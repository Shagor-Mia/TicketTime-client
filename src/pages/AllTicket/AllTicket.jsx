import { useQuery } from "@tanstack/react-query";
import AllTicketCard from "../../components/AllTickets/AllTicketCard";
import useSecureAxios from "../../hooks/useSecureAxios";

const AllTicket = () => {
  const axiosSecure = useSecureAxios();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["approvedTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/approved");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-10 text-xl font-semibold">
        Loading tickets...
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tickets.length > 0 ? (
        tickets.map((ticket) => (
          <AllTicketCard key={ticket._id} ticket={ticket} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No tickets available right now.
        </p>
      )}
    </div>
  );
};

export default AllTicket;
