import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { LuTicketsPlane } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { SiGoogletasks } from "react-icons/si";
import { FaTasks, FaUser, FaUserCheck } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { HiMenuAlt2 } from "react-icons/hi";
import useRole from "../hooks/useRole";
import logoImg from "../assets/bus1.png";
import Navbar from "../components/shared/Navbar";
// import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { role } = useRole();
  // const { logOut } = useAuth();

  // Common links for all users
  const commonLinks = [
    {
      to: "/dashboard/my-orders",
      label: "My Tickets",
      icon: <LuTicketsPlane />,
      tip: "My Tickets",
    },
    {
      to: "/dashboard/profile",
      label: "My Profile",
      icon: <CgProfile />,
      tip: "My Profile",
    },
  ];

  // Vendor only links
  const vendorLinks = [
    {
      to: "/dashboard/add-tickets",
      label: "Add Tickets",
      icon: <FaTasks />,
      tip: "Add Tickets",
    },
    {
      to: "/dashboard/manage-orders",
      label: "Manage Orders",
      icon: <FaTasks />,
      tip: "Manage Orders",
    },
    {
      to: "/dashboard/my-inventory",
      label: "My Inventory",
      icon: <SiGoogletasks />,
      tip: "My Inventory",
    },
  ];

  // Admin only links
  const adminLinks = [
    {
      to: "/dashboard/approve-vendors",
      label: "Approve Vendors",
      icon: <FaUserCheck />,
      tip: "Approve Vendors",
    },
    {
      to: "/dashboard/manage-users",
      label: "User Management",
      icon: <FaUser />,
      tip: "User Management",
    },
  ];

  // Final menu items
  const menuItems = [
    ...commonLinks,
    ...(role === "vendor" ? vendorLinks : []),
    ...(role === "admin" ? adminLinks : []),
  ];

  return (
    <>
      <Navbar />

      <div className="drawer lg:drawer-open max-w-7xl mx-auto">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        {/* Page content */}
        <div className="drawer-content">
          <nav className="navbar w-full ">
            {/* Drawer Toggle Button */}
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <HiMenuAlt2 className="size-6" />
            </label>

            <div className="px-4">TicketTime Dashboard</div>
          </nav>

          <Outlet />
        </div>

        {/* Sidebar */}
        <div className="drawer-side is-drawer-close:overflow-visible">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            <ul className="menu w-full flex-col md:gap-5 grow">
              {/* Logo */}
              <li>
                <Link to={"/"}>
                  <img src={logoImg} alt="Logo" />
                </Link>
              </li>

              {/* Homepage */}
              <li>
                <Link
                  to={"/dashboard"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  <AiOutlineHome className="is-drawer-open:text-[20px] is-drawer-close:text-[18px]" />
                  <span className="is-drawer-open:text-[20px] is-drawer-close:hidden">
                    Homepage
                  </span>
                </Link>
              </li>

              {/* Dynamic Menu */}
              {menuItems.map((item, i) => (
                <li key={i}>
                  <NavLink
                    to={item.to}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip={item.tip}
                  >
                    <span className="is-drawer-open:text-[20px] is-drawer-close:text-[18px]">
                      {item.icon}
                    </span>
                    <span className="is-drawer-open:text-[20px] is-drawer-close:hidden">
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              ))}

              {/* logout */}
              {/* <li>
                <button
                  onClick={logOut}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Log out"
                >
                  <FiLogOut className="is-drawer-open:text-[20px] is-drawer-close:text-[18px]" />
                  <span className="is-drawer-open:text-[20px] is-drawer-close:hidden">
                    Logout
                  </span>
                </button>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
