import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import { motion } from "framer-motion";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userLogin } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (data) => {
    userLogin(data.email, data.password)
      .then((result) => {
        console.log("after login", result.user);
        navigate(location?.state || "/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" shadow-2xl rounded-2xl w-full max-w-md p-8 md:p-10"
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl text-black font-bold">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Please login to continue</p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="input input-bordered w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#632ee3]"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">Email is required!</span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true, minLength: 6 })}
              className="input input-bordered w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#632ee3]"
            />
            {errors.password?.type === "required" && (
              <span className="text-red-500 text-sm">
                Password is required!
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-500 text-sm">
                Password must be at least 6 characters!
              </span>
            )}
          </div>

          <div className="flex justify-between text-sm text-blue-600">
            <Link to="/forget-password" className="hover:underline">
              Forgot password?
            </Link>
          </div>

          <button className="w-full py-3 mt-3 bg-gradient-to-br from-[#632ee3] to-[#9f62f2] text-white font-semibold rounded-lg hover:opacity-90 transition duration-200">
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          New to TicketTime?{" "}
          <Link
            state={location.state}
            to="/signup"
            className="text-blue-600 underline hover:text-blue-700"
          >
            Register
          </Link>
        </p>

        {/* Google Login */}
        <div className="mt-6">
          <GoogleLogin />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
