import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', 
});
// Add the token to headers if it exists in localStorage
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the request headers
      
    }
    return config;
  });
export default instance;
