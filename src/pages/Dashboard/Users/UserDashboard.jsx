import React from "react";
import BeAVendorModal from "../../../components/Modals/BeAVendor";
import useAuth from "../../../hooks/useAuth";

const UserDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="p-10">
      {/* Be a seller modal button */}
      <BeAVendorModal user={user} />
    </div>
  );
};

export default UserDashboard;
