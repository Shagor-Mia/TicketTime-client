import { useQuery } from "@tanstack/react-query";
import AllTicketCard from "../../components/AllTickets/AllTicketCard";
import useSecureAxios from "../../hooks/useSecureAxios";
import LoadingSpinner from "../shared/Spinner";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const LatestTicketsSection = () => {
  const { user } = useAuth();
  const axiosSecure = useSecureAxios();

  const { data, isLoading } = useQuery({
    queryKey: ["latestTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/approved");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const latestTickets = data?.tickets?.slice(0, 6) || [];

  return (
    <section className="py-10 ">
      <div className=" mx-auto ">
        {/* Heading */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-5xl  font-bold">Latest Tickets</h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            Check out the newest travel tickets available for your next
            adventure!
          </p>
        </motion.div>

        {/* Cards Container */}
        <motion.div
          className="
            h-[400px] overflow-y-auto
            sm:h-auto sm:overflow-visible
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6
            p-4 sm:p-6
          "
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {latestTickets.length > 0 ? (
            latestTickets.map((ticket) => (
              <motion.div
                key={ticket._id}
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -3 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <AllTicketCard ticket={ticket} />
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No tickets available right now.
            </p>
          )}
        </motion.div>
      </div>
      {user && (
        <div className="mt-10 text-center">
          <Link
            className="inline-block bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-semibold text-sm sm:text-base text-white"
            to={"/ticket"}
          >
            {" "}
            More..
          </Link>
        </div>
      )}
    </section>
  );
};

export default LatestTicketsSection;
