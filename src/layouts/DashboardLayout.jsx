import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { LuTicketsPlane } from "react-icons/lu";
import { AiOutlineHome } from "react-icons/ai";
import { RiAdvertisementLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { SiGoogletasks } from "react-icons/si";
import { FaUser, FaUserCheck } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FcApprove } from "react-icons/fc";
import { MdAddTask } from "react-icons/md";
import { FcManager } from "react-icons/fc";
import useRole from "../hooks/useRole";
import { SiVirustotal } from "react-icons/si";
import { TbTransactionPound } from "react-icons/tb";
import Navbar from "../components/shared/Navbar";
import logoImg from "../assets/bus1.png";
import Theme from "../components/shared/Theme";

const DashboardLayout = () => {
  const { role } = useRole();
  const [collapsed, setCollapsed] = useState(false);

  const closeDrawer = () => {
    const checkbox = document.getElementById("dashboard-drawer");
    if (checkbox) checkbox.checked = false;
  };

  const commonLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <AiOutlineHome /> },
    {
      to: "/dashboard/transaction",
      label: "Transaction",
      icon: <TbTransactionPound />,
    },
    {
      to: "/dashboard/my-orders",
      label: "My Tickets",
      icon: <LuTicketsPlane />,
    },
    { to: "/dashboard/profile", label: "Profile", icon: <CgProfile /> },
  ];

  const vendorLinks = [
    { to: "/dashboard/add-tickets", label: "Add Tickets", icon: <MdAddTask /> },
    {
      to: "/dashboard/manage-orders",
      label: "Requested Bookings",
      icon: <FcManager />,
    },
    {
      to: "/dashboard/my-added-tickets",
      label: "My Added Tickets",
      icon: <SiGoogletasks />,
    },
    { to: "/dashboard/revenue", label: "Revenue", icon: <SiVirustotal /> },
  ];

  const adminLinks = [
    {
      to: "/dashboard/approve-vendors",
      label: "Approve Vendors",
      icon: <FaUserCheck />,
    },
    {
      to: "/dashboard/approve-ticket",
      label: "Approve Tickets",
      icon: <FcApprove />,
    },
    { to: "/dashboard/manage-users", label: "Users", icon: <FaUser /> },
    {
      to: "/dashboard/advertise",
      label: "Advertise",
      icon: <RiAdvertisementLine />,
    },
  ];

  const menuItems = [
    ...commonLinks,
    ...(role === "vendor" ? vendorLinks : []),
    ...(role === "admin" ? adminLinks : []),
  ];

  return (
    <>
      {/* <Navbar /> */}

      <div className="drawer lg:drawer-open max-w-7xl bg-amber-100 mx-auto">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        {/* ================= CONTENT ================= */}
        <div className="drawer-content flex flex-col">
          {/* Top Bar */}
          <nav className="navbar bg-base-100 sticky top-0 z-20 shadow-sm">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-ghost btn-square lg:hidden"
            >
              <HiMenuAlt2 className="text-xl" />
            </label>

            <h2 className="text-lg sm:text-2xl font-bold truncate flex justify-between items-center">
              <span className="text-2xl mx-3">
                <Theme />
              </span>
              Dashboard <span className="text-green-600">({role})</span>
              <span className="lg:hidden block">
                <Link to="/" className="flex items-center gap-2">
                  <img src={logoImg} className="h-10" alt="Logo" />
                </Link>
              </span>
            </h2>
          </nav>

          <div className="md:p-4">
            <Outlet />
          </div>
        </div>

        {/* ================= SIDEBAR ================= */}
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

          <aside
            className={`bg-base-200 min-h-full transition-all duration-300
              ${collapsed ? "w-20" : "w-64"}
            `}
          >
            {/* Logo */}
            <div className="flex items-center justify-between px-4 py-4">
              <Link to="/" className="flex items-center gap-2">
                <img src={logoImg} className="h-10" alt="Logo" />
                {!collapsed && (
                  <span className="font-bold text-lg">TicketTime</span>
                )}
              </Link>

              {/* Collapse button (desktop only) */}
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hidden md:flex btn btn-ghost btn-sm"
              >
                {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
              </button>
            </div>

            {/* Menu */}
            <ul className="menu px-2 gap-1 max-h-[500px] overflow-y-auto">
              {menuItems.map((item, i) => (
                <li key={i}>
                  <NavLink
                    to={item.to}
                    onClick={closeDrawer}
                    className={({ isActive }) =>
                      `flex items-center gap-3 ${
                        isActive
                          ? "bg-green-100 text-green-700 font-semibold"
                          : ""
                      }`
                    }
                  >
                    <span className="text-lg">{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
