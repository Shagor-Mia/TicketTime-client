import React from "react";
import { FaBus, FaPlane, FaTrain, FaCheckCircle } from "react-icons/fa";

const benefits = [
  {
    id: 1,
    icon: <FaCheckCircle className="text-blue-600 text-3xl" />,
    title: "Easy Booking",
    description: "Book tickets in a few clicks with a user-friendly interface.",
  },
  {
    id: 2,
    icon: <FaBus className="text-green-600 text-3xl" />,
    title: "Multiple Transport Options",
    description: "Choose from bus, train, launch, and plane tickets.",
  },
  {
    id: 3,
    icon: <FaPlane className="text-red-600 text-3xl" />,
    title: "Safe & Secure",
    description: "Secure payment and verified vendors for hassle-free travel.",
  },
  {
    id: 4,
    icon: <FaTrain className="text-purple-600 text-3xl" />,
    title: "Latest Schedules",
    description:
      "Up-to-date schedules for all routes, so you never miss a trip.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className=" py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us?</h2>
        <p></p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
