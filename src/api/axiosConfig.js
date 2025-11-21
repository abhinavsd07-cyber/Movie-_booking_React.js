import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://movie-booking-server-1.onrender.com",
  headers: { "Content-Type": "application/json" },
});

export default axiosConfig;
