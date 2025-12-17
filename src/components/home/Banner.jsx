import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import bannerbg1 from "../../assets/plan1.jpg";
import bannerbg2 from "../../assets/bus1.jpg";
import bannerbg3 from "../../assets/train1.jpg";
import bannerbg4 from "../../assets/bus2.jpg";
import bannerbg5 from "../../assets/plan2.jpg";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";

const banners = [bannerbg1, bannerbg2, bannerbg3, bannerbg4, bannerbg5];

const AnimatedBannerSwiper = () => {
  const { user } = useAuth();

  return (
    <section className="relative w-full  mt-10 px-4 ">
      <div className="relative rounded-xl md:rounded-2xl overflow-hidden">
        <Swiper
          effect="fade"
          slidesPerView={1}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination, EffectFade]}
          className="h-[60vh] sm:h-[70vh] lg:h-[80vh]"
        >
          {banners.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                {/* Background Image */}
                <img
                  src={img}
                  alt={`Banner ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover "
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Content */}
                <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-8 lg:px-16">
                  <motion.div
                    key={index}
                    className="text-center text-white max-w-2xl space-y-4 sm:space-y-6"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.h1
                      className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Explore Your Next Journey
                    </motion.h1>

                    <motion.p
                      className="text-sm sm:text-lg lg:text-xl text-gray-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Book buses, trains, launches, and flights easily from one
                      platform.
                    </motion.p>

                    {user && (
                      <Link to={"/ticket"}>
                        <motion.button
                          className="inline-block bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-semibold text-sm sm:text-base"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          Book Now
                        </motion.button>
                      </Link>
                    )}
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default AnimatedBannerSwiper;
