import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ticket-time.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
