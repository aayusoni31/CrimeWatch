// base axios instance with auth headers
import axios from "axios";

const instance = axios.create({
  baseURL:
    (import.meta.env.VITE_BACKEND_URL || "http://localhost:5000") + "/api",
  timeout: 10000,
});

// Attach JWT token to every request automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("crimewatch_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally — token expired, force logout
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("crimewatch_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default instance;
