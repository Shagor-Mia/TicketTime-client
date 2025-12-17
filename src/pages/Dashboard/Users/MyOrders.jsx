import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useSecureAxios from "../../../hooks/useSecureAxios";
import MyBookedTicketCard from "../../../components/Bookings/MyBookedTicketCard";
import LoadingSpinner from "../../../components/shared/Spinner";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15, // stagger each card
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const MyOrders = () => {
  const axiosSecure = useSecureAxios();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/user");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">My Booked Tickets</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not booked any tickets yet.
        </p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {bookings.map((booking) => (
            <motion.div key={booking._id} variants={itemVariants}>
              <MyBookedTicketCard booking={booking} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyOrders;
