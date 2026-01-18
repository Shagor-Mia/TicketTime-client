import React from "react";
import { FaBus, FaPlane, FaTrain, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const benefits = [
  {
    id: 1,
    icon: <FaCheckCircle />,
    title: "Easy Booking",
    description: "Book tickets in a few clicks with a user-friendly interface.",
    color: "text-blue-600",
  },
  {
    id: 2,
    icon: <FaBus />,
    title: "Multiple Transport Options",
    description: "Choose from bus, train, launch, and plane tickets.",
    color: "text-green-600",
  },
  {
    id: 3,
    icon: <FaPlane />,
    title: "Safe & Secure",
    description: "Secure payment and verified vendors for hassle-free travel.",
    color: "text-red-600",
  },
  {
    id: 4,
    icon: <FaTrain />,
    title: "Latest Schedules",
    description:
      "Up-to-date schedules for all routes, so you never miss a trip.",
    color: "text-purple-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const WhyChooseUs = () => {
  return (
    <section className="py-10 mt-10 md:rounded-2xl rounded-xl bg-gray-100 dark:bg-base-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-5xl font-bold text-gray-900 dark:text-base-content">
            Why Choose Us?
          </h2>
          <p className="mt-4 text-gray-600 dark:text-base-content/70 text-sm sm:text-base">
            We make your travel experience easier, safer, and faster with
            trusted services and multiple transport options.
          </p>
        </motion.div>

        {/* Cards Container */}
        <motion.div
          className="
            h-[400px] overflow-y-auto
            sm:h-auto sm:overflow-visible
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6
          "
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white dark:bg-base-100 p-6 rounded-xl shadow-md hover:shadow-xl text-center"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`mx-auto mb-4 text-3xl sm:text-4xl ${benefit.color}`}
              >
                {benefit.icon}
              </motion.div>

              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-base-content">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-base-content/70 text-sm sm:text-base">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
