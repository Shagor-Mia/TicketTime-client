import React from "react";

import Forbidden from "../components/shared/Forbidden";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { roleLoading, role } = useRole();
  console.log(role);

  // console.log(location);

  if (loading || roleLoading) {
    return (
      <div className="flex items-center justify-center ">
        <span className="loading loading-dots loading-2xl"></span>
      </div>
    );
  }
  if (role !== "admin") {
    return <Forbidden />;
  }
  return <div>{children}</div>;
};

export default AdminRoute;
