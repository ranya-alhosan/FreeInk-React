import axios from "axios";

// Create an Axios instance with a base URL and default headers
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json", // Default header for JSON requests
    Accept: "application/json", // Optional: specify accepted response format
  },
});

// Add an interceptor to include the token in the headers if it exists in localStorage
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach the token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle the error
  }
);

export default apiClient;
