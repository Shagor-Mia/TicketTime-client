import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useSecureAxios from "../../hooks/useSecureAxios";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import axios from "axios";
import { motion } from "framer-motion";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { userRegister, updateRegisterUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useSecureAxios();

  const handleRegister = (data) => {
    const profileImage = data.photo[0];
    userRegister(data.email, data.password)
      .then((result) => {
        const formData = new FormData();
        formData.append("image", profileImage);
        const img_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOST
        }`;

        axios.post(img_URL, formData).then((res) => {
          const photoURL = res.data.data.url;

          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) console.log("user created in DB");
          });

          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateRegisterUserProfile(userProfile)
            .then(() => navigate(location?.state || "/"))
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
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
          <h1 className="text-4xl text-black font-bold">Create Account</h1>
          <p className="text-gray-700 mt-2">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
          {/* Name */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: true })}
              className="input input-bordered w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#632ee3]"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">Name is required!</span>
            )}
          </div>

          {/* Photo Upload */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input file-input-bordered w-full"
            />
            {errors.photo && (
              <span className="text-red-500 text-sm">Photo is required!</span>
            )}
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
              })}
              className="input input-bordered w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#632ee3]"
            />
            {errors.password?.type === "required" && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-500 text-sm">
                Password must be at least 6 characters
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-500 text-sm">
                Password must contain uppercase, lowercase, number, and special
                character
              </span>
            )}
          </div>

          <button className="w-full py-3 mt-3 bg-gradient-to-br from-[#632ee3] to-[#9f62f2] text-white font-semibold rounded-lg hover:opacity-90 transition duration-200">
            Register
          </button>
        </form>

        <p className="text-center text-gray-700 mt-4">
          Already have an account?{" "}
          <Link
            state={location.state}
            to="/login"
            className="text-blue-600 underline hover:text-blue-700"
          >
            Login
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

export default Register;
