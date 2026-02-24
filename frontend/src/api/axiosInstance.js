import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Intercept request to add token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ Intercept response to handle errors gracefully
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Return error without logging to console for expected HTTP errors (4xx/5xx)
    // This prevents console noise for expected errors like 401, 404, etc.
    return Promise.reject(error);
  }
);

export default axiosInstance;
