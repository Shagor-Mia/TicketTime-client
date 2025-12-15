import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../../hooks/useSecureAxios";
import MyBookedTicketCard from "../../../components/Bookings/MyBookedTicketCard";

const MyOrders = () => {
  const axiosSecure = useSecureAxios();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/user");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-10 text-xl font-semibold">
        Loading your bookings...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">My Booked Tickets</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not booked any tickets yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <MyBookedTicketCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
