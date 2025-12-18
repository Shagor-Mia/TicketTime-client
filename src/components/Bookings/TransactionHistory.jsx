import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../hooks/useSecureAxios";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../shared/Spinner";

const TransactionHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useSecureAxios();

  const {
    data: transactions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["transactions", user?.email],
    enabled: !!user?.email, //  wait until user exists
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/user");
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 min cache
  });

  // console.log(transactions);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Failed to load transactions: {error.message}
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-6 dark:text-black"
    >
      <h2 className="text-2xl font-bold mb-6">
        Transaction History({transactions.length})
      </h2>

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-100 dark:text-black">
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Ticket Title</th>
                <th>Amount</th>
                <th>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={tx.transactionId} className="hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td className="text-xs break-all">{tx.transactionId}</td>
                  <td>{tx.ticketTitle}</td>
                  <td className="font-semibold">৳{tx.amount}</td>
                  <td>
                    {new Date(tx.paymentDate).toLocaleDateString()}{" "}
                    {new Date(tx.paymentDate).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default TransactionHistory;
