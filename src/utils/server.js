import axios from "axios";

// Get the backend URL from environment variables or use a default
const baseURL = "https://multi-vendor-server-pr7r.onrender.com";

// Create an Axios instance
const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// Helper for backend URL
export const backend_url = baseURL;

// Example of setting Content-Type dynamically during requests
api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

export default api;
