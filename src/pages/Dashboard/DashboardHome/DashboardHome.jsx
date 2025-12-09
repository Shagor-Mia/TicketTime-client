import useRole from "../../../hooks/useRole";
import AdminDashboard from "../Admin/AdminDashboard";
import UserDashboard from "../Users/UserDashboard";
import VendorDashboard from "../Vendors/VendorDashboard";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();
  if (roleLoading) {
    return (
      <div>
        <h1 className="text-2xl">Loading...</h1>
      </div>
    );
  }
  if (role === "admin") {
    return <AdminDashboard />;
  } else if (role === "vendor") {
    return <VendorDashboard />;
  } else {
    return <UserDashboard />;
  }
};

export default DashboardHome;
