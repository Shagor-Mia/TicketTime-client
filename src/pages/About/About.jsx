import React from "react";
import { motion } from "framer-motion";
import img1 from "../../assets/bus1.jpg";
import img2 from "../../assets/plan1.jpg";
import img3 from "../../assets/train1.jpg";
import contactImg from "../../assets/bus1.jpg";
import quickBookingImg from "../../assets/bus1.jpg";
import supportImg from "../../assets/bus1.jpg";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">
      {/* About Us Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">About Us</h2>
        <div className="space-y-6">
          {[img1, img2, img3].map((img, index) => (
            <motion.div
              key={index}
              className="bg-white px-6 py-6 rounded-xl shadow-md flex flex-col md:flex-row gap-6 items-center hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="flex-shrink-0">
                <img
                  src={img}
                  alt={`Feature ${index}`}
                  className="w-20 h-20 md:w-24 md:h-24"
                />
              </div>
              <div className="border-l-2 border-gray-300 border-dashed hidden md:block"></div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-secondary mb-2">
                  {index === 0 && "Easy Ticket Booking"}
                  {index === 1 && "Secure Payment"}
                  {index === 2 && "24/7 Customer Support"}
                </h3>
                <p className="text-gray-700">
                  {index === 0 &&
                    "Discover and book bus, train, launch, or flight tickets effortlessly. Compare prices, check availability, and reserve your seat in just a few clicks."}
                  {index === 1 &&
                    "Make safe and reliable payments using multiple methods including cards, mobile banking, and digital wallets. Your transactions are encrypted and fully protected."}
                  {index === 2 &&
                    "Our support team is available around the clock to assist you with bookings, cancellations, or any queries. Travel confidently knowing help is always available."}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Us Section */}
        <motion.section
          className="bg-green-50 rounded-xl p-8 md:p-10 shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          transition={{ duration: 0.6 }}
        >
          <img
            src={contactImg}
            alt="Contact Us"
            className="w-20 h-20 md:w-24 md:h-24 mb-4"
          />
          <h3 className="text-2xl font-bold mb-2 text-blue-800">Contact Us</h3>
          <p className="text-gray-700 mb-4">
            Reach out via email, phone, or live chat for any questions or
            assistance with your bookings.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold">
            Contact Now
          </button>
        </motion.section>

        {/* Quick Booking Section */}
        <motion.section
          className="bg-green-50 rounded-xl p-8 md:p-10 shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <img
            src={quickBookingImg}
            alt="Quick Booking"
            className="w-20 h-20 md:w-24 md:h-24 mb-4"
          />
          <h3 className="text-2xl font-bold mb-2 text-green-800">
            Quick Booking
          </h3>
          <p className="text-gray-700 mb-4">
            Need tickets urgently? Secure your seat immediately with our
            emergency booking service.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold">
            Book Now
          </button>
        </motion.section>

        {/* Customer Support & Complaints Section */}
        <motion.section
          className="bg-green-50 rounded-xl p-8 md:p-10 shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src={supportImg}
            alt="Customer Support"
            className="w-20 h-20 md:w-24 md:h-24 mb-4"
          />
          <h3 className="text-2xl font-bold mb-2 text-yellow-800">
            Customer Support
          </h3>
          <p className="text-gray-700 mb-4">
            Have a complaint or issue? Our dedicated team ensures prompt
            resolution for a smooth travel experience.
          </p>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-semibold">
            Submit Issue
          </button>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
