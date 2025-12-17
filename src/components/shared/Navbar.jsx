import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { ClockLoader } from "react-spinners";
import Theme from "./Theme";
import useAuth from "../../hooks/useAuth";
import plan from "../../assets/plane-removebg-preview.png";
import AvatarDropdown from "./RghtSectionNav";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("logout Success");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const linkActive = ({ isActive }) =>
    isActive
      ? "relative bg-gradient-to-br from-[#632ee3] to-[#9f62f2] bg-clip-text text-transparent font-semibold"
      : "";

  const link = (
    <>
      <li className=" mx-2">
        <NavLink className={linkActive} to={"/"}>
          Home
        </NavLink>
      </li>
      <li className=" mx-2">
        <NavLink className={linkActive} to={"/ticket"}>
          All Ticket
        </NavLink>
      </li>
      <li className=" mx-2">
        <NavLink className={linkActive} to={"/About"}>
          About Us
        </NavLink>
      </li>

      <li className=" mx-2">
        <NavLink className={linkActive} to={"/branch"}>
          Branch
        </NavLink>
      </li>

      {user && (
        <>
          <li className=" mx-2">
            <NavLink className={linkActive} to={"/contact"}>
              Contact Us
            </NavLink>
          </li>
          <li className=" mx-2">
            <NavLink className={linkActive} to={"/dashboard"}>
              dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <motion.div
      className="w-full sticky top-0 z-50 bg-base-100 shadow-sm mx-auto"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center px-4 md:px-8 lg:px-10">
        {/* Left Section */}
        <motion.div
          className="flex justify-center items-center"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden md:ml-0 -ml-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {link}
            </ul>
          </div>

          <Link to={"/"}>
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="hidden md:block w-20"
              src={plan}
              alt="logo"
            />
          </Link>

          <Link
            to={"/"}
            className="text-2xl bg-linear-to-br from-[#632ee3] to-[#9f62f2] bg-clip-text text-transparent font-semibold hidden md:block"
          >
            TicketTime
          </Link>
        </motion.div>

        {/* Middle Nav Links */}
        <motion.div
          className="navbar-center hidden lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <ul className="menu menu-horizontal px-1">{link}</ul>
        </motion.div>

        {/* Right Section (Avatar + Button) */}
        <motion.div
          className="flex justify-center items-center md:gap-5 gap-2  -mr-3"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Theme />
          <AvatarDropdown
            user={user}
            loading={loading}
            handleLogout={handleLogout}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Navbar;
