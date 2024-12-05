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

      // Log the response to check if it's successful
      console.log("Login response:", response.data);

      // If the response indicates success (status true), store the token and navigate to profile page
      if (response.data.status) {
        alert(response.data.message); // Alert the success message
        localStorage.setItem("token", response.data.token); // Save the token to localStorage
        navigate("/"); // Redirect to profile page
      } else {
        // If the login failed (status false), show error message and stay on login page
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      // Catch any unexpected errors and display them
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
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
