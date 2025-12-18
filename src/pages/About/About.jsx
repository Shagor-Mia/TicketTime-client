import React from "react";
import { motion } from "framer-motion";
import img1 from "../../assets/bus1.jpg";
import img2 from "../../assets/plan1.jpg";
import img3 from "../../assets/train1.jpg";
import contactImg from "../../assets/bus1.jpg";
import quickBookingImg from "../../assets/bus1.jpg";
import supportImg from "../../assets/bus1.jpg";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import bg1 from "../../assets/bg1.jpg";

/* ================= ANIMATION ================= */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

/* ================= COLOR MAP (TAILWIND SAFE) ================= */
const colorMap = {
  blue: {
    text: "text-blue-800 dark:text-blue-300",
    btn: "bg-blue-600 hover:bg-blue-700",
  },
  green: {
    text: "text-green-800 dark:text-green-300",
    btn: "bg-green-600 hover:bg-green-700",
  },
  yellow: {
    text: "text-yellow-800 dark:text-yellow-300",
    btn: "bg-yellow-600 hover:bg-yellow-700",
  },
};

const About = () => {
  const { user } = useAuth();

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      {/* Overlay for dark mode readability */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 space-y-16 text-white dark:text-gray-200">
        {/* ================= ABOUT US ================= */}
        <section>
          <h2 className="text-2xl md:text-5xl font-bold text-center mb-5 md:mb-10">
            About Us
          </h2>
          <p className="text-center max-w-3xl mx-auto text-sm md:text-base mb-5 md:mb-10">
            At TicketTime, we simplify travel by combining convenience,
            security, and reliability. From quick bookings to real-time support,
            we ensure every journey is smooth from start to finish.
          </p>

          <div className="space-y-6">
            {[img1, img2, img3].map((img, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-5 md:p-6 rounded-xl shadow-md
                           flex flex-col sm:flex-row gap-4 sm:gap-6 items-center
                           hover:shadow-xl transition"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <img
                  src={img}
                  alt="Feature"
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                />

                <div className="hidden sm:block border-l-2 border-dashed h-16 dark:border-gray-400"></div>

                <div className="text-center sm:text-left">
                  <h3 className="text-lg md:text-2xl font-semibold mb-1 md:mb-2 text-gray-900 dark:text-gray-100">
                    {index === 0 && "Easy Ticket Booking"}
                    {index === 1 && "Secure Payment"}
                    {index === 2 && "24/7 Customer Support"}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {index === 0 &&
                      "Discover and book bus, train, launch, or flight tickets effortlessly with just a few clicks."}
                    {index === 1 &&
                      "Safe and reliable payments with cards, mobile banking, and digital wallets."}
                    {index === 2 &&
                      "Our support team is available 24/7 to help with bookings or issues."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <ServiceCard
            img={contactImg}
            title="Contact Us"
            desc="Reach out via email, phone, or live chat for booking help."
            btn="Contact Now"
            color="blue"
            user={user}
            to={"/contact"}
          />
          <ServiceCard
            img={quickBookingImg}
            title="Quick Booking"
            desc="Need tickets urgently? Book instantly with emergency booking."
            btn="Book Now"
            color="green"
            user={user}
            to={"/ticket"}
          />
          <ServiceCard
            img={supportImg}
            title="Customer Support"
            desc="Submit complaints and get fast resolution from our team."
            btn="Submit Issue"
            color="yellow"
            user={user}
            to={"/contact"}
          />
        </div>
      </div>
    </div>
  );
};

/* ================= SERVICE CARD ================= */
const ServiceCard = ({ img, title, desc, btn, color, user, to }) => {
  const styles = colorMap[color];

  return (
    <motion.section
      className="bg-green-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-md
                 flex flex-col items-center text-center
                 hover:shadow-xl transition"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
      transition={{ duration: 0.5 }}
    >
      <img src={img} alt={title} className="w-16 h-16 md:w-24 md:h-24 mb-4" />

      <h3 className={`text-lg md:text-2xl font-bold mb-2 ${styles.text}`}>
        {title}
      </h3>

      <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
        {desc}
      </p>

      {user && (
        <Link
          to={`${to}`}
          className={`w-full md:w-auto ${styles.btn} text-white px-6 py-2 rounded-lg font-semibold`}
        >
          {btn}
        </Link>
      )}
    </motion.section>
  );
};

export default About;
