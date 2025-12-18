import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg2 from "../../assets/bg2.jpg";

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg2})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>

      <motion.div
        className="relative z-10 md:py-16 py-5 px-5 md:px-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left: Contact Info */}
        <motion.div
          className="md:w-1/3 flex flex-col gap-6 text-white dark:text-gray-200"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-br from-[#632ee3] to-[#9f62f2]">
            Contact Us
          </h2>
          <p>
            Have questions or need help? Reach out to us and we’ll respond as
            soon as possible.
          </p>

          <div className="flex flex-col gap-3">
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:ticket@time.com"
                className="text-[#632ee3] hover:underline"
              >
                ticket@time.com
              </a>
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              <a
                href="tel:+8801700000000"
                className="text-[#632ee3] hover:underline"
              >
                +880 1700 000 000
              </a>
            </p>
            <p>
              <span className="font-semibold">Address:</span> Dhaka, Bangladesh
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-4 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#632ee3] transition-colors duration-200"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#632ee3] transition-colors duration-200"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#632ee3] transition-colors duration-200"
            >
              <FaInstagram />
            </a>
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div
          className="md:w-2/3 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#632ee3]"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#632ee3]"
              />
            </div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#632ee3]"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Message"
              required
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#632ee3]"
            ></textarea>
            <button
              type="submit"
              className="bg-gradient-to-br from-[#632ee3] to-[#9f62f2] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity duration-200"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
