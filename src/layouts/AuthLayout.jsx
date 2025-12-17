import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import authBg from "../assets/authbg.jpg";

const AuthLayout = () => {
  return (
    <>
      <Navbar />

      <div
        className="max-w-7xl mx-auto bg-white flex items-center justify-center px-4"
        style={{
          backgroundImage: `url(${authBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full">
          <Outlet />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AuthLayout;
