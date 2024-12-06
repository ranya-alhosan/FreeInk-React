import React, { useState } from "react";
import axios from "../Api/axios";
import { useNavigate } from "react-router-dom";
import "/public/assets/css/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null); // For displaying error messages
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending login request to the backend
      const response = await axios.post("/login", formData);
  
      // Log the response to debug
      console.log("Login response:", response.data);
  
      if (response.status === 200 && response.data.status) {
        // Successful login
        alert(response.data.message); // Alert success message
        localStorage.setItem("token", response.data.token); // Save the token to localStorage
        navigate("/"); // Redirect to home or profile page
      } else {
        // If status is not true in the response body
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      // Handle error based on HTTP status code
      if (err.response) {
        if (err.response.status === 401) {
          setError(err.response.data.message || "Invalid email or password.");
        } else if (err.response.status === 500) {
          setError(err.response.data.message || "Server error. Please try again later.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } else {
        // Handle network or other unexpected errors
        setError("Unable to connect. Please check your internet connection.");
      }
  
      console.error("Login error:", err);
    }
  };
    

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Log in to continue exploring your blog journey</p>

        {/* Displaying error message if any */}
        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="login-input"
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {/* Link to Sign Up page */}
        <div className="signup-link-container">
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="signup-link"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
