import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { ClockLoader } from "react-spinners";
import Theme from "./Theme";
import useAuth from "../../hooks/useAuth";

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
      ? "relative bg-gradient-to-br from-[#632ee3] to-[#9f62f2] bg-clip-text text-transparent font-semibold after:content-[''] after:absolute after:left-0 after:-bottom-0 after:w-0 after:h-[2px] after:bg-gradient-to-br after:from-[#632ee3] after:to-[#9f62f2] after:transition-all after:duration-300 after:w-full"
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
            <NavLink className={linkActive} to={"/dashboard"}>
              My Service
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
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center py-3 px-4 md:px-8 lg:px-12">
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
              className="hidden md:block w-10"
              src="https://i.ibb.co.com/VWGVLPFx/homelogo1.png"
              alt="logo"
            />
          </Link>

          <Link
            to={"/"}
            className="text-2xl bg-linear-to-br from-[#632ee3] to-[#9f62f2] bg-clip-text text-transparent font-semibold hidden md:block"
          >
            HomeHero
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
          <motion.img
            className="md:w-12 md:h-12 h-10 w-10 object-cover rounded-full"
            src={
              user
                ? user.photoURL
                : "https://img.icons8.com/?size=40&id=23493&format=png"
            }
            alt="User Avatar"
            title={user ? user.displayName || "User" : "Guest"}
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ type: "spring", stiffness: 250 }}
          />

          {loading ? (
            <ClockLoader height={5} color="#9f62f2" />
          ) : user ? (
            <motion.button
              onClick={handleLogout}
              className="btn md:text-[16px] text-xs bg-linear-to-br from-[#632ee3] to-[#9f62f2] text-white hover:opacity-90 md:mr-0 mr-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={"/login"}
                className="btn md:text-[16px] text-xs bg-linear-to-br from-[#632ee3] to-[#9f62f2] text-white hover:opacity-90 "
              >
                Login
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Navbar;
