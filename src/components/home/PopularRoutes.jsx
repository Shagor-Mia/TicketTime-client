import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Sample popular routes
const routes = [
  {
    id: 1,
    image: "/images/route1.jpg",
    title: "Dhaka → Chittagong",
    description: "Fastest and most comfortable route by bus and train.",
  },
  {
    id: 2,
    image: "/images/route2.jpg",
    title: "Dhaka → Sylhet",
    description: "Scenic route, perfect for weekend getaways.",
  },
  {
    id: 3,
    image: "/images/route3.jpg",
    title: "Dhaka → Cox's Bazar",
    description: "Popular beach destination with flights and buses.",
  },
  {
    id: 4,
    image: "/images/route4.jpg",
    title: "Dhaka → Khulna",
    description: "Reliable trains and buses with affordable prices.",
  },
  {
    id: 5,
    image: "/images/route5.jpg",
    title: "Dhaka → Kolkata (Flight)",
    description: "International flight, quick and comfortable journey.",
  },
  {
    id: 6,
    image: "/images/route6.jpg",
    title: "Dhaka → Mumbai (Flight)",
    description: "Direct international flight with in-flight amenities.",
  },
  {
    id: 7,
    image: "/images/route7.jpg",
    title: "Dhaka → Barisal",
    description: "Scenic bus route along rivers and lush landscapes.",
  },
  {
    id: 8,
    image: "/images/route8.jpg",
    title: "Dhaka → Rajshahi",
    description: "Express train with comfortable AC coaches.",
  },
  {
    id: 9,
    image: "/images/route9.jpg",
    title: "Dhaka → Singapore (Flight)",
    description: "International flight, premium services onboard.",
  },
  {
    id: 10,
    image: "/images/route10.jpg",
    title: "Dhaka → Narayanganj",
    description: "Short bus route, frequent departures daily.",
  },
];

const PopularRoutesSwiper = () => {
  return (
    <section className="py-10 mx-auto">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center mb-8 px-4 sm:px-6 lg:px-8">
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
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
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
