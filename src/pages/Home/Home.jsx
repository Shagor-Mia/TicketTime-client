import React from "react";
import Advertising from "../../components/home/Advertising";
import LatestTicketsSection from "../../components/home/LatestTicket";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import PopularRoutes from "../../components/home/PopularRoutes";
import Banner from "../../components/home/Banner";

const Home = () => {
  return (
    <div>
      <Banner />
      <Advertising />
      <LatestTicketsSection />
      <WhyChooseUs />
      <PopularRoutes />
    </div>
  );
};

export default Home;
