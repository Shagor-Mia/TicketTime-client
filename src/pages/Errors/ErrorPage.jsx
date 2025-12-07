import React from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  return (
    <div className="flex flex-col justify-center py-5  items-center space-y-5 my-20 md:mx-0 mx-3">
      <img
        className="md:px-0 px-3 md:w-100 w-50"
        src="https://i.ibb.co.com/xqNbmzCL/App-Error.png"
        alt="app not found"
      />
      <h1 className="lg:text-5xl md:text-4xl text-2xl font-semibold text-center">
        OPPS! PAGE NOT FOUND
      </h1>
      <p className="text-gray-500 md:text-[16px] text-center text-sm">
        The page you are looking for is not available.
      </p>

      <button
        onClick={handleNavigate}
        className=" btn bg-gradient-to-br md:text-[16px] text-xs from-[#632ee3] to-[#9f62f2] text-white hover:opacity-90"
      >
        Go Back!
      </button>
    </div>
  );
};

export default ErrorPage;
