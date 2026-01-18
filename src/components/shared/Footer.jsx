import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import bus from "../../assets/bus1.png";
import { FaCcMastercard, FaCcStripe, FaCcVisa } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Footer = () => {
  const { user } = useAuth();
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full border-t border-white py-10 px-5"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10 px-5 md:px-10">
        {/* Column 1: Logo + Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex flex-col items-center md:items-start text-center md:text-left"
        >
          <Link to={"/"} className="flex items-center gap-2">
            <motion.img
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-10"
              src={bus}
              alt="logo"
            />
            <h2 className="text-xl font-semibold bg-linear-to-br from-[#632ee3] to-[#9f62f2] bg-clip-text text-transparent">
              TicketTime
            </h2>
          </Link>
          <p className="mt-2 text-sm">Book bus, train, flight tickets easily</p>
          <p className="mt-3 text-sm text-gray-500">
            TicketTime: © 2025 TicketBari. All rights reserved.
          </p>
        </motion.div>

        {/* Column 2: Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex flex-col items-center md:items-start text-center md:text-left"
        >
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          <ul className="flex flex-col gap-1">
            <li>
              <Link to="/" className="hover:text-[#9f62f2]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/ticket" className="hover:text-[#9f62f2]">
                All Tickets
              </Link>
            </li>
            {user && (
              <li>
                <Link to="/contact" className="hover:text-[#9f62f2]">
                  Contact Us
                </Link>
              </li>
            )}
            <li>
              <Link to="/about" className="hover:text-[#9f62f2]">
                About
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Column 3: Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-col items-center md:items-start text-center md:text-left"
        >
          <h3 className="font-semibold text-lg mb-2">Contact Info</h3>
          <p>
            Email:{" "}
            <a href="mailto:ticket@time.com" className="hover:text-[#9f62f2]">
              ticket@time.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+8801700000000" className="hover:text-[#9f62f2]">
              +880 1700 000 000
            </a>
          </p>
          <p>
            Facebook:{" "}
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9f62f2]"
            >
              facebook.com/TicketTime
            </a>
          </p>
        </motion.div>

        {/* Column 4: Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex flex-col items-center md:items-start text-center md:text-left"
        >
          <h3 className="font-semibold text-lg mb-3">Payment Methods</h3>
          <div className="flex gap-4">
            <FaCcStripe className="hover:text-[#635ee3] text-4xl transition-colors duration-200" />
            <FaCcVisa className="hover:text-[#635ee3] text-4xl transition-colors duration-200" />
            <FaCcMastercard className="hover:text-[#635ee3] text-4xl transition-colors duration-200" />
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
