import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import bus from "../../assets/bus1.png";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-base-300 py-10 px-5"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8 px-10">
        {/* Brand + Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex flex-col items-center md:items-start"
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
          <p className="mt-3 text-center md:text-left text-sm">
            © {new Date().getFullYear()} TicketTime - An Online Ticket Booking.
            All rights reserved.
          </p>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex flex-col items-center md:items-start"
        >
          <h3 className="font-semibold text-lg mb-2 ">Contact Us</h3>
          <p>
            Email:{" "}
            <a
              href="mailto:home@heroservice.com"
              className="hover:text-[#9f62f2]"
            >
              ticket@time.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+8801700000000" className="hover:text-[#9f62f2]">
              +880 1700 000 000
            </a>
          </p>
          <p>Address: Dhaka, Bangladesh</p>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-col items-center md:items-start"
        >
          <h3 className="font-semibold text-lg mb-2 ">Quick Links</h3>
          <Link to="/" className="hover:text-[#9f62f2]">
            Privacy Policy
          </Link>
          <Link to="/" className="hover:text-[#9f62f2]">
            Terms & Conditions
          </Link>
          <Link to="/" className="hover:text-[#9f62f2]">
            Contact Page
          </Link>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex flex-col items-center md:items-start"
        >
          <h3 className="font-semibold text-lg mb-3 ">Follow Us</h3>
          <div className="flex gap-4">
            {[
              {
                href: "https://x.com/",
                label: "X (formerly Twitter)",
                icon: (
                  <path d="M18.244 2H21.5l-7.68 8.773L22 22h-4.9l-5.4-6.58L6.1 22H2.5l8.22-9.4L2 2h4.9l5 6.144L18.244 2zM17.4 20h1.35L7.1 4h-1.4L17.4 20z" />
                ),
              },
              {
                href: "https://facebook.com/",
                label: "Facebook",
                icon: (
                  <path d="M9 8H6v4h3v12h5V12h3.642l.358-4H14V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                ),
              },
              {
                href: "https://youtube.com/",
                label: "YouTube",
                icon: (
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z" />
                ),
              },
            ].map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="hover:text-[#9f62f2] transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  {item.icon}
                </svg>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
