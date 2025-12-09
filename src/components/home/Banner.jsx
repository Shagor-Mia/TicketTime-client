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

const banners = [bannerbg1, bannerbg2, bannerbg3, bannerbg4, bannerbg5];

const AnimatedBannerSwiper = () => {
  return (
    <section className="relative">
      <Swiper
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, EffectFade]}
        className="h-[80vh]"
      >
        {banners.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <img
                src={img}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 md:p-10 lg:p-20 flex flex-col md:flex-row items-center justify-center z-20 lg:gap-5">
                <motion.div
                  className="text-center text-white px-4 space-y-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  key={index} // ensures animation triggers on slide change
                >
                  <motion.h1
                    className="text-4xl sm:text-5xl font-bold"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    Explore Your Next Journey
                  </motion.h1>

                  <motion.p
                    className="text-lg sm:text-xl max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                  >
                    Book buses, trains, launches, and flights easily from one
                    platform.
                  </motion.p>

                  <motion.button
                    className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 px-6 py-3 rounded-lg font-semibold text-white"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    Book Now
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default AnimatedBannerSwiper;
