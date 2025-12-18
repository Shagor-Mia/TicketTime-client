import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import bus1 from "../../assets/unique1.jpg";
import bus2 from "../../assets/green1.jpg";
import bus3 from "../../assets/hanif1.jpg";
import bus4 from "../../assets/saudia1.jpg";
import bus5 from "../../assets/star1.jpg";
import bus6 from "../../assets/bus1.png";
import plan1 from "../../assets/plan1.jpg";
import plan2 from "../../assets/plan2.jpg";
import train1 from "../../assets/train1.jpg";
import train2 from "../../assets/train2.jpg";

// Sample popular routes
const routes = [
  {
    id: 1,
    image: bus1,
    title: "Dhaka → Chittagong",
    description: "Fastest and most comfortable route by bus and train.",
  },
  {
    id: 2,
    image: bus3,
    title: "Dhaka → Sylhet",
    description: "Scenic route, perfect for weekend getaways.",
  },
  {
    id: 3,
    image: bus2,
    title: "Dhaka → Cox's Bazar",
    description: "Popular beach destination with flights and buses.",
  },
  {
    id: 4,
    image: bus4,
    title: "Dhaka → Khulna",
    description: "Reliable trains and buses with affordable prices.",
  },
  {
    id: 5,
    image: plan1,
    title: "Dhaka → Kolkata (Flight)",
    description: "International flight, quick and comfortable journey.",
  },
  {
    id: 6,
    image: plan2,
    title: "Dhaka → Mumbai (Flight)",
    description: "Direct international flight with in-flight amenities.",
  },
  {
    id: 7,
    image: bus5,
    title: "Dhaka → Barisal",
    description: "Scenic bus route along rivers and lush landscapes.",
  },
  {
    id: 8,
    image: train1,
    title: "Dhaka → Rajshahi",
    description: "Express train with comfortable AC coaches.",
  },
  {
    id: 9,
    image: train2,
    title: "Dhaka → Singapore (Flight)",
    description: "International flight, premium services onboard.",
  },
  {
    id: 10,
    image: bus6,
    title: "Dhaka → Narayanganj",
    description: "Short bus route, frequent departures daily.",
  },
];

const PopularRoutesSwiper = () => {
  return (
    <section className="py-10 mx-auto px-4">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center mb-8 px-4 md:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">
          Popular Routes
        </h2>
        <p className="mt-4 text-gray-600 text-sm sm:text-base">
          Discover our most booked routes and travel comfortably to your
          favorite destinations. Whether by bus, train, plane, or launch, we
          have you covered!
        </p>
      </div>

      {/* Swiper */}
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 100,
          modifier: 1,
          scale: 0.8,
          slideShadows: true,
        }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 15 }, // mobile
          640: { slidesPerView: 2, spaceBetween: 20 }, // tablet
          1024: { slidesPerView: 3, spaceBetween: 30 }, // desktop
          1280: { slidesPerView: 4, spaceBetween: 40 }, // large screens
        }}
      >
        {routes.map((route) => (
          <SwiperSlide key={route.id}>
            <div className="rounded-lg overflow-hidden shadow bg-white transition-transform duration-500 transform hover:scale-105 hover:shadow-2xl">
              <img
                src={route.image}
                alt={route.title}
                className="w-full h-48  md:h-64 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {route.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {route.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PopularRoutesSwiper;
