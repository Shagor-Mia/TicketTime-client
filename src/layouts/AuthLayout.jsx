import React from "react";

import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto bg-white mt-20">
      <Logo />
      <div className="items-center flex">
        <div className="flex-1">
          <Outlet />
        </div>
        {/* <div className="flex-1">
          <img src={authImg} className="" alt="" />
        </div> */}
      </div>
    </div>
  );
};

export default AuthLayout;
