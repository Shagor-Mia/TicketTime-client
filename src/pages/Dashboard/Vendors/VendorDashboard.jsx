import React from "react";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { FaDollarSign, FaTicketAlt, FaPlus } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import LoadingSpinner from "../../../components/shared/Spinner";

const VendorDashboard = () => {
  const axiosSecure = useSecureAxios();

  // ---------------- Fetch Vendor Overview Data ----------------
  const {
    data = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vendor-overview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/vendors/overview");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">Failed to load overview</p>
    );

  const {
    totalRevenue = 0,
    totalTicketsSold = 0,
    totalTicketsAdded = 0,
  } = data;

  // ---------------- Chart Data ----------------
  const chartData = [
    { name: "Revenue", count: totalRevenue, fill: "#3b82f6" }, // blue
    { name: "Tickets Sold", count: totalTicketsSold, fill: "#10b981" }, // green
    { name: "Tickets Added", count: totalTicketsAdded, fill: "#f59e0b" }, // amber
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-gray-900 ">
        Revenue Overview
      </h1>

      {/* ---------------- Overview Cards ---------------- */}
      <div className="flex flex-wrap gap-6 justify-center mb-10">
        {/* Total Revenue */}
        <div className="flex-1 min-w-[220px] max-w-sm bg-white dark:bg-base-100 shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition-transform">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full text-blue-600 dark:text-blue-400">
            <FaDollarSign size={24} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-base-content/70">
              Total Revenue
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-base-content">
              ${totalRevenue.toLocaleString()}
            </h2>
          </div>
        </div>

        {/* Tickets Sold */}
        <div className="flex-1 min-w-[220px] max-w-sm bg-white dark:bg-base-100 shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition-transform">
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full text-green-600 dark:text-green-400">
            <FaTicketAlt size={24} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-base-content/70">
              Tickets Sold
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-base-content">
              {totalTicketsSold}
            </h2>
          </div>
        </div>

        {/* Tickets Added */}
        <div className="flex-1 min-w-[220px] max-w-sm bg-white dark:bg-base-100 shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition-transform">
          <div className="bg-amber-100 dark:bg-amber-900 p-4 rounded-full text-amber-600 dark:text-amber-400">
            <FaPlus size={24} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-base-content/70">
              Tickets Added
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-base-content">
              {totalTicketsAdded} types
            </h2>
          </div>
        </div>
      </div>

      {/* ---------------- Bar Chart ---------------- */}
      <div className="bg-white dark:bg-base-100 shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-base-content">
          Overview Chart
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={
                window.matchMedia("(prefers-color-scheme: dark)").matches
                  ? "#4B5563"
                  : "#e5e7eb"
              }
            />
            <XAxis
              dataKey="name"
              stroke={
                window.matchMedia("(prefers-color-scheme: dark)").matches
                  ? "#D1D5DB"
                  : "#374151"
              }
            />
            <YAxis
              allowDecimals={false}
              stroke={
                window.matchMedia("(prefers-color-scheme: dark)").matches
                  ? "#D1D5DB"
                  : "#374151"
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: window.matchMedia(
                  "(prefers-color-scheme: dark)",
                ).matches
                  ? "#1f2937"
                  : "#fff",
                color: window.matchMedia("(prefers-color-scheme: dark)").matches
                  ? "#f9fafb"
                  : "#111827",
              }}
            />
            <Legend
              wrapperStyle={{
                color: window.matchMedia("(prefers-color-scheme: dark)").matches
                  ? "#f9fafb"
                  : "#111827",
              }}
            />
            {chartData.map((entry) => (
              <Bar
                key={entry.name}
                dataKey="count"
                name={entry.name}
                fill={entry.fill}
                barSize={50}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VendorDashboard;
