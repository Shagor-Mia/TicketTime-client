import React from "react";
import { Outlet, useNavigation } from "react-router";
import LoadingPage from "../pages/Loading/LoadingPage";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
  const { state } = useNavigation();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="max-w-screen-xl mx-auto w-screen px-5 md:px-9 lg:px-13  flex-1  ">
        {state == "loading" ? <Loading /> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
