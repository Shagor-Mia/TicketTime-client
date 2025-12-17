import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import authBg from "../../assets/authbg.jpg"; // optional: background like login/register

const ForgetPassword = () => {
  const { setLoading, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleForgetPassword = (data) => {
    resetPassword(data.email)
      .then(() => {
        setLoading(false);
        toast.success("Check your email to reset password");
        navigate("/login");
      })
      .catch((e) => {
        toast.error(e.message);
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
          <h1 className="text-4xl font-bold text-black">Forget Password?</h1>
          <p className="text-gray-700 mt-2 text-lg">
            Enter your email, we will send you an OTP to reset your password.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleForgetPassword)}
          className="space-y-5"
        >
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

          <button className="w-full py-3 mt-3 bg-gradient-to-br from-[#632ee3] to-[#9f62f2] text-white font-semibold rounded-lg hover:opacity-90 transition duration-200">
            Send
          </button>
        </form>

        <p className="text-center text-gray-700 mt-4">
          Remember your password?{" "}
          <Link
            state={location.state}
            to="/login"
            className="text-blue-600 underline hover:text-blue-700"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgetPassword;
