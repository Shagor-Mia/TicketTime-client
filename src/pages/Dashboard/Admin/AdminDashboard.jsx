import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaTicketAlt, FaUserCheck } from "react-icons/fa";
import useSecureAxios from "../../../hooks/useSecureAxios";
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

const AdminDashboard = () => {
  const axiosSecure = useSecureAxios();

  // ---------------- Fetch Dashboard Data ----------------
  const {
    data = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/overview");
      return res.data; // expected: { totalVendors, totalTickets, totalUsers }
    },
  });

  if (isLoading) {
    return <p className="text-center py-10">Loading dashboard...</p>;
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-500">Failed to load dashboard</p>
    );
  }

  const { totalVendors = 0, totalTickets = 0, totalUsers = 0 } = data;

  // ---------------- Chart Data ----------------
  const chartData = [
    { name: "Vendors", count: totalVendors, fill: "#3b82f6" },
    { name: "Tickets", count: totalTickets, fill: "#10b981" },
    { name: "Users", count: totalUsers, fill: "#8b5cf6" },
  ];

  // ---------------- UI ----------------
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 dark:text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Overview</h1>

      {/* ---------------- Overview Cards ---------------- */}
      <div className="flex flex-wrap gap-6 justify-center mb-10">
        {/* Vendor Card */}
        <div className="flex-1 min-w-[220px] max-w-sm bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition-transform">
          <div className="bg-blue-100 p-4 rounded-full text-blue-600">
            <FaUserCheck size={24} />
          </div>
          <div>
            <p className="text-gray-500">Approved Vendors</p>
            <h2 className="text-2xl font-bold">{totalVendors}</h2>
          </div>
        </div>

        {/* Tickets Card */}
        <div className="flex-1 min-w-[220px] max-w-sm bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition-transform">
          <div className="bg-green-100 p-4 rounded-full text-green-600">
            <FaTicketAlt size={24} />
          </div>
          <div>
            <p className="text-gray-500">Approved Tickets</p>
            <h2 className="text-2xl font-bold">{totalTickets}</h2>
          </div>
        </div>

        {/* Users Card */}
        <div className="flex-1 min-w-[220px] max-w-sm bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition-transform">
          <div className="bg-purple-100 p-4 rounded-full text-purple-600">
            <FaUsers size={24} />
          </div>
          <div>
            <p className="text-gray-500">Users</p>
            <h2 className="text-2xl font-bold">{totalUsers}</h2>
          </div>
        </div>
      </div>

      {/* ---------------- Bar Chart ---------------- */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Overview Chart
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
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

export default AdminDashboard;
