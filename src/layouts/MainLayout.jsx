import React from "react";
import { Outlet, useNavigation } from "react-router";
import LoadingPage from "../pages/Loading/LoadingPage";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
  const { state } = useNavigation();
  return (
    <div>
      <Navbar />
      <div className="pt-24 min-h-[calc(100vh-68px)]">
        {state == "loading" ? <LoadingPage /> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
