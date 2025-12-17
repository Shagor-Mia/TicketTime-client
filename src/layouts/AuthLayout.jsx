import React from "react";

import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto bg-white ">
      <Navbar />
      <div className="items-center py-20">
        <div className="">
          <Outlet />
        </div>
        {/* <div className="flex-1">
          <img src={authImg} className="" alt="" />
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
