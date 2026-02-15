import axios from "axios";

/* =========================================
   SecureVault API Client (Axios Instance)
========================================= */

// Base backend URL
// Example: http://localhost:5000/api
// In production: https://securevault-backend.onrender.com/api
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

/* =========================================
   Attach JWT Token Automatically
========================================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // If token exists, attach it
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* =========================================
   Handle Response Errors Globally
========================================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: Auto logout if token expired
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Token may be expired.");

      // Remove token
      localStorage.removeItem("token");

      // Redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
