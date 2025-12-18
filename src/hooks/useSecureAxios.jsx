// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router";
// import useAuth from "./useAuth";

// const axiosSecure = axios.create({
//   baseURL: "http://localhost:3000",
// });

// const useSecureAxios = () => {
//   const { user, logOut } = useAuth();
//   const navigate = useNavigate();
//   const [tokenReady, setTokenReady] = useState(false);

//   useEffect(() => {
//     const setupInterceptors = async () => {
//       if (!user) return;

//       const token = await user.getIdToken();
//       if (!token) return;

//       // request interceptor
//       const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
//         config.headers.authorization = `Bearer ${token}`;
//         return config;
//       });

//       // response interceptor
//       const resInterceptor = axiosSecure.interceptors.response.use(
//         (response) => response,
//         (error) => {
//           const statusCode = error.response?.status;
//           if (statusCode === 401 || statusCode === 403) {
//             logOut().then(() => navigate("/login"));
//           }
//           return Promise.reject(error);
//         }
//       );

//       setTokenReady(true);

//       return () => {
//         axiosSecure.interceptors.request.eject(reqInterceptor);
//         axiosSecure.interceptors.response.eject(resInterceptor);
//       };
//     };

//     setupInterceptors();
//   }, [user, logOut, navigate]);

//   return axiosSecure;
// };

// export default useSecureAxios;

import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://ticket-time.vercel.app",
});

const useSecureAxios = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // req interceptor
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });
    // response interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        const statusCode = error.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          logOut().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(error);
      }
    );

    // cleanup (remove interceptor on unmount)
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user?.accessToken, logOut, navigate]);

  return axiosSecure;
};

export default useSecureAxios;
