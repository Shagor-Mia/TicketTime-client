import { useQuery } from "@tanstack/react-query";
import AllTicketCard from "../../components/AllTickets/AllTicketCard";
import useSecureAxios from "../../hooks/useSecureAxios";

const LatestTicketsSection = () => {
  const axiosSecure = useSecureAxios();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["latestTickets"],
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
  const latestTickets = tickets.slice(0, 6);
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2 text-center">Latest Tickets</h2>
      <h3 className="text-center text-gray-600 mb-6 text-lg">
        Check out the newest travel tickets available for your next adventure!
      </h3>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestTickets.length > 0 ? (
          latestTickets.map((ticket) => (
            <AllTicketCard key={ticket._id} ticket={ticket} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No tickets available right now.
          </p>
        )}
      </div>
    </div>
  );
};

export default LatestTicketsSection;
