import React from "react";
import { FadeLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <FadeLoader color="#4f46e5" height={15} width={5} margin={2} />
    </div>
  );
};

export default LoadingPage;
