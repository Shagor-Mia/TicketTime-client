import React from "react";
import BeAVendorModal from "../../../components/Modals/BeAVendor";
import useAuth from "../../../hooks/useAuth";
import TransactionHistory from "../../../components/Bookings/TransactionHistory";

const UserDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="md:p-10">
      {/* Be a seller modal button */}
      <BeAVendorModal user={user} />
      <TransactionHistory />
    </div>
  );
};

export default UserDashboard;
