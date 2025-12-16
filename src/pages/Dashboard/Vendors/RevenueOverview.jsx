import React from "react";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../../hooks/useSecureAxios";

const statusBadge = {
  pending: "badge-warning",
  approved: "badge-success",
  rejected: "badge-error",
};

const RevenueOverview = () => {
  const axiosSecure = useSecureAxios();

  const { data: revenue = [], isLoading } = useQuery({
    queryKey: ["vendor-tickets-revenue"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings`);
      return res.data;
    },
  });
  console.log(revenue);

  if (isLoading) {
    return <p className="p-4">Loading revenue...</p>;
  }

  return (
    <div className="overflow-x-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Revenue Overview</h1>
    </div>
  );
};

export default RevenueOverview;
