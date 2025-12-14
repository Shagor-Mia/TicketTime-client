import React from "react";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";

const VendorDashboard = () => {
  const axiosSecure = useSecureAxios();

  const {
    data: vendor,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vendor-me"],
    queryFn: async () => {
      const res = await axiosSecure.get("/vendors/me");
      return res.data;
    },
  });
  console.log(vendor);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Access denied</p>;
  return (
    <>
      <div className="w-full flex items-center gap-4 p-4 border-b">
        <img
          src={vendor.photoURL}
          alt="vendor"
          className="w-14 h-14 rounded-full border"
        />

        <div>
          <h2 className="text-lg font-semibold leading-tight">
            {vendor.displayName}
          </h2>
          <p className="text-sm text-gray-600">{vendor.email}</p>
        </div>

        <span className="ml-auto px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
          {vendor.role.toUpperCase()}
        </span>
      </div>
    </>
  );
};

export default VendorDashboard;
